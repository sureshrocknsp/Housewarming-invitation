import React, { useEffect, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Sparkles,
  Maximize2,
  ZoomIn,
  Image as ImageIcon
} from 'lucide-react';

export default function ImageLightbox({
  isOpen,
  onClose,
  items = [],
  currentIndex = 0,
  onNavigate,
  isTelugu = false
}) {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const currentItem = items[currentIndex] || null;

  // Keyboard Navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, items.length]);

  // Reset loading state on item change
  useEffect(() => {
    setIsImgLoaded(false);
    setImgError(false);
  }, [currentIndex]);

  if (!isOpen || !currentItem) return null;

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onNavigate(prevIndex);
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    const nextIndex = (currentIndex + 1) % items.length;
    onNavigate(nextIndex);
  };

  // Mobile Swipe Handlers
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 animate-in fade-in duration-300 select-none"
      onClick={onClose}
    >
      {/* Top Controls Bar */}
      <div
        className="w-full max-w-6xl flex items-center justify-between text-cream z-20 pb-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <span className="text-turmeric text-sm">🪔</span>
          <span className="text-xs sm:text-sm font-cinzel font-semibold tracking-wider text-cream-light">
            {isTelugu ? currentItem.teluguTitle : currentItem.title}
          </span>
          <span className="text-xs font-poppins text-gray-400 hidden sm:inline">
            ({currentIndex + 1} of {items.length})
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-poppins text-gray-400 sm:hidden">
            {currentIndex + 1} / {items.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-turmeric text-cream hover:text-maroon transition-all cursor-pointer"
            title="Close Lightbox (Esc)"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Display Area */}
      <div
        className="relative w-full max-w-5xl flex-1 flex items-center justify-center min-h-0 my-2"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Button - Left */}
        <button
          onClick={handlePrev}
          className="absolute left-1 sm:left-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-turmeric text-cream hover:text-maroon border border-turmeric/40 transition-all shadow-lg hover:scale-110 cursor-pointer"
          title="Previous Image (Left Arrow)"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Image Container with Gold Border */}
        <div className="relative max-h-full max-w-full flex flex-col items-center justify-center p-1 sm:p-2 bg-cream/5 border-2 border-turmeric/50 rounded-2xl shadow-2xl overflow-hidden">
          {!isImgLoaded && !imgError && (
            <div className="w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center text-turmeric animate-pulse">
              <Sparkles className="w-8 h-8 animate-spin" />
            </div>
          )}

          {!imgError ? (
            <img
              src={currentItem.image}
              alt={currentItem.title}
              onLoad={() => setIsImgLoaded(true)}
              onError={(e) => {
                // If main image fails, try fallback or show placeholder
                if (currentItem.fallbackImage && e.target.src !== currentItem.fallbackImage) {
                  e.target.src = currentItem.fallbackImage;
                } else {
                  setImgError(true);
                }
              }}
              className={`max-h-[65vh] sm:max-h-[70vh] w-auto object-contain rounded-xl transition-opacity duration-300 shadow-royal ${
                isImgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className="p-12 text-center text-cream flex flex-col items-center">
              <ImageIcon className="w-12 h-12 text-turmeric mb-2" />
              <div className="text-sm font-cinzel font-bold text-turmeric">
                {currentItem.title}
              </div>
              <div className="text-xs font-telugu text-cream-light mt-1">
                {currentItem.teluguTitle}
              </div>
            </div>
          )}

          {/* Placeholder watermark if temporary */}
          {currentItem.isPlaceholder && (
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/70 border border-turmeric/50 text-[10px] font-cinzel text-turmeric uppercase tracking-wider backdrop-blur-xs">
              Family Photo Slot
            </div>
          )}
        </div>

        {/* Navigation Button - Right */}
        <button
          onClick={handleNext}
          className="absolute right-1 sm:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-turmeric text-cream hover:text-maroon border border-turmeric/40 transition-all shadow-lg hover:scale-110 cursor-pointer"
          title="Next Image (Right Arrow)"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Bottom Caption & Story Details Bar */}
      <div
        className="w-full max-w-4xl bg-maroon-deep/90 border border-turmeric/60 rounded-2xl p-4 sm:p-5 text-center text-cream shadow-royal backdrop-blur-md z-20 mt-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-center gap-2 mb-1.5">
          <span className="text-xs sm:text-sm font-telugu font-bold text-turmeric-bright">
            {currentItem.teluguTitle}
          </span>
          <span className="text-turmeric text-xs">•</span>
          <span className="text-xs sm:text-sm font-cinzel font-bold text-cream tracking-wide">
            {currentItem.title}
          </span>
          {currentItem.date && (
            <span className="text-[10px] font-cinzel px-2 py-0.5 rounded-full bg-black/30 text-turmeric-light border border-turmeric/30 flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5" />
              <span>{currentItem.date}</span>
            </span>
          )}
        </div>

        <p className="text-xs sm:text-sm font-poppins text-cream/90 max-w-2xl mx-auto leading-relaxed">
          {isTelugu ? currentItem.teluguDescription : currentItem.description}
        </p>

        {isTelugu && currentItem.teluguDescription !== currentItem.description && (
          <p className="text-[11px] font-cormorant italic text-turmeric-light/80 max-w-xl mx-auto mt-1">
            "{currentItem.description}"
          </p>
        )}
      </div>
    </div>
  );
}
