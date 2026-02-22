import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Monitor, Cpu, Laptop, Music } from 'lucide-react';
import ProfileDetailOverlay from './ProfileDetailOverlay';

const profiles = [
  {
    id: 'maria',
    name: 'María',
    role: 'Dependienta',
    icon: Monitor,
    color: 'from-cyan-500/20 to-cyan-600/5',
    accentColor: '#0891b2',
    description: 'Primer ordenador para la contabilidad de su tienda de barrio. Gestión de stock en Excel, contacto con proveedores y email. Compacto para su pequeño mostrador.',
    image: '/maria/Torre.webp',
    features: ['AMD Ryzen 5 3400G', 'Radeon RX Vega 11', '8GB RAM DDR4 3200MHz', 'SSD PCIe Gen3x4', 'Monitor 22" FHD', 'Tacens Anima AC4'],
    tagline: 'Simple. Eficiente. Fiable.',
    total: '436$',
    pillText: 'Comercio & Gestión',
    cardTagline: 'Eficiencia en cada transacción',
    bgClass: 'bg-[#FDFAEA]',
    textClass: 'text-gray-900',
    taglineClass: 'text-gray-600',
    pillClass: 'bg-[#FBE9B6] text-[#A67B27]',
    btnClass: 'border border-[#E0B962] text-[#B08632] hover:bg-[#FBE9B6]/60',
    removeImageBackground: true,
  },
  {
    id: 'diego',
    name: 'Diego',
    role: 'Editor',
    icon: Cpu,
    color: 'from-blue-500/20 to-blue-600/5',
    accentColor: '#3b82f6',
    description: 'Editor de vídeo y entusiasta del gaming competitivo. Necesita máximo rendimiento en renderización, fluidez en títulos exigentes y refrigeración de grado entusiasta.',
    image: '/Diego/H5_Flow.webp',
    features: ['AMD Ryzen 9 9950X3D', 'GeForce RTX 5080', 'Crucial DDR5 Pro', 'Lexar NM790 2TB', 'Monitor OLED LG', 'H5 Flow'],
    tagline: 'Ultra potente. Sin límites.',
    total: '4.744$',
    pillText: 'Creación & Streaming',
    cardTagline: 'Potencia sin límites',
    bgClass: 'bg-gradient-to-br from-[#1c0d33] to-[#120a21]',
    textClass: 'text-white',
    taglineClass: 'text-gray-300',
    pillClass: 'bg-[#9853F6] text-white',
    btnClass: 'border border-[#6B32D6] text-[#A26AF7] hover:bg-[#9853F6]/20',
    removeImageBackground: false,
  },
  {
    id: 'cristina',
    name: 'Cristina',
    role: 'Entorno Inmobiliario',
    icon: Laptop,
    color: 'from-purple-500/20 to-purple-600/5',
    accentColor: '#a855f7',
    description: 'Viaja por todo el estado con su equipo. Necesita movilidad total, conectividad con móvil, tablet y monitores externos de oficina. Ligero y potente.',
    image: '/Cristina/Macbook_Air_M4.webp',
    features: ['Macbook Air M4', '16GB RAM Unificada', '256GB SSD', 'Cámara 12MP', 'Display XDR', 'USB-C Hub'],
    tagline: 'Ligero. Elegante. Conectado.',
    total: '978$',
    pillText: 'Movilidad & Elegancia',
    cardTagline: 'Ligereza que inspira',
    bgClass: 'bg-white',
    textClass: 'text-gray-900',
    taglineClass: 'text-gray-500',
    pillClass: 'bg-[#F3F4F6] text-gray-700',
    btnClass: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8]',
    removeImageBackground: true,
  },
  {
    id: 'marcel',
    name: 'Marcell',
    role: 'Productor Musical',
    icon: Music,
    color: 'from-indigo-500/20 to-indigo-600/5',
    accentColor: '#6366f1',
    description: 'Estudio de grabación en Barcelona con artistas internacionales. Renovación completa del hardware y software para grabación de instrumentos y voces, señal analógica y digital.',
    image: '/Marcel/Tempest_ATX_CASE_RGB_Umbra.jpg',
    features: ['AMD Ryzen 5 9600X', 'RTX 3050 LP E 6G OC', 'Kingston FURY 32GB', 'SSD 980 PRO 1TB', 'Tempest ATX CASE', '40" HD/FHD VIDAA TV'],
    tagline: 'Tu sonido. Tu estudio.',
    total: '1.000$',
    pillText: 'Producción & Audio',
    cardTagline: 'Sonido sin compromiso',
    bgClass: 'bg-[#0B0B0C]',
    textClass: 'text-white',
    taglineClass: 'text-[#CFA367]',
    pillClass: 'bg-[#E54D2E] text-white',
    btnClass: 'border border-[#CFA367] text-[#D8A760] hover:bg-[#CFA367]/10',
    removeImageBackground: true,
  },
];

const ProfileCard = ({ profile, index, onSelect }: { profile: typeof profiles[0]; index: number; onSelect: (id: string) => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={`group cursor-pointer rounded-[2rem] overflow-hidden relative shadow-2xl transition-transform duration-500 hover:-translate-y-2 flex flex-col justify-between h-[380px] md:h-[450px] p-8 md:p-10 ${profile.bgClass}`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(profile.id)}
    >
      <div className="z-10 relative flex flex-col h-full pointer-events-none">
        <div>
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide mb-6 ${profile.pillClass}`}>
            {profile.pillText}
          </span>
          <h3 className={`text-5xl md:text-6xl font-bold font-display mb-2 ${profile.textClass}`}>{profile.name}</h3>
          <p className={`text-base md:text-lg font-medium ${profile.taglineClass}`}>{profile.cardTagline}</p>
        </div>

        <div className="mt-auto pointer-events-auto w-max">
          <button
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${profile.btnClass}`}
          >
            Ver configuración
          </button>
        </div>
      </div>

      {/* Product Image positioned at the bottom right — sin fondo en Maria, Cristina, Marcell; Diego con fondo */}
      <div className="absolute bottom-0 right-0 w-3/5 h-3/5 sm:w-1/2 sm:h-1/2 z-0 opacity-90 group-hover:scale-105 transition-transform duration-700 origin-bottom-right">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent z-10" />
        <img
          src={profile.image}
          alt={profile.name}
          className={`w-full h-full object-contain object-bottom md:object-right-bottom drop-shadow-2xl ${profile.removeImageBackground ? (profile.id === 'marcel' ? 'mix-blend-screen' : 'mix-blend-multiply') : ''}`}
          style={{ transform: 'translate(10%, 10%)' }}
        />
      </div>
    </motion.div>
  );
};

const ProfilesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  return (
    <>
      <section id="profiles" className="section-padding relative" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm tracking-[0.3em] uppercase text-cyan-400 mb-4 font-medium">
              Perfiles de cliente
            </p>
            <h2 className="forge-heading text-foreground mb-6 font-display">
              Tu setup,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">tu estilo</span>
            </h2>
            <p className="forge-subheading mx-auto">
              Cada persona es única. Por eso cada configuración que creamos está diseñada
              a medida, pensada para ti y tu forma de trabajar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {profiles.map((profile, i) => (
              <ProfileCard key={profile.id} profile={profile} index={i} onSelect={setSelectedProfile} />
            ))}
          </div>
        </div>
      </section>

      <ProfileDetailOverlay
        profileId={selectedProfile as any}
        onClose={() => setSelectedProfile(null)}
      />
    </>
  );
};

export default ProfilesSection;
