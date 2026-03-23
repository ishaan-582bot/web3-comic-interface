import React from 'react';
import { motion } from 'framer-motion';
import { Blocks, Quote, Cpu, Globe } from 'lucide-react';
import { Typewriter, ComicPanel, Particles } from '../components/ComicEffects';
import { cn } from '../lib/utils';

const GENESIS_QUOTE = "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks";

const FEATURES = [
  {
    icon: Blocks,
    title: 'Genesis Block',
    description: 'The first block of the blockchain, mined by Satoshi',
    color: 'text-bitcoin-orange',
  },
  {
    icon: Cpu,
    title: 'Proof of Work',
    description: 'Revolutionary consensus mechanism',
    color: 'text-cyber-cyan',
  },
  {
    icon: Globe,
    title: 'Decentralized',
    description: 'No single point of control',
    color: 'text-neon-purple',
  },
];

export default function GenesisPage() {
  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-1 bg-bitcoin-orange/20 text-bitcoin-orange rounded-full text-sm font-mono mb-4">
            Chapter 01
          </span>
          <h1 className="font-comic text-4xl sm:text-5xl lg:text-6xl text-white mb-2">
            The Genesis
          </h1>
          <p className="text-gray-400">Where it all began</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <ComicPanel className="p-8 min-h-[400px] flex items-center justify-center relative overflow-hidden">
              {/* 3D Block Animation */}
              <div className="relative">
                <motion.div
                  animate={{ 
                    rotateY: [0, 360],
                    rotateX: [0, 10, 0, -10, 0],
                  }}
                  transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="relative w-48 h-48 sm:w-64 sm:h-64"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Block faces */}
                  {[
                    { transform: 'translateZ(60px)', bg: 'from-bitcoin-orange to-orange-600' },
                    { transform: 'translateZ(-60px) rotateY(180deg)', bg: 'from-orange-600 to-bitcoin-orange' },
                    { transform: 'translateX(-60px) rotateY(-90deg)', bg: 'from-orange-500 to-orange-700' },
                    { transform: 'translateX(60px) rotateY(90deg)', bg: 'from-orange-500 to-orange-700' },
                    { transform: 'translateY(-60px) rotateX(90deg)', bg: 'from-yellow-500 to-bitcoin-orange' },
                    { transform: 'translateY(60px) rotateX(-90deg)', bg: 'from-orange-700 to-orange-900' },
                  ].map((face, i) => (
                    <div
                      key={i}
                      className={cn(
                        "absolute inset-0 flex items-center justify-center border-2 border-black rounded-lg bg-gradient-to-br",
                        face.bg
                      )}
                      style={{ transform: face.transform }}
                    >
                      {i === 0 && (
                        <div className="text-center">
                          <Blocks className="w-16 h-16 text-white mx-auto mb-2" />
                          <span className="font-mono text-white text-xs">BLOCK #0</span>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>

                {/* Orbiting particles */}
                <div className="absolute inset-0 -m-8">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-cyber-cyan rounded-full"
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 0.5,
                      }}
                      style={{
                        top: '50%',
                        left: '50%',
                        transformOrigin: `${80 + i * 10}px center`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-radial from-bitcoin-orange/20 to-transparent pointer-events-none" />
            </ComicPanel>

            {/* Hash display */}
            <div className="mt-4 p-4 bg-dark-card rounded-lg border border-dark-border">
              <p className="text-xs text-gray-500 mb-1">Genesis Block Hash:</p>
              <p className="font-mono text-xs text-cyber-cyan break-all">
                000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
              </p>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Quote */}
            <ComicPanel variant="highlight" className="p-6">
              <Quote className="w-8 h-8 text-cyber-cyan mb-4" />
              <p className="text-lg text-white italic leading-relaxed">
                <Typewriter 
                  text={GENESIS_QUOTE}
                  speed={40}
                  startDelay={500}
                />
              </p>
              <p className="mt-4 text-sm text-gray-500">
                — Embedded in the Genesis Block coinbase transaction
              </p>
            </ComicPanel>

            {/* Story text */}
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                On January 3, 2009, a mysterious figure known as Satoshi Nakamoto mined the first block of the Bitcoin blockchain. This wasn't just the birth of a new currency—it was the beginning of a revolution.
              </p>
              <p>
                The Genesis Block contained a hidden message, a timestamp of the financial crisis that inspired this new form of money. It was a statement of intent: a new system, free from the control of banks and governments.
              </p>
            </div>

            {/* Features grid */}
            <div className="grid sm:grid-cols-3 gap-4">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="p-4 bg-dark-card rounded-lg border border-dark-border hover:border-cyber-cyan/50 transition-colors"
                >
                  <feature.icon className={cn("w-8 h-8 mb-3", feature.color)} />
                  <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
