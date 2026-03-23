import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { 
  mainnet, 
  sepolia, 
  polygon, 
  optimism, 
  arbitrum,
  base,
} from 'wagmi/chains';

// Get environment variables
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id';

// App metadata for wallet connections
const appName = import.meta.env.VITE_APP_NAME || 'Nakamoto Chronicles';
const appDescription = import.meta.env.VITE_APP_DESCRIPTION || 'Interactive Web3 Comic Book';

// Supported chains - Sepolia is primary for testing
export const supportedChains = [
  sepolia,
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
] as const;

// Create Wagmi config with RainbowKit
export const config = getDefaultConfig({
  appName,
  projectId,
  chains: supportedChains,
  ssr: false, // We're a client-side SPA
});

// Chain configuration helpers
export function getChainById(chainId: number) {
  return supportedChains.find(chain => chain.id === chainId);
}

export function isSupportedChain(chainId: number): boolean {
  return supportedChains.some(chain => chain.id === chainId);
}

// Get required chain for NFT operations
export const REQUIRED_CHAIN = sepolia;

// Check if user is on the correct chain
export function isCorrectChain(chainId: number | undefined): boolean {
  return chainId === REQUIRED_CHAIN.id;
}

// Contract addresses by chain
export const CONTRACT_ADDRESSES: Record<number, `0x${string}`> = {
  [sepolia.id]: (import.meta.env.VITE_NFT_CONTRACT_ADDRESS as `0x${string}`) || '0x0000000000000000000000000000000000000000',
  [mainnet.id]: '0x0000000000000000000000000000000000000000', // Mainnet deployment TBD
};

// Get contract address for current chain
export function getContractAddress(chainId: number): `0x${string}` {
  return CONTRACT_ADDRESSES[chainId] || CONTRACT_ADDRESSES[sepolia.id];
}

// RPC URLs for fallback
export const RPC_URLS: Record<number, string> = {
  [mainnet.id]: `https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY || ''}`,
  [sepolia.id]: `https://eth-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY || ''}`,
  [polygon.id]: 'https://polygon-rpc.com',
  [optimism.id]: 'https://mainnet.optimism.io',
  [arbitrum.id]: 'https://arb1.arbitrum.io/rpc',
  [base.id]: 'https://mainnet.base.org',
};

// Block explorer URLs
export const EXPLORER_URLS: Record<number, string> = {
  [mainnet.id]: 'https://etherscan.io',
  [sepolia.id]: 'https://sepolia.etherscan.io',
  [polygon.id]: 'https://polygonscan.com',
  [optimism.id]: 'https://optimistic.etherscan.io',
  [arbitrum.id]: 'https://arbiscan.io',
  [base.id]: 'https://basescan.org',
};

// Get explorer URL for transaction/address
export function getExplorerUrl(
  chainId: number,
  hash: string,
  type: 'tx' | 'address' | 'token' = 'tx'
): string {
  const base = EXPLORER_URLS[chainId] || EXPLORER_URLS[mainnet.id];
  return `${base}/${type}/${hash}`;
}

// Native currency symbols
export const NATIVE_SYMBOLS: Record<number, string> = {
  [mainnet.id]: 'ETH',
  [sepolia.id]: 'ETH',
  [polygon.id]: 'MATIC',
  [optimism.id]: 'ETH',
  [arbitrum.id]: 'ETH',
  [base.id]: 'ETH',
};

// Get native currency symbol
export function getNativeSymbol(chainId: number): string {
  return NATIVE_SYMBOLS[chainId] || 'ETH';
}
