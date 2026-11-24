import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Disc3 } from 'lucide-react';
import { carnaticAudio } from '../../utils/audioEngine';
import { gruhapravesamConfig } from '../../config/gruhapravesamConfig';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [showControls, setShowControls] = useState(false);
  const [usingSynthesizer, setUsingSynthesizer] = useState(true);
  const audioRef = useRef(null);

  // Sync volume
  useEffect(() => {
    carnaticAudio.setVolume(volume);
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      carnaticAudio.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current && audioRef.current.src) {
        audioRef.current.play()
          .then(() => {
            setUsingSynthesizer(false);
            setIsPlaying(true);
          })
          .catch(() => {
            carnaticAudio.play();
            setUsingSynthesizer(true);
            setIsPlaying(true);
          });
      } else {
        carnaticAudio.play();
        setUsingSynthesizer(true);
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-4 z-50 flex items-center gap-2">
      <audio
        ref={audioRef}
        src={gruhapravesamConfig.music?.audioSrc || ""}
        loop
        preload="none"
        onError={() => setUsingSynthesizer(true)}
      />

      {/* Extended Controls Popover */}
      {showControls && (
        <div className="bg-cream-light/95 border border-turmeric/80 shadow-2xl rounded-2xl p-4 flex flex-col gap-2 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 text-maroon-dark w-64 border-gold-metallic">
          <div className="flex items-center justify-between border-b border-turmeric/30 pb-2">
            <div className="flex items-center gap-1.5">
              <Disc3 className={`w-4 h-4 text-turmeric-dark ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
              <span className="text-xs font-semibold uppercase tracking-wider text-maroon font-cinzel">
                Auspicious Music
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-turmeric/20 text-maroon font-medium">
              {usingSynthesizer ? "Carnatic Nadaswaram" : "Mangala Vadyam"}
            </span>
          </div>

          <p className="text-[11px] text-maroon-light leading-snug">
            {gruhapravesamConfig.music?.title || "Traditional Nadaswaram & Tanpura"}
          </p>

          <div className="flex items-center gap-2 pt-1">
            <VolumeX className="w-3.5 h-3.5 text-maroon-light" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-turmeric/30 rounded-lg appearance-none cursor-pointer accent-turmeric-dark"
              aria-label="Volume slider"
            />
            <Volume2 className="w-3.5 h-3.5 text-maroon" />
          </div>
        </div>
      )}

      {/* Main Floating Floating Audio Button */}
      <button
        onClick={togglePlay}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowControls(!showControls);
        }}
        className={`touch-target w-12 h-12 rounded-full shadow-royal border-2 border-turmeric flex items-center justify-center transition-all duration-300 cursor-pointer ${
          isPlaying
            ? 'bg-maroon text-turmeric shadow-gold-glow scale-105'
            : 'bg-cream-light text-maroon hover:bg-cream'
        }`}
        title={isPlaying ? "Mute Auspicious Music" : "Play Traditional Carnatic Music"}
        aria-label="Audio player toggle"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 animate-pulse text-turmeric" />
        ) : (
          <VolumeX className="w-5 h-5 text-maroon" />
        )}
      </button>
    </div>
  );
}
