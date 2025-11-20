import React from 'react';

export const Logo = ({ size = 40, className = "" }: { size?: number, className?: string }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="5" />
      {/* P */}
      <path d="M32 35V65" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M32 35H42C48 35 48 50 42 50H32" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      {/* K */}
      <path d="M58 35V65" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M68 35L58 50L68 65" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
};

