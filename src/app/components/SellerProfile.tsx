import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Award, Shield, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback } from './ui/avatar';

// Datos de los vendedores (mismo id que los productos en ProductDetail)
const sellerProfiles: Record<number, {
  name: string; rating: number; trades: number; verified: boolean; memberSince: string;
  products: number; bio: string; initials: string;
}> = {
  1: { name: 'Carlos Mendoza', rating: 4.8, trades: 15, verified: true, memberSince: 'Enero 2025', products: 3, bio: 'Apasionado del deporte y el intercambio justo en Chimbote.', initials: 'CM' },
  2: { name: 'Ana Torres', rating: 5.0, trades: 8, verified: true, memberSince: 'Febrero 2025', products: 5, bio: 'Tecnología y trabajo remoto. Siempre equipos en perfecto estado.', initials: 'AT' },
  3: { name: 'Luis Ramirez', rating: 4.8, trades: 15, verified: true, memberSince: 'Diciembre 2024', products: 4, bio: 'Músico y coleccionista. Instrumentos con historia.', initials: 'LR' },
  4: { name: 'Jorge Castillo', rating: 4.7, trades: 20, verified: true, memberSince: 'Noviembre 2024', products: 6, bio: 'Gamer desde siempre. Intercambio consolas y juegos.', initials: 'JC' },
  5: { name: 'María López', rating: 4.9, trades: 6, verified: true, memberSince: 'Marzo 2025', products: 2, bio: 'Hogar y decoración. Me gusta dar segunda vida a los objetos.', initials: 'ML' },
  6: { name: 'Pedro Vega', rating: 4.6, trades: 10, verified: true, memberSince: 'Enero 2025', products: 3, bio: 'Tecnología y gadgets. Siempre al día con lo último.', initials: 'PV' },
  7: { name: 'Roberto Silva', rating: 4.9, trades: 5, verified: true, memberSince: 'Abril 2025', products: 2, bio: 'Entusiasta de Apple. Equipos cuidados y con garantía.', initials: 'RS' },
  8: { name: 'Carmen Díaz', rating: 4.7, trades: 14, verified: true, memberSince: 'Febrero 2025', products: 4, bio: 'Audio y música. Audífonos y parlantes de calidad.', initials: 'CD' },
  9: { name: 'Diego Ruiz', rating: 4.8, trades: 9, verified: true, memberSince: 'Marzo 2025', products: 3, bio: 'Setup gamer profesional. Periféricos y monitores top.', initials: 'DR' },
  10: { name: 'Patricia Moreno', rating: 5.0, trades: 7, verified: true, memberSince: 'Enero 2025', products: 3, bio: 'Fotógrafa profesional. Equipos en perfecto estado.', initials: 'PM' },
  11: { name: 'Fernando Ortiz', rating: 4.6, trades: 11, verified: true, memberSince: 'Diciembre 2024', products: 3, bio: 'Periféricos gaming y gadgets de escritorio.', initials: 'FO' },
  12: { name: 'Sergio Parra', rating: 4.8, trades: 13, verified: true, memberSince: 'Febrero 2025', products: 2, bio: 'Movilidad eléctrica y deportes urbanos en Chimbote.', initials: 'SP' },
  13: { name: 'Valeria Soto', rating: 4.9, trades: 6, verified: true, memberSince: 'Abril 2025', products: 2, bio: 'Wearables y tecnología lifestyle.', initials: 'VS' },
  14: { name: 'Gabriel Navarro', rating: 4.5, trades: 8, verified: true, memberSince: 'Enero 2025', products: 2, bio: 'Muebles y accesorios gaming. Setup épico.', initials: 'GN' },
  15: { name: 'Ricardo Flores', rating: 4.7, trades: 12, verified: true, memberSince: 'Marzo 2025', products: 4, bio: 'Libros técnicos y de programación. Conocimiento compartido.', initials: 'RF' },
  16: { name: 'Lucía Herrera', rating: 4.8, trades: 10, verified: true, memberSince: 'Febrero 2025', products: 3, bio: 'Audio y música. JBL y Sony son mi especialidad.', initials: 'LH' },
};

const recentTrades = [
  { id: 1, item: 'Intercambio exitoso', rating: 5, date: '3 días' },
  { id: 2, item: 'Intercambio exitoso', rating: 5, date: '2 semanas' },
  { id: 3, item: 'Intercambio exitoso', rating: 4, date: '1 mes' },
];

