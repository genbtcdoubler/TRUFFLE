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
      gas: 21000,                    // standard ETH transfer
      gasPrice: 1000000000           // 1 gwei (small but usually safe)
      // gasPrice: 100000000          // 0.1 gwei (super small, may get stuck)
    }
  },

  compilers: {
    solc: {
      version: "0.8.20"
    }
  }
};
