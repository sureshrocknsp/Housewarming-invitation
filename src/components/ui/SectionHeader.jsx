import React from 'react';
import { DecorativeDivider } from '../TraditionalMotifs';

/**
 * SectionHeader
 * Reusable, art-directed section header enforcing consistent visual hierarchy,
 * font sizes, auspicious pill badge, and traditional divider.
 */
export default function SectionHeader({
  badgeIcon: BadgeIcon,
  badgeText,
  teluguHeading,
  englishSubtitle,
  description,
  className = "text-center mb-10 sm:mb-14",
  dividerClassName = "my-4 max-w-xs"
}) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Auspicious Pill Badge */}
      {badgeText && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-turmeric/15 border border-turmeric/70 text-maroon text-[11px] sm:text-xs font-cinzel font-bold tracking-widest uppercase mb-3 shadow-xs">
          {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 text-turmeric-dark" />}
          <span>{badgeText}</span>
        </div>
      )}

      {/* Primary Telugu Heading */}
      {teluguHeading && (
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-telugu font-extrabold text-maroon mb-2 leading-tight tracking-wide">
          {teluguHeading}
        </h2>
      )}

      {/* Secondary English Subtitle */}
      {englishSubtitle && (
        <p className="text-xs sm:text-sm font-cinzel tracking-[0.2em] text-antiqueGold-dark font-bold uppercase mb-2">
          {englishSubtitle}
        </p>
      )}

      {/* Optional Descriptive Context */}
      {description && (
        <p className="text-xs sm:text-sm md:text-base font-cormorant italic text-maroon-dark/90 font-medium max-w-2xl mx-auto leading-relaxed px-4">
          "{description}"
        </p>
      )}

      {/* Decorative Divider */}
      <DecorativeDivider className={dividerClassName} />
    </div>
  );
}
