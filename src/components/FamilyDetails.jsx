import React from 'react';
import { gruhapravesamConfig } from '../config/gruhapravesamConfig';
import { useLanguage } from '../context/LanguageContext';
import { DecorativeDivider, MugguCorner } from './TraditionalMotifs';
import { Users, Heart, Crown, Sparkles, Home, Award } from 'lucide-react';

export default function FamilyDetails() {
  const { familyDetails } = gruhapravesamConfig;
  const { language } = useLanguage();

  const isTelugu = language === 'TE';
  const isEnglish = language === 'EN';

  return (
    <section id="family" className="relative py-10 sm:py-14 px-2.5 sm:px-4 bg-cream bg-muggu-pattern">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-turmeric/20 border border-turmeric text-maroon text-xs font-cinzel font-bold tracking-wider uppercase mb-2 shadow-xs">
            <Users className="w-3.5 h-3.5 text-turmeric-dark" />
            <span>{isTelugu ? "కుటుంబ పరిచయం" : "Family Introduction"}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-telugu font-bold text-maroon mb-1">
            {isEnglish ? "Our Family Members" : "మా కుటుంబ సభ్యుల వివరాలు"}
          </h2>
          <p className="text-xs sm:text-sm font-cinzel tracking-widest text-antiqueGold font-bold uppercase">
            {isTelugu ? `${familyDetails.familySurnameTelugu} వంశీయులు` : `The ${familyDetails.familySurname} Family`}
          </p>

          <DecorativeDivider className="my-3 max-w-xs" />
        </div>

        {/* Traditional Decorative Frame for Family (Section 4) */}
        <div className="relative bg-[#FFFBF0] border-2 border-turmeric/80 rounded-3xl p-3.5 sm:p-8 md:p-10 shadow-royal overflow-hidden">
          {/* Temple-inspired corner motifs */}
          <MugguCorner className="absolute top-2 left-2 w-12 sm:w-16 h-12 sm:h-16 text-turmeric/40 pointer-events-none" />
          <MugguCorner className="absolute top-2 right-2 w-12 sm:w-16 h-12 sm:h-16 text-turmeric/40 transform rotate-90 pointer-events-none" />
          <MugguCorner className="absolute bottom-2 left-2 w-12 sm:w-16 h-12 sm:h-16 text-turmeric/40 transform -rotate-90 pointer-events-none" />
          <MugguCorner className="absolute bottom-2 right-2 w-12 sm:w-16 h-12 sm:h-16 text-turmeric/40 transform rotate-180 pointer-events-none" />

          {/* Inner Ornate Filigree Border */}
          <div className="border border-turmeric/40 rounded-2xl p-3.5 sm:p-7 md:p-8 relative z-10 flex flex-col items-center">
            
            {/* 1. Family Surname Badge */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-maroon text-cream border border-turmeric shadow-md mb-5 sm:mb-6 max-w-full">
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
            <div className="w-full bg-gradient-to-r from-cream-soft via-cream-light to-cream-soft border border-turmeric/60 rounded-2xl p-4 sm:p-6 mb-5 sm:mb-6 text-center shadow-xs">
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
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
              {/* Father Name */}
              <div className="bg-white/80 border border-turmeric/50 rounded-2xl p-3.5 sm:p-4 text-left shadow-2xs hover:border-turmeric transition-all">
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
              <div className="bg-white/80 border border-turmeric/50 rounded-2xl p-3.5 sm:p-4 text-left shadow-2xs hover:border-turmeric transition-all">
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

            {/* 4. Grandparents (Optional - Section 4) */}
            {familyDetails.grandparents?.hasGrandparents && (
              <div className="w-full bg-cream-soft/90 border border-turmeric/50 rounded-2xl p-4 sm:p-5 mb-6 text-center shadow-xs">
                <span className="text-[11px] font-cinzel uppercase tracking-widest font-bold text-turmeric-dark flex items-center justify-center gap-1.5 mb-1">
                  <Award className="w-4 h-4 text-maroon" />
                  <span>
                    {isTelugu ? familyDetails.grandparents.teluguTitle : familyDetails.grandparents.title}
                  </span>
                </span>
                <div className="text-base sm:text-lg font-bold font-poppins text-maroon">
                  {isTelugu ? familyDetails.grandparents.teluguNames : familyDetails.grandparents.names}
                </div>
                {!isTelugu && !isEnglish && (
                  <div className="text-xs font-telugu text-maroon-light font-medium mt-0.5">
                    {familyDetails.grandparents.teluguNames}
                  </div>
                )}
                <span className="text-[11px] font-cinzel text-maroon-light uppercase tracking-wider block mt-1">
                  {familyDetails.grandparents.role}
                </span>
              </div>
            )}

            {/* 5. Family Members / Children (Section 4) */}
            <div className="w-full">
              <div className="text-center mb-3">
                <span className="text-xs font-cinzel uppercase tracking-wider font-bold text-maroon-light">
                  {isTelugu ? "కుటుంబ సభ్యులు (Children)" : "Family Members & Children"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {familyDetails.familyMembers.map((member, i) => (
                  <div
                    key={i}
                    className="bg-white/80 border border-turmeric/40 rounded-xl p-3.5 flex items-center justify-between shadow-2xs hover:shadow-xs transition-shadow"
                  >
                    <div>
                      <div className="font-semibold text-sm font-poppins text-maroon">
                        {member.name}
                      </div>
                      <div className="text-xs font-telugu text-maroon-light">
                        {member.teluguName}
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-cinzel font-bold text-turmeric-dark bg-turmeric/10 px-2.5 py-1 rounded-full border border-turmeric/30">
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warm family welcome note */}
            <p className="text-xs font-poppins text-maroon-dark/80 italic mt-6 text-center max-w-lg">
              "{isTelugu ? familyDetails.welcomeNoteTelugu : familyDetails.welcomeNoteEnglish}"
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
