import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'RESEND_API_KEY no está configurada en el servidor.' },
        { status: 500 }
      );
    }

    const { to, subject, body } = await request.json();

    if (!to || !subject || !body) {
      return NextResponse.json(
        { success: false, error: 'Campos faltantes: to, subject, body son requeridos.' },
        { status: 400 }
      );
    }

    // Official Glubbi Premium HTML template wrapper
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
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
            color: #d1d5db;
            font-size: 15px;
            line-height: 1.6;
          }
          .content p {
            margin-bottom: 20px;
          }
          .footer {
            background-color: #090a0f;
            padding: 24px;
            text-align: center;
            font-size: 12px;
            color: #52525b;
            border-top: 1px solid #27272a;
          }
          .footer-link {
            color: #ff6b00;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo-text">Glubbi<span class="orange-text">.app</span></div>
          </div>
          <div class="content">
            ${body.replace(/\n/g, '<br />')}
          </div>
          <div class="footer">
            Este es un correo oficial enviado por el Super Administrador de glubbi.app.<br>
            Soporte: <a href="mailto:soporte@glubbi.app" class="footer-link">soporte@glubbi.app</a> | Calle 140A - Cedritos, Bogotá, Colombia.
          </div>
        </div>
      </body>
      </html>
    `;

    // Dispatch via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Glubbi Soporte <soporte@glubbi.app>',
        to: [to],
        subject: subject,
        html: emailHtml,
      }),
    });

    const responseText = await response.text();
    let data: any = {};
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      data = { message: responseText };
    }

    if (!response.ok) {
      console.error('Error de Resend al despachar correo:', data);
      return NextResponse.json(
        { success: false, error: data.message || 'Error al procesar el envío de correo.' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      emailId: data.id,
    });

  } catch (error: any) {
    console.error('API Send Email error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}
