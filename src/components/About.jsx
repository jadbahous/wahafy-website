import { motion } from 'framer-motion';
import { about } from '../data.js';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const icons = [
  <path key="1" d="M12 2 3 7v6c0 5 4 8.5 9 9 5-.5 9-4 9-9V7l-9-5Z" />,
  <path key="2" d="M4 12h16M12 4v16" />,
  <path key="3" d="M6 18c0-4 2-9 6-9s6 5 6 9M6 9l6-6 6 6" />,
];

export default function About() {
  return (
    <section id="about" className="bg-paper text-ink py-28 md:py-36">
      <div className="section-wrap grid md:grid-cols-12 gap-12 md:gap-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="md:col-span-5"
        >
          <p className="font-display text-[13px] tracking-[0.16em] uppercase text-gold-deep mb-5">
            {about.eyebrow}
          </p>
          <h2 className="font-display font-semibold text-[34px] md:text-[42px] leading-[1.08] tracking-tight max-w-[13ch]">
            {about.heading}
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed text-ink/60 max-w-[46ch]">{about.body}</p>
        </motion.div>

        <div className="md:col-span-7 grid sm:grid-cols-2 gap-5">
          {about.pillars.map((p, i) => (
            <motion.div
              key={p.title}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className={`rounded-2xl border border-paper-line bg-white p-7 ${i === 2 ? 'sm:col-span-2' : ''}`}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#395A4E"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-4"
              >
                {icons[i]}
              </svg>
              <h3 className="font-display font-semibold text-[17px] mb-2">{p.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-ink/55">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
