import { motion, useTransform } from 'framer-motion';

// A calm, atmospheric hero backdrop in the spirit of the Pearl & Bloom
// build: two soft, slow-drifting light orbs over a warm cream gradient,
// plus a fine film-grain overlay. No hard edges, no tech-grid — just
// restrained motion that lets the headline and product preview breathe.

export default function AmbientOrbs({ scrollYProgress, prefersReducedMotion }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.12]);
  const shift = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -28]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 78% 20%, rgba(201,217,232,0.65), transparent 60%),' +
            'radial-gradient(ellipse 50% 45% at 15% 78%, rgba(220,211,234,0.55), transparent 62%),' +
            'linear-gradient(180deg, #F6F8F5 0%, #F3F5F2 55%, #E7EBE5 100%)',
        }}
      />

      <motion.div
        style={{ scale, y: shift }}
        className="absolute -top-[10%] right-[6%] w-[min(42vw,520px)] h-[min(42vw,520px)] rounded-full pointer-events-none"
      >
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : { x: [0, -18, 0], y: [0, 16, 0], scale: [1, 1.05, 1] }
          }
          transition={
            prefersReducedMotion ? {} : { duration: 26, repeat: Infinity, ease: 'easeInOut' }
          }
          className="w-full h-full rounded-full blur-[2px]"
          style={{
            background:
              'radial-gradient(circle at 34% 30%, rgba(255,255,255,0.9), rgba(201,217,232,0.65) 45%, transparent 72%)',
          }}
        />
      </motion.div>

      <motion.div
        style={{ scale, y: shift }}
        className="absolute bottom-[6%] left-[8%] w-[min(34vw,420px)] h-[min(34vw,420px)] rounded-full pointer-events-none"
      >
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : { x: [0, 16, 0], y: [0, -14, 0], scale: [1, 1.06, 1] }
          }
          transition={
            prefersReducedMotion
              ? {}
              : { duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 2 }
          }
          className="w-full h-full rounded-full blur-[2px]"
          style={{
            background:
              'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.85), rgba(220,211,234,0.55) 48%, transparent 74%)',
          }}
        />
      </motion.div>

      <div className="noise-overlay" />
    </div>
  );
}
