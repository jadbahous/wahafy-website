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

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-paper/90 backdrop-blur-md border-b border-paper-line"
    >
      <div className="section-wrap flex items-center justify-between h-[72px]">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-8 h-8 rounded-md bg-gold text-white font-display font-bold text-sm">
            W
          </span>
          <span className="font-display font-semibold text-ink text-[17px] tracking-tight">
            Wahafy
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `text-[14.5px] transition-colors duration-200 ${
                  isActive ? 'text-gold-deep' : 'text-ink/65 hover:text-ink'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center rounded-full bg-ink text-paper text-[14px] font-medium px-5 py-2.5 hover:bg-gold transition-colors duration-200"
          >
            Get started
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden grid place-items-center w-10 h-10 rounded-full border border-ink/15 text-ink"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-paper-line bg-paper/95 backdrop-blur-md"
          >
            <div className="section-wrap py-6 flex flex-col gap-1">
              {nav.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `py-3 text-[16px] border-b border-paper-line last:border-b-0 ${
                      isActive ? 'text-gold-deep' : 'text-ink/75'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-ink text-paper text-[14.5px] font-medium px-6 py-3.5"
              >
                Get started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
