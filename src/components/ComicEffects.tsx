import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, getComicSoundEffect } from '../lib/utils';

interface ComicExplosionProps {
  text?: string;
  color?: 'cyan' | 'orange' | 'purple' | 'green' | 'pink';
  size?: 'sm' | 'md' | 'lg';
  onComplete?: () => void;
  delay?: number;
}

const colorMap = {
  cyan: 'text-cyber-cyan border-cyber-cyan',
  orange: 'text-bitcoin-orange border-bitcoin-orange',
  purple: 'text-neon-purple border-neon-purple',
  green: 'text-neon-green border-neon-green',
  pink: 'text-neon-pink border-neon-pink',
};

const sizeMap = {
  sm: 'text-2xl px-4 py-2',
  md: 'text-4xl px-6 py-3',
  lg: 'text-6xl px-8 py-4',
};

export function ComicExplosion({ 
  text, 
  color = 'cyan', 
  size = 'md',
  onComplete,
  delay = 0,
}: ComicExplosionProps) {
  const [visible, setVisible] = useState(false);
  const displayText = text || getComicSoundEffect();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [visible, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ 
            scale: [0, 1.2, 1],
            rotate: [-180, 10, 0],
            opacity: 1,
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
          className={cn(
            "absolute z-50 font-comic border-4 rounded-xl bg-dark-bg",
            colorMap[color],
            sizeMap[size]
          )}
          style={{
            textShadow: `4px 4px 0 currentColor`,
            WebkitTextStroke: '2px black',
          }}
        >
          {displayText}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Glitch text effect
interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function GlitchText({ text, className, intensity = 'medium' }: GlitchTextProps) {
  const intensityMap = {
    low: { offset: 1, opacity: 0.3 },
    medium: { offset: 2, opacity: 0.5 },
    high: { offset: 4, opacity: 0.7 },
  };

  const { offset, opacity } = intensityMap[intensity];

  return (
    <div className={cn("relative inline-block", className)}>
      {/* Main text */}
      <span className="relative z-10">{text}</span>
      
      {/* Red channel */}
      <span 
        className="absolute top-0 left-0 text-red-500 animate-pulse"
        style={{ 
          transform: `translateX(-${offset}px)`,
          opacity,
          clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
        }}
      >
        {text}
      </span>
      
      {/* Cyan channel */}
      <span 
        className="absolute top-0 left-0 text-cyan-500 animate-pulse"
        style={{ 
          transform: `translateX(${offset}px)`,
          opacity,
          animationDelay: '0.1s',
          clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
        }}
      >
        {text}
      </span>
    </div>
  );
}

// Typewriter effect
interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  startDelay?: number;
}

export function Typewriter({ 
  text, 
  speed = 50, 
  className,
  onComplete,
  startDelay = 0,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    if (displayText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [displayText, text, speed, started, onComplete]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-0.5 h-5 bg-cyber-cyan ml-1 align-middle"
      />
    </span>
  );
}

// Floating particles effect
interface ParticlesProps {
  count?: number;
  color?: string;
  className?: string;
}

export function Particles({ count = 20, color = '#00F0FF', className }: ParticlesProps) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: color,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Scanlines overlay
export function Scanlines({ className }: { className?: string }) {
  return (
    <div 
      className={cn(
        "absolute inset-0 pointer-events-none opacity-20",
        className
      )}
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.3) 2px,
          rgba(0, 0, 0, 0.3) 4px
        )`,
      }}
    />
  );
}

// Speed lines effect
interface SpeedLinesProps {
  direction?: 'left' | 'right';
  className?: string;
}

export function SpeedLines({ direction = 'right', className }: SpeedLinesProps) {
  return (
    <div 
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden",
        className
      )}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent"
          style={{
            top: `${(i + 1) * 10}%`,
            left: direction === 'right' ? '-100%' : 'auto',
            right: direction === 'left' ? '-100%' : 'auto',
            width: '200%',
          }}
          animate={{
            x: direction === 'right' ? ['0%', '100%'] : ['0%', '-100%'],
          }}
          transition={{
            duration: 1 + i * 0.1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

// Comic panel border
interface ComicPanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'highlight' | 'dark';
  interactive?: boolean;
  onClick?: () => void;
}

export function ComicPanel({ 
  children, 
  className, 
  variant = 'default',
  interactive = false,
  onClick,
}: ComicPanelProps) {
  const variantClasses = {
    default: 'bg-dark-card border-black',
    highlight: 'bg-gradient-to-br from-dark-card to-dark-border border-cyber-cyan',
    dark: 'bg-black/50 border-dark-border',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative border-4 rounded-lg overflow-hidden",
        "shadow-[4px_4px_0_0_rgba(0,0,0,1)]",
        variantClasses[variant],
        interactive && "cursor-pointer hover:shadow-[6px_6px_0_0_rgba(0,240,255,0.5)] transition-shadow",
        className
      )}
    >
      {/* Inner highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {children}
    </div>
  );
}

export default ComicExplosion;
