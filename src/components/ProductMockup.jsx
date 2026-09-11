import { motion, useTransform } from 'framer-motion';

// A code-built "browser window" showing what Wahafy actually ships — not a
// stock dashboard screenshot. Colors match the real Pearl & Bloom pilot
// (sage green on cream) so it reads as genuine client work, not a template.
// The chat bubble and "lead captured" toast resolve in as you scroll,
// visualizing the exact thing the copy promises: an enquiry becoming a
// booked lead automatically.

export default function ProductMockup({ scrollYProgress, prefersReducedMotion }) {
  const rotate = useTransform(scrollYProgress, [0, 0.5], [prefersReducedMotion ? 0 : 20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.93, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0.6, 1]);
  const lift = useTransform(scrollYProgress, [0, 0.5], [prefersReducedMotion ? 0 : 26, 0]);

  const widgetOpacity = useTransform(scrollYProgress, [0.14, 0.36], [0, 1]);
  const widgetY = useTransform(scrollYProgress, [0.14, 0.36], [prefersReducedMotion ? 0 : 14, 0]);

  const toastOpacity = useTransform(scrollYProgress, [0.28, 0.52], [0, 1]);
  const toastY = useTransform(scrollYProgress, [0.28, 0.52], [prefersReducedMotion ? 0 : -12, 0]);

  return (
    <div
      style={{ perspective: 1600 }}
      className="w-full max-w-[860px] mx-auto mt-10 md:mt-12 px-2"
    >
      <motion.div
        style={{ rotateX: rotate, scale, opacity, y: lift, transformOrigin: 'center bottom' }}
        className="relative"
      >
        {/* ambient glow behind the frame */}
        <div
          className="absolute -inset-8 md:-inset-14 rounded-[48px] blur-3xl -z-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(79,124,108,0.4), transparent 70%)' }}
        />

        <div className="rounded-2xl border border-black/10 bg-[#F3F5F2] shadow-[0_50px_100px_-25px_rgba(0,0,0,0.65)] overflow-hidden">
          {/* browser chrome */}
          <div className="h-9 flex items-center gap-1.5 px-4 bg-[#E7EBE5] border-b border-black/5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-3 text-[11px] text-black/40 truncate">pearl-and-bloom-demo.vercel.app</span>
          </div>

          {/* simplified page body, real client palette */}
          <div className="relative aspect-[16/9.5] bg-gradient-to-b from-[#4F7C6C]/12 to-[#FAFAF8] p-5 sm:p-7 md:p-10">
            <div className="flex items-center justify-between mb-7 md:mb-11">
              <div className="h-3 w-16 md:w-20 rounded-full bg-[#16231F]/15" />
              <div className="hidden sm:flex items-center gap-3">
                <div className="h-3 w-10 rounded-full bg-[#16231F]/10" />
                <div className="h-3 w-10 rounded-full bg-[#16231F]/10" />
                <div className="h-6 w-16 rounded-full bg-[#4F7C6C]/70" />
              </div>
            </div>

            <div className="max-w-[75%] sm:max-w-[60%]">
              <div className="h-3.5 w-24 rounded-full bg-[#4F7C6C]/40 mb-3.5" />
              <div className="h-5 md:h-7 w-full rounded-lg bg-[#16231F]/20 mb-2" />
              <div className="h-5 md:h-7 w-4/5 rounded-lg bg-[#16231F]/20 mb-4" />
              <div className="h-2.5 w-full rounded bg-[#16231F]/10 mb-1.5" />
              <div className="h-2.5 w-5/6 rounded bg-[#16231F]/10 mb-5" />
              <div className="h-8 w-28 rounded-full bg-[#4F7C6C]" />
            </div>

            {/* chat widget */}
            <motion.div
              style={{ opacity: widgetOpacity, y: widgetY }}
              className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 w-[178px] sm:w-[210px] rounded-2xl bg-[#16231F] shadow-xl p-3 sm:p-3.5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gold flex items-center justify-center text-white text-[9px] sm:text-[10px] font-bold shrink-0">
                  W
                </span>
                <span className="text-[10px] sm:text-[11px] text-white/70 truncate">Pearl &amp; Bloom Assist</span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-white/85 bg-white/10 rounded-lg rounded-tl-sm px-2 sm:px-2.5 py-1.5 sm:py-2 mb-1.5 sm:mb-2 leading-snug">
                Want to book a whitening consult this week?
              </div>
              <div className="text-[10px] sm:text-[11px] text-white bg-gold rounded-lg rounded-tr-sm px-2 sm:px-2.5 py-1.5 sm:py-2 ml-auto w-fit">
                Thursday works
              </div>
            </motion.div>

            {/* lead-captured toast */}
            <motion.div
              style={{ opacity: toastOpacity, y: toastY }}
              className="absolute top-5 right-5 sm:top-8 sm:right-8 rotate-[-3deg] bg-white rounded-xl shadow-lg px-3 py-2 sm:px-3.5 sm:py-2.5 flex items-center gap-2 sm:gap-2.5"
            >
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#4F7C6C]/15 grid place-items-center shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#4F7C6C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p className="text-[10.5px] sm:text-[11.5px] font-medium text-ink leading-tight">New lead captured</p>
                <p className="text-[9.5px] sm:text-[10.5px] text-ink/45 leading-tight">Sarah M. · just now</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
