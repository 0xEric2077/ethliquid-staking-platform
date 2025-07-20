'use client'

import { useState, useEffect } from 'react'
import Header from '../../components/layout/Header'
import Background from '../../components/ui/Background'

type NavItem = {
  title: string
  items: string[]
}

type ContentItem = {
  icon: string
  title: string
  text: string
}

type ContentSection = {
  title: string
  content: ContentItem[]
}

type Content = {
  [key: string]: ContentSection
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('Introduction')
  const [searchQuery, setSearchQuery] = useState('')
  
  const navigation: NavItem[] = [
    {
      title: 'About',
      items: ['Introduction', 'LSTETH', 'Fees']
    },
    {
      title: 'Validators',
      items: ['Delegation Strategy']
    },
    {
      title: 'Users',
      items: ['Liquid staking', 'Staking APY', 'Risks', 'FAQ', 'Contact us'] 
    }
  ]

  // Handle anchor links on page load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '')
      if (hash && content[hash]) {
        setActiveSection(hash)
      }
    }
  }, [])

  const content: Content = {
    'Introduction': {
      title: 'Introduction',
      content: [
        {
          icon: '🌱',
          title: 'Join our mission to grow Ethereum!',
          text: 'At Ethliquid, we believe the Ethereum network will be the strongest if the network is secured by validators that have a large social stake in Ethereum. Ethliquid stake pool will strive to bring the financial stake in-line with the existing social stake of Ethereum-centric communities.'
        },
        {
          icon: '🎯',
          title: 'Delegating to only select, allowlisted, validators',
          text: 'Ethliquid will maintain, and continue to curate, a list of validators that are associated with Ethereum-centric communities. Within the allowlisted groups, a scoring system will be used to optimize returns for LSTETH holders.'
        },
        {
          icon: '💫',
          title: 'Focusing on "best impact" validator operators',
          text: 'Ethliquid is on a mission to maximize Ethereum\'s growth on the network level. We focus on the tail end of validators (the new and small ones), by providing stake to new and small validators that perform well. Supporting community anchored validator efforts - We focus on validators that, in some fashion, have a community attached to their operations, through a dApp, community participation, or have shown proof that they are providing value to the broader Ethereum community in various forms.'
        },
        {
          icon: '🤝',
          title: 'The Human Touch, through the DAO',
          text: 'Automated delegation strategies are not able to account for the human impact on the validator network. We believe that with a community-anchored delegation strategy, staked ETH will have the most immediate and positive effect on Ethereum as a whole. Or in other words, we focus on "best impact validators", those whose impact is notable within the ecosystem.'
        }
      ]
    },
    'LSTETH': {
      title: 'LSTETH Token',
      content: [
        {
          icon: '🪙',
          title: 'What is LSTETH?',
          text: 'LSTETH (Liquid Staking ETH) is the liquid staking token issued by Ethliquid. When you stake ETH through our platform, you receive LSTETH tokens in return, representing your staked ETH plus accumulated rewards. LSTETH can be freely traded, transferred, or used as collateral in DeFi protocols while your underlying ETH continues to earn staking rewards.'
        },
        {
          icon: '⚡',
          title: 'LSTETH Benefits',
          text: 'LSTETH provides immediate liquidity for staked ETH, allowing users to participate in staking without locking up their assets. You can use LSTETH in DeFi protocols, trade it on DEXs, or hold it to earn continuous staking rewards. The token automatically compounds rewards, so your LSTETH balance grows over time.'
        },
        {
          icon: '🔗',
          title: 'ERC-20 Standard',
          text: 'LSTETH follows the ERC-20 standard, making it compatible with all Ethereum wallets and DeFi protocols. You can store LSTETH in any ERC-20 compatible wallet, transfer it to other addresses, or integrate it into your DeFi strategies.'
        },
        {
          icon: '📈',
          title: 'Exchange Rate',
          text: 'The exchange rate between ETH and LSTETH is dynamic and increases over time as staking rewards accumulate. When you stake ETH, you receive LSTETH at the current exchange rate. When you redeem LSTETH for ETH, you receive ETH at the current exchange rate, which will be higher than when you initially staked.'
        }
      ]
    },
    'Fees': {
      title: 'Fee Structure',
      content: [
        {
          icon: '💰',
          title: 'Platform Fee',
          text: 'Ethliquid charges a competitive platform fee of 10% on staking rewards. This fee covers operational costs, validator management, and platform development. The remaining 90% of rewards go directly to LSTETH holders.'
        },
        {
          icon: '🔄',
          title: 'No Entry/Exit Fees',
          text: 'Unlike many staking services, Ethliquid does not charge fees for staking or unstaking. You can deposit ETH to receive LSTETH and redeem LSTETH for ETH without any additional charges beyond the standard Ethereum network gas fees.'
        },
        {
          icon: '📊',
          title: 'Fee Transparency',
          text: 'All fees are transparent and clearly displayed on our platform. The fee structure is designed to be sustainable for long-term operations while providing maximum value to our users. Fees are automatically deducted from staking rewards, so you don\'t need to worry about separate payments.'
        },
        {
          icon: '🎯',
          title: 'Competitive Rates',
          text: 'Our 10% platform fee is among the most competitive in the liquid staking space. We believe in providing value to our users while maintaining a sustainable business model that allows us to continue improving our service and supporting the Ethereum ecosystem.'
        }
      ]
    },
    'Delegation Strategy': {
      title: 'Delegation Strategy',
      content: [
        {
          icon: '🎯',
          title: 'Curated Validator Selection',
          text: 'Ethliquid maintains a carefully curated list of validators that are associated with Ethereum-centric communities. Our selection process focuses on validators that demonstrate strong performance, community engagement, and alignment with Ethereum\'s values and goals.'
        },
        {
          icon: '📊',
          title: 'Performance-Based Scoring',
          text: 'Within our allowlisted validator groups, we use a sophisticated scoring system that evaluates validators based on uptime, attestation performance, block proposal success rate, and community impact. This ensures optimal returns for LSTETH holders while supporting high-quality validators.'
        },
        {
          icon: '🌱',
          title: 'Supporting New Validators',
          text: 'We prioritize supporting new and small validators that show promise and align with our mission. By providing stake to these validators, we help decentralize the network and support emerging validator operators who contribute to Ethereum\'s growth.'
        },
        {
          icon: '🤝',
          title: 'Community-Anchored Approach',
          text: 'Our delegation strategy emphasizes validators that have strong community ties, whether through dApp development, community participation, or other contributions to the Ethereum ecosystem. We believe this approach maximizes the positive impact of staked ETH on the network.'
        }
      ]
    },
    'Liquid staking': {
      title: 'Liquid Staking',
      content: [
        {
          icon: '💧',
          title: 'What is Liquid Staking?',
          text: 'Liquid staking allows you to stake your ETH while maintaining liquidity. Unlike traditional staking where your ETH is locked up, liquid staking gives you LSTETH tokens that represent your staked ETH plus accumulated rewards. You can trade, transfer, or use these tokens in DeFi protocols while your underlying ETH continues to earn staking rewards.'
        },
        {
          icon: '🚀',
          title: 'How to Start Staking',
          text: 'To start staking with Ethliquid, simply connect your wallet to our platform, enter the amount of ETH you want to stake, and confirm the transaction. You\'ll immediately receive LSTETH tokens representing your staked ETH. The staking process is instant and requires no minimum stake amount.'
        },
        {
          icon: '🔄',
          title: 'Redeeming LSTETH',
          text: 'You can redeem your LSTETH for ETH at any time through our platform. The redemption process takes into account the current exchange rate, which includes accumulated staking rewards. There are no lock-up periods or penalties for early redemption.'
        },
        {
          icon: '📈',
          title: 'Automatic Compounding',
          text: 'Your LSTETH tokens automatically compound staking rewards. As validators earn rewards, the exchange rate between ETH and LSTETH increases, meaning your LSTETH becomes worth more ETH over time. This happens automatically without any action required from you.'
        }
      ]
    },
    'Staking APY': {
      title: 'Staking APY',
      content: [
        {
          icon: '📊',
          title: 'Current APY',
          text: 'The current staking APY on Ethereum is approximately 3-5%, depending on network conditions and validator performance. This rate fluctuates based on the total amount of ETH staked on the network and validator performance. Our platform aims to maximize returns through our curated validator selection strategy.'
        },
        {
          icon: '📈',
          title: 'APY Factors',
          text: 'Several factors influence staking APY: the total amount of ETH staked on the network, validator performance (uptime and attestation accuracy), network participation rate, and validator selection strategy. Our focus on high-performing, community-aligned validators helps optimize returns for our users.'
        },
        {
          icon: '🔄',
          title: 'Real-Time Updates',
          text: 'APY rates are updated in real-time based on network conditions and validator performance. You can view current rates on our platform dashboard. Remember that APY is an annualized rate and actual returns may vary based on network conditions and validator performance.'
        },
        {
          icon: '💡',
          title: 'Maximizing Returns',
          text: 'Our delegation strategy is designed to maximize returns by selecting high-performing validators and supporting new validators that show strong potential. By focusing on community-anchored validators, we aim to achieve above-average returns while supporting Ethereum\'s growth.'
        }
      ]
    },
    'Risks': {
      title: 'Risks and Considerations',
      content: [
        {
          icon: '⚠️',
          title: 'Smart Contract Risk',
          text: 'LSTETH is a smart contract-based token. While our contracts undergo extensive security audits, there is always a risk of bugs or vulnerabilities. We recommend only staking amounts you can afford to lose and staying informed about platform updates and security measures.'
        },
        {
          icon: '📉',
          title: 'Market Risk',
          text: 'The value of LSTETH may fluctuate based on market conditions, validator performance, and network changes. While LSTETH is designed to maintain a stable relationship with ETH, market conditions can affect its trading value on exchanges.'
        },
        {
          icon: '🔒',
          title: 'Validator Risk',
          text: 'Staking rewards depend on validator performance. While we carefully select and monitor our validators, there is always a risk of validator underperformance, slashing, or technical issues that could affect returns. Our diversified validator selection helps mitigate this risk.'
        },
        {
          icon: '🌐',
          title: 'Network Risk',
          text: 'Ethereum network upgrades, changes in consensus mechanisms, or other network-level changes could affect staking rewards or token functionality. We monitor network developments closely and update our platform accordingly to minimize risks to users.'
        }
      ]
    },
    'FAQ': {
      title: 'Frequently Asked Questions',
      content: [
        {
          icon: '❓',
          title: 'What is the minimum stake amount?',
          text: 'There is no minimum stake amount on Ethliquid. You can stake any amount of ETH, from small amounts to large sums. This makes our platform accessible to users of all sizes.'
        },
        {
          icon: '⏱️',
          title: 'How long does staking take?',
          text: 'Staking with Ethliquid is instant. When you stake ETH, you immediately receive LSTETH tokens representing your staked ETH. The underlying ETH is delegated to our curated validators and begins earning rewards right away.'
        },
        {
          icon: '💸',
          title: 'When do I receive rewards?',
          text: 'Rewards are automatically compounded into your LSTETH tokens. The exchange rate between ETH and LSTETH increases over time as rewards accumulate, so your LSTETH becomes worth more ETH continuously.'
        },
        {
          icon: '🔐',
          title: 'Is my ETH safe?',
          text: 'Yes, your ETH is secured by our audited smart contracts and our carefully selected validators. We maintain strict security standards and regularly audit our systems to ensure the safety of user funds.'
        }
      ]
    },
    'Contact us': {
      title: 'Contact Us',
      content: [
        {
          icon: '📧',
          title: 'Email Support',
          text: 'For general inquiries, technical support, or partnership opportunities, please email us at support@ethliquid.com. Our team typically responds within 24 hours during business days. For urgent matters, please include "URGENT" in the subject line.'
        },
        {
          icon: '💬',
          title: 'Discord Community',
          text: 'Join our Discord server to connect with the Ethliquid community, get real-time support, and stay updated on platform developments. Our community is active and welcoming to both new and experienced users. Find us at discord.gg/ethliquid.'
        },
        {
          icon: '🐦',
          title: 'Twitter Updates',
          text: 'Follow us on Twitter @Ethliquid for the latest updates, announcements, and insights about liquid staking and the Ethereum ecosystem. We regularly share platform updates, educational content, and community highlights.'
        },
        {
          icon: '📖',
          title: 'Documentation',
          text: 'For detailed technical documentation, API references, and developer resources, visit our documentation portal at docs.ethliquid.com. We maintain comprehensive guides for developers and advanced users who want to integrate with our platform.'
        }
      ]
    }
  }

  return (
    <>
      <Background />
      <Header />
      <div className="pt-20">
        {/* Search Bar - Remove background color, modify border style */}
        <div className="border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-end">
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 rounded-full border border-gray-200 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-[500]"
                  aria-label="Search documentation"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-gray-400"
                  >
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.3-4.3"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
          {/* Left Sidebar Navigation */}
          <aside className="w-64 flex-shrink-0" aria-label="Documentation navigation">
            <nav className="sticky top-24 space-y-8" aria-label="Sections">
              {navigation.map((section) => (
                <div key={section.title}>
                  <h3 className="font-bold text-lg mb-2">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item}>
                        <button
                          className={`text-left w-full hover:text-gray-900 font-[500] ${
                            activeSection === item 
                              ? 'text-blue-600 font-medium' 
                              : 'text-gray-600'
                          }`}
                          onClick={() => setActiveSection(item)}
                          aria-current={activeSection === item ? 'page' : undefined}
                          aria-label={`Go to ${item} section`}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0" aria-live="polite">
            <div className="prose max-w-none">
              <h1 className="text-4xl font-bold mb-8">{content[activeSection]?.title || activeSection}</h1>
              <div className="space-y-12">
                {content[activeSection]?.content && content[activeSection].content.length > 0 ? (
                  content[activeSection].content.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-start gap-4">
                        <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                        <div>
                          <h2 className="text-xl font-semibold mb-4">{item.title}</h2>
                          <p className="text-gray-600 leading-relaxed font-[500]">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 text-lg font-[500] py-12 text-center">
                    No documentation available for this section yet.
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
} 