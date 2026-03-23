import { useAccount, useBalance, useEnsName, useEnsAvatar } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { formatETH, formatAddress } from '../lib/utils';

interface WalletData {
  // Connection state
  isConnected: boolean;
  isConnecting: boolean;
  isDisconnected: boolean;
  
  // Address info
  address: `0x${string}` | undefined;
  formattedAddress: string;
  
  // ENS data
  ensName: string | null;
  ensAvatar: string | null;
  displayName: string;
  
  // Balance
  balance: bigint | undefined;
  formattedBalance: string;
  balanceSymbol: string;
  
  // Chain
  chainId: number | undefined;
}

export function useWalletData(): WalletData {
  const { 
    address, 
    isConnected, 
    isConnecting, 
    isDisconnected,
    chainId,
    chain,
  } = useAccount();

  // Get ENS name from mainnet (even if connected to other chain)
  const { data: ensName } = useEnsName({
    address,
    chainId: mainnet.id,
    query: {
      enabled: isConnected && !!address,
    },
  });

  // Get ENS avatar
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName || undefined,
    chainId: mainnet.id,
    query: {
      enabled: !!ensName,
    },
  });

  // Get balance
  const { data: balanceData } = useBalance({
    address,
    query: {
      enabled: isConnected && !!address,
    },
  });

  const formattedAddress = formatAddress(address);
  const displayName = ensName || formattedAddress;
  const formattedBalance = formatETH(balanceData?.value, 4);

  return {
    isConnected,
    isConnecting,
    isDisconnected,
    address,
    formattedAddress,
    ensName: ensName || null,
    ensAvatar: ensAvatar || null,
    displayName,
    balance: balanceData?.value,
    formattedBalance,
    balanceSymbol: balanceData?.symbol || 'ETH',
    chainId,
  };
}

export default useWalletData;
