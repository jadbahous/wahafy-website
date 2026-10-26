import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import Link from './ui/Link.jsx';
import { useCopy } from '../i18n.jsx';
import FluidField from './FluidField.jsx';
import { Bubble, BookingCard, PhoneFrame } from './ui/mock.jsx';
import Words from './ui/Words.jsx';

// The opening, on the daylight look.
//
// One screen that says what Marhab is and shows it working: the promise on
// paper, in ink, at the left; at the right a window of night with a phone
// in it, the whole conversation already there, booked. The conversation is
// still here on purpose: the next section is where it unfolds.
//
// The entrance, once per session: the loader's clock reaches 11:02 PM and its
// dark sheet fades onto this same window, which at that moment fills most of
// the screen, the phone close up, beside it in large type: "Client booked."
// That holds for a beat. Then the line fades, the window zooms out into its
// place on the page, the paper comes up behind it, and the headline rises
// word by word where "Client booked." stood. Nothing loops. Only transform
// and opacity move, and the page does not scroll until the window has landed.
// "Skip intro" (see Home) ends it: the hero is simply there.
//
// On scroll the window drifts a little slower than the page, so the hero has
// depth on the way out. Reduced motion skips the zoom, the drift and the
// word-rise; the page is simply there.

const ease = [0.16, 1, 0.3, 1];
const HOLD = 2.0; // seconds the close-up holds, "Client booked." on it, before the zoom-out

// Where the window sits in the close-up: beside the line on wide screens,
// under it on narrow ones (mirrored for Arabic).
function closeUpBox(vw, vh, rtl) {
  if (vw >= 1024) {
    const w = vw * 0.5;
    return { left: rtl ? vw * 0.03 : vw * 0.47, top: vh * 0.1, width: w, height: vh * 0.84 };
  }
  return { left: vw * 0.04, top: vh * 0.3, width: vw * 0.92, height: vh * 0.66 };
}

function Conversation() {
  const { demo, ui } = useCopy();
  return (
    <div className="px-3 pb-3 pt-1 space-y-2">
      <div className="flex items-center gap-2.5 px-1 pb-1.5">
        <span className="relative grid place-items-center w-7 h-7 rounded-full border border-fg/[0.14] bg-fg/[0.04]">
          <img src="/brand/mark-white@2x.webp" alt="" width="17" height="13" className="h-[13px] w-auto select-none" draggable="false" />
          <span className="absolute -end-0.5 -bottom-0.5 w-2 h-2 rounded-full bg-ok-dot ring-2 ring-bg" />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="text-[12.5px] font-medium text-fg truncate">{demo.business}</p>
          <p className="text-[10.5px] tracking-[0.06em] uppercase text-fg/60">{ui.aiReception} · 11:02 PM</p>
        </div>
      </div>
      {demo.conversation.map((line, i) => (
        <Bubble key={i} role={line.role} dense>
          {line.text}
        </Bubble>
      ))}
    </div>
  );
}

