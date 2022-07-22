import { createContext, ReactElement, useCallback, useState } from 'react'
import Web3 from 'web3'

interface IWeb3ModalContext {
  web3: Web3 | null
  connect: Function
  disconnect: Function
  account: string | null
  chainId: number | null
  connected: boolean
}

export const Web3ModalContext = createContext<IWeb3ModalContext>({
  web3: null,
  connect: () => {},
  disconnect: () => {},
  account: null,
  chainId: null,
  connected: false,
})

type Web3ModalProviderPropType = {
  children: ReactElement
}

const Web3ModalProvider = (props: Web3ModalProviderPropType) => {
  const [web3, setWeb3] = useState<Web3 | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [connected, setConnected] = useState<boolean>(false)
  const [chainId, setChainId] = useState<number | null>(null)

  const connect = useCallback(() => {}, [])
  const disconnect = useCallback(() => {}, [])

  return (
    <Web3ModalContext.Provider
      value={{ web3, connect, disconnect, account, chainId, connected }}
    >
      {props.children}
    </Web3ModalContext.Provider>
  )
}

export default Web3ModalProvider
