import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { work } from '../data.js';
import { EASE, fadeUp, viewportOnce } from '../lib/motion.js';
import SectionHeading from './SectionHeading.jsx';
import { BrowserFrame, BookingCard } from './ui/mock.jsx';

export function JourneyChips({ steps, className = '' }) {
  return (
    <ol className={`flex flex-wrap items-center gap-y-2 ${className}`}>
      {steps.map((s, i) => (
        <li key={s} className="flex items-center">
          <span className="text-[13.5px] px-2.5 py-1 rounded-full border border-fg/[0.12] bg-fg/[0.03] text-fg/80 whitespace-nowrap">
            {s}
          </span>
          {i < steps.length - 1 && <span className="mx-1.5 text-fg/30 text-[13px]">→</span>}
        </li>
      ))}
    </ol>
  );
}

export function DemoTag() {
  return (
    <span className="inline-flex items-center font-display text-[11.5px] font-medium tracking-[0.12em] uppercase text-fg/75 border border-fg/[0.16] rounded-full px-2.5 py-1">
      {work.demoLabel}
    </span>
  );
}

// Work preview: each demo system shown through its own window of night, the
// same device-in-the-dark motif as the hero, so the page carries one idea
// from top to bottom. As the card scrolls in, the site rises into the window
// and the booking that came out of it drops in above: cause, then effect.
export default function WorkPreview() {
  return (
    <section className="bg-matte text-fg py-28 md:py-36">
      <div className="section-wrap">
        <SectionHeading heading={work.heading} cta={{ label: 'See the full case studies', href: '/work' }} max="17ch" className="mb-14 md:mb-20" />

        <div className="grid md:grid-cols-2 gap-6">
          {work.projects.map((p, i) => (
            <motion.div key={p.slug} variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <Link to={`/work#${p.slug}`} className="group block h-full rounded-[24px] surface-1 surface-lift p-2.5">
                <div className="night-window zone-dark relative rounded-[16px] aspect-[16/11] overflow-hidden">
                  <div className="noise-overlay" />
                  <div className="absolute left-[24%] -right-[7%] -bottom-[14%] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-2">
                    <motion.div variants={{ hidden: { y: 64, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.95, ease: EASE, delay: 0.1 } } }}>
                      <BrowserFrame src={p.image} alt={p.imageAlt} />
                    </motion.div>
                  </div>
                  <div className="absolute left-5 top-5 w-[58%] max-w-[240px] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1">
                    <motion.div variants={{ hidden: { y: -14, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE, delay: 0.6 } } }}>
                      <BookingCard title={p.mock.booking.title} line1={p.mock.booking.line1} line2={p.mock.booking.line2} />
                    </motion.div>
                  </div>
                </div>

                <div className="px-4 sm:px-5 pt-6 pb-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-[12.5px] font-medium tracking-[0.12em] uppercase text-fg/65">{p.type} · {p.tier}</span>
                    <DemoTag />
                  </div>
                  <h3 className="mt-3 font-display font-semibold text-[24px] leading-tight tracking-[-0.02em] text-fg">{p.name}</h3>
                  <JourneyChips steps={p.journey} className="mt-5" />
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-fg/85 group-hover:text-fg transition-colors duration-200">
                    View the system
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" strokeWidth={1.8} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
