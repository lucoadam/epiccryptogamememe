import { createConfig, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { bsc, mainnet } from '@wagmi/core/chains'

 
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bsc, mainnet],
  [publicProvider()],
)
 
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],

  publicClient,
  webSocketPublicClient,
})