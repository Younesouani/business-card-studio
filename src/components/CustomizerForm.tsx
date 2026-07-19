'use client';

import React from 'react';
import { useCardStore } from '@/store/useCardStore';
import { Smartphone } from 'lucide-react';

export const CustomizerForm: React.FC = () => {
  const { cardData, setField, setAccentTheme } = useCardStore();

  return (
    <div className="w-full space-y-5 bg-[#121212]/40 p-6 rounded-2xl border border-zinc-800/60 backdrop-blur-sm">
      <div>
        <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider font-montserrat">Card Configuration</h3>
        <p className="text-xs text-zinc-500 mt-0.5">Modify details below to dynamically update your premium card.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5 font-montserrat">Name</label>
          <input
            type="text"
            value={cardData.name}
            onChange={(e) => setField('name', e.target.value)}
            className="w-full px-4 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-lg text-zinc-200 text-sm focus:outline-none focus:border-amber-500 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5 font-montserrat">Professional Title</label>
            <input
              type="text"
              value={cardData.title}
              onChange={(e) => setField('title', e.target.value)}
              className="w-full px-3 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-lg text-zinc-200 text-xs focus:outline-none focus:border-amber-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5 font-montserrat">Front Subtitle</label>
            <input
              type="text"
              value={cardData.subtitle}
              onChange={(e) => setField('subtitle', e.target.value)}
              className="w-full px-3 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-lg text-zinc-200 text-xs focus:outline-none focus:border-amber-500 transition-all"
            />
          </div>
        </div>

        <div className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-800/60">
          <label className="text-[10px] font-medium text-zinc-300 uppercase tracking-widest block mb-2 font-montserrat">Email Spelling Preference</label>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2 bg-zinc-950/80 px-3 py-2 rounded-md border border-zinc-850 cursor-pointer">
              <input
                type="radio"
                name="email-selector"
                value="ilyasouani@gmail.com"
                checked={cardData.email === 'ilyasouani@gmail.com'}
                onChange={(e) => setField('email', e.target.value)}
                className="accent-amber-500"
              />
              <span className="text-[11px] text-zinc-300 font-mono">ilyasouani@...</span>
            </label>
            <label className="flex items-center gap-2 bg-zinc-950/80 px-3 py-2 rounded-md border border-zinc-850 cursor-pointer">
              <input
                type="radio"
                name="email-selector"
                value="iluasouani@gmail.com"
                checked={cardData.email === 'iluasouani@gmail.com'}
                onChange={(e) => setField('email', e.target.value)}
                className="accent-amber-500"
              />
              <span className="text-[11px] text-zinc-400 font-mono">iluasouani@...</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5 font-montserrat">WhatsApp / Phone Number</label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-zinc-500"><Smartphone className="w-4 h-4" /></span>
            <input
              type="text"
              value={cardData.phone}
              onChange={(e) => setField('phone', e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-lg text-zinc-200 text-sm font-mono focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <span className="absolute left-3 top-3 text-zinc-500">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </span>
            <input
              type="text"
              value={cardData.igHandle}
              onChange={(e) => setField('igHandle', e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-900/90 border border-zinc-800 rounded-lg text-zinc-200 text-xs font-mono focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-3 text-zinc-500">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </span>
            <input
              type="text"
              value={cardData.fbHandle}
              onChange={(e) => setField('fbHandle', e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-900/90 border border-zinc-800 rounded-lg text-zinc-200 text-xs font-mono focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5 font-montserrat">QR Code Link</label>
          <input
            type="url"
            value={cardData.qrUrl}
            onChange={(e) => setField('qrUrl', e.target.value)}
            className="w-full px-4 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-lg text-zinc-200 text-xs font-mono focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <div className="border-t border-zinc-800/80 pt-4 mt-2">
        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={() => setAccentTheme('gold')} className={`p-2.5 rounded-lg border flex items-center justify-center gap-2 ${cardData.accentTheme === 'gold' ? 'border-amber-500 bg-amber-500/10' : 'border-zinc-800 bg-zinc-950/40'}`}>
            <span className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-amber-600 block" />
            <span className="text-xs font-medium text-amber-200 font-montserrat">Luxury Gold</span>
          </button>
          <button type="button" onClick={() => setAccentTheme('silver')} className={`p-2.5 rounded-lg border flex items-center justify-center gap-2 ${cardData.accentTheme === 'silver' ? 'border-zinc-500 bg-zinc-500/10' : 'border-zinc-800 bg-zinc-950/40'}`}>
            <span className="w-4 h-4 rounded-full bg-gradient-to-r from-zinc-300 to-zinc-500 block" />
            <span className="text-xs font-medium text-zinc-300 font-montserrat">Minimal Silver</span>
          </button>
        </div>
      </div>
    </div>
  );
};

