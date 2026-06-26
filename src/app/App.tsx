import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { createContext, useContext, useState, ReactNode } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { motion } from 'motion/react';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import Feed from './components/Feed';
import Upload from './components/Upload';
import ProductDetail from './components/ProductDetail';
import Profile from './components/Profile';
import SellerProfile from './components/SellerProfile';
import Chat from './components/Chat';
import Logistics from './components/Logistics';
import SettingsScreen from './components/Settings';
import Communities from './components/Communities';
import CommunityDetail from './components/CommunityDetail';
import EditProfile from './components/EditProfile';
import VerifyEmail from './components/VerifyEmail';
import { SettingsProvider } from './contexts/SettingsContext';

// AuthContext inline
interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  userName: string;
  setUserName: (name: string) => void;
  userProducts: UserProduct[];
  addUserProduct: (p: UserProduct) => void;
  registerUser: (name: string, email: string, password: string) => void;
  currentUserEmail: string;
}

export interface UserProduct {
  id: number;
  title: string;
  category: string;
  condition: string;
  description: string;
  image: string;   // primera imagen (para Feed y cards)
  images: string[];
  distance: string;
  rating: number;
  trades: number;
  city: string;
  sellerName: string;
  sellerInitials: string;
  isOwn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [userProducts, setUserProducts] = useState<UserProduct[]>([]);

  // Usuarios registrados se guardan en localStorage
  const getUsers = (): Record<string, { name: string; password: string }> => {
    try {
      return JSON.parse(localStorage.getItem('ecoswap_users') || '{}');
    } catch {
      return {};
    }
  };

  const registerUser = (name: string, email: string, password: string) => {
    const users = getUsers();
    users[email] = { name, password };
    localStorage.setItem('ecoswap_users', JSON.stringify(users));
  };

  const login = (email: string, password: string): boolean => {
    const users = getUsers();
    const user = users[email];
    if (user && user.password === password) {
      setIsLoggedIn(true);
      setUserName(user.name);
      setCurrentUserEmail(email);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setCurrentUserEmail('');
  };

  const addUserProduct = (p: UserProduct) => {
    setUserProducts(prev => [p, ...prev]);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userName, setUserName, userProducts, addUserProduct, registerUser, currentUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

function FloatingGearButton() {
  const navigate = useNavigate();
  return (
    <motion.button
      onClick={() => navigate('/settings')}
      whileHover={{ scale: 1.1, rotate: 30 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="fixed bottom-6 right-5 z-50 w-12 h-12 bg-[#0F3460] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#16A085] transition-colors"
      aria-label="Ajustes"
    >
      <SettingsIcon className="w-5 h-5" />
    </motion.button>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <BrowserRouter>
          <FloatingGearButton />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/seller/:id" element={<SellerProfile />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/logistics" element={<Logistics />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/community/:id" element={<CommunityDetail />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </SettingsProvider>
  );
}
