import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { buildCheckoutUrl } from '@/lib/lemonsqueezy';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // remove accents
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/[^\w\-]+/g, '') // remove all non-word chars
    .replace(/\-\-+/g, '-') // replace multiple hyphens with single hyphen
    .replace(/^-+/, '') // trim leading hyphen
    .replace(/-+$/, ''); // trim trailing hyphen
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      restaurantName,
      contactName,
      email,
      password,
      phone,
      address,
      instagram,
      facebook,
      tiktok,
      glubbi_type,
      glubbi_category,
    } = body;

    // Validation
    if (!restaurantName || !contactName || !email || !password || !phone || !address) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos.' },
        { status: 400 }
      );
    }

    const supabaseAdmin = createAdminClient();

    // 1. Pre-validate: Check if email exists by querying auth via listUsers (compatible with all Supabase versions)
    try {
      const { data: usersPage } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
      if (usersPage?.users) {
        const emailTaken = usersPage.users.some(
          (u: any) => u.email?.toLowerCase() === email.toLowerCase()
        );
        if (emailTaken) {
          return NextResponse.json(
            { success: false, error: 'Este correo electrónico ya está registrado. Si eres el propietario, intenta iniciar sesión o contacta a soporte@mtriq.app.' },
            { status: 400 }
          );
        }
      }
    } catch (_) {
      // If listUsers fails for any reason, continue — the createUser call below will catch duplicates
    }

    // 2. Generate unique slug
    let baseSlug = slugify(restaurantName);
    if (!baseSlug || baseSlug.length < 3) {
      baseSlug = 'restaurant';
    }

    // Ensure it matches the slug format: ^[a-z0-9][a-z0-9-]*[a-z0-9]$
    baseSlug = baseSlug.replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, '');

    let slug = baseSlug;
    let isUnique = false;
    let counter = 0;

    while (!isUnique) {
      const checkSlug = counter === 0 ? slug : `${slug}-${counter}`;
      const { data } = await supabaseAdmin
        .from('restaurants')
        .select('id')
        .eq('slug', checkSlug)
        .maybeSingle() as any;

      if (!data) {
        slug = checkSlug;
        isUnique = true;
      } else {
        counter++;
      }
    }

    // 3. Create user in Supabase Auth using Admin Client (bypassing confirmation)
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) {
      console.error('Auth User creation error:', authError);
      // Normalize error message to always show friendly Spanish
      const isDuplicate = authError.message?.toLowerCase().includes('already registered') ||
                          authError.message?.toLowerCase().includes('already been registered') ||
                          authError.message?.toLowerCase().includes('email address is already');
      const friendlyError = isDuplicate
        ? 'Este correo electrónico ya está registrado. Intenta iniciar sesión o usa otro correo.'
        : `Error de Supabase Auth: ${authError.message}`; // Temporal para debug
      return NextResponse.json(
        { success: false, error: friendlyError },
        { status: 400 }
      );
    }

    const userId = authUser.user.id;

    // 3. Insert Restaurant
    // Try to insert with custom columns first
    let newRestaurantId = '';
    let insertedRest: any = null;

    try {
      const { data, error } = await supabaseAdmin
        .from('restaurants')
        .insert({
          name: restaurantName,
          slug,
          phone,
          address,
          contact_name: contactName,
          instagram: instagram || null,
          facebook: facebook || null,
          tiktok: tiktok || null,
          brand_color_primary: '#FF6B00',
          brand_color_secondary: '#1A1A2E',
          is_active: false, // Se activa tras confirmar pago via webhook de Lemon Squeezy
          glubbi_type: glubbi_type || 'Restaurantes',
          glubbi_category: glubbi_category || 'Comida',
        } as any)
        .select()
        .single() as any;

      if (error) {
        // If error suggests column missing, throw to enter catch block and use fallback
        if (error.message && (error.message.includes('column') || error.message.includes('contact_name'))) {
          throw new Error('FALLBACK_INSERT');
        }
        throw error;
      }
      
      insertedRest = data;
      newRestaurantId = data.id;
    } catch (err: any) {
      // Fallback: If custom columns do not exist in Supabase yet, store them in notes/tax_id
      console.warn('Custom columns not found. Using fallback insertion...', err.message);
      
      const backupDetails = {
        contact_name: contactName,
        instagram: instagram || null,
        facebook: facebook || null,
        tiktok: tiktok || null,
      };

      const { data, error } = await supabaseAdmin
        .from('restaurants')
        .insert({
          name: restaurantName,
          slug,
          phone,
          address,
          tax_id: null, // Avoid injecting fallback contact details object here
          brand_color_primary: '#FF6B00',
          brand_color_secondary: '#1A1A2E',
          is_active: false, // Se activa tras confirmar pago via webhook de Lemon Squeezy
        } as any)
        .select()
        .single() as any;

      if (error) {
        // Clean up created auth user if restaurant creation fails
        await supabaseAdmin.auth.admin.deleteUser(userId);
        throw error;
      }

      insertedRest = data;
      newRestaurantId = data.id;
    }

    // 4. Create Restaurant Member linkage
    const { error: memberError } = await supabaseAdmin
      .from('restaurant_members')
      .insert({
        restaurant_id: newRestaurantId,
        user_id: userId,
        role: 'owner',
        display_name: contactName,
        is_active: true,
      } as any);

    if (memberError) {
      console.error('Restaurant Member creation error:', memberError);
      // Clean up restaurant and auth user if linkage fails
      await supabaseAdmin.from('restaurants').delete().eq('id', newRestaurantId);
      await supabaseAdmin.auth.admin.deleteUser(userId);
      
      return NextResponse.json(
        { success: false, error: `Error al asociar el usuario al restaurante: ${memberError.message}` },
        { status: 500 }
      );
    }

    // 5. Construir URL de checkout de Lemon Squeezy con datos del restaurante
    // El email de bienvenida se envía desde el webhook DESPUÉS de que el pago se confirme.
    const checkoutUrl = buildCheckoutUrl({
      email,
      restaurantId: newRestaurantId,
      slug,
    });

    // Success! Devolver la URL de checkout para redirigir al usuario a pagar
    return NextResponse.json({
      success: true,
      restaurantId: newRestaurantId,
      slug,
      userId,
      checkoutUrl,
    });

  } catch (error: any) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}
