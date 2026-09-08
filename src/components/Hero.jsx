import { motion } from 'framer-motion';
import { hero } from '../data.js';

const lineVariants = {
  hidden: { y: '110%' },
  visible: (i) => ({
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] },
  }),
};

const capabilities = ['AI Concierge', 'Lead Capture', 'Live Booking', 'WhatsApp Automation', 'Analytics'];

export default function Hero() {
  return (
    <section id="top" className="relative bg-ink text-white overflow-hidden pt-[72px]">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-[0.14] blur-[120px]"
          style={{ background: 'radial-gradient(circle, #C9973A 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="section-wrap relative pt-24 pb-28 md:pt-32 md:pb-36">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-[13px] tracking-[0.16em] uppercase text-gold mb-6"
        >
          {hero.eyebrow}
        </motion.p>

        <h1 className="font-display font-semibold text-[13vw] leading-[0.98] tracking-tightest md:text-[6.4vw] md:leading-[0.95] max-w-[15ch]">
          {hero.headline.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                custom={i}
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-[46ch] text-[17px] md:text-[18px] leading-relaxed text-white/65"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href={hero.primaryCta.href}
            className="inline-flex items-center rounded-full bg-gold text-ink text-[15px] font-medium px-7 py-3.5 hover:bg-white transition-colors duration-200"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white text-[15px] font-medium px-7 py-3.5 hover:border-white/50 transition-colors duration-200"
          >
            {hero.secondaryCta.label}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="mt-20 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8"
        >
          {capabilities.map((c) => (
            <span key={c} className="text-[13px] tracking-wide text-white/45 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gold" />
              {c}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
