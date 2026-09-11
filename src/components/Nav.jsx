import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { nav } from '../data.js';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

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
        className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10"
      >
        <div className="section-wrap grid grid-cols-[1fr_auto_1fr] items-center h-[72px]">
          <Link to="/" className="justify-self-start flex items-center gap-2.5 group">
            <span className="grid place-items-center w-8 h-8 rounded-md bg-white text-black font-display font-bold text-sm">
              W
            </span>
            <span className="font-display font-semibold text-white text-[17px] tracking-tight">
              Wahafy
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-2" aria-label="Primary">
            {nav.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) => `nav-pill${isActive ? ' active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="justify-self-end flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center rounded-full text-white text-[14px] font-medium px-5 py-2.5 border border-white/25 bg-white/[0.04] backdrop-blur-md hover:border-white/50 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(170,200,255,0.18)] transition-all duration-300"
            >
              Get started
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
                  to="/contact"
                  className="flex items-center justify-center w-full h-14 rounded-[10px] text-[16px] font-medium text-black bg-gradient-to-b from-white via-[#e7e7e7] to-[#cfcfcf]"
                >
                  Get started
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-pill {
          position: relative;
          display: inline-flex;
          align-items: center;
          height: 40px;
          padding: 0 18px;
          border-radius: 7px;
          overflow: hidden;
          border: 1px solid rgba(198,198,198,0.55);
          background: linear-gradient(105deg, #050505 0%, #2a2a2a 48%, #4a4a4a 100%);
          color: #f3f3f3;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: -0.01em;
          white-space: nowrap;
          transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .nav-pill::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.16) 50%, transparent 70%);
          transform: translateX(-120%);
          transition: transform 0.6s ease;
        }
        .nav-pill:hover::before {
          transform: translateX(120%);
        }
        .nav-pill:hover {
          border-color: rgba(235,235,235,0.9);
          background: linear-gradient(105deg, #111 0%, #3a3a3a 45%, #6a6a6a 100%);
          box-shadow: 0 0 18px rgba(200,210,230,0.18);
        }
        .nav-pill.active {
          border-color: rgba(235,235,235,0.9);
          background: linear-gradient(105deg, #161616 0%, #3e3e3e 48%, #6e6e6e 100%);
          color: #ffffff;
        }
        body.menu-open {
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
