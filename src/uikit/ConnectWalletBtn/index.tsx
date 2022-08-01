import { Web3Context } from '../../providers'
import { useContext } from 'react'

function ConnectWalletBtn() {
  const { connected, account, connect } = useContext(Web3Context)

  return (
    <button onClick={() => connect!()}>
      {connected ? account : 'Connect'}
    </button>
  )
}

export default ConnectWalletBtn
