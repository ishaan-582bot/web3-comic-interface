// Global Type Definitions

export interface PageProps {
  isActive: boolean;
  direction: 'next' | 'prev' | null;
}

export interface BookState {
  currentPage: number;
  totalPages: number;
  isAnimating: boolean;
  direction: 'next' | 'prev' | null;
}

export interface WalletState {
  address: string | null;
  ensName: string | null;
  avatar: string | null;
  balance: bigint | null;
  chainId: number | null;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
}

export interface Transaction {
  hash: string;
  type: 'mint' | 'transfer' | 'approve';
  status: 'pending' | 'success' | 'failed';
  timestamp: number;
  value?: string;
}

export interface GasPriceData {
  price: number;
  loading: boolean;
  error: string | null;
  history: { time: number; price: number }[];
}

export interface ComicPanel {
  id: string;
  title: string;
  content: string;
  image?: string;
  interactive?: boolean;
  locked?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  twitter?: string;
  github?: string;
  description: string;
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  description: string;
  completed: boolean;
  date: string;
  milestones: string[];
}

export interface TokenomicItem {
  label: string;
  percentage: number;
  color: string;
  description: string;
}

export interface SoundState {
  enabled: boolean;
  volume: number;
}

export type PageDirection = 'next' | 'prev' | null;

export type ErrorType = 
  | 'network' 
  | 'wallet' 
  | 'contract' 
  | 'transaction' 
  | 'unknown';

export interface AppError {
  type: ErrorType;
  message: string;
  recoverable: boolean;
}

// Animation Types
export interface AnimationConfig {
  duration: number;
  ease: number[];
  delay?: number;
}

// Web3 Types
export interface ContractConfig {
  address: `0x${string}`;
  abi: any[];
  chainId: number;
}

export interface MintConfig {
  price: bigint;
  maxSupply: bigint;
  totalSupply: bigint;
  maxPerWallet: number;
}
