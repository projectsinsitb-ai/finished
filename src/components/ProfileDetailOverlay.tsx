import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { MariaDetailScene, DiegoDetailScene, CristinaDetailScene, MarcellDetailScene } from './ProfileDetailScenes';

type ProfileId = 'maria' | 'diego' | 'cristina' | 'marcell';

interface ProfileComponent {
  name: string;
  benefit: string;
}

const profileData: Record<ProfileId, { title: string; subtitle: string; accentColor: string; components: ProfileComponent[] }> = {
  maria: {
    title: 'María',
    subtitle: 'Workstation Compacta',
    accentColor: '#d4a24e',
    components: [
      { name: 'AMD Ryzen 5 3400G', benefit: 'Eficiencia diaria estable' },
      { name: '8GB DDR4', benefit: 'Multitarea sin problemas' },
      { name: 'SSD M.2 PCIe Gen3', benefit: 'Arranque en segundos' },
      { name: 'Placa Base', benefit: 'Conectividad completa' },
      { name: '500W Bronze', benefit: 'Energía fiable' },
      { name: 'Tacens Anima', benefit: 'Compacta y silenciosa' },
      { name: 'Creative Live CAM', benefit: 'Videollamadas HD nítidas' },
      { name: 'PcCom Essential', benefit: 'Comodidad al teclear' },
      { name: 'Monitor PEAQ', benefit: 'Visión clara y amplia' },
    ],
  },
  diego: {
    title: 'Diego',
    subtitle: 'Edición & Streaming Pro',
    accentColor: '#3b82f6',
    components: [
      { name: 'AMD Ryzen 9 9950X3D', benefit: 'Potencia extrema multinúcleo' },
      { name: 'MSI GeForce RTX 5080', benefit: 'Renderizado ultra rápido' },
      { name: 'Crucial DDR5', benefit: 'Velocidad sin precedentes' },
      { name: 'Lexar NM790 2TB', benefit: 'Almacenamiento masivo veloz' },
      { name: 'Forgeon Solum Liquid', benefit: 'Refrigeración silenciosa total' },
      { name: 'CYBERCORE II 304W', benefit: 'Potencia certificada' },
      { name: 'H5 Flow', benefit: 'Flujo de aire optimizado' },
      { name: 'LG Smart OLED', benefit: 'Colores perfectos reales' },
      { name: 'Elgato Stream Deck', benefit: 'Control total streaming' },
      { name: 'Iluminación RGB', benefit: 'Ambiente gaming inmersivo' },
      { name: 'Audio Profesional', benefit: 'Sonido cristalino siempre' },
    ],
  },
  cristina: {
    title: 'Cristina',
    subtitle: 'MacBook Air M4',
    accentColor: '#c0c0c8',
    components: [
      { name: 'Ultraligero', benefit: 'Llévalo a todas partes' },
      { name: 'Autonomía todo el día', benefit: 'Sin cables, sin límites' },
      { name: 'Chip Apple M4', benefit: 'Rendimiento silencioso' },
      { name: 'Pantalla Retina', benefit: 'Cada detalle importa' },
      { name: 'Silencioso', benefit: 'Sin ventiladores, sin ruido' },
      { name: 'Diseño premium', benefit: 'Elegancia que inspira' },
    ],
  },
  marcell: {
    title: 'Marcell',
    subtitle: 'Estudio Musical Pro',
    accentColor: '#a855f7',
    components: [
      { name: 'AMD Ryzen 5 9600X', benefit: 'Procesamiento en tiempo real' },
      { name: 'Kingston FURY 32GB', benefit: 'Samples sin latencia' },
      { name: 'SSD 980 PRO 1TB', benefit: 'Proyectos instantáneos' },
      { name: 'RME HDSPe AIO Pro', benefit: 'Audio profesional puro' },
      { name: 'Monitores de Estudio', benefit: 'Escucha la verdad' },
      { name: 'Audeze LCD-X', benefit: 'Referencia auditiva total' },
      { name: 'BEACN Mix Create', benefit: 'Control de mezcla preciso' },
      { name: 'Tempest Pulse', benefit: 'Tu centro de control' },
    ],
  },
};

const SceneComponent = ({ profileId, activeIndex }: { profileId: ProfileId; activeIndex: number }) => {
  switch (profileId) {
    case 'maria': return <MariaDetailScene activeIndex={activeIndex} />;
    case 'diego': return <DiegoDetailScene activeIndex={activeIndex} />;
    case 'cristina': return <CristinaDetailScene activeIndex={activeIndex} />;
    case 'marcell': return <MarcellDetailScene activeIndex={activeIndex} />;
  }
};

interface Props {
  profileId: ProfileId | null;
  onClose: () => void;
}

const ProfileDetailOverlay = ({ profileId, onClose }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const profile = profileId ? profileData[profileId] : null;

  useEffect(() => {
    setActiveIndex(0);
  }, [profileId]);

  useEffect(() => {
    if (profileId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [profileId]);

  const handleNext = useCallback(() => {
    if (profile) setActiveIndex((i) => Math.min(i + 1, profile.components.length - 1));
  }, [profile]);

  const handlePrev = useCallback(() => {
    setActiveIndex((i) => Math.max(i - 1, 0));
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, handleNext, handlePrev]);

  return (
    <AnimatePresence>
      {profileId && profile && (
        <motion.div
          className="fixed inset-0 z-[100] flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/98 backdrop-blur-xl" />

          {/* Close */}
          <motion.button
            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            onClick={onClose}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.1 }}
          >
            <X size={20} />
          </motion.button>

          {/* Header */}
          <motion.div
            className="absolute top-6 left-6 z-50"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">{profile.title}</h2>
            <p className="text-sm mt-1" style={{ color: profile.accentColor }}>{profile.subtitle}</p>
          </motion.div>

          {/* 3D Scene */}
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <SceneComponent profileId={profileId} activeIndex={activeIndex} />
          </motion.div>

          {/* Component Info Card */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="glass-strong rounded-2xl p-6">
              {/* Progress */}
              <div className="flex gap-1 mb-4">
                {profile.components.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className="flex-1 h-1 rounded-full transition-all duration-500 cursor-pointer"
                    style={{
                      backgroundColor: i <= activeIndex ? profile.accentColor : 'hsl(var(--muted))',
                      opacity: i === activeIndex ? 1 : i < activeIndex ? 0.5 : 0.2,
                    }}
                  />
                ))}
              </div>

              {/* Active component */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <h3 className="text-xl font-bold text-foreground font-display">
                    {profile.components[activeIndex].name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {profile.components[activeIndex].benefit}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Nav buttons */}
              <div className="flex justify-between mt-5">
                <button
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-20 transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-xs text-muted-foreground self-center tracking-widest">
                  {activeIndex + 1} / {profile.components.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={activeIndex === profile.components.length - 1}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-20 transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Side component list */}
          <motion.div
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {profile.components.map((comp, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`text-right text-xs px-3 py-2 rounded-lg transition-all duration-300 ${
                  i === activeIndex
                    ? 'glass-strong text-foreground'
                    : 'text-muted-foreground/50 hover:text-muted-foreground'
                }`}
                style={i === activeIndex ? { borderRight: `2px solid ${profile.accentColor}` } : undefined}
              >
                {comp.name}
              </button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileDetailOverlay;