export default function Hero({ ready = true, intro = false, skipped = false, onSettled, onPhase }) {
  const { hero, demo, ui } = useCopy();
  const reduced = useReducedMotion();
  const zoom = intro && !reduced;

  const sectionRef = useRef(null);
  const winRef = useRef(null);
  // The transform that puts the window in its close-up place, as large as
  // fits: measured once from its resting place, before the loader lets go.
  const [from, setFrom] = useState(null);
  // wait (behind the loader) → hold (close-up, "Client booked.") → zoom → settled
  const [phase, setPhase] = useState(zoom ? 'wait' : 'settled');
  const settled = phase === 'settled';

  useLayoutEffect(() => {
    if (!zoom || !winRef.current) return;
    const r = winRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const box = closeUpBox(vw, vh, document.documentElement.dir === 'rtl');
    const scale = Math.min(box.width / r.width, box.height / r.height);
    setFrom({
      x: box.left + box.width / 2 - (r.left + r.width / 2),
      y: box.top + box.height / 2 - (r.top + r.height / 2),
      scale,
    });
  }, [zoom]);

  // Once the loader lets go: hold the close-up, then zoom out. Skipped
  // ("Skip intro", see Home): straight to the end.
  useEffect(() => {
    if (!zoom) return;
    if (skipped) {
      setPhase('settled');
      return;
    }
    if (!ready) return;
    setPhase('hold');
    const t = setTimeout(() => setPhase('zoom'), HOLD * 1000);
    return () => clearTimeout(t);
  }, [zoom, ready, skipped]);

  useEffect(() => {
    onPhase?.(phase);
    if (settled) onSettled?.();
  }, [phase, settled, onPhase, onSettled]);

  // No scrolling until the window has landed (the close-up is a transform of
  // the window in its place on the page, so scrolling would carry it off).
  useEffect(() => {
    if (!zoom || settled) return;
    const el = document.documentElement;
    const prev = el.style.overflow;
    el.style.overflow = 'hidden';
    return () => {
      el.style.overflow = prev;
    };
  }, [zoom, settled]);

  // On the way out, the window lags the page a little.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const drift = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const copyDrift = useTransform(scrollYProgress, [0, 1], [0, 28]);

  const base = zoom && !skipped ? HOLD + 0.1 : 0.05; // when the words start, after the close-up
  const rise = (delay) => ({
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: base + delay } },
  });
  const state = ready ? 'visible' : 'hidden';

  return (
    <section ref={sectionRef} className="relative bg-bg overflow-hidden">
      {/* The dark the loader fades onto: gone once the window has zoomed out.
          It catches stray clicks, so nothing under it is hit while it plays. */}
      {zoom && !settled && (
        <motion.div
          className="fixed inset-0 z-[82] zone-dark bg-bg"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'zoom' ? 0 : 1 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        />
      )}

      {/* The result, in large type beside the phone while it is close up. */}
      {zoom && !settled && (
        <div
          className="fixed z-[86] pointer-events-none zone-dark inset-x-0 top-0 h-[30vh] flex items-end px-6 pb-[3vh] lg:inset-y-0 lg:end-auto lg:h-auto lg:w-[44vw] lg:items-center lg:ps-[6vw] lg:pe-0 lg:pb-0"
          aria-hidden="true"
        >
          <motion.div
            initial={false}
            animate={{ opacity: phase === 'zoom' ? 0 : 1 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.p
              className="font-display font-semibold text-fg leading-[1.0] tracking-[-0.04em] text-balance"
              style={{ fontSize: 'clamp(2.9rem, 6.4vw, 6.75rem)' }}
              initial="hidden"
              animate={phase === 'wait' ? 'hidden' : 'visible'}
            >
              <Words text={ui.clientBooked} delay={0.45} stagger={0.08} duration={0.9} />
            </motion.p>
          </motion.div>
        </div>
      )}

      <div className="section-wrap pt-[104px] md:pt-[120px] pb-14 md:pb-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* The promise */}
          <motion.div
            key={skipped ? 'skipped' : 'intro'}
            className="lg:col-span-6"
            initial="hidden"
            animate={state}
            style={reduced || !settled ? undefined : { y: copyDrift }}
          >
            <motion.p
              variants={rise(0)}
              className="font-display font-medium text-[12.5px] uppercase tracking-[0.16em] text-fg/65"
            >
              {hero.eyebrow}
            </motion.p>
            <h1 className="mt-6 font-display font-semibold text-fg text-[clamp(2.5rem,4.9vw,4.5rem)] leading-[1.0] tracking-[-0.035em] max-w-[14ch] text-balance">
              <Words text={hero.headline[0]} delay={base + 0.05} />{' '}
              <span className="text-fg/50">
                <Words text={hero.headline[1]} delay={base + 0.05 + hero.headline[0].split(' ').length * 0.045} />
              </span>
            </h1>
            <motion.p
              variants={rise(0.3)}
              className="mt-7 text-[17px] md:text-[18px] leading-[1.6] text-fg/72 max-w-[44ch]"
            >
              {hero.sub}
            </motion.p>
            <motion.div variants={rise(0.42)} className="mt-9 flex flex-wrap items-center gap-3">
              <Link to={hero.secondaryCta.href} className="btn-primary group h-[52px] px-7 text-[15px]">
                {hero.secondaryCta.label}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" strokeWidth={2} />
              </Link>
              <a href={hero.primaryCta.href} className="btn-secondary group h-[52px] px-6 text-[15px]">
                {hero.primaryCta.label}
                <ArrowDown className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0.5" strokeWidth={2} />
              </a>
            </motion.div>
          </motion.div>

          {/* The window of night */}
          <div className="lg:col-span-6 lg:justify-self-end w-full max-w-[520px]">
            <motion.div
              ref={winRef}
              className={`zone-dark relative rounded-[28px] overflow-hidden ${settled ? '' : 'z-[84]'}`}
              style={{ boxShadow: 'var(--shadow-3)', transformOrigin: '50% 50%' }}
              initial={false}
              animate={zoom && (phase === 'wait' || phase === 'hold') && from ? from : { x: 0, y: 0, scale: 1 }}
              transition={zoom && phase === 'zoom' ? { duration: 1.2, ease } : { duration: 0 }}
              onAnimationComplete={() => {
                if (phase === 'zoom') setPhase('settled');
              }}
            >
              <motion.div style={reduced || !settled ? undefined : { y: drift }} className="relative">
                <div className="absolute inset-0">
                  <FluidField progress={null} />
                  <div className="noise-overlay" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </div>

                <div className="relative p-5 sm:p-6 flex justify-center xl:justify-end">
                  <PhoneFrame className="w-full max-w-[272px] xl:max-w-[264px]">
                    <Conversation />
                  </PhoneFrame>
                </div>

                {/* The result, beside the phone; only where there is room beside it. */}
                <motion.div
                  className="hidden xl:block absolute start-6 top-6 w-[190px]"
                  initial={zoom ? { opacity: 0, y: -8 } : false}
                  animate={zoom ? (settled ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }) : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease }}
                >
                  <BookingCard title={demo.card.title} line1={demo.card.line1} line2={demo.card.line2} />
                </motion.div>

                <p className="absolute end-5 bottom-4 sm:end-7 sm:bottom-5 font-display text-[11px] font-medium uppercase tracking-[0.16em] text-fg/60">
                  {ui.liveDemo}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* The three facts */}
        <motion.div
          className="mt-16 md:mt-24 grid sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-12 border-t border-fg/10 pt-8"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          {hero.numbers.map((n) => (
            <div key={n.label}>
              <div className="font-display font-semibold text-fg tracking-[-0.04em] leading-none">
                {n.text ? (
                  <span className="block text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.05] tracking-[-0.03em] max-w-[16ch]">
                    {n.text}
                  </span>
                ) : (
                  <span className="text-[clamp(2.6rem,4.4vw,3.6rem)] tabular-nums">
                    {n.value}
                    <span className="text-fg/50">{n.suffix}</span>
                  </span>
                )}
              </div>
              <p className="mt-3 max-w-[30ch] text-[14.5px] leading-relaxed text-fg/70">{n.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
