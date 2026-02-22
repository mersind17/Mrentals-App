
import React from 'react';
import { Review } from '../types';
import { GOOGLE_MAPS_URL } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCounter } from '../hooks/useCounter';

interface ReviewsProps {
  t: (key: string) => string;
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ t, reviews }) => {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
  const rating = useCounter(50, 1500, isVisible); // animate to 50 = "5.0" displayed as (count/10).toFixed(1)

  return (
    <section ref={sectionRef} className="bg-[#182521] py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#acc8a2] rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-20">

          {/* Google badge */}
          <div
            className={`flex items-center space-x-3 mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-white font-black uppercase tracking-[0.3em] text-sm">{t('review_official_badge')}</span>
          </div>

          <h2
            className={`text-4xl md:text-6xl font-black mb-4 text-center text-white transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '100ms' }}
          >
            {t('review_title')}
          </h2>

          {/* Animated Rating Box */}
          <div
            className={`flex flex-col items-center bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-md mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="text-5xl font-black text-[#acc8a2] mb-2 tabular-nums">
              {(rating / 10).toFixed(1)}
            </div>
            <div className="flex space-x-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-6 h-6 transition-all duration-300 text-[#acc8a2]`} style={{ transitionDelay: `${300 + i * 80}ms`, opacity: isVisible ? 1 : 0, transform: isVisible ? 'scale(1)' : 'scale(0)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{t('review_summary_stat')}</p>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {reviews.map((review, idx) => (
            <div
              key={review.id}
              className={`bg-white p-10 rounded-[40px] shadow-2xl flex flex-col hover:scale-[1.02] transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
              style={{ transitionDelay: `${400 + idx * 150}ms` }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-[#182521] text-[#acc8a2] rounded-2xl flex items-center justify-center font-black text-2xl group-hover:rotate-6 transition-transform">
                    {review.name[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-[#182521] text-lg leading-tight">{review.name}</h4>
                  </div>
                </div>
                <svg className="w-6 h-6 text-gray-200" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                </svg>
              </div>

              <div className="flex space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < review.rating ? 'text-[#acc8a2]' : 'text-gray-200'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-600 font-medium mb-10 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>

        <div
          className={`flex flex-col sm:flex-row justify-center items-center gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '750ms' }}
        >
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#182521] px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-[#acc8a2] transition-all flex items-center group"
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            </svg>
            {t('review_write_btn')}
          </a>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white border border-white/20 hover:border-[#acc8a2] px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-white/5"
          >
            {t('review_view_all_btn')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;