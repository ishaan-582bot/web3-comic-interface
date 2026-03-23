import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Sparkles, AlertCircle, CheckCircle2, ExternalLink, Wallet } from 'lucide-react';
import { ComicPanel, Particles } from '../components/ComicEffects';
import { NetworkSwitcher } from '../components/NetworkSwitcher';
import { useNFTContract } from '../hooks/useNFTContract';
import { useWalletData } from '../hooks/useWalletData';
import { useSound } from '../contexts/SoundContext';
import { cn, formatETH, getExplorerUrl } from '../lib/utils';
import { REQUIRED_CHAIN } from '../lib/wagmi';

export default function MintPage() {
  const [quantity, setQuantity] = useState(1);
  const { isConnected } = useWalletData();
  const { 
    mint, 
    mintLoading, 
    mintSuccess, 
    mintHash, 
    mintError,
    totalSupply, 
    maxSupply, 
    mintPrice,
    userBalance,
    isOnCorrectChain,
    needsSwitch,
  } = useNFTContract();
  const { playSuccess, playClick } = useSound();

  const totalCost = mintPrice * BigInt(quantity);
  const remaining = maxSupply - totalSupply;
  const progress = Number(totalSupply) / Number(maxSupply) * 100;

  const handleMint = () => {
    playClick();
    mint(quantity);
  };

  const increaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(q => q + 1);
      playClick();
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
      playClick();
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
          <span className="inline-block px-4 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-sm font-mono mb-4">
            Chapter 08
          </span>
          <h1 className="font-comic text-4xl sm:text-5xl lg:text-6xl text-white mb-2">
            The Mint
          </h1>
          <p className="text-gray-400">Claim your place in history</p>
        </motion.div>

        {/* Network Warning */}
        {needsSwitch && <NetworkSwitcher />}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* NFT Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ComicPanel variant="highlight" className="p-6 relative overflow-hidden">
              <Particles count={20} color="#B829DD" />
              
              {/* NFT Image Placeholder */}
              <div className="aspect-square bg-gradient-to-br from-dark-bg to-dark-border rounded-xl flex items-center justify-center relative overflow-hidden mb-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-center"
                >
                  <Sparkles className="w-24 h-24 text-neon-purple mx-auto mb-4" />
                  <p className="font-comic text-2xl text-white">Nakamoto NFT</p>
                  <p className="text-sm text-gray-400">#{(Number(totalSupply) + 1).toString()}</p>
                </motion.div>
                
                {/* Rarity badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                  <span className="text-xs font-bold text-white">LEGENDARY</span>
                </div>
              </div>

              {/* NFT Info */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Collection</span>
                  <span className="text-white">Nakamoto Chronicles</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Your Balance</span>
                  <span className="text-cyber-cyan font-mono">{userBalance.toString()} NFTs</span>
                </div>
              </div>
            </ComicPanel>
          </motion.div>

          {/* Mint Controls */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Supply Info */}
            <ComicPanel className="p-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Mint Progress</span>
                <span className="font-mono text-cyber-cyan">{progress.toFixed(1)}%</span>
              </div>
              <div className="h-3 bg-dark-bg rounded-full overflow-hidden mb-3">
                <motion.div
                  className="h-full bg-gradient-to-r from-neon-purple to-neon-pink"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{totalSupply.toString()} minted</span>
                <span className="text-gray-500">{remaining.toString()} remaining</span>
              </div>
            </ComicPanel>

            {/* Quantity Selector */}
            <ComicPanel className="p-5">
              <label className="text-sm text-gray-400 mb-3 block">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1 || mintLoading}
                  className="w-12 h-12 bg-dark-bg rounded-lg flex items-center justify-center hover:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                
                <span className="flex-1 text-center font-comic text-3xl text-white">
                  {quantity}
                </span>
                
                <button
                  onClick={increaseQuantity}
                  disabled={quantity >= 10 || mintLoading}
                  className="w-12 h-12 bg-dark-bg rounded-lg flex items-center justify-center hover:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </ComicPanel>

            {/* Price & Total */}
            <ComicPanel className="p-5">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Price per NFT</span>
                  <span className="font-mono text-white">{formatETH(mintPrice)} ETH</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-400">Total</span>
                  <span className="font-mono text-cyber-cyan font-bold">{formatETH(totalCost)} ETH</span>
                </div>
                
                {/* Gas estimate tooltip */}
                <div className="pt-3 border-t border-dark-border">
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Estimated gas: ~0.001 ETH ($2-5)
                  </p>
                </div>
              </div>
            </ComicPanel>

            {/* Mint Button */}
            <AnimatePresence mode="wait">
              {mintSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-6 bg-neon-green/10 border-2 border-neon-green rounded-xl text-center"
                >
                  <CheckCircle2 className="w-12 h-12 text-neon-green mx-auto mb-3" />
                  <h3 className="font-comic text-2xl text-neon-green mb-2">
                    Mint Successful!
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Welcome to the Nakamoto Chronicles!
                  </p>
                  {mintHash && (
                    <a
                      href={getExplorerUrl(REQUIRED_CHAIN.id, mintHash, 'tx')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cyber-cyan hover:underline"
                    >
                      View on Etherscan
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </motion.div>
              ) : (
                <motion.button
                  key="mint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleMint}
                  disabled={!isConnected || !isOnCorrectChain || mintLoading}
                  className={cn(
                    "w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3",
                    isConnected && isOnCorrectChain
                      ? "bg-gradient-to-r from-neon-purple to-neon-pink text-white hover:scale-[1.02] hover:shadow-lg"
                      : "bg-dark-border text-gray-500 cursor-not-allowed"
                  )}
                >
                  {!isConnected ? (
                    <>
                      <Wallet className="w-5 h-5" />
                      Connect Wallet to Mint
                    </>
                  ) : mintLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Minting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      MINT NOW
                    </>
                  )}
                </motion.button>
              )}
            </AnimatePresence>

            {/* Error Message */}
            {mintError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{mintError}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
