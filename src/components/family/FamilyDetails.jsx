import React from 'react';
import { gruhapravesamConfig } from '../../config/gruhapravesamConfig';
import { useLanguage } from '../../context/LanguageContext';
import SectionHeader from '../ui/SectionHeader';
import { MugguCorner } from '../TraditionalMotifs';
import { Users, Heart, Crown, Home } from 'lucide-react';

export default function FamilyDetails() {
  const { familyDetails } = gruhapravesamConfig;
  const { language } = useLanguage();

  const isTelugu = language === 'TE';
  const isEnglish = language === 'EN';

  return (
    <section id="family" className="relative py-12 sm:py-20 px-3 sm:px-6 bg-cream bg-muggu-pattern">
      <div className="max-w-4xl mx-auto">
        {/* Unified Section Header */}
        <SectionHeader
          badgeIcon={Users}
          badgeText={isTelugu ? "కుటుంబ పరిచయం" : "Family Introduction"}
          teluguHeading={isEnglish ? "Our Family Members" : "మా కుటుంబ సభ్యుల వివరాలు"}
          englishSubtitle={isTelugu ? `${familyDetails.familySurnameTelugu} వంశీయులు` : `The ${familyDetails.familySurname} Family`}
        />

        {/* Traditional Decorative Frame for Family */}
        <div className="card-parchment p-4 sm:p-8 md:p-10 shadow-royal overflow-hidden">
          {/* Temple-inspired corner motifs */}
          <MugguCorner className="absolute top-2 left-2 w-10 h-10 sm:w-16 sm:h-16 text-turmeric/40 pointer-events-none" />
          <MugguCorner className="absolute top-2 right-2 w-10 h-10 sm:w-16 sm:h-16 text-turmeric/40 transform rotate-90 pointer-events-none" />
          <MugguCorner className="absolute bottom-2 left-2 w-10 h-10 sm:w-16 sm:h-16 text-turmeric/40 transform -rotate-90 pointer-events-none" />
          <MugguCorner className="absolute bottom-2 right-2 w-10 h-10 sm:w-16 sm:h-16 text-turmeric/40 transform rotate-180 pointer-events-none" />

          {/* Inner Ornate Filigree Border */}
          <div className="gold-foil-inset p-4 sm:p-8 relative z-10 flex flex-col items-center">
            
            {/* 1. Family Surname Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-maroon text-cream border border-turmeric shadow-md mb-6 max-w-full">
              <Crown className="w-4 h-4 text-turmeric shrink-0" />
              <div className="text-center truncate">
                <span className="text-[10px] sm:text-xs font-cinzel uppercase tracking-widest font-bold text-turmeric-light block">
                  Family Surname (వంశ నామం)
                </span>
                <span className="text-sm sm:text-lg font-telugu font-bold text-cream">
                  {familyDetails.familySurnameTelugu} ({familyDetails.familySurname})
                </span>
              </div>
            </div>

            {/* 2. Gruhapravesam Hosts */}
            <div className="w-full bg-gradient-to-r from-cream-soft via-cream-light to-cream-soft border border-turmeric/60 rounded-2xl p-4 sm:p-6 mb-6 text-center shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-cinzel font-bold uppercase tracking-wider text-turmeric-dark mb-1">
                <Home className="w-4 h-4 text-maroon" />
                <span>
                  {isTelugu ? familyDetails.hosts.teluguTitle : familyDetails.hosts.title}
                </span>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold font-poppins text-maroon leading-snug">
                {isTelugu ? familyDetails.hosts.teluguNames : familyDetails.hosts.names}
              </h3>
              {!isTelugu && !isEnglish && (
                <div className="text-xs sm:text-sm font-telugu text-maroon-dark font-medium mt-0.5">
                  {familyDetails.hosts.teluguNames}
                </div>
              )}
              <p className="text-xs font-cormorant italic text-maroon-light mt-1">
                {familyDetails.hosts.relation}
              </p>
            </div>

            {/* 3. Father & Mother Individual Identification Cards */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Father Name */}
              <div className="bg-white/90 border border-turmeric/50 rounded-2xl p-4 text-left shadow-2xs hover:border-turmeric transition-all">
                <span className="text-[10px] uppercase font-cinzel tracking-wider font-bold text-turmeric-dark block mb-1">
                  Father Name (తండ్రి)
                </span>
                <div className="text-sm sm:text-base font-bold font-poppins text-maroon">
                  {familyDetails.fatherName || familyDetails.fatherNameEnglish}
                </div>
                <div className="text-xs font-telugu text-maroon-light font-medium mt-0.5">
                  {familyDetails.fatherNameTelugu}
                </div>
              </div>

              {/* Mother Name */}
              <div className="bg-white/90 border border-turmeric/50 rounded-2xl p-4 text-left shadow-2xs hover:border-turmeric transition-all">
                <span className="text-[10px] uppercase font-cinzel tracking-wider font-bold text-turmeric-dark block mb-1">
                  Mother Name (తల్లి)
                </span>
                <div className="text-sm sm:text-base font-bold font-poppins text-maroon">
                  {familyDetails.motherName || familyDetails.motherNameEnglish}
                </div>
                <div className="text-xs font-telugu text-maroon-light font-medium mt-0.5">
                  {familyDetails.motherNameTelugu}
                </div>
              </div>
            </div>

            {/* 4. Children and Siblings Identification Section */}
            {familyDetails.children && familyDetails.children.length > 0 && (
              <div className="w-full pt-4 border-t border-turmeric/30">
                <div className="text-center mb-3">
                  <div className="inline-flex items-center gap-1.5 text-xs font-cinzel uppercase tracking-wider font-bold text-turmeric-dark">
                    <Heart className="w-3.5 h-3.5 text-templeRed" />
                    <span>Children & Family Members (పిల్లలు & కుటుంబ సభ్యులు)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {familyDetails.children.map((child, idx) => (
                    <div
                      key={idx}
                      className="bg-cream-light/80 border border-turmeric/40 rounded-xl p-3 flex items-center justify-between shadow-2xs"
                    >
                      <div>
                        <span className="text-[10px] uppercase font-cinzel text-gray-500 font-bold block">
                          {child.relation}
                        </span>
                        <div className="text-sm font-bold font-poppins text-maroon">
                          {isTelugu ? child.teluguName : child.name}
                        </div>
                      </div>
                      <span className="text-xs font-telugu text-turmeric-dark font-medium">
                        {child.teluguRelation}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. With Best Compliments From */}
            <div className="mt-6 pt-4 border-t border-turmeric/30 text-center w-full">
              <span className="text-xs font-cinzel uppercase tracking-widest text-turmeric-dark font-bold block mb-1">
                With Best Compliments From (ఆత్మీయ ఆహ్వానం):
              </span>
              <p className="text-xs sm:text-sm font-telugu text-maroon-dark font-medium leading-relaxed max-w-lg mx-auto">
                {familyDetails.compliments}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
