import React, { useState, useEffect } from 'react';
import { invitationConfig } from '../config/invitationConfig';
import { Sparkles, Clock, CalendarDays, PartyPopper } from 'lucide-react';

export default function CountdownTimer() {
  const { event } = invitationConfig;
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      // Auspicious Muhurtham strictly anchored to Indian Standard Time (IST, UTC+05:30)
      // Date: 26th November 2026 at 08:00 PM IST
      const targetIST = '2026-11-26T20:00:00+05:30';
      const target = new Date(targetIST).getTime();
      const now = Date.now();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'Days', teluguLabel: 'రోజులు', value: timeLeft.days },
    { label: 'Hours', teluguLabel: 'గంటలు', value: timeLeft.hours },
    { label: 'Minutes', teluguLabel: 'నిమిషాలు', value: timeLeft.minutes },
    { label: 'Seconds', teluguLabel: 'సెకన్లు', value: timeLeft.seconds },
  ];

  const muhurthamDisplay = typeof event.muhurtham === 'string' ? event.muhurtham : (event.muhurthamTime || event.muhurtham?.time || '[TIME]');

  return (
    <div className="w-full max-w-4xl mx-auto px-2.5 sm:px-4 py-4 sm:py-8">
      <div className="relative bg-gradient-to-b from-cream-soft via-cream to-cream-warm border-2 border-turmeric/60 rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 shadow-royal text-center overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-1.5 left-1.5 text-turmeric-dark/30 text-sm sm:text-lg">✦</div>
        <div className="absolute top-1.5 right-1.5 text-turmeric-dark/30 text-sm sm:text-lg">✦</div>
        <div className="absolute bottom-1.5 left-1.5 text-turmeric-dark/30 text-sm sm:text-lg">✦</div>
        <div className="absolute bottom-1.5 right-1.5 text-turmeric-dark/30 text-sm sm:text-lg">✦</div>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-maroon text-cream text-[10px] sm:text-xs font-cinzel font-semibold tracking-wider uppercase mb-2 sm:mb-3 shadow-md">
          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-turmeric" />
          <span>Auspicious Muhurtham Countdown</span>
        </div>

        <h3 className="text-lg sm:text-2xl font-telugu font-bold text-maroon mb-0.5 sm:mb-1">
          శుభ ముహూర్తమునకు మిగిలిన సమయం
        </h3>
        <p className="text-[11px] sm:text-sm font-poppins text-maroon-light mb-4 sm:mb-6">
          Counting down to the sacred Gruhapravesam moment at {muhurthamDisplay}
        </p>

        {timeLeft.isExpired ? (
          /* Elegant Event-Day Message when countdown reaches zero */
          <div className="py-5 px-3 sm:py-6 sm:px-4 bg-white/90 border border-turmeric rounded-xl sm:rounded-2xl shadow-gold-glow max-w-xl mx-auto flex flex-col items-center animate-in fade-in zoom-in-95">
            <div className="p-2 sm:p-3 rounded-full bg-turmeric/20 text-maroon mb-2">
              <PartyPopper className="w-6 h-6 sm:w-8 sm:h-8 text-turmeric-dark" />
            </div>
            <span className="text-xl sm:text-3xl font-bold font-telugu text-maroon mb-1">
              శుభ గృహప్రవేశ మహోత్సవ శుభదినం!
            </span>
            <span className="text-xs sm:text-sm font-cinzel font-bold text-turmeric-dark uppercase tracking-widest mb-1.5 text-center">
              Today is the Auspicious Gruhapravesam Day!
            </span>
            <p className="text-xs sm:text-sm font-poppins text-maroon-dark/90 leading-relaxed max-w-md text-center">
              We warmly welcome you and your family to join our celebrations and bless our new home today.
            </p>
          </div>
        ) : (
          /* Mobile-First 4-Column Compact Grid */
          <div className="grid grid-cols-4 gap-1.5 sm:gap-4 max-w-2xl mx-auto">
            {timeBlocks.map((block, idx) => (
              <div
                key={idx}
                className="relative bg-white/90 border border-turmeric/50 rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-xs flex flex-col items-center justify-center transition-all duration-300 hover:shadow-gold-glow group"
              >
                {/* Dial top metallic ring */}
                <div className="w-5 sm:w-8 h-0.5 sm:h-1 rounded-full bg-turmeric/40 mb-1 sm:mb-2 group-hover:bg-turmeric transition-colors"></div>

                <div className="text-xl sm:text-3xl md:text-5xl font-poppins font-bold text-maroon tracking-tight">
                  {String(block.value).padStart(2, '0')}
                </div>

                <div className="text-[10px] sm:text-xs font-bold font-cinzel text-maroon-dark uppercase tracking-wider mt-0.5 sm:mt-1">
                  {block.label}
                </div>

                <div className="text-[9px] sm:text-[11px] font-telugu text-turmeric-dark font-medium">
                  {block.teluguLabel}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Subtitle footer */}
        <div className="mt-4 sm:mt-6 inline-flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-maroon-light font-poppins bg-turmeric/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-turmeric/30 max-w-full">
          <CalendarDays className="w-3.5 h-3.5 text-turmeric-dark shrink-0" />
          <span className="truncate">{event.dateFormatted} • {event.nakshatram}</span>
        </div>
      </div>
    </div>
  );
}
