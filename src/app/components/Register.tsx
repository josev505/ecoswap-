import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Camera, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../App';
import { useSettings } from '../contexts/SettingsContext';
import logo from '../../imports/logo.png';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { registrarMetrica } from '../../supabase';


export default function Register() {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const { t } = useSettings();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    dni: ''
  });
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleFinalize = async (e: React.MouseEvent) => {
  e.preventDefault();
  await registrarMetrica(formData.email, 'registro_iniciado', true);
  navigate('/verify-email', {
    state: {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }
  });
};

  // Ley de Continuidad - Línea de progreso
  const steps = [t('DNI'), t('Selfie'), t('Validación')];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
          >
            <div className="bg-white px-6 py-3 rounded-full shadow-lg border border-[#16A085] flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#16A085]" />
              <span className="font-semibold text-[#0F3460]">{t('¡Registro exitoso!')}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="px-6 py-8">
        <img src={logo} alt="EcoSwap" className="w-16 h-16 mx-auto mb-6" />

        {/* Ley de Continuidad - Barra de progreso */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex items-center justify-between px-4">
            {steps.map((label, idx) => (
              <Fragment key={idx}>
                {/* Contenedor Flex para círculo y texto */}
                <div className="flex flex-col items-center justify-center relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      idx + 1 <= step
                        ? 'bg-[#16A085] text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {idx + 1 < step ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>
                  {/* Texto posicionado absoluto para no desplazar */}
                  <span className="absolute top-12 text-xs text-slate-600 text-center w-24">
                    {label}
                  </span>
                </div>
                
                {/* Línea conectora */}
                {idx < steps.length - 1 && (
                  <div className="flex-1 mx-2">
                    <Progress
                      value={idx + 1 < step ? 100 : 0}
                      className="h-1 bg-slate-200"
                    />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Formulario - Ley de Similitud (campos consistentes) */}
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-[#0F3460] mb-6">
                Datos Personales
              </h2>

              {/* Todos los campos tienen el mismo estilo - Ley de Similitud */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre Completo
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Juan Pérez"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="juan@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Contraseña
                </label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Mínimo 6 caracteres"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Teléfono
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="987654321"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  DNI
                </label>
                <Input
                  type="text"
                  value={formData.dni}
                  onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                  placeholder="12345678"
                  required
                  maxLength={8}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#16A085] hover:bg-[#138D75] text-white py-6 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                Continuar
                <ChevronRight className="w-5 h-5" />
              </Button>
            </form>
          )}

          {step === 2 && (
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold text-[#0F3460] mb-6">
                Verificación Facial
              </h2>

              <div className="bg-slate-100 rounded-2xl p-12 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center min-h-[300px]">
                <div className="relative mb-4">
                  <Camera className="w-16 h-16 text-[#0F3460]" />
                  {/* Checkmark animado */}
                  <div className="absolute -top-2 -right-2 animate-bounce">
                    <div className="bg-[#16A085] rounded-full p-1">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">
                  Toma una selfie para verificar tu identidad
                </p>
                <Button variant="outline" className="text-[#16A085] border-[#16A085] hover:bg-[#16A085] hover:text-white px-6 py-6 rounded-lg flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Abrir Cámara
                </Button>
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full bg-[#16A085] hover:bg-[#138D75] text-white py-6 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                Continuar
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-6">
              <div className="bg-[#16A085] bg-opacity-10 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="w-12 h-12 text-[#16A085]" />
              </div>

              <h2 className="text-2xl font-bold text-[#0F3460]">
                ¡Verificación Completa!
              </h2>

              <p className="text-slate-600">
                Tu cuenta ha sido verificada exitosamente. Ya puedes comenzar a intercambiar.
              </p>

              <Button
                onClick={handleFinalize}
                className="w-full bg-[#16A085] hover:bg-[#138D75] text-white py-6 rounded-lg font-semibold"
              >
                Finalizar Registro
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
