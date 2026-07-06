import { useNavigate } from 'react-router-dom';
import { Leaf, Shield, MapPin, Award, Upload, Users, Repeat, Bike, Laptop, Music } from 'lucide-react';
import logo from '../../imports/logo.png';
import { useSettings } from '../contexts/SettingsContext';

export default function Landing() {
  const navigate = useNavigate();
  const { t } = useSettings();

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="EcoSwap" className="w-9 h-9 rounded-lg" />
            <span className="font-bold text-[#0F3460] text-lg">EcoSwap</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#como-funciona" className="hover:text-[#0F3460] transition-colors">{t('Cómo funciona')}</a>
            <a href="#beneficios" className="hover:text-[#0F3460] transition-colors">{t('Beneficios')}</a>
            <a href="#comunidad" className="hover:text-[#0F3460] transition-colors">{t('Comunidad')}</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="hidden sm:block text-sm font-semibold text-[#0F3460] px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              {t('Iniciar sesión')}
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-[#16A085] hover:bg-[#138D75] text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors"
            >
              {t('Crear cuenta')}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F3460] to-[#0c2847]">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div>
            <span className="inline-flex items-center gap-2 bg-white/10 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <Leaf className="w-3.5 h-3.5" />
              {t('Trueque local y verificado en Chimbote')}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
              {t('Lo que ya no usas, alguien más lo necesita')}
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-md">
              {t('Publica lo que quieres intercambiar, conecta con vecinos verificados y acuerda el trueque en un punto seguro cerca de ti.')}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/register')}
                className="bg-[#16A085] hover:bg-[#138D75] text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg transition-all hover:scale-105"
              >
                {t('Comenzar gratis')}
              </button>
              <button
                onClick={() => navigate('/feed')}
                className="border border-white/20 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                {t('Ver productos')}
              </button>
            </div>
          </div>

          {/* Visual: mini collage de tarjetas del feed real */}
          <div className="relative hidden md:block">
            <div className="grid grid-cols-2 gap-4 rotate-2">
              <div className="bg-white rounded-2xl p-4 shadow-2xl">
                <div className="bg-slate-100 rounded-xl h-24 overflow-hidden mb-3">
                   <img src="https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400" alt="Bicicleta" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs font-semibold text-[#0F3460]">{t('Bicicleta de Montaña')}</p>
                <p className="text-[11px] text-slate-400">{t('0.8 km · Buen estado')}</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-2xl -mt-6">
                <div className="bg-slate-100 rounded-xl h-24 overflow-hidden mb-3">
                  <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400" alt="Laptop" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs font-semibold text-[#0F3460]">{t('Laptop HP Core i5')}</p>
                <p className="text-[11px] text-slate-400">{t('1.2 km · Como nuevo')}</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-2xl col-span-2">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 rounded-xl w-16 h-16 overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400" alt="Guitarra" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#0F3460]">{t('Guitarra Acústica')}</p>
                    <p className="text-[11px] text-slate-400">{t('0.5 km · 15 intercambios')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA - loop de intercambio (elemento distintivo) */}
      <section id="como-funciona" className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-bold text-[#0F3460] mb-3">{t('Un ciclo simple: publica, conecta e intercambia')}</h2>
          <p className="text-slate-500 max-w-lg mx-auto">{t('Cada intercambio le da una segunda vida a un objeto y cierra el ciclo en tu propia comunidad.')}</p>
        </div>

        {/* Desktop: loop circular */}
        <div className="hidden md:block relative max-w-md mx-auto h-[380px]">
          <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
            <circle cx="200" cy="200" r="150" fill="none" stroke="#CBD5C0" strokeWidth="2" strokeDasharray="6 8" />
          </svg>

          {/* Nodo 1: Publica (arriba) */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-white shadow-lg border-4 border-[#16A085] flex items-center justify-center">
              <Upload className="w-9 h-9 text-[#16A085]" />
            </div>
            <span className="mt-3 text-xs font-bold text-slate-400 tracking-wide">01</span>
            <span className="font-semibold text-[#0F3460] text-sm">{t('Publica')}</span>
          </div>

          {/* Nodo 2: Conecta (abajo-derecha) */}
          <div className="absolute right-0 bottom-6 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-white shadow-lg border-4 border-[#0F3460] flex items-center justify-center">
              <Users className="w-9 h-9 text-[#0F3460]" />
            </div>
            <span className="mt-3 text-xs font-bold text-slate-400 tracking-wide">02</span>
            <span className="font-semibold text-[#0F3460] text-sm">{t('Conecta')}</span>
          </div>

          {/* Nodo 3: Intercambia (abajo-izquierda) */}
          <div className="absolute left-0 bottom-6 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-white shadow-lg border-4 border-[#16A085] flex items-center justify-center">
              <Repeat className="w-9 h-9 text-[#16A085]" />
            </div>
            <span className="mt-3 text-xs font-bold text-slate-400 tracking-wide">03</span>
            <span className="font-semibold text-[#0F3460] text-sm">{t('Intercambia')}</span>
          </div>
        </div>

        {/* Mobile: stack vertical */}
        <div className="md:hidden max-w-xs mx-auto space-y-8">
          {[
            { icon: Upload, label: t('Publica'), num: '01' },
            { icon: Users, label: t('Conecta'), num: '02' },
            { icon: Repeat, label: t('Intercambia'), num: '03' },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-16 h-16 shrink-0 rounded-full bg-white shadow-md border-2 border-[#16A085] flex items-center justify-center">
                <step.icon className="w-6 h-6 text-[#16A085]" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400">{step.num}</span>
                <p className="font-semibold text-[#0F3460]">{step.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFICIOS */}
      <section id="beneficios" className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
            <div className="bg-[#0F3460] p-4 rounded-full inline-flex mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-[#0F3460] mb-2">{t('Verificación DNI')}</h3>
            <p className="text-sm text-slate-500">{t('Todos los usuarios verificados con documento oficial')}</p>
          </div>
          <div className="p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
            <div className="bg-[#16A085] p-4 rounded-full inline-flex mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-[#0F3460] mb-2">{t('GPS Local')}</h3>
            <p className="text-sm text-slate-500">{t('Encuentra productos cerca de ti en Chimbote')}</p>
          </div>
          <div className="p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
            <div className="bg-[#0F3460] p-4 rounded-full inline-flex mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-[#0F3460] mb-2">{t('Puntos Seguros')}</h3>
            <p className="text-sm text-slate-500">{t('Intercambia en lugares públicos seguros')}</p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="comunidad" className="py-16 px-6 bg-[#0F3460]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t('Únete a la comunidad que ya está intercambiando')}
          </h2>
          <button
            onClick={() => navigate('/register')}
            className="bg-[#16A085] hover:bg-[#138D75] text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg transition-all hover:scale-105"
          >
            {t('Crear mi cuenta')}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <span>© {new Date().getFullYear()} EcoSwap · Chimbote, Perú</span>
          <div className="flex gap-6">
            <button onClick={() => navigate('/login')} className="hover:text-[#0F3460]">{t('Iniciar sesión')}</button>
            <button onClick={() => navigate('/register')} className="hover:text-[#0F3460]">{t('Crear cuenta')}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}