// SVG logo inline — reemplaza la imagen faltante
export default function EcoSwapLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="EcoSwap Logo"
    >
      {/* Fondo circular */}
      <circle cx="50" cy="50" r="50" fill="#0F3460" />
      {/* Hoja izquierda */}
      <path
        d="M30 55 Q25 35 50 30 Q38 48 55 58 Q42 62 30 55Z"
        fill="#16A085"
        opacity="0.95"
      />
      {/* Hoja derecha */}
      <path
        d="M70 45 Q75 65 50 70 Q62 52 45 42 Q58 38 70 45Z"
        fill="#16A085"
        opacity="0.7"
      />
      {/* Flecha de intercambio */}
      <path
        d="M38 50 L62 50"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <polyline
        points="56,44 62,50 56,56"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
