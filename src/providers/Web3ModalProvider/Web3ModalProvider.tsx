import {
  createContext,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react'
import Web3 from 'web3'
import Web3Modal from 'web3modal'

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
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [connected, setConnected] = useState<boolean>(false)
  const [chainId, setChainId] = useState<number | null>(null)

  useEffect(() => {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
      disableInjectedProvider: false,
    })
    setWeb3Modal(web3Modal)
  }, [])

  const reset = useCallback(() => {
    setWeb3(null)
    setAccount(null)
    setConnected(false)
    setChainId(null)
  }, [])

  const subscribeProvider = useCallback(
    (provider: any, web3: Web3) => {
      if (!provider) return

      provider.on('disconnect', () => {
        reset()
      })

      provider.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length == 0) reset()
        else setAccount(web3.utils.toChecksumAddress(accounts[0]))
      })

      provider.on('chainChanged', (chainId: number) => {
        console.log('Chain changed: ', chainId)
        setChainId(chainId)
      })
    },
    [reset]
  )

  const connect = useCallback(async () => {
    if (!web3Modal) return

    const _provider = await web3Modal.connect()
    if (_provider === null) return

    const _web3 = new Web3(_provider)
    setWeb3(_web3)

    await subscribeProvider(_provider, _web3)

    const _accounts = await _web3.eth.getAccounts()
    const _account = _web3.utils.toChecksumAddress(_accounts[0])
    const _chainId = await _web3.eth.getChainId()

    setAccount(_account)
    setChainId(Number(_chainId))
    setConnected(true)
  }, [web3Modal, subscribeProvider])

  useEffect(() => {
    if (web3Modal /* && web3Modal.cachedProvider*/) {
      connect()
    }
    window.ethereum
      .request({ method: 'eth_accounts' })
      .then((accounts: any[]) => {
        if (accounts.length === 0) console.log('Please connect to wallet.')
        else {
          connect()
        }
      })
  }, [web3Modal, connect])

  const disconnect = useCallback(async () => {
    if (web3 && web3.currentProvider) {
      const _provider: any = web3.currentProvider
      if (_provider.close) await _provider.close()
    }
    if (web3Modal) {
      await web3Modal.clearCachedProvider()
    }
    reset()
  }, [web3Modal, web3, reset])

  return (
    <Web3ModalContext.Provider
      value={{ web3, connect, disconnect, account, chainId, connected }}
    >
      {props.children}
    </Web3ModalContext.Provider>
  )
}

export default Web3ModalProvider
