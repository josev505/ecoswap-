import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import { useAuth } from '../App';
import { useSettings } from '../contexts/SettingsContext';
import { Avatar, AvatarFallback } from './ui/avatar';
import { getInitials } from './ui/utils';

export default function EditProfile() {
  const navigate = useNavigate();
  const { userName, setUserName } = useAuth();
  const { t } = useSettings();

  const [nameValue, setNameValue] = useState(userName);
  const [bio, setBio] = useState('Intercambiador apasionado en Chimbote. Me gusta la tecnología y el deporte.');

  const handleSave = () => {
    setUserName(nameValue);
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F3460] to-[#16A085] text-white px-4 py-6">
        <button
          onClick={() => navigate('/profile')}
          className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg inline-flex items-center gap-2 mb-6"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="font-semibold">{t('Volver')}</span>
        </button>

        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <Avatar className="w-24 h-24 bg-white text-[#0F3460] border-2 border-white shadow-sm">
              <AvatarFallback className="bg-white text-3xl font-bold">{getInitials(nameValue || userName)}</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#16A085] text-white rounded-full flex items-center justify-center shadow-md">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <p className="text-white text-opacity-80 text-sm">{t('Toca el ícono para cambiar foto')}</p>
        </div>
      </div>

      <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
        {/* Nombre */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="font-bold text-[#0F3460] mb-4">{t('Información Personal')}</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t('Nombre completo')}
            </label>
            <input
              type="text"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-transparent"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t('Biografía')}
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-transparent resize-none"
              placeholder="Cuéntanos sobre ti..."
            />
          </div>
        </div>

        {/* Guardar cambios */}
        <button
          onClick={handleSave}
          className="w-full bg-[#16A085] hover:bg-[#138D75] text-white py-4 rounded-xl font-semibold text-lg shadow-lg transition-all"
        >
          {t('Guardar cambios')}
        </button>

        <button
          onClick={() => navigate('/profile')}
          className="w-full bg-white border-2 border-slate-200 text-slate-600 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-all"
        >
          {t('Cancelar')}
        </button>
      </div>
    </div>
  );
}
