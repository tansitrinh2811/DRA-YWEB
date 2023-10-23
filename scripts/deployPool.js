//Token address
const ysAddress =  '0x43b9Ef43D415e84aD9964567002d648b11747A8f'
const veiAddress =  '0xFCa5Bb3732185AE6AaFC65aD8C9A4fBFf21DbaaD'
const popAddress =  '0x32cd5ecdA7f2B8633C00A0434DE28Db111E60636'
//Uniswap contract address
const WETHAddress =  '0x72662E4da74278430123cE51405c1e7A1B87C294'
const factoryAddress =  '0x52bad4A8584909895C22bdEcf8DBF33314468Fb0'
const swapRouterAddress =  '0xed12bE400A07910E4d4E743E4ceE26ab1FC9a961'
const nftDescriptorAddress =  '0x1B25157F05B25438441bF7CDe38A95A55ccf8E50'      
const nonfungibleTokenPositionDescriptorAddress =  '0xc775bF567D67018dfFac4E89a7Cf10f0EDd0Be93'
const nonfungiblePositionMangerAddress =  '0x3489745eff9525CCC3d8c648102FE2cf3485e228' 

const artifacts = {
    UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
    NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
  };
  
  const { Contract, BigNumber } = require("ethers");
  const bn = require("bignumber.js");
  bn.config({
    EXPONENTIAL_AT: 999999,
    DECIMAL_PLACES: 40,
  });
  
  const MAINNET_URL =
    "https://eth-mainnet.g.alchemy.com/v2/md8hRFeBCofBkPfYtxmsx8oDVj9HBAI-";
  
  const provider = new ethers.providers.JsonRpcProvider(MAINNET_URL);
  
  function encodePriceSqrt(reserve1, reserve0) {
    return BigNumber.from(
      new bn(reserve1.toString())
        .div(reserve0.toString())
        .sqrt()
        .multipliedBy(new bn(2).pow(96))
        .integerValue(3)
        .toString()
    );
  }
  
  const nonfungiblePositionmanager = new Contract(
    nonfungiblePositionMangerAddress,
    artifacts.NonfungiblePositionManager.abi,
    provider
  );
  
  const factory = new Contract(
    factoryAddress,
    artifacts.UniswapV3Factory.abi,
    provider
  );
  
  async function deployPool(token0, token1, fee, price) {
    const [owner] = await ethers.getSigners();
  
    console.log(`Creating pool for ${token0} / ${token1}`);
    console.log("Creating pool...");
    const poolTxn = await nonfungiblePositionmanager
      .connect(owner)
      .createAndInitializePoolIfNecessary(token0, token1, fee, price, {
        gasLimit: 5000000,
      });
    console.log("Pool created");
    console.log("Pool txn: ", poolTxn);
  
    const poolAddress = await factory.connect(owner).getPool(token0, token1, fee);
    console.log(`Pool address is ${poolAddress}`);
    return poolAddress;
  }
  
  async function main() {
    const devPool = await deployPool(
      ysAddress,
      veiAddress,
      500,
      encodePriceSqrt(1, 1)
    );
  
    console.log("devPool: ", `'${devPool}'`);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.log("error", error);
      process.exit(1);
    });

    //npx hardhat run --network localhost scripts/deployPool.js
  