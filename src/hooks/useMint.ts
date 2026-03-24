import { useState, useCallback } from 'react';
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt, useChainId, useSwitchChain } from 'wagmi';
import { parseEther } from 'viem';
import { NAKAMOTO_NFT_ABI, NAKAMOTO_NFT_ADDRESSES, MINT_CONFIG } from '../contracts/NakamotoNFT';
import { sepolia } from 'wagmi/chains';

interface MintState {
  isMinting: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
  txHash: string | null;
}

interface UseMintReturn extends MintState {
  mint: (quantity: number) => Promise<void>;
  reset: () => void;
  totalMinted: number;
  maxSupply: number;
  mintPrice: string;
  isOnCorrectChain: boolean;
  switchToCorrectChain: () => Promise<void>;
}

export function useMint(): UseMintReturn {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  
  const [state, setState] = useState<MintState>({
    isMinting: false,
    isSuccess: false,
    isError: false,
    error: null,
    txHash: null,
  });

  // Check if on correct chain (Sepolia for demo)
  const isOnCorrectChain = chainId === sepolia.id;

  // Read total supply
  const { data: totalSupplyData } = useReadContract({
    address: NAKAMOTO_NFT_ADDRESSES[chainId || sepolia.id] as `0x${string}`,
    abi: NAKAMOTO_NFT_ABI,
    functionName: 'totalSupply',
    query: {
      enabled: isConnected && isOnCorrectChain,
    },
  });

  // Write contract hook
  const { writeContract, data: hash, error: writeError, isPending } = useWriteContract();

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const switchToCorrectChain = useCallback(async () => {
    if (switchChain) {
      switchChain({ chainId: sepolia.id });
    }
  }, [switchChain]);

  const mint = useCallback(async (quantity: number) => {
    if (!isConnected) {
      setState(prev => ({
        ...prev,
        isError: true,
        error: 'Please connect your wallet first',
      }));
      return;
    }

    if (!isOnCorrectChain) {
      setState(prev => ({
        ...prev,
        isError: true,
        error: 'Please switch to Sepolia testnet',
      }));
      return;
    }

    setState({
      isMinting: true,
      isSuccess: false,
      isError: false,
      error: null,
      txHash: null,
    });

    try {
      const totalPrice = parseFloat(MINT_CONFIG.price) * quantity;
      
      writeContract({
        address: NAKAMOTO_NFT_ADDRESSES[sepolia.id] as `0x${string}`,
        abi: NAKAMOTO_NFT_ABI,
        functionName: 'mint',
        value: parseEther(totalPrice.toString()),
      });

      setState(prev => ({
        ...prev,
        txHash: hash || null,
      }));
    } catch (err) {
      setState({
        isMinting: false,
        isSuccess: false,
        isError: true,
        error: err instanceof Error ? err.message : 'Mint failed',
        txHash: null,
      });
    }
  }, [isConnected, isOnCorrectChain, writeContract, hash]);

  const reset = useCallback(() => {
    setState({
      isMinting: false,
      isSuccess: false,
      isError: false,
      error: null,
      txHash: null,
    });
  }, []);

  // Update state based on transaction status
  if (isConfirmed && !state.isSuccess) {
    setState(prev => ({
      ...prev,
      isMinting: false,
      isSuccess: true,
      txHash: hash || null,
    }));
  }

  if (writeError && !state.isError) {
    setState({
      isMinting: false,
      isSuccess: false,
      isError: true,
      error: writeError.message,
      txHash: null,
    });
  }

  return {
    ...state,
    isMinting: isPending || isConfirming,
    mint,
    reset,
    totalMinted: Number(totalSupplyData || 3420),
    maxSupply: MINT_CONFIG.maxSupply,
    mintPrice: MINT_CONFIG.price,
    isOnCorrectChain,
    switchToCorrectChain,
  };
}

export default useMint;
