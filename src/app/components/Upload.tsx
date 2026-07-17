import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  X,
  ArrowLeft,
  Upload as UploadIcon,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../App";
import { useSettings } from "../contexts/SettingsContext";

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#16A085] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce-once">
      <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
      <span className="font-semibold text-sm">{message}</span>
    </div>
  );
}

export default function Upload() {
  const navigate = useNavigate();
  const { isLoggedIn, userName, addUserProduct } = useAuth();
  const { t, language } = useSettings();
  const [featured, setFeatured] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]); // base64 / object URLs
  const [draggingOver, setDraggingOver] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  const maxPhotos = 6;

  const readFiles = (files: FileList | File[]) => {
    const arr = Array.from(files).slice(0, maxPhotos - photos.length);
    arr.forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setPhotos((prev) => (prev.length < maxPhotos ? [...prev, url] : prev));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) readFiles(e.target.files);
    e.target.value = "";
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDraggingOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDraggingOver(false);
      if (e.dataTransfer.files) readFiles(e.dataTransfer.files);
    },
    [photos],
  );

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const conditionLabel =
      {
        nuevo: "Nuevo",
        "como-nuevo": "Como nuevo",
        "buen-estado": "Buen estado",
        usado: "Usado",
      }[formData.condition] || formData.condition;

    const categoryLabel =
      {
        tecnologia: "Tecnología",
        deportes: "Deportes",
        hogar: "Hogar",
        musica: "Música",
        gaming: "Gaming",
        otros: "Otros",
      }[formData.category] || formData.category;

    const imageList =
      photos.length > 0
        ? photos
        : ["https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800"];

    addUserProduct({
      id: Date.now(),
      title: formData.title,
      category: categoryLabel,
      condition: conditionLabel,
      description: formData.description,
      image: imageList[0],
      images: imageList,
      distance: "0.1 km",
      rating: 0,
      trades: 0,
      city: "Chimbote",
      sellerName:
        userName.split(" ")[0] +
        " " +
        (userName.split(" ")[1]?.[0] || "") +
        ".",
      sellerInitials: getInitials(userName),
      isOwn: true,
    });

    setShowToast(true);
    setTimeout(() => navigate("/feed"), 2500);
  };

  const slotLabels = [
    "Frente",
    "Lateral",
    "Trasera",
    "Detalle 1",
    "Detalle 2",
    "En uso",
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {showToast && (
        <Toast
          message="¡Tu artículo se publicó con éxito! 🎉"
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/feed")}
            className="text-[#0F3460] hover:bg-slate-100 p-2 rounded-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-[#0F3460]">
            {t("Publicar Producto")}
          </h1>
        </div>
      </div>

      <div className="px-4 py-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Fotos */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="font-bold text-[#0F3460] mb-1">
              {t("Fotos del Producto")} ({photos.length}/{maxPhotos})
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              {t("Sube 6 fotos desde diferentes ángulos para mejor calidad")}
            </p>

            {/* Zona de drag & drop */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() =>
                photos.length < maxPhotos && fileInputRef.current?.click()
              }
              className={`border-2 border-dashed rounded-xl p-4 mb-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                draggingOver
                  ? "border-[#16A085] bg-[#16A085]/10 scale-[1.01]"
                  : photos.length < maxPhotos
                    ? "border-slate-300 bg-slate-50 hover:border-[#16A085] hover:bg-[#16A085]/5"
                    : "border-slate-200 bg-slate-50 cursor-not-allowed opacity-60"
              }`}
            >
              <UploadIcon
                className={`w-8 h-8 ${draggingOver ? "text-[#16A085]" : "text-slate-400"}`}
              />
              <p className="text-sm font-medium text-slate-600">
                {draggingOver
                  ? "Suelta las fotos aquí"
                  : photos.length < maxPhotos
                    ? "Arrastra fotos aquí o haz clic para seleccionar"
                    : "Límite de 6 fotos alcanzado"}
              </p>
              <p className="text-xs text-slate-400">PNG, JPG, WEBP</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileInput}
            />

            {/* Grid de fotos */}
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: maxPhotos }, (_, i) => {
                const photo = photos[i];
                return (
                  <div key={i} className="relative aspect-square">
                    {photo ? (
                      <div className="w-full h-full rounded-xl overflow-hidden border-2 border-[#16A085] relative">
                        <img
                          src={photo}
                          alt={`foto ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(i)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 shadow"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-full rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center cursor-pointer hover:border-[#16A085] transition-colors"
                      >
                        <Camera className="w-6 h-6 text-slate-300" />
                      </div>
                    )}
                    <p className="text-[10px] text-slate-400 text-center mt-1">
                      {slotLabels[i]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Información del producto */}
          <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
            <h2 className="font-bold text-[#0F3460] mb-4">
              {t("Información del Producto")}
            </h2>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t("Título del producto")}
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A085]"
                placeholder={t("Ej: Bicicleta de montaña")}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t("Categoría")}
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A085]"
                required
              >
                <option value="">{t("Seleccionar categoría")}</option>
                <option value="tecnologia">{t("Tecnología")}</option>
                <option value="deportes">{t("Deportes")}</option>
                <option value="hogar">{t("Hogar")}</option>
                <option value="musica">{t("Música")}</option>
                <option value="gaming">{t("Gaming")}</option>
                <option value="otros">{t("Otros")}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t("Estado del producto")}
              </label>
              <select
                value={formData.condition}
                onChange={(e) =>
                  setFormData({ ...formData, condition: e.target.value })
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A085]"
                required
              >
                <option value="">{t("Seleccionar estado")}</option>
                <option value="nuevo">{t("Nuevo")}</option>
                <option value="como-nuevo">{t("Como nuevo")}</option>
                <option value="buen-estado">{t("Buen estado")}</option>
                <option value="usado">{t("Usado")}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t("Descripción")}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A085] min-h-[120px]"
                placeholder={t("Describe tu producto en detalle...")}
                required
              />
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-2xl p-5 shadow-md">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="mt-1 w-5 h-5 accent-amber-500"
              />
              <div className="flex-1">
                <p className="font-bold text-[#0F3460] flex items-center gap-2 flex-wrap">
                  ⭐ Destacar esta publicación
                  <span className="text-sm bg-amber-500 text-white px-3 py-1 rounded-full font-bold">
                    S/ 5.00
                  </span>
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Tu producto aparecerá primero en el Feed durante 7 días
                </p>
              </div>
            </label>
          </div>

          <button
            type="submit"
            disabled={photos.length < 1}
            className={`w-full py-4 rounded-xl font-semibold transition-all ${
              photos.length >= 1
                ? "bg-[#16A085] hover:bg-[#138D75] text-white"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            {photos.length < 1
              ? language === "en"
                ? "Add at least 1 photo"
                : "Agrega al menos 1 foto"
              : t("Publicar Producto")}
          </button>
        </form>
      </div>
    </div>
  );
}
