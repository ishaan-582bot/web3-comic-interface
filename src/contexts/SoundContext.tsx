import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { storage } from '../lib/utils';

interface SoundContextType {
  enabled: boolean;
  volume: number;
  toggleSound: () => void;
  setVolume: (volume: number) => void;
  playPageFlip: () => void;
  playSuccess: () => void;
  playClick: () => void;
  playHover: () => void;
  playError: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Sound effect frequencies and durations
const SOUNDS = {
  pageFlip: { freq: 200, duration: 0.15, type: 'sawtooth' as OscillatorType },
  success: { freq: 880, duration: 0.3, type: 'sine' as OscillatorType },
  click: { freq: 600, duration: 0.05, type: 'square' as OscillatorType },
  hover: { freq: 400, duration: 0.03, type: 'sine' as OscillatorType },
  error: { freq: 150, duration: 0.2, type: 'sawtooth' as OscillatorType },
};

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(() => 
    storage.get('sound-enabled', true)
  );
  const [volume, setVolumeState] = useState(() => 
    storage.get('sound-volume', 0.5)
  );
  
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context on first user interaction
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current && typeof window !== 'undefined') {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (err) {
        console.warn('Web Audio API not supported');
      }
    }
    return audioContextRef.current;
  }, []);

  // Play sound using Web Audio API
  const playSound = useCallback((soundName: keyof typeof SOUNDS) => {
    if (!enabled) return;
    
    const ctx = initAudioContext();
    if (!ctx) return;

    // Resume context if suspended (browser policy)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const sound = SOUNDS[soundName];
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = sound.type;
    oscillator.frequency.setValueAtTime(sound.freq, ctx.currentTime);
    
    // Volume envelope
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume * 0.3, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + sound.duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + sound.duration);
  }, [enabled, volume, initAudioContext]);

  // Public sound methods
  const playPageFlip = useCallback(() => playSound('pageFlip'), [playSound]);
  const playSuccess = useCallback(() => playSound('success'), [playSound]);
  const playClick = useCallback(() => playSound('click'), [playSound]);
  const playHover = useCallback(() => playSound('hover'), [playSound]);
  const playError = useCallback(() => playSound('error'), [playSound]);

  // Toggle sound on/off
  const toggleSound = useCallback(() => {
    setEnabled(prev => {
      const newValue = !prev;
      storage.set('sound-enabled', newValue);
      return newValue;
    });
  }, []);

  // Set volume
  const setVolume = useCallback((newVolume: number) => {
    const clamped = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clamped);
    storage.set('sound-volume', clamped);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const value: SoundContextType = {
    enabled,
    volume,
    toggleSound,
    setVolume,
    playPageFlip,
    playSuccess,
    playClick,
    playHover,
    playError,
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}
