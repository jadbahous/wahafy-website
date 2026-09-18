import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { nav, navCta } from '../data.js';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Transparent over the hero; a quiet dark glass once the page moves.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    function onResize() {
      if (window.innerWidth >= 901) setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.classList.remove('menu-open');
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open ? 'bg-black/70 backdrop-blur-md border-white/10' : 'bg-transparent border-transparent'
        }`}
      >
        <div className={`section-wrap grid grid-cols-[1fr_auto_1fr] items-center transition-[height] duration-500 ${scrolled ? 'h-[64px]' : 'h-[72px]'}`}>
          <Link to="/" className="justify-self-start flex items-center group" aria-label="Marhab AI — home">
            <img
              src="/brand/lockup-white.png"
              alt="Marhab"
              className="h-[30px] w-auto select-none"
              draggable="false"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Primary">
            {nav.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="justify-self-end flex items-center gap-3">
            <Link
              to={navCta.href}
              className="hidden sm:inline-flex items-center rounded-full text-black text-[14px] font-medium px-5 py-2.5 bg-gradient-to-b from-white via-[#e7e7e7] to-[#cfcfcf] border border-white hover:shadow-[0_0_20px_rgba(186,208,255,0.35)] active:scale-[0.98] transition-[box-shadow,transform] duration-300"
            >
              {navCta.label}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden grid place-items-center w-10 h-10 rounded-md border border-white/15 text-white bg-black/40"
              aria-controls="mobile-nav"
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-2xl"
          >
            <nav
              id="mobile-nav"
              aria-label="Primary"
              className="h-full flex flex-col items-center justify-center gap-3 px-6"
            >
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[320px]"
                >
                  <NavLink
                    to={item.href}
                    className="flex items-center justify-center w-full h-14 rounded-[10px] text-[19px] text-white/85 border border-white/10 bg-white/[0.03]"
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 + nav.length * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[320px] mt-3"
              >
                <Link
                  to={navCta.href}
                  className="flex items-center justify-center w-full h-14 rounded-[10px] text-[16px] font-medium text-black bg-gradient-to-b from-white via-[#e7e7e7] to-[#cfcfcf]"
                >
                  {navCta.label}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          height: 40px;
          padding: 0 2px;
          color: rgba(255,255,255,0.68);
          font-size: 14.5px;
          font-weight: 450;
          letter-spacing: -0.005em;
          white-space: nowrap;
          transition: color 0.25s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 9px;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-link:hover,
        .nav-link:focus-visible {
          color: #ffffff;
          outline: none;
        }
        .nav-link:hover::after,
        .nav-link:focus-visible::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        .nav-link.active {
          color: #ffffff;
        }
        .nav-link.active::after {
          transform: scaleX(1);
          opacity: 0.5;
        }
        body.menu-open {
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
