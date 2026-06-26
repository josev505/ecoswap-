import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send, BadgeCheck, Users } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { motion, AnimatePresence } from 'motion/react';
import { communities } from './Communities';

type Message = {
  id: number;
  user: string;
  avatar: string;
  text: string;
  time: string;
  isMe?: boolean;
};

const communityMessages: Record<number, Message[]> = {
  1: [
    { id: 1, user: 'Sofía R.', avatar: 'SR', text: '¡Hola a todos! Alguien tiene "El nombre del viento" de Patrick Rothfuss? Lo busco hace semanas 📖', time: '09:14' },
    { id: 2, user: 'Marco D.', avatar: 'MD', text: 'Yo lo tengo! Lo leí dos veces jaja. ¿Qué ofreces a cambio?', time: '09:18' },
    { id: 3, user: 'Sofía R.', avatar: 'SR', text: 'Tengo "Sapiens" de Harari en perfecto estado. También "Dune" si prefieres algo de ciencia ficción 🚀', time: '09:20' },
    { id: 4, user: 'Ana P.', avatar: 'AP', text: 'Uf Dune es increíble! Si Marco no lo quiere yo me anoto por Dune 🙋‍♀️', time: '09:23' },
    { id: 5, user: 'Marco D.', avatar: 'MD', text: 'Me quedo con Sapiens! Sofía coordinamos por privado 😄', time: '09:25' },
    { id: 6, user: 'Luis V.', avatar: 'LV', text: 'Tengo la saga completa de Harry Potter si alguien quiere intercambiar por novelas gráficas', time: '09:40' },
    { id: 7, user: 'Carmen T.', avatar: 'CT', text: 'Luis! Tengo Watchmen y V de Vendetta en tapa dura. ¿Te interesa?', time: '09:44' },
    { id: 8, user: 'Luis V.', avatar: 'LV', text: 'Me parece genial! Los clásicos de Alan Moore son una joya. Coordinamos esta semana', time: '09:48' },
  ],
  2: [
    { id: 1, user: 'Rosa M.', avatar: 'RM', text: '¡Buenos días comunidad! 🌻 Tengo esquejes de pothos y syngonium disponibles esta semana', time: '08:30' },
    { id: 2, user: 'Andrés F.', avatar: 'AF', text: 'Rosa me interesa el pothos! Tengo semillas de albahaca y menta orgánica para intercambiar 🌿', time: '08:35' },
    { id: 3, user: 'Lucía G.', avatar: 'LG', text: 'Yo quisiera syngonium! Tengo una costilla de adán con 3 hojas nuevas esta semana 😍', time: '08:42' },
    { id: 4, user: 'Rosa M.', avatar: 'RM', text: '¡Perfecto! Coordinamos el fin de semana en el parque principal ✅', time: '08:45' },
    { id: 5, user: 'Pedro H.', avatar: 'PH', text: 'Alguien tiene suculentas? Busco variedad echeveria o crassula 🪴', time: '09:10' },
    { id: 6, user: 'Andrés F.', avatar: 'AF', text: 'Yo tengo echeveria rosada y morada! También un cactus san pedro si te animas 🌵', time: '09:15' },
    { id: 7, user: 'Lucía G.', avatar: 'LG', text: 'Yo también tengo crassula ovata (árbol de jade) con raíces bien formadas, lista para nueva casa 🏡', time: '09:22' },
  ],
  3: [
    { id: 1, user: 'Valeria C.', avatar: 'VC', text: '¡Buenas! Tengo ropa de marca talla S-M casi sin usar. Vestidos, blusas y jeans. Busco talla L o XL 👗', time: '10:05' },
    { id: 2, user: 'Diana M.', avatar: 'DM', text: 'Yo tengo talla L! Blusas de lino, un blazer negro y jeans boyfriend. ¿Qué marcas tienes?', time: '10:12' },
    { id: 3, user: 'Valeria C.', avatar: 'VC', text: 'Mango y Zara principalmente. El jeans es Levi\'s 501 🔥', time: '10:15' },
    { id: 4, user: 'Diana M.', avatar: 'DM', text: 'El Levi\'s me interesa mucho! Te ofrezco el blazer negro + blusa de lino. Te mando fotos ahora', time: '10:18' },
    { id: 5, user: 'Karla P.', avatar: 'KP', text: 'Yo busco ropa de hombre talla M para mi hermano. Camisas formales o polo sport. Tengo zapatillas Adidas 42 casi nuevas', time: '10:30' },
    { id: 6, user: 'Roberto S.', avatar: 'RS', text: 'Karla! Tengo 3 camisas Calvin Klein talla M: celeste, blanca y gris. ¿Las zapatillas de qué modelo son?', time: '10:38' },
    { id: 7, user: 'Karla P.', avatar: 'KP', text: 'Son Adidas Ultraboost negras talla 42, compradas en diciembre. Casi sin uso 🙌', time: '10:42' },
  ],
  4: [
    { id: 1, user: 'Tomás B.', avatar: 'TB', text: '¡Hola comunidad! Alguien quiere intercambiar Catan por algo? Ya lo conozco de memoria jaja 🎲', time: '15:00' },
    { id: 2, user: 'Elena R.', avatar: 'ER', text: 'Yo tengo Ticket to Ride! También Pandemic si alguien se anima a algo cooperativo 🌍', time: '15:05' },
    { id: 3, user: 'Tomás B.', avatar: 'TB', text: 'Ticket to Ride me llama! Lo he querido probar hace tiempo. ¿Hacemos el cambio?', time: '15:08' },
    { id: 4, user: 'Miguel A.', avatar: 'MA', text: 'Alguien tiene Dixit o Codenames? Los busco para noche de juegos este viernes 🃏', time: '15:20' },
    { id: 5, user: 'Elena R.', avatar: 'ER', text: 'Tengo Dixit original con las expansiones incluidas. ¿Qué ofreces?', time: '15:25' },
    { id: 6, user: 'Miguel A.', avatar: 'MA', text: 'Tengo Exploding Kittens, Uno Pokémon especial y Jenga con piezas marcadas 😄', time: '15:28' },
    { id: 7, user: 'Tomás B.', avatar: 'TB', text: 'El Jenga marcado es genial para eventos 😂 Me intereso si no hay acuerdo entre ustedes', time: '15:31' },
    { id: 8, user: 'Elena R.', avatar: 'ER', text: 'Miguel, me convence el Exploding Kittens. Cerramos con eso 🤝', time: '15:35' },
  ],
  5: [
    { id: 1, user: 'Rodrigo V.', avatar: 'RV', text: 'Tengo vinilos de los 70s y 80s: Pink Floyd, Led Zeppelin, ABBA. Busco algo de jazz o bossa nova 🎸', time: '16:00' },
    { id: 2, user: 'Isabel C.', avatar: 'IC', text: 'Rodrigo! Tengo Chet Baker y Stan Getz en vinilo, ambos en excelente estado 🎷', time: '16:08' },
    { id: 3, user: 'Rodrigo V.', avatar: 'RV', text: 'Stan Getz es perfecto! ¿Cuál quieres de mi colección?', time: '16:12' },
    { id: 4, user: 'Martín L.', avatar: 'ML', text: 'Vendo una guitarra criolla Yamaha C40 con funda. Busco cambio por teclado o pedalera', time: '16:20' },
    { id: 5, user: 'Isabel C.', avatar: 'IC', text: 'Me quedo con Pink Floyd! The Wall tiene un significado especial para mí 🌸', time: '16:25' },
    { id: 6, user: 'Rodrigo V.', avatar: 'RV', text: 'Perfecto! Coordinamos el sábado en el centro. Traemos los vinilos con cuidado 📦', time: '16:30' },
  ],
};

