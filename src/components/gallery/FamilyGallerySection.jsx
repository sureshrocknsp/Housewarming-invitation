import React, { useState } from 'react';
import { gruhapravesamConfig } from '../../config/gruhapravesamConfig';
import { galleryCategories, galleryItems } from '../../config/galleryConfig';
import { useLanguage } from '../../context/LanguageContext';
import SectionHeader from '../ui/SectionHeader';
import ImageLightbox from './ImageLightbox';
import {
  Sparkles,
  Users,
  Home,
  Heart,
  Flower2,
  Calendar,
  Eye,
  Camera
} from 'lucide-react';

export default function FamilyGallerySection() {
  const { language } = useLanguage();
  const isTelugu = language === 'TE';

  // Active Category filter
  const [activeCategory, setActiveCategory] = useState('all');

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filter items by category
  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

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
      className="relative py-14 sm:py-24 px-3 sm:px-6 bg-cream bg-muggu-pattern border-t-2 border-turmeric/40 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          badgeIcon={Camera}
          badgeText="FAMILY PHOTO GALLERY & MEMORIES"
          teluguHeading="మా ఇంటి జ్ఞాపకాలు"
          englishSubtitle="OUR HOME, OUR HAPPY MEMORIES"
          description="A curated collection of sacred milestones, family portraits and the beginning of a new journey in our dream home."
        />

        {/* Category Filter Tabs */}
        <div className="card-parchment p-3 sm:p-4 mb-8 sm:mb-12 flex items-center justify-center">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full justify-start sm:justify-center pb-1 sm:pb-0 scrollbar-none">
            {galleryCategories.map((cat) => {
              const count = cat.id === 'all'
                ? galleryItems.length
                : galleryItems.filter((item) => item.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`touch-target px-3.5 sm:px-4 py-2 rounded-full text-xs font-cinzel font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-maroon text-cream shadow-gold-glow scale-105 border border-turmeric'
                      : 'bg-white/80 hover:bg-white text-maroon border border-turmeric/40'
                  }`}
                >
                  <span className={activeCategory === cat.id ? 'text-turmeric' : 'text-turmeric-dark'}>
                    {getCategoryIcon(cat.icon)}
                  </span>
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      activeCategory === cat.id
                        ? 'bg-turmeric text-maroon-dark font-bold'
                        : 'bg-cream text-maroon-light'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid Display (Responsive 1/2/3 columns with 4:3 / 16:9 aspect ratios) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              className="group bg-white/95 border-2 border-turmeric/50 hover:border-turmeric rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-royal transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-soft">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <span className="text-xs font-cinzel font-bold text-turmeric-light uppercase tracking-wider flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    <span>View High-Res</span>
                  </span>
                  <span className="text-[10px] bg-maroon/90 text-cream px-2 py-0.5 rounded-full border border-turmeric/40">
                    Sacred Memory
                  </span>
                </div>
              </div>

              {/* Caption & Metadata */}
              <div className="p-4 sm:p-5 text-left flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-cinzel uppercase font-bold text-turmeric-dark tracking-wider">
                      {item.category.toUpperCase()}
                    </span>
                    {item.date && (
                      <span className="text-[10px] text-gray-500 font-poppins flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-antiqueGold" />
                        <span>{item.date}</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm sm:text-base font-bold font-poppins text-maroon group-hover:text-turmeric-dark transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <div className="text-xs font-telugu text-maroon-light font-medium mt-0.5">
                    {item.teluguTitle}
                  </div>

                  <p className="text-xs font-poppins text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <ImageLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          items={filteredItems}
          currentIndex={lightboxIndex}
          onNavigate={(newIndex) => setLightboxIndex(newIndex)}
          isTelugu={isTelugu}
        />
      </div>
    </section>
  );
}
