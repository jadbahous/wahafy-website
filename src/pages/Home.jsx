import Loader from '../components/Loader.jsx';
import Hero from '../components/Hero.jsx';
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
export default function Home() {
  return (
    <>
      <Loader />
      <Hero />
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
