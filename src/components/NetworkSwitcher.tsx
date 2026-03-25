import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ArrowLeftRight as Switch } from 'lucide-react';
import { useChainId, useSwitchChain } from 'wagmi';
import { REQUIRED_CHAIN } from '../lib/wagmi';
import { cn } from '../lib/utils';

interface NetworkSwitcherProps {
  className?: string;
}

export function NetworkSwitcher({ className }: NetworkSwitcherProps) {
  const chainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();
  
  const isCorrectChain = chainId === REQUIRED_CHAIN.id;
  
  // Don't show if on correct chain or not connected
  if (isCorrectChain || !chainId) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={cn(
          "fixed top-20 right-4 z-40 bg-yellow-500/90 text-black px-4 py-3 rounded-lg shadow-lg",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium">
              Wrong Network
            </p>
            <p className="text-xs opacity-80">
              Switch to {REQUIRED_CHAIN.name} to continue
            </p>
          </div>
          <button
            onClick={() => switchChain({ chainId: REQUIRED_CHAIN.id })}
            disabled={isPending}
            className="flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-md text-sm font-medium hover:bg-black/80 transition-colors disabled:opacity-50"
          >
            <Switch className="w-4 h-4" />
            {isPending ? 'Switching...' : 'Switch'}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default NetworkSwitcher;
