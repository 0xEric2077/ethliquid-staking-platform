import LstETHAbi from '../out/LstETH.sol/LstETH.json'
import StakingAbi from '../out/Staking.sol/Staking.json'

// 网络配置
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

// 获取当前网络配置
function getNetworkConfig(chainId?: number) {
  const targetChainId = chainId || 31337 // 默认本地网络
  return Object.values(NETWORKS).find(network => network.chainId === targetChainId) || NETWORKS.localhost
}

// 导出网络配置获取函数
export const getContractAddresses = (chainId?: number) => {
  const config = getNetworkConfig(chainId)
  return {
    LSTETH_ADDRESS: config.lstETH,
    STAKING_ADDRESS: config.staking,
  }
}

// 向后兼容的默认导出（使用本地网络）
const defaultConfig = getNetworkConfig()
export const LSTETH_ADDRESS = defaultConfig.lstETH
export const STAKING_ADDRESS = defaultConfig.staking

export const LSTETH_ABI = LstETHAbi.abi
export const STAKING_ABI = StakingAbi.abi 