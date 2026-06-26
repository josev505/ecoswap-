import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Language = 'es' | 'en';

interface SettingsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  t: (text: string) => string;
}

const translations: Record<string, string> = {
  // Welcome
  'Intercambia con confianza en tu comunidad local': 'Exchange with confidence in your local community',
  'Comenzar': 'Get Started',
  'Verificación DNI': 'ID Verification',
  'Todos los usuarios verificados con documento oficial': 'All users verified with official document',
  'GPS Local': 'Local GPS',
  'Encuentra productos cerca de ti en Chimbote': 'Find products near you in Chimbote',
  'Puntos Seguros': 'Safe Meeting Points',
  'Intercambia en lugares públicos seguros': 'Exchange in safe public places',
  '¿Ya tienes cuenta? Inicia sesión': 'Already have an account? Sign in',
  'Crear cuenta nueva': 'Create new account',
  // Login
  'Volver': 'Back',
  'Bienvenido de nuevo': 'Welcome back',
  'Inicia sesión para continuar intercambiando': 'Sign in to continue swapping',
  'Credenciales de Acceso': 'Access Credentials',
  'Correo Electrónico': 'Email Address',
  'Contraseña': 'Password',
  '¿Olvidaste tu contraseña?': 'Forgot your password?',
  'Iniciar Sesión': 'Sign In',
  'Crear Cuenta Nueva': 'Create New Account',
  '🔒 Tu información está protegida con encriptación de nivel bancario': '🔒 Your information is protected with bank-level encryption',
  // Register
  '¡Registro exitoso!': 'Registration successful!',
  'DNI': 'ID',
  'Selfie': 'Selfie',
  'Validación': 'Validation',
  'Continuar': 'Continue',
  'Finalizar Registro': 'Complete Registration',
  // Feed
  'Iniciar sesión': 'Sign in',
  'Buscar productos, categorías...': 'Search products, categories...',
  'Estado': 'Condition',
  'Todos': 'All',
  'Tecnología': 'Technology',
  'Música': 'Music',
  'Gaming': 'Gaming',
  'Hogar': 'Home',
  'Deportes': 'Sports',
  'Otros': 'Other',
  'Nuevo': 'New',
  'Como nuevo': 'Like new',
  'Buen estado': 'Good',
  'Usado': 'Used',
  'No se encontraron productos': 'No products found',
  'Intenta con otros filtros': 'Try other filters',
  'intercambios': 'exchanges',
  // Nav
  'Feed': 'Feed',
  'Publicar': 'Post',
  'Perfil': 'Profile',
  'Comunidades': 'Communities',
  // Profile
  'Miembro desde Enero 2025': 'Member since January 2025',
  'Rating': 'Rating',
  'Intercambios': 'Trades',
  'Productos': 'Products',
  'Nivel de Confianza': 'Trust Level',
  'Reputación': 'Reputation',
  'Nivel 3 - Intercambiador Confiable': 'Level 3 - Reliable Trader',
  'Cómo ganar puntos:': 'How to earn points:',
  'Completar intercambio: +20 pts': 'Complete a trade: +20 pts',
  'Recibir 5 estrellas: +10 pts': 'Receive 5 stars: +10 pts',
  'Verificar ubicación: +5 pts': 'Verify location: +5 pts',
  'Logros Desbloqueados': 'Unlocked Achievements',
  'Completado': 'Completed',
  'Intercambios Recientes': 'Recent Trades',
  'Editar Perfil': 'Edit Profile',
  'Primera Estrella': 'First Star',
  'Completó su primer intercambio': 'Completed their first trade',
  'Intercambiador Frecuente': 'Frequent Trader',
  '10 intercambios completados': '10 trades completed',
  'Confianza Total': 'Full Trust',
  'Rating 5.0 por 5 intercambios': '5.0 rating for 5 trades',
  'Vecino Activo': 'Active Neighbor',
  '20 intercambios en Chimbote': '20 trades in Chimbote',
  'Experto Local': 'Local Expert',
  '50 intercambios completados': '50 trades completed',
  'Leyenda EcoSwap': 'EcoSwap Legend',
  '100 intercambios exitosos': '100 successful trades',
  // Chat
  'En línea': 'Online',
  'Negociando:': 'Negotiating:',
  '¿Aceptar esta propuesta de intercambio?': 'Accept this trade proposal?',
  'Rechazar': 'Decline',
  'Aceptar': 'Accept',
  'Escribe un mensaje...': 'Write a message...',
  // Logistics
  'Volver al Chat': 'Back to Chat',
  'Logística del Intercambio': 'Trade Logistics',
  'Elige cómo y dónde realizar el intercambio en Chimbote': 'Choose how and where to complete the trade in Chimbote',
  'Método de Entrega': 'Delivery Method',
  'Punto Seguro Público': 'Public Safe Point',
  'Encuentro en lugares públicos verificados': 'Meet at verified public locations',
  'Servicio de Delivery': 'Delivery Service',
  'Coordinamos la entrega a domicilio': 'We coordinate home delivery',
  'Selecciona un Punto Seguro en Chimbote': 'Select a Safe Point in Chimbote',
  'Mapa de Chimbote': 'Chimbote Map',
  'Información de Entrega': 'Delivery Information',
  'Costo del servicio:': 'Service cost:',
  'Fecha y Hora del Intercambio': 'Trade Date and Time',
  'Fecha': 'Date',
  'Hora': 'Time',
  'Confirmar Intercambio': 'Confirm Trade',
  // Upload
  'Publicar Producto': 'Post Product',
  'Fotos del Producto': 'Product Photos',
  'Sube 6 fotos desde diferentes ángulos para mejor calidad': 'Upload 6 photos from different angles for better quality',
  'Información del Producto': 'Product Information',
  'Título del producto': 'Product title',
  'Ej: Bicicleta de montaña': 'E.g.: Mountain bike',
  'Categoría': 'Category',
  'Seleccionar categoría': 'Select category',
  'Estado del producto': 'Product condition',
  'Seleccionar estado': 'Select condition',
  'Descripción': 'Description',
  'Describe tu producto en detalle...': 'Describe your product in detail...',
  'Frente': 'Front',
  'Lateral': 'Side',
  'Trasera': 'Back',
  'Detalle 1': 'Detail 1',
  'Detalle 2': 'Detail 2',
  'En uso': 'In use',
  'Publicar Producto_btn': 'Post Product',
  // Settings (new)
  'Ajustes': 'Settings',
  'Idioma': 'Language',
  'Español': 'Spanish',
  'Inglés': 'English',
  'Modo Oscuro': 'Dark Mode',
  'Apariencia': 'Appearance',
  'Activo': 'Active',
  'Inactivo': 'Inactive',
  // Communities (new)
  'Comunidades Locales': 'Local Communities',
  'Únete a grupos de tu ciudad': 'Join groups in your city',
  'miembros': 'members',
  'Unirte a la comunidad': 'Join community',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const t = (text: string): string => {
    if (language === 'en') {
      return translations[text] ?? text;
    }
    return text;
  };

  return (
    <SettingsContext.Provider value={{ language, setLanguage, darkMode, setDarkMode, t }}>
      {children}
    </SettingsContext.Provider>
  );
}
