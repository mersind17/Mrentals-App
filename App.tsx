import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Language } from './types';
import { TRANSLATIONS } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import Home from './pages/Home';

// Faqet e brendshme ngarkohen sipas kërkesës (code-splitting) — kryefaqja
// nuk procesion kodin e tyre në ngarkimin e parë, gjë që ndihmon telefonat.
const LocationPage = lazy(() => import('./pages/LocationPage'));
const CarPage = lazy(() => import('./pages/CarPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Titujt e faqes kryesore per gjuhë (faqet e brendshme e vendosin vetë titullin).
const HOME_TITLE = {
  sq: 'MRentals | Makina me Qera në Elbasan, Tiranë dhe Aeroporti Rinas',
  en: 'MRentals | Car Rental in Elbasan, Tirana and Rinas Airport',
};

// Në ndërrim route: scroll lart, ose te seksioni nëse URL-ja ka hash.
const RouteEffects: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        const top = el.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 80;
        window.scrollTo({ top, behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
};

const AppShell: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('pref_lang');
    return (saved as Language) || Language.SQ;
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    // Titullin e faqes kryesore e menaxhojmë këtu; faqet e brendshme kanë efektet e veta.
    if (pathname === '/') document.title = HOME_TITLE[lang];
  }, [lang, pathname]);

  const t = useCallback((key: string) => TRANSLATIONS[key]?.[lang] || key, [lang]);

  const toggleLang = () => {
    const next = lang === Language.EN ? Language.SQ : Language.EN;
    setLang(next);
    localStorage.setItem('pref_lang', next);
  };

  return (
    <div className="min-h-screen selection:bg-yellow-400 selection:text-black font-sans overflow-x-hidden">
      <RouteEffects />
      <Header lang={lang} toggleLang={toggleLang} isScrolled={isScrolled} t={t} />

      <main className="overflow-x-hidden">
        <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<Home lang={lang} t={t} />} />
            <Route path="/makina-me-qera-elbasan" element={<LocationPage lang={lang} t={t} />} />
            <Route path="/makina-me-qera-tirane" element={<LocationPage lang={lang} t={t} />} />
            <Route path="/makina-me-qera-rinas" element={<LocationPage lang={lang} t={t} />} />
            <Route path="/makina/:slug" element={<CarPage lang={lang} t={t} />} />
            <Route path="*" element={<NotFound t={t} />} />
          </Routes>
        </Suspense>
      </main>

      <Footer t={t} lang={lang} />

      <ScrollProgress />
      <ScrollToTop />
    </div>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

export default App;
