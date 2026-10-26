import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import { useLocale, counterpart } from '../i18n.jsx';
import { installMagnetic } from '../lib/magnetic.js';

const ChatWidget = lazy(() => import('./ChatWidget.jsx'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Give the incoming page a frame to mount before jumping to an anchor.
      const t = setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
        else window.scrollTo(0, 0);
      }, 60);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  const { pathname } = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const locale = useLocale();
  // Route changes after the first one draw a night curtain over the swap.
  const firstPath = useRef(pathname);
  const curtain = pathname !== firstPath.current && !prefersReducedMotion;

  useEffect(() => installMagnetic(), []);

  // The chat widget is not needed for the first paint: load it when the
  // browser is idle, or at once if someone asks for it before then.
  const [chatReady, setChatReady] = useState(false);
  useEffect(() => {
    const load = () => setChatReady(true);
    const ask = () => {
      window.__marhabChatPending = true;
      load();
    };
    window.addEventListener('marhab:open-chat', ask);
    const idle = window.requestIdleCallback ? window.requestIdleCallback(load, { timeout: 2500 }) : setTimeout(load, 1500);
    return () => {
      window.removeEventListener('marhab:open-chat', ask);
      if (window.cancelIdleCallback && window.requestIdleCallback) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
    };
  }, []);

  // The document follows the language: direction, lang, title, and the
  // alternate-language link for search engines.
  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale.code;
    html.dir = locale.dir;
    document.title = locale.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = locale.description;
    let alt = document.querySelector('link[rel="alternate"][data-locale]');
    if (!alt) {
      alt = document.createElement('link');
      alt.rel = 'alternate';
      alt.dataset.locale = '1';
      document.head.appendChild(alt);
    }
    alt.hreflang = locale.code === 'ar' ? 'en' : 'ar';
    alt.href = `${location.origin}${counterpart(pathname, locale.code)}`;
  }, [locale, pathname]);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });

  const pageMotion = prefersReducedMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
        exit: { opacity: 0, y: -8, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } },
      };

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-fg/30 via-fg to-fg/30 origin-left z-[60]"
      />
      <Nav />
      {curtain && (
        <motion.div
          key={`curtain-${pathname}`}
          className="fixed inset-0 z-[90] zone-dark bg-bg pointer-events-none"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: ['inset(100% 0 0 0)', 'inset(0 0 0 0)', 'inset(0 0 0 0)', 'inset(0 0 100% 0)'] }}
          transition={{ duration: 0.95, times: [0, 0.42, 0.5, 1], ease: [0.76, 0, 0.24, 1] }}
        />
      )}
      <AnimatePresence mode="wait" initial={false}>
        <motion.main key={pathname} {...pageMotion}>
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      {chatReady && (
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      )}
    </div>
  );
}
