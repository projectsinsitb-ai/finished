import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Anvil } from 'lucide-react';

const ConceptSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="concept" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 3D Anvil */}
          <motion.div
            className="h-[400px] lg:h-[500px] order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full h-full min-h-[300px] flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full" />
                <Anvil size={200} strokeWidth={1} className="text-cyan-400 relative z-10 drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]" />
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm tracking-[0.3em] uppercase text-cyan-400 mb-4 font-medium">
              Nuestro concepto
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight font-display">
              Firme. Resistente.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Eterno.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Nuestro logo representa un yunque: la herramienta del artesano que transforma
              el metal en bruto en obras maestras. Así es como creamos cada setup — con precisión,
              fuerza y atención al detalle.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Cada componente es seleccionado, cada cable organizado, cada configuración
              optimizada. No vendemos ordenadores. Forjamos herramientas que evolucionan contigo.
            </p>

            <div className="grid grid-cols-3 gap-6">
              {[
                { value: '100%', label: 'Personalizado' },
                { value: '3 años', label: 'Garantía' },
                { value: '3 Años', label: 'Soporte' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-display">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConceptSection;
