async function check() {
  const url = 'https://oxjbswrcdhlbifgsnhll.supabase.co/rest/v1/restaurants?select=*&limit=1';
  const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94amJzd3JjZGhsYmlmZ3NuaGxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3MjYyNzYsImV4cCI6MjA5OTMwMjI3Nn0.6PjiQl8rtMvROm3Zlfr9FR31JZfQziHK09GzlvhJWjg';
  
  try {
    const res = await fetch(url, {
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`
      }
    });
    const json = await res.json();
    console.log('STATUS:', res.status);
    if (json && json.length > 0) {
      console.log('COLUMNS:', Object.keys(json[0]));
    } else {
      console.log('NO DATA OR ERROR:', json);
    }
  } catch (err) {
    console.error('FETCH ERROR:', err);
  }
  process.exit(0);
}

check();
