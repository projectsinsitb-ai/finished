import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ProductScene } from './Scene3D';
import { Monitor, Cpu, Laptop, Music } from 'lucide-react';
import ProfileDetailOverlay from './ProfileDetailOverlay';

const profiles = [
  {
    id: 'maria',
    name: 'María',
    role: 'Dependienta',
    icon: Monitor,
    color: 'from-amber-500/20 to-amber-600/5',
    accentColor: '#d4a24e',
    description: 'Setup compacto y eficiente para el día a día. Contabilidad, stock, videollamadas y ofimática sin complicaciones.',
    sceneType: 'desktop' as const,
    features: ['AMD Ryzen 5 3400G', 'Radeon RX Vega 11', '8GB DDR4', 'SSD M.2 PCIe Gen3', 'Monitor PEAQ', 'Tacens Anima'],
    tagline: 'Simple. Eficiente. Fiable.',
  },
  {
    id: 'diego',
    name: 'Diego',
    role: 'Editor & Streamer',
    icon: Cpu,
    color: 'from-blue-500/20 to-blue-600/5',
    accentColor: '#3b82f6',
    description: 'Potencia bruta para edición profesional y streaming. Refrigeración líquida, componentes premium y rendimiento extremo.',
    sceneType: 'monitor' as const,
    features: ['AMD Ryzen 9 9950X3D', 'MSI GeForce RTX 5080', 'Crucial DDR5', 'Lexar NM790 2TB', 'LG Smart OLED', 'Forgeon Solum Liquid'],
    tagline: 'Ultra potente. Sin límites.',
  },
  {
    id: 'cristina',
    name: 'Cristina',
    role: 'Entorno inmobiliario',
    icon: Laptop,
    color: 'from-gray-300/20 to-gray-400/5',
    accentColor: '#c0c0c8',
    description: 'Elegancia y movilidad para el mundo profesional. Ecosistema Apple completo con la ligereza del MacBook Air.',
    sceneType: 'laptop' as const,
    features: ['MacBook Air M4 8-Core', '16GB Unificada', '256GB SSD', 'Cámara 12MP', 'Display XDR'],
    tagline: 'Ligero. Elegante. Apple.',
  },
  {
    id: 'marcell',
    name: 'Marcell',
    role: 'Productor musical',
    icon: Music,
    color: 'from-purple-500/20 to-purple-600/5',
    accentColor: '#a855f7',
    description: 'Estudio profesional optimizado para producción musical. Audio de alta fidelidad, monitorización precisa y control total.',
    sceneType: 'speaker' as const,
    features: ['AMD Ryzen 5 9600X', 'RTX 3050 LP', 'Kingston FURY 32GB', 'SSD 980 PRO 1TB', 'Audeze LCD-X', 'RME HDSPe AIO Pro'],
    tagline: 'Tu sonido. Tu estudio.',
  },
];

const ProfileCard = ({ profile, index, onSelect }: { profile: typeof profiles[0]; index: number; onSelect: (id: string) => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = profile.icon;

  return (
    <motion.div
      ref={ref}
      className="card-profile group cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(profile.id)}
    >
      {/* Gradient accent */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${profile.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative z-10">
        {/* 3D Preview */}
        <div className="h-48 md:h-56 mb-6 rounded-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80 z-10 pointer-events-none" />
          <ProductScene type={profile.sceneType} />
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${profile.accentColor}20` }}
          >
            <Icon size={20} style={{ color: profile.accentColor }} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground font-display">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">{profile.role}</p>
          </div>
        </div>

        {/* Tagline */}
        <p
          className="text-sm font-semibold mb-3 tracking-wide"
          style={{ color: profile.accentColor }}
        >
          {profile.tagline}
        </p>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          {profile.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {profile.features.map((feat) => (
            <span
              key={feat}
              className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground"
            >
              {feat}
            </span>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-6 overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={isHovered ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            className="w-full py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300"
            style={{
              background: `${profile.accentColor}15`,
              color: profile.accentColor,
              border: `1px solid ${profile.accentColor}40`,
            }}
          >
            Ver configuración completa →
          </button>
        </motion.div>
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
            <p className="text-sm tracking-[0.3em] uppercase text-forge-gold mb-4 font-medium">
              Perfiles de cliente
            </p>
            <h2 className="forge-heading text-foreground mb-6 font-display">
              Tu setup,{' '}
              <span className="text-gradient-gold">tu estilo</span>
            </h2>
            <p className="forge-subheading mx-auto">
              Cada persona es única. Por eso cada configuración que creamos está diseñada
              a medida, pensada para ti y tu forma de trabajar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
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
