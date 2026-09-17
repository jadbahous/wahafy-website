import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { work } from '../data.js';
import { fadeUp, viewportOnce } from '../lib/motion.js';
import SectionHeading from './SectionHeading.jsx';
import { BrowserFrame, PhoneFrame, Panel, Bubble, BookingCard } from './ui/mock.jsx';
import { JourneyChips, DemoTag } from './WorkPreview.jsx';

// Each project is a mini case study: the challenge, the experience, the
// journey, and the interfaces a customer would actually touch. Demo systems
// are labelled as such; nothing here pretends to be a paying client.
export default function Work() {
  return (
    <section id="work" className="bg-ink text-white pt-36 md:pt-44 pb-24 md:pb-32">
      <div className="section-wrap">
        <SectionHeading eyebrow={work.eyebrow} heading={work.heading} sub={work.sub} max="17ch" subMax="58ch" className="mb-16 md:mb-24" />

        <div className="flex flex-col gap-20 md:gap-28">
          {work.projects.map((p, i) => (
            <article key={p.slug} id={p.slug} className="scroll-mt-24">
              {/* Header */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="flex flex-wrap items-center gap-3 mb-5">
                <DemoTag />
                <span className="text-[12px] tracking-[0.12em] uppercase text-white/40">
                  {p.type} · {p.location} · {p.tier}
                </span>
              </motion.div>
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 mb-10 md:mb-14">
                <motion.h3
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="lg:col-span-6 font-display font-semibold text-[clamp(1.9rem,4vw,3rem)] leading-[1.02] tracking-[-0.035em]"
                >
                  {p.name}
                </motion.h3>
                <motion.p
                  variants={fadeUp}
                  custom={1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="lg:col-span-6 text-[16px] leading-relaxed text-white/55 max-w-[52ch] lg:pt-2"
                >
                  {p.description}
                </motion.p>
              </div>

              {/* Visuals */}
              <motion.div
                variants={fadeUp}
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="grid lg:grid-cols-12 gap-5 items-end"
              >
                <div className="lg:col-span-7">
                  <BrowserFrame src={p.image} alt={p.imageAlt} />
                </div>
                <div className="lg:col-span-5 grid grid-cols-[1fr_1.1fr] sm:grid-cols-2 lg:grid-cols-[1fr_1.15fr] gap-4 items-end">
                  <PhoneFrame>
                    <div className="relative aspect-[9/16] bg-[#111]">
                      <img src={p.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      <div className="absolute left-3 right-3 bottom-3">
                        <BookingCard title={p.mock.booking.title} line1={p.mock.booking.line1} line2={p.mock.booking.line2} />
                      </div>
                    </div>
                  </PhoneFrame>
                  <Panel title={p.name.split(' ').slice(0, 3).join(' ')} sub="AI reception">
                    <div className="px-3.5 py-4 flex flex-col gap-2.5">
                      {p.mock.chat.map((m, k) => (
                        <Bubble key={k} role={m.role}>{m.text}</Bubble>
                      ))}
                    </div>
                  </Panel>
                </div>
              </motion.div>

              {/* Story */}
              <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden mt-8 md:mt-10">
                <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={viewportOnce} className="bg-ink p-7 md:p-9">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/40 mb-4">The challenge</p>
                  <p className="text-[15px] leading-relaxed text-white/70">{p.challenge}</p>
                </motion.div>
                <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={viewportOnce} className="bg-ink p-7 md:p-9">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/40 mb-4">The experience</p>
                  <p className="text-[15px] leading-relaxed text-white/70">{p.experience}</p>
                </motion.div>
              </div>

              <motion.div
                variants={fadeUp}
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/40 mb-3">The customer journey</p>
                  <JourneyChips steps={p.journey} />
                </div>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 self-start md:self-auto rounded-full border border-white/25 bg-white/[0.04] text-white text-[14px] font-medium px-5 h-[44px] hover:border-white/50 hover:bg-white/[0.08] active:scale-[0.98] transition-[border-color,background-color,transform] duration-300"
                >
                  Open the live demo
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </motion.div>

              {i < work.projects.length - 1 && <div className="mt-20 md:mt-28 border-t border-white/10" />}
            </article>
          ))}
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="mt-20 text-[13px] leading-relaxed text-white/40 max-w-[60ch]"
        >
          {work.future}
        </motion.p>
      </div>
    </section>
  );
}
