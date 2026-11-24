import React, { useState } from 'react';
import { gruhapravesamConfig } from '../config/gruhapravesamConfig';
import { useLanguage } from '../context/LanguageContext';
import SectionHeader from './ui/SectionHeader';
import { Eye, Check, Flower2, Sparkles, X } from 'lucide-react';

export default function TraditionalShowcase() {
  const { decorativeShowcases } = gruhapravesamConfig;
  const { language } = useLanguage();
  const [selectedItem, setSelectedItem] = useState(decorativeShowcases ? decorativeShowcases[0] : null);
  const [modalImage, setModalImage] = useState(null);

  if (!decorativeShowcases || decorativeShowcases.length === 0) return null;

  return (
    <section id="traditions" className="relative py-14 sm:py-20 px-3 sm:px-6 bg-cream-soft border-t border-b border-turmeric/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          badgeIcon={Sparkles}
          badgeText="Ceremonial Aesthetics"
          teluguHeading="సాంప్రదాయ అలంకరణ విశేషాలు"
          englishSubtitle="Sacred Decorative Traditions & Spiritual Significance"
        />

        {/* Interactive Selector Pill Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {decorativeShowcases.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`px-4 py-2.5 rounded-full text-xs font-cinzel font-semibold tracking-wider transition-all duration-300 flex items-center gap-2 ${
                selectedItem.id === item.id
                  ? 'bg-maroon text-cream shadow-gold-glow scale-105 border border-turmeric'
                  : 'bg-white/80 hover:bg-white text-maroon border border-turmeric/40'
              }`}
            >
              <Flower2 className={`w-3.5 h-3.5 ${selectedItem.id === item.id ? 'text-turmeric' : 'text-turmeric-dark'}`} />
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        {/* Featured Showcase Highlight: Photo on Left, Significance on Right */}
        <div className="bg-white/95 border-2 border-turmeric/70 rounded-3xl p-6 sm:p-10 shadow-royal mb-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Realistic Image Container */}
            <div className="lg:col-span-6 relative">
              <div
                className="relative rounded-2xl overflow-hidden border-2 border-turmeric shadow-md group cursor-pointer"
                onClick={() => setModalImage(selectedItem.image)}
                title="Click to view full image"
              >
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-72 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/80 via-transparent to-transparent flex items-end justify-between p-4 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-cinzel font-semibold text-turmeric-light uppercase tracking-wider flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    <span>View High-Res Photo</span>
                  </span>
                  <span className="text-[10px] bg-maroon/90 text-cream px-2.5 py-1 rounded-full border border-turmeric/40">
                    Photorealistic Asset
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Cultural Significance Description */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-turmeric/20 text-maroon text-[11px] font-cinzel font-bold tracking-widest uppercase mb-3 w-fit">
                <span>{selectedItem.significance}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-poppins text-maroon mb-1">
                {selectedItem.title}
              </h3>
              <div className="text-lg font-telugu text-turmeric-dark font-semibold mb-4">
                {selectedItem.teluguTitle}
              </div>

              <p className="text-sm sm:text-base font-poppins text-maroon-dark/90 leading-relaxed mb-6">
                {selectedItem.description}
              </p>

              {/* Cultural Highlights Bullet Points */}
              <div className="space-y-2 border-t border-turmeric/30 pt-4 text-xs font-poppins text-maroon-dark">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-leafGreen/20 text-leafGreen-dark flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Traditional South Indian Vaastu & Vedic Sanctification Element</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-leafGreen/20 text-leafGreen-dark flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Invokes positivity, divine blessings, and welcoming hospitality</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Item Miniature Photorealistic Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {decorativeShowcases.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`rounded-2xl overflow-hidden border transition-all cursor-pointer group ${
                selectedItem.id === item.id
                  ? 'border-turmeric shadow-gold-glow scale-105'
                  : 'border-turmeric/40 hover:border-turmeric/80 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="h-28 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-2.5 bg-white text-center">
                <div className="text-[11px] font-bold font-poppins text-maroon truncate">
                  {item.title}
                </div>
                <div className="text-[10px] font-telugu text-turmeric-dark truncate">
                  {item.teluguTitle}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal for Full Image View */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden border-2 border-turmeric shadow-2xl">
            <img src={modalImage} alt="Enlarged Ceremony Element" className="w-full h-full object-contain" />
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-4 right-4 bg-maroon text-cream font-cinzel text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-turmeric"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
