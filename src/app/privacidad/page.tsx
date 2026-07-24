import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Footer } from '@/components/marketing/Footer';

export const metadata = {
  title: 'Políticas de Privacidad - glubbi.app',
  description: 'Políticas de Privacidad y Tratamiento de Datos del software para restaurantes glubbi.app.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#080d1a] text-zinc-300 font-sans flex flex-col justify-between selection:bg-orange-500/20">
      
      {/* Background Liquid Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-20 max-w-5xl mx-auto px-6 w-full py-6 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full pl-3 pr-4 py-1.5 shadow-sm hover:shadow-md hover:bg-white/10 transition-all select-none">
          <img src="/logo-Glubbi.png" alt="Glubbi Logo" className="w-5 h-5 object-contain" />
          <span className="text-sm font-black tracking-tight text-white">
            Glubbi<span className="text-orange-500">.app</span>
          </span>
        </Link>
        <Link href="/" className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 w-full py-16 flex-1 space-y-10">
        
        {/* Title */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Privacidad & Seguridad
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Políticas de Privacidad
          </h1>
          <p className="text-sm text-zinc-500">
            Última actualización: 20 de Julio de 2026
          </p>
        </div>

        {/* Legal Body */}
        <div className="space-y-8 text-zinc-400 text-sm md:text-base leading-relaxed border-t border-white/5 pt-8">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight">1. Información General y Responsable</h2>
            <p>
              glubbi.app se compromete firmemente a proteger la privacidad y la seguridad de la información personal de sus usuarios (dueños de restaurantes) y de los comensales finales que utilizan nuestros menús interactivos. Esta Política de Privacidad describe el tipo de información que recopilamos, cómo la utilizamos, bajo qué medidas de seguridad la protegemos y los derechos que le asisten en materia de protección de datos.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight">2. Datos Recopilados</h2>
            <p>
              Recopilamos dos tipos de información a través del uso de nuestra plataforma:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>
                <strong>Datos del Restaurante (Inquilino)</strong>: Al registrarse, solicitamos el nombre del establecimiento, nombre del contacto, dirección física del restaurante, número de teléfono de contacto operativo, correo electrónico de acceso, contraseña encriptada y enlaces a redes sociales opcionales (Instagram, Facebook y TikTok).
              </li>
              <li>
                <strong>Datos de los Comensales (Clientes del Kiosco)</strong>: Para poder procesar los pedidos desde el kiosco digital en mesa o el módulo de delivery, recopilamos el nombre del cliente, dirección de correo electrónico, teléfono de contacto y dirección exacta de despacho (solo aplicable a órdenes de entrega a domicilio).
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight">3. Uso de la Información</h2>
            <p>
              La información recopilada se utiliza exclusivamente para los siguientes fines operativos del negocio:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>Configurar e inicializar de forma única el espacio de trabajo del restaurante en la base de datos.</li>
              <li>Procesar, enrutar y mostrar en tiempo real los pedidos de comida en el Kitchen Display System (KDS) de la cocina.</li>
              <li>Habilitar el canal de comunicación del restaurante con su cliente final para coordinar despachos o informar estados del pedido.</li>
              <li>Permitir el funcionamiento del Agente de Crecimiento IA para el análisis automático de recurrencia de visitas y ticket promedio.</li>
              <li>Enviar recibos de pago digitales y facturas por la suscripción mensual de Glubbi a la cuenta del gerente.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight">4. Protección y Seguridad de los Datos</h2>
            <p>
              La base de datos de glubbi.app está alojada de manera segura en PostgreSQL utilizando servicios cloud. Implementamos políticas de <strong>Row Level Security (RLS)</strong> a nivel de motor de datos. Esto significa que los datos de cada restaurante y sus clientes están estrictamente aislados y protegidos a nivel lógico: ningún inquilino, gerente o usuario externo puede consultar o modificar datos pertenecientes a otro identificador de restaurante diferente. 
            </p>
            <p>
              Toda la comunicación de red con nuestros servidores se realiza mediante encriptación segura HTTPS y certificados SSL.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight">5. Transferencia de Datos a Terceros</h2>
            <p>
              Glubbi <strong>no vende, comercializa ni alquila</strong> información personal de restaurantes ni de comensales a terceras empresas. Los datos recopilados solo se comparten con proveedores de infraestructura esenciales para la operatividad del SaaS:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li><strong>Pasarelas de Pago</strong>: Los cobros de la suscripción mensual del Servicio son procesados a través de Lemon Squeezy, quien actúa como nuestro Comerciante Registrado (Merchant of Record). Lemon Squeezy gestiona toda la información de facturación y tarjetas de crédito de manera encriptada bajo estrictos estándares internacionales PCI-DSS. Glubbi nunca procesa, visualiza ni almacena números de tarjetas de crédito o débito en sus servidores.</li>
              <li><strong>Servidores de Correo (Resend)</strong>: Para el despacho automatizado de correos de confirmación y notificaciones del sistema.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight">6. Sus Derechos</h2>
            <p>
              El Restaurante y sus comensales tienen derecho a acceder, rectificar, limitar, exportar o solicitar la eliminación total de sus datos personales de nuestros sistemas. Para ejercer estos derechos o revocar los consentimientos otorgados, puede enviar una solicitud formal por escrito a <a href="mailto:soporte@glubbi.app" className="text-orange-500 font-semibold hover:underline">soporte@glubbi.app</a>. Glubbi App opera en la ciudad de Bogota. Calle 140A - Cedritos y digitalmente con sede de desarrollo y soporte en Mérida, Venezuela. Su solicitud será procesada en un plazo máximo de 72 horas hábiles.
            </p>
          </section>

        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
