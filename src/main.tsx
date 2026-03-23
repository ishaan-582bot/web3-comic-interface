import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

import App from './App'
import { config } from './lib/wagmi'
import { SoundProvider } from './contexts/SoundContext'
import { BookProvider } from './contexts/BookContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import './index.css'

// Create query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
})

// Custom RainbowKit theme with comic book colors
const customTheme = {
  ...darkTheme(),
  colors: {
    ...darkTheme().colors,
    accentColor: '#00F0FF',
    accentColorForeground: '#0A0A0F',
    connectButtonBackground: '#1A1A2E',
    connectButtonText: '#FFFFFF',
    modalBackground: '#0A0A0F',
    modalBorder: '#2A2A3E',
  },
  fonts: {
    body: 'Inter, sans-serif',
  },
  radii: {
    ...darkTheme().radii,
    connectButton: '12px',
    modal: '16px',
  },
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={customTheme}>
            <SoundProvider>
              <BookProvider>
                <App />
              </BookProvider>
            </SoundProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
