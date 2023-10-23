const UniswapV3Pool = require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json");
const { Contract } = require("ethers");
const { Pool } = require("@uniswap/v3-sdk");
const { Token } = require("@uniswap/sdk-core");

const devPool = '0x8b00d2D470c3ef10d42D408d952bd8C03034014d'

async function getPoolData(poolContract) {
    const [
      tickSpacing,
      fee,
      liquidity,
      slot0,
      factory,
      token0,
      token1,
      maxLiquidityPerTick,
    ] = await Promise.all([
      poolContract.tickSpacing(),
      poolContract.fee(),
      poolContract.liquidity(),
      poolContract.slot0(),
      poolContract.factory(),
      poolContract.token0(),
      poolContract.token1(),
      poolContract.maxLiquidityPerTick(),
    ]);
  
    const TokenA = new Token(3, token0, 18, "PINNU", "Parvesh");
    const TokenB = new Token(3, token1, 18, "PHLA", "Payal");
  
    const poolExample = new Pool(
      TokenA,
      TokenB,
      fee,
      slot0[0].toString(),
      liquidity.toString(),
      slot0[1]
    );
  
    return {
      factory,
      token0,
      token1,
      maxLiquidityPerTick,
      tickSpacing,
      fee,
      liquidity: liquidity.toString(),
      sqrtPriceX96: slot0[0],
      tick: slot0[1],
      observationIndex: slot0[2],
      observationCardinality: slot0[3],
      observationCardinalitynext: slot0[4],
      feeProtocol: slot0[5],
      unlocked: slot0[6],
      poolExample,
    };
  }
  
  async function main() {
    const provider = waffle.provider;
    const poolContract = new Contract(devPool, UniswapV3Pool.abi, provider);
    const poolData = await getPoolData(poolContract);
    console.log("poolData", poolData);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.log("error", error);
      process.exit(1);
    });
  
