import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useBook } from '../contexts/BookContext';
import type { PageDirection } from '../types';

interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: number;
}

// 3D Page flip animation variants
const pageVariants: Record<NonNullable<PageDirection>, Variants> = {
  next: {
    initial: { 
      rotateY: 90, 
      opacity: 0,
      transformOrigin: 'left center',
    },
    animate: { 
      rotateY: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: { 
      rotateY: -90, 
      opacity: 0,
      transformOrigin: 'right center',
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 1, 1],
      },
    },
  },
  prev: {
    initial: { 
      rotateY: -90, 
      opacity: 0,
      transformOrigin: 'right center',
    },
    animate: { 
      rotateY: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: { 
      rotateY: 90, 
      opacity: 0,
      transformOrigin: 'left center',
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 1, 1],
      },
    },
  },
};

// Fallback slide animation
const slideVariants: Variants = {
  initial: (direction: PageDirection) => ({
    x: direction === 'next' ? '100%' : '-100%',
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: (direction: PageDirection) => ({
    x: direction === 'next' ? '-100%' : '100%',
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 1, 1],
    },
  }),
};

export function PageTransition({ children, pageKey }: PageTransitionProps) {
  const { direction, isAnimating } = useBook();

  // Use slide animation if no direction or for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const use3D = direction && !prefersReducedMotion;

  return (
    <div className="book-perspective relative w-full h-full">
      <AnimatePresence 
        mode="wait" 
        initial={false}
        custom={direction}
      >
        <motion.div
          key={pageKey}
          custom={direction}
          variants={use3D ? pageVariants[direction!] : slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="page-3d w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Page shadow overlay during animation */}
          {isAnimating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-black pointer-events-none z-50"
            />
          )}
          
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Loading transition component
export function PageLoading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center h-full bg-dark-bg"
    >
      <div className="text-center">
        <motion.div 
          className="font-comic text-4xl text-bitcoin-orange mb-4"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
          }}
        >
          Meanwhile...
        </motion.div>
        <div className="flex gap-2 justify-center">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-cyber-cyan rounded-full"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default PageTransition;
