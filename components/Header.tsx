import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Language } from '../types';
import { WHATSAPP_NUMBER } from '../constants';
import Logo from './Logo';

interface HeaderProps {
  lang: Language;
  toggleLang: () => void;
  isScrolled: boolean;
  t: (key: string) => string;
}

const EASE = 'cubic-bezier(0.21, 0.6, 0.35, 1)';

const Header: React.FC<HeaderProps> = ({ lang, toggleLang, isScrolled, t }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const navItems = [
    { name: t('nav_home'), id: 'home' },
    { name: t('nav_cars'), id: 'cars' },
    { name: t('nav_why'), id: 'why-us' },
    { name: t('nav_contact'), id: 'contact' },
  ];

  // Në home bën scroll të butë; nga faqet e tjera kthehet te home me hash-in përkatës.
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (!isHome) {
      navigate(id === 'home' ? '/' : `/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offsetPosition =
        element.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 80;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleBooking = () => {
    setIsMenuOpen(false);
    const message = 'Përshëndetje MRentals! Dua të bëj një rezervim.';
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const isPill = isScrolled || isMenuOpen;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60]">
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-500 ${
            isPill
              ? 'mt-3 mx-4 md:mx-auto rounded-2xl bg-[#182521]/80 backdrop-blur-xl border border-white/10 py-3 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)]'
              : 'bg-transparent border border-transparent py-5'
          }`}
        >
          {/* Brand */}
          <Link
            to="/"
            onClick={(e) => isHome && handleNavClick(e, 'home')}
            aria-label="MRentals – Kryefaqja"
            className="relative z-[70] flex items-center"
          >
            <Logo className="h-4 sm:h-5" priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={isHome ? `#${item.id}` : `/#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="group relative text-sm font-medium text-white/65 transition-colors hover:text-white"
              >
                {item.name}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#acc8a2] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            <button
              onClick={toggleLang}
              aria-label={`Switch language to ${lang === 'en' ? 'Albanian' : 'English'}`}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
            >
              <span className="text-[10px] font-black text-white" aria-hidden="true">{lang.toUpperCase()}</span>
            </button>

            <button
              onClick={handleBooking}
              className="rounded-full bg-[#acc8a2] px-5 py-2.5 text-sm font-bold text-[#182521] transition-all duration-300 hover:bg-[#9db893] hover:shadow-[0_0_24px_-4px_rgba(172,200,162,0.6)]"
            >
              {t('btn_book_now')}
            </button>
          </nav>

          {/* Mobile actions */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleLang}
              aria-label={`Switch language to ${lang === 'en' ? 'Albanian' : 'English'}`}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20"
            >
              <span className="text-[10px] font-black text-white" aria-hidden="true">{lang.toUpperCase()}</span>
            </button>

            {/* Hamburger 2-vija → X */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label={isMenuOpen ? 'Mbyll menunë' : 'Hap menunë'}
              aria-expanded={isMenuOpen}
              className="relative z-[70] flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10"
            >
              <span className="relative block h-3 w-[18px]">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-full bg-white transition-transform duration-300 ${
                    isMenuOpen ? 'translate-y-[5px] rotate-45' : ''
                  }`}
                  style={{ transitionTimingFunction: EASE }}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-white transition-transform duration-300 ${
                    isMenuOpen ? '-translate-y-[5.5px] -rotate-45' : ''
                  }`}
                  style={{ transitionTimingFunction: EASE }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay mobile */}
      <div
        className={`fixed inset-0 z-[55] bg-[#182521]/98 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex h-full flex-col justify-center gap-2 px-8" aria-label="Mobile">
          {navItems.map((item, i) => (
            <a
              key={item.id}
              href={isHome ? `#${item.id}` : `/#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className="font-black text-4xl uppercase tracking-tighter text-white transition-all duration-500 hover:text-[#acc8a2]"
              style={{
                transitionTimingFunction: EASE,
                transitionDelay: isMenuOpen ? `${80 + i * 50}ms` : '0ms',
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(24px)',
              }}
            >
              {item.name}
            </a>
          ))}

          <div
            className="mt-10 flex flex-wrap items-center gap-3 transition-all duration-500"
            style={{
              transitionTimingFunction: EASE,
              transitionDelay: isMenuOpen ? '320ms' : '0ms',
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(24px)',
            }}
          >
            <button
              onClick={handleBooking}
              className="rounded-full bg-[#acc8a2] px-6 py-3.5 text-sm font-bold text-[#182521]"
            >
              {t('btn_book_now')}
            </button>
            <a
              href="https://www.instagram.com/mrentals_al"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 px-5 py-3.5 text-sm font-bold text-white/70"
            >
              Instagram
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
