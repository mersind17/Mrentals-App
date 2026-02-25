
import React, { useState } from 'react';
import { Car } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface CarCardProps {
  car: Car;
  t: (key: string) => string;
}

const CarCard: React.FC<CarCardProps> = ({ car, t }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const handleBooking = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Përshëndetje MRentals! Jam i interesuar për ${car.name} (${car.year}). A është i disponueshëm për qera?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div
      className="group relative bg-[#1d2d28] border border-white/5 rounded-[40px] overflow-hidden transition-all duration-700 hover:border-[#acc8a2]/40 active:border-[#acc8a2]/40 flex flex-col h-full shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] active:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Image Container / Gallery */}
      <div className="relative h-72 overflow-hidden bg-black/20">
        <picture>
          <source
            srcSet={car.images[currentImageIndex].replace(/\.(jpg|jpeg|png)$/i, '.webp').replace(/ /g, '%20')}
            type="image/webp"
          />
          <img
            src={car.images[currentImageIndex]}
            alt={`${car.name} view ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-700 ease-out"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
            loading="lazy"
            width={800}
            height={600}
          />
        </picture>

        {/* Gallery Navigation Arrows */}
        <div className={`absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 md:opacity-0 lg:group-hover:opacity-100 lg:group-active:opacity-100'}`}>
          <button
            onClick={prevImage}
            aria-label="Previous image"
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#acc8a2] hover:text-[#182521] active:bg-[#acc8a2] active:text-[#182521] transition-all"
          >
            <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextImage}
            aria-label="Next image"
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#acc8a2] hover:text-[#182521] active:bg-[#acc8a2] active:text-[#182521] transition-all"
          >
            <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Gallery Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {car.images.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 transition-all duration-300 rounded-full ${i === currentImageIndex ? 'w-6 bg-[#acc8a2]' : 'w-1.5 bg-white/40'}`}
            />
          ))}
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1d2d28] via-transparent to-transparent opacity-60 pointer-events-none"></div>
      </div>

      {/* Content Area */}
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-black group-hover:text-[#acc8a2] group-active:text-[#acc8a2] transition-colors leading-tight max-w-[70%]">
            {car.name}
          </h3>
          <div className="text-right">
            <div className="text-3xl font-black text-white group-hover:text-[#acc8a2] group-active:text-[#acc8a2] transition-colors tracking-tighter">
              {car.pricePerDay}€
            </div>
            <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest -mt-1">{t('car_per_day')}</div>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-4 text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-8">
          <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-2xl border border-white/5">
            <svg className="w-4 h-4 text-[#acc8a2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>{car.engine}</span>
          </div>
          <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-2xl border border-white/5">
            <svg className="w-4 h-4 text-[#acc8a2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-2xl border border-white/5">
            <svg className="w-4 h-4 text-[#acc8a2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span>{car.fuel}</span>
          </div>
          <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-2xl border border-white/5">
            <svg className="w-4 h-4 text-[#acc8a2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{car.seats} {t('car_seats')}</span>
          </div>
        </div>

        {/* Action Area */}
        <div className="mt-auto">
          <button
            onClick={handleBooking}
            className="w-full bg-white/5 hover:bg-[#acc8a2] hover:text-[#182521] active:bg-[#acc8a2] active:text-[#182521] border border-white/10 hover:border-[#acc8a2] active:border-[#acc8a2] py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center group/btn"
          >
            {t('btn_book_now')}
            <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-active/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;