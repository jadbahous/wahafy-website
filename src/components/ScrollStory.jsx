import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { useCopy } from '../i18n.jsx';
import SectionHeading from './SectionHeading.jsx';
import { Bubble, BookingCard, PhoneFrame, StatusRow } from './ui/mock.jsx';

// The showpiece. One phone stays pinned while the page scrolls, and the
// screen on it moves through one customer's week: the midnight question,
// the booking, the reminder, the review, and finally the owner's view of all
// of it. The visitor drives it with the scroll wheel, so it never runs ahead
// of them and never has to be replayed.
//
// Five stages share one section five screens tall. Scroll progress picks the
// stage; progress inside a stage reveals that screen's messages one by one,
// so even a slow scroll keeps showing something new. Screens hand over with
// the enter recipe (rise, sharpen) and a quieter exit.
//
// Reduced motion gets the same story as five still rows, nothing pinned.

const ease = [0.16, 1, 0.3, 1];

function Header({ stage }) {
  const { story } = useCopy();
  const owner = stage.id === 'owner';
  return (
    <div className="flex items-center gap-2.5 px-1 pb-2">
      <span className="relative grid place-items-center w-7 h-7 rounded-full border border-fg/[0.14] bg-fg/[0.04]">
        <img src="/brand/mark-white@2x.webp" alt="" width="17" height="13" className="h-[13px] w-auto select-none" draggable="false" />
        {!owner && <span className="absolute -end-0.5 -bottom-0.5 w-2 h-2 rounded-full bg-ok-dot ring-2 ring-bg" />}
      </span>
      <div className="min-w-0 leading-tight">
        <p className="text-[12.5px] font-medium text-fg truncate">{owner ? 'Marhab' : story.business}</p>
        <p className="text-[10.5px] tracking-[0.06em] uppercase text-fg/60">{stage.channel} · {stage.when}</p>
      </div>
    </div>
  );
}

