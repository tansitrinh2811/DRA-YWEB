import React, {useState, useEffect} from 'react'
import {ethers, BigNumber} from 'ethers'
import Web3Modal from 'web3modal'

//INTERNAL IMPORT 
import { NavigationBar } from '../Component/index.js'
import{
    checkWhenStartWalletConnected,
    connectWithWallet,
    connectingWithSunToken,
    connectingWithMoonToken,
    connectingWithSoloSwapToken,
    connectingWithIWETHToken,
    connectingWithDAIToken
}from '../Utils/appFeatures.js'

import {IWETHABI} from '../Context/constants.js'
import ERC20 from './ERC20.json'

export const SwapTokenContext = React.createContext('')

export const SwapTokenContextProvider = ({ children })=>{
    const swap ="you are ready to swap token"
    //use state
    const [account, setAccount] = useState('')
    const [ether, setEther] = useState('')
    const [networkConnect, setNetworkConnect] = useState('')
    const [weth, setWETH] = useState('')
    const [dai, setDai] = useState('')

    const [tokenData, setTokenData] = useState([])

    const addToken = [
        "0xf201fFeA8447AB3d43c98Da3349e0749813C9009",
        "0xA75E74a5109Ed8221070142D15cEBfFe9642F489",
     ]
    
    //fetch data
    const fetchingData = async()=>{
        try {
            //get useraccount
            const userAccount = await checkWhenStartWalletConnected()
            setAccount(userAccount)
            //create provider
            const web3modal = new Web3Modal()
            const connection = await web3modal.connect(userAccount)
            const provider = new ethers.providers.Web3Provider(connection)        
            //check balance
            const balance = await provider.getBalance(userAccount)
            const convertBal = BigNumber.from(balance).toString();
            const ethValue = ethers.utils.formatEther(convertBal)
            setEther(ethValue)
            //get network
            const network = await provider.getNetwork()
            setNetworkConnect(network.name)
             // Fetch token data for each token in addToken array
            addToken.map(async(el, i) => {
                //getting contract
                const contract = new ethers.Contract(el, ERC20, provider);
                //getting balance of token
                const userBalance = await contract.balanceOf(userAccount)
                const tokenLeft = BigNumber.from(userBalance).toString()
                const convertTokenBal = ethers.utils.formatEther(tokenLeft)
                //get name and symbol
                const name = await contract.name()
                const symbol = await contract.symbol()
                
                tokenData.push({
                    name: name,
                    symbol: symbol,
                    tokenBalance: convertTokenBal,
                })
            })
            // Fetch WETH balance
            const weth = await connectingWithIWETHToken();
            const wethBal = await weth.balanceOf(userAccount)
            const wethToken = BigNumber.from(wethBal).toString()
            const convertwethTokenBal = ethers.utils.formatEther(wethToken)
            setWETH(convertwethTokenBal)
            // Fetch DAI balance
            const dai = await connectingWithDAIToken();
            const daiBal = await dai.balanceOf(userAccount)
            const daiToken = BigNumber.from(daiBal).toString()
            const convertdaiTokenBal = ethers.utils.formatEther(daiToken)
            setDai(convertdaiTokenBal)
        } catch (error) {
            console.log(error)
        } 
    }
    // Call fetchingData when the component mounts
    useEffect (()=>{
        fetchingData()
    }, [])
    return(
        <SwapTokenContext.Provider value={{ connectWithWallet, account, weth, dai, networkConnect, ether}}>
        { children }
        </SwapTokenContext.Provider>
    )
}



