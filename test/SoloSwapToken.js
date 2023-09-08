const {expect} = require("chai");
const {ethers} = require("hardhat");

const DAI= "0x6B175474E89094C44Da98b954EedeAC495271d0F";//"0x2bcAE8205a77dabB2479CF2c85ded7d963101B86";//
const WETH="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";//"0xEF1DACBce5194C668BEe55f2ca599F366709db0C";//
const USDC="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

describe("Swap Single Token", ()=>{
    let soloSwapToken;
    let accounts;
    let weth;
    let dai;
    let usdc;

    before(async()=>{
        accounts = await ethers.getSigners(1);
        
        const SoloSwapToken = await ethers.getContractFactory("SoloSwapToken");
        soloSwapToken = await SoloSwapToken.deploy();

        await soloSwapToken.deployed();

        weth = await ethers.getContractAt("IWETH", WETH)
        dai = await ethers.getContractAt("IERC20", DAI)
        usdc = await ethers.getContractAt("IERC20", USDC)
    });
    it("should check the ETH balance of an account", async () => {
        const accountAddress = accounts[0].address; // address 0
    
        const balance = await ethers.provider.getBalance(accountAddress);
        const etherBalance = ethers.utils.formatEther(balance);
    
        console.log(`ETH balance of ${accountAddress}: ${etherBalance} ETH`);
      });
    
      it("should check the DAI balance of an account", async () => {
        const accountAddress = accounts[0].address; // address 0
    
        const daiBalance = await dai.balanceOf(accountAddress);
    
        console.log(`DAI balance of ${accountAddress}: ${daiBalance.toString()} DAI`);
      });
    it("swapExactInput. Your test is successfull", async ()=>{
        const amountTokenIn=10n**18n;
        //Deposit WETH
        await weth.deposit({value: amountTokenIn});
        await weth.approve(soloSwapToken.address, amountTokenIn);
        //SWAP
        await soloSwapToken.soloSwapTokenExactInput(amountTokenIn);
        console.log("DAI balance", await dai.balanceOf(accounts[0].address))
    });
    it("swapExactOutput. Your test is successfull", async ()=>{
        const wethTokenamountInMax=10n**18n;
        const daiTokenAmountOut=100n*10n**18n;
        //Deposit WETH
        await weth.deposit({value: wethTokenamountInMax});
        await weth.approve(soloSwapToken.address, wethTokenamountInMax);
        //SWAP
        await soloSwapToken.soloSwapTokenExactOutput(daiTokenAmountOut, wethTokenamountInMax);
        console.log(accounts[0].address)
        console.log("DAI balance", await dai.balanceOf(accounts[0].address))
    });
});

