import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { X, ExternalLink } from 'lucide-react';

type ProfileId = 'maria' | 'diego' | 'cristina' | 'marcel';

interface ProfileComponent {
  name: string;
  benefit: string;
  imageUrl: string;
  price?: string;
  officialLink?: string;
}

const profileData: Record<ProfileId, {
  title: string;
  subtitle: string;
  accentColor: string;
  bgGradient: string;
  components: ProfileComponent[];
}> = {
  maria: {
    title: 'María',
    subtitle: 'Dependienta · $436',
    accentColor: '#0891b2',
    bgGradient: 'radial-gradient(ellipse at 50% 50%, rgba(8,145,178,0.15) 0%, transparent 60%)',
    components: [
      {
        name: 'AMD Ryzen 5 3400G',
        benefit: 'Procesador eficiente para tareas básicas y manejo fluido de sistemas punto de venta.',
        imageUrl: '/maria/AMD%20Ryzen%205%203400G.jpg',
        price: '67,95€'
      },
      {
        name: 'Radeon RX Vega 11',
        benefit: 'Gráficos integrados de gran fiabilidad para el manejo de interfaces y ofimática general.',
        imageUrl: '/maria/AMD%20Ryzen%205%203400G.jpg',
      },
      {
        name: '8GB DDR4 3200MHz',
        benefit: 'Navega con múltiples ventanas, software de inventario y correo electrónico de forma ininterrumpida.',
        imageUrl: '/maria/Ram.webp',
        price: '69,95€'
      },
      {
        name: 'SSD M.2 PCIe Gen3x4',
        benefit: 'Arranque en segundos. Tu sistema operativo y programas locales cargarán al instante.',
        imageUrl: '/maria/ssd.jpg',
        price: '60,98€'
      },
      {
        name: 'PEAQ PMO S225-VFC (Monitor FHD)',
        benefit: 'Colores nítidos y tamaño perfecto. No ocupa apenas espacio en el pequeño mostrador.',
        imageUrl: '/maria/Monitor%20Screen.jpg',
        price: '59,00€'
      },
      {
        name: 'Creative Live CAM Sync',
        benefit: 'Cámara para videollamadas con proveedores y soporte técnico.',
        imageUrl: '/maria/Webcam.jpg',
        price: '19,80€'
      },
      {
        name: 'Teclado y Ratón PcCom Essential K20/M20',
        benefit: 'Periféricos económicos y fiables, ideales para teclear precios y moverse en el escritorio.',
        imageUrl: '/maria/keyboard.webp',
        price: '12,98€'
      },
      {
        name: 'Tacens Anima AC4',
        benefit: 'Diseño sobrio, formato mini perfecto para tiendas con espacios reducidos.',
        imageUrl: '/maria/Torre.webp',
        price: '22,91€'
      },
      {
        name: 'Fuente 500W Bronze & Refrig. Arctic',
        benefit: 'Alimentación eficiente y estable para garantizar durabilidad sin fallos térmicos.',
        imageUrl: '/maria/Fuente%20de%20poder.jpg',
        price: '37,89€'
      },
      {
        name: 'Adicional: HP DeskJet 4320 & Auriculares NOX',
        benefit: 'Impresora para recibos e informes y auriculares para llamadas privadas en la tienda.',
        imageUrl: '/maria/Aditional_printer.jpg',
        price: '62,90€'
      }
    ],
  },
  diego: {
    title: 'Diego',
    subtitle: 'Editor de Vídeo · $4,744',
    accentColor: '#3b82f6',
    bgGradient: 'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 60%)',
    components: [
      {
        name: 'GeForce RTX 5080',
        benefit: 'Gráficos ultra fluidos y un margen sin igual para renderización extrema en resoluciones 4K.',
        imageUrl: '/Diego/MSI_GeForce_RTX_5080.png',
        price: '806,67€'
      },
      {
        name: 'AMD Ryzen 9 9950X3D 4.3/5.7GHz',
        benefit: 'Renderiza entornos 3D o exporta timelines completos en minutos con tecnología 3D V-Cache.',
        imageUrl: '/Diego/AMD_Ryzen_9_9950X3D.webp',
        price: '649,88€'
      },
      {
        name: 'Crucial DDR5 Pro',
        benefit: 'Infinita capacidad multitarea para cargar múltiples capas y efectos sin ralentizar tu software de edición.',
        imageUrl: '/Diego/Crucial_DDR5_Pro.png',
        price: '637,10€'
      },
      {
        name: 'Lexar NM790 M.2 SSD 2TB',
        benefit: 'Respuesta veloz para guardar inmensos archivos de vídeo en bruto sin esperas.',
        imageUrl: '/Diego/Lexar_NM790_SSD_Interno_2TB.webp',
        price: '259,95€'
      },
      {
        name: 'Monitor Gaming Smart OLED LG',
        benefit: 'Inmersión absoluta. Negros puros y colores reales necesarios para una fiel graduación de color.',
        imageUrl: '/Diego/Monitor_Gaming_Smart_OLED_LG.jpeg',
        price: '922,85€'
      },
      {
        name: 'H5 Flow & Forgeon Solum Líquida 360',
        benefit: 'Flujo de aire optimizado para largas sesiones de renderizado manteniendo las temperaturas bajo control.',
        imageUrl: '/Diego/H5_Flow.webp',
        price: '170,10€'
      },
      {
        name: 'Teclado K980 & Raton Logitech/Razer',
        benefit: 'Eficiencia de atajos macro con periféricos inalámbricos rápidos para agilizar los cortes de edición.',
        imageUrl: '/Diego/Signature_Slim_Solar_wireless_keyboard_K980.webp',
        price: '319,89€'
      },
      {
        name: 'Adicionales Editor (Dentro ppto)',
        benefit: 'Elgato 4K PRO, Stream Deck+, y extras profesionales para optimización del estudio de edición.',
        imageUrl: '/Diego/Adicionales/Elgato_Stream_Deck_Audio_Mixer.webp',
        price: '673,18€'
      }
    ],
  },
  cristina: {
    title: 'Cristina',
    subtitle: 'Entorno Inmobiliario · $978',
    accentColor: '#a855f7',
    bgGradient: 'radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.15) 0%, transparent 60%)',
    components: [
      {
        name: 'Macbook Air M4',
        benefit: 'Tan fino y ligero que olvidarás que lo llevas en el bolso. Presenta las mejores propiedades a clientes.',
        imageUrl: '/Cristina/Macbook_Air_M4.webp',
      },
      {
        name: 'Display XDR & 16GB Unificada',
        benefit: 'Colores precisos y brillantes que sacan lo mejor de cada fotografía junto a memoria abundante para planos.',
        imageUrl: '/Cristina/XDR%20Display.webp',
      },
      {
        name: '256GB SSD y GPU Integrada',
        benefit: 'Rendimiento bestial en lectura de datos de carteras de inmuebles gracias a la potente GPU M4.',
        imageUrl: '/Cristina/Eficience.webp',
      },
      {
        name: 'Satechi USB-C Pro Hub',
        benefit: 'Libertad absoluta. Conéctate a proyectores, televisores y transfiere documentos pesados en el acto.',
        imageUrl: '/Cristina/aditional/HUB.webp',
        price: '18,99€',
      },
    ],
  },
  marcel: {
    title: 'Marcel',
    subtitle: 'Productor Musical · $1,000',
    accentColor: '#6366f1',
    bgGradient: 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.15) 0%, transparent 60%)',
    components: [
      {
        name: 'AMD Ryzen 5 9600X',
        benefit: 'El motor del estudio. Mueve software complejo como Ableton, ProTools y plugins exigentes.',
        imageUrl: '/Marcel/AMD_Ryzen_5_9600X.avif',
        price: '194,96€'
      },
      {
        name: 'GeForce RTX™ 3050 LP E 6G OC',
        benefit: 'Aceleración gráfica óptima para monitorización y plugins VST que requieren de GPU rendering sin gastar demás.',
        imageUrl: '/Marcel/GeForce_RTX_3050_LP_E_6G_OC.jfif',
        price: '205,83€'
      },
      {
        name: 'Kingston FURY Beast DDR5 32GB',
        benefit: 'Carga sin memoria de intercambio docenas de librerías Kontakt y samples gigantes en memoria viva.',
        imageUrl: '/Marcel/Kingston_FURY_Beast_RGB_32GB_DDR5.png',
        price: '326,08€'
      },
      {
        name: 'SSD 980 PRO M.2 1TB',
        benefit: 'Transferencias NVMe ridículamente rápidas de buses de audio en alta resolución.',
        imageUrl: '/Marcel/SSD_980_PRO_PCle_4.0_M2_1TB.avif',
        price: '144,99€'
      },
      {
        name: 'Tempest ATX CASE + PSU 650W',
        benefit: 'Caja espaciosa con una fuente fiable de 650W, manteniendo estabilidad sin ruido eléctrico.',
        imageUrl: '/Marcel/Tempest_ATX_CASE_RGB_Umbra.jpg',
        price: '95,56€'
      },
      {
        name: 'Thermalright PS120SE CPU',
        benefit: 'Refrigerador de doble torre pensado para trabajar en el ruido ambiente más ínfimo posible.',
        imageUrl: '/Marcel/Thermalright_PS120SE_CPU.jfif',
        price: '32,58€'
      },
      {
        name: '40" HD/FHD VIDAA TV (Modo Monitor)',
        benefit: 'Inmenso espacio de pantalla a la resolución correcta para visualizar tu timeline entero sin cruzar cables.',
        imageUrl: '/Marcel/aditionals/40_HDFHD_VIDAA_TV.png',
        price: '179,00€'
      },
      {
        name: 'Audeze LCD-X (Adicional extra)',
        benefit: 'Auriculares de referencia absoluta usados por las leyendas globales de mezcla para percibir detalles quirúrgicos.',
        imageUrl: '/Marcel/aditionals/Audeze_LCD-X.jpg',
        price: '~1.244€'
      }
    ],
  },
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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!profile) return;
      if (e.key === 'ArrowRight') setActiveIndex((i) => Math.min(i + 1, profile.components.length - 1));
      if (e.key === 'ArrowLeft') setActiveIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, profile]);

  if (!profileId || !profile) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col pt-6 md:pt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Dark backdrop */}
        <div className="absolute inset-0 bg-background/98 backdrop-blur-3xl" style={{ background: profile.bgGradient }} />
        <div className="absolute inset-0 bg-black/60" />

        {/* Header bar */}
        <div className="relative z-50 flex items-center justify-between px-6 md:px-14 shrink-0 pb-4">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase mb-1 font-semibold" style={{ color: profile.accentColor }}>
              PERFIL / {profile.title.toUpperCase()}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">
              {profile.subtitle}
            </h2>
          </div>
          <button
            className="w-12 h-12 rounded-full glass flex flex-shrink-0 items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        {/* ── Scrollable Body Area ── */}
        <div className="relative flex-1 overflow-y-auto w-full custom-scrollbar flex flex-col">

          {/* Main Feature Area (Image & Info side by side) */}
          <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-14 px-6 md:px-14 py-6 md:py-10">

            {/* Left: Huge Product Image */}
            <div className="relative w-full lg:w-[50%] flex justify-center items-center min-h-[35vh] lg:min-h-[50vh]">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeIndex}
                  className="relative flex items-center justify-center w-full h-full"
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', y: 20 }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <img
                    src={profile.components[activeIndex].imageUrl}
                    alt={profile.components[activeIndex].name}
                    className="max-w-full max-h-[60vh] object-contain rounded-[2rem]"
                    style={{ filter: `drop-shadow(0px 30px 50px ${profile.accentColor}30)` }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Feature Info */}
            <div className="w-full lg:w-[50%] flex flex-col justify-center shrink-0">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
                  style={{ border: `1px solid ${profile.accentColor}40` }}
                >
                  {/* Decorative internal glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full opacity-20 pointer-events-none" style={{ backgroundColor: profile.accentColor }} />

                  <h3 className="text-3xl md:text-5xl font-bold text-foreground font-display leading-[1.1] mb-6">
                    {profile.components[activeIndex].name}
                  </h3>

                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light mb-10">
                    {profile.components[activeIndex].benefit}
                  </p>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-auto">
                    {profile.components[activeIndex].price && (
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Precio</span>
                        <span className="text-3xl font-bold font-display" style={{ color: profile.accentColor }}>
                          {profile.components[activeIndex].price}
                        </span>
                      </div>
                    )}

                    {profile.components[activeIndex].officialLink && (
                      <a
                        href={profile.components[activeIndex].officialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm:ml-auto inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold tracking-wide transition-all shadow-xl hover:scale-105"
                        style={{ backgroundColor: profile.accentColor, color: '#000', filter: `drop-shadow(0 0 15px ${profile.accentColor}40)` }}
                      >
                        Ver web oficial <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Bottom: Horizontal Component Menu ── */}
          <div className="w-full max-w-[1600px] mx-auto mt-auto shrink-0 pb-12 pt-6 px-6 md:px-14">
            <div className="flex items-center gap-6 mb-6">
              <span className="text-sm tracking-[0.2em] font-semibold text-muted-foreground uppercase">
                Lista de componentes ({profile.components.length})
              </span>
              <div className="h-px bg-border flex-1" />
            </div>

            <div className="flex overflow-x-auto gap-4 pb-4 snap-x custom-scrollbar">
              {profile.components.map((comp, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className="group relative shrink-0 snap-start text-left flex items-center gap-4 rounded-2xl transition-all duration-300 overflow-hidden"
                    style={{
                      width: '340px',
                      padding: '12px',
                      backgroundColor: isActive ? 'hsl(var(--card))' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${isActive ? profile.accentColor : 'hsl(var(--border))'}`
                    }}
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-black/50 border border-white/5 group-hover:border-white/20 transition-all">
                      <img src={comp.imageUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="" />
                    </div>
                    <div className="flex flex-col min-w-0 pr-2">
                      <span className="text-base font-bold text-foreground truncate">{comp.name}</span>
                      <span className="text-xs font-medium text-muted-foreground/80 truncate overflow-hidden text-ellipsis mt-1">
                        {comp.benefit}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileDetailOverlay;
