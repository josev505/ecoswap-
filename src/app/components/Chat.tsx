import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from '../App';
import { useSettings } from '../contexts/SettingsContext';

const mockMessages = [
  { id: 1, sender: 'other', text: 'Hola! Me interesa tu bicicleta', time: '10:30' },
  { id: 2, sender: 'me', text: '¡Hola! Claro, está en excelente estado', time: '10:32' },
  { id: 3, sender: 'other', text: '¿Podríamos hacer el intercambio por mi laptop?', time: '10:35' },
  { id: 4, sender: 'me', text: 'Me parece bien. ¿Qué modelo es?', time: '10:36' },
  { id: 5, sender: 'other', text: 'HP Core i5, 8GB RAM. Te envío fotos', time: '10:37' },
];

export default function Chat() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const { t } = useSettings();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [showActions, setShowActions] = useState(true);

  // Redirigir si no está logueado
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'me',
          text: message,
          time: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setMessage('');
    }
  };

  const handleAccept = () => {
    navigate('/logistics');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/feed')}
            className="text-[#0F3460] hover:bg-slate-100 p-2 rounded-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-[#0F3460] text-white rounded-full flex items-center justify-center font-semibold">
              CM
            </div>
            <div>
              <h2 className="font-bold text-[#0F3460]">Carlos Mendoza</h2>
              <p className="text-xs text-slate-500">{t('En línea')}</p>
            </div>
          </div>

          {/* ADD 1 — Product thumbnail in chat header */}
          <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
            <p className="text-[10px] text-slate-400">{t('Negociando:')}</p>
            <img
              src="https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=200"
              alt="Bicicleta de Montaña"
              className="rounded-lg object-cover"
              style={{ width: 40, height: 40, borderRadius: 8 }}
            />
          </div>
        </div>
      </div>

      {/* Información del intercambio */}
      <div className="bg-[#16A085] bg-opacity-10 border-b border-[#16A085] border-opacity-20 px-4 py-3">
        <p className="text-sm text-[#0F3460] text-center">
          Negociando: <span className="font-semibold">Bicicleta ⇄ Laptop HP</span>
        </p>
      </div>

      {/* Annotation - Hipótesis (Chat) */}
      <div className="px-4 pt-4 pb-0">
        <div className="bg-[#E8F5F0] rounded-[8px] p-[12px]">
          <p className="text-[#0D3B4F] text-[11px]">
            Hypothesis: Showing the negotiated product inside the chat keeps the user focused and makes the experience more visual.
          </p>
        </div>
      </div>

      {/* Mensajes - Ley de Similitud (burbujas consistentes) */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                msg.sender === 'me'
                  ? 'bg-[#16A085] text-white rounded-br-sm'
                  : 'bg-white text-slate-800 rounded-bl-sm shadow-md'
              }`}
            >
              <p className="mb-1">{msg.text}</p>
              <p
                className={`text-xs ${
                  msg.sender === 'me' ? 'text-white text-opacity-80' : 'text-slate-500'
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}

        {/* Botones de acción - Ley de Similitud (colores consistentes) */}
        {showActions && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-slate-200">
            <h3 className="font-bold text-[#0F3460] mb-4 text-center">
              {t('¿Aceptar esta propuesta de intercambio?')}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowActions(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-all"
              >
                <XCircle className="w-5 h-5" />
                {t('Rechazar')}
              </button>

              <button
                onClick={handleAccept}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#16A085] text-white rounded-xl font-semibold hover:bg-[#138D75] transition-all"
              >
                <CheckCircle2 className="w-5 h-5" />
                {t('Aceptar')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Input de mensaje */}
      <div className="bg-white border-t border-slate-200 px-4 py-4">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('Escribe un mensaje...')}
            className="flex-1 px-4 py-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#16A085]"
          />
          <button
            onClick={handleSend}
            className="bg-[#16A085] text-white p-3 rounded-full hover:bg-[#138D75] transition-all"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
