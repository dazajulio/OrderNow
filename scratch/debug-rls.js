const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function debug() {
  console.log('Query 1: select all');
  const res1 = await supabase.from('restaurants').select('*');
  console.log('Result 1 count:', res1.data ? res1.data.length : 0, 'Error:', res1.error);
  if (res1.data) console.log('Data:', res1.data);

  console.log('\nQuery 2: select active');
  const res2 = await supabase.from('restaurants').select('*').eq('is_active', true);
  console.log('Result 2 count:', res2.data ? res2.data.length : 0, 'Error:', res2.error);

  console.log('\nQuery 3: select merida-grill');
  const res3 = await supabase.from('restaurants').select('*').eq('slug', 'merida-grill');
  console.log('Result 3 count:', res3.data ? res3.data.length : 0, 'Error:', res3.error);

  process.exit(0);
}

debug();
