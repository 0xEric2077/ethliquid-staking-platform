import type { Metadata } from "next";
import "./globals.css";
import Web3Provider from "../components/web3/Web3Provider";

export const metadata: Metadata = {
  title: "ETH Staking Platform",
  description: "Stake your ETH tokens easily and securely",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col font-['Montserrat_Variable']`}>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  )
}
