import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AmbientOrbs from './AmbientOrbs.jsx';
import ProductMockup from './ProductMockup.jsx';
import { hero } from '../data.js';

const title = hero.headline.join(' ');
const words = title.split(' ');

const letterAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const containerAnimation = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.028, delayChildren: 0.5 } },
};

export default function Hero() {
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;
    const enter = () => setIsActive(true);
    const leave = () => setIsActive(false);
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
    };
  }, []);

  // Scroll progress across the tall wrapper — the visual stays pinned
  // (position: sticky) while this progresses from 0 to 1, then releases
  // naturally into the next section as the page continues scrolling.
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end start'],
  });

  // The intro (badge/headline/sub/CTAs) recedes early, handing off to the
  // product mockup below it, which resolves from a tilted preview into a
  // flat, fully lit view — the actual scroll-driven "reveal" moment.
  const introOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.45], [0, prefersReducedMotion ? 0 : -90]);
  const introScale = useTransform(scrollYProgress, [0, 0.45], [1, prefersReducedMotion ? 1 : 0.96]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section id="top" className="relative bg-paper">
      <div ref={wrapperRef} className="relative h-[180vh]">
        <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden">
          <AmbientOrbs scrollYProgress={scrollYProgress} prefersReducedMotion={prefersReducedMotion} />

          <div className="relative z-10 flex flex-col items-center h-full px-4 pt-[104px] pb-6 overflow-hidden">
            <motion.div
              style={{ opacity: introOpacity, y: introY, scale: introScale }}
              className="flex flex-col items-center text-center shrink-0"
            >
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mb-5 px-4 py-1.5 rounded-full bg-white/70 text-ink/75 text-[13px] font-medium flex items-center gap-2 backdrop-blur-lg border border-ink/10 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                {hero.eyebrow}
              </motion.div>

              <motion.h1
                variants={containerAnimation}
                initial="hidden"
                animate="visible"
                className="font-display font-semibold text-ink text-[10vw] leading-[1.04] tracking-tightest md:text-[3.7vw] md:leading-[1.05] max-w-[18ch] flex flex-wrap justify-center gap-x-[0.26em]"
              >
                {words.map((word, wi) => (
                  <span key={wi} className="inline-flex whitespace-nowrap">
                    {word.split('').map((char, ci) => (
                      <motion.span key={ci} variants={letterAnimation}>
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 max-w-[44ch] text-[15.5px] md:text-[17px] leading-relaxed text-ink/60"
              >
                {hero.sub}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mt-7 flex flex-wrap items-center justify-center gap-4"
              >
                <Button asChild size="lg" variant="gradient" className="group">
                  <Link to={hero.primaryCta.href}>
                    {hero.primaryCta.label}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-ink/15 text-ink hover:border-ink/35 hover:bg-ink/5"
                >
                  <Link to={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
                </Button>
              </motion.div>
            </motion.div>

            <ProductMockup scrollYProgress={scrollYProgress} prefersReducedMotion={prefersReducedMotion} />
          </div>

          <motion.div
            style={{ opacity: cueOpacity }}
            className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-ink/35"
          >
            <span className="text-[11px] tracking-[0.2em] uppercase">Scroll</span>
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
              transition={prefersReducedMotion ? {} : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
