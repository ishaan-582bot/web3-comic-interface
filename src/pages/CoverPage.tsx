import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, ChevronRight } from 'lucide-react';
import { useBook } from '../contexts/BookContext';
import { useSound } from '../contexts/SoundContext';
import { Particles, GlitchText } from '../components/ComicEffects';
import { cn } from '../lib/utils';

// ASCII art pattern for background
const ASCII_PATTERN = `
01001000 01100101 01101100 01101100 01101111
01010111 01101111 01110010 01101100 01100100
01000010 01101100 01101111 01100011 01101011
01000011 01101000 01100001 01101001 01101110
`;

export default function CoverPage() {
  const { goNext } = useBook();
  const { playClick } = useSound();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-full flex flex-col items-center justify-center relative overflow-hidden p-4">
      {/* Background ASCII Pattern */}
      <div className="absolute inset-0 opacity-5 overflow-hidden pointer-events-none">
        <pre className="font-mono text-xs text-cyber-cyan whitespace-pre leading-tight">
          {ASCII_PATTERN.repeat(50)}
        </pre>
      </div>

      {/* Floating Particles */}
      <Particles count={30} color="#00F0FF" />
      <Particles count={20} color="#F7931A" />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-dark-card border border-cyber-cyan/30 rounded-full mb-8"
        >
          <Sparkles className="w-4 h-4 text-bitcoin-orange" />
          <span className="text-sm text-cyber-cyan font-mono">
            Interactive Web3 Experience
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="mb-6"
        >
          <h1 className="font-comic text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-none tracking-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-bitcoin-orange via-neon-purple to-cyber-cyan">
              NAKAMOTO
            </span>
            <span className="block text-cyber-cyan">
              CHRONICLES
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl sm:text-2xl text-gray-400 mb-4 font-light"
        >
          Every block tells a story.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-lg text-gray-500 mb-12"
        >
          Every holder writes history.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <button
            onClick={() => {
              playClick();
              goNext();
            }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyber-cyan to-neon-purple text-dark-bg font-bold text-xl rounded-xl border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-[12px_12px_0_0_rgba(0,240,255,0.5)] hover:-translate-y-1 transition-all duration-300"
          >
            <BookOpen className="w-6 h-6" />
            <span>OPEN THE BOOK</span>
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyber-cyan to-neon-purple opacity-0 group-hover:opacity-50 blur-xl transition-opacity" />
          </button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-16 flex flex-wrap justify-center gap-4 sm:gap-8"
        >
          {[
            { icon: '📖', label: '10 Chapters' },
            { icon: '⛓️', label: 'Web3 Ready' },
            { icon: '🎨', label: 'Interactive' },
            { icon: '🔊', label: 'Sound FX' },
          ].map((feature, i) => (
            <div 
              key={i}
              className="flex items-center gap-2 px-4 py-2 bg-dark-card/50 rounded-lg border border-dark-border"
            >
              <span className="text-xl">{feature.icon}</span>
              <span className="text-sm text-gray-400">{feature.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Keyboard hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-8 text-xs text-gray-600 font-mono"
        >
          Press <kbd className="px-2 py-1 bg-dark-card rounded text-cyber-cyan">→</kbd> or <kbd className="px-2 py-1 bg-dark-card rounded text-cyber-cyan">Space</kbd> to navigate
        </motion.p>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-bitcoin-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
