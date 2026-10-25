import Loader from '../components/Loader.jsx';
import Hero from '../components/Hero.jsx';
import HeroDive from '../components/HeroDive.jsx';
import ProductDemo from '../components/ProductDemo.jsx';
import Outcomes from '../components/Outcomes.jsx';
import Journey from '../components/Journey.jsx';
import ServicesPreview from '../components/ServicesPreview.jsx';
import WorkPreview from '../components/WorkPreview.jsx';
import ProcessPreview from '../components/ProcessPreview.jsx';
import QatarBand from '../components/QatarBand.jsx';
import FinalCta from '../components/FinalCta.jsx';

// Home is the sales page. Hero → the product working → why it matters →
// the journey → what we build → what it looks like → how it goes → here → go.
//
// Two openings, one per look: the night look keeps the five-screen dive
// through the indigo field; the daylight look opens on one screen — the
// promise, a window of night with the product working inside it, three
// facts — and gets on with the page.
const daylight = typeof document !== 'undefined' && document.documentElement.dataset.theme === 'daylight';

export default function Home() {
  return (
    <>
      <Loader />
      {daylight ? <Hero /> : <HeroDive />}
      <ProductDemo />
      <Outcomes />
      <Journey />
      <ServicesPreview />
      <WorkPreview />
      <ProcessPreview />
      <QatarBand />
      <FinalCta />
    </>
  );
}
