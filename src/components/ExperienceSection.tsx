import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ProductScene } from './Scene3D';

const experiences = [
  { type: 'desktop' as const, title: 'Workstation', subtitle: 'Potencia compacta' },
  { type: 'monitor' as const, title: 'Ultrawide', subtitle: 'Visión total' },
  { type: 'laptop' as const, title: 'MacBook Air', subtitle: 'Ligereza premium' },
  { type: 'speaker' as const, title: 'Studio Monitor', subtitle: 'Audio perfecto' },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

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
            Experiencia 3D
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-display">
            Explora cada{' '}
            <span className="text-gradient-gold">detalle</span>
          </h2>
          <p className="forge-subheading mx-auto">
            Interactúa con nuestros productos en 3D. Gira, observa y descubre la calidad
            de cada componente.
          </p>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-8" style={{ y }}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.type}
              className="glass rounded-2xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="h-64 md:h-72 relative">
                <ProductScene type={exp.type} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-6 relative">
                <h3 className="text-xl font-bold text-foreground font-display">{exp.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{exp.subtitle}</p>
                <div className="mt-3 text-xs text-primary font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Arrastra para rotar →
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
