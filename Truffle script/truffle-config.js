const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

module.exports = {
  networks: {

    // Base Mainnet
    base: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY,
          "https://mainnet.base.org" // official RPC for Base mainnet
        ),
      network_id: 8453,
      gas: 5000000,
      gasPrice: 21000000
    }
  },

  compilers: {
    solc: {
      version: "0.8.20"
    }
  }
};