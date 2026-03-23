import React, { Suspense, lazy, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';

import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { PageTransition, PageLoading } from './components/PageTransition';
import { NetworkSwitcher } from './components/NetworkSwitcher';
import { ComicExplosion } from './components/ComicEffects';

import { useBook } from './contexts/BookContext';
import { useSound } from './contexts/SoundContext';
import { useKonamiCode } from './hooks/useKonamiCode';
import { useWalletData } from './hooks/useWalletData';

import './App.css';

// Lazy load pages for better performance
const pages = [
  lazy(() => import('./pages/CoverPage')),
  lazy(() => import('./pages/GenesisPage')),
  lazy(() => import('./pages/ProblemPage')),
  lazy(() => import('./pages/SolutionPage')),
  lazy(() => import('./pages/TokenomicsPage')),
  lazy(() => import('./pages/RoadmapPage')),
  lazy(() => import('./pages/TeamPage')),
  lazy(() => import('./pages/CommunityPage')),
  lazy(() => import('./pages/MintPage')),
  lazy(() => import('./pages/BackCoverPage')),
];

// Dev Mode Panel (Easter Egg)
function DevModePanel({ active, onClose }: { active: boolean; onClose: () => void }) {
  const { address, chainId } = useAccount();
  
  if (!active) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-dark-card border-2 border-neon-green rounded-xl p-6 max-w-lg w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-comic text-2xl text-neon-green flex items-center gap-2">
            <span className="animate-pulse">⚡</span>
            Developer Mode
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4 font-mono text-sm">
          <div className="bg-black/50 rounded-lg p-4">
            <p className="text-gray-400 mb-1">Connected Address:</p>
            <p className="text-cyber-cyan break-all">{address || 'Not connected'}</p>
          </div>
          
          <div className="bg-black/50 rounded-lg p-4">
            <p className="text-gray-400 mb-1">Chain ID:</p>
            <p className="text-cyber-cyan">{chainId || 'None'}</p>
          </div>
          
          <div className="bg-black/50 rounded-lg p-4">
            <p className="text-gray-400 mb-1">Environment:</p>
            <p className="text-neon-green">
              {import.meta.env.DEV ? 'Development' : 'Production'}
            </p>
          </div>
          
          <div className="bg-black/50 rounded-lg p-4">
            <p className="text-gray-400 mb-1">Features:</p>
            <ul className="text-white space-y-1">
              <li>✓ 3D Page Transitions</li>
              <li>✓ Web3 Wallet Integration</li>
              <li>✓ Sound Effects</li>
              <li>✓ Gas Price Ticker</li>
              <li>✓ Keyboard Navigation</li>
              <li>✓ Touch Swipe Support</li>
            </ul>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-neon-green text-dark-bg font-bold rounded-lg hover:scale-105 transition-transform"
        >
          Close Dev Mode
        </button>
      </div>
    </motion.div>
  );
}

function App() {
  const { currentPage, isAnimating } = useBook();
  const { playClick } = useSound();
  const { activated: devModeActive, reset: resetDevMode } = useKonamiCode();
  const walletData = useWalletData();

  // Log page views for analytics
  useEffect(() => {
    if (import.meta.env.PROD) {
      // analytics.track('page_view', { page: currentPage });
    }
  }, [currentPage]);

  // Track wallet connections
  useEffect(() => {
    if (walletData.isConnected && import.meta.env.PROD) {
      // analytics.track('wallet_connected', { 
      //   address: walletData.address,
      //   ens: walletData.ensName,
      // });
    }
  }, [walletData.isConnected, walletData.address, walletData.ensName]);

  const CurrentPage = pages[currentPage];

  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-hidden">
      {/* Header */}
      <Header />
      
      {/* Network Switcher */}
      <NetworkSwitcher />
      
      {/* Main Content Area */}
      <main 
        className="fixed inset-0 pt-16 pb-16 overflow-hidden"
        onClick={playClick}
      >
        <PageTransition pageKey={currentPage}>
          <Suspense fallback={<PageLoading />}>
            <div className="h-full w-full overflow-y-auto overflow-x-hidden">
              <CurrentPage />
            </div>
          </Suspense>
        </PageTransition>
      </main>
      
      {/* Navigation */}
      <Navigation />
      
      {/* Dev Mode Panel (Easter Egg) */}
      <AnimatePresence>
        {devModeActive && (
          <DevModePanel 
            active={devModeActive} 
            onClose={resetDevMode} 
          />
        )}
      </AnimatePresence>
      
      {/* Page transition effect */}
      <AnimatePresence>
        {isAnimating && (
          <ComicExplosion 
            text="FLIP!"
            color="cyan"
            size="sm"
          />
        )}
      </AnimatePresence>
      
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 halftone opacity-5" />
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(0, 240, 255, 0.05) 0%, transparent 50%)',
          }}
        />
      </div>
    </div>
  );
}

export default App;
