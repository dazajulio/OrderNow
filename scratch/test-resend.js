const apiKey = 're_Yh2Z1sdi_A86UopBCdKgM5sK9b6e2PUER';
fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: 'Mtriq Soporte <soporte@mtriq.app>',
    to: ['dazajulio@gmail.com'],
    subject: 'Test Subject',
    html: '<p>Test body</p>',
  }),
})
.then(res => res.json().then(data => ({ status: res.status, data })))
.then(console.log)
.catch(console.error);
