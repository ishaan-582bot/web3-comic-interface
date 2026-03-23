import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Eye, Building2, TrendingDown, Lock } from 'lucide-react';
import { ComicPanel, Scanlines, Typewriter } from '../components/ComicEffects';
import { cn } from '../lib/utils';

const PROBLEMS = [
  {
    icon: Eye,
    title: 'Surveillance',
    description: 'Every transaction tracked, every purchase monitored. Your financial privacy is an illusion.',
    stat: '100%',
    statLabel: 'Transactions Tracked',
    color: 'from-red-500 to-red-700',
  },
  {
    icon: Building2,
    title: 'Centralized Control',
    description: 'Banks decide who can send money, when, and to whom. Your funds are never truly yours.',
    stat: '$0',
    statLabel: 'Real Control',
    color: 'from-orange-500 to-orange-700',
  },
  {
    icon: TrendingDown,
    title: 'Inflation',
    description: 'Money printed endlessly, eroding your savings. The silent thief of wealth.',
    stat: '8%+',
    statLabel: 'Annual Inflation',
    color: 'from-yellow-500 to-yellow-700',
  },
];

export default function ProblemPage() {
  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-mono mb-4">
            Chapter 02
          </span>
          <h1 className="font-comic text-4xl sm:text-5xl lg:text-6xl text-white mb-2">
            The Problem
          </h1>
          <p className="text-gray-400">The broken system we inherited</p>
        </motion.div>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-red-900/50 to-orange-900/50 border-2 border-red-500 rounded-xl p-6">
            <Scanlines />
            <div className="relative z-10 flex items-center gap-4">
              <ShieldAlert className="w-12 h-12 text-red-500 flex-shrink-0" />
              <div>
                <h2 className="font-comic text-2xl text-red-400 mb-1">
                  SYSTEM FAILURE DETECTED
                </h2>
                <p className="text-red-300/80 text-sm">
                  Traditional finance has failed us. It's time for a new paradigm.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {PROBLEMS.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              <ComicPanel className="h-full p-6 relative overflow-hidden group">
                {/* Background gradient */}
                <div className={cn(
                  "absolute inset-0 opacity-10 bg-gradient-to-br transition-opacity group-hover:opacity-20",
                  problem.color
                )} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br",
                    problem.color
                  )}>
                    <problem.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Stat */}
                  <div className="mb-4">
                    <span className="font-comic text-4xl text-white">{problem.stat}</span>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{problem.statLabel}</p>
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-xl text-white mb-2">{problem.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{problem.description}</p>
                </div>
              </ComicPanel>
            </motion.div>
          ))}
        </div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <ComicPanel variant="dark" className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Lock className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-comic text-2xl text-white mb-4">
                  The Story of Control
                </h3>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    <Typewriter 
                      text="In the year 20XX, the giants owned everything. Banks controlled the flow of money, governments printed it at will, and corporations tracked every transaction."
                      speed={30}
                      startDelay={300}
                    />
                  </p>
                  <p>
                    Your money in the bank isn't really yours—it's a promise that can be broken. 
                    Accounts frozen without warning. Transfers blocked for arbitrary reasons. 
                    Privacy invaded under the guise of security.
                  </p>
                  <p className="text-cyber-cyan">
                    But what if there was another way? What if you could be your own bank?
                  </p>
                </div>
              </div>
            </div>
          </ComicPanel>
        </motion.div>
      </div>
    </div>
  );
}
