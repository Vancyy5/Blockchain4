require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    // Lokalus development tinklas (Ganache)
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      gas: 6000000,
      gasPrice: 20000000000
    },

    // Sepolia testas tinklas
    sepolia: {
      provider: () => new HDWalletProvider(
   [process.env.LANDLORD_PRIVATE_KEY, process.env.TENANT_PRIVATE_KEY, process.env.ARBITER_PRIVATE_KEY],
  `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`
)
,
      network_id: 11155111,
      gas: 5500000,
      gasPrice: 10000000000,
      confirmations: 2,
      timeoutBlocks: 300,
      skipDryRun: true,
      networkCheckTimeout: 100000
    }
  },

  compilers: {
    solc: {
      version: "0.8.20",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  },

  plugins: ['truffle-plugin-verify'],

  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  }
};
