import { ethers } from "ethers";
import Web3Modal from "web3modal";

import {
    SunTokenAddress,
    SunTokenABI,
    MoonTokenAddress,
    MoonTokenABI,
    SoloSwapTokenAddress,
    SoloSwapTokenABI,
    MixedSwapTokenAddress,
    MixedSwapTokenABI,
    IWETHAddress,
    IWETHABI,
} from '../Context/constants'
//if wallet is connect, check
export const checkWhenStartWalletConnected = async()=>{
    try{
        if(!window.ethereum) return console.log("Install Metamask");
        const accounts = await window.ethereum.request({
            method:'eth_accounts',
        })
        const firstAccount = accounts[0];
        return firstAccount;
    }catch (error){
        console.log(error);
    }
}
//connect with wallet
export const connectWithWallet = async()=>{
    try{
        if(!window.ethereum) return console.log("Install Metamask");
        const accounts = await window.ethereum.request({
            method:'eth_requestAccounts',
        });
        const firstAccount = accounts[0];
        return firstAccount;
    }catch (error){
        console.log(error);
    }
}

//suntoken fetching...
export const fetchSunContract = (signerOrProvider) => 
new ethers.Contract(SunTokenAddress, SunTokenABI, signerOrProvider)
//connecting with sun token contract
export const connectingWithSunToken = async() => {
    try{
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchSunContract(signer);
        return contract;
    }catch (error){
        console.log(error);
    }
}
//moontoken fetching contract...
export const fetchMoonContract = (signerOrProvider) => 
new ethers.Contract(MoonTokenAddress, MoonTokenABI, signerOrProvider)
//connecting with moon token contract
export const connectingWithMoonToken = async()=>{
    try{
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchMoonContract(signer);
        return contract;
    }catch (error){
        console.log(error);
    }
}
//soloSwaptoken fetching...
export const fetchSoloSwapContract = (signerOrProvider) => 
new ethers.Contract(SoloSwapTokenAddress, SoloSwapTokenABI, signerOrProvider)
//connecting with  Singletoken contract
export const connectingWithSoloSwapToken = async()=>{
    try{
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchSoloSwapContract(signer);
        return contract;
    }catch (error){
        console.log(error);
    }
}
//multiswaptoken fetching...
// export const fetchMultiSwapContract = (signerOrProvider) => 
// new ethers.Contract(SwapMultiTokenAddress, SwapMultiABI, signerOrProvider)
// //connecting with multi token contract
// export const connectingWithMultiSwapToken = async()=>{
//     try{
//         const web3modal = new Web3Modal();
//         const connection = await web3modal.connect();
//         const provider = new ethers.providers.Web3Provider(connection);
//         const signer = provider.getSigner();
//         const contract = fetchMultiSwapContract(signer);
//         return contract;
//     }catch (error){
//         console.log(error);
//     }
// }
//IWETHtoken fetching...
export const fetchIWETHContract = (signerOrProvider) => 
new ethers.Contract(IWETHAddress, IWETHABI, signerOrProvider)
//connecting with IWETH token contract
export const connectingWithIWETHToken = async()=>{
    try{
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchIWETHContract(signer);
        return contract;
    }catch (error){
        console.log(error);
    }
}
//DAItoken fetching...
const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
export const fetchDAIContract = (signerOrProvider) => 
new ethers.Contract(DAIAddress, IWETHABI, signerOrProvider)
//connecting with DAI token contract
export const connectingWithDAIToken = async()=>{
    try{
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchDAIContract(signer);
        return contract;
    }catch (error){
        console.log(error);
    }
}