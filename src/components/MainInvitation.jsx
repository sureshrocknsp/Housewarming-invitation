import React from 'react';
import { gruhapravesamConfig } from '../config/gruhapravesamConfig';
import { useLanguage } from '../context/LanguageContext';
import { DecorativeDivider, MugguCorner } from './TraditionalMotifs';
import {
  Sparkles,
  MapPin,
  Heart
} from 'lucide-react';

export default function MainInvitation() {
  const { slokas, teluguInvitation, englishInvitation, familyDetails, home, venue, event } = gruhapravesamConfig;
  const { language, tr } = useLanguage();

  const isTeluguOnly = language === 'TE';
  const isEnglishOnly = language === 'EN';
  const isBilingual = language === 'BOTH' || (!isTeluguOnly && !isEnglishOnly);

  return (
    <section id="invitation-card" className="relative py-10 sm:py-16 px-2.5 sm:px-6 bg-cream bg-muggu-pattern">
      <div className="max-w-4xl mx-auto">
        {/* Main Traditional Royal Parchment Card */}
        <div className="relative bg-[#FFFBF0] border-2 border-turmeric/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 md:p-12 shadow-royal overflow-hidden print:p-8 print:shadow-none print:border-2 print:border-maroon">
          
          {/* Ornate Corner Muggu Accents */}
          <MugguCorner className="absolute top-1.5 left-1.5 w-12 h-12 sm:w-20 sm:h-20 text-turmeric/40 transform rotate-0" />
          <MugguCorner className="absolute top-1.5 right-1.5 w-12 h-12 sm:w-20 sm:h-20 text-turmeric/40 transform rotate-90" />
          <MugguCorner className="absolute bottom-1.5 left-1.5 w-12 h-12 sm:w-20 sm:h-20 text-turmeric/40 transform -rotate-90" />
          <MugguCorner className="absolute bottom-1.5 right-1.5 w-12 h-12 sm:w-20 sm:h-20 text-turmeric/40 transform rotate-180" />

          {/* Inner Golden Foil Border */}
          <div className="border border-turmeric/50 rounded-xl sm:rounded-2xl p-3.5 sm:p-8 relative z-10 flex flex-col items-center text-center">
            
            {/* 1. Traditional Opening Slokas */}
            <div className="flex flex-col items-center gap-1.5 mb-4 sm:mb-6 w-full">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 bg-maroon-deep/95 border border-turmeric/70 px-3.5 sm:px-6 py-2 rounded-full shadow-gold-glow max-w-full">
                <span className="text-turmeric-light font-telugu text-xs sm:text-base md:text-lg font-bold tracking-wide">
                  {slokas.primary}
                </span>
                <span className="text-turmeric/60 text-xs hidden sm:inline">✦</span>
                <span className="text-turmeric-light font-telugu text-xs sm:text-base md:text-lg font-bold tracking-wide">
                  {slokas.secondary}
                </span>
                <span className="text-turmeric/60 text-xs hidden sm:inline">✦</span>
                <span className="text-turmeric-bright font-telugu text-xs sm:text-base md:text-lg font-bold tracking-wide">
                  {slokas.shubhamastu}
                </span>
              </div>
              <div className="text-[11px] sm:text-xs font-telugu text-turmeric-dark font-medium tracking-widest mt-0.5">
                {slokas.subtext}
              </div>
            </div>

            {/* Decorative Antique Gold Separator */}
            <DecorativeDivider text="Auspicious Invitation" teluguText="శుభ ఆహ్వానం" className="my-1.5 max-w-xs scale-90 sm:scale-100" />

            {/* 2. Main Telugu Invitation */}
            {(!isEnglishOnly) && (
              <div className={`my-3 sm:my-4 max-w-2xl text-center w-full ${isBilingual ? 'border-b border-turmeric/30 pb-6 mb-6' : ''}`}>
                <div className="text-sm sm:text-base font-telugu font-bold text-turmeric-dark mb-1.5">
                  {teluguInvitation.invocation}
                </div>

                <p className="text-maroon-dark font-telugu text-xs sm:text-sm md:text-base leading-relaxed mb-3 px-1">
                  {teluguInvitation.opening}
                </p>

                {/* Grand Telugu Title Header */}
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-telugu font-extrabold text-maroon my-2 sm:my-3 leading-tight break-words">
                  <span className="text-maroon-gradient drop-shadow-xs">
                    {teluguInvitation.title}
                  </span>
                </h1>

                <p className="text-maroon-dark font-telugu text-xs sm:text-sm md:text-base leading-relaxed my-3 px-1">
                  {teluguInvitation.message}
                </p>

                <div className="mt-4 flex flex-col items-center">
                  <span className="text-xs font-telugu font-bold text-maroon-light">
                    {teluguInvitation.closing}
                  </span>
                  <span className="text-base sm:text-xl font-telugu font-bold text-maroon mt-0.5">
                    {familyDetails.hosts.teluguNames}
                  </span>
                  <span className="text-xs font-telugu text-turmeric-dark font-medium">
                    ({teluguInvitation.signoff})
                  </span>
                </div>
              </div>
            )}

            {/* 3. English Invitation */}
            {(!isTeluguOnly) && (
              <div className="my-3 sm:my-4 max-w-2xl text-center w-full">
                <div className="text-[11px] sm:text-xs font-cinzel font-bold text-turmeric-dark uppercase tracking-widest mb-1.5">
                  {englishInvitation.invocation}
                </div>

                <p className="text-maroon-dark font-cormorant italic text-sm sm:text-lg font-semibold leading-relaxed mb-2 px-1">
                  {englishInvitation.opening}
                </p>

                {/* English Grand Title */}
                <h2 className="text-xl sm:text-3xl md:text-4xl font-cinzel font-bold text-maroon tracking-wider uppercase my-2 break-words drop-shadow-xs">
                  {englishInvitation.title}
                </h2>

                <p className="text-maroon-dark font-poppins text-xs sm:text-sm leading-relaxed my-3 px-1">
                  {englishInvitation.message}
                </p>

                <div className="mt-4 flex flex-col items-center">
                  <span className="text-xs font-cinzel uppercase tracking-widest text-maroon-light font-semibold">
                    {englishInvitation.closing}
                  </span>
                  <span className="text-lg sm:text-2xl font-cinzel font-bold text-maroon mt-0.5">
                    {familyDetails.hosts.names}
                  </span>
                  <span className="text-xs font-telugu text-maroon-light">
                    ({familyDetails.familySurname})
                  </span>
                </div>
              </div>
            )}

            {/* Sacred Kalasham & Deepam Visual Ribbon */}
            <div className="w-full max-w-xl my-4 sm:my-6 rounded-2xl overflow-hidden border border-turmeric/60 shadow-traditional relative group">
              <img
                src="/images/pooja-kalasham.jpg"
                alt="Sacred South Indian Gruhapravesam Kalasham & Deepam"
                className="w-full h-44 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/90 via-maroon-deep/30 to-transparent flex items-end p-3 sm:p-4">
                <div className="text-left text-cream">
                  <div className="text-[11px] sm:text-xs font-cinzel uppercase tracking-wider text-turmeric-light font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Sacred Gruhapravesa Kalasham (మంగళ కలశం)</span>
                  </div>
                  <div className="text-[10px] sm:text-xs font-poppins text-cream-light/90">
                    Invoking divine grace, peace, and abundance into our new abode
                  </div>
                </div>
              </div>
            </div>

            {/* New Home Address Banner */}
            <div className="w-full bg-gradient-to-r from-cream-soft via-cream-light to-cream-soft border border-turmeric/60 rounded-2xl p-4 sm:p-5 text-center mb-4 sm:mb-6 shadow-2xs">
              <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase font-cinzel font-bold text-turmeric-dark mb-1">
                <MapPin className="w-3.5 h-3.5 text-maroon" />
                <span>New Home Address (నూతన గృహ ప్రవేశ స్థలం)</span>
              </div>
              <div className="text-base sm:text-xl font-bold font-cinzel text-maroon">
                {home.name} <span className="text-xs sm:text-sm font-telugu font-semibold">({home.teluguName})</span>
              </div>
              <div className="text-xs sm:text-sm font-poppins text-maroon-dark max-w-xl mx-auto mt-1 leading-snug">
                {venue.fullAddress}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
