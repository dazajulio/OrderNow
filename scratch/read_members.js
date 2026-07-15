const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://oxjbswrcdhlbifgsnhll.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94amJzd3JjZGhsYmlmZ3NuaGxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3MjYyNzYsImV4cCI6MjA5OTMwMjI3Nn0.6PjiQl8rtMvROm3Zlfr9FR31JZfQziHK09GzlvhJWjg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  try {
    const { data: members, error: err1 } = await supabase.from('restaurant_members').select('*');
    const { data: leads, error: err2 } = await supabase.from('leads').select('*');
    console.log('RESULT_MEMBERS:', JSON.stringify(members));
    console.log('RESULT_LEADS:', JSON.stringify(leads));
  } catch (e) {
    console.error(e);
  }
  process.exit(0);
}

check();
