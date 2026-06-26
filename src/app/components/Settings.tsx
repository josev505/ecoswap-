import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Moon, Sun, Check } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { motion } from 'motion/react';

export default function Settings() {
  const navigate = useNavigate();
  const { language, setLanguage, darkMode, setDarkMode, t } = useSettings();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="flex items-center gap-3 px-4 py-4 max-w-md mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-[#0F3460] hover:bg-slate-100 p-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-[#0F3460] text-xl">{t('Ajustes')}</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">

        {/* ── Language Section ── */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#16A085]" />
            <h2 className="font-bold text-[#0F3460]">{t('Idioma')}</h2>
          </div>

          {/* Spanish option */}
          <button
            onClick={() => setLanguage('es')}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🇵🇪</span>
              <span className="font-medium text-slate-700">{t('Español')}</span>
            </div>
            {language === 'es' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Check className="w-5 h-5 text-[#16A085]" />
              </motion.div>
            )}
          </button>

          <div className="border-t border-slate-100 mx-5" />

          {/* English option */}
          <button
            onClick={() => setLanguage('en')}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🇺🇸</span>
              <span className="font-medium text-slate-700">{t('Inglés')}</span>
            </div>
            {language === 'en' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Check className="w-5 h-5 text-[#16A085]" />
              </motion.div>
            )}
          </button>
        </div>

        {/* ── Appearance / Dark Mode Section ── */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
            {darkMode
              ? <Moon className="w-5 h-5 text-[#16A085]" />
              : <Sun className="w-5 h-5 text-[#16A085]" />
            }
            <h2 className="font-bold text-[#0F3460]">{t('Apariencia')}</h2>
          </div>

          <div className="px-5 py-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-700">{t('Modo Oscuro')}</p>
              <p className="text-sm text-slate-500 mt-0.5">
                {darkMode ? t('Activo') : t('Inactivo')}
              </p>
            </div>

            {/* Toggle switch with spring animation */}
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${
                darkMode ? 'bg-[#16A085]' : 'bg-slate-300'
              }`}
              aria-label="Toggle dark mode"
            >
              <motion.div
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                animate={{ left: darkMode ? '30px' : '4px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>
        </div>

      </div>
    </div>
  );
}
