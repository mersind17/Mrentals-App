
import React from 'react';
import { WHATSAPP_NUMBER, GOOGLE_MAPS_URL } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ContactProps {
  t: (key: string) => string;
}

const Contact: React.FC<ContactProps> = ({ t }) => {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="bg-[#182521] py-24 relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#acc8a2]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left column — slides in from the left */}
          <div
            className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-px w-12 bg-[#acc8a2]"></div>
              <span className="text-[#acc8a2] text-xs font-black uppercase tracking-[0.4em]">{t('contact_get_in_touch')}</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter text-white">
              {t('contact_showroom_title').split(' ').map((word, i) => (
                <React.Fragment key={i}>
                  {i === 2 ? <br /> : ''}
                  <span className={word.toLowerCase() === 'showroom' ? 'text-[#acc8a2]' : ''}>{word} </span>
                </React.Fragment>
              ))}
            </h2>

            <div className="space-y-8">
              {/* Location */}
              <div className="group flex items-start space-x-6 p-6 rounded-[32px] hover:bg-white/5 active:bg-white/5 transition-all border border-transparent hover:border-white/5 active:border-white/5">
                <div className="bg-[#acc8a2] p-4 rounded-2xl text-[#182521] shadow-lg shadow-[#acc8a2]/20 group-hover:scale-110 group-active:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-widest text-[#acc8a2] mb-1">{t('contact_location_title')}</p>
                  <p className="text-xl font-bold text-white">MRentals ( Makina Me Qera )</p>
                  <p className="text-gray-400 font-medium mt-1">{t('contact_address')}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="group flex items-start space-x-6 p-6 rounded-[32px] hover:bg-white/5 active:bg-white/5 transition-all border border-transparent hover:border-white/5 active:border-white/5">
                <div className="bg-[#acc8a2] p-4 rounded-2xl text-[#182521] shadow-lg shadow-[#acc8a2]/20 group-hover:scale-110 group-active:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-widest text-[#acc8a2] mb-1">{t('contact_direct_title')}</p>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="text-xl font-bold text-white hover:text-[#acc8a2] active:text-[#acc8a2] transition-colors block">
                    +{WHATSAPP_NUMBER}
                  </a>
                  <p className="text-gray-400 font-medium mt-1">{t('contact_direct_desc')}</p>
                </div>
              </div>

              {/* Instagram */}
              <div className="group flex items-start space-x-6 p-6 rounded-[32px] hover:bg-white/5 active:bg-white/5 transition-all border border-transparent hover:border-white/5 active:border-white/5">
                <div className="bg-[#acc8a2] p-4 rounded-2xl text-[#182521] shadow-lg shadow-[#acc8a2]/20 group-hover:scale-110 group-active:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-widest text-[#acc8a2] mb-1">{t('contact_follow_title')}</p>
                  <a href="https://instagram.com/mrentals_al" target="_blank" className="text-xl font-bold text-white hover:text-[#acc8a2] active:text-[#acc8a2] transition-colors block">
                    @mrentals_al
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — slides in from the right */}
          <div
            className={`relative group h-[600px] w-full transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="absolute -inset-2 bg-[#acc8a2]/10 rounded-[60px] blur-2xl opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-700"></div>

            <div className="relative h-full w-full rounded-[60px] overflow-hidden border-[12px] border-white/5 bg-[#141f1b] shadow-2xl">
              <iframe
                title="MRentals showroom location on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12023.630658829261!2d20.0768996!3d41.1147076!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13504311210b58db%3A0x8b49ecaa97686724!2sMRentals%20(%20Makina%20Me%20Qera%20)!5e0!3m2!1sen!2s!4v1770141010109!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(90%) grayscale(0.2)',
                  pointerEvents: 'auto'
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="group-hover:brightness-100 transition-all duration-700"
              ></iframe>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-auto min-w-[240px] bg-[#141f1b]/90 backdrop-blur-lg border border-white/10 p-4 rounded-[32px] flex items-center justify-center shadow-2xl group-hover:translate-y-[-5px] group-active:translate-y-[-5px] transition-transform duration-500">
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#acc8a2] hover:bg-[#9db893] active:bg-[#9db893] text-[#182521] px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-[#acc8a2]/10 flex items-center group/btn"
                >
                  {t('contact_navigation_btn')}
                  <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-active/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;