import React from 'react';
// Two-tone 3X monogram with no tile: the "3" takes the surrounding text colour
// and the "X" stays brand orange, so the same mark works on light and dark.
export function LogoMark({ dark = false, className = '' }) {
  const three = dark ? '#FFFFFF' : '#191919';
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M15 19h12a6.5 6.5 0 0 1 0 13h-5M27 32a6.5 6.5 0 0 1 0 13H15"
        stroke={three}
        strokeWidth="5.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M38 19l13 26M51 19L38 45" stroke="#FE330A" strokeWidth="5.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ dark = false, className = '', showSubtitle = true }) {
  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 select-none shrink-0 ${className}`}>
      <LogoMark dark={dark} className="w-10 h-10 sm:w-11 sm:h-11 shrink-0" />

      <div className="flex flex-col justify-center leading-tight">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className={`text-base sm:text-lg font-black tracking-tight ${dark ? 'text-white' : 'text-[#191919]'}`}>
            3X <span className="text-[#FE330A]">AI</span>
          </span>
          <span className={`text-[11px] sm:text-xs font-extrabold tracking-wider uppercase ${dark ? 'text-slate-200' : 'text-[#191919]'}`}>
            AUTOMATION
          </span>
        </div>

        {showSubtitle && (
          <div className="hidden xl:flex items-center gap-1 text-[10px] font-medium text-slate-500 whitespace-nowrap">
            <span className="font-semibold text-[#FE330A]">AI Agents</span>
            <span>· Automation · Systems</span>
          </div>
        )}
      </div>
    </div>
  );
}
