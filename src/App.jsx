import React, { useState, Suspense, lazy } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Navbar from './components/layout/Navbar';
import OpeningExperience from './components/hero/OpeningExperience';
import CountdownTimer from './components/CountdownTimer';
import MainInvitation from './components/invitation/MainInvitation';
import FamilyDetails from './components/family/FamilyDetails';
import TraditionalShowcase from './components/TraditionalShowcase';
import EventSchedule from './components/events/EventSchedule';
import RitualsGuide from './components/events/RitualsGuide';
import VenueLocation from './components/venue/VenueLocation';
import BlessingsSection from './components/blessings/BlessingsSection';
import Footer from './components/layout/Footer';
import FallingPetals from './components/layout/FallingPetals';
import AudioPlayer from './components/layout/AudioPlayer';
import { Sparkles } from 'lucide-react';
import { gruhapravesamConfig } from './config/gruhapravesamConfig';

// Code-split heavy non-critical components to optimize initial page load performance
const FamilyGallerySection = lazy(() => import('./components/gallery/FamilyGallerySection'));

// Reusable elegant loading fallback for lazy sections
function SectionLoadingFallback() {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center text-maroon bg-cream">
      <Sparkles className="w-8 h-8 animate-spin text-turmeric mb-2" />
      <span className="text-xs font-cinzel tracking-widest uppercase text-antiqueGold font-bold">
        Loading Section...
      </span>
    </div>
  );
}

export default function App() {
  // Track if guest has opened the traditional invitation plaque
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);

  const handleOpenInvitation = () => {
    setIsInvitationOpened(true);
  };

  const handleResetToPlaque = () => {
    setIsInvitationOpened(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <div className="min-h-screen bg-cream text-maroon-dark font-poppins selection:bg-turmeric selection:text-maroon relative">
          {/* Accessibility: Skip to Content Link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-maroon focus:text-cream focus:rounded-xl focus:border-2 focus:border-turmeric focus:shadow-2xl focus:font-cinzel focus:text-xs focus:font-bold focus:uppercase"
          >
            Skip to main invitation content (కంటెంట్‌కి వెళ్లండి)
          </a>

          {/* Floating Interactive Elements */}
          <FallingPetals />
          {gruhapravesamConfig.settings?.enableMusic !== false && <AudioPlayer />}
          <Navbar onOpenPlaque={handleResetToPlaque} />

          {/* 1. Immersive Opening Plaque Screen with 3D Teak Doors */}
          {!isInvitationOpened && (
            <OpeningExperience
              isOpen={isInvitationOpened}
              onOpen={handleOpenInvitation}
            />
          )}

          {/* Main Content Flow */}
          <main
            id="main-content"
            className={`transition-opacity duration-700 pt-16 sm:pt-20 ${
              !isInvitationOpened ? 'pointer-events-none filter blur-xs select-none' : 'opacity-100'
            }`}
          >
            {/* Live Countdown Timer */}
            {gruhapravesamConfig.settings?.enableCountdown !== false && (
              <div className="bg-gradient-to-b from-cream-soft via-cream to-cream py-6">
                <CountdownTimer />
              </div>
            )}

            {/* Main Telugu & English Invitation Card with Slokas */}
            <MainInvitation />

            {/* Family Introduction in Traditional Decorative Frame */}
            <FamilyDetails />

            {/* Phase 7: Family Photo Gallery & New Home Memories */}
            {gruhapravesamConfig.settings?.enableGallery !== false && (
              <Suspense fallback={<SectionLoadingFallback />}>
                <FamilyGallerySection />
              </Suspense>
            )}

            {/* Traditional Decorative Showcases */}
            <TraditionalShowcase />

            {/* Auspicious Muhurtham & Ritual Schedule */}
            <EventSchedule />

            {/* Telugu Cultural Rituals (Milk Boiling - Paalu Pongadam) */}
            <RitualsGuide />

            {/* Phase 8: Guest Welcome & Venue Location */}
            <VenueLocation />

            {/* Sacred Guest Blessings from Well-Wishers */}
            <BlessingsSection />
          </main>

          {/* Auspicious Footer */}
          <Footer />
        </div>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
