const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Helper to load env vars from .env.local
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
      process.env[key] = val;
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oxjbswrcdhlbifgsnhll.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.error('RESEND_API_KEY is not defined in .env.local!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function sendBulk() {
  console.log('Fetching restaurants from database...');
  console.log('Supabase URL:', supabaseUrl);
  console.log('Supabase Key Length:', supabaseKey ? supabaseKey.length : 0);
  const { data: restaurants, error } = await supabase
    .from('restaurants')
    .select('*');

  if (error) {
    console.error('Error fetching restaurants:', error);
    process.exit(1);
  }

  console.log(`Found ${restaurants.length} active restaurants. Dispatching welcome data to dazajulio@gmail.com...`);

  for (const rest of restaurants) {
    console.log(`Sending welcome email for tenant: ${rest.name} (${rest.slug})...`);
    
    const kioskUrl = `https://mtriq.app/${rest.slug}`;
    const dashboardUrl = `https://mtriq.app/${rest.slug}/gerente`;
    const kdsUrl = `https://mtriq.app/${rest.slug}/cocina`;
    const contactName = rest.contact_name || 'Propietario';

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>¡Bienvenido a Mtriq!</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #0b0c10;
            color: #d1d5db;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #16171d;
            border: 1px solid #27272a;
            border-radius: 16px;
            overflow: hidden;
            margin-top: 40px;
            margin-bottom: 40px;
          }
          .header {
            background-color: #090a0f;
            padding: 30px;
            text-align: center;
            border-bottom: 1px solid #27272a;
          }
          .logo-text {
            font-size: 24px;
            font-weight: 900;
            color: #ffffff;
            letter-spacing: -0.5px;
          }
          .orange-text {
            color: #ff6b00;
          }
          .content {
            padding: 40px 30px;
          }
          h1 {
            color: #ffffff;
            font-size: 22px;
            font-weight: 800;
            margin-top: 0;
            margin-bottom: 16px;
            letter-spacing: -0.5px;
          }
          p {
            font-size: 15px;
            line-height: 1.6;
            color: #a1a1aa;
            margin-bottom: 24px;
          }
          .card {
            background-color: #090a0f;
            border: 1px solid #27272a;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 30px;
          }
          .card-title {
            font-weight: 700;
            color: #ffffff;
            margin-top: 0;
            margin-bottom: 12px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .detail-row {
            margin-bottom: 8px;
            font-size: 14px;
          }
          .detail-label {
            color: #71717a;
            font-weight: 600;
          }
          .detail-value {
            color: #ffffff;
            font-family: monospace;
            font-weight: bold;
          }
          .button {
            display: inline-block;
            background-color: #ff6b00;
            color: #ffffff !important;
            font-weight: bold;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 8px;
            font-size: 15px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(255, 107, 0, 0.2);
            margin-bottom: 30px;
          }
          .steps {
            margin-top: 30px;
            border-top: 1px solid #27272a;
            padding-top: 25px;
          }
          .step-item {
            margin-bottom: 16px;
          }
          .step-number {
            background-color: rgba(255, 107, 0, 0.1);
            color: #ff6b00;
            font-weight: bold;
            padding: 2px 8px;
            border-radius: 4px;
            margin-right: 8px;
            font-size: 12px;
          }
          .step-text {
            font-size: 14px;
            color: #a1a1aa;
          }
          .footer {
            background-color: #090a0f;
            padding: 24px;
            text-align: center;
            font-size: 12px;
            color: #52525b;
            border-top: 1px solid #27272a;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo-text">mtriq<span class="orange-text">.app</span></div>
          </div>
          <div class="content">
            <h1>¡Hola, ${contactName}!</h1>
            <p>¡Bienvenido al ecosistema <strong>MTRIQ</strong>!</p>
            <p>Tu cuenta para <strong>${rest.name}</strong> ha sido desplegada con éxito. Tu nuevo Kiosko inteligente y tu monitor de cocina (KDS) ya están sincronizados y listos para llevar la digitalización de tu restaurante al siguiente nivel.</p>

            <div class="card">
              <div class="card-title">Datos de tu cuenta</div>
              <div class="detail-row">
                <span class="detail-label">Usuario / Email:</span>
                <span class="detail-value">${rest.email || 'N/A'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Dirección de tu Kiosko (QR/Web):</span>
                <span class="detail-value"><a href="${kioskUrl}" style="color: #ff6b00; text-decoration: none;">mtriq.app/${rest.slug}</a></span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Monitor de Cocina (KDS):</span>
                <span class="detail-value"><a href="${kdsUrl}" style="color: #ff6b00; text-decoration: none;">mtriq.app/${rest.slug}/cocina</a></span>
              </div>
            </div>

            <div style="text-align: center;">
              <a href="${dashboardUrl}" class="button">Ir al Dashboard de Configuración</a>
            </div>

            <div class="steps">
              <div class="card-title">Próximos pasos recomendados</div>
              <div class="step-item">
                <span class="step-number">1</span>
                <span class="step-text"><strong>Configura tu Menú</strong>: Agrega tus categorías y sube tus productos con sus respectivos modificadores.</span>
              </div>
              <div class="step-item">
                <span class="step-number">2</span>
                <span class="step-text"><strong>Descarga tus Códigos QR</strong>: Configura tus mesas e imprime los códigos.</span>
              </div>
              <div class="step-item">
                <span class="step-number">3</span>
                <span class="step-text"><strong>Activa la Cocina (KDS)</strong>: Deja abierta la pantalla del KDS en la cocina para recibir comandas al instante.</span>
              </div>
            </div>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Mtriq.app. Todos los derechos reservados.<br>
            Soporte: soporte@mtriq.app | Cancela cuando quieras.
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Mtriq Soporte <soporte@mtriq.app>',
          to: ['dazajulio@gmail.com'],
          subject: `[Resumen Tenant] ¡Bienvenido a Mtriq! Activa tu local: ${rest.name}`,
          html: emailHtml,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error(`Failed to send email for ${rest.name}:`, data);
      } else {
        console.log(`Email sent successfully for ${rest.name}! ID: ${data.id}`);
      }
    } catch (e) {
      console.error(`Error sending email for ${rest.name}:`, e);
    }
  }

  console.log('Bulk welcome emails complete.');
  process.exit(0);
}

sendBulk();
