// Utility Functions

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format Ethereum address for display
 */
export function formatAddress(address: string | null | undefined): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Format ETH value with proper decimals
 */
export function formatETH(value: bigint | string | null | undefined, decimals = 4): string {
  if (value === null || value === undefined) return '0';
  const val = typeof value === 'string' ? BigInt(value) : value;
  const eth = Number(val) / 1e18;
  return eth.toFixed(decimals);
}

/**
 * Format number with commas
 */
export function formatNumber(num: number | string | bigint): string {
  const n = typeof num === 'bigint' ? Number(num) : Number(num);
  return n.toLocaleString('en-US');
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if device is touch-enabled
 */
export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

/**
 * Get Etherscan URL for transaction
 */
export function getEtherscanUrl(
  hash: string,
  chainId: number = 1,
  type: 'tx' | 'address' | 'token' = 'tx'
): string {
  const explorers: Record<number, string> = {
    1: 'https://etherscan.io',
    11155111: 'https://sepolia.etherscan.io',
    137: 'https://polygonscan.com',
    80001: 'https://mumbai.polygonscan.com',
    42161: 'https://arbiscan.io',
    10: 'https://optimistic.etherscan.io',
  };
  
  const base = explorers[chainId] || explorers[1];
  return `${base}/${type}/${hash}`;
}

/**
 * Calculate gas cost in ETH
 */
export function calculateGasCost(gasPrice: bigint, gasLimit: bigint): string {
  const cost = (gasPrice * gasLimit) / BigInt(1e9);
  return formatETH(cost, 6);
}

/**
 * Format date relative to now
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

/**
 * Parse error message from Web3 error
 */
export function parseWeb3Error(error: any): string {
  if (typeof error === 'string') return error;
  
  const message = error?.message || error?.reason || 'Unknown error';
  
  // Common error patterns
  if (message.includes('user rejected')) {
    return 'Transaction was rejected by user';
  }
  if (message.includes('insufficient funds')) {
    return 'Insufficient funds for transaction';
  }
  if (message.includes('gas required exceeds')) {
    return 'Gas limit exceeded';
  }
  if (message.includes('nonce too low')) {
    return 'Transaction nonce error. Please try again.';
  }
  
  return message;
}

/**
 * Generate comic-style sound effect text
 */
export function getComicSoundEffect(): string {
  const effects = [
    'POW!', 'BAM!', 'WOW!', 'ZAP!', 'BOOM!',
    'KAPOW!', 'WHAM!', 'CRASH!', 'BANG!', 'ZOOM!',
  ];
  return effects[Math.floor(Math.random() * effects.length)];
}

/**
 * Sleep utility for animations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Local storage wrapper with error handling
 */
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('Storage error:', err);
    }
  },
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error('Storage error:', err);
    }
  },
};
