import React from 'react';
import { gruhapravesamConfig } from '../config/gruhapravesamConfig';
import { useLanguage } from '../context/LanguageContext';
import { BrassLamp, DecorativeDivider, ThoranamGarland } from './TraditionalMotifs';
import { Calendar, MapPin, ChevronDown, Sparkles } from 'lucide-react';

export default function HeroSection({ onExploreClick }) {
  const { slokas, teluguInvitation, englishInvitation, familyDetails, event, home } = gruhapravesamConfig;
  const { language, tr } = useLanguage();

  const isTelugu = language === 'TE';
  const isEnglish = language === 'EN';

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between items-center text-center overflow-hidden bg-maroon-dark">
      {/* 1. Photorealistic Entrance Image Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/traditional-entrance.jpg"
          alt="Traditional South Indian House Entrance decorated for Gruhapravesam"
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
        />
        {/* Cinematic Vignette & Warm Golden Morning Sunlight Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep via-maroon-dark/65 to-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-300/35 via-transparent to-transparent pointer-events-none animate-sunlight" />
      </div>

      {/* 2. Top Mango Leaf & Marigold Garland Thoranam */}
      <div className="relative z-20 w-full pt-0">
        <ThoranamGarland className="w-full max-w-7xl mx-auto drop-shadow-lg" />
      </div>

      {/* 3. Auspicious Brass Lamps on Entrance Sides */}
      <div className="hidden lg:flex absolute left-8 bottom-28 z-20 flex-col items-center select-none pointer-events-none">
        <BrassLamp className="w-20 h-52" />
        <span className="text-[10px] uppercase font-cinzel text-turmeric-light/90 tracking-widest mt-1 bg-maroon-deep/80 px-2 py-0.5 rounded border border-turmeric/40">
          మంగళ దీపం
        </span>
      </div>

      <div className="hidden lg:flex absolute right-8 bottom-28 z-20 flex-col items-center select-none pointer-events-none">
        <BrassLamp className="w-20 h-52" />
        <span className="text-[10px] uppercase font-cinzel text-turmeric-light/90 tracking-widest mt-1 bg-maroon-deep/80 px-2 py-0.5 rounded border border-turmeric/40">
          శుభ దీపం
        </span>
      </div>

      {/* 4. Central Invitation Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 py-8 md:py-12 my-auto flex flex-col items-center">
        {/* Sacred Divine Invocations (Section 1) */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 bg-maroon-deep/90 border border-turmeric/70 backdrop-blur-md px-6 py-2.5 rounded-full shadow-gold-glow mb-6 animate-pulse">
          <span className="text-turmeric-light font-telugu text-sm md:text-base font-bold tracking-wide">
            {slokas.primary}
          </span>
          <span className="text-turmeric/60 text-xs hidden sm:inline">✦</span>
          <span className="text-turmeric-light font-telugu text-sm md:text-base font-bold tracking-wide">
            {slokas.secondary}
          </span>
          <span className="text-turmeric/60 text-xs hidden sm:inline">✦</span>
          <span className="text-turmeric-bright font-telugu text-sm md:text-base font-bold tracking-wide">
            {slokas.shubhamastu}
          </span>
        </div>

        {/* Elders Blessing Text */}
        <p className="text-cream-light font-cormorant italic text-base md:text-xl font-medium tracking-wide drop-shadow-md mb-2">
          {englishInvitation.opening.split(',')[0]},
        </p>

        <p className="text-turmeric-light font-cinzel text-xs md:text-sm tracking-[0.25em] uppercase font-semibold mb-3">
          {isTelugu ? "సకుటుంబ సపరివార సమేతంగా మిమ్ములను ఆహ్వానిస్తున్నాము" : "You Are Cordially Invited to Celebrate Our"}
        </p>

        {/* Main Telugu Gruhapravesam Title */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-telugu text-cream-light tracking-wide mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          <span className="text-gold-gradient drop-shadow-[0_2px_12px_rgba(214,164,55,0.7)]">
            {teluguInvitation.title}
          </span>
        </h1>

        {/* English Title & Subtitle */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-cinzel font-bold text-cream tracking-[0.2em] uppercase mb-4 drop-shadow-md">
          {englishInvitation.title}
        </h2>

        {/* Home Name Badge */}
        <div className="bg-cream/90 text-maroon-dark px-5 py-1.5 rounded-md border border-turmeric shadow-lg mb-6 flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-turmeric-dark font-cinzel">Abode:</span>
          <span className="font-telugu font-bold text-sm md:text-base text-maroon">{home.name}</span>
          <span className="text-xs text-maroon-light hidden sm:inline font-cormorant">({home.teluguName})</span>
        </div>

        {/* Traditional Floral Divider */}
        <DecorativeDivider className="my-2 max-w-xs text-turmeric" />

        {/* Warm Description */}
        <p className="text-cream font-poppins text-xs sm:text-sm md:text-base font-light max-w-2xl leading-relaxed mb-6 drop-shadow-sm px-2">
          "{isTelugu ? teluguInvitation.message : englishInvitation.message}"
        </p>

        {/* Muhurtham Quick Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl mb-8">
          <div className="bg-maroon-deep/80 backdrop-blur-md border border-turmeric/50 rounded-xl p-3 flex items-center gap-3 text-left">
            <div className="p-2.5 rounded-lg bg-turmeric/20 text-turmeric-light">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-cinzel text-turmeric tracking-wider">
                {isTelugu ? "శుభ దినం & తేదీ" : "Auspicious Date"}
              </div>
              <div className="text-cream text-sm font-semibold font-poppins">{event.dateFormatted}</div>
              <div className="text-turmeric-light text-[11px] font-telugu">{event.teluguDate}</div>
            </div>
          </div>

          <div className="bg-maroon-deep/80 backdrop-blur-md border border-turmeric/50 rounded-xl p-3 flex items-center gap-3 text-left">
            <div className="p-2.5 rounded-lg bg-turmeric/20 text-turmeric-light">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-cinzel text-turmeric tracking-wider">
                {isTelugu ? "శుభ ముహూర్తం" : "Sumuhurtham"}
              </div>
              <div className="text-turmeric-bright text-base font-bold font-poppins">{event.muhurthamTime}</div>
              <div className="text-cream text-[11px] font-poppins">{event.muhurthamPeriod} • {event.lagnam}</div>
            </div>
          </div>
        </div>

        {/* With Best Compliments From */}
        <div className="flex flex-col items-center">
          <span className="text-cream-light/80 font-cormorant italic text-sm md:text-base">
            {isTelugu ? teluguInvitation.closing : englishInvitation.closing}
          </span>
          <span className="text-turmeric-light font-cinzel text-lg md:text-xl font-bold tracking-widest mt-0.5">
            {familyDetails.familySurname} Family
          </span>
          <span className="text-cream text-xs font-telugu mt-0.5 opacity-90">
            ({familyDetails.familySurnameTelugu} కుటుంబ సభ్యులు)
          </span>
        </div>

        {/* Interactive Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#muhurtham"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-turmeric to-turmeric-light text-maroon-deep font-cinzel font-bold text-xs md:text-sm tracking-wider uppercase shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 border border-yellow-200"
          >
            <span>{tr('hero.exploreSchedule')}</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>

          <a
            href="#venue"
            className="px-6 py-3 rounded-full bg-maroon-deep/90 hover:bg-maroon border border-turmeric/70 text-cream font-cinzel text-xs md:text-sm tracking-wider uppercase backdrop-blur-md transition-all duration-300 flex items-center gap-2 hover:border-turmeric"
          >
            <MapPin className="w-4 h-4 text-turmeric" />
            <span>{tr('hero.getDirections')}</span>
          </a>
        </div>
      </div>

      {/* 5. Bottom Door Threshold (Gadapa) */}
      <div className="relative z-20 w-full">
        <div className="w-full gadapa-threshold h-3 flex items-center justify-center gap-8 shadow-md">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-templeRed shadow-xs border border-maroon-dark"></div>
          ))}
        </div>

        <div className="bg-gradient-to-t from-cream via-cream/90 to-transparent py-4 text-center">
          <a
            href="#invitation-card"
            className="inline-flex flex-col items-center text-maroon hover:text-templeRed transition-colors"
          >
            <span className="text-[11px] font-cinzel uppercase tracking-widest font-semibold mb-1">
              {tr('hero.scrollPrompt')}
            </span>
            <ChevronDown className="w-4 h-4 text-turmeric-dark animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
