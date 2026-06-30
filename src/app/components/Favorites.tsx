import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';

const mockProducts = [
  { id: 1, title: 'Bicicleta de Montaña', category: 'Deportes', distance: '0.8 km', image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400', condition: 'Buen estado' },
  { id: 2, title: 'Laptop HP Core i5', category: 'Tecnología', distance: '1.2 km', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', condition: 'Como nuevo' },
  { id: 3, title: 'Guitarra Acústica', category: 'Música', distance: '0.5 km', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400', condition: 'Buen estado' },
  { id: 4, title: 'Consola PlayStation 4', category: 'Gaming', distance: '2.1 km', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400', condition: 'Usado' },
  { id: 5, title: 'Cafetera Express', category: 'Hogar', distance: '0.3 km', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400', condition: 'Nuevo' },
  { id: 6, title: 'Tablet Samsung', category: 'Tecnología', distance: '1.8 km', image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400', condition: 'Como nuevo' },
  { id: 7, title: 'iPhone 13 Pro', category: 'Tecnología', distance: '1.0 km', image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400', condition: 'Como nuevo' },
  { id: 8, title: 'Audífonos Sony', category: 'Tecnología', distance: '0.6 km', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', condition: 'Buen estado' },
  { id: 9, title: 'Monitor Gamer 27"', category: 'Gaming', distance: '1.5 km', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400', condition: 'Nuevo' },
  { id: 10, title: 'Cámara Canon EOS', category: 'Tecnología', distance: '2.0 km', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400', condition: 'Como nuevo' },
  { id: 11, title: 'Teclado Mecánico RGB', category: 'Gaming', distance: '0.9 km', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400', condition: 'Buen estado' },
  { id: 12, title: 'Scooter Eléctrico', category: 'Deportes', distance: '1.3 km', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', condition: 'Usado' },
  { id: 13, title: 'Smartwatch Apple', category: 'Tecnología', distance: '0.7 km', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400', condition: 'Como nuevo' },
  { id: 14, title: 'Silla Gamer', category: 'Gaming', distance: '1.1 km', image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400', condition: 'Buen estado' },
  { id: 15, title: 'Libros de Programación', category: 'Otros', distance: '0.4 km', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400', condition: 'Usado' },
  { id: 16, title: 'Parlante Bluetooth JBL', category: 'Música', distance: '1.6 km', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', condition: 'Nuevo' },
];

export default function Favorites() {
  const navigate = useNavigate();
  const favoriteIds: number[] = (() => {
    try { return JSON.parse(localStorage.getItem('ecoswap_favorites') || '[]'); }
    catch { return []; }
  })();
  const favProducts = mockProducts.filter(p => favoriteIds.includes(p.id));

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b border-slate-200 px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-lg">
          <ArrowLeft className="w-5 h-5 text-[#0F3460]" />
        </button>
        <h1 className="text-lg font-bold text-[#0F3460]">Mis Favoritos</h1>
        <span className="ml-auto text-sm text-slate-500">{favProducts.length} productos</span>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        {favProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-24 gap-4 text-slate-400">
            <Heart className="w-16 h-16 opacity-30" />
            <p className="text-lg font-medium">No tienes favoritos aún</p>
            <p className="text-sm text-center">Dale corazón a los productos que te interesen y aparecerán aquí.</p>
            <button
              onClick={() => navigate('/feed')}
              className="mt-4 px-6 py-3 bg-[#16A085] text-white rounded-xl font-semibold hover:bg-[#138D75] transition-colors"
            >
              Explorar productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {favProducts.map(p => (
              <div
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center">
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-bold text-[#0F3460] text-sm truncate">{p.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{p.category} · {p.distance}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px]">{p.condition}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}