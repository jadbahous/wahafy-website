import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useCopy } from '../i18n.jsx';

// "Skip intro": the one way out of the opening, so it is never skipped by
// accident. A quiet pill in the top corner (opposite the clock), above the
// loader and the close-up, from shortly after the opening starts until the
// window begins to zoom out. Drawn in the night material, like everything
// it sits on.
export default function SkipIntro({ show, onSkip }) {
  const { ui } = useCopy();
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="skip"
          type="button"
          onClick={onSkip}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 } }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          className="zone-dark fixed z-[101] top-[19px] end-3 md:top-[17px] md:end-8 inline-flex items-center gap-1.5 md:gap-2 h-9 md:h-10 ps-3.5 pe-3 md:ps-4 md:pe-3.5 rounded-full border border-fg/20 bg-fg/[0.04] text-[12.5px] md:text-[13.5px] font-medium text-fg/80 transition-[background-color,border-color,color,transform] duration-200 hover:bg-fg/[0.1] hover:border-fg/35 hover:text-fg active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
        >
          <span className="md:hidden">{ui.skipIntroShort}</span>
          <span className="hidden md:inline">{ui.skipIntro}</span>
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" strokeWidth={2} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
