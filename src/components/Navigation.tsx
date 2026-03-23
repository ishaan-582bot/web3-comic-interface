import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { useBook, PAGE_NAMES, TOTAL_PAGES } from '../contexts/BookContext';
import { cn } from '../lib/utils';

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const { 
    currentPage, 
    goNext, 
    goPrev, 
    canGoNext, 
    canGoPrev, 
    isAnimating,
    jumpModalOpen,
    setJumpModalOpen,
    goToPage,
  } = useBook();

  return (
    <>
      {/* Main Navigation Bar */}
      <nav 
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 bg-dark-bg/95 backdrop-blur-md border-t border-dark-border",
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Previous Button */}
            <button
              onClick={goPrev}
              disabled={!canGoPrev}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                canGoPrev 
                  ? "bg-dark-card hover:bg-dark-border text-white" 
                  : "bg-dark-card/50 text-gray-600 cursor-not-allowed"
              )}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Previous</span>
            </button>

            {/* Page Indicator */}
            <button
              onClick={() => setJumpModalOpen(true)}
              className="flex items-center gap-3 px-4 py-2 bg-dark-card rounded-lg hover:bg-dark-border transition-colors group"
            >
              <BookOpen className="w-5 h-5 text-cyber-cyan group-hover:scale-110 transition-transform" />
              <div className="text-center">
                <span className="font-mono text-lg text-white">
                  {String(currentPage + 1).padStart(2, '0')}
                </span>
                <span className="text-gray-500 mx-1">/</span>
                <span className="font-mono text-gray-500">
                  {String(TOTAL_PAGES).padStart(2, '0')}
                </span>
              </div>
              <span className="hidden md:inline text-sm text-gray-400 ml-2">
                {PAGE_NAMES[currentPage]}
              </span>
            </button>

            {/* Next Button */}
            <button
              onClick={goNext}
              disabled={!canGoNext}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                canGoNext 
                  ? "bg-cyber-cyan text-dark-bg hover:scale-105 font-medium" 
                  : "bg-dark-card/50 text-gray-600 cursor-not-allowed"
              )}
              aria-label="Next page"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Page Jump Modal */}
      <AnimatePresence>
        {jumpModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setJumpModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-card border-2 border-cyber-cyan rounded-xl p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="font-comic text-2xl text-white mb-4 text-center">
                Jump to Page
              </h3>
              
              <div className="grid grid-cols-5 gap-2">
                {PAGE_NAMES.map((name, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      goToPage(i);
                      setJumpModalOpen(false);
                    }}
                    disabled={isAnimating}
                    className={cn(
                      "aspect-square rounded-lg font-mono text-sm flex flex-col items-center justify-center transition-all duration-200",
                      i === currentPage
                        ? 'bg-cyber-cyan text-dark-bg font-bold'
                        : 'bg-dark-border text-white hover:bg-cyber-cyan/20 hover:border-cyber-cyan border border-transparent'
                    )}
                    title={name}
                  >
                    <span className="text-lg">{i + 1}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-400">
                {PAGE_NAMES.map((name, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "truncate",
                      i === currentPage && "text-cyber-cyan"
                    )}
                  >
                    {i + 1}. {name}
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => setJumpModalOpen(false)}
                className="mt-4 w-full py-2 text-gray-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner Page Indicators */}
      <div className="fixed top-1/2 left-4 -translate-y-1/2 z-30 hidden lg:block">
        <div className="flex flex-col gap-2">
          {PAGE_NAMES.map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i === currentPage 
                  ? "bg-cyber-cyan w-6" 
                  : i < currentPage 
                    ? "bg-cyber-cyan/50" 
                    : "bg-dark-border hover:bg-dark-border/80"
              )}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Navigation;
