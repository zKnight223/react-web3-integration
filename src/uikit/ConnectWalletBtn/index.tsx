import { Web3Context } from '../../providers'
import { useContext } from 'react'

function ConnectWalletBtn() {
  const { connected, account, connect, chainId, switchChain } =
    useContext(Web3Context)

  return (
    <div>
      <button onClick={() => connect!()}>
        {connected ? account : 'Connect'}
      </button>
      <button
        onClick={() => {
          Number(chainId) === 1 ? switchChain(0x38) : switchChain(0x1)
        }}
      >
        {chainId}
      </button>
    </div>
  )
}

export default ConnectWalletBtn
