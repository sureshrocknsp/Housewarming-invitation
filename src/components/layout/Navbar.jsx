import React, { useState, useEffect } from 'react';
import { gruhapravesamConfig } from '../../config/gruhapravesamConfig';
import { useLanguage } from '../../context/LanguageContext';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenPlaque }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Cleaned navigation items pointing only to active sections
  const navLinks = [
    { href: '#', label: 'Home', telugu: 'ప్రవేశం' },
    { href: '#invitation-card', label: 'Invitation', telugu: 'ఆహ్వానం' },
    { href: '#family', label: 'Family', telugu: 'కుటుంబం' },
    { href: '#muhurtham', label: 'Event', telugu: 'ముహూర్తం' },
    { href: '#gallery', label: 'Gallery', telugu: 'జ్ఞాపకాలు' },
    { href: '#blessings', label: 'Blessings', telugu: 'శుభాకాంక్షలు' },
    { href: '#venue', label: 'Venue', telugu: 'వేదిక' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-maroon-deep/95 backdrop-blur-md shadow-royal border-b border-turmeric/50 py-2.5'
          : 'bg-gradient-to-b from-maroon-deep/90 via-maroon-deep/60 to-transparent py-3 sm:py-3.5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-2 group shrink-0">
          <span className="text-xl sm:text-2xl filter drop-shadow-[0_0_8px_rgba(245,176,20,0.8)]">🪔</span>
          <div className="flex flex-col text-left">
            <span className="font-telugu font-bold text-sm sm:text-base text-cream leading-none group-hover:text-turmeric-light transition-colors">
              గృహప్రవేశం
            </span>
            <span className="font-cinzel text-[9px] sm:text-[10px] text-turmeric uppercase tracking-widest font-semibold mt-0.5">
              {gruhapravesamConfig.home?.name || 'శ్రీనివాస నిలయం'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="px-3 py-1.5 rounded-full text-xs font-cinzel font-semibold tracking-wider text-cream/90 hover:text-turmeric-light hover:bg-white/10 active:scale-95 transition-all whitespace-nowrap"
            >
              <span>{link.label}</span>
              <span className="text-[10px] opacity-75 font-telugu ml-1">({link.telugu})</span>
            </a>
          ))}
        </nav>

        {/* Right Action Controls: Language Toggle & Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Language Switcher Pill */}
          <div className="flex items-center bg-black/45 border border-turmeric/60 rounded-full p-0.5 backdrop-blur-sm text-[11px] font-medium font-poppins text-cream shadow-xs">
            <button
              onClick={() => setLanguage('ALL')}
              className={`px-2.5 py-1 rounded-full transition-all touch-target min-h-[32px] cursor-pointer ${
                language === 'ALL'
                  ? 'bg-turmeric text-maroon-deep font-bold shadow-xs'
                  : 'hover:text-turmeric-light'
              }`}
              title="Bilingual: Telugu & English"
            >
              Both
            </button>
            <button
              onClick={() => setLanguage('TE')}
              className={`px-2.5 py-1 rounded-full font-telugu transition-all touch-target min-h-[32px] cursor-pointer ${
                language === 'TE'
                  ? 'bg-turmeric text-maroon-deep font-bold shadow-xs'
                  : 'hover:text-turmeric-light'
              }`}
              title="తెలుగు మాత్రమే (Telugu Only)"
            >
              తెలుగు
            </button>
            <button
              onClick={() => setLanguage('EN')}
              className={`px-2.5 py-1 rounded-full font-cinzel transition-all touch-target min-h-[32px] cursor-pointer ${
                language === 'EN'
                  ? 'bg-turmeric text-maroon-deep font-bold shadow-xs'
                  : 'hover:text-turmeric-light'
              }`}
              title="English Only"
            >
              Eng
            </button>
          </div>

          {/* Mobile Hamburger Toggle (Min 44x44px touch target) */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="touch-target p-2 rounded-xl text-cream hover:text-turmeric hover:bg-white/10 active:bg-white/20 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-[56px] z-40 bg-black/60 backdrop-blur-xs lg:hidden animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="lg:hidden relative z-50 bg-maroon-deep/98 border-b-2 border-turmeric/70 shadow-2xl px-4 py-5 space-y-1 animate-in slide-in-from-top max-h-[calc(100vh-60px)] overflow-y-auto pb-safe">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-cinzel font-semibold text-cream hover:bg-turmeric/20 active:bg-turmeric/30 transition-all min-h-[48px]"
              >
                <span>{link.label}</span>
                <span className="text-xs font-telugu text-turmeric-light">{link.telugu}</span>
              </a>
            ))}

            {/* Language Switcher inside Mobile Menu for one-hand access */}
            <div className="pt-3 pb-1 border-t border-turmeric/25 flex items-center justify-between px-2">
              <span className="text-xs font-cinzel text-turmeric uppercase font-bold">Language / భాష:</span>
              <div className="flex items-center bg-black/40 border border-turmeric/50 rounded-full p-0.5 text-xs text-cream font-medium">
                <button
                  onClick={() => { setLanguage('ALL'); setMobileMenuOpen(false); }}
                  className={`px-3 py-1.5 rounded-full min-h-[36px] ${language === 'ALL' ? 'bg-turmeric text-maroon font-bold' : ''}`}
                >
                  Both
                </button>
                <button
                  onClick={() => { setLanguage('TE'); setMobileMenuOpen(false); }}
                  className={`px-3 py-1.5 rounded-full font-telugu min-h-[36px] ${language === 'TE' ? 'bg-turmeric text-maroon font-bold' : ''}`}
                >
                  తెలుగు
                </button>
                <button
                  onClick={() => { setLanguage('EN'); setMobileMenuOpen(false); }}
                  className={`px-3 py-1.5 rounded-full font-cinzel min-h-[36px] ${language === 'EN' ? 'bg-turmeric text-maroon font-bold' : ''}`}
                >
                  Eng
                </button>
              </div>
            </div>

            {onOpenPlaque && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPlaque();
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-xs font-cinzel font-semibold text-turmeric-light hover:bg-turmeric/10 flex items-center justify-between border-t border-turmeric/20 mt-2 min-h-[44px] cursor-pointer"
              >
                <span>View Entrance Plaque (ఆహ్వాన ఫలకం)</span>
                <Sparkles className="w-4 h-4 text-turmeric" />
              </button>
            )}
          </div>
        </>
      )}
    </header>
  );
}