const avatarColors = ['#0F3460', '#16A085', '#8B5CF6', '#EF4444', '#F59E0B', '#3B9FE8', '#EC4899'];

export default function CommunityDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { t } = useSettings();

  const communityId = parseInt(id || '1');
  const community = communities.find(c => c.id === communityId) || communities[0];
  const initialMessages = communityMessages[communityId] || communityMessages[1];

  const [hasJoined, setHasJoined] = useState(false);
  // IDs of messages that should show the offer badge (community 1: Marco msg5, Luis msg8)
  const offerMessageIds = communityId === 1 ? [5, 8] : [];
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        user: 'Tú',
        avatar: 'TU',
        text: newMessage.trim(),
        time: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
      },
    ]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="flex items-center gap-3 px-4 py-3 max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/communities')}
            className="text-[#0F3460] hover:bg-slate-100 p-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <img
            src={community.image}
            alt={community.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-[#16A085]"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-[#0F3460] truncate">{community.name}</h1>
              {community.verified && (
                <BadgeCheck className="w-5 h-5 text-[#3B9FE8] flex-shrink-0" fill="white" />
              )}
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Users className="w-3 h-3" />
              <span className="text-xs">{community.members} {t('miembros')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 max-w-2xl w-full mx-auto">
        {messages.map((msg, i) => {
          const color = avatarColors[i % avatarColors.length];
          // ADD 2 — Date separator between early (id<=5) and later (id>=6) messages
          const showDateSeparator = communityId === 1 && msg.id === 6;
          return (
            <div key={msg.id}>
              {showDateSeparator && (
                <div className="flex items-center gap-3 my-2">
                  <div className="flex-1 h-px bg-[#E5E7EB]" />
                  <span className="text-[10px] text-[#9CA3AF] font-medium">Hoy</span>
                  <div className="flex-1 h-px bg-[#E5E7EB]" />
                </div>
              )}
              <div className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                {/* ADD 1 — Avatar with online status dot */}
                {!msg.isMe && (
                  <div className="relative flex-shrink-0 mt-5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: color }}
                    >
                      {msg.avatar}
                    </div>
                    {/* Online indicator dot */}
                    <div
                      className="absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white"
                      style={{ backgroundColor: '#1A9E80' }}
                    />
                  </div>
                )}

                <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} max-w-[75%]`}>
                  {!msg.isMe && (
                    <span className="text-xs text-slate-500 mb-1 ml-1 font-medium">{msg.user}</span>
                  )}
                  {/* ADD 3 — Offer detected badge on specific messages */}
                  {offerMessageIds.includes(msg.id) && (
                    <span
                      className="text-[10px] text-white font-semibold px-2 py-0.5 rounded-full mb-1"
                      style={{ backgroundColor: '#1A9E80', borderRadius: 12 }}
                    >
                      🔄 Oferta detectada
                    </span>
                  )}
                  <div
                    className={`px-4 py-2.5 rounded-2xl ${
                      msg.isMe
                        ? 'bg-[#16A085] text-white rounded-br-sm'
                        : 'bg-white text-slate-800 shadow-sm rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                  <span className="text-xs text-slate-400 mt-1 mx-1">{msg.time}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Annotation - Hipótesis (Community) */}
      <div className="px-4 pb-4 max-w-2xl w-full mx-auto flex-shrink-0">
        <div className="bg-[#E8F5F0] rounded-[8px] p-[12px]">
          <p className="text-[#0D3B4F] text-[11px]">
            Hypothesis: Enriching the community with more features increases user participation and interaction.
          </p>
        </div>
      </div>

      {/* Bottom: Join button OR message input */}
      <div className="bg-white border-t border-slate-200 px-4 py-4 max-w-2xl w-full mx-auto">
        <AnimatePresence mode="wait">
          {!hasJoined ? (
            <div className="flex flex-col gap-2">
              {/* ADD 4 — Community alerts button */}
              <button
                className="w-full py-3 rounded-xl font-semibold text-[#16A085] border-2 border-[#16A085] bg-white hover:bg-[#f0fdf9] transition-colors"
              >
                🔔 {t('Activar alertas de la comunidad')}
              </button>
            <motion.button
              key="join-btn"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              onClick={() => setHasJoined(true)}
              className="w-full bg-[#16A085] hover:bg-[#138D75] text-white py-3.5 rounded-xl font-semibold transition-colors shadow-md"
            >
              {t('Unirte a la comunidad')}
            </motion.button>
            </div>
          ) : (
            <motion.div
              key="message-input"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={t('Escribe un mensaje...')}
                className="flex-1 px-4 py-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#16A085] text-sm"
                autoFocus
              />
              <button
                onClick={handleSend}
                disabled={!newMessage.trim()}
                className="bg-[#16A085] disabled:opacity-50 text-white p-3 rounded-full hover:bg-[#138D75] transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
