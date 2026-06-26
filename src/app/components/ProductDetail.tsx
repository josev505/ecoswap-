import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Shield, Check, X } from 'lucide-react';
import { useAuth } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import { useSettings } from '../contexts/SettingsContext';

// Base de datos completa de productos
const allProducts = [
  {
    id: 1,
    title: 'Bicicleta de Montaña',
    description: 'Bicicleta de montaña en excelente estado, poco uso. Marca Trek, modelo 2023. Incluye luces LED y candado. Perfecta para rutas por Chimbote y alrededores.',
    category: 'Deportes',
    condition: 'Buen estado',
    distance: '0.8 km',
    images: [
      'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800',
      'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=800',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800',
    ],
    seller: { name: 'Carlos Mendoza', rating: 4.8, trades: 15, verified: true, memberSince: 'Enero 2025' }
  },
  {
    id: 2,
    title: 'Laptop HP Core i5',
    description: 'Laptop HP en perfecto estado, Core i5 de 11va generación, 8GB RAM, 256GB SSD. Ideal para trabajo y estudio. Incluye cargador original y funda protectora.',
    category: 'Tecnología',
    condition: 'Como nuevo',
    distance: '1.2 km',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
      'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800',
    ],
    seller: { name: 'Ana Torres', rating: 5.0, trades: 8, verified: true, memberSince: 'Febrero 2025' }
  },
  {
    id: 3,
    title: 'Guitarra Acústica',
    description: 'Guitarra acústica Yamaha en excelente estado. Sonido cálido y equilibrado. Incluye funda acolchada, afinador digital y púas. Perfecta para principiantes y avanzados.',
    category: 'Música',
    condition: 'Buen estado',
    distance: '0.5 km',
    images: [
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800',
      'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800',
      'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800',
    ],
    seller: { name: 'Luis Ramirez', rating: 4.8, trades: 15, verified: true, memberSince: 'Diciembre 2024' }
  },
  {
    id: 4,
    title: 'Consola PlayStation 4',
    description: 'PlayStation 4 Slim 1TB con 2 controles DualShock 4 originales. Incluye 5 juegos físicos (FIFA, GTA V, God of War, Spider-Man, The Last of Us). Funcionamiento perfecto.',
    category: 'Gaming',
    condition: 'Usado',
    distance: '2.1 km',
    images: [
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800',
      'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800',
      'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800',
    ],
    seller: { name: 'Jorge Castillo', rating: 4.7, trades: 20, verified: true, memberSince: 'Noviembre 2024' }
  },
  {
    id: 5,
    title: 'Cafetera Express',
    description: 'Cafetera express Oster de alta presión. Prepara espresso, cappuccino y latte. Vaporizador integrado para leche. Nueva, solo 2 meses de uso. Incluye accesorios completos.',
    category: 'Hogar',
    condition: 'Nuevo',
    distance: '0.3 km',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800',
      'https://images.unsplash.com/photo-1585742969395-510cf82e8db9?w=800',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
    ],
    seller: { name: 'María López', rating: 4.9, trades: 6, verified: true, memberSince: 'Marzo 2025' }
  },
  {
    id: 6,
    title: 'Tablet Samsung',
    description: 'Samsung Galaxy Tab A8 de 10.5 pulgadas, 64GB almacenamiento, 4GB RAM. Pantalla Full HD, batería de larga duración. Incluye funda con teclado Bluetooth y stylus.',
    category: 'Tecnología',
    condition: 'Como nuevo',
    distance: '1.8 km',
    images: [
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800',
      'https://images.unsplash.com/photo-1585789575991-0c49897027c1?w=800',
    ],
    seller: { name: 'Pedro Vega', rating: 4.6, trades: 10, verified: true, memberSince: 'Enero 2025' }
  },
  {
    id: 7,
    title: 'iPhone 13 Pro',
    description: 'iPhone 13 Pro de 256GB en color grafito. Batería al 95%, sin rayones. Incluye caja original, cargador MagSafe y 2 fundas de silicona Apple originales.',
    category: 'Tecnología',
    condition: 'Como nuevo',
    distance: '1.0 km',
    images: [
      'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=800',
      'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800',
      'https://images.unsplash.com/photo-1611472173362-3f53dbd65d80?w=800',
    ],
    seller: { name: 'Roberto Silva', rating: 4.9, trades: 5, verified: true, memberSince: 'Abril 2025' }
  },
  {
    id: 8,
    title: 'Audífonos Sony',
    description: 'Sony WH-1000XM4, cancelación de ruido líder en la industria. 30 horas de batería, Bluetooth 5.0, plegables. Incluye estuche rígido y cable auxiliar.',
    category: 'Tecnología',
    condition: 'Buen estado',
    distance: '0.6 km',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
    ],
    seller: { name: 'Carmen Díaz', rating: 4.7, trades: 14, verified: true, memberSince: 'Febrero 2025' }
  },
  {
    id: 9,
    title: 'Monitor Gamer 27"',
    description: 'Monitor gaming LG UltraGear 27" 144Hz, 1ms de respuesta, resolución 2K QHD. Panel IPS, G-Sync compatible, HDR10. Nuevo en caja sellada.',
    category: 'Gaming',
    condition: 'Nuevo',
    distance: '1.5 km',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800',
      'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800',
      'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800',
    ],
    seller: { name: 'Diego Ruiz', rating: 4.8, trades: 9, verified: true, memberSince: 'Marzo 2025' }
  },
  {
    id: 10,
    title: 'Cámara Canon EOS',
    description: 'Canon EOS Rebel T7 con lente 18-55mm. 24.1MP, WiFi integrado, video Full HD. Perfecta para fotógrafos principiantes. Incluye memoria SD 64GB, bolso y tripode.',
    category: 'Tecnología',
    condition: 'Como nuevo',
    distance: '2.0 km',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
      'https://images.unsplash.com/photo-1606933248010-efdf79b37310?w=800',
    ],
    seller: { name: 'Patricia Moreno', rating: 5.0, trades: 7, verified: true, memberSince: 'Enero 2025' }
  },
  {
    id: 11,
    title: 'Teclado Mecánico RGB',
    description: 'Teclado mecánico Redragon K552 RGB, switches blue, layout español. Construcción metálica, anti-ghosting completo. Ideal para gaming y escritura.',
    category: 'Gaming',
    condition: 'Buen estado',
    distance: '0.9 km',
    images: [
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800',
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800',
    ],
    seller: { name: 'Fernando Ortiz', rating: 4.6, trades: 11, verified: true, memberSince: 'Diciembre 2024' }
  },
  {
    id: 12,
    title: 'Scooter Eléctrico',
    description: 'Scooter eléctrico Xiaomi Mi 3, autonomía 30km, velocidad máxima 25km/h. Batería recién reemplazada. Incluye candado de seguridad y luces LED.',
    category: 'Deportes',
    condition: 'Usado',
    distance: '1.3 km',
    images: [
      'https://images.unsplash.com/photo-1604930008933-3e4b99d993b2?w=800',
      'https://images.unsplash.com/photo-1621146202207-135a60e3cac7?w=800',
      'https://images.unsplash.com/photo-1595423312038-acee3daa9dc8?w=800',
    ],
    seller: { name: 'Sergio Parra', rating: 4.8, trades: 13, verified: true, memberSince: 'Febrero 2025' }
  },
  {
    id: 13,
    title: 'Smartwatch Apple',
    description: 'Apple Watch Series 7 de 45mm GPS, caja de aluminio color medianoche. Correa deportiva y correa milanesa incluidas. Batería excelente, 6 meses de uso.',
    category: 'Tecnología',
    condition: 'Como nuevo',
    distance: '0.7 km',
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
      'https://images.unsplash.com/photo-1617625802912-cad62234c69d?w=800',
    ],
    seller: { name: 'Valeria Soto', rating: 4.9, trades: 6, verified: true, memberSince: 'Abril 2025' }
  },
  {
    id: 14,
    title: 'Silla Gamer',
    description: 'Silla gamer ergonómica con soporte lumbar ajustable, reposabrazos 4D, reclinable hasta 180°. Tapizado en cuero PU, base metálica. Color negro con detalles rojos.',
    category: 'Gaming',
    condition: 'Buen estado',
    distance: '1.1 km',
    images: [
      'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800',
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
    ],
    seller: { name: 'Gabriel Navarro', rating: 4.5, trades: 8, verified: true, memberSince: 'Enero 2025' }
  },
  {
    id: 15,
    title: 'Libros de Programación',
    description: 'Colección de 8 libros de programación: Clean Code, JavaScript avanzado, Python para Data Science, entre otros. Excelente estado, casi sin uso.',
    category: 'Otros',
    condition: 'Usado',
    distance: '0.4 km',
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800',
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
    ],
    seller: { name: 'Ricardo Flores', rating: 4.7, trades: 12, verified: true, memberSince: 'Marzo 2025' }
  },
  {
    id: 16,
    title: 'Parlante Bluetooth JBL',
    description: 'JBL Flip 6, resistente al agua IPX7, sonido potente 360°, 12 horas de batería. Nuevo, aún en caja sellada con garantía. Color negro.',
    category: 'Música',
    condition: 'Nuevo',
    distance: '1.6 km',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800',
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800',
    ],
    seller: { name: 'Lucía Herrera', rating: 4.8, trades: 10, verified: true, memberSince: 'Febrero 2025' }
  },
];

