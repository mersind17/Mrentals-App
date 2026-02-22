
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import Logo from './Logo';

interface HeaderProps {
  lang: Language;
  toggleLang: () => void;
  isScrolled: boolean;
  t: (key: string) => string;
}

const Header: React.FC<HeaderProps> = ({ lang, toggleLang, isScrolled, t }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navItems = [
    { name: t('nav_home'), id: 'home' },
    { name: t('nav_cars'), id: 'cars' },
    { name: t('nav_why'), id: 'why-us' },
    { name: t('nav_contact'), id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ease-in-out ${
          isScrolled || isMenuOpen ? 'bg-[#182521]/95 backdrop-blur-xl py-4 shadow-2xl' : 'bg-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Brand Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, 'home')}
            className={`flex items-center group transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-100'}`}
          >
            <Logo className="h-4 sm:h-5" color="#ffffff" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 hover:text-white transition-all relative group py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-[#acc8a2] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            
            {/* Lang Toggle (Circle) */}
            <button 
              onClick={toggleLang}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
            >
              <span className="text-[10px] font-black text-white">{lang.toUpperCase()}</span>
            </button>
          </nav>

          {/* Mobile Actions Toolbar */}
          <div className="flex items-center space-x-3 md:hidden">
            <button 
              onClick={toggleLang}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20"
            >
              <span className="text-[10px] font-black text-white">{lang.toUpperCase()}</span>
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full border border-white/20 group"
            >
              {isMenuOpen ? (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-1.5">
                  <span className="h-0.5 bg-white w-5"></span>
                  <span className="h-0.5 bg-white w-3.5 ml-auto mr-0"></span>
                  <span className="h-0.5 bg-white w-5"></span>
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Matches Screenshot */}
      <div 
        className={`fixed inset-0 z-[55] md:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        {/* Deep Green Background as requested */}
        <div className="absolute inset-0 bg-[#182521]"></div>
        
        {/* Mobile Header (Repeated inside overlay for alignment) */}
        <div className="absolute top-0 left-0 right-0 py-8 px-6 flex justify-between items-center z-10">
          <Logo className="h-4 sm:h-5" color="#ffffff" />
          <div className="flex items-center space-x-3">
             <button 
                onClick={toggleLang}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20"
              >
                <span className="text-[10px] font-black text-white">{lang.toUpperCase()}</span>
              </button>
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full border border-white/20"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
          </div>
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-6">
          {/* Menu Items */}
          <div className="flex flex-col items-center space-y-10">
            {navItems.map((item, idx) => (
              <a 
                key={item.id} 
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`text-5xl sm:text-6xl font-black uppercase tracking-tighter text-white hover:text-[#acc8a2] transition-all duration-500 transform ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${isMenuOpen ? idx * 100 + 100 : 0}ms` }}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Bottom Branding Logo */}
          <div 
            className={`absolute bottom-16 transform transition-all duration-700 ${
              isMenuOpen ? 'opacity-30 translate-y-0' : 'opacity-0 translate-y-8'
            }`} 
            style={{ transitionDelay: '500ms' }}
          >
            <Logo className="h-5 sm:h-6" color="#ffffff" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
