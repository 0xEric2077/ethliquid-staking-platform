'use client'

import { useAccount, useBalance, useConnectorClient } from 'wagmi'
import { useMemo, useState } from 'react'
import { BrowserProvider, JsonRpcSigner, Contract, parseEther } from 'ethers'
import { STAKING_ABI, STAKING_ADDRESS } from '../../lib/contract'
import Image from 'next/image'
import Header from '../../components/layout/Header'
import Background from '../../components/ui/Background'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function StakePage() {
  const [activeTab, setActiveTab] = useState('stake')
  const [stakeAmount, setStakeAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const { address, isConnected } = useAccount()
  const { data: client } = useConnectorClient()
  // ethers v6 signer
  const signer = useMemo(() => {
    if (!client) return undefined
    const provider = new BrowserProvider(client.transport)
    return new JsonRpcSigner(provider, client.account.address)
  }, [client])
  const { data: balanceData, refetch: refetchBalance } = useBalance({ address })

  // 质押处理函数
  const handleStake = async () => {
    if (!signer || !stakeAmount) return
    setLoading(true)
    try {
      const contract = new Contract(STAKING_ADDRESS, STAKING_ABI, signer)
      const tx = await contract.deposit({ value: parseEther(stakeAmount) })
      await tx.wait()
      refetchBalance()
      alert('质押成功')
      setStakeAmount('')
    } catch (err: any) {
      alert('质押失败: ' + (err.message || err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Background />
      <Header />
      <main className="max-w-3xl mx-auto px-4 pt-32 pb-20">
        {/* Stats Display */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">0.0000</div>
              <div className="text-sm text-gray-600 font-[500]">Total ETH Staked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">4.2%</div>
              <div className="text-sm text-gray-600 font-[500]">APY</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">$0.00</div>
              <div className="text-sm text-gray-600 font-[500]">TVL</div>
            </div>
          </div>
        </div>

        {/* Stake Interface */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Get Liquid ETH</h2>
          {/* 显示余额 */}
          <div className="text-right text-sm text-gray-500 mb-2">
            {isConnected ? `余额: ${balanceData?.formatted ?? '0.00'} ETH` : '请连接钱包'}
          </div>
          {/* Stake/Unstake Tabs */}
          <div className="flex mb-6 bg-gray-100 rounded-full p-1">
            <button 
              className={`flex-1 py-2 px-4 rounded-full ${activeTab === 'stake' ? 'bg-black text-white' : ''}`}
              onClick={() => setActiveTab('stake')}
            >
              Stake
            </button>
            <button 
              className={`flex-1 py-2 px-4 rounded-full ${activeTab === 'unstake' ? 'bg-black text-white' : ''}`}
              onClick={() => setActiveTab('unstake')}
            >
              Unstake
            </button>
          </div>

          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-600 font-[500] mb-2">You are staking</div>
              <div className="flex items-center gap-2 p-4 border rounded-xl">
                <Image src="/images/icon_eth.svg" alt="ETH" width={24} height={24} />
                <span>ETH</span>
                <input 
                  type="number" 
                  className="ml-auto text-right focus:outline-none"
                  placeholder="1.00"
                  value={stakeAmount}
                  onChange={e => setStakeAmount(e.target.value)}
                  min="0"
                  step="any"
                  disabled={!isConnected || loading}
                />
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 font-[500] mb-2">To receive</div>
              <div className="flex items-center gap-2 p-4 border rounded-xl">
                <Image src="/images/icon_lsteth.svg" alt="LSTETH" width={24} height={24} />
                <span>LSTETH</span>
                <div className="ml-auto">{stakeAmount ? Number(stakeAmount).toFixed(5) : '0.00000'}</div>
              </div>
            </div>

            <div className="text-sm text-gray-600 font-[500] text-center">
              1 ETH ≈ 1.00000 LSTETH
            </div>

            {/* 钱包连接按钮 */}
            <ConnectButton showBalance={false} accountStatus="address" />

            {/* 质押按钮 */}
            <button
              className="w-full bg-black text-white rounded-xl py-3 mt-2 disabled:opacity-50"
              onClick={handleStake}
              disabled={!isConnected || !stakeAmount || loading}
            >
              {loading ? '质押中...' : '质押'}
            </button>
          </div>
        </div>
      </main>
    </>
  )
} 