
import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8", color = "#acc8a2" }) => {
  return (
    <svg 
      viewBox="0 0 450 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* M */}
      <path 
        d="M0 60V0H60V60H48V12H36V30H24V12H12V60H0Z" 
        fill={color} 
      />
      
      <g transform="translate(75, 0)">
        {/* R - Sharp geometric style */}
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M0 0H50V32H28L50 60H34L14 34H12V60H0V0ZM12 10H38V24H12V10Z" 
          fill={color} 
        />
        
        {/* E - Three equal bars with sharp corners */}
        <path 
          d="M60 0H105V10H72V24H100V34H72V50H105V60H60V0Z" 
          fill={color} 
        />
        
        {/* N */}
        <path 
          d="M115 0H127L148 38V0H160V60H148L127 22V60H115V0Z" 
          fill={color} 
        />
        
        {/* T */}
        <path 
          d="M170 0H215V10H198V60H187V10H170V0Z" 
          fill={color} 
        />
        
        {/* A */}
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M232 0H258L275 60H262L258 46H232L228 60H215L232 0ZM235 36H255L245 10L235 36Z" 
          fill={color} 
        />
        
        {/* L */}
        <path 
          d="M285 0H297V50H325V60H285V0Z" 
          fill={color} 
        />
        
        {/* S */}
        <path 
          d="M375 12V0H335V34H363V50H335V60H375V26H347V10H375V12Z" 
          fill={color} 
        />
      </g>
    </svg>
  );
};

export default Logo;