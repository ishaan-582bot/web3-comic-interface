import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { useSound } from './SoundContext';
import { storage } from '../lib/utils';
import type { PageDirection } from '../types';

interface BookContextType {
  currentPage: number;
  totalPages: number;
  isAnimating: boolean;
  direction: PageDirection;
  goToPage: (page: number) => void;
  goNext: () => void;
  goPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  pageProgress: number;
  visitedPages: Set<number>;
  jumpModalOpen: boolean;
  setJumpModalOpen: (open: boolean) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

const TOTAL_PAGES = 10;
const PAGE_NAMES = [
  'Cover',
  'The Genesis',
  'The Problem',
  'The Solution',
  'Tokenomics',
  'Roadmap',
  'The Team',
  'Community',
  'The Mint',
  'Join Us',
];

export function BookProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState(() => 
    storage.get('book-current-page', 0)
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<PageDirection>(null);
  const [visitedPages, setVisitedPages] = useState<Set<number>>(() => 
    new Set(storage.get('book-visited-pages', [0]))
  );
  const [jumpModalOpen, setJumpModalOpen] = useState(false);
  
  const { playPageFlip } = useSound();
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Calculate progress
  const pageProgress = ((currentPage + 1) / TOTAL_PAGES) * 100;
  const canGoNext = currentPage < TOTAL_PAGES - 1 && !isAnimating;
  const canGoPrev = currentPage > 0 && !isAnimating;

  // Navigate to specific page
  const goToPage = useCallback((page: number) => {
    if (isAnimating || page === currentPage) return;
    if (page < 0 || page >= TOTAL_PAGES) return;

    const newDirection = page > currentPage ? 'next' : 'prev';
    
    setDirection(newDirection);
    setIsAnimating(true);
    playPageFlip();

    // Clear any existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    // Perform page change after animation starts
    animationTimeoutRef.current = setTimeout(() => {
      setCurrentPage(page);
      setVisitedPages(prev => {
        const newSet = new Set(prev);
        newSet.add(page);
        // Persist to storage
        storage.set('book-visited-pages', Array.from(newSet));
        storage.set('book-current-page', page);
        return newSet;
      });
      
      // Reset animation state
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
        setDirection(null);
      }, 600);
    }, 50);
  }, [currentPage, isAnimating, playPageFlip]);

  // Go to next page
  const goNext = useCallback(() => {
    if (canGoNext) {
      goToPage(currentPage + 1);
    }
  }, [canGoNext, currentPage, goToPage]);

  // Go to previous page
  const goPrev = useCallback(() => {
    if (canGoPrev) {
      goToPage(currentPage - 1);
    }
  }, [canGoPrev, currentPage, goToPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          goNext();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          goPrev();
          break;
        case 'Home':
          e.preventDefault();
          goToPage(0);
          break;
        case 'End':
          e.preventDefault();
          goToPage(TOTAL_PAGES - 1);
          break;
        case 'j':
        case 'J':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setJumpModalOpen(true);
          }
          break;
        case 'Escape':
          setJumpModalOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, goToPage]);

  // Touch swipe detection
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    const minSwipeDistance = 50;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      // Only handle horizontal swipes
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          goPrev();
        } else {
          goNext();
        }
        
        // Haptic feedback on mobile
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goNext, goPrev]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const value: BookContextType = {
    currentPage,
    totalPages: TOTAL_PAGES,
    isAnimating,
    direction,
    goToPage,
    goNext,
    goPrev,
    canGoNext,
    canGoPrev,
    pageProgress,
    visitedPages,
    jumpModalOpen,
    setJumpModalOpen,
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
}

export function useBook() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBook must be used within a BookProvider');
  }
  return context;
}

// Export page names for use in components
export { PAGE_NAMES, TOTAL_PAGES };