// Función para obtener color del badge según estado
const getConditionColor = (condition: string) => {
  switch (condition) {
    case 'Nuevo':
      return 'bg-green-100 text-green-700 border-green-300';
    case 'Como nuevo':
      return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'Buen estado':
      return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    case 'Usado':
      return 'bg-slate-100 text-slate-700 border-slate-300';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-300';
  }
};

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoggedIn, userProducts } = useAuth();
  const { t, language } = useSettings();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Busca primero en productos del usuario, luego en mock
  const userProduct = userProducts.find(p => p.id === Number(id));
  const mockProduct = allProducts.find(p => p.id === Number(id));

  // Normaliza producto de usuario al formato del ProductDetail
  const product = userProduct
    ? {
        ...userProduct,
        images: userProduct.images.length > 0 ? userProduct.images : [userProduct.image],
        seller: { name: userProduct.sellerName, rating: userProduct.rating, trades: userProduct.trades, verified: true, memberSince: 'Junio 2026' },
        swapFor: [],
      }
    : mockProduct;

  // Si no se encuentra el producto, redirigir al feed usando useEffect
  useEffect(() => {
    if (!product) {
      navigate('/feed');
    }
  }, [product, navigate]);

  const handleAction = () => {
    if (!product) return;

    if (isLoggedIn) {
      setShowModal(true);
    } else {
      navigate('/login');
    }
  };

  const handleConfirm = () => {
    if (!product) return;
    setShowModal(false);
    navigate(`/chat/${product.id}`);
  };

  // Mostrar un loading mientras redirige si no hay producto
  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/feed')}
            className="text-[#0F3460] hover:bg-slate-100 p-2 rounded-lg inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-semibold">{language === 'en' ? 'Back to feed' : 'Volver al feed'}</span>
          </button>
        </div>
      </div>

      {/* Layout principal: Imagen IZQUIERDA, Info DERECHA */}
      <div className="px-4 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LADO IZQUIERDO - Imágenes */}
          <div>
            {/* Imagen principal grande */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-4">
              <div className="relative h-96 bg-slate-200">
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Miniaturas debajo */}
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-1 rounded-xl overflow-hidden border-3 transition-all ${
                    idx === selectedImage
                      ? 'border-[#16A085] ring-2 ring-[#16A085]'
                      : 'border-transparent hover:border-slate-300'
                  }`}
                >
                  <div className="h-24 bg-slate-200">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* LADO DERECHO - Información del producto */}
          <div className="space-y-6">
            {/* Título y distancia */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-3xl font-bold text-[#0F3460] flex-1">
                  {product.title}
                </h1>
              </div>

              <div className="flex items-center gap-2 text-[#16A085] mb-4">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">{product.distance}</span>
              </div>

              {/* Categoría y estado */}
              <div className="flex gap-3 mb-4">
                <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getConditionColor(product.condition)}`}>
                  {t(product.condition)}
                </span>
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="font-bold text-[#0F3460] mb-3 text-lg">
                {t('Descripción')}
              </h2>
              <p className="text-slate-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Información del vendedor */}
            <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-[#0F3460] border-opacity-10">
              <h2 className="font-bold text-[#0F3460] mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#16A085]" />
                {language === 'en' ? 'Verified Seller' : 'Vendedor Verificado'}
              </h2>

              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[#0F3460] text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                  {product.seller.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-[#0F3460]">
                      {product.seller.name}
                    </h3>
                    {product.seller.verified && (
                      <Shield className="w-4 h-4 text-[#16A085]" />
                    )}
                  </div>

                  <p className="text-sm text-slate-500 mb-1">
                    Miembro desde {product.seller.memberSince}
                  </p>
                  {/* Seller public profile link */}
                  <button
                    onClick={() => navigate(`/seller/${product.id}`)}
                    className="text-[#16A085] text-[11px] font-medium mb-2 hover:underline"
                  >
                    Ver perfil completo →
                  </button>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-[#0F3460]">
                        {product.seller.rating}
                      </span>
                    </div>
                    <span className="text-sm text-slate-600">
                      {product.seller.trades} {language === 'en' ? 'successful trades' : 'intercambios exitosos'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de acción - Condicional según login */}
            <button
              onClick={handleAction}
              className="w-full bg-[#16A085] hover:bg-[#138D75] text-white py-4 rounded-xl font-semibold text-lg shadow-lg transition-all transform hover:scale-105"
            >
              {isLoggedIn
                ? (language === 'en' ? "I'm interested" : 'Me interesa')
                : (language === 'en' ? 'Sign in to contact' : 'Iniciar sesión para contactar')}
            </button>

            {/* Ubicación */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="font-bold text-[#0F3460] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#16A085]" />
                Ubicación en Chimbote
              </h2>
              <div className="bg-slate-200 rounded-xl h-48 flex items-center justify-center">
                <p className="text-slate-500">Mapa de Chimbote - {product.distance}</p>
              </div>
            </div>

            {/* ADD 2 — Reseñas del vendedor */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="font-bold text-[#0F3460] mb-4 text-lg">
                {language === 'en' ? 'Seller Reviews' : 'Reseñas del vendedor'}
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#16A085] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">MG</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-[#0F3460] text-xs">María G.</span>
                      <span className="text-yellow-500 text-xs">⭐⭐⭐⭐⭐</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Excelente vendedor, producto tal como se describe.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0F3460] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">CM</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-[#0F3460] text-xs">Carlos M.</span>
                      <span className="text-yellow-500 text-xs">⭐⭐⭐⭐</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Buen intercambio, muy puntual.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ADD 4 — Productos relacionados */}
            {(() => {
              const related = allProducts.filter(
                p => p.category === product.category && p.id !== product.id
              );
              if (related.length === 0) return null;
              return (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="font-bold text-[#0F3460] mb-4 text-lg">
                    {language === 'en' ? 'Related Products' : 'Productos relacionados'}
                  </h2>
                  <div className="space-y-3">
                    {related.map(p => (
                      <div
                        key={p.id}
                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
                        onClick={() => navigate(`/product/${p.id}`)}
                      >
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="rounded-lg object-cover flex-shrink-0"
                          style={{ width: 60, height: 60 }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-[#0F3460] text-xs truncate">{p.title}</p>
                          <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-medium mt-1">
                            {p.category}
                          </span>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3 text-[#16A085]" />
                            <span className="text-[10px] text-slate-500">{p.distance}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Annotation - Hipótesis (Product Detail) */}
            <div className="bg-[#F5F0E8] rounded-[8px] p-[12px] mt-6">
              <p className="text-[#0D3B4F] text-[11px]">
                Hypothesis: A warmer background color reduces visual fatigue and a vertical related-products carousel increases browsing time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Req 3: Exchange Confirmation Modal (Figure-Ground) */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark background overlay (50% opacity black) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black bg-opacity-50"
            />
            
            {/* Centered Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl z-10"
            >
              <h3 className="text-2xl font-bold text-[#0F3460] mb-2 text-center">
                {language === 'en' ? 'Confirm Interest' : 'Confirmar Interés'}
              </h3>
              <p className="text-slate-600 text-center mb-6">
                {language === 'en'
                  ? <>Are you sure you want to start a negotiation for <strong>{product.title}</strong> with {product.seller.name}?</>
                  : <>¿Estás seguro de que deseas iniciar una negociación por <strong>{product.title}</strong> con {product.seller.name}?</>
                }
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5" /> {language === 'en' ? 'Cancel' : 'Cancelar'}
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-4 py-3 rounded-xl bg-[#16A085] text-white font-semibold hover:bg-[#138D75] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
                >
                  <Check className="w-5 h-5" /> {language === 'en' ? 'Confirm' : 'Confirmar'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
