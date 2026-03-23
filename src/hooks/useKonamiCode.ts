import { useState, useEffect, useCallback } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

interface UseKonamiCodeReturn {
  activated: boolean;
  reset: () => void;
  progress: number;
}

export function useKonamiCode(): UseKonamiCodeReturn {
  const [sequence, setSequence] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);

  const reset = useCallback(() => {
    setSequence([]);
    setActivated(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs
      if (e.target instanceof HTMLInputElement || 
          e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key;
      
      setSequence(prev => {
        const newSequence = [...prev, key];
        
        // Keep only the last N keys where N is the length of Konami code
        if (newSequence.length > KONAMI_CODE.length) {
          newSequence.shift();
        }
        
        // Check if sequence matches
        if (newSequence.length === KONAMI_CODE.length) {
          const matches = newSequence.every((k, i) => k === KONAMI_CODE[i]);
          if (matches) {
            setActivated(true);
            // Trigger confetti or other effects
            if (navigator.vibrate) {
              navigator.vibrate([100, 50, 100, 50, 200]);
            }
          }
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const progress = Math.min(sequence.length / KONAMI_CODE.length, 1);

  return {
    activated,
    reset,
    progress,
  };
}

export default useKonamiCode;
