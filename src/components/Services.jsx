import { motion } from 'framer-motion';
import Link from './ui/Link.jsx';
import { Check as CheckIcon } from 'lucide-react';
import { useCopy } from '../i18n.jsx';
import { fadeUp, viewportOnce } from '../lib/motion.js';
import SectionHeading from './SectionHeading.jsx';

function Check() {
  return <CheckIcon className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={2} />;
}

// Services: five categories organised around what a business receives —
// each one a row with the outcome on the left and the capabilities on the
// right — followed by the two plans.
export default function Services() {
  const { services, ui } = useCopy();
  return (
    <>
      <section id="services" className="bg-bg text-fg pt-36 md:pt-44 pb-24 md:pb-32">
        <div className="section-wrap">
          <SectionHeading eyebrow={services.eyebrow} heading={services.heading} sub={services.sub} max="16ch" subMax="58ch" className="mb-16 md:mb-24" />

          <div className="border-t border-fg/10">
            {services.categories.map((c, i) => (
              <motion.div
                key={c.n}
                variants={fadeUp}
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="grid lg:grid-cols-12 gap-8 lg:gap-10 py-12 md:py-16 border-b border-fg/10"
              >
                <div className="lg:col-span-5">
                  <span aria-hidden="true" data-n={c.n} className="numeral block font-display font-semibold text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-[-0.03em] text-fg/15 mb-5" />
                  <h3 className="font-display font-semibold text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.05] tracking-[-0.03em]">{c.title}</h3>
                  <p className="mt-4 text-[16.5px] leading-[1.6] text-fg/70 max-w-[40ch]">{c.lead}</p>
                </div>
                <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-x-8 gap-y-3.5 lg:pt-[4.6rem]">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[15px] text-fg/80">
                      <span className="text-fg/60">
                        <Check />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="bg-bg text-fg py-24 md:py-32 border-t border-fg/[0.08] scroll-mt-16">
        <div className="section-wrap">
          <SectionHeading eyebrow={services.tiersEyebrow} heading={services.tiersHeading} sub={services.tiersSub} max="16ch" subMax="52ch" className="mb-16" />

          <div className="grid md:grid-cols-2 gap-6">
            {services.tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className={`relative rounded-[22px] p-8 md:p-9 flex flex-col ${tier.highlight ? 'surface-3' : 'surface-1'}`}
              >
                {tier.highlight && (
                  <span className="btn-primary absolute -top-3.5 start-8 md:start-9 h-7 px-3 font-display text-[12px] tracking-[0.08em] uppercase pointer-events-none">
                    {ui.mostPopular}
                  </span>
                )}

                <h3 className="font-display font-semibold text-[24px]">{tier.name}</h3>
                <p className="mt-1.5 text-[15.5px] text-fg/70">{tier.tagline}</p>

                {tier.price && (
                  <div className="mt-7 pt-7 border-t border-fg/10">
                    <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
                      <div>
                        <p className="font-display text-[12px] font-medium uppercase tracking-[0.16em] text-fg/65 mb-1.5">{ui.from}</p>
                        <p className="font-display font-semibold text-[clamp(2rem,3.4vw,2.6rem)] leading-none tracking-[-0.035em] text-fg">
                          {tier.price.setup}
                          <span className="ms-1.5 font-body text-[14px] font-medium tracking-normal text-fg/70">{ui.qar}</span>
                        </p>
                        <p className="mt-1.5 text-[13.5px] text-fg/65">{ui.oneTime}</p>
                      </div>
                      <div className="pb-[3px]">
                        <p className="font-display text-[12px] font-medium uppercase tracking-[0.16em] text-fg/65 mb-1.5">{ui.then}</p>
                        <p className="font-display font-semibold text-[22px] leading-none tracking-[-0.03em] text-fg/85">
                          {tier.price.monthly}
                          <span className="ms-1 font-body text-[13.5px] font-medium tracking-normal text-fg/70">{ui.qarMonth}</span>
                        </p>
                        <p className="mt-1.5 text-[13.5px] text-fg/65">{ui.twelveMonths}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-[14px] leading-relaxed text-fg/65 max-w-[40ch]">
                      <span className="text-fg/80">{ui.monthlyCovers}</span> {tier.monthlyCovers}
                    </p>
                  </div>
                )}

                <ul className="mt-8 space-y-3.5 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[15px] text-fg/80">
                      <span className={tier.highlight ? 'text-fg' : 'text-fg/60'}>
                        <Check />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link to={tier.cta.href} className={`${tier.highlight ? 'btn-primary' : 'btn-secondary'} mt-9 h-[50px] px-6 text-[14.5px]`}>
                  {tier.cta.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {services.note && (
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="mt-10 pt-8 border-t border-fg/10 grid md:grid-cols-3 gap-6 md:gap-10"
            >
              {(Array.isArray(services.note) ? services.note : [services.note]).map((n, i) => (
                <p key={i} className="text-[14.5px] leading-relaxed text-fg/65 max-w-[44ch]">
                  {n}
                </p>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
