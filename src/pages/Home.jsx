import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import AuroraField from '../components/AuroraField.jsx';
import { explore } from '../data.js';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Explore() {
  return (
    <section className="bg-ink text-white py-28 md:py-36">
      <div className="section-wrap">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="font-display text-[13px] tracking-[0.16em] uppercase text-gold mb-5"
        >
          Explore
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {explore.map((item, i) => (
            <motion.div
              key={item.href}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <Link
                to={item.href}
                className="group block h-full rounded-2xl border border-line bg-panel/60 p-8 hover:border-white/30 hover:bg-panel transition-colors duration-300"
              >
                <span className="text-[12px] font-medium tracking-[0.14em] uppercase text-gold">
                  {item.label}
                </span>
                <h3 className="mt-4 font-display font-semibold text-[21px] leading-snug">{item.heading}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/55">{item.text}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-white/80 group-hover:text-gold transition-colors duration-200">
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="relative bg-ink text-white py-32 md:py-44 border-t border-line overflow-hidden">
      <div className="absolute inset-0 opacity-70">
        <AuroraField />
      </div>
      <div className="noise-overlay" />

      <div className="section-wrap relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="font-display font-semibold text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.02] tracking-[-0.035em] max-w-[16ch]"
        >
          Ready to see it on your business?
        </motion.h2>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-gradient-to-b from-white via-[#e7e7e7] to-[#cfcfcf] text-black border border-white text-[15px] font-medium px-7 py-3.5 hover:shadow-[0_0_22px_rgba(186,208,255,0.3)] transition-all duration-300"
          >
            Get my free demo
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Explore />
      <CtaBand />
    </>
  );
}
