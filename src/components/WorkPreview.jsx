import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { work } from '../data.js';
import { fadeUp, viewportOnce } from '../lib/motion.js';
import SectionHeading from './SectionHeading.jsx';
import { BrowserFrame, BookingCard } from './ui/mock.jsx';

export function JourneyChips({ steps, className = '' }) {
  return (
    <ol className={`flex flex-wrap items-center gap-y-2 ${className}`}>
      {steps.map((s, i) => (
        <li key={s} className="flex items-center">
          <span className="text-[13.5px] px-2.5 py-1 rounded-full border border-white/[0.12] bg-white/[0.03] text-white/75 whitespace-nowrap">
            {s}
          </span>
          {i < steps.length - 1 && <span className="mx-1.5 text-white/25 text-[13px]">→</span>}
        </li>
      ))}
    </ol>
  );
}

export function DemoTag() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium tracking-[0.12em] uppercase text-white/70 border border-white/[0.14] rounded-full px-2.5 py-1">
      <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
      {work.demoLabel}
    </span>
  );
}

// Work preview: what each demo system does, not just a screenshot.
export default function WorkPreview() {
  return (
    <section className="bg-ink text-white py-28 md:py-36 border-t border-white/[0.08]">
      <div className="section-wrap">
        <SectionHeading eyebrow={work.eyebrow} heading={work.heading} cta={{ label: 'See the full case studies', href: '/work' }} max="17ch" className="mb-14 md:mb-20" />

        <div className="grid md:grid-cols-2 gap-5">
          {work.projects.map((p, i) => (
            <motion.div key={p.slug} variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <Link
                to={`/work#${p.slug}`}
                className="group block h-full rounded-[22px] border border-white/[0.1] bg-panel/70 p-6 md:p-7 hover:border-white/30 transition-colors duration-300"
              >
                <div className="relative">
                  <BrowserFrame src={p.image} alt={p.imageAlt} className="transition-transform duration-500 ease-out group-hover:-translate-y-1" />
                  <div className="absolute -bottom-4 right-4 w-[62%] sm:w-[52%] transition-transform duration-500 ease-out group-hover:-translate-y-2">
                    <BookingCard title={p.mock.booking.title} line1={p.mock.booking.line1} line2={p.mock.booking.line2} />
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-between gap-4">
                  <span className="text-[13px] tracking-[0.12em] uppercase text-white/55">{p.type} · {p.tier}</span>
                  <DemoTag />
                </div>
                <h3 className="mt-3 font-display font-semibold text-[24px] leading-tight tracking-[-0.02em]">{p.name}</h3>
                <JourneyChips steps={p.journey} className="mt-5" />
                <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-white/80 group-hover:text-white transition-colors duration-200">
                  View the system
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
