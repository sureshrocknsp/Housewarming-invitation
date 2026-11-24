import React, { useState } from 'react';
import { gruhapravesamConfig } from '../../config/gruhapravesamConfig';
import { carnaticAudio } from '../../utils/audioEngine';
import { BrassLamp, ThoranamGarland, DecorativeDivider, MugguCorner } from '../TraditionalMotifs';
import { Bell, Sparkles, Volume2 } from 'lucide-react';

export default function OpeningExperience({ isOpen, onOpen }) {
  const { slokas, familyDetails, home } = gruhapravesamConfig;
  const [doorState, setDoorState] = useState('closed'); // 'closed', 'opening', 'revealed'

  const handleOpenInvitation = () => {
    if (doorState !== 'closed') return;

    // Play subtle temple bell sound
    try {
      carnaticAudio.playTempleBell();
    } catch (e) {
      console.warn("Bell sound played with fallback:", e);
    }

    // Start 3D door opening animation sequence
    setDoorState('opening');

    // Reveal interior, then transition smoothly to main invitation
    setTimeout(() => {
      setDoorState('revealed');
      setTimeout(() => {
        onOpen();
        const target = document.getElementById('invitation-card');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 900);
    }, 1500);
  };

  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black select-none">
      {/* LAYER 1: Decorated Home Interior (Revealed when doors open) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/home-interior.jpg"
          alt="Decorated South Indian Home Interior with Sunlit Pooja Mandir"
          className={`w-full h-full object-cover object-center filter transition-all duration-1000 ${
            doorState === 'closed'
              ? 'brightness-50 scale-95'
              : 'brightness-105 contrast-105 scale-100'
          }`}
        />
        {/* Warm golden light pouring out of the interior */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-amber-500/25 via-amber-300/15 to-transparent pointer-events-none transition-opacity duration-1000 ${
            doorState === 'closed' ? 'opacity-0' : 'opacity-100 animate-pulse'
          }`}
        />
      </div>

      {/* LAYER 2: 3D Carved Teakwood Double Doors (Simhadwaram) */}
      <div className="absolute inset-0 z-10 perspective-portal flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-5xl h-full max-h-[85vh] preserve-3d flex overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] border-x-8 border-t-8 border-[#3A140A] rounded-t-3xl">
          
          {/* Left Teak Door Leaf */}
          <div
            className={`w-1/2 h-full door-hinge-left relative overflow-hidden bg-[#2D1208] border-r-2 border-[#1B0A04] shadow-2xl ${
              doorState === 'opening' || doorState === 'revealed' ? 'door-open-left-state' : ''
            }`}
          >
            <img
              src="/images/carved-teak-door.jpg"
              alt="Carved Teakwood Left Door Leaf"
              className="w-[200%] max-w-none h-full object-cover object-left filter brightness-95 contrast-105 pointer-events-none"
            />
            {/* Antique Brass Handle */}
            <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-700 shadow-md border border-amber-900" />
              <div className="w-2 sm:w-3 h-16 sm:h-28 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 rounded-full shadow-lg border border-amber-950 my-1" />
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-700 shadow-md border border-amber-900" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 pointer-events-none" />
          </div>

          {/* Right Teak Door Leaf */}
          <div
            className={`w-1/2 h-full door-hinge-right relative overflow-hidden bg-[#2D1208] border-l-2 border-[#1B0A04] shadow-2xl ${
              doorState === 'opening' || doorState === 'revealed' ? 'door-open-right-state' : ''
            }`}
          >
            <img
              src="/images/carved-teak-door.jpg"
              alt="Carved Teakwood Right Door Leaf"
              className="w-[200%] max-w-none h-full object-cover object-right filter brightness-95 contrast-105 pointer-events-none -ml-[100%]"
            />
            {/* Antique Brass Handle */}
            <div className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-700 shadow-md border border-amber-900" />
              <div className="w-2 sm:w-3 h-16 sm:h-28 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 rounded-full shadow-lg border border-amber-950 my-1" />
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-700 shadow-md border border-amber-900" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/30 pointer-events-none" />
          </div>

          {/* Center Seam Glow */}
          <div
            className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-amber-300/80 blur-md pointer-events-none transition-opacity duration-500 ${
              doorState === 'opening' ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
            }`}
          />
        </div>
      </div>

      {/* LAYER 3: Natural Banana Trees */}
      <div className="absolute left-0 bottom-0 z-20 w-20 sm:w-44 md:w-64 lg:w-80 pointer-events-none select-none animate-leaf-left opacity-85 sm:opacity-100">
        <img
          src="/images/banana-mango-decor.jpg"
          alt="Fresh Green Banana Tree Decoration"
          className="w-full h-auto object-cover object-left-bottom filter drop-shadow-[5px_0_15px_rgba(0,0,0,0.7)]"
        />
      </div>

      <div className="absolute right-0 bottom-0 z-20 w-20 sm:w-44 md:w-64 lg:w-80 pointer-events-none select-none animate-leaf-right opacity-85 sm:opacity-100">
        <img
          src="/images/banana-mango-decor.jpg"
          alt="Fresh Green Banana Tree Decoration"
          className="w-full h-auto object-cover object-right-bottom transform -scale-x-100 filter drop-shadow-[-5px_0_15px_rgba(0,0,0,0.7)]"
        />
      </div>

      {/* LAYER 4: Fresh Mango Leaf & Marigold Thoranam */}
      <div className="absolute top-0 left-0 right-0 z-25 pointer-events-none select-none overflow-hidden">
        <ThoranamGarland className="w-full max-w-7xl mx-auto drop-shadow-2xl scale-100" />
      </div>

      {/* LAYER 5: Brass Deepams on Sides */}
      <div className="hidden sm:flex absolute left-4 md:left-8 lg:left-14 bottom-10 sm:bottom-14 z-25 flex-col items-center select-none pointer-events-none">
        <BrassLamp className="w-12 sm:w-16 md:w-20 h-36 sm:h-44 md:h-52 drop-shadow-[0_0_20px_rgba(245,176,20,0.8)]" />
        <span className="text-[9px] sm:text-[10px] uppercase font-cinzel text-turmeric-light tracking-widest mt-1 bg-maroon-deep/90 px-2 py-0.5 rounded border border-turmeric/50 shadow-md">
          మంగళ దీపం
        </span>
      </div>

      <div className="hidden sm:flex absolute right-4 md:right-8 lg:right-14 bottom-10 sm:bottom-14 z-25 flex-col items-center select-none pointer-events-none">
        <BrassLamp className="w-12 sm:w-16 md:w-20 h-36 sm:h-44 md:h-52 drop-shadow-[0_0_20px_rgba(245,176,20,0.8)]" />
        <span className="text-[9px] sm:text-[10px] uppercase font-cinzel text-turmeric-light tracking-widest mt-1 bg-maroon-deep/90 px-2 py-0.5 rounded border border-turmeric/50 shadow-md">
          శుభ దీపం
        </span>
      </div>

      {/* LAYER 6: Muggu on Gadapa Threshold */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center pointer-events-none">
        <div className="w-48 sm:w-80 md:w-[480px] h-16 sm:h-24 md:h-28 overflow-hidden relative opacity-95">
          <img
            src="/images/traditional-muggu.jpg"
            alt="Telugu Rice Flour Entrance Muggu"
            className="w-full h-full object-cover object-bottom filter brightness-105 contrast-110 drop-shadow-[0_-5px_15px_rgba(0,0,0,0.6)]"
          />
        </div>
        <div className="w-full gadapa-threshold h-3 sm:h-3.5 flex items-center justify-center gap-3 sm:gap-6 shadow-xl">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-templeRed shadow-xs border border-maroon-dark" />
          ))}
        </div>
      </div>

      {/* LAYER 7: Interactive Entrance Plaque */}
      <div
        className={`relative z-30 max-w-lg w-[92%] sm:w-full mx-auto transition-all duration-700 ${
          doorState === 'closed'
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        <div
          className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.9)] border-2 sm:border-4 border-turmeric/90"
          style={{
            background: 'linear-gradient(135deg, #4A1E12 0%, #2E120A 40%, #1F0B06 100%)',
            boxShadow: '0 0 35px rgba(214, 164, 55, 0.4), inset 0 0 20px rgba(0,0,0,0.85)'
          }}
        >
          <MugguCorner className="absolute top-2 left-2 w-8 h-8 sm:w-12 sm:h-12 text-turmeric-light/50" />
          <MugguCorner className="absolute top-2 right-2 w-8 h-8 sm:w-12 sm:h-12 text-turmeric-light/50 transform rotate-90" />
          <MugguCorner className="absolute bottom-2 left-2 w-8 h-8 sm:w-12 sm:h-12 text-turmeric-light/50 transform -rotate-90" />
          <MugguCorner className="absolute bottom-2 right-2 w-8 h-8 sm:w-12 sm:h-12 text-turmeric-light/50 transform rotate-180" />

          <div className="border border-turmeric/60 rounded-xl sm:rounded-2xl p-4 sm:p-7 flex flex-col items-center relative">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-maroon-deep/95 border border-turmeric/70 shadow-gold-glow mb-3">
              <span className="text-turmeric-bright font-telugu text-xs sm:text-sm md:text-base font-bold tracking-wide">
                {slokas.primary}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-telugu text-gold-gradient tracking-wide mb-1 drop-shadow-[0_4px_14px_rgba(0,0,0,0.9)]">
              {slokas.openingPlaqueTitle}
            </h1>

            <p className="text-[11px] sm:text-xs font-cinzel text-cream tracking-[0.25em] uppercase font-bold mb-2">
              GRUHAPRAVESAM
            </p>

            <DecorativeDivider className="my-1.5 max-w-xs text-turmeric scale-90 sm:scale-100" />

            <div className="my-2 sm:my-3">
              <div className="text-lg sm:text-2xl md:text-3xl font-cinzel font-bold text-cream-light tracking-wider drop-shadow-md">
                {familyDetails.familySurname}
              </div>
              <div className="text-xs sm:text-sm font-telugu text-turmeric-light font-medium mt-0.5">
                {familyDetails.hosts.teluguNames}
              </div>
              <div className="text-[11px] sm:text-xs text-cream/70 font-poppins mt-0.5">
                {home.name}
              </div>
            </div>

            <p className="text-cream/80 font-poppins text-[11px] sm:text-xs max-w-xs mx-auto mb-4 leading-relaxed">
              Step into our new home with your sacred presence and divine blessings.
            </p>

            <button
              onClick={handleOpenInvitation}
              className="touch-target w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full font-cinzel font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 transition-all duration-300 shadow-royal border-2 border-yellow-200 group active:scale-95 bg-gradient-to-r from-turmeric via-turmeric-light to-turmeric text-maroon-deep hover:scale-105 hover:shadow-gold-glow cursor-pointer"
              title="Click to hear the temple bell and open the ceremonial doors"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-maroon-dark animate-bounce group-hover:rotate-12 transition-transform" />
              <span className="font-bold">
                OPEN INVITATION | తలుపులు తెరవండి
              </span>
              <Sparkles className="w-4 h-4 text-maroon-dark" />
            </button>

            <span className="text-[10px] sm:text-[11px] font-poppins text-cream/60 mt-2.5 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-turmeric shrink-0" />
              <span>Tap to hear the temple bell & open doors</span>
            </span>
          </div>
        </div>
      </div>

      {/* Floating Skip / Direct Enter Pill */}
      <button
        onClick={() => {
          onOpen();
          const target = document.getElementById('invitation-card');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }}
        className="touch-target absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 text-[11px] font-cinzel text-cream/80 hover:text-turmeric-light px-3.5 py-1.5 rounded-full bg-black/60 border border-turmeric/40 backdrop-blur-sm tracking-wider uppercase transition-colors flex items-center cursor-pointer"
      >
        Skip to Invitation →
      </button>
    </div>
  );
}
