import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { hero, demo } from '../data.js';
import FluidField from './FluidField.jsx';
import { Bubble, BookingCard, PhoneFrame, TypingDots } from './ui/mock.jsx';

// The opening, on the daylight look.
//
// One screen that says what Marhab is and shows it working: the promise on
// paper, in ink, at the left; at the right a window of night — the same
// indigo field as before, now held in a frame rather than filling the sky —
// with a phone in front of it where a customer books at 11pm. The three
// facts that used to be scenes two and three of a five-screen dive sit in a
// quiet strip underneath. A clinic owner on a phone sees the whole argument
// before their thumb moves.
//
// Motion is one orchestrated arrival: the words rise, the window settles,
// the conversation plays once. Nothing loops except the field itself.
//
// The hero holds four things and no more: the label, the promise, one
// sentence, two buttons. The facts live in their own strip below the fold.

const ease = [0.16, 1, 0.3, 1];
const rise = (delay) => ({
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay } },
});

/** The conversation, arriving one line at a time, once. */
function Conversation({ reduced }) {
  const lines = demo.conversation.slice(0, 4);
  const [shown, setShown] = useState(reduced ? lines.length : 0);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    if (reduced) return;
    let alive = true;
    const timers = [];
    let t = 900;
    lines.forEach((line, i) => {
      const isMarhab = line.role === 'marhab';
      if (isMarhab) timers.push(setTimeout(() => alive && setTyping(true), t - 650));
      timers.push(
        setTimeout(() => {
          if (!alive) return;
          setTyping(false);
          setShown(i + 1);
        }, t),
      );
      t += isMarhab ? 1500 : 1100;
    });
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [reduced]);
  return (
    <div className="px-3 pb-3 pt-1 space-y-2.5 min-h-[286px]">
      <div className="flex items-center gap-2.5 px-1 pb-2">
        <span className="relative grid place-items-center w-7 h-7 rounded-full border border-fg/[0.14] bg-fg/[0.04]">
          <img src="/brand/mark-white.png" alt="" className="h-[13px] w-auto select-none" draggable="false" />
          <span className="absolute -right-0.5 -bottom-0.5 w-2 h-2 rounded-full bg-ok-dot ring-2 ring-bg" />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="text-[12.5px] font-medium text-fg truncate">{demo.business}</p>
          <p className="text-[10.5px] tracking-[0.06em] uppercase text-fg/60">AI reception · 11:02 pm</p>
        </div>
      </div>
      {lines.slice(0, shown).map((line, i) => (
        <motion.div
          key={i}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
        >
          <Bubble role={line.role}>{line.text}</Bubble>
        </motion.div>
      ))}
      {typing && <TypingDots />}
    </div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const [booked, setBooked] = useState(!!reduced);
  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setBooked(true), 6400);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <section className="relative bg-bg overflow-hidden">
      <div className="section-wrap pt-[104px] md:pt-[120px] pb-14 md:pb-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* The promise */}
          <motion.div
            className="lg:col-span-6"
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={rise(0)}
              className="font-display font-medium text-[12.5px] uppercase tracking-[0.16em] text-fg/65"
            >
              {hero.support.replace(/\. One connected.*$/, '')}
            </motion.p>
            <motion.h1
              variants={rise(0.08)}
              className="mt-6 font-display font-semibold text-fg text-[clamp(2.5rem,4.9vw,4.5rem)] leading-[1.0] tracking-[-0.035em] max-w-[14ch] text-balance"
            >
              {hero.headline[0]} <span className="text-fg/45">{hero.headline[1]}</span>
            </motion.h1>
            <motion.p
              variants={rise(0.16)}
              className="mt-7 text-[17px] md:text-[18px] leading-[1.6] text-fg/72 max-w-[44ch]"
            >
              {hero.sub}
            </motion.p>
            <motion.div variants={rise(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
              <Link to={hero.secondaryCta.href} className="btn-primary group h-[52px] px-7 text-[15px]">
                {hero.secondaryCta.label}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5" strokeWidth={2} />
              </Link>
              <a href={hero.primaryCta.href} className="btn-secondary group h-[52px] px-6 text-[15px]">
                {hero.primaryCta.label}
                <ArrowDown className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0.5" strokeWidth={2} />
              </a>
            </motion.div>
          </motion.div>

          {/* The window of night */}
          <motion.div
            className="lg:col-span-6 lg:justify-self-end w-full max-w-[520px]"
            initial={reduced ? false : { opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease, delay: 0.18 }}
          >
            <div
              className="zone-dark relative aspect-[3/4] sm:aspect-[1/1] lg:aspect-[5/6] rounded-[28px] overflow-hidden"
              style={{ boxShadow: 'var(--shadow-3)' }}
            >
              <FluidField progress={null} />
              <div className="noise-overlay" />
              {/* a hairline of light at the top edge, the way glass catches it */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              <div className="absolute inset-0 flex items-end justify-center px-6 pb-0 sm:px-10">
                <motion.div
                  className="w-full max-w-[280px]"
                  animate={reduced ? undefined : { y: [0, -6, 0] }}
                  transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
                >
                  <PhoneFrame className="translate-y-6 sm:translate-y-8">
                    <Conversation reduced={!!reduced} />
                  </PhoneFrame>
                </motion.div>
              </div>

              <motion.div
                className="hidden sm:block absolute left-5 top-5 sm:left-7 sm:top-7 max-w-[230px]"
                initial={reduced ? false : { opacity: 0, y: -8 }}
                animate={booked ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.6, ease }}
                aria-hidden={!booked}
              >
                <BookingCard
                  title={demo.pipeline[0].label}
                  line1={`${demo.pipeline[0].detail} · Sara`}
                  line2={`${demo.pipeline[2].label} on WhatsApp`}
                />
              </motion.div>

              <p className="absolute right-5 bottom-4 sm:right-7 sm:bottom-5 font-display text-[11px] font-medium uppercase tracking-[0.16em] text-fg/60">
                Live demo
              </p>
            </div>
          </motion.div>
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
                    <span className="text-fg/45">{n.suffix}</span>
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
