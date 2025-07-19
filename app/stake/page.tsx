'use client'

import { useAccount, useBalance, useConnectorClient } from 'wagmi'
import { useMemo, useState, useEffect } from 'react'
import { BrowserProvider, JsonRpcSigner, Contract, parseEther, formatEther } from 'ethers'
import { LSTETH_ABI, LSTETH_ADDRESS, STAKING_ABI, STAKING_ADDRESS } from '../../lib/contract'
import Image from 'next/image'
import Header from '../../components/layout/Header'
import Background from '../../components/ui/Background'
// import { ConnectButton } from '@rainbow-me/rainbowkit' // 已移除
import { useReadContract } from 'wagmi'

export default function StakePage() {
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake')
  const [stakeAmount, setStakeAmount] = useState('')
  const [unstakeAmount, setUnstakeAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const { address, isConnected } = useAccount()
  const { data: client } = useConnectorClient()
  // ethers v6 signer
  const signer = useMemo(() => {
    if (!client) return undefined
    const provider = new BrowserProvider(client.transport)
    return new JsonRpcSigner(provider, client.account.address)
  }, [client])
  const { data: balanceData, refetch: refetchBalance } = useBalance({ address })

  // Total ETH Staked from contract
  const { data: totalStakedRaw, refetch: refetchTotalStaked } = useReadContract({
    address: STAKING_ADDRESS,
    abi: STAKING_ABI,
    functionName: 'totalStaked',
    args: [],
  })
  const totalStaked = totalStakedRaw ? formatEther(BigInt(totalStakedRaw.toString())) : '0.0000'

  // LSTETH 余额
  const { data: lstethRaw, refetch: refetchLsteth } = useReadContract({
    address: LSTETH_ADDRESS,
    abi: LSTETH_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })
  const lstethBalance = lstethRaw ? formatEther(BigInt(lstethRaw.toString())) : '0.0000'

  // Success message auto-hide
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [successMsg])

  // Stake ETH
  const handleStake = async () => {
    if (!signer || !stakeAmount) return
    setLoading(true)
    try {
      const contract = new Contract(STAKING_ADDRESS, STAKING_ABI, signer)
      const tx = await contract.deposit({ value: parseEther(stakeAmount) })
      await tx.wait()
      refetchBalance()
      refetchTotalStaked()
      refetchLsteth()
      setSuccessMsg('Stake successful!')
      setStakeAmount('')
    } catch {
      setSuccessMsg('Stake failed!')
    } finally {
      setLoading(false)
    }
  }

  // Unstake LSTETH
  const handleUnstake = async () => {
    if (!signer || !unstakeAmount) return
    setLoading(true)
    try {
      const contract = new Contract(STAKING_ADDRESS, STAKING_ABI, signer)
      const tx = await contract.withdraw(parseEther(unstakeAmount))
      await tx.wait()
      refetchBalance()
      refetchTotalStaked()
      refetchLsteth()
      setSuccessMsg('Unstake successful!')
      setUnstakeAmount('')
    } catch {
      setSuccessMsg('Unstake failed!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Background />
      <Header />
      <main className="max-w-3xl mx-auto px-4 pt-32 pb-20">
        {/* Success Alert */}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-green-100 text-green-800 text-center font-semibold animate-fade-in">
            {successMsg}
          </div>
        )}
        {/* Stats Display */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{Number(totalStaked).toFixed(4)}</div>
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

        {/* Stake/Unstake Interface */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Get LSTETH</h2>
          {/* Balance */}
          <div className="text-right text-sm text-gray-500 mb-2 space-y-1">
            {isConnected ? (
              <>
                <div className="flex items-center justify-end gap-2">
                  <Image src="/images/icon_eth.svg" alt="ETH" width={18} height={18} />
                  <span>Balance: {balanceData?.formatted ?? '0.00'} ETH</span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Image src="/images/icon_lsteth.svg" alt="LSTETH" width={18} height={18} />
                  <span>LSTETH: {lstethBalance}</span>
                </div>
              </>
            ) : (
              'Please connect your wallet'
            )}
          </div>
          {/* Tabs */}
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
            {activeTab === 'stake' ? (
              <>
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
                  <div className="text-sm text-gray-600 font-[500] mb-2">You will receive</div>
                  <div className="flex items-center gap-2 p-4 border rounded-xl">
                    <Image src="/images/icon_lsteth.svg" alt="LSTETH" width={24} height={24} />
                    <span>LSTETH</span>
                    <div className="ml-auto">{stakeAmount ? Number(stakeAmount).toFixed(5) : '0.00000'}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 font-[500] text-center">
                  1 ETH ≈ 1.00000 LSTETH
                </div>
                <button
                  className="w-full bg-black text-white rounded-xl py-3 mt-2 disabled:opacity-50"
                  onClick={handleStake}
                  disabled={!isConnected || !stakeAmount || loading}
                >
                  {loading ? 'Staking...' : 'Stake'}
                </button>
              </>
            ) : (
              <>
                <div>
                  <div className="text-sm text-gray-600 font-[500] mb-2">You are unstaking</div>
                  <div className="flex items-center gap-2 p-4 border rounded-xl">
                    <Image src="/images/icon_lsteth.svg" alt="LSTETH" width={24} height={24} />
                    <span>LSTETH</span>
                    <input
                      type="number"
                      className="ml-auto text-right focus:outline-none"
                      placeholder="1.00"
                      value={unstakeAmount}
                      onChange={e => setUnstakeAmount(e.target.value)}
                      min="0"
                      step="any"
                      disabled={!isConnected || loading}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 font-[500] mb-2">You will receive</div>
                  <div className="flex items-center gap-2 p-4 border rounded-xl">
                    <Image src="/images/icon_eth.svg" alt="ETH" width={24} height={24} />
                    <span>ETH</span>
                    <div className="ml-auto">{unstakeAmount ? Number(unstakeAmount).toFixed(5) : '0.00000'}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 font-[500] text-center">
                  1 LSTETH ≈ 1.00000 ETH
                </div>
                <button
                  className="w-full bg-black text-white rounded-xl py-3 mt-2 disabled:opacity-50"
                  onClick={handleUnstake}
                  disabled={!isConnected || !unstakeAmount || loading}
                >
                  {loading ? 'Unstaking...' : 'Unstake'}
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  )
} 