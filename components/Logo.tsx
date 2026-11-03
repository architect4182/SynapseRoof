'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
  wordmarkClassName?: string;
  sunColor?: string;
}

export default function Logo({
  className = '',
  size = 38,
  showWordmark = true,
  wordmarkClassName = '',
  sunColor,
}: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 font-medium tracking-tight select-none ${className}`}>
      <svg
        viewBox="0 0 40 40"
        width={size}
        height={size}
        className="flex-none transition-transform duration-300 hover:rotate-45"
        aria-hidden="true"
      >
        <g fill={sunColor || 'currentColor'}>
          <circle cx="20" cy="20" r="2.8" />
          <path id="sr-ray" d="M18.3 3.5h3.4l.9 8.4h-5.2Z" />
          <use href="#sr-ray" transform="rotate(30 20 20)" />
          <use href="#sr-ray" transform="rotate(60 20 20)" />
          <use href="#sr-ray" transform="rotate(90 20 20)" />
          <use href="#sr-ray" transform="rotate(120 20 20)" />
          <use href="#sr-ray" transform="rotate(150 20 20)" />
          <use href="#sr-ray" transform="rotate(180 20 20)" />
          <use href="#sr-ray" transform="rotate(210 20 20)" />
          <use href="#sr-ray" transform="rotate(240 20 20)" />
          <use href="#sr-ray" transform="rotate(270 20 20)" />
          <use href="#sr-ray" transform="rotate(300 20 20)" />
          <use href="#sr-ray" transform="rotate(330 20 20)" />
        </g>
      </svg>
      {showWordmark && (
        <span className={`text-[22px] font-medium tracking-tight font-sans ${wordmarkClassName}`}>
          Synapse Roof
        </span>
      )}
    </div>
  );
}

