import { useState, useEffect, useCallback } from 'react';
import { 
  useReadContract, 
  useWriteContract, 
  useWaitForTransactionReceipt,
  useAccount,
  useChainId,
} from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { NAKAMOTO_NFT_ABI } from '../contracts/NakamotoNFT';
import { getContractAddress, REQUIRED_CHAIN, isCorrectChain } from '../lib/wagmi';
import type { MintConfig } from '../types';

interface UseNFTContractReturn {
  // Read data
  totalSupply: bigint;
  maxSupply: bigint;
  mintPrice: bigint;
  userBalance: bigint;
  loading: boolean;
  error: string | null;
  
  // Write data
  mint: (quantity: number) => void;
  mintLoading: boolean;
  mintError: string | null;
  mintSuccess: boolean;
  mintHash: `0x${string}` | undefined;
  
  // Config
  config: MintConfig;
  isOnCorrectChain: boolean;
  needsSwitch: boolean;
}

export function useNFTContract(): UseNFTContractReturn {
  const { address: userAddress } = useAccount();
  const chainId = useChainId();
  const contractAddress = getContractAddress(chainId || REQUIRED_CHAIN.id);
  
  const isOnCorrectChain = isCorrectChain(chainId);
  const needsSwitch = !isOnCorrectChain && chainId !== undefined;

  // Read contract data
  const { 
    data: totalSupplyData,
    isLoading: totalSupplyLoading,
    error: totalSupplyError,
  } = useReadContract({
    address: contractAddress,
    abi: NAKAMOTO_NFT_ABI,
    functionName: 'totalSupply',
    query: {
      enabled: contractAddress !== '0x0000000000000000000000000000000000000000',
    },
  });

  const { 
    data: maxSupplyData,
    isLoading: maxSupplyLoading,
    error: maxSupplyError,
  } = useReadContract({
    address: contractAddress,
    abi: NAKAMOTO_NFT_ABI,
    functionName: 'maxSupply',
    query: {
      enabled: contractAddress !== '0x0000000000000000000000000000000000000000',
    },
  });

  const { 
    data: mintPriceData,
    isLoading: mintPriceLoading,
    error: mintPriceError,
  } = useReadContract({
    address: contractAddress,
    abi: NAKAMOTO_NFT_ABI,
    functionName: 'mintPrice',
    query: {
      enabled: contractAddress !== '0x0000000000000000000000000000000000000000',
    },
  });

  const { 
    data: userBalanceData,
    isLoading: balanceLoading,
    error: balanceError,
    refetch: refetchBalance,
  } = useReadContract({
    address: contractAddress,
    abi: NAKAMOTO_NFT_ABI,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress && contractAddress !== '0x0000000000000000000000000000000000000000',
    },
  });

  // Write contract (mint)
  const {
    writeContract,
    data: mintHash,
    error: mintWriteError,
    isPending: mintPending,
    isSuccess: mintWriteSuccess,
  } = useWriteContract();

  // Wait for transaction
  const {
    isLoading: mintConfirming,
    isSuccess: mintConfirmed,
    error: mintConfirmError,
  } = useWaitForTransactionReceipt({
    hash: mintHash,
  });

  // Mint function
  const mint = useCallback((quantity: number) => {
    if (!isOnCorrectChain) {
      console.error('Wrong chain');
      return;
    }

    if (!mintPriceData) {
      console.error('Mint price not loaded');
      return;
    }

    const totalValue = mintPriceData * BigInt(quantity);

    writeContract({
      address: contractAddress,
      abi: NAKAMOTO_NFT_ABI,
      functionName: 'mint',
      value: totalValue,
    });
  }, [contractAddress, isOnCorrectChain, mintPriceData, writeContract]);

  // Refetch balance after successful mint
  useEffect(() => {
    if (mintConfirmed) {
      refetchBalance();
    }
  }, [mintConfirmed, refetchBalance]);

  // Calculate loading state
  const loading = totalSupplyLoading || maxSupplyLoading || mintPriceLoading || balanceLoading;
  
  // Calculate error state
  const error = totalSupplyError?.message || 
                maxSupplyError?.message || 
                mintPriceError?.message || 
                balanceError?.message || 
                null;

  // Calculate mint error
  const mintError = mintWriteError?.message || mintConfirmError?.message || null;

  // Build config object
  const config: MintConfig = {
    price: mintPriceData || BigInt(0),
    maxSupply: maxSupplyData || BigInt(10000),
    totalSupply: totalSupplyData || BigInt(0),
    maxPerWallet: 10,
  };

  return {
    // Read data
    totalSupply: totalSupplyData || BigInt(0),
    maxSupply: maxSupplyData || BigInt(10000),
    mintPrice: mintPriceData || BigInt(0),
    userBalance: userBalanceData || BigInt(0),
    loading,
    error,
    
    // Write data
    mint,
    mintLoading: mintPending || mintConfirming,
    mintError,
    mintSuccess: mintConfirmed,
    mintHash,
    
    // Config
    config,
    isOnCorrectChain,
    needsSwitch,
  };
}

export default useNFTContract;
