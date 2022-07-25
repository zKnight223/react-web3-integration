import { Web3ModalProvider } from './providers'
import ConnectWalletBtn from 'uikit/ConnectWalletBtn'

function App() {
  return (
    <div className="App">
      <Web3ModalProvider>
        <ConnectWalletBtn />
      </Web3ModalProvider>
    </div>
  )
}

export default App
