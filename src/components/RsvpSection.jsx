import React, { useState, useEffect } from 'react';
import { gruhapravesamConfig } from '../config/gruhapravesamConfig';
import { useLanguage } from '../context/LanguageContext';
import { rsvpService } from '../services/rsvpService';
import { DecorativeDivider, MugguCorner, BrassLamp } from './TraditionalMotifs';
import {
  Heart,
  Sparkles,
  Flower2,
  Home
} from 'lucide-react';

export default function RsvpSection() {
  const { home, familyDetails } = gruhapravesamConfig;
  const { language } = useLanguage();
  const isTelugu = language === 'TE';

  const [guestWishes, setGuestWishes] = useState([]);

  useEffect(() => {
    loadRecentWishes();
  }, []);

  const loadRecentWishes = async () => {
    try {
      const allWishes = await rsvpService.getPublicWishes();
      const wishes = allWishes
        .filter((r) => r.special_message || r.attendance_status === 'attending')
        .slice(0, 6);
      setGuestWishes(wishes);
    } catch (e) {
      console.warn('Could not load recent wishes:', e);
    }
  };

  return (
    <section id="blessings" className="relative py-12 sm:py-20 px-2.5 sm:px-4 bg-cream bg-muggu-pattern border-t-2 border-turmeric/40">
      <div className="max-w-4xl mx-auto">
        {/* Section Header with Existing Visual Style */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-turmeric/20 border border-turmeric text-maroon text-xs font-cinzel font-bold tracking-wider uppercase mb-2.5 shadow-xs">
            <Heart className="w-3.5 h-3.5 text-templeRed fill-templeRed" />
            <span>{isTelugu ? 'ఆశీస్సులు' : 'GUEST BLESSINGS'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-telugu font-bold text-maroon mb-2 leading-tight">
            మీ రాక కోసం ఎదురుచూస్తున్నాము
          </h2>
          
          <h3 className="text-sm sm:text-base md:text-lg font-cinzel font-bold text-antiqueGold tracking-wider uppercase mb-3">
            WE WOULD LOVE TO CELEBRATE WITH YOU!
          </h3>

          <p className="text-xs sm:text-sm md:text-base font-cormorant italic text-antiqueGold-dark font-medium max-w-2xl mx-auto mt-1 sm:mt-2 leading-relaxed px-2">
            "Your presence and blessings will make our Gruhapravesam celebration even more special."
          </p>

          <DecorativeDivider className="my-3 sm:my-4 max-w-xs" />
        </div>

        {/* Existing Blessing Message Card */}
        <div className="bg-cream-light/95 border-2 border-turmeric/70 rounded-3xl p-6 sm:p-10 md:p-12 shadow-royal backdrop-blur-xs relative overflow-hidden text-center">
          {/* Top Decorative Temple Accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-turmeric via-templeRed to-turmeric"></div>
          
          {/* Corner Kolam Accents */}
          <MugguCorner className="absolute top-2 left-2 w-12 sm:w-16 h-12 sm:h-16 text-turmeric/40 pointer-events-none" />
          <MugguCorner className="absolute top-2 right-2 w-12 sm:w-16 h-12 sm:h-16 text-turmeric/40 transform rotate-90 pointer-events-none" />

          {/* Sacred Sloka */}
          <div className="text-xs sm:text-sm font-telugu font-bold text-turmeric-dark mb-3">
            || శ్రీరస్తు శుభమస్తు అవిఘ్నమస్తు ||
          </div>

          {/* Auspicious Home Icon & Flanking Deepams */}
          <div className="flex items-center justify-center gap-4 my-2">
            <div className="opacity-90 scale-75">
              <BrassLamp className="w-6 h-16" />
            </div>
            <div className="w-14 h-14 rounded-full bg-turmeric/20 border-2 border-turmeric flex items-center justify-center shadow-md">
              <Home className="w-7 h-7 text-maroon" />
            </div>
            <div className="opacity-90 scale-75">
              <BrassLamp className="w-6 h-16" />
            </div>
          </div>

          <div className="max-w-2xl mx-auto mt-4 space-y-3">
            <p className="text-base sm:text-xl font-telugu font-bold text-maroon leading-relaxed">
              మా నూతన గృహప్రవేశ మహోత్సవంలో మీ పవిత్ర సాన్నిధ్యం మరియు ఆశీస్సులు మాకు ఎంతో ముఖ్యం.
            </p>

            <p className="text-xs sm:text-sm md:text-base font-cormorant italic text-maroon-dark leading-relaxed font-medium">
              "We eagerly look forward to welcoming you and your family into our new home, sharing this divine celebration, and seeking your cherished blessings for lifelong happiness, health, and prosperity."
            </p>

            <div className="pt-3">
              <div className="text-xs font-cinzel uppercase tracking-widest text-turmeric-dark font-bold">
                With Warm Love & Sincere Respect,
              </div>
              <div className="text-lg sm:text-xl font-bold font-telugu text-maroon mt-1">
                {familyDetails.hosts?.names || 'బోనం కుటుంబ సభ్యులు'}
              </div>
              <div className="text-xs font-cinzel text-antiqueGold font-semibold">
                {familyDetails.familySurname} Family
              </div>
            </div>
          </div>
        </div>

        {/* ================= GUESTBOOK / BLESSINGS WALL ================= */}
        {guestWishes.length > 0 && (
          <div className="mt-12 pt-8 border-t border-turmeric/30">
            <div className="text-center mb-6">
              <h4 className="text-xs sm:text-sm font-cinzel font-bold tracking-widest text-maroon uppercase flex items-center justify-center gap-2">
                <Flower2 className="w-4 h-4 text-turmeric-dark" />
                <span>{isTelugu ? 'ఆత్మీయుల నుండి వచ్చిన తాజా ఆశీస్సులు' : 'Recent Blessings from Well-Wishers'}</span>
                <Flower2 className="w-4 h-4 text-turmeric-dark" />
              </h4>
              <p className="text-[11px] sm:text-xs font-cormorant italic text-antiqueGold-dark">
                Auspicious wishes for {home.name}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guestWishes.map((wish, idx) => (
                <div
                  key={wish.id || idx}
                  className="bg-white/85 border border-turmeric/40 rounded-2xl p-4 shadow-xs relative overflow-hidden transition-all hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold font-poppins text-maroon flex items-center gap-1.5">
                      <span className="text-sm">🪔</span>
                      {wish.guest_name}
                    </span>
                    <span className="text-[9px] font-cinzel uppercase px-2 py-0.5 rounded-full bg-turmeric/20 text-maroon font-semibold">
                      Well Wisher
                    </span>
                  </div>
                  <p className="text-xs font-poppins text-gray-700 italic leading-relaxed">
                    "{wish.special_message || 'May your sacred new abode be showered with eternal joy, peace, and abundance!'}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
