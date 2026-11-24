import React, { useState } from 'react';
import { gruhapravesamConfig } from '../config/gruhapravesamConfig';
import { galleryCategories, galleryItems } from '../config/galleryConfig';
import { useLanguage } from '../context/LanguageContext';
import { DecorativeDivider, MugguCorner } from './TraditionalMotifs';
import ImageLightbox from './ImageLightbox';
import {
  Sparkles,
  Users,
  Home,
  Heart,
  Flower2,
  Calendar,
  Eye,
  BookOpen,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Lock,
  Camera
} from 'lucide-react';

export default function FamilyGallerySection() {
  const { language } = useLanguage();
  const isTelugu = language === 'TE';

  // Active Category filter
  const [activeCategory, setActiveCategory] = useState('all');

  // Presentation View Mode: 'masonry' | 'album'
  const [viewMode, setViewMode] = useState('masonry');

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Traditional Album Page Index (for 2-page spread in Album mode)
  const [albumPageIndex, setAlbumPageIndex] = useState(0);

  // Filter items by category
  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  // Open Lightbox
  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-3.5 h-3.5" />;
      case 'Home':
        return <Home className="w-3.5 h-3.5" />;
      case 'Heart':
        return <Heart className="w-3.5 h-3.5" />;
      case 'Flower2':
        return <Flower2 className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section
      id="gallery"
      className="relative py-12 sm:py-20 px-2.5 sm:px-4 bg-cream bg-muggu-pattern border-t-2 border-turmeric/40 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-turmeric/20 border border-turmeric text-maroon text-xs font-cinzel font-bold tracking-wider uppercase mb-3 shadow-xs">
            <Camera className="w-3.5 h-3.5 text-templeRed" />
            <span>FAMILY PHOTO GALLERY & MEMORIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-telugu font-bold text-maroon mb-2 drop-shadow-xs">
            మా ఇంటి జ్ఞాపకాలు
          </h2>
          <h3 className="text-sm sm:text-base md:text-lg font-cinzel font-bold text-antiqueGold tracking-widest uppercase">
            OUR HOME, OUR HAPPY MEMORIES
          </h3>

          <p className="text-xs sm:text-sm md:text-base font-cormorant italic text-antiqueGold-dark max-w-2xl mx-auto mt-2 leading-relaxed">
            "A beautiful collection of moments, memories and the beginning of a new journey in our dream home."
          </p>

          <DecorativeDivider className="my-4 max-w-xs" />
        </div>

        {/* Controls Bar: Category Filter Tabs & View Mode Switcher */}
        <div className="bg-white/90 border-2 border-turmeric/60 rounded-3xl p-4 sm:p-5 shadow-royal backdrop-blur-sm mb-10 flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {galleryCategories.map((cat) => {
              const count =
                cat.id === 'all'
                  ? galleryItems.length
                  : galleryItems.filter((i) => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setAlbumPageIndex(0);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-cinzel font-bold tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-maroon text-cream shadow-md scale-[1.02]'
                      : 'bg-cream-light hover:bg-cream text-maroon-dark border border-turmeric/40'
                  }`}
                >
                  {getCategoryIcon(cat.icon)}
                  <span>{isTelugu ? cat.teluguLabel : cat.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      activeCategory === cat.id
                        ? 'bg-turmeric text-maroon-deep font-bold'
                        : 'bg-black/10 text-gray-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher (Masonry Grid vs Traditional Family Album) */}
          <div className="flex items-center gap-1 bg-cream-light p-1 rounded-xl border border-turmeric/40 shrink-0 self-end lg:self-center">
            <button
              onClick={() => setViewMode('masonry')}
              className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'masonry'
                  ? 'bg-turmeric text-maroon-deep shadow-xs'
                  : 'hover:bg-cream text-maroon-dark'
              }`}
              title="Masonry Gallery View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Gallery Grid</span>
            </button>
            <button
              onClick={() => setViewMode('album')}
              className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'album'
                  ? 'bg-turmeric text-maroon-deep shadow-xs'
                  : 'hover:bg-cream text-maroon-dark'
              }`}
              title="Traditional South Indian Album Experience"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Traditional Album</span>
            </button>
          </div>
        </div>

        {/* ================= VIEW 1: MASONRY GALLERY GRID ================= */}
        {viewMode === 'masonry' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {filteredItems.map((item, index) => {
              // Determine aspect ratio class
              const aspectClass =
                item.aspect === 'portrait'
                  ? 'aspect-[3/4]'
                  : item.aspect === 'square'
                  ? 'aspect-square'
                  : 'aspect-[4/3]';

              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenLightbox(index)}
                  className={`group relative bg-white rounded-2xl overflow-hidden border-2 border-turmeric/60 shadow-royal transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-turmeric cursor-pointer flex flex-col ${
                    item.featured ? 'sm:col-span-1 lg:col-span-1' : ''
                  }`}
                >
                  {/* Photo Container */}
                  <div className={`relative w-full ${aspectClass} overflow-hidden bg-cream-soft`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => {
                        if (item.fallbackImage && e.target.src !== item.fallbackImage) {
                          e.target.src = item.fallbackImage;
                        }
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/90 via-maroon-deep/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-cream">
                      <div className="text-[10px] font-cinzel tracking-widest uppercase text-turmeric-light mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-turmeric" />
                        <span>{item.date || 'Memories'}</span>
                      </div>
                      <h4 className="text-sm font-telugu font-bold text-cream-light leading-snug">
                        {item.teluguTitle}
                      </h4>
                      <p className="text-xs font-cinzel text-turmeric line-clamp-1 mt-0.5">
                        {item.title}
                      </p>
                    </div>

                    {/* Corner Golden Accent */}
                    <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-turmeric opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Eye className="w-4 h-4" />
                    </div>

                    {/* Family Photo Slot Badge */}
                    {item.isPlaceholder && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 border border-turmeric/40 text-[9px] font-cinzel text-turmeric uppercase tracking-wider">
                        Family Photo
                      </div>
                    )}
                  </div>

                  {/* Bottom Caption Card */}
                  <div className="p-4 bg-white/95 border-t border-turmeric/30 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold font-telugu text-maroon line-clamp-1">
                          {item.teluguTitle}
                        </span>
                        {item.date && (
                          <span className="text-[10px] font-cinzel text-gray-500 shrink-0">
                            {item.date}
                          </span>
                        )}
                      </div>
                      <h5 className="text-xs font-cinzel font-semibold text-antiqueGold-dark line-clamp-1">
                        {item.title}
                      </h5>
                      <p className="text-[11px] font-poppins text-gray-600 line-clamp-2 mt-1 leading-relaxed">
                        {isTelugu ? item.teluguDescription : item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= VIEW 2: TRADITIONAL FAMILY ALBUM ================= */}
        {viewMode === 'album' && (
          <div className="max-w-4xl mx-auto bg-[#FFFDF7] border-4 border-turmeric/80 rounded-3xl p-4 sm:p-10 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Ornate Corner Accents */}
            <MugguCorner className="absolute top-2 left-2 w-12 sm:w-16 h-12 sm:h-16 text-turmeric/50 pointer-events-none" />
            <MugguCorner className="absolute top-2 right-2 w-12 sm:w-16 h-12 sm:h-16 text-turmeric/50 transform rotate-90 pointer-events-none" />
            <MugguCorner className="absolute bottom-2 left-2 w-12 sm:w-16 h-12 sm:h-16 text-turmeric/50 transform -rotate-90 pointer-events-none" />
            <MugguCorner className="absolute bottom-2 right-2 w-12 sm:w-16 h-12 sm:h-16 text-turmeric/50 transform rotate-180 pointer-events-none" />

            {/* Album Header Title */}
            <div className="text-center mb-5 sm:mb-6 relative z-10">
              <span className="text-[10px] sm:text-xs font-cinzel uppercase tracking-widest text-antiqueGold font-bold">
                South Indian Traditional Photo Album
              </span>
              <h3 className="text-lg sm:text-2xl font-telugu font-bold text-maroon mt-0.5">
                {gruhapravesamConfig.home?.teluguName || 'బోనం నిలయం'} కుటుంబ జ్ఞాపకాల సంపుటి
              </h3>
              <div className="text-[11px] font-poppins text-gray-500">
                Page {albumPageIndex + 1} of {filteredItems.length}
              </div>
            </div>

            {/* Current Album Page Item */}
            {filteredItems[albumPageIndex] && (
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Left: Framed Photograph */}
                <div
                  className="relative p-2.5 bg-white border-2 border-turmeric/70 rounded-2xl shadow-royal cursor-pointer group"
                  onClick={() => handleOpenLightbox(albumPageIndex)}
                >
                  <div className="aspect-[4/3] sm:aspect-[3/4] overflow-hidden rounded-xl bg-cream-soft relative">
                    <img
                      src={filteredItems[albumPageIndex].image}
                      alt={filteredItems[albumPageIndex].title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <span className="px-3 py-1 rounded-full bg-black/60 text-xs font-cinzel border border-turmeric flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> Click to Expand
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Album Story & Memory Log */}
                <div className="space-y-3 p-4 rounded-2xl bg-cream-light/60 border border-turmeric/30">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-turmeric/20 border border-turmeric/50 text-maroon text-[10px] font-cinzel font-bold uppercase">
                    <Calendar className="w-3 h-3 text-templeRed" />
                    <span>{filteredItems[albumPageIndex].date || 'Auspicious Milestone'}</span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-telugu font-bold text-maroon">
                    {filteredItems[albumPageIndex].teluguTitle}
                  </h4>
                  <h5 className="text-xs sm:text-sm font-cinzel font-bold text-antiqueGold uppercase tracking-wide">
                    {filteredItems[albumPageIndex].title}
                  </h5>

                  <p className="text-xs sm:text-sm font-telugu text-maroon-dark leading-relaxed">
                    {filteredItems[albumPageIndex].teluguDescription}
                  </p>

                  <p className="text-xs font-poppins text-gray-700 italic border-l-2 border-turmeric pl-3">
                    "{filteredItems[albumPageIndex].description}"
                  </p>

                  <button
                    onClick={() => handleOpenLightbox(albumPageIndex)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-maroon hover:bg-maroon-light text-cream text-xs font-cinzel font-bold tracking-wider uppercase transition-all shadow-xs cursor-pointer mt-2"
                  >
                    <Eye className="w-3.5 h-3.5 text-turmeric" />
                    <span>View High-Res Photo</span>
                  </button>
                </div>
              </div>
            )}

            {/* Album Navigation Controls */}
            <div className="relative z-10 flex items-center justify-between mt-8 pt-4 border-t border-turmeric/40">
              <button
                disabled={albumPageIndex === 0}
                onClick={() => setAlbumPageIndex((prev) => Math.max(0, prev - 1))}
                className="min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl bg-white border border-turmeric/60 text-maroon font-cinzel text-xs font-bold tracking-wider flex items-center gap-1.5 transition-all shadow-xs disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden xs:inline">Previous</span>
                <span className="xs:hidden">Prev</span>
              </button>

              {/* Dots indicator */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-[140px] sm:max-w-[200px] py-1">
                {filteredItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setAlbumPageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all shrink-0 ${
                      albumPageIndex === idx
                        ? 'w-5 bg-maroon'
                        : 'bg-turmeric/50 hover:bg-turmeric'
                    }`}
                    title={`Go to photo ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                disabled={albumPageIndex >= filteredItems.length - 1}
                onClick={() => setAlbumPageIndex((prev) => Math.min(filteredItems.length - 1, prev + 1))}
                className="min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl bg-white border border-turmeric/60 text-maroon font-cinzel text-xs font-bold tracking-wider flex items-center gap-1.5 transition-all shadow-xs disabled:opacity-40 cursor-pointer"
              >
                <span className="hidden xs:inline">Next</span>
                <span className="xs:hidden">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Privacy & Admin Notice Badge (Requirement 8) */}
        <div className="mt-12 p-4 rounded-2xl bg-white/70 border border-turmeric/50 max-w-xl mx-auto text-center shadow-xs flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-poppins text-gray-600">
          <ShieldCheck className="w-4 h-4 text-leafGreen shrink-0" />
          <span>
            Private Family Archive • Public Read-Only • Authorized family photo management via{' '}
            <a href="#/admin/rsvps" className="text-maroon font-bold underline hover:text-templeRed">
              Host Admin Portal
            </a>
          </span>
        </div>
      </div>

      {/* Full-Screen Image Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={filteredItems}
        currentIndex={lightboxIndex}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
        isTelugu={isTelugu}
      />
    </section>
  );
}
