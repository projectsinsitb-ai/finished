import { motion } from 'framer-motion';
import { HeroScene } from './Scene3D';
import heroBg from '@/assets/hero-bg.jpg';
import logo from '@/assets/logo.png';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'var(--gradient-hero)' }} />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-background via-transparent to-background/80" />

      {/* 3D Scene */}
      <div className="absolute inset-0 z-[2] opacity-60">
        <HeroScene />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="text-sm md:text-base tracking-[0.3em] uppercase text-forge-gold mb-6 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Tecnología forjada para durar
          </motion.p>

          <img src={logo} alt="Forge Custom" className="h-24 md:h-32 w-auto mx-auto mb-6" />

          <motion.p
            className="forge-subheading mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Ordenadores y setups personalizados, diseñados con la precisión de un artesano
            y la potencia de la tecnología más avanzada.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <a href="#profiles" className="btn-forge">
              Explorar configuraciones
            </a>
            <a href="#concept" className="btn-forge-outline">
              Nuestro concepto
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-forge-gold"
            animate={{ y: [0, 16, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
