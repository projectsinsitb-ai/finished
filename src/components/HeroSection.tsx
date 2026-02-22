import { motion } from 'framer-motion';
import { Anvil, ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const RayLines = () => {
  const [rays, setRays] = useState<{ id: number; angle: number; length: number; delay: number; duration: number; thickness: number; startDist: number }[]>([]);

  useEffect(() => {
    // Generate rays for the explosion effect
    const newRays = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      angle: Math.random() * 360,
      length: 50 + Math.random() * 250, // length in pixels
      delay: Math.random() * 3,
      duration: 1.5 + Math.random() * 2,
      thickness: 1 + Math.random() * 1.5,
      startDist: 80 + Math.random() * 100 // Distance from center where the ray starts
    }));
    setRays(newRays);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
      <div className="w-[1px] h-[1px] relative">
        {rays.map((ray) => (
          <motion.div
            key={ray.id}
            className="absolute origin-left bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_rgba(34,211,238,0.8)]"
            style={{
              height: ray.thickness,
              width: ray.length,
              rotate: ray.angle,
              left: ray.startDist,
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scaleX: [0, 1, 0],
              x: [0, 300] // particle moves outwards
            }}
            transition={{
              duration: ray.duration,
              delay: ray.delay,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-[#050505] flex items-center justify-center overflow-hidden">

      {/* Deep Space Background / Center Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        {/* Central subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-cyan-900/10 blur-[120px]" />

        {/* Animated Rays */}
        <RayLines />

        {/* Faint subtle shapes to match the image floating cards */}
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-[15%] w-24 h-24 border border-white/5 rounded-3xl backdrop-blur-sm -rotate-12 opacity-50"
        />
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/3 right-[15%] w-32 h-32 border border-white/5 rounded-[2rem] backdrop-blur-sm rotate-12 opacity-40"
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center justify-center h-full px-4 mt-[-5vh]">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center text-center w-full"
        >
          {/* Glowing Anvil Icon above the title */}
          <div className="relative mb-8 flex items-center justify-center">
            {/* Glow behind the anvil */}
            <div className="absolute inset-0 bg-cyan-400/40 blur-[50px] rounded-full scale-150" />
            <Anvil size={70} strokeWidth={1} className="text-cyan-50 relative z-10 drop-shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-medium text-white tracking-[0.25em] ml-[0.25em] font-display whitespace-nowrap">
            FORGE CUSTOM
          </h1>

          <p className="mt-8 text-lg md:text-xl text-gray-400 font-light tracking-wide max-w-xl font-display">
            Tecnología forjada para durar
          </p>

          <div className="mt-16">
            <a href="#profiles" className="group relative inline-flex items-center justify-center px-10 py-4 bg-[#111111] border border-cyan-500/40 rounded-full text-xs font-semibold text-gray-200 tracking-widest transition-all duration-300 hover:border-cyan-400 hover:text-white hover:bg-[#151a25] hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]">
              Explorar configuraciones
              {/* Inner subtle glow ring */}
              <div className="absolute inset-0 rounded-full border border-cyan-400/0 group-hover:border-cyan-400/50 shadow-[inset_0_0_20px_rgba(34,211,238,0)] group-hover:shadow-[inset_0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 pointer-events-none" />
            </a>
          </div>
        </motion.div>

      </div>

      {/* Down arrow at bottom specifically matching the design */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-gray-500" />
        <ArrowDown size={14} className="text-gray-400" />
      </motion.div>

    </section>
  );
};

export default HeroSection;
