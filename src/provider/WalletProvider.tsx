import React from 'react'
import { WagmiConfig } from 'wagmi'
import { wagmiConfig } from './wagmi.config'


const WalletProvider:React.FC<{
    children: React.ReactNode
}> = ({
    children
}) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      {children}
    </WagmiConfig>
  )
}

export default WalletProvider
