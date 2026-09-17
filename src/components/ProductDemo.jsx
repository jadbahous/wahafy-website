import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { RotateCcw, MessageCircle } from 'lucide-react';
import { demo } from '../data.js';
import { EASE, fadeUp, viewportOnce } from '../lib/motion.js';
import SectionHeading from './SectionHeading.jsx';
import { Panel, Bubble, TypingDots, StatusRow } from './ui/mock.jsx';

// The product, in fifteen seconds. When the panel scrolls into view the
// conversation plays itself — typing pauses included — and as the booking
// lands, the pipeline on the right checks off what just happened behind
// the scenes for the customer. Reduced motion shows the finished state.

const TYPING_MS = 900;
const READ_MS = 700;
const PIPE_MS = 520;

export default function ProductDemo() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-25% 0px -25% 0px' });
  const total = demo.conversation.length;
  const pipeTotal = demo.pipeline.length;

  // shown: number of messages visible; typing: assistant is composing; done: pipeline steps completed
  const [shown, setShown] = useState(prefersReducedMotion ? total : 0);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(prefersReducedMotion ? pipeTotal : 0);
  const [run, setRun] = useState(0);
  const listRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion || !inView) return;
    let cancelled = false;
    const timers = [];
    const wait = (ms) => new Promise((r) => timers.push(setTimeout(r, ms)));

    (async () => {
      setShown(0);
      setDone(0);
      setTyping(false);
      await wait(350);
      for (let i = 0; i < total; i++) {
        if (cancelled) return;
        const msg = demo.conversation[i];
        if (msg.role === 'marhab') {
          setTyping(true);
          await wait(TYPING_MS);
          if (cancelled) return;
          setTyping(false);
        }
        setShown(i + 1);
        await wait(msg.role === 'customer' ? READ_MS : READ_MS + 300);
      }
      for (let j = 0; j < pipeTotal; j++) {
        if (cancelled) return;
        setDone(j + 1);
        await wait(PIPE_MS);
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, run, prefersReducedMotion, total, pipeTotal]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shown, typing]);

  const finished = done >= pipeTotal;

  function openChat() {
    window.dispatchEvent(new CustomEvent('marhab:open-chat'));
  }

  return (
    <section id="demo" className="relative bg-ink text-white py-28 md:py-36 border-t border-white/[0.08] scroll-mt-16">
      <div className="section-wrap">
        <SectionHeading eyebrow={demo.eyebrow} heading={demo.heading} sub={demo.sub} max="52ch" className="mb-14 md:mb-20" />

        <div ref={ref} className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Conversation */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-7"
          >
            <Panel title={demo.business} sub="AI reception · replies in seconds">
              <div ref={listRef} className="h-[380px] sm:h-[400px] overflow-y-auto px-4 py-5 flex flex-col gap-2.5 mock-scroll">
                <AnimatePresence initial={false}>
                  {demo.conversation.slice(0, shown).map((m, i) => (
                    <motion.div
                      key={`${run}-${i}`}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <Bubble role={m.role}>{m.text}</Bubble>
                    </motion.div>
                  ))}
                  {typing && (
                    <motion.div
                      key={`typing-${run}-${shown}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.12 } }}
                      transition={{ duration: 0.25 }}
                    >
                      <TypingDots />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex items-center gap-2 px-3 py-3 border-t border-white/[0.08]">
                <div className="flex-1 h-[40px] rounded-full border border-white/[0.12] bg-white/[0.03] px-4 text-[13px] text-white/30 flex items-center">
                  Type a message…
                </div>
                <span className="grid place-items-center w-[40px] h-[40px] rounded-full bg-white/[0.08] text-white/40">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </div>
            </Panel>
          </motion.div>

          {/* Pipeline */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            <div className="rounded-[22px] border border-white/[0.12] bg-[#0b0b0b] px-6 py-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">What just happened</p>
                <span className={`text-[11px] tabular-nums transition-colors duration-300 ${finished ? 'text-[#9fe7bb]' : 'text-white/30'}`}>
                  {done}/{pipeTotal}
                </span>
              </div>
              <div className="divide-y divide-white/[0.06]">
                {demo.pipeline.map((p, i) => (
                  <StatusRow
                    key={p.label}
                    label={p.label}
                    detail={p.detail}
                    state={i < done ? 'done' : i === done && shown === total && !finished ? 'active' : 'idle'}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={openChat}
                className="inline-flex items-center gap-2 h-[44px] px-5 rounded-full bg-white text-black text-[14px] font-medium hover:shadow-[0_0_22px_rgba(186,208,255,0.3)] active:scale-[0.98] transition-[box-shadow,transform] duration-300"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.8} />
                {demo.tryLabel}
              </button>
              {!prefersReducedMotion && (
                <button
                  type="button"
                  onClick={() => setRun((r) => r + 1)}
                  disabled={!finished}
                  className="inline-flex items-center gap-2 h-[44px] px-5 rounded-full border border-white/20 text-[14px] text-white/75 hover:text-white hover:border-white/50 disabled:opacity-35 disabled:cursor-default transition-[color,border-color,opacity] duration-300"
                >
                  <RotateCcw className="w-4 h-4" strokeWidth={1.8} />
                  {demo.replayLabel}
                </button>
              )}
            </div>
            <p className="text-[13px] leading-relaxed text-white/40 max-w-[40ch]">
              The same reception runs on this site. Ask it anything about your business — it’s the experience your customers would get.
            </p>
          </motion.div>
        </div>
      </div>

      <style>{`
        .mock-dots { display: inline-flex; gap: 4px; }
        .mock-dots span { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.7); opacity: .3; animation: mockBlink 1.1s infinite ease-in-out; }
        .mock-dots span:nth-child(2) { animation-delay: .15s; }
        .mock-dots span:nth-child(3) { animation-delay: .3s; }
        @keyframes mockBlink { 0%, 80%, 100% { opacity: .25; } 40% { opacity: .9; } }
        .mock-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.12) transparent; }
        .mock-scroll::-webkit-scrollbar { width: 6px; }
        .mock-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 999px; }
      `}</style>
    </section>
  );
}
