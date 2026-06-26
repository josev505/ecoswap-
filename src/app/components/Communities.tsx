import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BadgeCheck, Users } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { motion } from 'motion/react';

export const communities = [
  {
    id: 1,
    name: 'PageTurners Chimbote',
    topic: 'Libros y Lectura',
    topicEn: 'Books & Reading',
    description: 'Intercambia libros, encuentra nuevos lectores y comparte reseñas literarias en tu ciudad.',
    descriptionEn: 'Swap books, find new readers, and share literary reviews in your city.',
    members: 238,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
    verified: true,
    emoji: '📚',
  },
  {
    id: 2,
    name: 'Jardín Verde',
    topic: 'Plantas y Semillas',
    topicEn: 'Plants & Seeds',
    description: 'Comparte esquejes, semillas y consejos para cultivar un jardín hermoso.',
    descriptionEn: 'Share cuttings, seeds, and tips for growing a beautiful garden.',
    members: 174,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
    verified: false,
    emoji: '🌱',
  },
  {
    id: 3,
    name: 'Closet Circular',
    topic: 'Ropa y Accesorios',
    topicEn: 'Clothing & Accessories',
    description: 'Renueva tu guardarropa intercambiando prendas y accesorios de todas las tallas.',
    descriptionEn: 'Refresh your wardrobe by swapping clothes and accessories of all sizes.',
    members: 312,
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80',
    verified: false,
    emoji: '👗',
  },
  {
    id: 4,
    name: 'Mesa de Juego',
    topic: 'Juegos de Mesa',
    topicEn: 'Board Games',
    description: 'Intercambia juegos de mesa, cartas y RPGs. ¡La diversión en familia garantizada!',
    descriptionEn: 'Swap board games, card games, and RPGs. Family fun guaranteed!',
    members: 95,
    image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=600&q=80',
    verified: false,
    emoji: '🎲',
  },
  {
    id: 5,
    name: 'VinylSwap',
    topic: 'Música y Vinilos',
    topicEn: 'Music & Vinyl',
    description: 'Para los amantes del buen sonido: vinilos, cassettes, instrumentos y más.',
    descriptionEn: 'For lovers of great sound: vinyl, cassettes, instruments, and more.',
    members: 61,
    image: 'https://images.unsplash.com/photo-1585675099657-c7a2ef6f3f27?w=600&q=80',
    verified: false,
    emoji: '🎵',
  },
];

export default function Communities() {
  const navigate = useNavigate();
  const { t, language } = useSettings();

  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-4 py-4 max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate('/feed')}
            className="text-[#0F3460] hover:bg-slate-100 p-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="font-bold text-[#0F3460] text-xl">{t('Comunidades')}</h1>
            <p className="text-sm text-slate-500">{t('Únete a grupos de tu ciudad')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-5 space-y-4">
        {communities.map((community, index) => (
          <motion.div
            key={community.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/community/${community.id}`)}
            className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer"
          >
            {/* Banner image */}
            <div className="relative h-36">
              <img
                src={community.image}
                alt={community.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <span className="text-2xl">{community.emoji}</span>
                <div className="flex items-center gap-1.5">
                  <h2 className="font-bold text-white text-lg drop-shadow">{community.name}</h2>
                  {community.verified && (
                    <BadgeCheck className="w-5 h-5 text-[#3B9FE8]" fill="white" />
                  )}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="px-4 py-3">
              <p className="text-sm text-[#16A085] font-semibold mb-1">
                {language === 'en' ? community.topicEn : community.topic}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {language === 'en' ? community.descriptionEn : community.description}
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-slate-400">
                <Users className="w-4 h-4" />
                <span className="text-sm">{community.members} {t('miembros')}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
