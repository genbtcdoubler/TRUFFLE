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
      network_id: 8453,        // Base mainnet chain ID
      gas: 21000,              // fixed gas limit
      gasPrice: 2000000000     // 2 gwei (small fee) in wei
      // increase if txs stuck: 2 gwei = 2000000000
    }
  }
};
