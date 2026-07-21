const fs = require('fs');
const path = require('path');

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

async function register() {
  const url = 'https://oxjbswrcdhlbifgsnhll.supabase.co/rest/v1/restaurants';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Let's try to insert a restaurant using the anon key to see if RLS blocks it or if it succeeds
  const payload = {
    name: 'Suraki Test',
    slug: 'suraki-test-' + Date.now(),
    email: 'test@suraki.com',
    is_active: true
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    console.log('Insert Status:', res.status);
    console.log('Insert Result:', json);
  } catch (err) {
    console.error('Insert error:', err);
  }
}

register();
