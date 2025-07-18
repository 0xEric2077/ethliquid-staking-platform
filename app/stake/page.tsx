'use client'

import { useState } from 'react'
import Image from 'next/image'
import Header from '../../components/layout/Header'
import Background from '../../components/ui/Background'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function StakePage() {
  const [activeTab, setActiveTab] = useState('stake')

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
                />
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 font-[500] mb-2">To receive</div>
              <div className="flex items-center gap-2 p-4 border rounded-xl">
                <Image src="/images/icon_lsteth.svg" alt="LSTETH" width={24} height={24} />
                <span>LSTETH</span>
                <div className="ml-auto">1.00000</div>
              </div>
            </div>

            <div className="text-sm text-gray-600 font-[500] text-center">
              1 ETH ≈ 1.00000 LSTETH
            </div>

            {/* 钱包连接按钮 */}
            <ConnectButton showBalance={false} accountStatus="address" />
          </div>
        </div>
      </main>
    </>
  )
} 