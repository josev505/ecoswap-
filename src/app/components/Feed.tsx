import { useState, useMemo, useRef, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MapPin, Star, ChevronDown, Laptop, Music, Gamepad2, Home, Activity, MoreHorizontal, LayoutGrid, Users, Heart } from 'lucide-react';
import { useAuth, UserProduct } from '../App';
import { useSettings } from '../contexts/SettingsContext';
import logo from '../../imports/logo.png';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { getInitials } from './ui/utils';

const mockProducts = [
  { id: 1, title: 'Bicicleta de Montaña', category: 'Deportes', distance: '0.8 km', rating: 4.5, trades: 12, image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400', condition: 'Buen estado', city: 'Chimbote', sellerName: 'Jose V.', sellerInitials: 'JV' },
  { id: 2, title: 'Laptop HP Core i5', category: 'Tecnología', distance: '1.2 km', rating: 5.0, trades: 8, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', condition: 'Como nuevo', city: 'Chimbote', sellerName: 'Ana T.', sellerInitials: 'AT' },
  { id: 3, title: 'Guitarra Acústica', category: 'Música', distance: '0.5 km', rating: 4.8, trades: 15, image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400', condition: 'Buen estado', city: 'Chimbote', sellerName: 'Sofia R.', sellerInitials: 'SR' },
  { id: 4, title: 'Consola PlayStation 4', category: 'Gaming', distance: '2.1 km', rating: 4.7, trades: 20, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400', condition: 'Usado', city: 'Lima', sellerName: 'Jorge C.', sellerInitials: 'JC' },
  { id: 5, title: 'Cafetera Express', category: 'Hogar', distance: '0.3 km', rating: 4.9, trades: 6, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400', condition: 'Nuevo', city: 'Lima', sellerName: 'Maria L.', sellerInitials: 'ML' },
  { id: 6, title: 'Tablet Samsung', category: 'Tecnología', distance: '1.8 km', rating: 4.6, trades: 10, image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400', condition: 'Como nuevo', city: 'Trujillo', sellerName: 'Pedro V.', sellerInitials: 'PV' },
  { id: 7, title: 'iPhone 13 Pro', category: 'Tecnología', distance: '1.0 km', rating: 4.9, trades: 5, image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400', condition: 'Como nuevo', city: 'Trujillo', sellerName: 'Roberto S.', sellerInitials: 'RS' },
  { id: 8, title: 'Audífonos Sony', category: 'Tecnología', distance: '0.6 km', rating: 4.7, trades: 14, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', condition: 'Buen estado', city: 'Arequipa', sellerName: 'Carmen D.', sellerInitials: 'CD' },
  { id: 9, title: 'Monitor Gamer 27"', category: 'Gaming', distance: '1.5 km', rating: 4.8, trades: 9, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400', condition: 'Nuevo', city: 'Arequipa', sellerName: 'Diego R.', sellerInitials: 'DR' },
  { id: 10, title: 'Cámara Canon EOS', category: 'Tecnología', distance: '2.0 km', rating: 5.0, trades: 7, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400', condition: 'Como nuevo', city: 'Chimbote', sellerName: 'Patricia M.', sellerInitials: 'PM' },
  { id: 11, title: 'Teclado Mecánico RGB', category: 'Gaming', distance: '0.9 km', rating: 4.6, trades: 11, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400', condition: 'Buen estado', city: 'Lima', sellerName: 'Fernando O.', sellerInitials: 'FO' },
  { id: 12, title: 'Scooter Eléctrico', category: 'Deportes', distance: '1.3 km', rating: 4.8, trades: 13, image: 'https://images.unsplash.com/photo-1604930008933-3e4b99d993b2?w=400', condition: 'Usado', city: 'Trujillo', sellerName: 'Sergio P.', sellerInitials: 'SP' },
  { id: 13, title: 'Smartwatch Apple', category: 'Tecnología', distance: '0.7 km', rating: 4.9, trades: 6, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400', condition: 'Como nuevo', city: 'Chimbote', sellerName: 'Valeria S.', sellerInitials: 'VS' },
  { id: 14, title: 'Silla Gamer', category: 'Gaming', distance: '1.1 km', rating: 4.5, trades: 8, image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400', condition: 'Buen estado', city: 'Lima', sellerName: 'Gabriel N.', sellerInitials: 'GN' },
  { id: 15, title: 'Libros de Programación', category: 'Otros', distance: '0.4 km', rating: 4.7, trades: 12, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400', condition: 'Usado', city: 'Arequipa', sellerName: 'Ricardo F.', sellerInitials: 'RF' },
  { id: 16, title: 'Parlante Bluetooth JBL', category: 'Música', distance: '1.6 km', rating: 4.8, trades: 10, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', condition: 'Nuevo', city: 'Chimbote', sellerName: 'Lucía H.', sellerInitials: 'LH' },
];

const categoryIcons: Record<string, React.ReactNode> = {
  'Todos': <LayoutGrid className="w-5 h-5 mb-1" />,
  'Tecnología': <Laptop className="w-5 h-5 mb-1" />,
  'Música': <Music className="w-5 h-5 mb-1" />,
  'Gaming': <Gamepad2 className="w-5 h-5 mb-1" />,
  'Hogar': <Home className="w-5 h-5 mb-1" />,
  'Deportes': <Activity className="w-5 h-5 mb-1" />,
  'Otros': <MoreHorizontal className="w-5 h-5 mb-1" />
};

const categories = ['Todos', 'Tecnología', 'Música', 'Gaming', 'Hogar', 'Deportes', 'Otros'];
const conditions = ['Todos', 'Nuevo', 'Como nuevo', 'Buen estado', 'Usado'];
const cities = ['Chimbote', 'Lima', 'Trujillo', 'Arequipa'];
const ratingOptions = ['5 estrellas', '4+ estrellas', '3+ estrellas'];

const getConditionColor = (condition: string) => {
  switch (condition) {
    case 'Nuevo': return 'bg-green-100 text-green-700 border-green-300';
    case 'Como nuevo': return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'Buen estado': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    case 'Usado': return 'bg-slate-100 text-slate-700 border-slate-300';
    default: return 'bg-slate-100 text-slate-700 border-slate-300';
  }
};

export default function Feed() {
  const navigate = useNavigate();
  const { isLoggedIn, userName, userProducts } = useAuth();
  const { t, language } = useSettings();

  // Combinar productos del usuario con los mock (los del usuario van primero)
  const allProducts = useMemo(() => {
    const userMapped = userProducts.map(p => ({
      ...p,
      condition: p.condition,
    }));
    return [...userMapped, ...mockProducts.filter(mp => !userProducts.find(up => up.id === mp.id))];
  }, [userProducts]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedCondition, setSelectedCondition] = useState('Todos');
  const [showConditionDropdown, setShowConditionDropdown] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // ADD 1 — Ubicación filter state
  const [selectedCity, setSelectedCity] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  // ADD 2 — Rating filter state
  const [selectedRating, setSelectedRating] = useState('');
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);

  // ADD 3 — Favorites state
  const [favorites, setFavorites] = useState<Set<number>>(() => {
  try {
    const saved = localStorage.getItem('ecoswap_favorites');
    return saved ? new Set<number>(JSON.parse(saved)) : new Set<number>();
  } catch { return new Set<number>(); }
});

  useEffect(() => {
    if (topBarContentRef.current) {
      setTopBarHeight(topBarContentRef.current.scrollHeight);
    }
  }, []);

  // Search bar + filtros: se ocultan al bajar, reaparecen al subir.
  // Implementación propia, simple: solo dependemos de la dirección del
  // scroll respecto al último valor leído, con un pequeño margen para
  // evitar falsos positivos cerca del punto de cambio de dirección.
  const [hideTopBar, setHideTopBar] = useState(false);
  const lastY = useRef(0);
  const topBarContentRef = useRef<HTMLDivElement>(null);
  const [topBarHeight, setTopBarHeight] = useState(0);

  // Refs para posicionar dropdowns con fixed (evita el clipping del overflow)
  const cityBtnRef = useRef<HTMLButtonElement>(null);
  const conditionBtnRef = useRef<HTMLButtonElement>(null);
  const ratingBtnRef = useRef<HTMLButtonElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const conditionDropdownRef = useRef<HTMLDivElement>(null);
  const ratingDropdownRef = useRef<HTMLDivElement>(null);
  const [cityDropdownPos, setCityDropdownPos] = useState({ top: 0, left: 0 });
  const [conditionDropdownPos, setConditionDropdownPos] = useState({ top: 0, left: 0 });
  const [ratingDropdownPos, setRatingDropdownPos] = useState({ top: 0, left: 0 });

  const openCityDropdown = () => {
    if (cityBtnRef.current) {
      const r = cityBtnRef.current.getBoundingClientRect();
      setCityDropdownPos({ top: r.bottom + 6, left: r.left });
    }
    setShowCityDropdown(!showCityDropdown);
    setShowConditionDropdown(false);
    setShowRatingDropdown(false);
  };
  const openConditionDropdown = () => {
    if (conditionBtnRef.current) {
      const r = conditionBtnRef.current.getBoundingClientRect();
      setConditionDropdownPos({ top: r.bottom + 6, left: r.left });
    }
    setShowConditionDropdown(!showConditionDropdown);
    setShowCityDropdown(false);
    setShowRatingDropdown(false);
  };
  const openRatingDropdown = () => {
    if (ratingBtnRef.current) {
      const r = ratingBtnRef.current.getBoundingClientRect();
      setRatingDropdownPos({ top: r.bottom + 6, left: r.left });
    }
    setShowRatingDropdown(!showRatingDropdown);
    setShowConditionDropdown(false);
    setShowCityDropdown(false);
  };

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
  const handler = (e: MouseEvent) => {
    const target = e.target as Node;
    if (
      !cityBtnRef.current?.contains(target) &&
      !conditionBtnRef.current?.contains(target) &&
      !ratingBtnRef.current?.contains(target) &&
      !cityDropdownRef.current?.contains(target) &&
      !conditionDropdownRef.current?.contains(target) &&
      !ratingDropdownRef.current?.contains(target)
    ) {
      setShowCityDropdown(false);
      setShowConditionDropdown(false);
      setShowRatingDropdown(false);
    }
  };
  document.addEventListener('mousedown', handler);
  return () => document.removeEventListener('mousedown', handler);
}, []);

  useLayoutEffect(() => {
    const measure = () => {
      if (topBarContentRef.current) {
        setTopBarHeight(topBarContentRef.current.scrollHeight);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    let frame: number | null = null;

    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;

        if (y <= 40) {
          setHideTopBar(false);
        } else if (y > lastY.current + 4) {
          setHideTopBar(true);
        } else if (y < lastY.current - 4) {
          setHideTopBar(false);
        }

        lastY.current = y;
        frame = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  const toggleFavorite = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      localStorage.setItem('ecoswap_favorites', JSON.stringify([...next]));
      return next;
    });
    
  };

  const getMinRating = (option: string) => {
    if (option === '5 estrellas') return 5;
    if (option === '4+ estrellas') return 4;
    if (option === '3+ estrellas') return 3;
    return 0;
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesSearch = searchQuery === '' ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesCondition = selectedCondition === 'Todos' || product.condition === selectedCondition;
      const matchesCity = !selectedCity || product.city === selectedCity;
      const matchesRating = !selectedRating || product.rating >= getMinRating(selectedRating);
      return matchesSearch && matchesCategory && matchesCondition && matchesCity && matchesRating;
    });
  }, [searchQuery, selectedCategory, selectedCondition, selectedCity, selectedRating, allProducts]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header fijo */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <img src={logo} alt="EcoSwap" className="w-10 h-10" />
            {!isLoggedIn && (
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-white border-2 border-[#16A085] text-[#16A085] rounded-full font-semibold text-sm hover:bg-[#16A085] hover:text-white transition-all"
              >
                {t('Iniciar sesión')}
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <button
                onClick={() => navigate('/upload')}
                className="bg-[#16A085] text-white p-2 rounded-full hover:bg-[#138D75]"
              >
                <Plus className="w-6 h-6" />
              </button>
            )}
            {isLoggedIn && (
              <button
                onClick={() => navigate('/profile')}
                className="rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-[#0F3460] transition-all"
              >
                <Avatar className="w-10 h-10 bg-[#0F3460]">
                  <AvatarFallback className="bg-[#0F3460] text-white font-semibold">
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>
              </button>
            )}
          </div>
        </div>

        {/* Barra de búsqueda + filtros: se ocultan al bajar, reaparecen al subir */}
        <div
          style={{
            maxHeight: hideTopBar ? 0 : topBarHeight || 'none',
            opacity: hideTopBar ? 0 : 1,
            overflow: 'hidden',
            transition: topBarHeight > 0
              ? 'max-height 0.25s ease-in-out, opacity 0.25s ease-in-out'
              : 'none',
            pointerEvents: hideTopBar ? 'none' : 'auto',
            willChange: 'max-height, opacity',
          }}
        >
          <div ref={topBarContentRef}>
          {/* Barra de búsqueda */}
          <div className="px-4 pb-3 max-w-7xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('Buscar productos, categorías...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#16A085] shadow-sm"
              />
            </div>
          </div>

          {/* FILTROS HORIZONTALES */}
          <div className="px-4 pb-4 max-w-7xl mx-auto flex items-center gap-3">

          {/* ADD 1 — Ubicación chip (before Estado) */}
          <div className="relative flex-shrink-0">
            <button
              ref={cityBtnRef}
              onClick={openCityDropdown}
              className={`h-[80px] px-3 rounded-2xl font-medium text-sm transition-all flex flex-col items-center justify-center gap-1 whitespace-nowrap ${
                selectedCity
                  ? 'bg-[#16A085] text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-[#16A085]'
              }`}
            >
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {t('Ubicación')} <ChevronDown className="w-3 h-3" /></span>
              <span className="text-xs font-normal opacity-80">{selectedCity || t('Todas')}</span>
            </button>
            {showCityDropdown && (
              <div
                ref={cityDropdownRef}
                className="fixed bg-white border border-slate-200 rounded-xl shadow-lg py-2 min-w-[150px]"
                style={{ top: cityDropdownPos.top, left: cityDropdownPos.left, zIndex: 9999 }}
              >
                <button
                  onClick={() => { setSelectedCity(''); setShowCityDropdown(false); }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 ${!selectedCity ? 'text-[#16A085] font-semibold' : 'text-slate-700'}`}
                >
                  {t('Todas')}
                </button>
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => { setSelectedCity(city); setShowCityDropdown(false); }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 ${selectedCity === city ? 'text-[#16A085] font-semibold' : 'text-slate-700'}`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown de Estado (existing) */}
          <div className="relative flex-shrink-0">
            <button
              ref={conditionBtnRef}
              onClick={openConditionDropdown}
              className={`h-[80px] px-4 rounded-2xl font-medium text-sm transition-all flex flex-col items-center justify-center gap-1 whitespace-nowrap ${
                selectedCondition !== 'Todos'
                  ? 'bg-[#16A085] text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-[#16A085]'
              }`}
            >
              <span className="flex items-center gap-1">{t('Estado')} <ChevronDown className="w-4 h-4" /></span>
              <span className="text-xs font-normal opacity-80">{t(selectedCondition)}</span>
            </button>
            {showConditionDropdown && (
              <div
                ref={conditionDropdownRef}
                className="fixed bg-white border border-slate-200 rounded-xl shadow-lg py-2 min-w-[150px]"
                style={{ top: conditionDropdownPos.top, left: conditionDropdownPos.left, zIndex: 9999 }}
              >
                {conditions.map((condition) => (
                  <button
                    key={condition}
                    onClick={() => { setSelectedCondition(condition); setShowConditionDropdown(false); }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 ${selectedCondition === condition ? 'text-[#16A085] font-semibold' : 'text-slate-700'}`}
                  >
                    {t(condition)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ADD 2 — Valoración chip (after Estado) */}
          <div className="relative flex-shrink-0">
            <button
              ref={ratingBtnRef}
              onClick={openRatingDropdown}
              className={`h-[80px] px-3 rounded-2xl font-medium text-sm transition-all flex flex-col items-center justify-center gap-1 whitespace-nowrap ${
                selectedRating
                  ? 'bg-[#16A085] text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-[#16A085]'
              }`}
            >
              <span className="flex items-center gap-1">⭐ {t('Valoración')} <ChevronDown className="w-3 h-3" /></span>
              <span className="text-xs font-normal opacity-80">{selectedRating || t('Todas')}</span>
            </button>
            {showRatingDropdown && (
              <div
                ref={ratingDropdownRef}
                className="fixed bg-white border border-slate-200 rounded-xl shadow-lg py-2 min-w-[160px]"
                style={{ top: ratingDropdownPos.top, left: ratingDropdownPos.left, zIndex: 9999 }}
              >
                <button
                  onClick={() => { setSelectedRating(''); setShowRatingDropdown(false); }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 ${!selectedRating ? 'text-[#16A085] font-semibold' : 'text-slate-700'}`}
                >
                  {t('Todas')}
                </button>
                {ratingOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setSelectedRating(opt); setShowRatingDropdown(false); }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 ${selectedRating === opt ? 'text-[#16A085] font-semibold' : 'text-slate-700'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Carrusel de Categorías con Clipping visible */}
          <div className="overflow-hidden relative w-full" ref={carouselRef}>
            <motion.div
              className="flex gap-4 cursor-grab active:cursor-grabbing pb-2"
              drag="x"
              dragConstraints={carouselRef}
              style={{ width: 'max-content', paddingRight: '40px' }}
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex flex-col items-center justify-center min-w-[80px] h-[80px] rounded-2xl transition-colors whitespace-nowrap flex-shrink-0 ${
                    selectedCategory === category
                      ? 'bg-[#16A085] text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-[#16A085]'
                  }`}
                >
                  {categoryIcons[category]}
                  <span className="text-xs font-medium">{t(category)}</span>
                </motion.button>
              ))}
            </motion.div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
          </div>
          </div>
        </div>
      </div>
      </div>

      {/* Grid de productos */}
      <div className="px-4 py-6 max-w-7xl mx-auto">
        {/* Annotation - Hipótesis */}
        <div className="bg-[#E8F5F0] rounded-[8px] p-[12px] mb-6">
          <p className="text-[#0D3B4F] text-[11px]">
            Hypothesis: Showing the seller's photo and allowing users to save favorites builds greater trust and interaction.
          </p>
        </div>

        <h2 className="text-xl font-bold text-[#0F3460] mb-4">
          {filteredProducts.length} {language === 'en'
            ? (filteredProducts.length === 1 ? 'product near you' : 'products near you')
            : (filteredProducts.length === 1 ? 'producto cerca de ti' : 'productos cerca de ti')}
        </h2>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">{t('No se encontraron productos')}</p>
            <p className="text-slate-400 text-sm mt-2">{t('Intenta con otros filtros')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer"
              >
                {/* Imagen del producto */}
                <div className="relative h-48 bg-slate-200">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  {/* ADD 3 — Heart/favorite button (top-left) */}
                  <button
                    onClick={(e) => toggleFavorite(e, product.id)}
                    className="absolute top-3 left-3 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110"
                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.18)' }}
                  >
                    <Heart
                      className="w-4 h-4"
                      style={{ color: favorites.has(product.id) ? '#16A085' : '#94a3b8', fill: favorites.has(product.id) ? '#16A085' : 'none' }}
                    />
                  </button>
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-[#16A085] flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {product.distance}
                  </div>
                </div>

                {/* Información del producto */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    {/* ADD 5 — Bolder title with slightly larger font */}
                    <h3 className="font-bold text-[15px] text-[#0F3460] flex-1">
                      {product.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-500 mb-2">
                    {product.category}
                  </p>

                  {/* PARTE 4 - BADGE DE ESTADO */}
                  <div className="mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getConditionColor(product.condition)}`}>
                      {t(product.condition)}
                    </span>
                  </div>

                  {/* Rating y trades */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-slate-700">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-sm text-slate-500">
                      {product.trades} {t('intercambios')}
                    </span>
                  </div>

                  {/* ADD 4 — Seller profile row */}
                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100 mt-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: '#0F3460', fontSize: '9px', fontWeight: 700 }}
                    >
                      {product.sellerInitials}
                    </div>
                    <span style={{ fontSize: '10px', color: '#6B7280' }}>{product.sellerName}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Navegación inferior - Solo visible cuando está logueado */}
      {isLoggedIn && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3">
          <div className="flex justify-around max-w-md mx-auto">
            <button className="flex flex-col items-center gap-1 text-[#16A085]">
              <MapPin className="w-6 h-6" />
              <span className="text-xs font-semibold">{t('Feed')}</span>
            </button>
            <button
              onClick={() => navigate('/communities')}
              className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#16A085] transition-colors"
            >
              <Users className="w-6 h-6" />
              <span className="text-xs">{t('Comunidades')}</span>
            </button>
            <button
              onClick={() => navigate('/upload')}
              className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#16A085] transition-colors"
            >
              <Plus className="w-6 h-6" />
              <span className="text-xs">{t('Publicar')}</span>
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#16A085] transition-colors"
            >
              <Star className="w-6 h-6" />
              <span className="text-xs">{t('Perfil')}</span>
            </button>
            <button
              onClick={() => navigate('/favorites')}
              className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#16A085] transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span className="text-[10px]">Favoritos</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
