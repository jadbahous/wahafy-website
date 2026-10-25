import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Inbox, CalendarCheck, Repeat, Send, Star, BarChart3 } from 'lucide-react';
import { outcomes } from '../data.js';
import { fadeUp, viewportOnce } from '../lib/motion.js';
import SectionHeading from './SectionHeading.jsx';

const icons = [Inbox, CalendarCheck, Repeat, Send, Star, BarChart3];

// Six business outcomes. Cards carry a soft spotlight that follows the
// cursor — the one "responds to the mouse" moment on the page, kept quiet.
function SpotlightCard({ children, className = '' }) {
  const ref = useRef(null);
  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }
  return (
    <div ref={ref} onMouseMove={onMove} className={`spot group relative rounded-2xl surface-1 overflow-hidden ${className}`}>
      <div className="spot-glow pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative">{children}</div>
    </div>
  );
}

export default function Outcomes() {
  return (
    <section className="bg-bg text-fg py-28 md:py-36">
      <div className="section-wrap">
        <SectionHeading heading={outcomes.heading} sub={outcomes.sub} max="21ch" subMax="60ch" className="mb-14 md:mb-20" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {outcomes.items.map((o, i) => {
            const Icon = icons[i];
            return (
              <motion.div key={o.title} variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                <SpotlightCard className="h-full p-7 md:p-8">
                  <span className="inline-grid place-items-center w-10 h-10 rounded-full border border-fg/[0.12] bg-fg/[0.03] text-fg/85 group-hover:text-fg group-hover:border-fg/30 transition-colors duration-300">
                    <Icon className="w-[18px] h-[18px]" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-6 font-display font-semibold text-[19px] leading-snug text-fg">{o.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-fg/70">{o.text}</p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .spot-glow {
          background: radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--spot) / 0.09), transparent 60%);
        }
        .spot { transition: box-shadow .4s cubic-bezier(0.32, 0.72, 0, 1); }
        .spot:hover { box-shadow: var(--shadow-2); }
      `}</style>
    </section>
  );
}
