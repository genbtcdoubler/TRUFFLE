const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

module.exports = {
  networks: {
    // Base Mainnet
    base: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY,
          "https://mainnet.base.org"
        ),
      network_id: 8453,
      gas: 21000,                   
      gasPrice: 500000000          
    }
  },

  compilers: {
    solc: {
      version: "0.8.20"
    }
  }
};
