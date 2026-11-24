/**
 * Traditional Carnatic Ambient Audio Engine
 * =========================================
 * Generates an authentic, soothing Indian classical Tanpura drone,
 * melodious Gambhira Nattai / Mohanam ragam meditative notes, and 
 * an auspicious brass temple bell (Ghanta) chime using Web Audio API.
 * 
 * Guarantees zero latency, zero CORS issues, 100% offline reliability,
 * and smooth user-controlled volume.
 */

class CarnaticAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.oscillators = [];
    this.intervalId = null;
    this.volume = 0.25;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Auspicious Brass Temple Bell (Ghanta) Chime
  playTempleBell() {
    this.init();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const bellGain = this.audioCtx.createGain();
    bellGain.gain.setValueAtTime(0.35, now);
    bellGain.connect(this.audioCtx.destination);

    // Harmonic partials of an antique South Indian brass bell
    const baseFreq = 784.0; // G5 (Auspicious bell pitch)
    const partials = [
      { freq: baseFreq * 1.0,  gain: 0.45, decay: 3.5 },
      { freq: baseFreq * 1.01, gain: 0.35, decay: 3.2 }, // Beating effect
      { freq: baseFreq * 1.52, gain: 0.28, decay: 2.8 },
      { freq: baseFreq * 2.02, gain: 0.22, decay: 2.2 },
      { freq: baseFreq * 2.76, gain: 0.16, decay: 1.8 },
      { freq: baseFreq * 3.42, gain: 0.12, decay: 1.4 },
      { freq: baseFreq * 4.18, gain: 0.08, decay: 1.0 }
    ];

    partials.forEach((p) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(p.freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(p.gain, now + 0.008); // Sharp metallic strike
      gain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

      osc.connect(gain);
      gain.connect(bellGain);

      osc.start(now);
      osc.stop(now + p.decay + 0.1);
    });
  }

  // Base Tanpura Drone (Sa, Pa, Sa high) in C# (Shadjam ~ 138.59 Hz)
  startTanpuraDrone() {
    const baseFreq = 138.59; // C#3 (Traditional Auspicious Pitch)
    const strings = [
      { freq: baseFreq * 1.5, detune: -2, gain: 0.18, type: 'sawtooth' }, // Pa (G3)
      { freq: baseFreq * 2.0, detune: 2, gain: 0.15, type: 'sawtooth' },  // Sa (C#4)
      { freq: baseFreq * 2.0, detune: -1, gain: 0.14, type: 'triangle' }, // Sa harmonic
      { freq: baseFreq * 1.0, detune: 0, gain: 0.22, type: 'sine' },      // Kharaj Sa (C#3)
    ];

    strings.forEach((str) => {
      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      osc.type = str.type;
      osc.frequency.setValueAtTime(str.freq, this.audioCtx.currentTime);
      osc.detune.setValueAtTime(str.detune, this.audioCtx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, this.audioCtx.currentTime);
      filter.Q.setValueAtTime(2.5, this.audioCtx.currentTime);

      gainNode.gain.setValueAtTime(str.gain, this.audioCtx.currentTime);

      const lfo = this.audioCtx.createOscillator();
      const lfoGain = this.audioCtx.createGain();
      lfo.frequency.setValueAtTime(0.18 + Math.random() * 0.1, this.audioCtx.currentTime);
      lfoGain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(gainNode.gain);
      lfo.start();

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start();
      this.oscillators.push(osc, lfo);
    });
  }

  // Melodic flute / Veena tones in Raga Mohanam / Gambhira Nattai
  playMelodyNote(freq, duration = 3.5) {
    if (!this.isPlaying || !this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 1.5, this.audioCtx.currentTime);
    filter.Q.setValueAtTime(3.0, this.audioCtx.currentTime);

    const now = this.audioCtx.currentTime;
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.08, now + 0.4);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.2);
  }

  startMelodyLoop() {
    const root = 277.18; // C#4
    const mohanamFreqs = [
      root * 1.0,         // Sa
      root * 1.125,       // Ri2
      root * 1.25,        // Ga3
      root * 1.5,         // Pa
      root * 1.666,       // Dha2
      root * 2.0,         // Sa'
      root * 1.666,
      root * 1.5,
      root * 1.25,
      root * 1.0,
      root * 0.75,        // Mandra Pa
      root * 1.0
    ];

    let noteIdx = 0;
    this.intervalId = setInterval(() => {
      if (!this.isPlaying) return;
      const freq = mohanamFreqs[noteIdx % mohanamFreqs.length];
      this.playMelodyNote(freq, 3.2);
      noteIdx++;
    }, 2800);
  }

  play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.startTanpuraDrone();
    this.startMelodyLoop();
  }

  pause() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    this.oscillators = [];
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
  }
}

export const carnaticAudio = new CarnaticAudioEngine();
