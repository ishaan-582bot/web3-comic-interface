import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, CheckCircle2, Circle, Clock, Star, Target } from 'lucide-react';
import { ComicPanel } from '../components/ComicEffects';
import { cn } from '../lib/utils';

const ROADMAP_PHASES = [
  {
    phase: 1,
    title: 'Genesis',
    status: 'completed',
    date: 'Q1 2024',
    description: 'The beginning of our journey',
    milestones: [
      'Smart contract development',
      'Website launch',
      'Community building',
      'Initial NFT collection',
    ],
    icon: Rocket,
  },
  {
    phase: 2,
    title: 'Expansion',
    status: 'in-progress',
    date: 'Q2 2024',
    description: 'Growing the ecosystem',
    milestones: [
      'DAO governance launch',
      'Staking mechanism',
      'Partnership announcements',
      'Marketing campaign',
    ],
    icon: Target,
  },
  {
    phase: 3,
    title: 'Evolution',
    status: 'upcoming',
    date: 'Q3 2024',
    description: 'New features and utilities',
    milestones: [
      'Mobile app release',
      'Cross-chain integration',
      'Advanced governance',
      'Community grants',
    ],
    icon: Star,
  },
  {
    phase: 4,
    title: 'Ascension',
    status: 'upcoming',
    date: 'Q4 2024',
    description: 'Reaching new heights',
    milestones: [
      'Major exchange listings',
      'Global expansion',
      'Enterprise partnerships',
      'Metaverse integration',
    ],
    icon: Rocket,
  },
];

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="w-6 h-6 text-neon-green" />;
    case 'in-progress':
      return <Clock className="w-6 h-6 text-bitcoin-orange animate-pulse" />;
    default:
      return <Circle className="w-6 h-6 text-gray-500" />;
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    completed: 'bg-neon-green/20 text-neon-green',
    'in-progress': 'bg-bitcoin-orange/20 text-bitcoin-orange',
    upcoming: 'bg-gray-500/20 text-gray-400',
  };

  const labels = {
    completed: 'Completed',
    'in-progress': 'In Progress',
    upcoming: 'Upcoming',
  };

  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-xs font-medium",
      styles[status as keyof typeof styles]
    )}>
      {labels[status as keyof typeof labels]}
    </span>
  );
};

export default function RoadmapPage() {
  const completedCount = ROADMAP_PHASES.filter(p => p.status === 'completed').length;
  const progress = (completedCount / ROADMAP_PHASES.length) * 100;

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-sm font-mono mb-4">
            Chapter 05
          </span>
          <h1 className="font-comic text-4xl sm:text-5xl lg:text-6xl text-white mb-2">
            Roadmap
          </h1>
          <p className="text-gray-400">Our journey to decentralization</p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <ComicPanel className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">Overall Progress</span>
              <span className="font-mono text-cyber-cyan">{Math.round(progress)}%</span>
            </div>
            <div className="h-4 bg-dark-bg rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-green via-bitcoin-orange to-neon-purple"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Genesis</span>
              <span>Ascension</span>
            </div>
          </ComicPanel>
        </motion.div>

        {/* Roadmap Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-green via-bitcoin-orange to-gray-500" />

          {/* Phases */}
          <div className="space-y-6">
            {ROADMAP_PHASES.map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <div className={cn(
                  "absolute left-0 w-12 h-12 rounded-full border-4 border-dark-bg flex items-center justify-center z-10",
                  phase.status === 'completed' ? 'bg-neon-green' :
                  phase.status === 'in-progress' ? 'bg-bitcoin-orange' : 'bg-gray-700'
                )}>
                  <phase.icon className={cn(
                    "w-5 h-5",
                    phase.status === 'upcoming' ? 'text-gray-400' : 'text-dark-bg'
                  )} />
                </div>

                {/* Content */}
                <ComicPanel 
                  className={cn(
                    "p-5",
                    phase.status === 'in-progress' && "border-bitcoin-orange"
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-comic text-xl text-white">
                          Phase {phase.phase}: {phase.title}
                        </h3>
                        <StatusBadge status={phase.status} />
                      </div>
                      <p className="text-sm text-gray-400">{phase.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-dark-bg rounded-lg text-sm font-mono text-cyber-cyan">
                      {phase.date}
                    </span>
                  </div>

                  {/* Milestones */}
                  <div className="grid sm:grid-cols-2 gap-2">
                    {phase.milestones.map((milestone, j) => (
                      <div 
                        key={j}
                        className="flex items-center gap-2 text-sm"
                      >
                        <StatusIcon status={phase.status === 'completed' ? 'completed' : 'upcoming'} />
                        <span className={cn(
                          "text-gray-300",
                          phase.status === 'upcoming' && "text-gray-500"
                        )}>
                          {milestone}
                        </span>
                      </div>
                    ))}
                  </div>
                </ComicPanel>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
