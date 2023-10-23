import sunToken from './SunToken.json';
import moonToken from './MoonToken.json';
import soloSwapToken from './SoloSwapToken.json'
import mixedSwapToken from './MixedSwapToken.json';
import IWETH from './IWETH.json'
import userDataStorage from './UserDataStorage.json'

export const SunTokenAddress = "0x721d8077771Ebf9B931733986d619aceea412a1C";
export const SunTokenABISunTokenABI = sunToken.abi;

export const MoonTokenAddress = "0x38c76A767d45Fc390160449948aF80569E2C4217";
export const MoonTokenABI = moonToken.abi;
//singleswaptoken & api
export const SoloSwapTokenAddress = "0x3489745eff9525CCC3d8c648102FE2cf3485e228";
export const SoloSwapTokenABI = soloSwapToken.abi;
//multitoken & api
export const MixedSwapTokenAddress = "0xfc073209b7936A771F77F63D42019a3a93311869";
export const MixedSwapTokenABI = mixedSwapToken.abi;
//IWETH
export const IWETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETHABI = IWETH.abi;
// USE DATA
export const storageUserDataAddrees = "0x43b9Ef43D415e84aD9964567002d648b11747A8f"
export const storageUserDataABI = userDataStorage.abi