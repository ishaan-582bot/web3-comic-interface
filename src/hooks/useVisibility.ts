import { useState, useEffect, useRef, useCallback } from 'react';

interface UseVisibilityReturn {
  isVisible: boolean;
  wasEverVisible: boolean;
}

/**
 * Hook to track if an element is visible in the viewport
 * Useful for pausing animations when not visible
 */
export function useVisibility<T extends HTMLElement = HTMLDivElement>(): 
  [React.RefObject<T>, UseVisibilityReturn] {
  
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [wasEverVisible, setWasEverVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        if (visible) {
          setWasEverVisible(true);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '50px', // Start loading slightly before visible
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, { isVisible, wasEverVisible }];
}

/**
 * Hook to pause/resume based on document visibility
 * Useful for pausing animations when tab is not active
 */
export function useDocumentVisibility(): boolean {
  const [isVisible, setIsVisible] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
}

/**
 * Hook to run animation only when element is visible
 */
export function useAnimationFrame(
  callback: (deltaTime: number) => void,
  enabled: boolean = true
): void {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const isVisible = useDocumentVisibility();

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    if (enabled && isVisible) {
      requestRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [enabled, isVisible, animate]);
}

export default useVisibility;
