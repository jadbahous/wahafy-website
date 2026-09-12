import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Full-screen entry loader: black field with a faint dot grid, a thin
// progress bar along the top edge, and a giant percentage counting up in
// the bottom-left. The count is tied to real readiness (fonts) with a
// minimum duration so it never flashes, then the whole sheet wipes upward
// to reveal the page. Shown once per session; skipped for reduced motion.

const KEY = 'wahafy:loaded';
const MIN_MS = 2100;

export default function Loader({ onDone }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    try {
      return !sessionStorage.getItem(KEY);
    } catch {
      return true;
    }
  });
  const [pct, setPct] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!visible) {
      onDone?.();
      return;
    }
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const start = performance.now();
    let ready = false;
    let raf = 0;

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => {
      ready = true;
    });

    function tick(now) {
      const elapsed = now - start;
      // Ease toward 92% on the timer; the last stretch waits for readiness.
      const t = Math.min(elapsed / MIN_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      let target = Math.floor(eased * 92);
      if (ready && t >= 1) target = 100;
      setPct((p) => (target > p ? target : p));
      if (target >= 100) {
        if (!doneRef.current) {
          doneRef.current = true;
          setTimeout(() => {
            try {
              sessionStorage.setItem(KEY, '1');
            } catch {}
            setVisible(false);
          }, 420);
        }
        return;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [visible, onDone]);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = '';
      onDone?.();
    }
  }, [visible, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#07080b] text-white overflow-hidden"
          aria-live="polite"
          aria-busy="true"
        >
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.16) 0.8px, transparent 0.9px)',
              backgroundSize: '26px 26px',
            }}
          />
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/5">
            <div
              className="h-full bg-[#dfe6ff] transition-[width] duration-150 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="absolute top-6 left-0 right-0 flex justify-center">
            <span className="flex items-center gap-2.5">
              <span className="grid place-items-center w-6 h-6 rounded-md bg-white text-black font-display font-bold text-[11px]">
                W
              </span>
              <span className="font-display font-semibold text-[15px] tracking-tight text-white/85">Wahafy</span>
            </span>
          </div>

          <motion.div
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3 }}
            className="absolute left-6 md:left-10 bottom-4 md:bottom-6 font-display font-medium leading-none tracking-[-0.05em] text-[#dfe6ef] tabular-nums select-none"
            style={{ fontSize: 'clamp(5.5rem, 19vw, 17rem)' }}
          >
            {pct}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
