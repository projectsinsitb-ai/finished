import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
];

const FooterSection = () => {
  return (
    <footer className="relative py-20 px-6 border-t border-border/50">
      <div className="absolute inset-0 opacity-30" style={{ background: 'var(--gradient-hero)' }} />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Logo */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold font-display mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-gradient-gold">Forge</span>{' '}
          <span className="text-foreground font-light">Custom</span>
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Forjamos tecnología que evoluciona contigo
        </motion.p>

        {/* Social Icons */}
        <motion.div
          className="flex justify-center gap-4 mb-10"
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
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-gold transition-all duration-300"
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

        <p className="text-sm text-muted-foreground">
          © 2026 Forge Custom. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
