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
    subtitle: 'Dependienta · 436€',
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
    subtitle: 'Editor de Vídeo · 4.744€',
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
        name: 'Elgato Stream Deck + Audio Mixer',
        benefit: 'Control total del streaming y mezcla de audio integrada para tu estudio de edición.',
        imageUrl: '/Diego/Adicionales/Elgato_Stream_Deck_Audio_Mixer.webp',
        price: '183,20€'
      },
      {
        name: 'Elgato 4K PRO',
        benefit: 'Webcam 4K profesional para streaming, videollamadas y grabación con la máxima calidad.',
        imageUrl: '/Diego/Adicionales/Elgato_4K_PRO.jpg',
        price: '294,99€'
      },
      {
        name: 'Quntis 45cm Lámpara Monitor Curvo',
        benefit: 'Iluminación uniforme para reducir fatiga visual en largas sesiones de edición.',
        imageUrl: '/Diego/Adicionales/Quntis_45cm_Lampara_Monitor_Curvo.webp',
        price: '74,99€'
      },
      {
        name: 'RØDE NTH-100 Auriculares Over-Ear',
        benefit: 'Auriculares de estudio para monitoreo fiel y edición de audio en tus proyectos.',
        imageUrl: '/Diego/Adicionales/R%C3%98DE%20NTH-100%20Auriculares%20Over-Ear%20Profesionales..jfif',
        price: '120,00€'
      },
      {
        name: 'Logitech MX Master 4',
        benefit: 'Ratón ergonómico inalámbrico para productividad y edición con botones programables y scroll de precisión.',
        imageUrl: '/Diego/Adicionales/Logitech_MX_Master_4.webp',
        price: '129,90€'
      },
      {
        name: 'Razer Viper V3 HyperSpeed',
        benefit: 'Ratón gaming ultraligero para reacción rápida en gaming y edición con sensor de alta precisión.',
        imageUrl: '/Diego/Adicionales/Razer%20Viper%20V3%20HyperSpeed.webp',
        price: '80,00€'
      }
    ],
  },
  cristina: {
    title: 'Cristina',
    subtitle: 'Entorno Inmobiliario · 978€',
    accentColor: '#a855f7',
    bgGradient: 'radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.15) 0%, transparent 60%)',
    components: [
      {
        name: 'Macbook Air M4',
        benefit: 'Tan fino y ligero que olvidarás que lo llevas en el bolso. Presenta las mejores propiedades a clientes.',
        imageUrl: '/Cristina/Macbook_Air_M4.webp',
        price: '959,01€'
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
    subtitle: 'Productor Musical · 1.000€',
    accentColor: '#E54D2E',
    bgGradient: 'radial-gradient(ellipse at 50% 50%, rgba(229,77,46,0.25) 0%, rgba(18,18,20,0.95) 50%, transparent 70%)',
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
        price: '1.244,00€'
      },
      {
        name: 'Logitech MX Master 4',
        benefit: 'Ratón ergonómico para productividad y control preciso en sesiones largas de producción.',
        imageUrl: '/Marcel/aditionals/Logitech_MX_Master_4.webp',
        price: '129,90€'
      },
      {
        name: 'BEACN Mix Create',
        benefit: 'Mezclador de audio físico para streamers y productores con control en tiempo real.',
        imageUrl: '/Marcel/aditionals/BEACN_Mix_Create.jfif',
        price: '241,00€'
      },
      {
        name: 'RME HDSPe AIO Pro',
        benefit: 'Tarjeta de sonido profesional de referencia para grabación y mezcla de bajo latency.',
        imageUrl: '/Marcel/aditionals/RME_HDSPe_AIO_Pro.jpg',
        price: '719,00€'
      },
      {
        name: 'MX Mechanical Mini',
        benefit: 'Teclado compacto mecánico para el estudio con teclas programables y conexión flexible.',
        imageUrl: '/Marcel/aditionals/MX_Mechanical_Mini.webp',
        price: '159,90€'
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
        className="fixed inset-0 z-[100] flex flex-col pt-4 sm:pt-6 md:pt-10 safe-area-inset"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Dark backdrop */}
        <div className="absolute inset-0 bg-background/98 backdrop-blur-3xl transition-colors duration-700" style={{ background: profile.bgGradient }} />
        <div className="absolute inset-0 bg-black/60" />

        {/* Header bar */}
        <div className="relative z-50 flex items-center justify-between px-4 sm:px-6 md:px-14 shrink-0 pb-3 sm:pb-4">
          <div className="min-w-0 pr-2">
            <p className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-0.5 sm:mb-1 font-semibold truncate" style={{ color: profile.accentColor }}>
              PERFIL / {profile.title.toUpperCase()}
            </p>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold font-display text-foreground truncate">
              {profile.subtitle}
            </h2>
          </div>
          <button
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex flex-shrink-0 items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 touch-manipulation"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* ── Scrollable Body Area ── */}
        <div className="relative flex-1 overflow-y-auto w-full custom-scrollbar flex flex-col">

          {/* Main Feature Area (Image & Info side by side) */}
          <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-14 px-4 sm:px-6 md:px-14 py-4 sm:py-6 md:py-10">

            {/* Left: Huge Product Image */}
            <div className="relative w-full lg:w-[50%] flex justify-center items-center min-h-[28vh] sm:min-h-[35vh] lg:min-h-[50vh]">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeIndex}
                  className="relative flex items-center justify-center w-full h-full"
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)', y: 40 }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                  exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)', y: -40 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <img
                    src={profile.components[activeIndex].imageUrl}
                    alt={profile.components[activeIndex].name}
                    className="max-w-full max-h-[45vh] sm:max-h-[55vh] lg:max-h-[60vh] object-contain rounded-xl sm:rounded-2xl md:rounded-[2rem] hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-1"
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
                  initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                  transition={{ type: "spring", stiffness: 250, damping: 25 }}
                  className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 relative overflow-hidden hover:shadow-2xl transition-shadow duration-500 group"
                  style={{ border: `1px solid ${profile.accentColor}40`, boxShadow: `0 10px 40px -10px ${profile.accentColor}20` }}
                >
                  {/* Decorative internal glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 blur-[60px] rounded-full opacity-20 pointer-events-none" style={{ backgroundColor: profile.accentColor }} />

                  <h3 className="text-xl sm:text-3xl md:text-5xl font-bold text-foreground font-display leading-[1.1] mb-4 sm:mb-6 break-words">
                    {profile.components[activeIndex].name}
                  </h3>

                  <p className="text-sm sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-light mb-6 sm:mb-10">
                    {profile.components[activeIndex].benefit}
                  </p>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-auto">
                    {profile.components[activeIndex].price && (
                      <div className="flex flex-col">
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mb-0.5 sm:mb-1">Precio</span>
                        <span className="text-2xl sm:text-3xl font-bold font-display" style={{ color: profile.accentColor }}>
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
          <div className="w-full max-w-[1600px] mx-auto mt-auto shrink-0 pb-8 sm:pb-12 pt-4 sm:pt-6 px-4 sm:px-6 md:px-14">
            <div className="flex items-center gap-3 sm:gap-6 mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] font-semibold text-muted-foreground uppercase whitespace-nowrap">
                Componentes ({profile.components.length})
              </span>
              <div className="h-px bg-border flex-1 min-w-0" />
            </div>

            <div className="flex overflow-x-auto gap-3 sm:gap-4 pb-4 snap-x snap-mandatory custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              {profile.components.map((comp, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className="group relative shrink-0 snap-start text-left flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl transition-all duration-300 overflow-hidden touch-manipulation hover:-translate-y-1 hover:shadow-lg active:scale-95"
                    style={{
                      width: 'min(280px, 85vw)',
                      padding: '10px 12px',
                      backgroundColor: isActive ? 'hsl(var(--card))' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${isActive ? profile.accentColor : 'rgba(255,255,255,0.1)'}`,
                      boxShadow: isActive ? `0 8px 30px -5px ${profile.accentColor}40` : 'none',
                    }}
                  >
                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden shrink-0 bg-black/50 border border-white/5 group-hover:border-white/20 transition-all">
                      <img src={comp.imageUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="" />
                    </div>
                    <div className="flex flex-col min-w-0 pr-1 sm:pr-2 flex-1">
                      <span className="text-sm sm:text-base font-bold text-foreground truncate">{comp.name}</span>
                      <span className="text-[10px] sm:text-xs font-medium text-muted-foreground/80 truncate overflow-hidden text-ellipsis mt-0.5 sm:mt-1 line-clamp-2 sm:line-clamp-none">
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
