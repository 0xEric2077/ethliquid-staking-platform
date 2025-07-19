'use client'

import { useAccount, useConnectorClient, useReadContract } from 'wagmi'
import { useMemo, useState, useEffect } from 'react'
import { BrowserProvider, JsonRpcSigner, Contract, formatEther } from 'ethers'
import { LSTETH_ABI, LSTETH_ADDRESS, STAKING_ABI, STAKING_ADDRESS } from '../../lib/contract'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Header from '../../components/layout/Header'
import Background from '../../components/ui/Background'
import Image from 'next/image'

interface Transaction {
  hash: string
  type: 'deposit' | 'withdraw'
  amount: string
  timestamp: number
  status: 'pending' | 'success' | 'failed'
}

export default function MyAccountPage() {
  const { address, isConnected } = useAccount()
  const { data: client } = useConnectorClient()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [ethPrice, setEthPrice] = useState<number>(0)
  const [priceLoading, setPriceLoading] = useState(true)

  // ethers v6 signer
  const signer = useMemo(() => {
    if (!client) return undefined
    const provider = new BrowserProvider(client.transport)
    return new JsonRpcSigner(provider, client.account.address)
  }, [client])

  // LSTETH balance
  const { data: lstethRaw } = useReadContract({
    address: LSTETH_ADDRESS,
    abi: LSTETH_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })
  const lstethBalance = lstethRaw ? formatEther(BigInt(lstethRaw.toString())) : '0.00'

  // Total ETH Staked from contract
  const { data: totalStakedRaw } = useReadContract({
    address: STAKING_ADDRESS,
    abi: STAKING_ABI,
    functionName: 'totalStaked',
    args: [],
  })
  const totalStaked = totalStakedRaw ? formatEther(BigInt(totalStakedRaw.toString())) : '0.0000'

  // Fetch real-time ETH price
  const fetchEthPrice = async () => {
    try {
      setPriceLoading(true)
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      const data = await response.json()
      setEthPrice(data.ethereum.usd)
    } catch (error) {
      console.error('Error fetching ETH price:', error)
      // Fallback to a default price if API fails
      setEthPrice(2000)
    } finally {
      setPriceLoading(false)
    }
  }

  // Calculate TVL with real-time price
  const tvl = (parseFloat(lstethBalance) * ethPrice).toFixed(2)

  // Fetch ETH price on component mount
  useEffect(() => {
    fetchEthPrice()
    
    // Refresh price every 5 minutes
    const interval = setInterval(fetchEthPrice, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Fetch transaction history
  const fetchTransactionHistory = async () => {
    if (!signer || !address) return
    
    setLoading(true)
    try {
      const provider = signer.provider
      if (!provider) return

      // Get recent blocks
      const currentBlock = await provider.getBlockNumber()
      const fromBlock = Math.max(0, currentBlock - 10000) // Last 10000 blocks

      // Create contract instances
      const stakingContract = new Contract(STAKING_ADDRESS, STAKING_ABI, provider)

      // Get Deposit events
      const depositEvents = await stakingContract.queryFilter(
        stakingContract.filters.Deposit(address),
        fromBlock,
        currentBlock
      )

      // Get Withdraw events
      const withdrawEvents = await stakingContract.queryFilter(
        stakingContract.filters.Withdraw(address),
        fromBlock,
        currentBlock
      )

      // Combine and format events
      const allEvents = []
      
      for (const event of depositEvents) {
        if ('args' in event && event.args && event.blockNumber) {
          const block = await provider.getBlock(event.blockNumber)
          allEvents.push({
            hash: event.transactionHash,
            type: 'deposit' as const,
            amount: formatEther(event.args.amount || 0),
            timestamp: block?.timestamp || Date.now() / 1000,
            status: 'success' as const
          })
        }
      }
      
      for (const event of withdrawEvents) {
        if ('args' in event && event.args && event.blockNumber) {
          const block = await provider.getBlock(event.blockNumber)
          allEvents.push({
            hash: event.transactionHash,
            type: 'withdraw' as const,
            amount: formatEther(event.args.amount || 0),
            timestamp: block?.timestamp || Date.now() / 1000,
            status: 'success' as const
          })
        }
      }

      // Sort by timestamp (newest first)
      allEvents.sort((a, b) => b.timestamp - a.timestamp)
      setTransactions(allEvents)
    } catch (error) {
      console.error('Error fetching transaction history:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch transaction history when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      fetchTransactionHistory()
    }
  }, [isConnected, address])

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleString()
  }

  const formatHash = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`
  }

  const getActionText = (type: 'deposit' | 'withdraw') => {
    return type === 'deposit' ? 'Stake' : 'Unstake'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600'
      case 'pending':
        return 'text-yellow-600'
      case 'failed':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  if (!isConnected) {
    return (
      <>
        <Background />
        <Header />
        <main className="max-w-3xl mx-auto px-4 pt-32 pb-20">
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-600 mb-6">Please connect your wallet to view your account details</p>
            <ConnectButton />
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Background />
      <Header />
      <main className="max-w-3xl mx-auto px-4 pt-32 pb-20">
        {/* Price Display */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">ETH Price</h2>
            <button
              onClick={fetchEthPrice}
              disabled={priceLoading}
              className="text-sm text-gray-600 hover:text-black disabled:opacity-50"
            >
              {priceLoading ? 'Updating...' : 'Refresh'}
            </button>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">
              {priceLoading ? 'Loading...' : `$${ethPrice.toLocaleString()}`}
            </div>
            <div className="text-sm text-gray-600 font-[500]">Current ETH Price</div>
          </div>
        </div>

        {/* Stats Display */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">${tvl}</div>
              <div className="text-sm text-gray-600 font-[500]">My TVL</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{lstethBalance}</div>
              <div className="text-sm text-gray-600 font-[500]">My LSTETH</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{totalStaked}</div>
              <div className="text-sm text-gray-600 font-[500]">Total ETH Staked</div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Transaction History</h2>
            <button
              onClick={fetchTransactionHistory}
              disabled={loading}
              className="text-sm text-gray-600 hover:text-black disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-4 font-[500]">Time</th>
                  <th className="pb-4 font-[500]">Actions</th>
                  <th className="pb-4 font-[500]">Amount</th>
                  <th className="pb-4 font-[500]">Status</th>
                  <th className="pb-4 font-[500]">Tx hash</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td className="py-8 text-center font-[500]" colSpan={5}>
                      {loading ? 'Loading transactions...' : 'You have no asset records yet'}
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-4 text-sm">
                        {formatTime(tx.timestamp)}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Image 
                            src={tx.type === 'deposit' ? "/images/icon_eth.svg" : "/images/icon_lsteth.svg"} 
                            alt={tx.type} 
                            width={16} 
                            height={16} 
                          />
                          <span className="font-[500]">{getActionText(tx.type)}</span>
                        </div>
                      </td>
                      <td className="py-4 font-[500]">
                        {tx.amount} {tx.type === 'deposit' ? 'ETH' : 'LSTETH'}
                      </td>
                      <td className="py-4">
                        <span className={`text-sm font-[500] ${getStatusColor(tx.status)}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <a
                          href={`https://etherscan.io/tx/${tx.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 font-mono"
                        >
                          {formatHash(tx.hash)}
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
} 