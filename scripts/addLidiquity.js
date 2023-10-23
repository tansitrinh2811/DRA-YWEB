//Token address
const ysAddress =  '0x43b9Ef43D415e84aD9964567002d648b11747A8f'
const veiAddress =  '0xFCa5Bb3732185AE6AaFC65aD8C9A4fBFf21DbaaD'
const popAddress =  '0x32cd5ecdA7f2B8633C00A0434DE28Db111E60636'

const devPool=  '0x8b00d2D470c3ef10d42D408d952bd8C03034014d'
//Uniswap contract address
const WETHAddress =  '0x72662E4da74278430123cE51405c1e7A1B87C294'
const factoryAddress =  '0x52bad4A8584909895C22bdEcf8DBF33314468Fb0'
const swapRouterAddress =  '0xed12bE400A07910E4d4E743E4ceE26ab1FC9a961'
const nftDescriptorAddress =  '0x1B25157F05B25438441bF7CDe38A95A55ccf8E50'      
const nonfungibleTokenPositionDescriptorAddress =  '0xc775bF567D67018dfFac4E89a7Cf10f0EDd0Be93'
const nonfungiblePositionMangerAddress =  '0x3489745eff9525CCC3d8c648102FE2cf3485e228' 

const artifacts = {
    NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
    Yasuo: require("../artifacts/contracts/Yasuo.sol/Yasuo.json"),
    Veigar: require("../artifacts/contracts/Veigar.sol/Veigar.json"),
    UniswapV3Pool: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json"),
  };
  
  const { Contract } = require("ethers");
  const { Token } = require("@uniswap/sdk-core");
  
  const { Pool, Position, nearestUsableTick } = require("@uniswap/v3-sdk");
  
  async function getPoolData(poolContract) {
    const [tickSpacing, fee, liquidity, slot0] = await Promise.all([
      poolContract.tickSpacing(),
      poolContract.fee(),
      poolContract.liquidity(),
      poolContract.slot0(),
    ]);
  
    return {
      tickSpacing,
      fee,
      liquidity,
      sqrtPriceX96: slot0[0],
      tick: slot0[1],
    };
  }
  
  async function main() {
    const [owner, signer2] = await ethers.getSigners();
    const provider = waffle.provider;
  
    const YasuoContract = new Contract(
      ysAddress,
      artifacts.Yasuo.abi,
      provider
    );
  
    const VeigarContract = new Contract(
      veiAddress,
      artifacts.Veigar.abi,
      provider
    );
  
    await YasuoContract.connect(signer2).approve(
      nonfungiblePositionManagerAddress,
      ethers.utils.parseEther("1000")
    );
  
    await VeigarContract.connect(signer2).approve(
      nonfungiblePositionManagerAddress,
      ethers.utils.parseEther("1000")
    );
  
    const poolContract = new Contract(
      devPool,
      artifacts.UniswapV3Pool.abi,
      provider
    );
  
    const poolData = await getPoolData(poolContract);
  
    const YasuoToken = new Token(31337, ysAddress, 18, "Yasuo", "YAS");
    const VeigarToken = new Token(31337, veiAddress, 18, "Veigar", "VEI");
  
    const pool = new Pool(
      YasuoToken,
      VeigarToken,
      poolData.fee,
      poolData.sqrtPriceX96.toString(),
      poolData.liquidity.toString(),
      poolData.tick
    );
  
    const position = new Position({
      pool,
      liquidity: ethers.utils.parseEther("1"),
      tickLower:
        nearestUsableTick(poolData.tick, poolData.tickSpacing) -
        poolData.tickSpacing * 2,
      tickUpper:
        nearestUsableTick(poolData.tick, poolData.tickSpacing) +
        poolData.tickSpacing * 2,
    });
  
    const { amount0: amount0Desired, amount1: amount1Desired } =
      position.mintAmounts;
  
    params = {
      token0: ysAddress,
      token1: veiAddress,
      fee: poolData.fee,
      tickLower:
        nearestUsableTick(poolData.tick, poolData.tickSpacing) -
        poolData.tickSpacing * 2,
      tickUpper:
        nearestUsableTick(poolData.tick, poolData.tickSpacing) +
        poolData.tickSpacing * 2,
      amount0Desired: amount0Desired.toString(),
      amount1Desired: amount1Desired.toString(),
      amount0Min: 0,
      amount1Min: 0,
      recipient: signer2.address,
      deadline: Math.floor(Date.now() / 1000) + 60 * 10,
    };
  
    const nonfungiblePositionmanager = new Contract(
      nonfungiblePositionManagerAddress,
      artifacts.NonfungiblePositionManager.abi,
      provider
    );
  
    const tx = await nonfungiblePositionmanager.connect(signer2).mint(params, {
      gasLimit: "1000000",
    });
  
    const receipt = await tx.wait();
    console.log("receipt: ", receipt);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.log("error", error);
      process.exit(1);
    });

    //npx hardhat run --network localhost scripts/addLidiquity.js