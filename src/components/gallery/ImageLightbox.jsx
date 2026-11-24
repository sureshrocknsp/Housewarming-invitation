import React, { useEffect, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Sparkles,
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

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, items.length]);

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
        className="w-full max-w-5xl flex items-center justify-between z-10 text-cream py-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-cinzel font-bold text-turmeric uppercase tracking-wider">
            {currentIndex + 1} / {items.length}
          </span>
          <span className="text-gray-500 hidden sm:inline">•</span>
          <span className="text-xs font-poppins text-cream/80 hidden sm:inline">
            {currentItem.title}
          </span>
        </div>

        <button
          onClick={onClose}
          className="touch-target p-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-cream transition-colors cursor-pointer"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-2 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        {!isImgLoaded && !imgError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-turmeric gap-2">
            <Sparkles className="w-8 h-8 animate-spin" />
            <span className="text-xs font-cinzel tracking-wider uppercase text-cream/70">
              Loading photograph...
            </span>
          </div>
        )}

        {imgError ? (
          <div className="flex flex-col items-center justify-center text-gray-400 gap-2 p-8">
            <ImageIcon className="w-12 h-12" />
            <p className="text-sm font-poppins">Unable to load image.</p>
          </div>
        ) : (
          <img
            src={currentItem.image || currentItem.src}
            alt={currentItem.alt || currentItem.title}
            onLoad={() => setIsImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`max-h-[70vh] sm:max-h-[76vh] w-auto max-w-full object-contain rounded-xl sm:rounded-2xl border-2 border-turmeric/60 shadow-2xl transition-opacity duration-300 ${
              isImgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          />
        )}

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="touch-target absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 active:scale-95 text-cream border border-turmeric/50 backdrop-blur-sm transition-all cursor-pointer shadow-lg"
          aria-label="Previous photograph"
        >
          <ChevronLeft className="w-6 h-6 text-turmeric" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="touch-target absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 active:scale-95 text-cream border border-turmeric/50 backdrop-blur-sm transition-all cursor-pointer shadow-lg"
          aria-label="Next photograph"
        >
          <ChevronRight className="w-6 h-6 text-turmeric" />
        </button>
      </div>

      {/* Bottom Information Card */}
      <div
        className="w-full max-w-3xl bg-maroon-deep/95 border border-turmeric/70 rounded-2xl p-4 sm:p-5 text-center shadow-royal backdrop-blur-md z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-base">🪔</span>
          <h4 className="text-sm sm:text-base font-bold font-telugu text-cream">
            {isTelugu ? currentItem.teluguTitle : currentItem.title}
          </h4>
        </div>

        <p className="text-xs sm:text-sm font-poppins text-cream/85 max-w-xl mx-auto leading-relaxed">
          {isTelugu ? currentItem.teluguDescription : currentItem.description}
        </p>

        {currentItem.date && (
          <div className="mt-2 text-[10px] sm:text-[11px] font-cinzel text-turmeric-light uppercase tracking-wider flex items-center justify-center gap-1.5 opacity-90">
            <Calendar className="w-3.5 h-3.5" />
            <span>{currentItem.date}</span>
          </div>
        )}
      </div>
    </div>
  );
}
