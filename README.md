# Dapp Exchange Digital Assets

The project is built on technologies related to processing tasks on blockchain such as Hardhat, Nodejs.
The interface is built according to Nextjs structure.
Combined with some external support tools like Metamask that acts as EVM on testnet and mainnet.


````Command
npx hardhat test
Chạy các file test trên môi trường ảo EVM
npx hardhat node
Chạy localhost8545, xuất ra các địa chỉ account và các privatekey. Sau đó thêm mạng mới, nhập privatekey trên ví metamask để có thể kích hoạt tài khoản.
npx hardhat run scripts/deploy.js --network localhost
chạy file này sẽ xuất ra các địa chỉ riêng biệt thế vào các biến constants.js( nằm trong folder Context)
npx hardhat run scripts/uniswapContract.js --network localhost
npx hardhat run scripts/deployToken.js --network localhost
npx hardhat run scripts/deployPool.js --network localhost
```Enviroment, network
https://docs.uniswap.org/contracts/v3/reference/deployments
```Alchemy```
https://eth-mainnet.g.alchemy.com/v2/md8hRFeBCofBkPfYtxmsx8oDVj9HBAI- //thay đổi

```Etherscan.io APi```
const ETHERSCAN_API_KEY = '78XPZZJHAEYDTT8W7M676UKPYNA2GDY56Q'  //thay đổi
````
