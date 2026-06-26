import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../App';
import logo from '../../imports/logo.png';
import { useSettings } from '../contexts/SettingsContext';
import { registrarMetrica } from '../../supabase';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useSettings();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  // ADD 2 — Remember session state
  const [rememberSession, setRememberSession] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrorMsg('');
  const ok = login(formData.email, formData.password);
  if (ok) {
    await registrarMetrica(formData.email, 'login', true);
    navigate('/feed');
  } else {
    await registrarMetrica(formData.email, 'login', false);
    setErrorMsg(t('Credenciales incorrectas. Verifica tu email y contraseña.'));
  }
};

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAF7F2' }}>
      {/* Header con logo */}
      <div className="px-6 py-8">
        <button
          onClick={() => navigate('/')}
          className="text-[#0F3460] hover:bg-slate-100 p-2 rounded-lg inline-flex items-center gap-2 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">{t('Volver')}</span>
        </button>

        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="EcoSwap" className="w-24 h-24 mb-6" />
          <h1 className="text-3xl font-bold text-[#0F3460] mb-2">
            {t('Bienvenido de nuevo')}
          </h1>
          <p className="text-slate-600 text-center">
            {t('Inicia sesión para continuar intercambiando')}
          </p>
        </div>
      </div>

      {/* Formulario - Aplicando Ley de Proximidad CORRECTA */}
      <div className="flex-1 px-6 pb-6">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
            {/* Sección: Credenciales de Acceso - Ley de Proximidad */}
            <div className="mb-8 p-6 border-2 border-[#0F3460] border-opacity-10 rounded-xl bg-slate-50">
              <h2 className="font-bold text-[#0F3460] mb-6 text-lg">
                {t('Credenciales de Acceso')}
              </h2>

              {/* Email - agrupado con icono */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#16A085]" />
                  {t('Correo Electrónico')}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-transparent"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              {/* Contraseña - agrupado con icono y toggle de visibilidad */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#16A085]" />
                  {t('Contraseña')}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* ADD 2 — Recordar sesión checkbox */}
            <div className="mb-5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setRememberSession(!rememberSession)}
                className="w-4 h-4 rounded flex items-center justify-center border-2 transition-all flex-shrink-0"
                style={{
                  backgroundColor: rememberSession ? '#16A085' : 'white',
                  borderColor: rememberSession ? '#16A085' : '#cbd5e1',
                }}
              >
                {rememberSession && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <label
                onClick={() => setRememberSession(!rememberSession)}
                className="text-xs cursor-pointer select-none"
                style={{ color: '#0D3B4F' }}
              >
                {t('Recordar sesión')}
              </label>
            </div>

            {/* Olvidé mi contraseña - Separado visualmente por espacio */}
            <div className="mb-6 text-right">
              <button
                type="button"
                className="text-sm text-[#16A085] hover:underline font-medium"
              >
                {t('¿Olvidaste tu contraseña?')}
              </button>
            </div>

            {/* Error de credenciales */}
            {errorMsg && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-300 rounded-lg text-red-600 text-sm text-center">
                {errorMsg}
              </div>
            )}

            {/* Botón de inicio de sesión - Figura-Fondo */}
            <button
              type="submit"
              className="w-full bg-[#16A085] hover:bg-[#138D75] text-white py-4 rounded-xl font-semibold shadow-lg transition-all transform hover:scale-105 mb-6"
            >
              {t('Iniciar Sesión')}
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">o</span>
              </div>
            </div>

            {/* Botón de registro - Ley de Similitud (estilo secundario consistente) */}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="w-full bg-white border-2 border-[#0F3460] text-[#0F3460] py-4 rounded-xl font-semibold hover:bg-[#0F3460] hover:text-white transition-all"
            >
              {t('Crear Cuenta Nueva')}
            </button>
          </form>

          {/* Annotation - Hipótesis (Login) */}
          <div className="bg-[#F5F5F5] rounded-[8px] p-[12px] mt-6">
            <p className="text-[#0D3B4F] text-[11px]">
              Hypothesis: Visual consistency with a beige background creates a more cohesive experience across screens.
            </p>
          </div>

          {/* Información de seguridad - Ley de Proximidad */}
          <div className="mt-8 bg-[#16A085] bg-opacity-10 border border-[#16A085] border-opacity-30 rounded-xl p-4">
            <p className="text-sm text-[#0F3460] text-center">
              {t('🔒 Tu información está protegida con encriptación de nivel bancario')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
