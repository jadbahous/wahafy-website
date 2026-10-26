import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link, { NavLink } from './ui/Link.jsx';
import { useCopy, useLocale, counterpart } from '../i18n.jsx';

export default function Nav() {
  const { nav, navCta, ui } = useCopy();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Over the hero the bar is night glass with the white lockup; past it, on
  // the daylight look, it becomes paper glass with the ink lockup. On the
  // night look both states are the same, so nothing changes there.
  const { pathname } = useLocation();
  const other = counterpart(pathname, locale.code);
  const [overHero, setOverHero] = useState(pathname === '/' || pathname === '/ar');

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
    const hero = document.getElementById('hero');
    if (!hero) {
      setOverHero(false);
      return;
    }
    setOverHero(true);
    // The bar is over the hero while any of the hero is still under it —
    // measured against the bar's own height, not the viewport.
    const io = new IntersectionObserver(
      ([e]) => setOverHero(e.isIntersecting),
      { rootMargin: '-72px 0px 0px 0px', threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  const daylight = typeof document !== 'undefined' && document.documentElement.dataset.theme === 'daylight';
  const onDark = !daylight || overHero || open;
  const lockup = onDark ? '/brand/lockup-white@2x.webp' : '/brand/lockup-dark@2x.webp';

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
        className={`${onDark ? 'zone-dark' : ''} fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open ? 'bg-bg/70 backdrop-blur-md border-fg/10' : 'bg-transparent border-transparent'
        }`}
      >
        <div className={`section-wrap grid grid-cols-[1fr_auto_1fr] items-center transition-[height] duration-500 ${scrolled ? 'h-[64px]' : 'h-[72px]'}`}>
          <Link to="/" className="justify-self-start flex items-center group" aria-label="Marhab AI">
            <img
              src={lockup}
              alt="Marhab"
              width="154"
              height="30"
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
            <RouterLink
              to={other}
              hrefLang={locale.code === 'ar' ? 'en' : 'ar'}
              className="lang-switch hidden sm:inline-flex items-center h-[42px] px-3 rounded-full text-[13.5px] font-medium text-fg/75 hover:text-fg border border-transparent hover:border-fg/20 transition-[color,border-color] duration-200"
            >
              {ui.switchTo}
            </RouterLink>
            <Link to={navCta.href} className="btn-primary hidden sm:inline-flex h-[42px] px-5 text-[14px]">
              {navCta.label}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden grid place-items-center w-11 h-11 rounded-full border border-fg/15 text-fg bg-bg/40 hover:border-fg/40 active:scale-95 transition-[border-color,transform] duration-200"
              aria-controls="mobile-nav"
              aria-expanded={open}
              aria-label={open ? ui.closeMenu : ui.openMenu}
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
            className="md:hidden fixed inset-0 z-40 bg-bg/80 backdrop-blur-2xl"
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
                    className={({ isActive }) =>
                      `flex items-center justify-center w-full h-14 rounded-full font-display text-[19px] border transition-[border-color,background-color,color,transform] duration-200 active:scale-[0.985] ${
                        isActive ? 'text-fg border-fg/30 bg-fg/[0.06]' : 'text-fg/85 border-fg/10 bg-fg/[0.03] hover:border-fg/30 hover:text-fg'
                      }`
                    }
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
                <Link to={navCta.href} className="btn-primary flex w-full h-14 text-[16px]">
                  {navCta.label}
                </Link>
                <RouterLink
                  to={other}
                  hrefLang={locale.code === 'ar' ? 'en' : 'ar'}
                  className="mt-5 flex items-center justify-center w-full h-11 rounded-full text-[15px] font-medium text-fg/75 hover:text-fg"
                >
                  {ui.switchTo}
                </RouterLink>
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
          color: rgb(var(--fg) / 0.72);
          font-size: 14.5px;
          font-weight: 500;
          letter-spacing: 0;
          font-family: var(--font-nav, inherit);
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
          color: rgb(var(--fg));
          outline: none;
        }
        .nav-link:hover::after,
        .nav-link:focus-visible::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        .nav-link.active {
          color: rgb(var(--fg));
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
