import React from 'react';

interface LogoProps {
  className?: string;
  /** Vendose vetëm te logoja e header-it: është elementi LCP, ndaj ngarkohet me përparësi. */
  priority?: boolean;
}

// Wordmark-i i brand-it si imazh (public/photos/logo.webp — transparent, gjeneruar nga scripts/prepare-brand.mjs).
const Logo: React.FC<LogoProps> = ({ className = 'h-8', priority = false }) => {
  return (
    <img
      src="/photos/logo.webp"
      alt="MRentals"
      className={`${className} w-auto`}
      width={834}
      height={96}
      decoding={priority ? 'sync' : 'async'}
      loading={priority ? 'eager' : 'lazy'}
      {...(priority ? { fetchPriority: 'high' as const } : {})}
    />
  );
};

export default Logo;
