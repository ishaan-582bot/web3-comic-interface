import React from 'react';
import { motion } from 'framer-motion';
import { Key, Shield, Users, Globe, Zap, Lock } from 'lucide-react';
import { ComicPanel, Particles, GlitchText } from '../components/ComicEffects';
import { TokenGate } from '../components/TokenGate';
import { cn } from '../lib/utils';

const SOLUTIONS = [
  {
    icon: Key,
    title: 'Self-Custody',
    description: 'Your keys, your coins. True ownership of your digital assets.',
    color: 'text-cyber-cyan',
    bgColor: 'bg-cyber-cyan/10',
  },
  {
    icon: Shield,
    title: 'Trustless',
    description: 'No need to trust intermediaries. Code is law.',
    color: 'text-neon-green',
    bgColor: 'bg-neon-green/10',
  },
  {
    icon: Users,
    title: 'Permissionless',
    description: 'Anyone can participate. No gatekeepers, no barriers.',
    color: 'text-neon-purple',
    bgColor: 'bg-neon-purple/10',
  },
  {
    icon: Globe,
    title: 'Decentralized',
    description: 'No single point of failure. The network lives on.',
    color: 'text-bitcoin-orange',
    bgColor: 'bg-bitcoin-orange/10',
  },
];

const BONUS_CONTENT = {
  title: 'The Secret of Private Keys',
  content: 'A private key is like a master password to your digital vault. It\'s a 256-bit number that gives you complete control over your assets. Lose it, and your funds are gone forever. Protect it, and you are your own bank.',
  tips: [
    'Never share your private key',
    'Use hardware wallets for large amounts',
    'Make multiple secure backups',
    'Consider multi-signature wallets',
  ],
};

export default function SolutionPage() {
  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-1 bg-neon-green/20 text-neon-green rounded-full text-sm font-mono mb-4">
            Chapter 03
          </span>
          <h1 className="font-comic text-4xl sm:text-5xl lg:text-6xl text-white mb-2">
            The Solution
          </h1>
          <p className="text-gray-400">Decentralization changes everything</p>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <ComicPanel variant="highlight" className="p-8 sm:p-12 relative overflow-hidden">
            <Particles count={25} color="#00FF88" />
            
            <div className="relative z-10 text-center">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="inline-block"
              >
                <Key className="w-24 h-24 sm:w-32 sm:h-32 text-neon-green mx-auto mb-6" />
              </motion.div>
              
              <h2 className="font-comic text-3xl sm:text-4xl text-white mb-4">
                <GlitchText text="The Private Key" intensity="medium" />
              </h2>
              
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                A cryptographic key that proves ownership without revealing identity. 
                The foundation of self-sovereign finance.
              </p>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-radial from-neon-green/10 to-transparent pointer-events-none" />
          </ComicPanel>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {SOLUTIONS.map((solution, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <ComicPanel className="h-full p-5 hover:border-cyber-cyan/50 transition-colors group">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                  solution.bgColor
                )}>
                  <solution.icon className={cn("w-6 h-6", solution.color)} />
                </div>
                
                <h3 className="font-bold text-lg text-white mb-2">{solution.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{solution.description}</p>
              </ComicPanel>
            </motion.div>
          ))}
        </div>

        {/* Token-Gated Bonus Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <TokenGate 
            minBalance={1}
            fallback={
              <div className="text-center">
                <Zap className="w-8 h-8 text-neon-purple mx-auto mb-2" />
                <p className="text-sm text-gray-400">
                  Mint a Nakamoto NFT to unlock exclusive content
                </p>
              </div>
            }
          >
            <ComicPanel variant="highlight" className="p-6 border-neon-purple">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-neon-purple/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-neon-purple" />
                </div>
                <div>
                  <h3 className="font-comic text-xl text-neon-purple mb-2">
                    {BONUS_CONTENT.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {BONUS_CONTENT.content}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {BONUS_CONTENT.tips.map((tip, i) => (
                      <div 
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-400"
                      >
                        <span className="w-1.5 h-1.5 bg-neon-purple rounded-full" />
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ComicPanel>
          </TokenGate>
        </motion.div>
      </div>
    </div>
  );
}
