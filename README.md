# Ethliquid

Ethliquid is a Next.js + React + Tailwind CSS + TypeScript-based ETH liquid staking and DeFi frontend platform.

## Project Overview

Ethliquid provides Ethereum users with a one-stop staking and DeFi service platform, featuring high yields, low fees, and community-driven validator allocation strategies. Users can stake ETH to receive LSTETH and participate in various DeFi strategies to enhance asset returns.

## Key Features
- ETH staking and unstaking to receive LSTETH
- Multiple LSTETH use cases in DeFi ecosystem (liquidity, restaking, lending, etc.)
- Real-time yield, TVL, fee data display
- FAQ, documentation, account management and other auxiliary features

## Tech Stack
- Next.js 13+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS & tailwindcss-animate
- Framer Motion (animations)
- Lucide-react (icons)
- Foundry (smart contract development)

## Project Structure
- `app/`         Pages and layouts (Next.js 13+ App Router)
- `components/`  Reusable UI components (layout, ui, icons, etc.)
- `public/`      Static assets (images, SVG, fonts, etc.)
- `lib/`         Utility functions (expandable to hooks, api, etc.)
- `src/`         Smart contracts
- `test/`        Contract tests
- `script/`      Deployment scripts

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Smart Contract Development

### Prerequisites
- [Foundry](https://getfoundry.sh/) - Smart contract development framework
- [Node.js](https://nodejs.org/) 18+ 
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Install Foundry
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### Compile Contracts
```bash
forge build
```

### Run Tests
```bash
forge test
```

### Run Tests with Verbose Output
```bash
forge test -vvv
```

## Deployment

### Frontend Deployment

#### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com/)
3. Vercel will automatically detect Next.js and deploy
4. Configure environment variables in Vercel dashboard

#### Option 2: Self-hosted
```bash
npm run build
npm start
```

### Smart Contract Deployment

#### 1. Environment Setup
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Add your configuration:
```env
PRIVATE_KEY=your_private_key_here
RPC_URL=your_rpc_url_here
ETHERSCAN_API_KEY=your_etherscan_api_key
```

**Note**: 
- For localhost deployment, you can use the default Anvil private key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
- For testnet/mainnet deployment, use your actual private key from the `.env` file
- Never commit your private key to version control

#### 2. Deploy to Testnet (Sepolia/Goerli)
```bash
# Deploy to Sepolia
forge script script/Deploy.s.sol:Deploy --rpc-url https://sepolia.infura.io/v3/YOUR_PROJECT_ID --private-key $PRIVATE_KEY --broadcast --verify

# Deploy to Goerli
forge script script/Deploy.s.sol:Deploy --rpc-url https://goerli.infura.io/v3/YOUR_PROJECT_ID --private-key $PRIVATE_KEY --broadcast --verify
```

#### 3. Deploy to Mainnet
```bash
# Deploy to Ethereum mainnet
forge script script/Deploy.s.sol:Deploy --rpc-url https://mainnet.infura.io/v3/YOUR_PROJECT_ID --private-key $PRIVATE_KEY --broadcast --verify
```

#### 4. Verify Contracts on Etherscan
```bash
# Verify specific contract
forge verify-contract CONTRACT_ADDRESS src/LstETH.sol:LstETH --etherscan-api-key YOUR_ETHERSCAN_API_KEY --chain mainnet
```

### Deployment Script Configuration

The deployment script (`script/Deploy.s.sol`) handles:
- Contract deployment order
- Constructor parameter setup
- Contract verification
- Deployment logging

### Environment Variables

Required environment variables:
- `PRIVATE_KEY`: Your deployment wallet private key
- `RPC_URL`: Ethereum RPC endpoint
- `ETHERSCAN_API_KEY`: Etherscan API key for contract verification

#### Frontend Environment Variables
For local development, create a `.env.local` file in the root directory:
```env
# Localhost contract addresses (update after local deployment)
NEXT_PUBLIC_LSTETH_ADDRESS_LOCALHOST=0x... # LSTETH contract address on localhost
NEXT_PUBLIC_STAKING_ADDRESS_LOCALHOST=0x... # Staking contract address on localhost

# Network configuration
NEXT_PUBLIC_CHAIN_ID=31337 # Localhost chain ID
NEXT_PUBLIC_RPC_URL=http://localhost:8545 # Local RPC URL
```

### Gas Optimization

Before mainnet deployment:
```bash
# Generate gas report
forge test --gas-report

# Optimize gas usage
forge build --optimize --via-ir
```

### Security Considerations

1. **Multi-sig Setup**: Use a multi-signature wallet for mainnet deployments
2. **Timelock**: Implement timelock for critical functions
3. **Audit**: Complete security audit before mainnet deployment
4. **Testing**: Comprehensive testing on testnets
5. **Monitoring**: Set up monitoring and alerting systems

### Post-Deployment Checklist

- [ ] Verify all contracts on Etherscan
- [ ] Update frontend with new contract addresses
- [ ] Test all functionality on mainnet
- [ ] Set up monitoring and alerting
- [ ] Document deployment addresses
- [ ] Update documentation

## Development

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run contract tests
forge test

# Compile contracts
forge build
```

#### Setting Up Local Development Environment

1. **Deploy contracts locally**:
```bash
# Start local Anvil node
anvil

# In another terminal, deploy contracts
forge script script/Deploy.s.sol:Deploy --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
```

2. **Update environment variables**:
After deployment, copy the contract addresses to your `.env.local` file:
```env
NEXT_PUBLIC_LSTETH_ADDRESS_LOCALHOST=0x... # Copy from deployment output
NEXT_PUBLIC_STAKING_ADDRESS_LOCALHOST=0x... # Copy from deployment output
```

3. **Start the frontend**:
```bash
npm run dev
```

The frontend will now connect to your locally deployed contracts.

### Code Quality
```bash
# Lint frontend code
npm run lint

# Format Solidity code
forge fmt

# Check Solidity code
forge check
```

## Contributing

We welcome issues, PRs, and suggestions! Please read our contributing guidelines before submitting.

## License

This project is licensed under the MIT License.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
