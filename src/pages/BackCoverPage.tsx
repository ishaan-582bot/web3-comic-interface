import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Heart, Twitter, MessageCircle, Github, ExternalLink, CheckCircle2 } from 'lucide-react';
import { ComicPanel, Particles } from '../components/ComicEffects';
import { useSound } from '../contexts/SoundContext';
import { useWalletData } from '../hooks/useWalletData';
import { cn } from '../lib/utils';

const SOCIAL_LINKS = [
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com', color: 'hover:text-bitcoin-orange' },
  { name: 'Discord', icon: MessageCircle, url: 'https://discord.com', color: 'hover:text-neon-purple' },
  { name: 'GitHub', icon: Github, url: 'https://github.com', color: 'hover:text-white' },
];

export default function BackCoverPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { playClick, playSuccess } = useSound();
  const { displayName, isConnected } = useWalletData();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      playSuccess();
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-1 bg-cyber-cyan/20 text-cyber-cyan rounded-full text-sm font-mono mb-4">
            Final Chapter
          </span>
          <h1 className="font-comic text-4xl sm:text-5xl lg:text-6xl text-white mb-2">
            Join Us
          </h1>
          <p className="text-gray-400">The story continues with you</p>
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <ComicPanel variant="highlight" className="p-8 text-center relative overflow-hidden">
            <Particles count={20} color="#F7931A" />
            
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              🙏
            </motion.div>
            
            <h2 className="font-comic text-3xl text-white mb-4">
              Thank You for Reading!
            </h2>
            
            <p className="text-gray-300 max-w-xl mx-auto leading-relaxed">
              {isConnected ? (
                <>
                  Welcome to the guild, <span className="text-cyber-cyan font-bold">{displayName}</span>! 
                  You are now part of the Nakamoto Chronicles. The future of Web3 is being written, 
                  and you have a voice in how the story unfolds.
                </>
              ) : (
                <>
                  The Nakamoto Chronicles is more than a comic—it's a movement. 
                  Connect your wallet to join The Blocksmiths Guild and help shape 
                  the future of decentralized storytelling.
                </>
              )}
            </p>
          </ComicPanel>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <ComicPanel className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-cyber-cyan" />
              <h3 className="font-comic text-xl text-white">Stay Updated</h3>
            </div>
            
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 p-4 bg-neon-green/10 rounded-lg"
              >
                <CheckCircle2 className="w-6 h-6 text-neon-green" />
                <p className="text-neon-green">You're subscribed! Welcome to the guild.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:border-cyber-cyan focus:outline-none transition-colors"
                  required
                />
                <button
                  type="submit"
                  onClick={playClick}
                  className="px-6 py-3 bg-cyber-cyan text-dark-bg font-bold rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </form>
            )}
            
            <p className="text-xs text-gray-500 mt-3">
              Get the latest updates on new chapters, NFT drops, and community events.
              No spam, ever.
            </p>
          </ComicPanel>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex justify-center gap-4">
            {SOCIAL_LINKS.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className={cn(
                  "w-14 h-14 bg-dark-card border border-dark-border rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:border-cyber-cyan",
                  social.color
                )}
                aria-label={social.name}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* QR Code Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-block p-4 bg-white rounded-xl">
            <div className="w-32 h-32 bg-dark-bg rounded-lg flex items-center justify-center">
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-4 h-4 rounded-sm",
                      Math.random() > 0.5 ? "bg-dark-bg" : "bg-white border border-dark-bg"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Scan to join our Discord</p>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center pt-8 border-t border-dark-border"
        >
          <p className="text-gray-500 text-sm mb-2">
            Made with <Heart className="w-4 h-4 inline text-red-500" /> by The Blocksmiths Guild
          </p>
          <p className="text-gray-600 text-xs">
            © 2024 Nakamoto Chronicles. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-4 text-xs text-gray-500">
            <a href="#" className="hover:text-cyber-cyan transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyber-cyan transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cyber-cyan transition-colors flex items-center gap-1">
              Smart Contract
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
