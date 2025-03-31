# Dapp Exchange Digital Assets

The project is built on technologies related to processing tasks on blockchain such as Hardhat, Nodejs.
The interface is built according to Nextjs structure.
Combined with some external support tools like Metamask that acts as EVM on testnet and mainnet.


````Command
Flowing these steps:
npx hardhat test
Run test cases on virtual environment
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost

npx hardhat run scripts/uniswapContract.js --network localhost
npx hardhat run scripts/deployToken.js --network localhost
npx hardhat run scripts/deployPool.js --network localhost
````
