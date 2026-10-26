import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LocaleProvider } from './i18n.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';

// Home ships in the first bundle; the other four pages load when they are
// first visited (their code is small, but nobody landing on the home page
// should pay for the pricing tables or the contact form up front).
const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'));
const WorkPage = lazy(() => import('./pages/WorkPage.jsx'));
const ProcessPage = lazy(() => import('./pages/ProcessPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));

const page = (C) => (
  <Suspense fallback={<div className="min-h-[100dvh]" />}>
    <C />
  </Suspense>
);

// The same five pages twice: English at the root, Arabic under /ar. The
// locale provider around each tree decides the copy and the direction.
function pages() {
  return (
    <>
      <Route index element={<Home />} />
      <Route path="services" element={page(ServicesPage)} />
      <Route path="work" element={page(WorkPage)} />
      <Route path="process" element={page(ProcessPage)} />
      <Route path="contact" element={page(ContactPage)} />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/ar"
        element={
          <LocaleProvider locale="ar">
            <Layout />
          </LocaleProvider>
        }
      >
        {pages()}
      </Route>
      <Route
        path="/"
        element={
          <LocaleProvider locale="en">
            <Layout />
          </LocaleProvider>
        }
      >
        {pages()}
      </Route>
    </Routes>
  );
}
