import { Web3ModalContext } from '../../providers'
import { useContext } from 'react'

function ConnectWalletBtn() {
  const { connected, account } = useContext(Web3ModalContext)

  return <button>{connected ? account : 'Connect'}</button>
}

export default ConnectWalletBtn
