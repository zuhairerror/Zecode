import React from 'react';

export default function ZecodeLogo({ size = 'md', showTagline = false, className = '' }) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-14 sm:h-14'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl'
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none group ${className}`}>
      {/* Code-inspired geometric logo emblem */}
      <div
        className={`${iconSizes[size] || iconSizes.md} rounded-xl bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/35 transition-all duration-300 group-hover:scale-105 shrink-0`}
      >
        <div className="w-full h-full bg-[#070B14] rounded-[10px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent"></div>
          
          {/* Code Z Emblem SVG */}
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 sm:w-6 sm:h-6 relative z-10"
          >
            {/* Left Bracket < */}
            <path
              d="M8.5 11L5 16L8.5 21"
              stroke="#22D3EE"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Right Bracket > */}
            <path
              d="M23.5 11L27 16L23.5 21"
              stroke="#22D3EE"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Dynamic Z Path */}
            <path
              d="M12 12H20L12 20H20"
              stroke="#F8FAFC"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Yellow Accent Step Dot */}
            <circle cx="21" cy="12" r="1.5" fill="#F59E0B" />
          </svg>
        </div>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`${textSizes[size] || textSizes.md} font-extrabold font-display tracking-tight text-white group-hover:text-cyan-300 transition-colors`}
          >
            Zecode
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 whitespace-nowrap hidden sm:inline-block">
            PRO
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono tracking-wide mt-1">
            See Your Code. Understand Every Step.
          </span>
        )}
      </div>
    </div>
  );
}
