import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Award, Shield, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../App';
import { useSettings } from '../contexts/SettingsContext';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { getInitials } from './ui/utils';

const achievements = [
  { id: 1, title: 'Primera Estrella', description: 'Completó su primer intercambio', icon: '⭐', earned: true },
  { id: 2, title: 'Intercambiador Frecuente', description: '10 intercambios completados', icon: '🔄', earned: true },
  { id: 3, title: 'Confianza Total', description: 'Rating 5.0 por 5 intercambios', icon: '💎', earned: true },
  // ADD 1 — Two new unlocked badges
  { id: 7, title: 'Vendedor Estrella', description: 'Recibiste 10 reseñas positivas', icon: '🌟', earned: true },
  { id: 8, title: 'Cuenta Verificada', description: 'Identidad confirmada', icon: '✅', earned: true },
  { id: 4, title: 'Vecino Activo', description: '20 intercambios en Chimbote', icon: '🏘️', earned: false },
  { id: 5, title: 'Experto Local', description: '50 intercambios completados', icon: '👑', earned: false },
  { id: 6, title: 'Leyenda EcoSwap', description: '100 intercambios exitosos', icon: '🏆', earned: false },
];

const recentTrades = [
  { id: 1, item: 'Bicicleta', rating: 5, date: '2 días' },
  { id: 2, item: 'Laptop HP', rating: 5, date: '1 semana' },
  { id: 3, item: 'Guitarra', rating: 4, date: '2 semanas' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { isLoggedIn, userName, isPremium } = useAuth();
  const { t } = useSettings();

  // Redirigir si no está logueado
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F3460] to-[#16A085] text-white px-4 py-6">
        <button
          onClick={() => navigate('/feed')}
          className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg inline-flex items-center gap-2 mb-6"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="font-semibold">{t('Volver')}</span>
        </button>

        {/* Información del usuario */}
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="w-24 h-24 bg-white text-[#0F3460] border-2 border-white shadow-sm">
            <AvatarFallback className="bg-white text-3xl font-bold">{getInitials(userName)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold">{userName}</h1>
              {/* ADD 2 — Verified identity badge (replaces empty circle) */}
              <div className="flex items-center gap-1 bg-[#16A085] rounded-full px-2 py-0.5">
                <span className="text-white text-xs font-bold">✓</span>
                <span className="text-white text-[10px] font-semibold">Verificado</span>
              </div>
              {isPremium && (
                <div className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full px-2 py-0.5">
                  <span className="text-white text-xs font-bold">⭐</span>
                  <span className="text-white text-[10px] font-semibold">Vendedor Premium</span>
                </div>
              )}
            </div>
            <p className="text-white text-opacity-90 mb-3">
              {t('Miembro desde Enero 2025')}
            </p>

            {/* Stats principales - Ley de Proximidad */}
            <div className="flex gap-6">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold">4.9</span>
                </div>
                <p className="text-sm text-white text-opacity-80">{t('Rating')}</p>
              </div>

              <div>
                <div className="text-2xl font-bold mb-1">12</div>
                <p className="text-sm text-white text-opacity-80">{t('Intercambios')}</p>
              </div>

              <div>
                <div className="text-2xl font-bold mb-1">8</div>
                <p className="text-sm text-white text-opacity-80">{t('Productos')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-4xl mx-auto">
        {/* Trust Points - Sistema de Confianza */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="font-bold text-[#0F3460] mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#16A085]" />
            {t('Nivel de Confianza')}
          </h2>

          {/* Req 5: Reputation Meter (Circular Ring) */}
          <div className="mb-6 flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                />
                {/* Progress Ring */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="251.2" // 2 * pi * 40
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 - (251.2 * 0.48) }}
                  transition={{ delay: 0.001, duration: 0.8, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0F3460" />
                    <stop offset="100%" stopColor="#16A085" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#0F3460]">48%</span>
                <span className="text-xs text-slate-500">{t('Reputación')}</span>
              </div>
            </div>
            
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">{t('Nivel 3 - Intercambiador Confiable')}</span>
              <span className="text-sm font-semibold text-[#16A085]">240/500 pts</span>
            </div>
            <p className="text-xs text-slate-500 text-center mt-2">
              260 puntos más para alcanzar Nivel 4
            </p>
          </div>

          {/* Cómo ganar puntos */}
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-semibold text-[#0F3460] mb-3 text-sm">
              {t('Cómo ganar puntos:')}
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A085]" />
                {t('Completar intercambio: +20 pts')}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A085]" />
                {t('Recibir 5 estrellas: +10 pts')}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A085]" />
                {t('Verificar ubicación: +5 pts')}
              </li>
            </ul>
          </div>
        </div>

        {/* Logros - Ley de Proximidad (agrupación) */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="font-bold text-[#0F3460] mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#16A085]" />
            {t('Logros Desbloqueados')}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  achievement.earned
                    ? 'border-[#16A085] bg-[#16A085] bg-opacity-5'
                    : 'border-slate-200 bg-slate-50 opacity-60'
                }`}
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <h3 className="font-bold text-[#0F3460] text-sm mb-1">
                  {achievement.title}
                </h3>
                <p className="text-xs text-slate-600">
                  {achievement.description}
                </p>
                {achievement.earned && (
                  <div className="mt-2 flex items-center gap-1 text-[#16A085] text-xs font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    {t('Completado')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Historial reciente */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="font-bold text-[#0F3460] mb-4">
            {t('Intercambios Recientes')}
          </h2>

          <div className="space-y-3">
            {recentTrades.map((trade) => (
              <div
                key={trade.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
              >
                <div>
                  <h3 className="font-semibold text-[#0F3460]">{trade.item}</h3>
                  <p className="text-sm text-slate-500">Hace {trade.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: trade.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Annotation - Hipótesis (Profile) */}
        <div className="bg-[#E8F5F0] rounded-[8px] p-[12px]">
          <p className="text-[#0D3B4F] text-[11px]">
            Hypothesis: Showing more visual reputation indicators builds greater trust between users.
          </p>
        </div>

        {/* ADD 3 — Editar Perfil navigates to edit screen */}
        <button
          onClick={() => navigate('/profile/edit')}
          className="w-full bg-[#0F3460] hover:bg-opacity-90 text-white py-3 rounded-xl font-semibold"
        >
          {t('Editar Perfil')}
        </button>
      </div>
    </div>
  );
}
