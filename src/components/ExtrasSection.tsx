import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Headphones, Keyboard, Lightbulb, SlidersHorizontal } from 'lucide-react';

const extras = [
  {
    icon: SlidersHorizontal,
    name: 'Elgato Stream Deck + Audio Mixer',
    description: 'Control total de tu streaming y productividad con teclas programables y mezclador de audio integrado.',
    tag: 'Productividad',
  },
  {
    icon: Headphones,
    name: 'Audeze LCD-X / NOX Voice One',
    description: 'Auriculares de referencia profesional para producción musical o auriculares Bluetooth para el día a día.',
    tag: 'Audio',
  },
  {
    icon: Lightbulb,
    name: 'Elgato 4K PRO Webcam',
    description: 'Cámara profesional 4K para streaming, videollamadas y grabación de contenido de máxima calidad.',
    tag: 'Streaming',
  },
  {
    icon: Keyboard,
    name: 'BEACN Mix Create',
    description: 'Controlador de audio profesional con mezcla en tiempo real para streamers y productores musicales.',
    tag: 'Control',
  },
];

const ExtrasSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-forge-gold mb-4 font-medium">
            Adicionales
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-display">
            Lleva tu setup{' '}
            <span className="text-gradient-gold">al siguiente nivel</span>
          </h2>
          <p className="forge-subheading mx-auto">
            Complementos premium que elevan tu experiencia de uso a otro nivel.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {extras.map((extra, i) => {
            const Icon = extra.icon;
            return (
              <motion.div
                key={extra.name}
                className="glass rounded-xl sm:rounded-2xl p-5 sm:p-8 group hover:glow-gold transition-all duration-500 cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon size={22} className="text-primary sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-foreground font-display break-words">{extra.name}</h3>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {extra.tag}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {extra.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <button className="btn-forge-outline">
            Añadir extras al setup
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExtrasSection;
