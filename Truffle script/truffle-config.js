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
      gas: 21000,
      gasPrice: 21000
    }
  },

  compilers: {
    solc: {
      version: "0.8.20"
    }
  }
};