export default function SellerProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useSettings();

  const seller = sellerProfiles[Number(id)];

  useEffect(() => {
    if (!seller) navigate('/feed');
  }, [seller, navigate]);

  if (!seller) return null;

  const reputationPct = Math.min(100, Math.round((seller.trades / 50) * 100));
  const pts = seller.trades * 20;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header gradient */}
      <div className="bg-gradient-to-br from-[#0F3460] to-[#16A085] text-white px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg inline-flex items-center gap-2 mb-6"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="font-semibold">{t('Volver')}</span>
        </button>

        <div className="flex items-start gap-4 mb-6">
          <Avatar className="w-24 h-24 bg-white text-[#0F3460] border-2 border-white shadow-sm">
            <AvatarFallback className="bg-white text-3xl font-bold text-[#0F3460]">{seller.initials}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">{seller.name}</h1>
              {seller.verified && (
                <div className="flex items-center gap-1 bg-[#16A085] rounded-full px-2 py-0.5">
                  <span className="text-white text-xs font-bold">✓</span>
                  <span className="text-white text-[10px] font-semibold">Verificado</span>
                </div>
              )}
            </div>
            <p className="text-white/80 text-sm mb-2">{seller.bio}</p>
            <p className="text-white/70 text-xs mb-3">Miembro desde {seller.memberSince}</p>

            <div className="flex gap-6">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold">{seller.rating}</span>
                </div>
                <p className="text-sm text-white/80">{t('Rating')}</p>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">{seller.trades}</div>
                <p className="text-sm text-white/80">{t('Intercambios')}</p>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">{seller.products}</div>
                <p className="text-sm text-white/80">{t('Productos')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-4xl mx-auto">
        {/* Nivel de confianza */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="font-bold text-[#0F3460] mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#16A085]" />
            {t('Nivel de Confianza')}
          </h2>

          <div className="mb-6 flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e2e8f0" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="40" fill="transparent"
                  stroke="url(#grad2)" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray="251.2"
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 - (251.2 * reputationPct / 100) }}
                  transition={{ delay: 0.1, duration: 0.8, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0F3460" />
                    <stop offset="100%" stopColor="#16A085" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#0F3460]">{reputationPct}%</span>
                <span className="text-xs text-slate-500">{t('Reputación')}</span>
              </div>
            </div>
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Intercambiador Confiable</span>
              <span className="text-sm font-semibold text-[#16A085]">{pts}/1000 pts</span>
            </div>
          </div>
        </div>

        {/* Logros */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="font-bold text-[#0F3460] mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#16A085]" />
            {t('Logros')}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '⭐', title: 'Primera Estrella', desc: 'Primer intercambio' },
              { icon: '✅', title: 'Cuenta Verificada', desc: 'Identidad confirmada' },
              { icon: '🌟', title: 'Vendedor Estrella', desc: '10+ reseñas positivas' },
              { icon: '🔄', title: 'Intercambiador Frecuente', desc: '10 intercambios' },
            ].map(a => (
              <div key={a.title} className="p-3 rounded-xl border-2 border-[#16A085] bg-[#16A085]/5">
                <div className="text-3xl mb-1">{a.icon}</div>
                <h3 className="font-bold text-[#0F3460] text-xs mb-0.5">{a.title}</h3>
                <p className="text-[10px] text-slate-500">{a.desc}</p>
                <div className="mt-1 flex items-center gap-1 text-[#16A085] text-[10px] font-semibold">
                  <CheckCircle2 className="w-3 h-3" /> Completado
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intercambios recientes */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="font-bold text-[#0F3460] mb-4">{t('Intercambios Recientes')}</h2>
          <div className="space-y-3">
            {recentTrades.map((trade) => (
              <div key={trade.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-[#0F3460] text-sm">{trade.item}</h3>
                  <p className="text-xs text-slate-500">Hace {trade.date}</p>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: trade.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón contactar */}
        <button
          onClick={() => navigate(`/chat/1`)}
          className="w-full bg-[#16A085] hover:bg-[#138D75] text-white py-4 rounded-xl font-semibold text-lg shadow-lg transition-all"
        >
          Contactar a {seller.name.split(' ')[0]}
        </button>
      </div>
    </div>
  );
}
