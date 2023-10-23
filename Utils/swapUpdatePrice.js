import {AlphaRouter} from '@uniswap/smart-order-router'
import {ethers, BigNumber} from 'ethers' 
import {Token, CurrencyAmount, TradeType, Percent} from '@uniswap/sdk-core'

//get data right
const V3_SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'
 
//get price 
const chainId = 1
const MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/md8hRFeBCofBkPfYtxmsx8oDVj9HBAI-'
const provider = new ethers.providers.JsonRpcProvider(MAINNET_URL);
//const signer = provider.getSigner();
  
const router = new AlphaRouter({chainId: chainId, provider: provider})

const name0 = 'Wrapped Ether'
const symbol0 = 'WETH'
const decimals0 = 18
const address0 = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'

const name1 = 'DAI'
const symbol1 = 'DAI'
const decimals1 = 18
const address1 = '0x6B175474E89094C44Da98b954EedeAC495271d0F'

const WETH = new Token(chainId, address0, decimals0, symbol0, name0)
const DAI = new Token(chainId, address1, decimals1, symbol1, name1)

const swapUpdatePrice = async(inputAmount, slippageAmount, deadline, walletAddress) => {
    const percentSlippage = new Percent(slippageAmount, 100)
    const wei = ethers.utils.parseUnits(inputAmount.toString(), decimals0)
    const currencyAmount = CurrencyAmount.fromRawAmount(
        WETH,
        BigNumber.from(wei)
    )
    console.log('currencyAmount:', currencyAmount);
    console.log('DAI:', DAI);
    console.log('TradeType.EXACT_INPUT:', TradeType.EXACT_INPUT);
    const route = await router.route(currencyAmount, DAI, TradeType.EXACT_INPUT, {
        recipient: walletAddress,
        slippageTolerance: percentSlippage,
        deadline: deadline
    })
    

    const transaction = {
        data: route.methodParameters.calldata,
        to: V3_SWAP_ROUTER_ADDRESS,
        value: BigNumber.from(route.methodParameters.value),
        from: walletAddress,
        gasPrice:BigNumber.from(route.gasPriceWei),
        gasLimit: ethers.utils.hexlify(1000000)
    }

    const quoteAmountOut = route.quote.toFixed(6)
    const ratio = (inputAmount / quoteAmountOut).toFixed(3)

    console.log("quoteAmountOut value:", quoteAmountOut)
    console.log("ratio value:", ratio)
    return [transaction, quoteAmountOut, ratio]
}

export { swapUpdatePrice }