import React, { useState } from 'react';
import { gruhapravesamConfig } from '../../config/gruhapravesamConfig';
import { useLanguage } from '../../context/LanguageContext';
import SectionHeader from '../ui/SectionHeader';
import {
  Calendar,
  Sparkles,
  Utensils,
  CalendarPlus,
  Check,
  Flame,
  DoorClosed,
  CalendarDays
} from 'lucide-react';

export default function EventSchedule() {
  const { event, venue, home, teluguInvitation } = gruhapravesamConfig;
  const { language, tr } = useLanguage();
  const [calendarAdded, setCalendarAdded] = useState(false);

  const isTelugu = language === 'TE';

  // Function to create Google Calendar Event Link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Gruhapravesam Ceremony - ${home.name}`);
    const details = encodeURIComponent(
      `Gruhapravesam Ceremony (${teluguInvitation.title}) of ${gruhapravesamConfig.familyDetails.hosts.names}.\n\nMuhurtham: ${event.muhurthamTime}\nVenue: ${venue.fullAddress}`
    );
    const location = encodeURIComponent(venue.fullAddress);
    const dateStamp = event.date ? event.date.replace(/-/g, '') : '20261126';
    const dates = `${dateStamp}T143000Z/${dateStamp}T180000Z`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  // Function to download .ics calendar file
  const downloadIcsFile = () => {
    const dateStamp = event.date ? event.date.replace(/-/g, '') : '20261126';
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Gruhapravesam Invitation//Telugu Traditional//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:Gruhapravesam Ceremony - ${home.name}`,
      `DESCRIPTION:Gruhapravesam Ceremony of ${gruhapravesamConfig.familyDetails.hosts.names}.\\nMuhurtham: ${event.muhurthamTime}\\nVenue: ${venue.fullAddress}`,
      `LOCATION:${venue.fullAddress}`,
      `DTSTART:${dateStamp}T143000Z`,
      `DTEND:${dateStamp}T180000Z`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Gruhapravesam-Invitation.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCalendarAdded(true);
    setTimeout(() => setCalendarAdded(false), 4000);
  };

  return (
    <section id="muhurtham" className="relative py-14 sm:py-20 px-3 sm:px-6 bg-cream-soft border-t border-turmeric/20">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          badgeIcon={Calendar}
          badgeText={tr('schedule.badge')}
          teluguHeading={tr('schedule.heading')}
          englishSubtitle="Auspicious Muhurtham & Sacred Ceremony Timings"
        />

        {/* Premium Traditional Calendar & Highlights Card */}
        <div className="card-parchment p-4 sm:p-8 md:p-10 shadow-royal mb-8 sm:mb-12 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-turmeric via-templeRed to-turmeric"></div>

          {/* Vertically Stacked Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 text-center">
            {/* 1. Event Date */}
            <div className="bg-gradient-to-b from-cream to-cream-soft border border-turmeric/50 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between shadow-2xs hover:border-turmeric transition-all">
              <div className="p-2 sm:p-2.5 rounded-full bg-turmeric/20 text-maroon mb-1.5">
                <CalendarDays className="w-5 h-5 text-maroon" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-cinzel font-bold uppercase tracking-wider text-turmeric-dark">
                {isTelugu ? 'శుభ తేదీ (Event Date)' : 'Event Date'}
              </span>
              <div className="text-xl sm:text-2xl font-poppins font-bold text-maroon my-1">
                {event.date}
              </div>
              <p className="text-xs text-maroon-light font-telugu">
                26th November 2026
              </p>
            </div>

            {/* 2. Day */}
            <div className="bg-gradient-to-b from-cream to-cream-soft border border-turmeric/50 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between shadow-2xs hover:border-turmeric transition-all">
              <div className="p-2 sm:p-2.5 rounded-full bg-turmeric/20 text-maroon mb-1.5">
                <Calendar className="w-5 h-5 text-maroon" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-cinzel font-bold uppercase tracking-wider text-turmeric-dark">
                {isTelugu ? 'వారం (Day)' : 'Day of Week'}
              </span>
              <div className="text-xl sm:text-2xl font-poppins font-bold text-maroon my-1">
                {event.day}
              </div>
              <p className="text-xs text-maroon-light font-telugu">
                {event.teluguDay} ({event.teluguDate.split('•')[2]?.trim() || 'కార్తీక బహుళ తదియ'})
              </p>
            </div>

            {/* 3. Muhurtham (Highlighted) */}
            <div className="bg-gradient-to-b from-cream via-cream-light to-cream-soft border-2 border-turmeric rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between shadow-gold-glow relative sm:col-span-2 lg:col-span-1">
              <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-maroon text-cream text-[9px] sm:text-[10px] font-cinzel font-bold tracking-wider uppercase shadow-xs">
                {tr('schedule.sumuhurthamBadge')}
              </div>
              <div className="p-2 sm:p-2.5 rounded-full bg-turmeric/20 text-maroon mb-1.5 mt-0.5">
                <Sparkles className="w-5 h-5 text-turmeric-dark animate-pulse" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-cinzel font-bold uppercase tracking-wider text-turmeric-dark">
                {isTelugu ? 'గృహప్రవేశ సుముహూర్తం' : 'Gruhapravesam Muhurtham'}
              </span>
              <div className="text-2xl sm:text-3xl font-poppins font-bold text-maroon my-1">
                {event.muhurthamTime}
              </div>
              <p className="text-xs text-maroon-light font-poppins">
                రాత్రి 08:00 • {event.nakshatram}
              </p>
            </div>

            {/* 4. Ganapathi Pooja */}
            <div className="bg-gradient-to-b from-cream to-cream-soft border border-turmeric/50 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between shadow-2xs hover:border-turmeric transition-all">
              <div className="p-2 sm:p-2.5 rounded-full bg-turmeric/20 text-maroon mb-1.5">
                <DoorClosed className="w-5 h-5 text-maroon" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-cinzel font-bold uppercase tracking-wider text-turmeric-dark">
                {isTelugu ? 'గణపతి & ద్వార పూజ' : 'Ganapathi Pooja'}
              </span>
              <div className="text-xl sm:text-2xl font-poppins font-bold text-maroon my-1">
                {event.ganapathiPooja}
              </div>
              <p className="text-xs text-maroon-light font-telugu">
                ద్వార తోరణ పూజ
              </p>
            </div>

            {/* 5. Vastu Pooja */}
            <div className="bg-gradient-to-b from-cream to-cream-soft border border-turmeric/50 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between shadow-2xs hover:border-turmeric transition-all">
              <div className="p-2 sm:p-2.5 rounded-full bg-turmeric/20 text-maroon mb-1.5">
                <Flame className="w-5 h-5 text-templeRed" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-cinzel font-bold uppercase tracking-wider text-turmeric-dark">
                {isTelugu ? 'వాస్తు పూజ & పాలు పొంగించడం' : 'Vastu Pooja & Milk Boiling'}
              </span>
              <div className="text-xl sm:text-2xl font-poppins font-bold text-maroon my-1">
                {event.vastuPooja}
              </div>
              <p className="text-xs text-maroon-light font-telugu">
                క్షీర సంప్రోక్షణ
              </p>
            </div>

            {/* 6. Dinner Feast */}
            <div className="bg-gradient-to-b from-cream to-cream-soft border border-turmeric/50 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between shadow-2xs hover:border-turmeric transition-all">
              <div className="p-2 sm:p-2.5 rounded-full bg-turmeric/20 text-maroon mb-1.5">
                <Utensils className="w-5 h-5 text-leafGreen-dark" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-cinzel font-bold uppercase tracking-wider text-turmeric-dark">
                {isTelugu ? 'సాంప్రదాయ విందు భోజనం' : 'Dinner Feast'}
              </span>
              <div className="text-xl sm:text-2xl font-poppins font-bold text-maroon my-1">
                {event.lunch}
              </div>
              <p className="text-xs text-maroon-light font-poppins">
                Traditional Dinner Feast
              </p>
            </div>
          </div>

          {/* Action Row: Google Calendar & iCal Export */}
          <div className="pt-4 sm:pt-6 border-t border-turmeric/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs font-cinzel font-bold uppercase text-turmeric-dark block">
                {isTelugu ? 'క్యాలెండర్‌లో నమోదు చేసుకోండి' : 'Save Event to Your Calendar'}
              </span>
              <span className="text-xs font-poppins text-maroon-light">
                {event.dateFormatted} • {event.muhurthamTime}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:flex items-center gap-2.5 w-full sm:w-auto">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target w-full sm:w-auto px-5 py-3 rounded-xl bg-maroon hover:bg-maroon-light text-cream font-cinzel text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <CalendarPlus className="w-4 h-4 text-turmeric" />
                <span>{tr('schedule.googleCalBtn')}</span>
              </a>

              <button
                onClick={downloadIcsFile}
                className="touch-target w-full sm:w-auto px-5 py-3 rounded-xl bg-cream border border-turmeric/80 hover:bg-cream-warm text-maroon font-cinzel text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {calendarAdded ? (
                  <>
                    <Check className="w-4 h-4 text-leafGreen-light" />
                    <span>{tr('schedule.addedCal')}</span>
                  </>
                ) : (
                  <>
                    <CalendarPlus className="w-4 h-4 text-maroon" />
                    <span>{tr('schedule.icsBtn')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Traditional Rituals Timeline */}
        <div className="mt-8 sm:mt-12">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-3xl font-telugu font-bold text-maroon">
              {tr('schedule.timelineHeading')}
            </h3>
            <p className="text-xs sm:text-sm font-poppins text-maroon-light mt-0.5">
              {tr('schedule.timelineSubtitle')}
            </p>
          </div>

          <div className="relative border-l-2 border-turmeric/60 ml-2 sm:ml-4 md:ml-32 space-y-6 sm:space-y-8 pl-4 sm:pl-6 md:pl-8">
            {event.schedule.map((item, idx) => (
              <div
                key={idx}
                className={`relative bg-cream-light/95 border ${
                  item.highlight ? 'border-turmeric shadow-gold-glow' : 'border-turmeric/40'
                } rounded-2xl p-4 sm:p-6 transition-all hover:-translate-y-0.5`}
              >
                <div className="absolute -left-[27px] sm:-left-[35px] md:-left-[43px] top-4 sm:top-5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-cream border-4 border-turmeric flex items-center justify-center shadow-md">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-maroon"></div>
                </div>

                <div className="md:absolute md:-left-36 md:top-5 md:w-28 text-left md:text-right mb-1.5 md:mb-0">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-maroon text-cream font-cinzel text-xs font-bold tracking-wider shadow-sm">
                    {item.time}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h4 className="text-base sm:text-lg font-bold font-poppins text-maroon flex items-center gap-2 flex-wrap">
                    <span>{isTelugu ? item.teluguTitle : item.title}</span>
                    {item.highlight && (
                      <span className="text-[9px] sm:text-[10px] font-cinzel bg-turmeric text-maroon-deep px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        {tr('schedule.sumuhurthamBadge')}
                      </span>
                    )}
                  </h4>
                  {!isTelugu && (
                    <span className="text-xs sm:text-sm font-telugu text-turmeric-dark font-semibold">
                      {item.teluguTitle}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm font-poppins text-maroon-dark/90 leading-relaxed mt-1">
                  {isTelugu ? item.teluguDescription : item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
