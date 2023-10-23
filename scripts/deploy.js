
const hre = require("hardhat");

async function main() {
  //ERC20 SUN Token
  const SunToken = await hre.ethers.getContractFactory("SunToken");
  const sunToken = await SunToken.deploy();
  await sunToken.deployed();
  console.log(
    `SUN deployed to ${sunToken.address}`
  );
  //ERC20 MOON Token
  const MoonToken = await hre.ethers.getContractFactory("MoonToken");
  const moonToken = await MoonToken.deploy();
  await moonToken.deployed();
  console.log(
    `MOON deployed to ${moonToken.address}`
  );
  //soloSwapToken
  const SoloSwapToken = await hre.ethers.getContractFactory("SoloSwapToken");
  const soloSwapToken = await SoloSwapToken.deploy();
  await soloSwapToken.deployed();
  console.log(
    `SoloSwapToken deployed to ${soloSwapToken.address}`
  );
  //Mixed Swap Token
  // const MixedSwapToken = await hre.ethers.getContractFactory("MixedSwapToken");
  // const mixedSwapToken = await MixedSwapToken.deploy();
  // await mixedSwapToken.deployed();
  // console.log(
  //   `MixedSwapToken deployed to ${mixedSwapToken.address}`
  // );
  //USE DATA
  const StorageUserData = await hre.ethers.getContractFactory("UserDataStorage");
  const storageUserData = await StorageUserData.deploy();

  await storageUserData.deployed();
  console.log(`UserStorageDataAddress = '${storageUserData.address}'`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
