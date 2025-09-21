const FlashLoanSimple = artifacts.require("FlashLoanSimple");

module.exports = async function (callback) {
  try {
    const network = (module.exports && module.exports.network) || "development";
    console.log("Running flashloan script on network:", network);

    const accounts = await web3.eth.getAccounts();
    const deployer = accounts[0];
    console.log("Deployer:", deployer);

    // Load deployed contract (already deployed by migration)
    const flashLoan = await FlashLoanSimple.deployed();
    console.log("FlashLoanSimple at:", flashLoan.address);

    // Environment variables
    const asset =
      process.env.ASSET || "0x4200000000000000000000000000000000000006"; // Example: WETH on Base
    const amount = process.env.AMOUNT || "1000000000000000000"; // 1 token (if 18 decimals)

    if (!asset) {
      throw new Error("Please set ASSET env var");
    }

    console.log(`Requesting flash loan: asset=${asset}, amount=${amount} wei`);

    // Send tx to request a flash loan
    const tx = await flashLoan.requestFlashLoan(asset, amount, { from: deployer });

    console.log("Flash loan tx hash:", tx.tx);
    console.log("Done.");
    callback();
  } catch (err) {
    console.error("Error in flashloan script:", err);
    callback(err);
  }
};
