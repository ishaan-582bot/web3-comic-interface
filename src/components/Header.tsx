import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Volume2, VolumeX, Zap, Menu, X } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';
import { useBook } from '../contexts/BookContext';
import { useGasPrice } from '../hooks/useGasPrice';
import { cn } from '../lib/utils';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { enabled: soundEnabled, toggleSound } = useSound();
  const { pageProgress, jumpModalOpen, setJumpModalOpen } = useBook();
  const { price: gasPrice, loading: gasLoading } = useGasPrice();

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-dark-bg/90 backdrop-blur-md border-b border-dark-border",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo & Progress */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-bitcoin-orange to-neon-purple rounded-lg flex items-center justify-center">
                <span className="font-comic text-white text-sm">NC</span>
              </div>
              <span className="hidden sm:block font-comic text-lg text-white">
                Nakamoto Chronicles
              </span>
            </div>
            
            {/* Progress bar (hidden on mobile) */}
            <div className="hidden md:flex items-center gap-2">
              <div className="w-24 h-2 bg-dark-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyber-cyan to-neon-purple transition-all duration-300"
                  style={{ width: `${pageProgress}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 font-mono">
                {Math.round(pageProgress)}%
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Gas Price Ticker */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-dark-card rounded-lg border border-dark-border">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-xs font-mono text-cyber-cyan">
                {gasLoading ? '...' : `${gasPrice} GWEI`}
              </span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-lg bg-dark-card border border-dark-border hover:border-cyber-cyan/50 transition-colors"
              aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-cyber-cyan" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {/* Page Jump Button (mobile) */}
            <button
              onClick={() => setJumpModalOpen(!jumpModalOpen)}
              className="md:hidden p-2 rounded-lg bg-dark-card border border-dark-border hover:border-cyber-cyan/50 transition-colors"
              aria-label="Jump to page"
            >
              {jumpModalOpen ? (
                <X className="w-5 h-5 text-cyber-cyan" />
              ) : (
                <Menu className="w-5 h-5 text-cyber-cyan" />
              )}
            </button>

            {/* Wallet Connect */}
            <ConnectButton 
              showBalance={false}
              chainStatus="icon"
              accountStatus="address"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
