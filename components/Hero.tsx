
import React, { useEffect, useRef, useState } from 'react';

interface HeroProps {
  t: (key: string) => string;
}

const Hero: React.FC<HeroProps> = ({ t }) => {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const bgRef = useRef<HTMLDivElement>(null);

  // Trigger entrance animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFleet = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('cars');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const fadeUp = (delay: number) =>
    `transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;

  return (
    <section id="home" className="relative h-[100vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Parallax + Ken Burns */}
      <div className="absolute inset-0" ref={bgRef}>
        <picture>
          <source srcSet="photos/Audi%20A5(1).webp" type="image/webp" />
          <img
            src="photos/Audi A5(1).jpg"
            alt="Luxury car rental in Albania - MRentals"
            className="w-full h-full object-cover animate-[kenburns_20s_ease-in-out_infinite]"
            style={{ transform: `scale(1.1) translateY(${scrollY * 0.3}px)` }}
            fetchPriority="high"
            width={1920}
            height={1080}
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-[#182521]/80 via-[#182521]/60 to-[#182521]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">

          {/* Status Badge */}
          <div
            className={`inline-flex items-center space-x-2 bg-black/50 backdrop-blur-md border border-[#acc8a2]/20 px-5 py-2.5 rounded-full mb-10 ${fadeUp(0)}`}
            style={{ transitionDelay: '100ms' }}
          >
            <span className="w-2.5 h-2.5 bg-[#acc8a2] rounded-full animate-pulse"></span>
            <span className="text-[#acc8a2] text-[11px] font-black uppercase tracking-[0.25em]">New Fleet 2026 Arrived</span>
          </div>

          {/* Main Title */}
          <h1
            className={`text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter drop-shadow-2xl text-white ${fadeUp(0)}`}
            style={{ transitionDelay: '250ms' }}
          >
            {t('hero_title').split(' ').map((word, i) => (
              <span key={i} className={word.toLowerCase() === 'qera' ? 'text-[#acc8a2]' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg md:text-2xl text-white/80 mb-12 max-w-2xl leading-relaxed font-medium mx-auto ${fadeUp(0)}`}
            style={{ transitionDelay: '400ms' }}
          >
            {t('hero_subtitle')}
          </p>

          {/* Primary Action Button */}
          <div
            className={`w-full flex justify-center ${fadeUp(0)}`}
            style={{ transitionDelay: '550ms' }}
          >
            <button
              onClick={scrollToFleet}
              className="w-full sm:w-auto bg-[#acc8a2] hover:bg-[#9db893] active:bg-[#9db893] text-[#182521] px-16 py-7 rounded-[28px] font-black text-xl shadow-[0_20px_60px_rgba(172,200,162,0.3)] hover:scale-105 active:scale-105 transition-all flex items-center justify-center group"
            >
              {t('btn_view_cars')}
              <svg className="w-7 h-7 ml-4 group-hover:translate-x-2 group-active:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Ambient Lighting */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#acc8a2]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 ${fadeUp(0)}`}
        style={{ transitionDelay: '800ms' }}
      >
        <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse"></div>
      </div>

      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1.1) translateY(0); }
          50% { transform: scale(1.2) translateY(0); }
          100% { transform: scale(1.1) translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;