
import React, { useState, useEffect, useCallback } from 'react';
import { Language } from './types';
import { TRANSLATIONS, FLEET, REVIEWS } from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import CarFleet from './components/CarFleet';
import WhyUs from './components/WhyUs';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import SEOSection from './components/SEOSection';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';


const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('pref_lang');
    return (saved as Language) || Language.SQ;
  });

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = useCallback((key: string) => {
    return TRANSLATIONS[key]?.[lang] || key;
  }, [lang, TRANSLATIONS]);

  const toggleLang = () => {
    const next = lang === Language.EN ? Language.SQ : Language.EN;
    setLang(next);
    localStorage.setItem('pref_lang', next);
  };

  return (
    <div className="min-h-screen selection:bg-yellow-400 selection:text-black font-sans overflow-x-hidden">
      <Header
        lang={lang}
        toggleLang={toggleLang}
        isScrolled={isScrolled}
        t={t}
      />

      <main className="overflow-x-hidden">
        <Hero t={t} />

        <div id="cars" className="scroll-mt-24">
          <CarFleet lang={lang} t={t} fleet={FLEET} />
        </div>

        <div id="why-us" className="scroll-mt-24">
          <WhyUs t={t} />
        </div>

        <div id="reviews" className="scroll-mt-24">
          <Reviews t={t} reviews={REVIEWS} />
        </div>

        <div id="contact" className="scroll-mt-24">
          <Contact t={t} />
        </div>

        {/* SEO Optimized Content Section */}
        <SEOSection t={t} />
      </main>

      <Footer t={t} />

      {/* Global floating elements */}
      <ScrollProgress />
      <ScrollToTop />
    </div>
  );
};

export default App;
