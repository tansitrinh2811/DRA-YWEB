import sunToken from './SunToken.json';
import moonToken from './MoonToken.json';
import soloSwapToken from './SoloSwapToken.json';
import mixedSwapToken from './MixedSwapToken.json';
import IWETH from './IWETH.json'

//suntoken & api
export const SunTokenAddress = "0xf201fFeA8447AB3d43c98Da3349e0749813C9009";
export const SunTokenABISunTokenABI = sunToken.abi;
//moontoken & api
export const MoonTokenAddress = "0xA75E74a5109Ed8221070142D15cEBfFe9642F489";
export const MoonTokenABI = moonToken.abi;
//singleswaptoken & api
export const SoloSwapTokenAddress = "0x26291175Fa0Ea3C8583fEdEB56805eA68289b105";
export const SoloSwapTokenABI = soloSwapToken.abi;
//multitoken & api
export const MixedSwapTokenAddress = "0x840748F7Fd3EA956E5f4c88001da5CC1ABCBc038";
export const MixedSwapTokenABI = mixedSwapToken.abi;
//IWETH
export const IWETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETHABI = IWETH.abi;


//SUN deployed to 0xf201fFeA8447AB3d43c98Da3349e0749813C9009
//MOON deployed to 0xA75E74a5109Ed8221070142D15cEBfFe9642F489
//SingleSwapToken deployed to 0x26291175Fa0Ea3C8583fEdEB56805eA68289b105
//SwapMulti deployed to 0x840748F7Fd3EA956E5f4c88001da5CC1ABCBc038