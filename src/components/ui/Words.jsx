import { Fragment } from 'react';
import { motion } from 'framer-motion';

// A line of display type that rises into view one word at a time, each word
// lifting out from behind its own baseline. The parent decides when: these
// spans only carry the `hidden` / `visible` variants, so a section heading
// plays when it scrolls into view and the hero plays when the loader lets go.
//
// Only `transform` moves. Under reduced motion the global rule collapses the
// duration, so the words are simply there.

const ease = [0.16, 1, 0.3, 1];

export default function Words({ text, delay = 0, stagger = 0.045, duration = 0.8, className = '' }) {
  const words = String(text).split(' ');
  return words.map((w, i) => (
    <Fragment key={`${w}-${i}`}>
      <span className={`word-clip inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em] ${className}`}>
        <motion.span
          className="inline-block will-change-transform"
          variants={{
            hidden: { y: '108%' },
            visible: { y: 0, transition: { duration, ease, delay: delay + i * stagger } },
          }}
        >
          {w}
        </motion.span>
      </span>
      {i < words.length - 1 ? ' ' : ''}
    </Fragment>
  ));
}
