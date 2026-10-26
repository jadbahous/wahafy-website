import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { useCopy } from '../i18n.jsx';
import SectionHeading from './SectionHeading.jsx';
import { Bubble, BookingCard, PhoneFrame, StatusRow } from './ui/mock.jsx';

// The story, told once. One client's week in five steps, with one place to
// look: the phone in the middle, what the step is directly above it, what it
// means directly below it, and a named five-step bar under that.
//
// Scrolling moves from step to step; it does not drive anything inside a
// step. Each step holds still until the scroll passes its boundary, then the
// phone screen and its words change together, and the new screen's messages
// arrive on their own, one after another, at a calm pace. The only thing
// that follows the scroll continuously is the fill of the current step in the
// bar, so the visitor can see how far it is to the next one.
//
// A tag over each step says whose screen it is: four steps are what the
// customer sees; the last is what the owner sees, drawn inverted so the
// switch reads at a glance.
//
// Reduced motion gets the same five steps as a plain list, nothing pinned.

const ease = [0.16, 1, 0.3, 1];
const STEP_VH = 90; // scroll length per step (the pinned stage is 100vh of it)

const reveal = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.34, delayChildren: 0.2 } },
};
const part = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

function Header({ stage }) {
  const { story } = useCopy();
  const owner = stage.id === 'owner';
  return (
    <div className="flex items-center gap-2.5 px-4 pt-1 pb-2 text-start">
      <span className="relative grid place-items-center w-7 h-7 rounded-full border border-fg/[0.14] bg-fg/[0.04]">
        <img src="/brand/mark-white@2x.webp" alt="" width="17" height="13" className="h-[13px] w-auto select-none" draggable="false" />
        {!owner && <span className="absolute -end-0.5 -bottom-0.5 w-2 h-2 rounded-full bg-ok-dot ring-2 ring-bg" />}
      </span>
      <div className="min-w-0 leading-tight">
        <p className="text-[12.5px] font-medium text-fg truncate">{owner ? 'Marhab' : story.business}</p>
        <p className="text-[10.5px] tracking-[0.06em] uppercase text-fg/60 truncate">{stage.channel}</p>
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

/** One screen of the phone. Its parts arrive in turn when it mounts (or all at once, still). */
function Screen({ stage, still = false }) {
  const { ui } = useCopy();
  const anim = still ? {} : { variants: reveal, initial: 'hidden', animate: 'visible' };
  const item = still ? {} : { variants: part };

  if (stage.id === 'owner') {
    return (
      <div className="h-full flex flex-col text-start">
        <Header stage={stage} />
        <motion.div {...anim} className="px-3 pb-3">
          <motion.p {...item} className="px-1 pt-1 pb-2 font-display text-[11px] font-medium uppercase tracking-[0.14em] text-fg/60">
            {ui.thisWeek}
          </motion.p>
          <div className="grid grid-cols-3 gap-1.5 px-1">
            {stage.stats.map((s) => (
              <motion.div key={s.label} {...item} className="rounded-[12px] border border-fg/[0.1] bg-fg/[0.04] px-2.5 py-2">
                <p className="font-display font-semibold text-[20px] leading-none tracking-[-0.03em] text-fg">{s.value}</p>
                <p className="mt-1 text-[10.5px] text-fg/60">{s.label}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-2 px-1 divide-y divide-fg/[0.06]">
            {stage.rows.map((r) => (
              <motion.div key={r.label} {...item} className="[&>div]:py-2">
                <StatusRow label={r.label} detail={r.detail} state={r.state} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // A chat: newest at the bottom, like the real thing; if the screen is
  // short, the oldest line slips under the header rather than the newest
  // being cut off.
  return (
    <div className="h-full flex flex-col text-start">
      <Header stage={stage} />
      <motion.div
        {...anim}
        className="flex-1 min-h-0 flex flex-col justify-end gap-2 px-3 pb-3 overflow-hidden"
        style={{ maskImage: 'linear-gradient(to bottom, transparent 0, #000 28px)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, #000 28px)' }}
      >
        {stage.lines.map((line, i) => (
          <motion.div key={i} {...item}>
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
          <motion.div {...item} className="pt-1">
            <BookingCard title={stage.card.title} line1={stage.card.line1} line2={stage.card.line2} />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

/** The phone in its window of night. */
function Device({ stage, still = false }) {
  return (
    <div
      className="night-window zone-dark relative w-full max-w-[520px] rounded-[28px] overflow-hidden"
      style={{ boxShadow: 'var(--shadow-3)' }}
    >
      <div className="noise-overlay" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="relative flex justify-center px-5 py-4 sm:py-6">
        <PhoneFrame className="w-full max-w-[250px] sm:max-w-[272px]">
          <div className="relative h-[clamp(232px,38dvh,360px)] md:h-[clamp(300px,44dvh,400px)] overflow-hidden">
            {still ? (
              <Screen stage={stage} still />
            ) : (
              <AnimatePresence initial={false}>
                <motion.div
                  key={stage.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <Screen stage={stage} />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}

/** "What your customer sees" / "What you see": inverted for the owner, so the switch is plain. */
function WhoTag({ stage }) {
  const { ui } = useCopy();
  const owner = stage.id === 'owner';
  return (
    <span
      className={`inline-flex items-center gap-2 h-7 px-3 rounded-full text-[12.5px] font-medium ${
        owner ? 'bg-fg text-bg' : 'border border-fg/[0.16] bg-fg/[0.03] text-fg/75'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${owner ? 'bg-bg' : 'bg-ok-dot'}`} aria-hidden="true" />
      {owner ? ui.youSee : ui.customerSees}
    </span>
  );
}

function stepLabel(ui, i, n) {
  return ui.stepOf.replace('{n}', String(i + 1)).replace('{total}', String(n));
}

/** Above the phone: whose screen, which step and when, and its name. */
function Top({ stage, i, n }) {
  const { ui } = useCopy();
  return (
    <div className="flex flex-col items-center">
      <WhoTag stage={stage} />
      <p className="mt-3 font-display text-[12px] font-medium uppercase tracking-[0.14em] text-fg/60">
        {stepLabel(ui, i, n)} · {stage.when}
      </p>
      <h3 className="mt-1.5 font-display font-semibold text-[clamp(1.35rem,2.6vw,1.9rem)] leading-[1.1] tracking-[-0.025em] text-fg text-balance">
        {stage.title}
      </h3>
    </div>
  );
}

/** One step of the bar: its fill follows the scroll inside that step. */
function Segment({ progress, i, n, label, active, done }) {
  const fill = useTransform(progress, (p) => Math.min(1, Math.max(0, p * n - i)));
  return (
    <li className="min-w-0">
      <div className="h-[3px] rounded-full bg-fg/[0.12] overflow-hidden">
        <motion.div style={{ scaleX: fill }} className="h-full bg-fg origin-left rtl:origin-right" />
      </div>
      <span
        className={`mt-2 block truncate text-[11px] sm:text-[12px] font-medium transition-colors duration-300 ${
          active ? 'text-fg' : done ? 'text-fg/60' : 'text-fg/40'
        }`}
      >
        {label}
      </span>
    </li>
  );
}

function Bar({ stages, progress, at }) {
  return (
    <ol className="grid gap-2 sm:gap-3 w-full max-w-[560px]" style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}>
      {stages.map((s, i) => (
        <Segment key={s.id} progress={progress} i={i} n={stages.length} label={s.short} active={i === at} done={i < at} />
      ))}
    </ol>
  );
}

export default function ScrollStory() {
  const { story } = useCopy();
  const STAGES = story.stages;
  const N = STAGES.length;
  const reduced = useReducedMotion();
  const track = useRef(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  const [at, setAt] = useState(0);
  const pinned = useRef(false);

  // The step changes only when the scroll crosses a boundary. While the
  // stage is pinned, the page says so (html[data-story]), so the chat button
  // can step aside on small screens instead of covering the step bar.
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = Math.min(N - 1, Math.max(0, Math.floor(p * N)));
    setAt((prev) => (prev === next ? prev : next));
    const now = p > 0 && p < 1;
    if (now !== pinned.current) {
      pinned.current = now;
      if (now) document.documentElement.dataset.story = 'pinned';
      else delete document.documentElement.dataset.story;
    }
  });
  useEffect(() => () => delete document.documentElement.dataset.story, []);

  const heading = (
    <SectionHeading
      eyebrow={story.eyebrow}
      heading={story.heading}
      sub={story.sub}
      align="center"
      max="24ch"
      subMax="46ch"
    />
  );

  if (reduced) {
    return (
      <section id="demo" className="bg-bg text-fg pt-24 md:pt-32 pb-28 md:pb-36 border-t border-fg/[0.08] scroll-mt-16">
        <div className="section-wrap">
          {heading}
          <ol className="mt-16 grid gap-16 justify-items-center text-center">
            {STAGES.map((s, i) => (
              <li key={s.id} className="w-full flex flex-col items-center gap-6">
                <Top stage={s} i={i} n={N} />
                <Device stage={s} still />
                <p className="max-w-[52ch] text-[15px] leading-[1.6] text-fg/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  const stage = STAGES[at];

  return (
    <section id="demo" className="relative bg-bg text-fg border-t border-fg/[0.08] scroll-mt-16">
      <div className="section-wrap pt-24 md:pt-32 pb-4">{heading}</div>

      <div ref={track} className="relative" style={{ height: `${N * STEP_VH}vh` }}>
        <div className="sticky top-0 h-[100dvh] overflow-hidden">
          <div className="section-wrap h-full pt-[76px] md:pt-[92px] pb-5 md:pb-8 flex flex-col items-center justify-center text-center gap-4 md:gap-5">
            {/* Above: whose screen, which step, its name. Swaps with the screen. */}
            <div className="relative w-full min-h-[104px] md:min-h-[116px]">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <Top stage={stage} i={at} n={N} />
                </motion.div>
              </AnimatePresence>
            </div>

            <Device stage={stage} />

            {/* Below: what it means for the business. */}
            <div className="relative w-full max-w-[52ch] min-h-[66px] md:min-h-[52px]">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.p
                  key={stage.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease, delay: 0.05 }}
                  className="text-[14px] md:text-[15px] leading-[1.55] text-fg/70"
                >
                  {stage.text}
                </motion.p>
              </AnimatePresence>
            </div>

            <Bar stages={STAGES} progress={scrollYProgress} at={at} />
          </div>
        </div>
      </div>
    </section>
  );
}
