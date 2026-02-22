
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface WhyUsProps {
  t: (k: string) => string;
}


const WhyUs: React.FC<WhyUsProps> = ({ t }) => {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

  const features = [
    {
      title: t('why_price_title'),
      desc: t('why_price_desc'),
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: t('why_fleet_title'),
      desc: t('why_fleet_desc'),
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11 2 11.1 2 11.2V16c0 .6.4 1 1 1h2m10 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0ZM7 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0ZM5.2 11H19" />
        </svg>
      )
    },
    {
      title: t('why_support_title'),
      desc: t('why_support_desc'),
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    }
  ];

  return (
    <section ref={sectionRef} className="bg-[#182521] py-24 border-y border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#acc8a2]/[0.01] blur-[150px] pointer-events-none rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Title */}
        <h2
          className={`text-4xl md:text-5xl font-black text-center mb-12 text-white tracking-tighter transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {t('why_title')}
        </h2>


        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`group text-center p-10 bg-white/5 border border-white/5 rounded-[48px] hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
              style={{ transitionDelay: `${300 + idx * 150}ms` }}
            >
              <div className="bg-[#acc8a2]/10 text-[#acc8a2] w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto mb-10 group-hover:scale-110 transition-all duration-500 group-hover:bg-[#acc8a2]/20 shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-3xl font-black mb-6 text-white leading-tight">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed font-medium text-lg px-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
