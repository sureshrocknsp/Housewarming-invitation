import React from 'react';

/**
 * Traditional South Indian Brass Kuthu Vilakku (Oil Lamp)
 * with animated glowing flame and authentic ornamental tiered brass design.
 */
export function BrassLamp({ className = "w-16 h-36", flameIntensity = "high" }) {
  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Radiant Glow Behind Flame */}
      <div className="absolute top-0 w-12 h-12 bg-amber-400/40 rounded-full blur-xl animate-pulse pointer-events-none" />
      
      {/* Realistic Flickering Flame */}
      <div className="relative z-10 -mb-1 animate-flame">
        <svg viewBox="0 0 24 36" className="w-5 h-8 drop-shadow-[0_0_10px_rgba(245,176,20,0.9)]">
          <defs>
            <radialGradient id="flameGrad" cx="50%" cy="80%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#FFE066" />
              <stop offset="70%" stopColor="#F5A623" />
              <stop offset="100%" stopColor="#D9381E" />
            </radialGradient>
          </defs>
          {/* Flame teardrop */}
          <path
            d="M12 2 C10 10 5 18 5 26 C5 31.5 8.1 35 12 35 C15.9 35 19 31.5 19 26 C19 18 14 10 12 2 Z"
            fill="url(#flameGrad)"
          />
          {/* Inner blue-white core */}
          <ellipse cx="12" cy="28" rx="2.5" ry="4" fill="#E0F2FE" opacity="0.85" />
        </svg>
      </div>

      {/* Brass Lamp Metallic Body */}
      <svg viewBox="0 0 80 180" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8C5C1B" />
            <stop offset="25%" stopColor="#E6B448" />
            <stop offset="50%" stopColor="#FDF0A6" />
            <stop offset="75%" stopColor="#D49E35" />
            <stop offset="100%" stopColor="#6E440E" />
          </linearGradient>
          <linearGradient id="brassShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDF0A6" />
            <stop offset="100%" stopColor="#8C5C1B" />
          </linearGradient>
        </defs>

        {/* Top wick-holder bowl */}
        <path d="M26 18 C26 12 54 12 54 18 C58 24 64 26 64 29 C64 33 52 35 40 35 C28 35 16 33 16 29 C16 26 22 24 26 18 Z" fill="url(#brassGrad)" />
        <ellipse cx="40" cy="18" rx="14" ry="4" fill="#5A3508" />

        {/* First ring & notch */}
        <rect x="36" y="35" width="8" height="10" fill="url(#brassGrad)" rx="2" />
        <ellipse cx="40" cy="48" rx="18" ry="5" fill="url(#brassGrad)" />

        {/* Central ornate stem column */}
        <path d="M36 53 L34 110 Q40 114 46 110 L44 53 Z" fill="url(#brassGrad)" />
        {/* Tier bulbs */}
        <circle cx="40" cy="72" r="8" fill="url(#brassGrad)" />
        <circle cx="40" cy="95" r="7" fill="url(#brassGrad)" />

        {/* Lower wide decorative saucer */}
        <ellipse cx="40" cy="115" rx="26" ry="7" fill="url(#brassGrad)" />
        <path d="M20 120 Q40 126 60 120 L58 132 Q40 138 22 132 Z" fill="url(#brassGrad)" />

        {/* Pedestal Base */}
        <path d="M28 132 L15 165 C15 170 65 170 65 165 L52 132 Z" fill="url(#brassGrad)" />
        <ellipse cx="40" cy="168" rx="34" ry="9" fill="url(#brassGrad)" />
        <ellipse cx="40" cy="172" rx="30" ry="6" fill="#4A2A06" opacity="0.6" />
      </svg>
    </div>
  );
}

/**
 * Traditional Floral Divider with Temple Motifs & Kalasham Center
 */
export function DecorativeDivider({ text = "", teluguText = "", className = "my-6" }) {
  return (
    <div className={`flex items-center justify-center gap-3 w-full max-w-lg mx-auto ${className}`}>
      {/* Left Ornamental Line */}
      <div className="flex-1 flex items-center">
        <div className="w-2 h-2 rounded-full bg-turmeric border border-maroon"></div>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-turmeric to-maroon"></div>
        <div className="w-1.5 h-1.5 rotate-45 bg-turmeric mx-1"></div>
      </div>

      {/* Central Symbol / Kalasham Motif */}
      <div className="px-3 py-1 flex flex-col items-center">
        <div className="flex items-center gap-1.5 text-turmeric-dark">
          <span className="text-sm">✦</span>
          <span className="text-lg">🪔</span>
          <span className="text-sm">✦</span>
        </div>
        {(text || teluguText) && (
          <div className="text-center mt-0.5">
            {teluguText && <div className="text-xs font-telugu text-maroon font-semibold">{teluguText}</div>}
            {text && <div className="text-[10px] tracking-widest uppercase font-cinzel text-antiqueGold font-bold">{text}</div>}
          </div>
        )}
      </div>

      {/* Right Ornamental Line */}
      <div className="flex-1 flex items-center">
        <div className="w-1.5 h-1.5 rotate-45 bg-turmeric mx-1"></div>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-maroon to-turmeric"></div>
        <div className="w-2 h-2 rounded-full bg-turmeric border border-maroon"></div>
      </div>
    </div>
  );
}

