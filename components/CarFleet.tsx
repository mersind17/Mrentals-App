
import React from 'react';
import { Car, Language } from '../types';
import CarCard from './CarCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface CarFleetProps {
  lang: Language;
  t: (key: string) => string;
  fleet: Car[];
}

const CarFleet: React.FC<CarFleetProps> = ({ t, fleet }) => {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.05 });

  return (
    <section ref={sectionRef} className="bg-[#182521] py-32 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#acc8a2]/5 rounded-full blur-[150px] -mr-96 -mt-96 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Airport Service Banner */}
        <div
          className={`mb-16 transition-all duration-800 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="bg-[#acc8a2]/10 border border-[#acc8a2]/20 rounded-[32px] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between group hover:bg-[#acc8a2]/15 transition-all duration-500">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <div className="bg-[#acc8a2] text-[#182521] w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <div>
                <h4 className="text-[#acc8a2] font-black uppercase tracking-widest text-sm mb-1">{t('fleet_airport_transfer')}</h4>
                <p className="text-white text-xl md:text-2xl font-bold max-w-xl">{t('fleet_airport_service')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-[#acc8a2] font-black uppercase tracking-[0.2em] text-xs">
              <span className="w-2 h-2 bg-[#acc8a2] rounded-full animate-pulse"></span>
              <span>{t('fleet_available_24_7')}</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div
          className={`flex flex-col lg:flex-row justify-between items-end mb-20 gap-8 transition-all duration-800 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '150ms' }}
        >
          <div className="max-w-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-px w-12 bg-[#acc8a2]"></div>
              <span className="text-[#acc8a2] text-xs font-black uppercase tracking-[0.4em]">{t('fleet_ready_to_drive')}</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">
              {t('fleet_discover_title')} <span className="text-[#acc8a2]">{t('fleet_discover_fleet')}</span>
            </h2>
            <p className="text-gray-400 text-xl font-medium leading-relaxed">{t('fleet_subtitle')}</p>
          </div>
        </div>

        {/* Car Cards Grid */}
        {fleet.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {fleet.map((car, idx) => (
              <div
                key={car.id}
                className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${300 + idx * 120}ms` }}
              >
                <CarCard car={car} t={t} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center border-2 border-dashed border-white/5 rounded-[40px] bg-white/5">
            <div className="bg-[#acc8a2]/10 text-[#acc8a2] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-black mb-4">{t('fleet_no_cars')}</h3>
            <p className="text-gray-500 text-lg font-medium">{t('fleet_check_later')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CarFleet;