// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: {
//     compilers: [
//       {
//         version: "0.7.6",
//         settings: {
//           evmVersion: "istanbul",
//           optimizer: {
//             enabled: true,
//             runs: 1000,
//           },
//         },
//       },
//     ],
//   },
//   networks:{
//     hardhat:{
//       forking:{
//         url: "https://eth-mainnet.g.alchemy.com/v2/md8hRFeBCofBkPfYtxmsx8oDVj9HBAI-"
//       },
//     }
//   }
// };

require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 5000,
            details: {yul: false}
          },
        },
      },
    ],
  },
  networks:{
    hardhat:{
      forking:{
        url: "https://eth-mainnet.g.alchemy.com/v2/md8hRFeBCofBkPfYtxmsx8oDVj9HBAI-",
        account: [
          `0x${"ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"}`
        ]
      },
    }
  }
};
