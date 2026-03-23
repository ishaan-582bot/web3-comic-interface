# 🎭 Nakamoto Chronicles

[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Wagmi](https://img.shields.io/badge/Wagmi-2.5-3C3C3D?logo=ethereum)](https://wagmi.sh/)

> **Every block tells a story. Every holder writes history.**

An interactive Web3 comic book experience that tells the origin story of The Blocksmiths Guild. Built with React, TypeScript, and real blockchain integration.

![Nakamoto Chronicles Preview](./preview.png)

## ✨ Features

### 🎨 Visual Experience
- **3D Page Flip Animations** - Smooth book-like transitions using Framer Motion
- **Comic Book Aesthetics** - Halftone patterns, speech bubbles, action effects
- **Neon Noir Theme** - Cyberpunk-inspired color palette with glow effects
- **Responsive Design** - Optimized for desktop, tablet, and mobile

### ⛓️ Web3 Integration
- **Wallet Connection** - RainbowKit + Wagmi for seamless wallet integration
- **Real Contract Interaction** - Mint NFTs on Sepolia testnet
- **Live Gas Price** - Real-time gas price ticker with historical data
- **ENS Support** - Display ENS names and avatars
- **Network Switching** - Automatic chain validation and switching

### 🎮 Interactions
- **Keyboard Navigation** - Arrow keys, space, home, end for page navigation
- **Touch Swipe** - Mobile-friendly swipe gestures
- **Sound Effects** - Web Audio API synthesized sounds
- **Konami Code Easter Egg** - ↑↑↓↓←→←→BA for dev mode
- **Token-Gated Content** - Exclusive content for NFT holders

### 📱 Performance
- **Lazy Loading** - Pages load on demand
- **Code Splitting** - Optimized bundle sizes
- **Animation Optimization** - Pauses when not visible
- **Image Optimization** - WebP format with fallbacks

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- A WalletConnect Project ID (get one at [cloud.walletconnect.com](https://cloud.walletconnect.com/))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/nakamoto-chronicles.git
cd nakamoto-chronicles
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your keys:
```env
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
VITE_ETHERSCAN_API_KEY=your_etherscan_api_key
VITE_NFT_CONTRACT_ADDRESS=your_contract_address
```

4. **Start development server**
```bash
npm run dev
```

5. **Open in browser**
Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
nakamoto-chronicles/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ComicEffects.tsx    # Visual effects (glitch, particles, etc.)
│   │   ├── ErrorBoundary.tsx   # Error handling
│   │   ├── Header.tsx          # Top navigation
│   │   ├── Navigation.tsx      # Bottom navigation
│   │   ├── NetworkSwitcher.tsx # Chain switching UI
│   │   ├── PageTransition.tsx  # 3D page animations
│   │   └── TokenGate.tsx       # Token-gated content
│   ├── contexts/         # React contexts
│   │   ├── BookContext.tsx     # Page navigation state
│   │   └── SoundContext.tsx    # Sound effects state
│   ├── contracts/        # Smart contract ABIs
│   │   └── NakamotoNFT.ts      # NFT contract ABI
│   ├── hooks/            # Custom React hooks
│   │   ├── useGasPrice.ts      # Gas price fetching
│   │   ├── useKonamiCode.ts    # Easter egg detection
│   │   ├── useNFTContract.ts   # Contract interactions
│   │   ├── useVisibility.ts    # Visibility detection
│   │   └── useWalletData.ts    # Wallet data
│   ├── lib/              # Utilities and config
│   │   ├── utils.ts            # Helper functions
│   │   └── wagmi.ts            # Wagmi configuration
│   ├── pages/            # Comic book pages
│   │   ├── CoverPage.tsx
│   │   ├── GenesisPage.tsx
│   │   ├── ProblemPage.tsx
│   │   ├── SolutionPage.tsx
│   │   ├── TokenomicsPage.tsx
│   │   ├── RoadmapPage.tsx
│   │   ├── TeamPage.tsx
│   │   ├── CommunityPage.tsx
│   │   ├── MintPage.tsx
│   │   └── BackCoverPage.tsx
│   ├── types/            # TypeScript types
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── .env.example          # Environment template
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Customization

### Color Palette
Edit `tailwind.config.js` to customize colors:
```javascript
colors: {
  'bitcoin-orange': '#F7931A',
  'cyber-cyan': '#00F0FF',
  'neon-purple': '#B829DD',
  'neon-green': '#00FF88',
  // ...
}
```

### Pages
Add new pages by:
1. Creating a new file in `src/pages/`
2. Adding it to the `pages` array in `App.tsx`
3. Adding the page name to `PAGE_NAMES` in `BookContext.tsx`

### Smart Contract
Update the contract address in `.env`:
```env
VITE_NFT_CONTRACT_ADDRESS=0xYourContractAddress
```

## 🧪 Testing

### Local Testing
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Wallet Testing
1. Install MetaMask or Rainbow wallet
2. Switch to Sepolia testnet
3. Get test ETH from [sepoliafaucet.com](https://sepoliafaucet.com/)
4. Try minting an NFT!

## 📦 Deployment

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy
```

### GitHub Pages
1. Update `vite.config.ts` with your base URL
2. Run `npm run build`
3. Deploy the `dist` folder

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_WALLETCONNECT_PROJECT_ID` | WalletConnect project ID | Yes |
| `VITE_ETHERSCAN_API_KEY` | Etherscan API key | No |
| `VITE_ALCHEMY_API_KEY` | Alchemy API key | No |
| `VITE_NFT_CONTRACT_ADDRESS` | NFT contract address | Yes |
| `VITE_APP_NAME` | App name | No |
| `VITE_ENABLE_ANALYTICS` | Enable analytics | No |
| `VITE_ENABLE_SOUNDS` | Enable sound effects | No |

## 🎯 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` or `Space` | Next page |
| `←` | Previous page |
| `Home` | First page |
| `End` | Last page |
| `Ctrl+J` | Jump to page |
| `Esc` | Close modals |
| `↑↑↓↓←→←→BA` | Dev mode (Konami code) |

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Web3**: Wagmi + Viem + RainbowKit
- **Query**: TanStack Query
- **Icons**: Lucide React

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [RainbowKit](https://www.rainbowkit.com/) for wallet connection UI
- [Wagmi](https://wagmi.sh/) for Ethereum interactions
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📞 Support

- Discord: [Join our community](https://discord.gg/nakamoto)
- Twitter: [@NakamotoChronicles](https://twitter.com/nakamoto)
- Email: support@nakamoto-chronicles.com

---

<p align="center">
  Built with ❤️ by The Blocksmiths Guild
</p>
