import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import macbookImg from '@/assets/macbook_air.png';
import audSystemImg from '@/assets/audeze_headphones.png';
import elgatoImg from '@/assets/elgato_streamdeck.png';

const experiences = [
  {
    image: '/Diego/MSI_GeForce_RTX_5080.png',
    title: 'GeForce RTX 5080 Founders Edition',
    subtitle: 'Renderizado sin límites',
    tag: 'GPU Premium',
    tagColor: '#3b82f6',
    link: 'https://www.nvidia.com/es-es/geforce/graphics-cards/50-series/rtx-5080/',
  },
  {
    image: macbookImg,
    title: 'MacBook Air M4',
    subtitle: 'Ligereza y potencia',
    tag: 'Entorno móvil',
    tagColor: '#c0c0c8',
    link: 'https://www.apple.com/es/shop/xc/product/mba-2025-roc-13-sky-blue-g?option.keyboard=E065-CJWP&option.inputs=065-CH7F&option.thunderbolt=065-CH7D&option.software_final=065-CH9Q&option.retina_display=065-CH7G&option.power_adapter=065-CH63&option.mouse_and_track_pad=065-CH7C&option.software_logic=065-CH9V&option.memory=065-CH5V&option.storage=065-CH5Y&option.countrykit=Y065-CJWQ&option.processor=065-CH5Q',
  },
  {
    image: elgatoImg,
    title: 'Elgato Stream Deck +',
    subtitle: 'Control total del streaming',
    tag: 'Productividad',
    tagColor: '#d4a24e',
    link: 'https://www.elgato.com/es/es/p/stream-deck-plus',
  },
  {
    image: audSystemImg,
    title: 'Audeze LCD-X',
    subtitle: 'Referencia de audio profesional',
    tag: 'Audio pro',
    tagColor: '#a855f7',
    link: 'https://www.audeze.com/products/lcd-x',
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-forge-gold mb-4 font-medium">
            Productos reales
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-display">
            Hardware{' '}
            <span className="text-gradient-gold">de élite</span>
          </h2>
          <p className="forge-subheading mx-auto">
            Componentes seleccionados a mano. Calidad premium en cada setup que forjamos.
          </p>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8" style={{ y }}>
          {experiences.map((exp, i) => (
            <motion.a
              key={exp.title}
              href={exp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer block"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="h-52 sm:h-64 md:h-72 relative bg-black/40 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent pointer-events-none" />
                <div
                  className="absolute top-4 right-4 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: `${exp.tagColor}25`, color: exp.tagColor, border: `1px solid ${exp.tagColor}40` }}
                >
                  {exp.tag}
                </div>
              </div>
              <div className="p-4 sm:p-6 relative">
                <h3 className="text-lg sm:text-xl font-bold text-foreground font-display">{exp.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{exp.subtitle}</p>
                <div className="mt-3 text-xs text-primary font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                  Ver especificaciones →
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
