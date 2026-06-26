import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Truck, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { useAuth } from '../App';
import { useSettings } from '../contexts/SettingsContext';

function ToastIntercambio({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#16A085] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
      <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
      <span className="font-semibold text-sm">¡Intercambio finalizado con éxito! 🤝</span>
    </div>
  );
}

const safePoints = [
  { id: 1, name: 'Plaza Mayor de Chimbote', address: 'Jr. Leoncio Prado 123', lat: -9.0853, lng: -78.5783 },
  { id: 2, name: 'Mall Plaza Chimbote', address: 'Av. Pacífico 230', lat: -9.0755, lng: -78.5934 },
  { id: 3, name: 'Parque Principal Villa María', address: 'Av. Aviación 456', lat: -9.0912, lng: -78.5654 },
  { id: 4, name: 'Estación de Policía Central', address: 'Av. Bolognesi 789', lat: -9.0876, lng: -78.5812 },
];

export default function Logistics() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { t } = useSettings();
  const [deliveryMethod, setDeliveryMethod] = useState<'point' | 'delivery' | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Redirigir si no está logueado
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const [showToast, setShowToast] = useState(false);

  const handleConfirm = () => {
    setShowToast(true);
    setTimeout(() => navigate('/feed'), 2800);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {showToast && <ToastIntercambio onClose={() => setShowToast(false)} />}
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/chat/1')}
            className="text-[#0F3460] hover:bg-slate-100 p-2 rounded-lg inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-semibold">{t('Volver al Chat')}</span>
          </button>
        </div>
      </div>

      <div className="px-4 py-6 max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0F3460] mb-2">
            {t('Logística del Intercambio')}
          </h1>
          <p className="text-slate-600">
            {t('Elige cómo y dónde realizar el intercambio en Chimbote')}
          </p>
        </div>

        {/* Método de entrega */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="font-bold text-[#0F3460] mb-4">
            {t('Método de Entrega')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setDeliveryMethod('point')}
              className={`p-6 rounded-xl border-2 transition-colors text-left flex flex-col ${
                deliveryMethod === 'point'
                  ? 'border-[#16A085] bg-[#16A085] bg-opacity-10'
                  : 'border-slate-200 bg-white hover:border-[#16A085]'
              }`}
            >
              <div className="flex justify-between items-start w-full mb-3">
                <MapPin className={`w-8 h-8 ${
                  deliveryMethod === 'point' ? 'text-[#16A085]' : 'text-[#0F3460]'
                }`} />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  deliveryMethod === 'point' ? 'border-[#16A085]' : 'border-slate-300'
                }`}>
                  {deliveryMethod === 'point' && <div className="w-2.5 h-2.5 bg-[#16A085] rounded-full" />}
                </div>
              </div>
              <h3 className={`font-bold mb-2 ${deliveryMethod === 'point' ? 'text-[#16A085]' : 'text-[#0F3460]'}`}>
                {t('Punto Seguro Público')}
              </h3>
              <p className="text-sm text-slate-600">
                {t('Encuentro en lugares públicos verificados')}
              </p>
            </button>

            <button
              onClick={() => setDeliveryMethod('delivery')}
              className={`p-6 rounded-xl border-2 transition-colors text-left flex flex-col ${
                deliveryMethod === 'delivery'
                  ? 'border-[#16A085] bg-[#16A085] bg-opacity-10'
                  : 'border-slate-200 bg-white hover:border-[#16A085]'
              }`}
            >
              <div className="flex justify-between items-start w-full mb-3">
                <Truck className={`w-8 h-8 ${
                  deliveryMethod === 'delivery' ? 'text-[#16A085]' : 'text-[#0F3460]'
                }`} />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  deliveryMethod === 'delivery' ? 'border-[#16A085]' : 'border-slate-300'
                }`}>
                  {deliveryMethod === 'delivery' && <div className="w-2.5 h-2.5 bg-[#16A085] rounded-full" />}
                </div>
              </div>
              <h3 className={`font-bold mb-2 ${deliveryMethod === 'delivery' ? 'text-[#16A085]' : 'text-[#0F3460]'}`}>
                {t('Servicio de Delivery')}
              </h3>
              <p className="text-sm text-slate-600">
                {t('Coordinamos la entrega a domicilio')}
              </p>
            </button>
          </div>
        </div>

        {/* Mapa de puntos seguros */}
        {deliveryMethod === 'point' && (
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="font-bold text-[#0F3460] mb-4">
              {t('Selecciona un Punto Seguro en Chimbote')}
            </h2>

            {/* Mapa simulado */}
            <div className="bg-slate-200 rounded-xl h-64 mb-4 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-slate-500 font-semibold">{t('Mapa de Chimbote')}</p>
              </div>
              {/* Pines verdes en el mapa */}
              <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2">
                <MapPin className="w-8 h-8 text-[#16A085] fill-[#16A085] drop-shadow-lg" />
              </div>
              <div className="absolute top-1/2 right-1/4">
                <MapPin className="w-8 h-8 text-[#16A085] fill-[#16A085] drop-shadow-lg" />
              </div>
              <div className="absolute bottom-1/4 left-1/2">
                <MapPin className="w-8 h-8 text-[#16A085] fill-[#16A085] drop-shadow-lg" />
              </div>
            </div>

            {/* Lista de puntos seguros */}
            <div className="space-y-3">
              {safePoints.map((point) => (
                <button
                  key={point.id}
                  onClick={() => setSelectedPoint(point.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedPoint === point.id
                      ? 'border-[#16A085] bg-[#16A085] bg-opacity-5'
                      : 'border-slate-200 hover:border-[#16A085]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className={`w-5 h-5 flex-shrink-0 mt-1 ${
                      selectedPoint === point.id ? 'text-[#16A085]' : 'text-[#0F3460]'
                    }`} />
                    <div className="flex-1">
                      <h3 className="font-bold text-[#0F3460] mb-1">
                        {point.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {point.address}
                      </p>
                    </div>
                    {selectedPoint === point.id && (
                      <CheckCircle2 className="w-5 h-5 text-[#16A085] flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Información de delivery */}
        {deliveryMethod === 'delivery' && (
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="font-bold text-[#0F3460] mb-4">
              Información de Entrega
            </h2>
            <div className="bg-[#16A085] bg-opacity-10 border border-[#16A085] border-opacity-30 rounded-xl p-4">
              <p className="text-sm text-[#0F3460] mb-2">
                <strong>Costo del servicio:</strong> S/ 15.00
              </p>
              <p className="text-sm text-slate-600">
                Un repartidor coordinará con ambas partes para realizar el intercambio de forma segura.
              </p>
            </div>
          </div>
        )}

        {/* Fecha y hora */}
        {deliveryMethod && (
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="font-bold text-[#0F3460] mb-4">
              {t('Fecha y Hora del Intercambio')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#16A085]" />
                  {t('Fecha')}
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A085]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#16A085]" />
                  {t('Hora')}
                </label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A085]"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Botón de confirmación */}
        {deliveryMethod && ((deliveryMethod === 'point' && selectedPoint) || deliveryMethod === 'delivery') && selectedDate && selectedTime && (
          <button
            onClick={handleConfirm}
            className="w-full bg-[#16A085] hover:bg-[#138D75] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
          >
            <CheckCircle2 className="w-5 h-5" />
            {t('Confirmar Intercambio')}
          </button>
        )}
      </div>
    </div>
  );
}
