import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Disc3, Sparkles } from 'lucide-react';
import { carnaticAudio } from '../utils/audioEngine';
import { invitationConfig } from '../config/invitationConfig';

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
      // Pause
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      carnaticAudio.pause();
      setIsPlaying(false);
    } else {
      // Play
      let mp3Played = false;
      if (audioRef.current && audioRef.current.src) {
        audioRef.current.play()
          .then(() => {
            mp3Played = true;
            setUsingSynthesizer(false);
            setIsPlaying(true);
          })
          .catch(() => {
            // Graceful fallback to rich Carnatic Web Audio engine
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
      {/* Hidden audio element with fallback support */}
      <audio
        ref={audioRef}
        src={invitationConfig.music?.audioSrc || ""}
        loop
        preload="none"
        onError={() => {
          // If mp3 fails, synthesizer will take over gracefully
          setUsingSynthesizer(true);
        }}
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
              {usingSynthesizer ? "Carnatic Drone" : "Mangala Vadyam"}
            </span>
          </div>

          <p className="text-[11px] text-maroon-light leading-snug">
            {invitationConfig.music?.title || "Traditional Nadaswaram & Tanpura"}
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

      {/* Main Music Toggle Button */}
      <div className="relative group">
        <button
          onClick={togglePlay}
          onContextMenu={(e) => {
            e.preventDefault();
            setShowControls(!showControls);
          }}
          className={`relative flex items-center gap-2.5 px-4 py-3 rounded-full shadow-royal backdrop-blur-md transition-all duration-300 border ${
            isPlaying
              ? 'bg-gradient-to-r from-maroon to-templeRed text-cream border-turmeric shadow-gold-glow scale-105'
              : 'bg-cream/95 text-maroon border-turmeric/70 hover:border-turmeric hover:bg-cream'
          }`}
          title="Click to toggle traditional music. Right-click or hold for volume controls."
          aria-label={isPlaying ? "Mute traditional music" : "Play traditional South Indian music"}
        >
          {isPlaying ? (
            <>
              {/* Animated Sound Equalizer Waves */}
              <div className="flex items-end gap-0.5 h-4 w-4">
                <span className="w-1 bg-turmeric rounded-full animate-bounce" style={{ height: '70%', animationDuration: '0.8s' }}></span>
                <span className="w-1 bg-turmeric-light rounded-full animate-bounce" style={{ height: '100%', animationDuration: '0.6s' }}></span>
                <span className="w-1 bg-turmeric rounded-full animate-bounce" style={{ height: '40%', animationDuration: '0.9s' }}></span>
              </div>
              <span className="text-xs font-semibold tracking-wide font-cinzel">Music Playing</span>
            </>
          ) : (
            <>
              <Music className="w-4 h-4 text-turmeric-dark" />
              <span className="text-xs font-semibold tracking-wide font-cinzel">Play Music</span>
            </>
          )}

          {/* Quick settings pill */}
          <span
            onClick={(e) => {
              e.stopPropagation();
              setShowControls(!showControls);
            }}
            className="text-[10px] pl-1 text-turmeric hover:text-white transition-colors"
            title="Volume Settings"
          >
            ⚙
          </span>
        </button>

        {/* Small tooltip indicator when not playing */}
        {!isPlaying && (
          <div className="absolute -top-9 right-0 bg-maroon-dark text-cream text-[10px] px-2.5 py-1 rounded-md shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center gap-1 border border-turmeric/40">
            <Sparkles className="w-2.5 h-2.5 text-turmeric" />
            <span>Click for auspicious Nadaswaram</span>
          </div>
        )}
      </div>
    </div>
  );
}
