// import { Web3ModalProvider } from './providers'
import { Web3Provider } from './providers'
import ConnectWalletBtn from 'uikit/ConnectWalletBtn'

function App() {
  return (
    <div className="App">
      {/* <Web3ModalProvider>
        <ConnectWalletBtn />
      </Web3ModalProvider> */}
      <Web3Provider>
        <ConnectWalletBtn />
      </Web3Provider>
    </div>
  )
}

export default App
