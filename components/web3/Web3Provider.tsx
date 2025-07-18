'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { ReactNode } from 'react';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet } from 'wagmi/chains';

const config = getDefaultConfig({
  appName: 'Ethliquid',
  projectId: 'YOUR_PROJECT_ID', // 替换为你的 WalletConnect 项目ID
  chains: [mainnet],
  ssr: true,
});
const queryClient = new QueryClient();

export default function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 