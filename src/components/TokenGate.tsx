import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Eye } from 'lucide-react';
import { useAccount } from 'wagmi';
import { cn } from '../lib/utils';
import { useNFTContract } from '../hooks/useNFTContract';

interface TokenGateProps {
  children: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
  minBalance?: number;
  showBlur?: boolean;
}

export function TokenGate({ 
  children, 
  className,
  fallback,
  minBalance = 1,
  showBlur = true,
}: TokenGateProps) {
  const { isConnected } = useAccount();
  const { userBalance, loading } = useNFTContract();
  
  const hasAccess = isConnected && userBalance >= BigInt(minBalance);
  
  if (loading) {
    return (
      <div className={cn("relative", className)}>
        <div className="animate-pulse bg-dark-border rounded-lg h-32" />
      </div>
    );
  }
  
  if (hasAccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn("relative", className)}
      >
        {/* Unlocked badge */}
        <div className="absolute -top-2 -right-2 z-10 bg-neon-green text-dark-bg px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Unlock className="w-3 h-3" />
          Unlocked
        </div>
        {children}
      </motion.div>
    );
  }
  
  // Locked state
  return (
    <div className={cn("relative", className)}>
      {/* Blurred content */}
      <div 
        className={cn(
          "relative overflow-hidden rounded-lg",
          showBlur && "blur-md select-none pointer-events-none"
        )}
      >
        {children}
      </div>
      
      {/* Lock overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-dark-card/95 backdrop-blur-sm border-2 border-neon-purple rounded-xl p-6 text-center max-w-xs">
          <div className="w-16 h-16 bg-neon-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-neon-purple" />
          </div>
          
          <h3 className="font-comic text-xl text-white mb-2">
            Classified Content
          </h3>
          
          <p className="text-gray-400 text-sm mb-4">
            {!isConnected 
              ? 'Connect your wallet to unlock exclusive content'
              : `Hold at least ${minBalance} Nakamoto NFT to unlock`
            }
          </p>
          
          {fallback}
        </div>
      </div>
    </div>
  );
}

// Preview mode - shows partial content with "see more" prompt
interface TokenGatePreviewProps {
  children: React.ReactNode;
  preview: React.ReactNode;
  className?: string;
}

export function TokenGatePreview({ 
  children, 
  preview,
  className,
}: TokenGatePreviewProps) {
  const { isConnected } = useAccount();
  const { userBalance } = useNFTContract();
  const hasAccess = isConnected && userBalance > 0;
  
  if (hasAccess) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <div className={cn("relative", className)}>
      {preview}
      
      {/* Gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent" />
      
      {/* Unlock prompt */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="bg-dark-card border border-neon-purple rounded-full px-4 py-2 flex items-center gap-2">
          <Eye className="w-4 h-4 text-neon-purple" />
          <span className="text-sm text-white">
            Connect wallet to see more
          </span>
        </div>
      </div>
    </div>
  );
}

export default TokenGate;
