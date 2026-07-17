import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Mail, RefreshCw, ArrowLeft } from 'lucide-react';
import { useAuth } from '../App';
import { useSettings } from '../contexts/SettingsContext';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../../imports/logo.png';
import { registrarMetrica } from '../../supabase';

// ─── CONFIGURACIÓN EMAILJS ───────────────────────────────────────────────────
// Reemplaza estos valores con los tuyos de emailjs.com
const EMAILJS_SERVICE_ID = 'service_peqmk6e';
const EMAILJS_TEMPLATE_ID = 'template_ctnntlq';
const EMAILJS_PUBLIC_KEY = 'wrouZUgpNAcIPppO7';
// ─────────────────────────────────────────────────────────────────────────────

const CODE_EXPIRY_MS = 10 * 60 * 1000; // 10 minutos

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerificationEmail(
  toEmail: string,
  toName: string,
  code: string
): Promise<void> {
  // Importamos emailjs dinámicamente para no bloquear el bundle si no está instalado
  const emailjs = await import('@emailjs/browser');
  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      email: toEmail,
      passcode: code,
    },
    EMAILJS_PUBLIC_KEY
  );
}

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, registerUser, activatePremium } = useAuth();
  const { t } = useSettings();

  // Datos que vienen de Register
  const state = (location.state || {}) as {
    name?: string;
    email?: string;
    password?: string;
    fromUpgrade?: boolean;
  };
  const { name = '', email = '', password = '', fromUpgrade = false } = state;

  const [code, setCode] = useState('');
  const [sentCode, setSentCode] = useState('');
  const [sentAt, setSentAt] = useState<number>(0);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Envía el código al montar el componente
  useEffect(() => {
    if (!email) {
      navigate('/register');
      return;
    }
    handleSendCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Limpia el intervalo al desmontar
  useEffect(() => {
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, []);

  const startCooldown = (seconds = 60) => {
    setResendCooldown(seconds);
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    cooldownRef.current = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendCode = async () => {
    if (sending || resendCooldown > 0) return;
    setSending(true);
    setError('');
    const newCode = generateCode();
    try {
      await sendVerificationEmail(email, name, newCode);
      setSentCode(newCode);
      setSentAt(Date.now());
      startCooldown(60);
    } catch (err) {
      console.error('EmailJS error:', err);
      setError(
        'No se pudo enviar el código. Verifica tu conexión o configura EmailJS correctamente.'
      );
      // En desarrollo: mostrar el código en consola para pruebas
      if (import.meta.env.DEV) {
        console.info(`[DEV] Código de verificación: ${newCode}`);
        setSentCode(newCode);
        setSentAt(Date.now());
        startCooldown(60);
        setError('(Modo dev) Revisa la consola para ver el código.');
      }
    } finally {
      setSending(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!sentCode) {
      setError('Primero solicita el código de verificación.');
      return;
    }

    // Verificar expiración (10 minutos)
    if (Date.now() - sentAt > CODE_EXPIRY_MS) {
      setError('El código ha expirado. Solicita uno nuevo.');
      return;
    }

    if (code.trim() !== sentCode) {
      setError('Código incorrecto. Inténtalo de nuevo.');
      return;
    }

    // Código correcto: registrar usuario y loguear
    registerUser(name, email, password);
    await registrarMetrica(email, 'registro_completado', true);
    setSuccess(true);
    setTimeout(() => {
      login(email, password);
      if (fromUpgrade) {
        activatePremium(email);
        navigate('/feed', { state: { justUpgraded: true } });
      } else {
        navigate('/feed');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAF7F2' }}>
      {/* Header */}
      <div className="px-6 py-8">
        <button
          onClick={() => navigate('/register')}
          className="text-[#0F3460] hover:bg-slate-100 p-2 rounded-lg inline-flex items-center gap-2 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Volver</span>
        </button>

        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="EcoSwap" className="w-20 h-20 mb-4" />
          <h1 className="text-3xl font-bold text-[#0F3460] mb-2">Verifica tu email</h1>
          <p className="text-slate-600 text-center text-sm max-w-xs">
            Te enviamos un código de 6 dígitos a{' '}
            <span className="font-semibold text-[#16A085]">{email}</span>
          </p>
        </div>
      </div>

      <div className="flex-1 px-6 pb-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Ícono animado */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#16A085] bg-opacity-10 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-[#16A085]" />
              </div>
            </div>

            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-3 mb-6"
                >
                  <CheckCircle2 className="w-12 h-12 text-[#16A085]" />
                  <p className="font-semibold text-[#0F3460] text-lg">¡Verificado!</p>
                  <p className="text-slate-500 text-sm">Redirigiendo al feed...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {!success && (
              <form onSubmit={handleVerify} className="space-y-5">
                {/* Estado del envío */}
                {sending && (
                  <div className="flex items-center gap-2 text-sm text-slate-500 justify-center">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Enviando código...
                  </div>
                )}

                {/* Campo de código */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Código de verificación
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-transparent"
                    placeholder="000000"
                    required
                    disabled={sending}
                  />
                  <p className="text-xs text-slate-400 mt-2 text-center">
                    El código es válido por 10 minutos
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                    {error}
                  </div>
                )}

                {/* Botón verificar */}
                <button
                  type="submit"
                  disabled={code.length !== 6 || sending}
                  className={`w-full py-4 rounded-xl font-semibold transition-all ${
                    code.length === 6 && !sending
                      ? 'bg-[#16A085] hover:bg-[#138D75] text-white'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Verificar código
                </button>

                {/* Reenviar código */}
                <div className="text-center">
                  {resendCooldown > 0 ? (
                    <p className="text-sm text-slate-400">
                      Reenviar en <span className="font-semibold text-[#0F3460]">{resendCooldown}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendCode}
                      disabled={sending}
                      className="text-sm text-[#16A085] hover:underline font-medium flex items-center gap-1 mx-auto"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Reenviar código
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Info adicional */}
          <div className="mt-6 bg-[#16A085] bg-opacity-10 border border-[#16A085] border-opacity-30 rounded-xl p-4">
            <p className="text-sm text-[#0F3460] text-center">
              📧 Revisa también tu carpeta de spam si no ves el correo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