/**
 * Traditional Muggu / Kolam Corner Accent
 */
export function MugguCorner({ className = "w-16 h-16 text-turmeric/40" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M0 0 L100 0 C60 0 30 30 30 70 L30 100 L0 100 Z" fill="currentColor" opacity="0.15" />
      <path d="M5 5 Q50 10 50 50 Q10 50 5 5 Z" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="25" cy="25" r="4" fill="currentColor" />
      <circle cx="50" cy="15" r="3" fill="currentColor" />
      <circle cx="15" cy="50" r="3" fill="currentColor" />
      <path d="M5 25 Q25 25 25 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * Thoranam garland top banner strip
 */
export function ThoranamGarland({ className = "w-full" }) {
  return (
    <div className={`overflow-hidden select-none pointer-events-none ${className}`}>
      {/* Repeating Mango Leaf & Marigold Garland Pattern */}
      <div className="flex justify-between items-start w-full relative">
        {[...Array(14)].map((_, i) => (
          <div key={i} className="flex flex-col items-center -mx-1 animate-garland" style={{ animationDelay: `${(i % 4) * 0.5}s` }}>
            {/* Hanging Mango Leaf (Mamidaku) */}
            <div className="w-6 h-12 bg-gradient-to-b from-leafGreen-light via-leafGreen to-leafGreen-dark rounded-b-[100%] shadow-sm transform -rotate-1 origin-top border-t-2 border-yellow-800">
              <div className="w-full h-full border-l border-leafGreen-light/30"></div>
            </div>
            {/* Orange & Yellow Marigold blossoms */}
            <div className="-mt-10 flex flex-col items-center gap-0.5">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-sm border border-yellow-600/40"></div>
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-sm border border-orange-700/40"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-cream-light shadow-xs"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Traditional Sacred Kalasham Vector Motif
 * Featuring brass pot (lota), five mango leaves, and consecrated coconut with kumkum
 */
export function KalashamMotif({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Brass / Copper Gradient */}
        <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8C4A11" />
          <stop offset="25%" stopColor="#D9822B" />
          <stop offset="50%" stopColor="#FDE68A" />
          <stop offset="75%" stopColor="#C96E14" />
          <stop offset="100%" stopColor="#693003" />
        </linearGradient>
        {/* Coconut Brown Gradient */}
        <linearGradient id="coconutGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#78350F" />
          <stop offset="50%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
        {/* Mango Leaf Green Gradient */}
        <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="60%" stopColor="#16A34A" />
          <stop offset="100%" stopColor="#14532D" />
        </linearGradient>
      </defs>

      {/* 1. Five Mango Leaves (Mamidaku) */}
      {/* Center Leaf */}
      <path d="M50 45 C44 30 46 15 50 5 C54 15 56 30 50 45 Z" fill="url(#leafGrad1)" stroke="#14532D" strokeWidth="0.8" />
      <path d="M50 5 L50 45" stroke="#86EFAC" strokeWidth="0.6" />
      {/* Left Outer Leaf */}
      <path d="M46 48 C32 40 20 28 16 18 C28 20 40 32 46 48 Z" fill="url(#leafGrad1)" stroke="#14532D" strokeWidth="0.8" />
      {/* Right Outer Leaf */}
      <path d="M54 48 C68 40 80 28 84 18 C72 20 60 32 54 48 Z" fill="url(#leafGrad1)" stroke="#14532D" strokeWidth="0.8" />
      {/* Left Mid Leaf */}
      <path d="M48 46 C36 34 30 20 30 10 C38 18 46 32 48 46 Z" fill="url(#leafGrad1)" stroke="#14532D" strokeWidth="0.8" />
      {/* Right Mid Leaf */}
      <path d="M52 46 C64 34 70 20 70 10 C62 18 54 32 52 46 Z" fill="url(#leafGrad1)" stroke="#14532D" strokeWidth="0.8" />

      {/* 2. Consecrated Coconut (Kobbari Kaaya) */}
      <ellipse cx="50" cy="38" rx="14" ry="16" fill="url(#coconutGrad)" stroke="#451A03" strokeWidth="1" />
      {/* Coconut tuft / top fibers */}
      <path d="M50 22 C48 18 52 14 50 12 C49 15 51 19 50 22 Z" fill="#78350F" />
      <path d="M47 23 C44 19 46 15 45 13 C46 17 48 20 47 23 Z" fill="#78350F" />
      <path d="M53 23 C56 19 54 15 55 13 C54 17 52 20 53 23 Z" fill="#78350F" />
      {/* Tilak / Kumkuma on Coconut */}
      <circle cx="50" cy="35" r="3.5" fill="#DC2626" />
      <circle cx="50" cy="35" r="1.5" fill="#FBBF24" />

      {/* 3. Sacred Brass Pot (Kalash / Kumbha) */}
      {/* Pot Rim */}
      <ellipse cx="50" cy="52" rx="18" ry="4" fill="url(#potGrad)" stroke="#693003" strokeWidth="1" />
      {/* Pot Neck Ring */}
      <rect x="36" y="53" width="28" height="6" rx="2" fill="url(#potGrad)" stroke="#693003" strokeWidth="0.8" />
      {/* Red Sacred Thread (Mauli) */}
      <line x1="36" y1="56" x2="64" y2="56" stroke="#DC2626" strokeWidth="2" />
      <line x1="36" y1="58" x2="64" y2="58" stroke="#FBBF24" strokeWidth="1" />
      {/* Pot Body */}
      <path d="M34 59 C20 66 18 86 30 98 C38 104 62 104 70 98 C82 86 80 66 66 59 Z" fill="url(#potGrad)" stroke="#693003" strokeWidth="1" />
      {/* Traditional Swastika or Auspicious Tilak on Pot */}
      <path d="M50 72 L50 86 M43 79 L57 79 M50 72 L55 72 M50 86 L45 86 M43 79 L43 74 M57 79 L57 84" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
      {/* Auspicious Dots */}
      <circle cx="46.5" cy="75.5" r="1" fill="#DC2626" />
      <circle cx="53.5" cy="75.5" r="1" fill="#DC2626" />
      <circle cx="46.5" cy="82.5" r="1" fill="#DC2626" />
      <circle cx="53.5" cy="82.5" r="1" fill="#DC2626" />

      {/* 4. Pedestal Base */}
      <ellipse cx="50" cy="100" rx="16" ry="4" fill="url(#potGrad)" stroke="#693003" strokeWidth="1" />
    </svg>
  );
}

/**
 * Traditional Banana Tree Motif (Arati Chettu)
 * Used to frame South Indian invitation cards
 */
export function BananaTreeMotif({ className = "w-16 h-32", mirror = false }) {
  return (
    <svg
      viewBox="0 0 80 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${mirror ? 'scale-x-[-1]' : ''}`}
    >
      <defs>
        <linearGradient id="bananaTrunk" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2E6930" />
          <stop offset="40%" stopColor="#65A30D" />
          <stop offset="80%" stopColor="#4D7C0F" />
          <stop offset="100%" stopColor="#1B431C" />
        </linearGradient>
        <linearGradient id="bananaLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="40%" stopColor="#22C55E" />
          <stop offset="80%" stopColor="#15803D" />
          <stop offset="100%" stopColor="#14532D" />
        </linearGradient>
      </defs>

      {/* Trunk / Stem */}
      <path d="M37 70 L34 155 Q40 158 46 155 L43 70 Z" fill="url(#bananaTrunk)" />
      {/* Base root rings */}
      <ellipse cx="40" cy="155" rx="9" ry="3" fill="#14532D" />

      {/* Left Hanging Banana Leaves */}
      <path d="M38 72 C22 60 5 45 4 30 C12 30 28 48 38 68 Z" fill="url(#bananaLeafGrad)" stroke="#14532D" strokeWidth="0.8" />
      <path d="M38 85 C18 78 2 68 0 52 C10 52 26 66 38 80 Z" fill="url(#bananaLeafGrad)" stroke="#14532D" strokeWidth="0.8" />
      <path d="M39 100 C20 95 8 88 5 75 C15 75 30 86 39 96 Z" fill="url(#bananaLeafGrad)" stroke="#14532D" strokeWidth="0.8" />

      {/* Right Hanging Banana Leaves */}
      <path d="M42 70 C58 55 74 38 78 22 C72 25 56 46 42 66 Z" fill="url(#bananaLeafGrad)" stroke="#14532D" strokeWidth="0.8" />
      <path d="M42 82 C62 72 76 58 79 44 C72 47 58 64 42 78 Z" fill="url(#bananaLeafGrad)" stroke="#14532D" strokeWidth="0.8" />
      <path d="M41 98 C60 92 72 82 76 70 C68 73 54 86 41 94 Z" fill="url(#bananaLeafGrad)" stroke="#14532D" strokeWidth="0.8" />

      {/* Top Arching Leaf */}
      <path d="M40 70 C36 40 38 18 40 2 C44 18 46 40 40 70 Z" fill="url(#bananaLeafGrad)" stroke="#14532D" strokeWidth="0.8" />

      {/* Purple Banana Blossom (Arati Dooth / Flower) */}
      <path d="M40 88 C38 95 36 102 40 110 C44 102 42 95 40 88 Z" fill="#701A75" stroke="#4A044E" strokeWidth="0.8" />
    </svg>
  );
}