function Stars({ n = 5 }) {
  return (
    <span className="inline-flex items-center gap-0.5 mt-1.5" aria-label={`${n} stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="w-3 h-3 text-[#f2c14e]" fill="#f2c14e" strokeWidth={0} />
      ))}
    </span>
  );
}

/** One screen of the phone. `shown` is how many of its parts are revealed. */
function Screen({ stage, shown }) {
  const { ui } = useCopy();
  if (stage.id === 'owner') {
    return (
      <div className="px-3 pb-3 pt-1">
        <Header stage={stage} />
        <p className="px-1 pt-2 pb-2 font-display text-[11px] font-medium uppercase tracking-[0.14em] text-fg/60">{ui.thisWeek}</p>
        <div className="grid grid-cols-3 gap-1.5 px-1">
          {stage.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: shown > i ? 1 : 0, y: shown > i ? 0 : 8 }}
              transition={{ duration: 0.4, ease }}
              className="rounded-[12px] border border-fg/[0.1] bg-fg/[0.04] px-2.5 py-2"
            >
              <p className="font-display font-semibold text-[20px] leading-none tracking-[-0.03em] text-fg">{s.value}</p>
              <p className="mt-1 text-[10.5px] text-fg/60">{s.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-2 px-1 divide-y divide-fg/[0.06]">
          {stage.rows.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: shown > i + 1 ? 1 : 0 }}
              transition={{ duration: 0.35, ease }}
              className="[&>div]:py-2"
            >
              <StatusRow label={r.label} detail={r.detail} state={r.state} />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="px-3 pb-3 pt-1 space-y-2">
      <Header stage={stage} />
      {stage.lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: shown > i ? 1 : 0, y: shown > i ? 0 : 8 }}
          transition={{ duration: 0.4, ease }}
        >
          <Bubble role={line.role} dense>
            {line.text}
            {line.stars && (
              <>
                <br />
                <Stars n={line.stars} />
              </>
            )}
          </Bubble>
          {line.action && (
            <div className="flex justify-start mt-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-fg/20 bg-fg/[0.05] px-2.5 py-1 text-[11.5px] text-fg/85">
                <Check className="w-3 h-3" strokeWidth={2.2} />
                {line.action}
              </span>
            </div>
          )}
        </motion.div>
      ))}
      {stage.card && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: shown > stage.lines.length ? 1 : 0, y: shown > stage.lines.length ? 0 : 10 }}
          transition={{ duration: 0.5, ease }}
          className="pt-1"
        >
          <BookingCard title={stage.card.title} line1={stage.card.line1} line2={stage.card.line2} />
        </motion.div>
      )}
    </div>
  );
}

function partsOf(stage) {
  return stage.id === 'owner' ? stage.stats.length + stage.rows.length : stage.lines.length + (stage.card ? 1 : 0);
}

function Phone({ stage, shown, className = '' }) {
  return (
    <PhoneFrame className={`w-full max-w-[272px] ${className}`}>
      <div className="relative h-[372px] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={stage.id}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
            transition={{ duration: 0.5, ease }}
          >
            <Screen stage={stage} shown={shown} />
          </motion.div>
        </AnimatePresence>
      </div>
    </PhoneFrame>
  );
}

function Caption({ stage, active, compact = false }) {
  return (
    <div className={compact ? '' : 'py-3'}>
      <p className="font-display text-[11.5px] font-medium uppercase tracking-[0.14em] text-fg/60">{stage.when}</p>
      <h3 className={`mt-1 font-display font-semibold tracking-[-0.02em] text-fg ${compact ? 'text-[20px]' : 'text-[19px] lg:text-[21px]'}`}>
        {stage.title}
      </h3>
      {compact ? (
        <p className="mt-1.5 text-[14.5px] leading-[1.55] text-fg/70">{stage.text}</p>
      ) : (
        <motion.div
          initial={false}
          animate={{ height: active ? 'auto' : 0, opacity: active ? 1 : 0 }}
          transition={{ duration: 0.45, ease }}
          className="overflow-hidden"
        >
          <p className="pt-1.5 text-[14.5px] leading-[1.55] text-fg/70 max-w-[40ch]">{stage.text}</p>
        </motion.div>
      )}
    </div>
  );
}

function Window({ children, className = '' }) {
  return (
    <div className={`night-window zone-dark relative rounded-[28px] ${className}`} style={{ boxShadow: 'var(--shadow-3)' }}>
      <div className="noise-overlay" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="relative h-full flex items-center justify-center p-6 sm:p-8">{children}</div>
    </div>
  );
}

export default function ScrollStory() {
  const { story } = useCopy();
  const STAGES = story.stages;
  const N = STAGES.length;
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [pos, setPos] = useState({ stage: 0, sub: 0 });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const raw = Math.min(N - 1e-6, Math.max(0, p * N));
    const stage = Math.floor(raw);
    const sub = Math.round((raw - stage) * 10) / 10;
    setPos((prev) => (prev.stage === stage && prev.sub === sub ? prev : { stage, sub }));
  });

  const rail = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (reduced) {
    return (
      <section className="bg-bg text-fg py-28 md:py-36 border-t border-fg/[0.08]">
        <div className="section-wrap">
          <SectionHeading heading={story.heading} sub={story.sub} max="20ch" className="mb-14" />
          <div className="grid gap-10">
            {STAGES.map((s) => (
              <div key={s.id} className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5">
                  <Caption stage={s} active />
                </div>
                <div className="lg:col-span-7 lg:justify-self-end w-full max-w-[440px]">
                  <Window className="aspect-[4/5]">
                    <Phone stage={s} shown={99} />
                  </Window>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const stage = STAGES[pos.stage];
  // Reveal the stage's parts across the first 70% of its scroll span, then rest.
  const shown = Math.max(1, Math.ceil((Math.min(pos.sub, 0.7) / 0.7) * partsOf(stage)));

  return (
    <section ref={ref} className="relative bg-bg text-fg border-t border-fg/[0.08]" style={{ height: `${N * 100}vh` }}>
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <div className="section-wrap h-full pt-[88px] md:pt-[104px] pb-6 md:pb-10 flex flex-col">
          {/* The heading on small screens sits above the pinned pair. */}
          <div className="lg:hidden mb-4">
            <h2 className="font-display font-semibold text-[clamp(1.7rem,6vw,2.2rem)] leading-[1.05] tracking-[-0.03em] text-fg text-balance max-w-[18ch]">
              {story.heading}
            </h2>
          </div>

          <div className="flex-1 min-h-0 grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Captions */}
            <div className="order-2 lg:order-1 lg:col-span-5 min-h-0">
              <div className="hidden lg:block mb-5">
                <h2 className="font-display font-semibold text-[clamp(1.9rem,3.2vw,2.6rem)] leading-[1.04] tracking-[-0.03em] text-fg text-balance max-w-[16ch]">
                  {story.heading}
                </h2>
                <p className="mt-2.5 text-[15px] text-fg/65 max-w-[40ch]">{story.sub}</p>
              </div>

              {/* Large: the list, the active one lit. Small: the active caption only. */}
              <div className="hidden lg:grid grid-cols-[14px_1fr] gap-x-5">
                <div className="relative w-px bg-fg/10 justify-self-center my-3">
                  <motion.div style={{ scaleY: rail }} className="absolute inset-0 origin-top bg-fg" />
                </div>
                <ol>
                  {STAGES.map((s, i) => (
                    <motion.li
                      key={s.id}
                      animate={{ opacity: i === pos.stage ? 1 : 0.38 }}
                      transition={{ duration: 0.35, ease }}
                    >
                      <Caption stage={s} active={i === pos.stage} />
                    </motion.li>
                  ))}
                </ol>
              </div>
              <div className="lg:hidden relative min-h-[132px]">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <Caption stage={stage} active compact />
                  </motion.div>
                </AnimatePresence>
                <div className="mt-3 flex gap-1.5" aria-hidden="true">
                  {STAGES.map((s, i) => (
                    <span key={s.id} className={`h-1 rounded-full transition-[width,background-color] duration-300 ${i === pos.stage ? 'w-6 bg-fg' : 'w-2 bg-fg/20'}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* The phone */}
            <div className="order-1 lg:order-2 lg:col-span-7 lg:justify-self-end w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[440px] self-center">
              <Window className="aspect-[4/5] max-h-[min(72dvh,620px)] lg:max-h-none">
                <Phone stage={stage} shown={shown} className="scale-[0.82] sm:scale-100 origin-center" />
              </Window>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
