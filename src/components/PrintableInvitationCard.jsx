import React, { forwardRef, useState, useEffect } from 'react';
import { gruhapravesamConfig } from '../config/gruhapravesamConfig';
import {
  KalashamMotif,
  BananaTreeMotif,
  BrassLamp,
  DecorativeDivider,
  MugguCorner,
  ThoranamGarland
} from './TraditionalMotifs';
import { generateQrCode } from '../utils/qrCodeGenerator';
import { Calendar, Clock, MapPin, Phone, Sparkles } from 'lucide-react';

/**
 * Printable Gruhapravesam Invitation Card
 * ========================================
 * Authentic South Indian traditional design with cream parchment, deep maroon,
 * antique gold foil borders, Kalasham, banana tree motifs, mango leaf thoranam,
 * temple corners, and dynamic Google Maps / Website QR code.
 *
 * Supports:
 * - Language: 'TE' (Telugu) or 'EN' (English)
 * - Format: 'A5' (Standard card), 'A4' (Full sheet), 'MOBILE' (1080x1920 story)
 */
const PrintableInvitationCard = forwardRef(function PrintableInvitationCard(
  { language = 'TE', format = 'A5', className = '', id },
  ref
) {
  const isTelugu = language === 'TE';
  const {
    slokas,
    teluguInvitation,
    englishInvitation,
    familyDetails,
    home,
    venue,
    event,
    contacts
  } = gruhapravesamConfig;

  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    // Generate QR code for the invitation website
    let isMounted = true;
    generateQrCode(typeof window !== 'undefined' ? window.location.href.split('#')[0] : '').then(
      (dataUrl) => {
        if (isMounted && dataUrl) {
          setQrCodeUrl(dataUrl);
        }
      }
    );
    return () => {
      isMounted = false;
    };
  }, []);

  // Format aspect ratio styling
  const formatClasses =
    format === 'MOBILE'
      ? 'w-[540px] min-h-[960px] p-8'
      : format === 'A4'
      ? 'w-[680px] min-h-[960px] p-10'
      : 'w-[580px] min-h-[820px] p-8'; // A5 standard default

  return (
    <div
      ref={ref}
      id={id}
      className={`relative bg-[#FFFDF7] text-maroon-dark font-poppins selection:bg-turmeric selection:text-maroon shadow-2xl overflow-hidden mx-auto border-4 border-turmeric/80 rounded-2xl ${formatClasses} ${className}`}
      style={{
        backgroundImage: 'radial-gradient(#F3E5AB 0.75px, transparent 0.75px), radial-gradient(#F3E5AB 0.75px, #FFFDF7 0.75px)',
        backgroundSize: '30px 30px',
        backgroundPosition: '0 0, 15px 15px'
      }}
    >
      {/* Outer Temple Decorative Border */}
      <div className="absolute inset-2 border-2 border-turmeric/60 rounded-xl pointer-events-none"></div>
      <div className="absolute inset-3 border border-maroon/20 rounded-lg pointer-events-none"></div>

      {/* Ornate Corner Muggu Motifs */}
      <MugguCorner className="absolute top-3 left-3 w-16 h-16 text-turmeric/50 transform rotate-0 pointer-events-none" />
      <MugguCorner className="absolute top-3 right-3 w-16 h-16 text-turmeric/50 transform rotate-90 pointer-events-none" />
      <MugguCorner className="absolute bottom-3 left-3 w-16 h-16 text-turmeric/50 transform -rotate-90 pointer-events-none" />
      <MugguCorner className="absolute bottom-3 right-3 w-16 h-16 text-turmeric/50 transform rotate-180 pointer-events-none" />

      {/* Mango Leaf Thoranam Across the Top */}
      <div className="relative -mt-4 -mx-4 mb-3">
        <ThoranamGarland className="w-full opacity-90" />
      </div>

      {/* Flanking Banana Trees (Left and Right) */}
      <div className="absolute left-2 top-28 pointer-events-none opacity-40 hidden sm:block">
        <BananaTreeMotif className="w-14 h-40" />
      </div>
      <div className="absolute right-2 top-28 pointer-events-none opacity-40 hidden sm:block">
        <BananaTreeMotif className="w-14 h-40" mirror />
      </div>

      {/* Inner Card Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* ================= 1. TOP SECTION ================= */}
        {/* Sacred Sloka Header */}
        <div className="mb-2">
          <div className="inline-flex items-center justify-center gap-2 px-5 py-1.5 rounded-full bg-maroon text-cream border border-turmeric/80 shadow-md">
            <span className="text-xs sm:text-sm font-telugu font-bold text-turmeric-light tracking-wide">
              {isTelugu ? slokas.primary : '|| SRI GANESHAYA NAMAHA ||'}
            </span>
            <span className="text-turmeric text-xs">✦</span>
            <span className="text-xs sm:text-sm font-telugu font-bold text-turmeric-light tracking-wide">
              {isTelugu ? slokas.secondary : '|| SRI VENKATESWARAYA NAMAHA ||'}
            </span>
          </div>
          <div className="text-[11px] font-telugu font-bold text-turmeric-dark tracking-widest mt-1">
            {slokas.shubhamastu} • అవిఘ్నమస్తు • శ్రీరస్తు
          </div>
        </div>

        {/* Traditional Brass Kalasham Motif & Flanking Deepams */}
        <div className="flex items-center justify-center gap-6 my-1">
          <div className="opacity-80 scale-75 hidden sm:block">
            <BrassLamp className="w-8 h-20" />
          </div>
          <div className="drop-shadow-md">
            <KalashamMotif className="w-14 h-16 sm:w-16 sm:h-18" />
          </div>
          <div className="opacity-80 scale-75 hidden sm:block">
            <BrassLamp className="w-8 h-20" />
          </div>
        </div>

        <DecorativeDivider className="my-2 max-w-xs scale-90" />

        {/* ================= 2. MAIN SECTION ================= */}
        {/* Title & Invitation Wording */}
        <div className="my-1 max-w-xl">
          <div className="text-xs font-cinzel font-bold text-antiqueGold tracking-widest uppercase mb-1">
            {isTelugu ? 'శుభ గృహప్రవేశ ఆహ్వానం' : 'CORDIAL INVITATION'}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-telugu font-extrabold text-maroon leading-tight my-1 drop-shadow-xs">
            {isTelugu ? teluguInvitation.title : englishInvitation.title}
          </h1>

          <div className="text-sm font-cinzel font-bold text-maroon-dark tracking-wide uppercase mt-0.5">
            {isTelugu
              ? `${familyDetails.familySurnameTelugu} వారి నూతన గృహం: ${home.teluguName}`
              : `${familyDetails.familySurname} Family's New Abode: ${home.name}`}
          </div>

          <p className="text-xs sm:text-sm font-telugu text-maroon-dark/90 leading-relaxed mt-2 px-2 italic font-medium">
            "{isTelugu ? teluguInvitation.opening : englishInvitation.opening}"
          </p>

          <p className="text-xs sm:text-sm font-telugu text-maroon-dark leading-relaxed mt-1 px-4">
            {isTelugu ? teluguInvitation.message : englishInvitation.message}
          </p>
        </div>

        {/* ================= 3. FAMILY SECTION ================= */}
        <div className="w-full my-3 py-2.5 px-4 rounded-xl bg-cream-light/80 border border-turmeric/60 shadow-xs max-w-lg">
          <div className="text-[10px] font-cinzel font-bold uppercase tracking-widest text-maroon-light mb-1">
            {isTelugu ? 'ఆహ్వానకర్తలు (Hosts):' : 'Cordially Invited By:'}
          </div>
          <div className="text-sm sm:text-base font-bold font-telugu text-maroon">
            {isTelugu ? familyDetails.hosts.teluguNames : familyDetails.hosts.names}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-turmeric/30 text-xs">
            <div>
              <div className="text-[9px] font-cinzel uppercase text-gray-500 font-semibold">
                {isTelugu ? 'పెద్దల ఆశీస్సులు' : 'Elders / Grandparents'}
              </div>
              <div className="font-telugu font-medium text-maroon-dark text-[11px]">
                {isTelugu ? familyDetails.grandparents.teluguNames : familyDetails.grandparents.names}
              </div>
            </div>
            <div>
              <div className="text-[9px] font-cinzel uppercase text-gray-500 font-semibold">
                {isTelugu ? 'కుటుంబ సభ్యులు' : 'Children / Family'}
              </div>
              <div className="font-telugu font-medium text-maroon-dark text-[11px]">
                {isTelugu ? (familyDetails.children?.teluguNames || familyDetails.familyMembers?.[0]?.teluguName) : (familyDetails.children?.names || familyDetails.familyMembers?.[0]?.name)}
              </div>
            </div>
          </div>

          <div className="text-[10px] font-cinzel text-maroon-light tracking-wider mt-1.5 font-bold uppercase">
            {isTelugu ? `శుభాకాంక్షలతో: ${familyDetails.familySurnameTelugu} బంధుమిత్రులు` : `With Best Compliments From: ${familyDetails.familySurname} Family & Friends`}
          </div>
        </div>

        {/* ================= 4. EVENT SECTION ================= */}
        <div className="w-full max-w-lg my-2 p-3 rounded-xl bg-gradient-to-r from-turmeric/15 via-turmeric/25 to-turmeric/15 border border-turmeric/70 shadow-xs">
          {/* Auspicious Muhurtham Highlights */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pb-2 border-b border-turmeric/40">
            <div className="flex items-center gap-1.5 text-maroon font-bold text-xs sm:text-sm">
              <Calendar className="w-4 h-4 text-templeRed shrink-0" />
              <span>{isTelugu ? event.teluguDate : `${event.day || 'Auspicious Day'}, ${event.date}`}</span>
            </div>
            <div className="flex items-center gap-1.5 text-maroon font-bold text-xs sm:text-sm">
              <Clock className="w-4 h-4 text-templeRed shrink-0" />
              <span>{event.muhurthamTime || event.muhurtham} ({isTelugu ? event.lagnam : event.lagnam})</span>
            </div>
          </div>

          {/* Key Ritual Timings */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[10px] sm:text-[11px] font-poppins text-maroon-dark">
            <div className="text-center p-1 rounded-lg bg-white/70 border border-turmeric/30">
              <span className="font-bold block text-maroon">{isTelugu ? 'సుముహూర్తం' : 'Muhurtham'}</span>
              <span className="text-[10px] text-gray-700">{event.muhurtham}</span>
            </div>
            <div className="text-center p-1 rounded-lg bg-white/70 border border-turmeric/30">
              <span className="font-bold block text-maroon">{isTelugu ? 'వాస్తు పూజ' : 'Vastu Pooja'}</span>
              <span className="text-[10px] text-gray-700">{event.vastuPooja}</span>
            </div>
            <div className="text-center p-1 rounded-lg bg-white/70 border border-turmeric/30">
              <span className="font-bold block text-maroon">{isTelugu ? 'సత్యనారాయణ వ్రతం' : 'Satyanarayana'}</span>
              <span className="text-[10px] text-gray-700">{event.satyanarayanaVratham}</span>
            </div>
            <div className="text-center p-1 rounded-lg bg-white/70 border border-turmeric/30">
              <span className="font-bold block text-maroon">{isTelugu ? 'విందు భోజనం' : 'Lunch Feast'}</span>
              <span className="text-[10px] text-leafGreen-dark font-semibold">{event.lunch}</span>
            </div>
          </div>
        </div>

        {/* ================= 5. VENUE & QR CODE SECTION ================= */}
        <div className="w-full max-w-lg my-2 p-3 rounded-xl bg-white/85 border border-turmeric/60 shadow-xs flex items-center justify-between gap-3 text-left">
          {/* Address details */}
          <div className="flex-1 pr-2">
            <div className="flex items-center gap-1 text-[11px] font-cinzel font-bold text-maroon uppercase mb-1">
              <MapPin className="w-3.5 h-3.5 text-templeRed shrink-0" />
              <span>{isTelugu ? 'వేదిక & చిరునామా (Venue)' : 'Venue & Location'}</span>
            </div>
            <div className="text-xs font-bold font-telugu text-maroon">
              {isTelugu ? venue.teluguName : venue.name}
            </div>
            <p className="text-[10px] sm:text-[11px] font-poppins text-gray-700 leading-tight mt-0.5">
              {isTelugu ? venue.teluguFullAddress : venue.fullAddress}
            </p>
            <div className="text-[9px] font-telugu text-antiqueGold-dark font-semibold mt-1">
              {isTelugu ? `ల్యాండ్‌మార్క్: ${venue.teluguLandmark}` : `Landmark: ${venue.landmark}`}
            </div>
          </div>

          {/* QR Code */}
          <div className="shrink-0 flex flex-col items-center text-center p-1.5 rounded-xl bg-cream border border-turmeric/60 shadow-inner">
            {qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt="Scan for Venue & Digital Invitation"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-contain"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-turmeric/20 rounded-lg flex items-center justify-center text-[9px] text-maroon">
                QR Code
              </div>
            )}
            <span className="text-[8px] font-cinzel uppercase font-bold tracking-wider text-maroon mt-1">
              Scan for GPS & Info
            </span>
          </div>
        </div>

        {/* ================= 6. BOTTOM SECTION ================= */}
        <div className="w-full max-w-lg mt-2 pt-2 border-t border-turmeric/40 flex flex-col items-center">
          {/* Contact Numbers */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] sm:text-[11px] font-poppins text-maroon-dark font-medium">
            {contacts[0] && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-leafGreen shrink-0" />
                <span>{contacts[0].name}: <strong>{contacts[0].phone}</strong></span>
              </span>
            )}
            {contacts[1] && (
              <>
                <span className="text-turmeric">|</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-leafGreen shrink-0" />
                  <span>{contacts[1].name}: <strong>{contacts[1].phone}</strong></span>
                </span>
              </>
            )}
          </div>

          {/* Devotional Closing Sloka */}
          <div className="mt-2 text-xs sm:text-sm font-telugu font-bold text-maroon bg-turmeric/20 px-4 py-1 rounded-full border border-turmeric/50">
            {slokas.closingSloka}
          </div>

          {/* Threshold Muggu Dots */}
          <div className="text-turmeric text-xs tracking-widest mt-1 opacity-70">
            ✦ ✦ ✦ 🪔 ✦ ✦ ✦
          </div>
        </div>
      </div>
    </div>
  );
});

export default PrintableInvitationCard;
