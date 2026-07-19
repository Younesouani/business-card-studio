'use client';

import React from 'react';
import { useCardStore } from '@/store/useCardStore';
import { Camera, Phone, Mail } from 'lucide-react';

export const CardPreview: React.FC = () => {
  const { cardData, isFlipped, toggleCardFlip, setCardFlip } = useCardStore();
  const isGold = cardData.accentTheme === 'gold';

  // Dynamic theme hexes and styling tokens matching the template specs
  const accentColorClass = isGold ? 'text-amber-500' : 'text-zinc-400';
  const borderAccentClass = isGold ? 'border-amber-500/40' : 'border-zinc-500/40';
  const bgGradientClass = isGold ? 'via-amber-500' : 'via-zinc-400';
  const qrBorderColor = isGold ? 'border-amber-500/20' : 'border-zinc-700/50';

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full">
      {/* Interactive Guide Header */}
      <div className="text-center w-full max-w-md">
        <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1 font-montserrat">
          Interactive 3D Preview
        </p>
        <p className="text-xs text-zinc-500">
          Tap or hover on the card to flip between front and back views.
        </p>
      </div>

      {/* 3D Card Object Wrapper */}
      <div 
        className="w-full max-w-[420px] aspect-[1.75] perspective-1000 group cursor-pointer relative"
        onClick={toggleCardFlip}
      >
        <div 
          className={`w-full h-full preserve-3d transition-transform duration-700 relative rounded-2xl shadow-2xl ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* ================================= FRONT SIDE ================================= */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#0c0c0c] border border-zinc-800/80 p-8 flex flex-col justify-between items-center premium-shimmer overflow-hidden">
            {/* Layout accent elements */}
            <div className="absolute inset-2 border border-zinc-900/40 rounded-lg pointer-events-none" />
            <div className={`absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 ${borderAccentClass} rounded-tl transition-colors duration-500`} />
            <div className={`absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 ${borderAccentClass} rounded-br transition-colors duration-500`} />

            {/* Central Camera Shutter Logo */}
            <div className="mt-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center relative bg-gradient-to-b from-zinc-900 to-black p-1 shadow-inner">
                <svg 
                  className={`w-full h-full ${accentColorClass} transition-colors duration-500`} 
                  viewBox="0 0 100 100" 
                  fill="currentColor"
                >
                  <path d="M50 5 L72.5 43.9 L43.9 43.9 Z" opacity="0.8" />
                  <path d="M95 50 L56.1 72.5 L56.1 43.9 Z" opacity="0.8" />
                  <path d="M50 95 L27.5 56.1 L56.1 56.1 Z" opacity="0.8" />
                  <path d="M5 50 L43.9 27.5 L43.9 56.1 Z" opacity="0.8" />
                  <circle cx="50" cy="50" r="16" className="text-[#0c0c0c]" fill="currentColor" />
                  <circle cx="50" cy="50" r="11" className={`${accentColorClass} transition-colors duration-500`} fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Identity Core Typography Scale */}
            <div className="text-center z-10">
              <h2 className="font-serif text-3xl tracking-wide text-zinc-100 font-semibold mb-1">
                {cardData.name}
              </h2>
              <p className="text-[9px] tracking-[0.35em] text-zinc-400 uppercase font-light font-montserrat">
                {cardData.subtitle}
              </p>
            </div>

            {/* Bottom Horizontal Bar Decoration */}
            <div className={`w-20 h-[2px] bg-gradient-to-r from-transparent ${bgGradientClass} to-transparent mb-1 transition-colors duration-500`} />
          </div>

          {/* ================================= BACK SIDE ================================= */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl bg-gradient-to-br from-[#181818] to-[#0a0a0a] border border-zinc-800/80 p-6 flex flex-col justify-between premium-shimmer overflow-hidden">
            <div className="absolute inset-2 border border-zinc-900/40 rounded-lg pointer-events-none" />

            {/* Top Identity Row Layout */}
            <div className="flex justify-between items-start z-10">
              <div>
                <h3 className="font-serif text-xl tracking-wide text-zinc-100 font-semibold">
                  {cardData.name}
                </h3>
                <p className={`text-[8px] tracking-[0.2em] ${accentColorClass} uppercase font-semibold font-montserrat transition-colors duration-500`}>
                  {cardData.title}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full border border-zinc-800/80 flex items-center justify-center bg-zinc-900">
                <Camera className={`w-4 h-4 ${accentColorClass} transition-colors duration-500`} />
              </div>
            </div>

            {/* Body Details Layout Grid with Mini-QR Integration Panel */}
            <div className="grid grid-cols-12 gap-2 items-center z-10">
              <div className="col-span-8 space-y-2">
                {/* Phone Component */}
                <div className="flex items-center gap-2.5 text-[10px] text-zinc-300">
                  <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800/60">
                    <Phone className={`w-3 h-3 ${accentColorClass}`} />
                  </div>
                  <span className="font-mono tracking-wide">{cardData.phone}</span>
                </div>

                {/* Email Component */}
                <div className="flex items-center gap-2.5 text-[10px] text-zinc-300">
                  <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800/60">
                    <Mail className={`w-3 h-3 ${accentColorClass}`} />
                  </div>
                  <span className="tracking-wide">{cardData.email}</span>
                </div>

                {/* Social Handle Chips */}
                <div className="flex gap-2 pt-1 text-[9px] text-zinc-400">
                  <span className="flex items-center gap-1 bg-zinc-900/60 px-2 py-0.5 rounded border border-zinc-800/80">
                    <svg className="w-3 h-3 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    <span className="font-mono">{cardData.igHandle}</span>
                  </span>
                  <span className="flex items-center gap-1 bg-zinc-900/60 px-2 py-0.5 rounded border border-zinc-800/80">
                    <svg className="w-3 h-3 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    <span className="font-mono">{cardData.fbHandle}</span>
                  </span>
                </div>
              </div>

              {/* Dynamic Presentation Viewport for QR Code Indicator */}
              <div className="col-span-4 flex flex-col items-center justify-center">
                <div className="p-1 bg-white rounded-lg inline-block shadow-lg transition-all duration-300">
                  {/* Clean Mock Placeholder Grid replicating physical layout scans */}
                  <div className={`w-14 h-14 bg-zinc-100 flex items-center justify-center border border-dashed ${qrBorderColor} rounded`}>
                    <svg className="w-10 h-10 text-zinc-900" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 15h6v6H3v-6zm2 2v2h2v-2H5zm13-1h3v2h-3v-2zm-3-2h3v2h-3v-2zm3-2h3v2h-3v-2zm-3 6h3v3h-3v-3zm6 1h2v2h-2v-2zm-3-3h1v1h-1v-1zm2 1h1v1h-1v-1z" />
                    </svg>
                  </div>
                </div>
                <span className="text-[7px] text-zinc-500 tracking-wider mt-1 uppercase font-montserrat font-semibold">
                  Scan Portfolio
                </span>
              </div>
            </div>

            {/* Bottom Row Services Metric Summary */}
            <div className="border-t border-zinc-800/80 pt-2 z-10">
              <div className="text-[7.5px] tracking-wider text-zinc-400 font-montserrat uppercase flex justify-between items-center gap-1 font-semibold">
                <span>Weddings</span>
                <span className={`w-1 h-1 rounded-full ${isGold ? 'bg-amber-500' : 'bg-zinc-400'}`} />
                <span>Engagements</span>
                <span className={`w-1 h-1 rounded-full ${isGold ? 'bg-amber-500' : 'bg-zinc-400'}`} />
                <span>Events</span>
                <span className={`w-1 h-1 rounded-full ${isGold ? 'bg-amber-500' : 'bg-zinc-400'}`} />
                <span>Private Sessions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Interface Direction Actions */}
      <div className="flex gap-4 no-print">
        <button 
          onClick={(e) => { e.stopPropagation(); setCardFlip(false); }}
          className={`px-4 py-2 text-xs rounded-lg border bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white transition-all font-semibold tracking-wide ${!isFlipped ? 'ring-1 ring-amber-500/30 border-zinc-700' : ''}`}
        >
          Card Front
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); setCardFlip(true); }}
          className={`px-4 py-2 text-xs rounded-lg border bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white transition-all font-semibold tracking-wide ${isFlipped ? 'ring-1 ring-amber-500/30 border-zinc-700' : ''}`}
        >
          Card Back
        </button>
      </div>
    </div>
  );
};

