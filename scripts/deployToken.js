// npx hardhat run scripts/deployToken.js --network localhost
async function main() {
    const [owner] = await ethers.getSigners();
  
    const Yasuo = await ethers.getContractFactory("Yasuo");
    const yasuo = await Yasuo.deploy();
  
    const Veigar = await ethers.getContractFactory("Veigar");
    const veigar = await Veigar.deploy();
  
    const Poppy = await ethers.getContractFactory("Poppy");
    const poppy = await Poppy.deploy();

    // await yasuo
    //     .connect(owner)
    //     .mint(signer2.address, ethers.utils.parseEther('100000'))
    // await veigar
    //     .connect(owner)
    //     .mint(signer2.address, ethers.utils.parseEther('100000'))
    // await poppy
    //     .connect(owner)
    //     .mint(signer2.address, ethers.utils.parseEther('100000'))
  
    // console.log("Yasuo = ", yasuo.address);
    // console.log("Veigar = ", veigar.address);
    // console.log("Poppy = ", poppy.address);
    console.log('ysAddress = ', `'${yasuo.address}'`)
    console.log('veiAddress = ', `'${veigar.address}'`)
    console.log('popAddress = ', `'${poppy.address}'`)
  }
  
  /**
   
  
   **/
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.log("error", error);
      process.exit(1);
    });