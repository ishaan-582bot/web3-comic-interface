import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Twitter, Send, TrendingUp, Globe, Heart } from 'lucide-react';
import { ComicPanel, Particles } from '../components/ComicEffects';
import { useWalletData } from '../hooks/useWalletData';
import { cn, formatNumber } from '../lib/utils';

const STATS = [
  { label: 'Community Members', value: 12500, suffix: '+', icon: Users, color: 'text-cyber-cyan' },
  { label: 'Discord Members', value: 8200, suffix: '', icon: MessageCircle, color: 'text-neon-purple' },
  { label: 'Twitter Followers', value: 15600, suffix: '+', icon: Twitter, color: 'text-bitcoin-orange' },
  { label: 'Countries', value: 89, suffix: '', icon: Globe, color: 'text-neon-green' },
];

const MESSAGES = [
  { user: 'CryptoKing', message: 'This project is revolutionary! 🚀', time: '2m ago' },
  { user: 'Web3Wizard', message: 'Just minted my first NFT!', time: '5m ago' },
  { user: 'BlockchainBabe', message: 'The community here is amazing ❤️', time: '12m ago' },
  { user: 'DeFiDegen', message: 'HODLing for the long term', time: '18m ago' },
];

const SOCIAL_LINKS = [
  { name: 'Discord', icon: MessageCircle, url: '#', color: 'bg-neon-purple' },
  { name: 'Twitter', icon: Twitter, url: '#', color: 'bg-bitcoin-orange' },
  { name: 'Telegram', icon: Send, url: '#', color: 'bg-cyber-cyan' },
];

export default function CommunityPage() {
  const { displayName, isConnected } = useWalletData();

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
            Chapter 07
          </span>
          <h1 className="font-comic text-4xl sm:text-5xl lg:text-6xl text-white mb-2">
            Community
          </h1>
          <p className="text-gray-400">Join the Blocksmiths Guild</p>
        </motion.div>

        {/* Welcome Message */}
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <ComicPanel variant="highlight" className="p-4 text-center">
              <p className="text-lg">
                Welcome back, <span className="text-cyber-cyan font-bold">{displayName}</span>! 
                <span className="ml-2">👋</span>
              </p>
            </ComicPanel>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <ComicPanel className="p-5 text-center group hover:border-cyber-cyan/50 transition-colors">
                <stat.icon className={cn("w-8 h-8 mx-auto mb-3 transition-transform group-hover:scale-110", stat.color)} />
                <p className="font-comic text-3xl text-white mb-1">
                  {formatNumber(stat.value)}{stat.suffix}
                </p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </ComicPanel>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Live Chat Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ComicPanel className="p-5 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-comic text-xl text-white flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-neon-purple" />
                  Live Chat
                </h3>
                <span className="flex items-center gap-1 text-xs text-neon-green">
                  <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                  1,234 online
                </span>
              </div>

              <div className="space-y-3">
                {MESSAGES.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-dark-bg rounded-lg"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-cyber-cyan to-neon-purple rounded-full flex items-center justify-center text-xs font-bold">
                      {msg.user[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-cyber-cyan">{msg.user}</span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-0.5">{msg.message}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="w-full mt-4 py-3 bg-neon-purple/20 text-neon-purple rounded-lg hover:bg-neon-purple/30 transition-colors font-medium">
                Join the Conversation
              </button>
            </ComicPanel>
          </motion.div>

          {/* Social Links & Network */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            {/* Social Links */}
            <ComicPanel className="p-5">
              <h3 className="font-comic text-xl text-white mb-4">Connect With Us</h3>
              <div className="grid grid-cols-3 gap-3">
                {SOCIAL_LINKS.map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    className="flex flex-col items-center gap-2 p-4 bg-dark-bg rounded-lg hover:bg-dark-border transition-colors group"
                  >
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110", social.color)}>
                      <social.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm text-gray-400">{social.name}</span>
                  </a>
                ))}
              </div>
            </ComicPanel>

            {/* Network Visualization */}
            <ComicPanel className="p-5 relative overflow-hidden min-h-[200px]">
              <Particles count={15} color="#00FF88" />
              
              <h3 className="font-comic text-xl text-white mb-4 relative z-10">
                Global Network
              </h3>
              
              <div className="relative z-10 flex items-center justify-center h-32">
                <div className="relative">
                  {/* Center node */}
                  <div className="w-12 h-12 bg-cyber-cyan rounded-full flex items-center justify-center relative z-10">
                    <TrendingUp className="w-6 h-6 text-dark-bg" />
                  </div>
                  
                  {/* Orbiting nodes */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-6 h-6 bg-neon-purple rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 10 + i * 2,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 0.5,
                      }}
                      style={{
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                        transformOrigin: `${40 + i * 15}px center`,
                      }}
                    />
                  ))}
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-32 h-32 -m-10 pointer-events-none opacity-30">
                    <circle cx="76" cy="76" r="50" fill="none" stroke="#00F0FF" strokeWidth="1" strokeDasharray="5,5" />
                    <circle cx="76" cy="76" r="70" fill="none" stroke="#B829DD" strokeWidth="1" strokeDasharray="3,3" />
                  </svg>
                </div>
              </div>
            </ComicPanel>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
