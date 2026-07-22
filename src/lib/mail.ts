/**
 * Servicio de Envío de Correos - Mtriq.app
 * Utiliza la API HTTP directa de Resend para evitar dependencias pesadas.
 */

interface WelcomeEmailProps {
  toEmail: string;
  restaurantName: string;
  contactName: string;
  slug: string;
}

export async function sendWelcomeEmail({
  toEmail,
  restaurantName,
  contactName,
  slug,
}: WelcomeEmailProps): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn('RESEND_API_KEY no está configurada en las variables de entorno. Omitiendo correo.');
    return false;
  }

  // URL del kiosco/menú
  const kioskUrl = `https://mtriq.app/${slug}`;
  const dashboardUrl = `https://mtriq.app/${slug}/gerente`;
  const kdsUrl = `https://mtriq.app/${slug}/cocina`;

  // HTML Plantilla Premium (Diseño corporativo Mtriq - Naranja / Oscuro)
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
          background-color: #ff6b00/10;
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
          <p>Tu cuenta para <strong>${restaurantName}</strong> ha sido desplegada con éxito. Tu nuevo Kiosko inteligente y tu monitor de cocina (KDS) ya están sincronizados y listos para llevar la digitalización de tu restaurante al siguiente nivel.</p>

          <div class="card">
            <div class="card-title">Tus Links de Acceso Directo</div>
            <div class="detail-row">
              <span class="detail-label">Usuario / Email:</span>
              <span class="detail-value">${toEmail}</span>
            </div>
            <div class="detail-row" style="margin-top: 12px;">
              <span class="detail-label">1. Panel de Gerente (Dashboard):</span><br>
              <span class="detail-value"><a href="${dashboardUrl}" style="color: #ff6b00; text-decoration: none;">mtriq.app/${slug}/gerente</a></span>
            </div>
            <div class="detail-row" style="margin-top: 12px;">
              <span class="detail-label">2. Monitor de Cocina (KDS):</span><br>
              <span class="detail-value"><a href="${kdsUrl}" style="color: #ff6b00; text-decoration: none;">mtriq.app/${slug}/cocina</a></span>
            </div>
            <div class="detail-row" style="margin-top: 12px;">
              <span class="detail-label">3. Kiosko / Menú Digital (QR):</span><br>
              <span class="detail-value"><a href="${kioskUrl}" style="color: #ff6b00; text-decoration: none;">mtriq.app/${slug}</a></span>
            </div>
          </div>

          <div style="text-align: center;">
            <a href="${dashboardUrl}" class="button">Ir al Dashboard de Configuración</a>
          </div>

          <div class="steps">
            <div class="card-title">Próximos pasos recomendados</div>
            <div class="step-item">
              <span class="step-number">1</span>
              <span class="step-text"><strong>Configura tu Menú</strong>: Agrega tus categorías y sube tus productos con sus respectivos modificadores (bebida mediana, salsa extra, etc).</span>
            </div>
            <div class="step-item">
              <span class="step-number">2</span>
              <span class="step-text"><strong>Descarga tus Códigos QR</strong>: Ve al panel de códigos QR, configúralos con tus números de mesa e imprímelos.</span>
            </div>
            <div class="step-item">
              <span class="step-number">3</span>
              <span class="step-text"><strong>Activa la Cocina (KDS)</strong>: Deja abierta la pantalla del KDS en una tableta o pantalla táctil en la cocina para recibir comandas al instante.</span>
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
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Mtriq Soporte <soporte@mtriq.app>',
        to: [toEmail],
        subject: `¡Bienvenido a Mtriq! Activa tu local: ${restaurantName}`,
        html: emailHtml,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error de API de Resend:', data);
      return false;
    }

    console.log('Correo de bienvenida enviado exitosamente via Resend:', data.id);
    return true;
  } catch (error) {
    console.error('Excepción al enviar correo por Resend:', error);
    return false;
  }
}
