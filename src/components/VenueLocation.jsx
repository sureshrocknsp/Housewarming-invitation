import React, { useState } from 'react';
import { gruhapravesamConfig } from '../config/gruhapravesamConfig';
import { useLanguage } from '../context/LanguageContext';
import {
  BrassLamp,
  BananaTreeMotif,
  DecorativeDivider,
  MugguCorner,
  ThoranamGarland
} from './TraditionalMotifs';
import {
  MapPin,
  Navigation,
  Copy,
  Check,
  Phone,
  Home,
  Building2,
  ExternalLink,
  Compass
} from 'lucide-react';

export default function VenueLocation() {
  const {
    venue,
    home,
    contacts,
    guestWelcome
  } = gruhapravesamConfig;

  const { language } = useLanguage();
  const isTelugu = language === 'TE';

  const [copied, setCopied] = useState(false);

  // Copy Full Address
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(venue.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="venue" className="relative py-12 sm:py-20 px-2.5 sm:px-4 bg-cream bg-muggu-pattern border-t-2 border-turmeric/40">
      <div className="max-w-6xl mx-auto">
        {/* ================= 1. TRADITIONAL GUEST WELCOME SECTION ================= */}
        <div className="relative bg-gradient-to-b from-[#FFFDF7] via-cream-light to-[#FFFBF0] border-4 border-turmeric/80 rounded-3xl p-4 sm:p-10 md:p-12 shadow-royal mb-10 sm:mb-14 text-center overflow-hidden">
          {/* Ornate Corner Muggu Accents */}
          <MugguCorner className="absolute top-2 left-2 w-12 sm:w-16 h-12 sm:h-16 text-turmeric/40 pointer-events-none" />
          <MugguCorner className="absolute top-2 right-2 w-12 sm:w-16 h-12 sm:h-16 text-turmeric/40 transform rotate-90 pointer-events-none" />

          {/* Hanging Mango Leaf & Marigold Thoranam */}
          <div className="relative -mt-4 -mx-4 sm:-mt-10 sm:-mx-10 mb-3 sm:mb-4 pointer-events-none">
            <ThoranamGarland className="w-full opacity-90" />
          </div>

          {/* Flanking Banana Trees (Visible on larger screens) */}
          <div className="absolute left-3 top-20 pointer-events-none opacity-40 hidden md:block">
            <BananaTreeMotif className="w-14 h-36" />
          </div>
          <div className="absolute right-3 top-20 pointer-events-none opacity-40 hidden md:block">
            <BananaTreeMotif className="w-14 h-36" mirror />
          </div>

          {/* Welcome Badge & Deepams */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Sacred Sloka Badge */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-1.5 rounded-full bg-maroon text-cream border border-turmeric/80 shadow-md mb-3">
              <span className="text-xs sm:text-sm font-telugu font-bold text-turmeric-bright tracking-widest">
                {guestWelcome.slokaBadge}
              </span>
            </div>

            {/* Glowing Deepams */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 my-1">
              <div className="opacity-90 scale-75">
                <BrassLamp className="w-8 h-20" />
              </div>
              <div className="p-2 rounded-full bg-turmeric/20 border border-turmeric/50">
                <Home className="w-6 sm:w-7 h-6 sm:h-7 text-maroon" />
              </div>
              <div className="opacity-90 scale-75">
                <BrassLamp className="w-8 h-20" />
              </div>
            </div>

            {/* Welcome Headings */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-telugu font-extrabold text-maroon leading-tight mt-1 mb-1">
              {guestWelcome.headingTelugu}
            </h2>
            <h3 className="text-sm sm:text-lg md:text-xl font-cinzel font-bold text-antiqueGold tracking-wider uppercase mb-2 sm:mb-3">
              {guestWelcome.headingEnglish}
            </h3>

            {/* Welcome Message */}
            <p className="text-xs sm:text-base md:text-lg font-cormorant italic text-maroon-dark max-w-2xl mx-auto leading-relaxed font-medium px-2">
              "{guestWelcome.description}"
            </p>
            {isTelugu && (
              <p className="text-xs sm:text-sm font-telugu text-maroon-light max-w-xl mx-auto mt-1">
                {guestWelcome.descriptionTelugu}
              </p>
            )}

            <DecorativeDivider className="my-3 max-w-xs" />
          </div>
        </div>

        {/* ================= 2 & 3. VENUE INFORMATION CARD & GOOGLE MAPS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Venue Information Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white/95 border-2 border-turmeric/70 rounded-3xl p-4 sm:p-8 shadow-royal relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-turmeric via-templeRed to-turmeric"></div>

              {/* Header with Traditional House Icon */}
              <div className="flex items-center gap-3 text-maroon mb-4 sm:mb-5 border-b border-turmeric/30 pb-3 sm:pb-4">
                <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-maroon to-templeRed text-cream shadow-md shrink-0">
                  <Building2 className="w-5 sm:w-6 h-5 sm:h-6 text-turmeric" />
                </div>
                <div>
                  <span className="text-[10px] font-cinzel uppercase font-bold text-turmeric-dark tracking-wider block">
                    Auspicious Venue
                  </span>
                  <h4 className="text-base sm:text-xl font-bold font-telugu text-maroon leading-tight">
                    {isTelugu ? venue.teluguName : venue.name}
                  </h4>
                  <span className="text-xs font-cinzel text-gray-500 font-semibold">
                    {venue.familyNameResidence}
                  </span>
                </div>
              </div>

              {/* Structured Address Fields */}
              <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm font-poppins text-maroon-dark">
                {/* Villa / Enclave */}
                <div className="p-2.5 rounded-xl bg-cream-light/60 border border-turmeric/30">
                  <span className="text-[10px] font-cinzel uppercase font-bold text-gray-500 block mb-0.5">
                    Residence / Plot:
                  </span>
                  <span className="font-semibold text-maroon text-sm font-telugu">
                    {isTelugu ? venue.teluguVillaOrApt : venue.villaOrApt}
                  </span>
                </div>

                {/* Street / Area */}
                <div className="p-2.5 rounded-xl bg-cream-light/60 border border-turmeric/30">
                  <span className="text-[10px] font-cinzel uppercase font-bold text-gray-500 block mb-0.5">
                    Street & Colony:
                  </span>
                  <span className="font-medium text-maroon-dark">
                    {isTelugu ? venue.teluguStreet : venue.street}
                  </span>
                </div>

                {/* Landmark */}
                <div className="p-2.5 rounded-xl bg-turmeric/15 border border-turmeric/50 flex items-start gap-2">
                  <Compass className="w-4 h-4 text-templeRed shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-cinzel uppercase font-bold text-maroon block mb-0.5">
                      Nearby Landmark:
                    </span>
                    <span className="font-bold text-maroon text-xs sm:text-sm font-telugu">
                      {isTelugu ? venue.teluguLandmark : venue.landmark}
                    </span>
                  </div>
                </div>

                {/* City, State, PIN */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-cream-light border border-turmeric/30">
                    <span className="text-[9px] font-cinzel uppercase text-gray-500 block font-semibold">City</span>
                    <span className="font-bold text-maroon">{venue.city}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-cream-light border border-turmeric/30">
                    <span className="text-[9px] font-cinzel uppercase text-gray-500 block font-semibold">State</span>
                    <span className="font-bold text-maroon">{venue.state}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-cream-light border border-turmeric/30">
                    <span className="text-[9px] font-cinzel uppercase text-gray-500 block font-semibold">PIN Code</span>
                    <span className="font-bold text-maroon">{venue.pinCode}</span>
                  </div>
                </div>
              </div>

              {/* Navigation & Address Action Buttons */}
              <div className="mt-5 sm:mt-6 flex flex-col gap-2.5 pt-4 border-t border-turmeric/30">
                <a
                  href={venue.googleMapsDirectionsUrl || venue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] py-3.5 px-4 rounded-xl bg-gradient-to-r from-maroon via-templeRed to-maroon hover:from-maroon-dark hover:to-maroon text-cream font-cinzel text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01] border border-turmeric/40 cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-turmeric" />
                  <span>Get Directions (GPS)</span>
                </a>

                <button
                  onClick={handleCopyAddress}
                  className="w-full min-h-[44px] py-2.5 px-3 rounded-xl bg-white border border-turmeric/70 hover:bg-cream text-maroon font-cinzel text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  title="Copy full address to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-leafGreen shrink-0" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-antiqueGold shrink-0" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Integration */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative rounded-3xl overflow-hidden border-2 border-turmeric/70 shadow-royal bg-cream-light h-64 sm:h-[440px]">
              {venue.googleMapsEmbedUrl ? (
                <iframe
                  title="Gruhapravesam Event Location Map"
                  src={venue.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter saturate-[1.1]"
                />
              ) : (
                /* Fallback Placeholder if not configured */
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-cream-soft text-maroon">
                  <MapPin className="w-12 h-12 text-turmeric mb-2" />
                  <h5 className="font-cinzel font-bold text-sm">Venue Map Location</h5>
                  <p className="text-xs text-gray-600 mt-1">{venue.fullAddress}</p>
                </div>
              )}

              {/* Top Floating Direct Navigation Button */}
              <a
                href={venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 bg-white/95 hover:bg-white text-maroon font-cinzel text-xs font-bold px-3.5 py-2 rounded-xl shadow-lg border border-turmeric flex items-center gap-1.5 backdrop-blur-sm transition-all hover:scale-105"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-turmeric-dark" />
              </a>
            </div>
          </div>
        </div>

        {/* ================= FAMILY CONTACT SECTION ================= */}
        <div className="bg-cream-light/95 border-2 border-turmeric/60 rounded-3xl p-6 sm:p-10 shadow-royal mb-12">
          <div className="text-center mb-6">
            <span className="text-xs font-cinzel uppercase tracking-widest text-antiqueGold font-bold">
              Assistance & Coordination
            </span>
            <h3 className="text-2xl sm:text-3xl font-telugu font-bold text-maroon mt-1">
              {isTelugu ? 'కుటుంబ సభ్యుల సంప్రదింపు వివరాలు' : 'Family Contact & Coordination'}
            </h3>
            <p className="text-xs font-poppins text-gray-600 mt-1">
              Feel free to call our family hosts for any guidance, transit, or assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {contacts.map((contact, idx) => (
              <div
                key={idx}
                className="bg-white border border-turmeric/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs hover:border-turmeric transition-all"
              >
                <div className="text-center sm:text-left">
                  <span className="text-[10px] uppercase font-cinzel text-turmeric-dark font-bold block">
                    {contact.relation}
                  </span>
                  <div className="text-sm sm:text-base font-bold font-telugu text-maroon">
                    {isTelugu ? contact.teluguName : contact.name}
                  </div>
                  <div className="text-xs font-poppins font-medium text-gray-700 mt-0.5">
                    {contact.phone}
                  </div>
                </div>

                <div className="w-full sm:w-auto shrink-0">
                  {/* Call Now */}
                  <a
                    href={`tel:${contact.phone ? String(contact.phone).replace(/[^0-9+]/g, '') : ''}`}
                    className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-maroon hover:bg-maroon-light text-cream font-cinzel text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                    title={`Call ${contact.name}`}
                  >
                    <Phone className="w-3.5 h-3.5 text-turmeric" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 8. TRADITIONAL WELCOME CLOSING MESSAGE ================= */}
        <div className="text-center max-w-3xl mx-auto pt-4">
          <p className="text-sm sm:text-base md:text-lg font-telugu text-maroon font-bold leading-relaxed mb-2 px-4">
            "{guestWelcome.closingBlessingTelugu}"
          </p>
          <p className="text-xs sm:text-sm font-cormorant italic text-antiqueGold-dark font-semibold">
            "{guestWelcome.closingBlessingEnglish}"
          </p>
          <div className="text-turmeric text-sm tracking-widest mt-2">
            ✦ ✦ ✦ 🪔 ✦ ✦ ✦
          </div>
        </div>
      </div>
    </section>
  );
}
