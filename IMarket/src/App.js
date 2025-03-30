import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import Dramaket from './abis/Dramarket.json'

// Config
import config from './config.json'
import { Helmet } from 'react-helmet'
 
function App() {
  const [provider, setProvider] = useState(null)
  const [dramaket, setDramaket] = useState(null)

  const [account, setAccount] = useState(null)

  const [nfts, setNfts] = useState(null) ////////////////////////
  const [smartdv, setSmartdv] = useState(null)
  const [game, setGame] = useState(null)
  const [pet, setPet] = useState(null)

  const [item, setItem] = useState({})
  const [toggle, setToggle] = useState(false)

  const [searchTerm, setSearchTerm] = useState("");

  const togglePop = (item) => {
    setItem(item)
    toggle ? setToggle(false) : setToggle(true)
  }

  const loadBlockchainData = async () => {
    console.log("loading...")
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const network = await provider.getNetwork()
    console.log(network)
    const dramaket = new ethers.Contract(config[network.chainId].dramaket.address, Dramaket.abi, provider)
    setDramaket(dramaket)
    console.log(dramaket)

    const items = []

    for (var i = 0; i < 100; i++) {
      const item = await dramaket.items(i + 1)
      items.push(item)
    }

    const nfts = items.filter((item) => item.category === 'nft')
    const smartdv = items.filter((item) => item.category === 'smartdv')
    const game = items.filter((item) => item.category === 'game')
    const pet = items.filter((item) => item.category === 'pet')
    console.log(pet)

    setNfts(nfts)
    setSmartdv(smartdv)
    setGame(game)
    setPet(pet)
    console.log(setPet)
    console.log(game)
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Helmet>
        <title>DRA-Y Market</title>
        <link rel="icon" type="image/png" href="./assets/items/dradry.png" />
      </Helmet>
      <Navigation account={account} setAccount={setAccount}  setSearchTerm={setSearchTerm} />

      <h2>Dramaket Best Sellers</h2>

      {nfts && smartdv && game && pet && (
        <>
          <Section title={"Smart Device"} items={smartdv} togglePop={togglePop}  searchTerm={searchTerm} />
          <Section title={"NFT"} items={nfts} togglePop={togglePop}  searchTerm={searchTerm} />      
          <Section title={"Game Limit"} items={game} togglePop={togglePop}  searchTerm={searchTerm}/>
          <Section title={"Pet"} items={pet} togglePop={togglePop}  searchTerm={searchTerm}/>
        </>
      )}

      {toggle && (
        <Product item={item} provider={provider} account={account} dramaket={dramaket} togglePop={togglePop} />
      )}
    </div>
  );
}

export default App;
