import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const socialLinks = [
    { icon: "/images/icon_x.svg", href: "https://twitter.com/ethliquid" },
    { icon: "/images/icon_telegram.svg", href: "https://t.me/ethliquid" },
    { icon: "/images/icon_discord.svg", href: "https://discord.gg/ethliquid" },
    { icon: "/images/icon_youtube.svg", href: "https://youtube.com/@ethliquid" },
  ]

  const footerLinks = {
    About: [
      { name: 'Introduction', href: '/docs#Introduction' },
      { name: 'LSTETH', href: '/docs#LSTETH' },
      { name: 'Fees', href: '/docs#Fees' },
      { name: 'STAKE', href: '/stake' }
    ],
    Validators: [
      { name: 'Delegation Strategy', href: '/docs#Delegation Strategy' }
    ],
    Users: [
      { name: 'Liquid staking', href: '/docs#Liquid staking' },
      { name: 'Staking APY', href: '/docs#Staking APY' },
      { name: 'Risks', href: '/docs#Risks' },
      { name: 'FAQ', href: '/docs#FAQ' },
      { name: 'Contact us', href: '/docs#Contact us' }
    ]
  }

  return (
    <footer className="bg-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-12 gap-8 pb-16">
          <div className="md:col-span-3">
            <Image 
              src="/images/logo.svg" 
              alt="Ethliquid Logo" 
              width={160} 
              height={40} 
              className="mb-6"
            />
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.href}
                  className="hover:opacity-80 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image 
                    src={link.icon} 
                    alt="Social Icon" 
                    width={24} 
                    height={24} 
                  />
                </Link>
              ))}
            </div>
            <Link href="/stake">
              <button className="bg-[#00FFA9] text-black px-8 py-3 rounded-full mt-8 hover:opacity-90 transition-opacity">
                Stake ETH
              </button>
            </Link>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="md:col-span-3">
              <h3 className="text-xl font-medium mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-base font-medium">AUDITED BY</span>
            <Image 
              src="/images/blocksec.svg" 
              alt="Blocksec" 
              width={140} 
              height={28} 
              className="ml-2"
            />
          </div>
          <div className="text-sm text-gray-600">
            ©2025 Ethliquid · All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  )
} 