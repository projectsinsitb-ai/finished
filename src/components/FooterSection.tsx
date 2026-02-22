import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube, Linkedin, Anvil } from 'lucide-react';

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
];

const FooterSection = () => {
  return (
    <footer className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-border/50">
      <div className="absolute inset-0 opacity-30" style={{ background: 'var(--gradient-hero)' }} />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="animate-spin-slow-y">
              <Anvil size={28} strokeWidth={1.5} className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)] sm:w-9 sm:h-9 md:w-[36px] md:h-[36px]" />
            </div>
            <h2 className="text-lg sm:text-2xl md:text-3xl tracking-[0.25em] sm:tracking-[0.4em] font-light text-white text-center break-words ml-0 sm:ml-[0.4em] px-2">
              FORGE CUSTOM
            </h2>
          </div>
        </motion.div>

        <motion.p
          className="text-muted-foreground text-base sm:text-lg mb-8 sm:mb-10 max-w-lg mx-auto px-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Forjamos tecnología que evoluciona contigo
        </motion.p>

        {/* Social Icons */}
        <motion.div
          className="flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-gold transition-all duration-300 shrink-0"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <Icon size={20} />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Divider */}
        <div className="w-16 h-px bg-border mx-auto mb-6" />

        <p className="text-xs sm:text-sm text-muted-foreground px-2">
          © 2026 Forge Custom. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
