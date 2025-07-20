import LstETHAbi from '../out/LstETH.sol/LstETH.json'
import StakingAbi from '../out/Staking.sol/Staking.json'

// Network configuration
const NETWORKS = {
  localhost: {
    chainId: 31337,
    name: 'Localhost',
    lstETH: process.env.NEXT_PUBLIC_LSTETH_ADDRESS_LOCALHOST || '',
    staking: process.env.NEXT_PUBLIC_STAKING_ADDRESS_LOCALHOST || '',
  },
  sepolia: {
    chainId: 11155111,
    name: 'Sepolia',
    lstETH: process.env.NEXT_PUBLIC_LSTETH_ADDRESS_SEPOLIA || '',
    staking: process.env.NEXT_PUBLIC_STAKING_ADDRESS_SEPOLIA || '',
  },
  mainnet: {
    chainId: 1,
    name: 'Mainnet',
    lstETH: process.env.NEXT_PUBLIC_LSTETH_ADDRESS_MAINNET || '',
    staking: process.env.NEXT_PUBLIC_STAKING_ADDRESS_MAINNET || '',
  },
} as const

// Get current network configuration
function getNetworkConfig(chainId?: number) {
  const targetChainId = chainId || 31337 // Default localhost network
  return Object.values(NETWORKS).find(network => network.chainId === targetChainId) || NETWORKS.localhost
}

// Export network configuration getter function
export const getContractAddresses = (chainId?: number) => {
  const config = getNetworkConfig(chainId)
  return {
    LSTETH_ADDRESS: config.lstETH,
    STAKING_ADDRESS: config.staking,
  }
}

// Backward compatible default export (using localhost network)
const defaultConfig = getNetworkConfig()
export const LSTETH_ADDRESS = defaultConfig.lstETH
export const STAKING_ADDRESS = defaultConfig.staking

export const LSTETH_ABI = LstETHAbi.abi
export const STAKING_ABI = StakingAbi.abi 