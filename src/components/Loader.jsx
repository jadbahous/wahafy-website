import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCopy } from '../i18n.jsx';

// Full-screen entry loader: black field with a faint dot grid, a thin
// progress bar along the top edge, and a giant clock in the bottom corner,
// "It is" above it. The clock ticks one minute at a time, slowly, from
// 10:56 PM to 11:02 PM, the minute the customer in the hero writes; each
// changed digit rolls up into place. It never finishes before the fonts are
// ready. At the end the sheet does not wipe: it fades, and what it fades
// onto is the hero's window of night already filling the screen, so the dark
// of the loader becomes the dark of the product (see Hero). `onDone(played)`
// tells the page whether that handoff is happening or the loader was skipped
// (second visit in the session, or reduced motion).

const KEY = 'marhab:loaded';
const MINUTES = ['10:56', '10:57', '10:58', '10:59', '11:00', '11:01', '11:02'];
const FIRST_HOLD = 500; // ms on 10:56 before the first tick
const STEP = 600; // ms per minute
const END_HOLD = 700; // ms on 11:02 before the sheet fades
const TOTAL = FIRST_HOLD + (MINUTES.length - 1) * STEP + END_HOLD;
const roll = [0.22, 1, 0.36, 1];

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

/** Which minute is showing, `elapsed` ms in: 0 (10:56) … 6 (11:02). */
function minuteAt(elapsed) {
  if (elapsed < FIRST_HOLD) return 0;
  return Math.min(MINUTES.length - 1, 1 + Math.floor((elapsed - FIRST_HOLD) / STEP));
}

/** The time, one slot per digit; a digit that changes slides up and
 *  crossfades into the next (the colon stays put). */
function Clock({ time }) {
  return time.split('').map((ch, i) =>
    ch === ':' ? (
      <span key={i} className="inline-block mx-[0.04em] [font-variant-numeric:normal]">
        :
      </span>
    ) : (
      <span key={i} className="relative inline-block">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={ch}
            className="inline-block"
            initial={{ y: '0.3em', opacity: 0 }}
            animate={{ y: '0em', opacity: 1 }}
            exit={{ y: '-0.3em', opacity: 0 }}
            transition={{ duration: 0.42, ease: roll }}
          >
            {ch}
          </motion.span>
        </AnimatePresence>
      </span>
    ),
  );
}

export default function Loader({ onDone }) {
  const { ui } = useCopy();
  const [visible, setVisible] = useState(loaderWillPlay);
  const [pct, setPct] = useState(0);
  const [minute, setMinute] = useState(0);
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
      // The bar follows the clock; its last stretch waits for readiness.
      const t = Math.min(elapsed / TOTAL, 1);
      let target = Math.floor(t * 96);
      if (ready && t >= 1) target = 100;
      setPct((p) => (target > p ? target : p));
      setMinute(minuteAt(elapsed));
      if (target >= 100) {
        if (!doneRef.current) {
          doneRef.current = true;
          try {
            sessionStorage.setItem(KEY, '1');
          } catch {}
          setVisible(false);
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
          aria-busy="true"
        >
          <span className="sr-only">{ui.loading}</span>
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
            className="absolute start-6 md:start-10 bottom-4 md:bottom-6 select-none text-[#dfe6ef]"
            aria-hidden="true"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: roll, delay: 0.1 }}
              className="font-display font-medium leading-none tracking-[-0.02em] text-[#dfe6ef]/70 ms-[0.06em] mb-[0.2em] md:mb-[0.1em]"
              style={{ fontSize: 'clamp(1.5rem, 3.4vw, 3rem)' }}
            >
              {ui.itIs}
            </motion.p>
            <p className="font-display font-medium leading-none tracking-[-0.05em] tabular-nums whitespace-nowrap" style={{ fontSize: 'clamp(5.5rem, 17vw, 15rem)' }}>
              <span dir="ltr" className="inline-block">
                <Clock time={MINUTES[minute]} />
              </span>
              <span className="ms-3 align-top text-[0.22em] font-medium tracking-[0.02em] text-[#dfe6ef]/70">{ui.pm}</span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
