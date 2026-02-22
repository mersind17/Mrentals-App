
import React from 'react';
import Logo from './Logo';
import { WHATSAPP_NUMBER } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface FooterProps {
  t: (key: string) => string;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  const { ref: footerRef, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  const handleBooking = () => {
    const message = "Përshëndetje MRentals! Dua të bëj një rezervim.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <footer ref={footerRef} className="bg-[#182521] py-24 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#acc8a2]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10">

        {/* WhatsApp CTA */}
        <div
          className={`mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <button
            onClick={handleBooking}
            className="group flex items-center space-x-4 bg-[#acc8a2] hover:bg-[#9db893] text-[#182521] px-12 py-6 rounded-[24px] font-black text-sm uppercase tracking-[0.25em] transition-all duration-500 transform hover:scale-105 shadow-[0_20px_50px_rgba(172,200,162,0.2)]"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span>{t('btn_book_now')}</span>
            <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Logo */}
        <div
          className={`mb-12 transform hover:scale-105 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '150ms' }}
        >
          <Logo className="h-10 sm:h-14 mx-auto" />
        </div>

        {/* Divider */}
        <div
          className={`transition-all duration-700 ${isVisible ? 'w-16 opacity-100' : 'w-0 opacity-0'}`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="w-16 h-px bg-white/10 mb-12"></div>
        </div>

        {/* Footer Details */}
        <div
          className={`flex flex-col items-center space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <p className="text-[11px] text-gray-500 font-black uppercase tracking-[0.4em]">
            &copy; {new Date().getFullYear()} MRENTALS. {t('footer_rights')}
          </p>
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em] flex items-center">
            DESIGNED WITH
            <span className="text-[#acc8a2] mx-2 text-lg animate-pulse">♥</span>
            BY MRDEV TEAM
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
