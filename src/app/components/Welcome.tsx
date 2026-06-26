import { useNavigate } from 'react-router-dom';
import { Shield, MapPin, Award } from 'lucide-react';
import logo from '../../imports/logo.png';
import { useSettings } from '../contexts/SettingsContext';

export default function Welcome() {
  const navigate = useNavigate();
  const { t } = useSettings();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex flex-col">
      {/* Hero Section - Ley de Figura-Fondo */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <img src={logo} alt="EcoSwap" className="w-32 h-32 mb-8" />

        <h1 className="text-4xl font-bold text-[#0F3460] mb-3 text-center">
          EcoSwap
        </h1>
        <p className="text-lg text-slate-600 mb-12 text-center max-w-md">
          {t('Intercambia con confianza en tu comunidad local')}
        </p>

        {/* Botón Principal - Alto contraste (Figura-Fondo) */}
        <button
          onClick={() => navigate('/feed')}
          className="bg-[#16A085] hover:bg-[#138D75] text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-lg transform transition-all hover:scale-105 mb-16"
        >{t('Comenzar')}</button>

        {/* Beneficios - Ley de Proximidad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center text-center">
            <div className="bg-[#0F3460] p-4 rounded-full mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-[#0F3460] mb-2">{t('Verificación DNI')}</h3>
            <p className="text-sm text-slate-600">
              {t('Todos los usuarios verificados con documento oficial')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center text-center">
            <div className="bg-[#16A085] p-4 rounded-full mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-[#0F3460] mb-2">{t('GPS Local')}</h3>
            <p className="text-sm text-slate-600">
              {t('Encuentra productos cerca de ti en Chimbote')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center text-center">
            <div className="bg-[#0F3460] p-4 rounded-full mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-[#0F3460] mb-2">{t('Puntos Seguros')}</h3>
            <p className="text-sm text-slate-600">
              {t('Intercambia en lugares públicos seguros')}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-6 space-y-2">
        <button
          onClick={() => navigate('/login')}
          className="block w-full text-[#16A085] hover:underline text-sm"
        >
          {t('¿Ya tienes cuenta? Inicia sesión')}
        </button>
        <button
          onClick={() => navigate('/register')}
          className="block w-full text-slate-500 hover:text-[#0F3460] text-sm"
        >
          {t('Crear cuenta nueva')}
        </button>
      </div>
    </div>
  );
}
