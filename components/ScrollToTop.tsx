
import React, { useEffect, useState } from 'react';

const ScrollToTop: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 300);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`
        fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full
        bg-[#acc8a2] text-[#182521] shadow-[0_8px_30px_rgba(172,200,162,0.4)]
        flex items-center justify-center
        transition-all duration-500 ease-out
        hover:scale-110 hover:shadow-[0_12px_40px_rgba(172,200,162,0.6)] active:scale-95
        ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}
      `}
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
};

export default ScrollToTop;
