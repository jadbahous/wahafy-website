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
    <div ref={ref} onMouseMove={onMove} className={`spot group relative rounded-2xl border border-white/[0.1] bg-panel/70 overflow-hidden ${className}`}>
      <div className="spot-glow pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative">{children}</div>
    </div>
  );
}

export default function Outcomes() {
  return (
    <section className="bg-ink text-white py-28 md:py-36 border-t border-white/[0.08]">
      <div className="section-wrap">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 mb-14 md:mb-20">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow={outcomes.eyebrow} heading={outcomes.heading} max="18ch" />
          </div>
          <motion.p
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-5 lg:pt-14 text-[16px] leading-relaxed text-white/55 max-w-[44ch]"
          >
            {outcomes.sub}
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {outcomes.items.map((o, i) => {
            const Icon = icons[i];
            return (
              <motion.div key={o.title} variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                <SpotlightCard className="h-full p-7 md:p-8">
                  <span className="inline-grid place-items-center w-10 h-10 rounded-full border border-white/[0.12] bg-white/[0.03] text-white/80 group-hover:text-white group-hover:border-white/30 transition-colors duration-300">
                    <Icon className="w-[18px] h-[18px]" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-6 font-display font-semibold text-[19px] leading-snug text-white">{o.title}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/55">{o.text}</p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .spot-glow {
          background: radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(190,205,255,0.10), transparent 60%);
        }
        .spot { transition: border-color .3s ease; }
        .spot:hover { border-color: rgba(255,255,255,0.22); }
      `}</style>
    </section>
  );
}
