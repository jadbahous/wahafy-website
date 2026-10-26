import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Full-screen entry loader: black field with a faint dot grid, a thin
// progress bar along the top edge, and a giant clock in the bottom-left that
// runs from ten o'clock to 11:02 PM, the minute the customer in the hero
// writes. The count is tied to real readiness (fonts) with a
// minimum duration so it never flashes. At 100 the sheet does not wipe: it
// fades, and what it fades onto is the hero's window of night already filling
// the screen, so the dark of the loader becomes the dark of the product before
// the page zooms out around it (see Hero). `onDone(played)` tells the page
// whether that handoff is happening or the loader was skipped (second visit
// in the session, or reduced motion).

const KEY = 'marhab:loaded';
const MIN_MS = 2100;

/** Whether the loader will show on this page view: first visit in the session, motion allowed. */
export function loaderWillPlay() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return !sessionStorage.getItem(KEY);
  } catch {
    return true;
  }
}

/** 0..100 → "10:00" … "11:02": sixty-two minutes, the last one the customer's. */
function clock(pct) {
  const m = Math.min(62, Math.round((pct / 100) * 62));
  const h = m >= 60 ? 11 : 10;
  const mm = m >= 60 ? m - 60 : m;
  return `${h}:${String(mm).padStart(2, '0')}`;
}

export default function Loader({ onDone }) {
  const [visible, setVisible] = useState(loaderWillPlay);
  const [pct, setPct] = useState(0);
  const doneRef = useRef(false);
  const playedRef = useRef(visible);

  useEffect(() => {
    if (!visible) {
      onDone?.(playedRef.current);
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
    if (!visible) document.body.style.overflow = '';
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] zone-dark bg-bg text-fg overflow-hidden"
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
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-fg/5">
            <div
              className="h-full bg-[#dfe6ff] transition-[width] duration-150 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="absolute top-6 left-0 right-0 flex justify-center">
            <img src="/brand/lockup-white@2x.webp" alt="Marhab" className="h-[26px] w-auto opacity-90 select-none" draggable="false" />
          </div>

          <motion.div
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3 }}
            className="absolute left-6 md:left-10 bottom-4 md:bottom-6 select-none text-[#dfe6ef]"
            dir="ltr"
          >
            <p className="font-display font-medium leading-none tracking-[-0.05em] tabular-nums" style={{ fontSize: 'clamp(5.5rem, 17vw, 15rem)' }}>
              {clock(pct)}
              <span className="ml-3 align-top text-[0.22em] font-medium tracking-[0.02em] text-[#dfe6ef]/70">PM</span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
