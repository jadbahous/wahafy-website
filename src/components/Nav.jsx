import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { nav } from '../data.js';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ink/85 backdrop-blur-md border-b border-line' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="section-wrap flex items-center justify-between h-[72px]">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-8 h-8 rounded-md bg-gold text-ink font-display font-bold text-sm">
            W
          </span>
          <span className="font-display font-semibold text-white text-[17px] tracking-tight">
            Wahafy
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[14.5px] text-white/70 hover:text-white transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="inline-flex items-center rounded-full bg-white text-ink text-[14px] font-medium px-5 py-2.5 hover:bg-gold transition-colors duration-200"
        >
          Get started
        </a>
      </div>
    </motion.header>
  );
}
