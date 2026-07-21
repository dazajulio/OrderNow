'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  Mail, 
  Send, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Users 
} from 'lucide-react';

export default function EmailsPage() {
  const supabase = createClient();

  const [members, setMembers] = useState<any[]>([]);
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [previewTab, setPreviewTab] = useState<'edit' | 'preview'>('edit');

  // --- Load members for auto-completion / selection list ---
  useEffect(() => {
    async function loadMembers() {
      setIsLoadingMembers(true);
      try {
        const { data, error } = await supabase.rpc('get_super_admin_members');
        if (!error && data) {
          // Remove duplicates or invalid emails
          const uniqueMembers = data.filter((m: any, index: number, self: any[]) =>
            m.email && !m.email.includes('🔐') && self.findIndex(t => t.email === m.email) === index
          );
          setMembers(uniqueMembers);
        }
      } catch (err) {
        console.warn('Could not load members for autocomplete:', err);
      }
      setIsLoadingMembers(false);
    }
    loadMembers();
  }, []);

  // --- Send handler ---
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setIsSending(true);

    if (!toEmail.trim() || !subject.trim() || !body.trim()) {
      setErrorMsg('Por favor rellena todos los campos.');
      setIsSending(false);
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: toEmail.trim(),
          subject: subject.trim(),
          body: body.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMsg(`¡Correo enviado exitosamente! ID: ${data.emailId}`);
        // Reset form
        setToEmail('');
        setSubject('');
        setBody('');
        setPreviewTab('edit');
      } else {
        setErrorMsg(data.error || 'Error al enviar el correo a través de Resend.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Error de red al intentar conectarse con el servidor.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="bg-white shadow-md p-6 border border-gray-200 rounded-3xl backdrop-blur-xl space-y-1">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          Redacción de Correos Corporativos
        </h2>
        <p className="text-xs text-gray-400">Envía notificaciones o comunicados a tus clientes envueltos en la plantilla premium de Mtriq</p>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch">
        
        {/* LEFT PANEL: Composition Form */}
        <div className="bg-white shadow-md border border-gray-200 rounded-3xl p-6 md:p-8 shadow-lg backdrop-blur-xl space-y-6">
          
          <div className="flex border-b border-gray-200 pb-2">
            <button
              onClick={() => setPreviewTab('edit')}
              className={`pb-2.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-all ${
                previewTab === 'edit'
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-gray-400 hover:text-gray-800'
              }`}
            >
              📝 Composición
            </button>
            <button
              onClick={() => setPreviewTab('preview')}
              className={`pb-2.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-all ${
                previewTab === 'preview'
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-gray-400 hover:text-gray-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5 inline mr-1" /> Previsualización
            </button>
          </div>

          {previewTab === 'edit' ? (
            <form onSubmit={handleSendEmail} className="space-y-5">
              
              {/* Recipient Input & Autocomplete dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500">Destinatario (Email)</label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="ejemplo@correo.com"
                    value={toEmail}
                    onChange={(e) => setToEmail(e.target.value)}
                    className="flex-1 bg-slate-50/60 border border-gray-200 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-purple-500"
                  />
                  {members.length > 0 && (
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          setToEmail(e.target.value);
                          e.target.value = ''; // Reset select
                        }
                      }}
                      className="bg-slate-50/60 border border-gray-200 rounded-xl px-2 py-3 text-gray-500 text-xs focus:outline-none cursor-pointer"
                      defaultValue=""
                    >
                      <option value="" disabled>Seleccionar cliente...</option>
                      {members.map((m) => (
                        <option key={m.member_id} value={m.email}>
                          {m.display_name} ({m.restaurant_name})
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <span className="text-[10px] text-gray-600 font-mono">Escribe directamente o selecciona un correo de los clientes registrados.</span>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500">Asunto (Subject)</label>
                <input
                  type="text"
                  required
                  placeholder="Escribe el asunto del correo..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50/60 border border-gray-200 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {/* Body Content */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500">Cuerpo del Mensaje (Contenido del correo)</label>
                <textarea
                  required
                  placeholder="Redacta el contenido principal de tu correo..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={8}
                  className="w-full bg-slate-50/60 border border-gray-200 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-purple-500 resize-none font-sans"
                />
              </div>

              {/* Action feedback */}
              {successMsg && (
                <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-xs font-semibold text-green-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-semibold text-red-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-indigo-600 hover:brightness-110 text-white font-bold rounded-xl text-sm transition-all active:scale-[0.98] shadow-lg shadow-purple-500/10 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSending ? (
                  <span className="w-5 h-5 border-2 border-gray-200 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Despachar Correo con Resend
                  </>
                )}
              </button>

            </form>
          ) : (
            // Live Preview representation in the composition area
            <div className="space-y-4">
              <div className="p-4 bg-slate-50/60 border border-gray-200 rounded-2xl space-y-2 text-xs">
                <div><span className="text-gray-400 font-mono">Para:</span> <span className="text-gray-900 font-mono">{toEmail || '(Vacío)'}</span></div>
                <div><span className="text-gray-400 font-mono">Asunto:</span> <span className="text-white font-bold">{subject || '(Vacío)'}</span></div>
              </div>
              <div className="border border-gray-200 rounded-2xl overflow-hidden p-6 bg-slate-50 font-sans min-h-[250px]">
                <div className="text-center pb-4 border-b border-gray-200">
                  <div className="text-lg font-black text-gray-900 select-none">mtriq<span className="text-orange-500">.app</span></div>
                </div>
                <div className="py-6 text-gray-800 text-sm leading-relaxed whitespace-pre-line min-h-[120px]">
                  {body || 'El cuerpo del correo se previsualizará aquí...'}
                </div>
                <div className="text-center pt-4 border-t border-gray-200 text-[10px] text-gray-600">
                  Este es un correo oficial enviado por el Super Administrador de Mtriq.app.<br />
                  Soporte: soporte@mtriq.app | Calle 140A - Cedritos, Bogotá, Colombia.
                </div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT PANEL: Explanation & Autocomplete Quick List */}
        <div className="bg-white shadow-md border border-gray-200 rounded-3xl p-6 md:p-8 shadow-lg backdrop-blur-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <Mail className="w-5 h-5 text-orange-500" /> Directrices de Envío
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              El correo se despacha utilizando tu infraestructura activa en **Resend** asociada a la dirección verificada `soporte@mtriq.app`.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[11px] text-gray-500">
              <li>El destinatario recibirá un correo oficial sin rastros de tu dirección de Gmail personal.</li>
              <li>El membrete, logo oficial y pie de página de Mtriq se inyectan automáticamente en el servidor durante la entrega.</li>
              <li>Las respuestas de los clientes llegarán al redireccionador de Cloudflare que configuramos, derivándolas directamente a tu Gmail.</li>
            </ul>
          </div>

          {/* Quick List of registered clients */}
          <div className="flex-1 flex flex-col justify-end pt-4 border-t border-gray-200 space-y-3">
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block">Clientes Registrados</span>
            {isLoadingMembers ? (
              <span className="text-xs text-gray-600">Cargando emails de clientes...</span>
            ) : (
              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {members.map(m => (
                  <div 
                    key={m.member_id}
                    onClick={() => setToEmail(m.email)}
                    className="flex justify-between items-center bg-slate-50/40 border border-gray-200 rounded-xl p-2.5 text-[11px] hover:border-orange-500/40 cursor-pointer transition-all"
                  >
                    <div>
                      <span className="block font-bold text-gray-900">{m.display_name}</span>
                      <span className="text-[10px] text-gray-400 font-mono">{m.email}</span>
                    </div>
                    <span className="text-[9px] bg-orange-500/15 text-orange-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      {m.restaurant_name}
                    </span>
                  </div>
                ))}
                {members.length === 0 && (
                  <span className="text-xs text-gray-600">No hay clientes con email verificado aún.</span>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
