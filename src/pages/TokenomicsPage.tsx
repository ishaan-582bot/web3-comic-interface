import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp, Users, Lock, Flame, Gift } from 'lucide-react';
import { ComicPanel } from '../components/ComicEffects';
import { cn, formatNumber } from '../lib/utils';
import { useNFTContract } from '../hooks/useNFTContract';

const TOKENOMICS_DATA = [
  { label: 'Community', percentage: 40, color: '#00F0FF', icon: Users },
  { label: 'Treasury', percentage: 25, color: '#B829DD', icon: Lock },
  { label: 'Team', percentage: 15, color: '#F7931A', icon: Gift },
  { label: 'Liquidity', percentage: 12, color: '#00FF88', icon: TrendingUp },
  { label: 'Burn', percentage: 8, color: '#FF4444', icon: Flame },
];

const UTILITIES = [
  {
    title: 'Governance',
    description: 'Vote on protocol decisions and shape the future',
    icon: Lock,
  },
  {
    title: 'Staking Rewards',
    description: 'Earn passive income by staking your tokens',
    icon: TrendingUp,
  },
  {
    title: 'Exclusive Access',
    description: 'Unlock premium features and content',
    icon: Gift,
  },
];

export default function TokenomicsPage() {
  const { totalSupply, maxSupply, mintPrice, loading } = useNFTContract();

  // Calculate pie chart segments
  let cumulativePercentage = 0;
  const pieSegments = TOKENOMICS_DATA.map(item => {
    const startAngle = (cumulativePercentage / 100) * 360;
    cumulativePercentage += item.percentage;
    const endAngle = (cumulativePercentage / 100) * 360;
    return { ...item, startAngle, endAngle };
  });

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
            Chapter 04
          </span>
          <h1 className="font-comic text-4xl sm:text-5xl lg:text-6xl text-white mb-2">
            Tokenomics
          </h1>
          <p className="text-gray-400">The economics of the Nakamoto ecosystem</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ComicPanel className="p-6 sm:p-8">
              <h2 className="font-comic text-2xl text-white mb-6 text-center">
                Token Distribution
              </h2>
              
              {/* SVG Pie Chart */}
              <div className="relative w-64 h-64 mx-auto mb-6">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {pieSegments.map((segment, i) => {
                    const startRad = (segment.startAngle * Math.PI) / 180;
                    const endRad = (segment.endAngle * Math.PI) / 180;
                    const x1 = 50 + 40 * Math.cos(startRad);
                    const y1 = 50 + 40 * Math.sin(startRad);
                    const x2 = 50 + 40 * Math.cos(endRad);
                    const y2 = 50 + 40 * Math.sin(endRad);
                    const largeArc = segment.percentage > 50 ? 1 : 0;
                    
                    return (
                      <motion.path
                        key={i}
                        d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                        fill={segment.color}
                        stroke="#0A0A0F"
                        strokeWidth="2"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      />
                    );
                  })}
                  
                  {/* Center circle */}
                  <circle cx="50" cy="50" r="20" fill="#1A1A2E" />
                  <text x="50" y="48" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
                    $NAKA
                  </text>
                  <text x="50" y="58" textAnchor="middle" fill="#00F0FF" fontSize="6">
                    100M
                  </text>
                </svg>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-3">
                {TOKENOMICS_DATA.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-300">{item.label}</span>
                    <span className="text-sm text-white font-bold ml-auto">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </ComicPanel>
          </motion.div>

          {/* Right: Stats & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Live Stats */}
            <ComicPanel variant="highlight" className="p-6">
              <h3 className="font-comic text-xl text-white mb-4">Live Statistics</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-dark-bg rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Total Supply</p>
                  <p className="font-mono text-2xl text-cyber-cyan">
                    {loading ? '...' : formatNumber(maxSupply)}
                  </p>
                </div>
                
                <div className="p-4 bg-dark-bg rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Minted</p>
                  <p className="font-mono text-2xl text-neon-green">
                    {loading ? '...' : formatNumber(totalSupply)}
                  </p>
                </div>
                
                <div className="p-4 bg-dark-bg rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Mint Price</p>
                  <p className="font-mono text-2xl text-bitcoin-orange">
                    {loading ? '...' : '0.01 ETH'}
                  </p>
                </div>
                
                <div className="p-4 bg-dark-bg rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Remaining</p>
                  <p className="font-mono text-2xl text-neon-purple">
                    {loading ? '...' : formatNumber(maxSupply - totalSupply)}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Mint Progress</span>
                  <span>{loading ? '0' : ((Number(totalSupply) / Number(maxSupply)) * 100).toFixed(1)}%</span>
                </div>
                <div className="h-3 bg-dark-bg rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyber-cyan to-neon-purple"
                    initial={{ width: 0 }}
                    animate={{ width: loading ? '0%' : `${(Number(totalSupply) / Number(maxSupply)) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </ComicPanel>

            {/* Utilities */}
            <div className="space-y-3">
              <h3 className="font-comic text-xl text-white">Token Utilities</h3>
              {UTILITIES.map((utility, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <ComicPanel className="p-4 flex items-start gap-4">
                    <div className="w-10 h-10 bg-cyber-cyan/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <utility.icon className="w-5 h-5 text-cyber-cyan" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{utility.title}</h4>
                      <p className="text-sm text-gray-400">{utility.description}</p>
                    </div>
                  </ComicPanel>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
