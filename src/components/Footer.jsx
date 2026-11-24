import React from 'react';
import { gruhapravesamConfig } from '../config/gruhapravesamConfig';
import { useLanguage } from '../context/LanguageContext';
import { DecorativeDivider, BrassLamp } from './TraditionalMotifs';
import { ArrowUp, Heart } from 'lucide-react';

export default function Footer() {
  const { slokas, familyDetails } = gruhapravesamConfig;
  const { language } = useLanguage();

  const isTelugu = language === 'TE';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-maroon-deep text-cream pt-14 pb-12 sm:pt-16 sm:pb-14 px-3 sm:px-4 border-t-4 border-turmeric overflow-hidden pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
      {/* Background Decorative Kolam overlay */}
      <div className="absolute inset-0 bg-muggu-pattern opacity-10 pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Sacred Traditional Heading */}
        <div className="mb-2">
          <h3 className="text-xl sm:text-3xl font-telugu font-bold text-turmeric-bright leading-tight">
            మీ రాక కోసం ఎదురుచూస్తున్నాము
          </h3>
          <p className="text-sm sm:text-base md:text-lg font-cormorant italic text-cream-light max-w-xl mx-auto mt-1 leading-relaxed px-2 font-medium">
            "Your Presence and Blessings Mean a Lot to Us."
          </p>
        </div>

        {/* Decorative Divider */}
        <DecorativeDivider className="my-3 max-w-xs text-turmeric" />

        {/* With Love & Family Name */}
        <div className="my-3 sm:my-4">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase font-cinzel tracking-widest text-cream-light/80">
            <Heart className="w-3.5 h-3.5 text-templeRed fill-templeRed" />
            <span>With Love,</span>
          </div>
          <div className="text-2xl sm:text-4xl font-cinzel font-bold text-turmeric tracking-wider mt-1">
            {familyDetails.familySurname} Family
          </div>
          <div className="text-base sm:text-lg font-telugu text-cream-soft mt-0.5">
            {familyDetails.familySurnameTelugu} కుటుంబ సభ్యులు
          </div>
        </div>

        {/* Final Sacred Sloka Badge */}
        <div className="mt-4 mb-6 px-5 sm:px-6 py-2 rounded-full bg-maroon/90 border border-turmeric/60 inline-block shadow-gold-glow max-w-full">
          <span className="text-xs sm:text-base font-telugu font-bold text-turmeric-bright tracking-wide break-words">
            {slokas.closingSloka}
          </span>
        </div>

        {/* Back to Top Button (min 48px touch target for mobile thumb) */}
        <button
          onClick={scrollToTop}
          className="mt-2 w-12 h-12 rounded-full bg-turmeric hover:bg-turmeric-light text-maroon-deep transition-all duration-300 shadow-md hover:scale-110 active:scale-95 flex items-center justify-center group cursor-pointer"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform text-maroon-deep" />
        </button>

        {/* Bottom meta */}
        <div className="mt-8 pt-4 border-t border-turmeric/20 text-center text-[11px] font-poppins text-cream/60 tracking-wider w-full max-w-2xl">
          <div>
            Auspicious Gruhapravesam • {familyDetails.familySurname} Family
          </div>
        </div>
      </div>
    </footer>
  );
}
