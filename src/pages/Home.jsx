import { lazy, startTransition, Suspense, useCallback, useEffect, useState } from 'react';
import Loader, { loaderWillPlay } from '../components/Loader.jsx';
import Hero from '../components/Hero.jsx';
const HeroDive = lazy(() => import('../components/HeroDive.jsx'));
import ProductDemo from '../components/ProductDemo.jsx';
import ScrollStory from '../components/ScrollStory.jsx';
import ServicesPreview from '../components/ServicesPreview.jsx';
import WorkPreview from '../components/WorkPreview.jsx';
import ProcessPreview from '../components/ProcessPreview.jsx';
import QatarBand from '../components/QatarBand.jsx';
import FinalCta from '../components/FinalCta.jsx';

// Home is the sales page. Hero → the product working → one customer's week,
// pinned and scrolled → what we build → what it looks like → how it goes →
// here → go.
//
// Two openings, one per look: the night look keeps the five-screen dive
// through the indigo field; the daylight look opens on one screen — the
// promise, a window of night with the product working inside it, three
// facts — and gets on with the page.
const daylight = typeof document !== 'undefined' && document.documentElement.dataset.theme === 'daylight';

export default function Home() {
  // The loader hands the opening to the hero: `intro` is known at mount (so
  // the hero can set up the close-up behind the counter), `ready` when the
  // loader lets go.
  const [intro] = useState(loaderWillPlay);
  const [ready, setReady] = useState(false);
  const [introDone, setIntroDone] = useState(!intro);
  const onLoaderDone = useCallback(() => {
    setReady(true);
    if (!daylight) setIntroDone(true);
  }, []);
  const onHeroSettled = useCallback(() => setIntroDone(true), []);

  // The opening can be skipped: any click, tap, scroll or key while it plays
  // goes straight to the page (the loader lets go at once and the hero is
  // simply there, its headline rising).
  const [skipped, setSkipped] = useState(false);
  useEffect(() => {
    if (!intro || introDone || skipped) return;
    const skip = (e) => {
      if (e.type === 'keydown' && ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(e.key)) return;
      setSkipped(true);
    };
    const events = ['pointerdown', 'wheel', 'touchmove', 'keydown'];
    const opts = { passive: true, capture: true };
    events.forEach((ev) => window.addEventListener(ev, skip, opts));
    return () => events.forEach((ev) => window.removeEventListener(ev, skip, opts));
  }, [intro, introDone, skipped]);

  // Everything below the demo is built after the first paint, in small
  // interruptible slices (a transition), so the page never freezes for half
  // a second while eight sections of motion mount at once. A visitor who
  // lands on an anchor further down gets it at once.
  const [rest, setRest] = useState(() => typeof location !== 'undefined' && !!location.hash && location.hash !== '#demo');
  useEffect(() => {
    if (rest) return;
    const go = () => startTransition(() => setRest(true));
    const id = window.requestIdleCallback ? window.requestIdleCallback(go, { timeout: 1200 }) : setTimeout(go, 600);
    return () => (window.cancelIdleCallback && window.requestIdleCallback ? window.cancelIdleCallback(id) : clearTimeout(id));
  }, [rest]);

  return (
    <>
      <Loader onDone={onLoaderDone} skip={skipped} />
      {daylight ? (
        <Hero ready={ready} intro={intro} skipped={skipped} onSettled={onHeroSettled} />
      ) : (
        <Suspense fallback={<div className="min-h-[100dvh] bg-bg" />}>
          <HeroDive />
        </Suspense>
      )}
      <ProductDemo />
      {rest ? (
        <>
          <ScrollStory />
          <ServicesPreview />
          <WorkPreview />
          <ProcessPreview />
          <QatarBand />
          <FinalCta />
        </>
      ) : (
        <div className="min-h-[100dvh]" aria-hidden="true" />
      )}
    </>
  );
}
