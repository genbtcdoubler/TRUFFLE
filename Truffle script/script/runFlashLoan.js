const FlashLoanSimple = artifacts.require("FlashLoanSimple");

module.exports = async function (callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const deployer = accounts[0];
    console.log("Deployer:", deployer);

    // Load deployed contract
    const flashLoan = await FlashLoanSimple.deployed();
    console.log("FlashLoanSimple at:", flashLoan.address);

    // Example asset: WETH on Base (change depending on network)
    const WETH = "0x4200000000000000000000000000000000000006"; 
    const amount = web3.utils.toWei("1", "ether"); // 1 WETH

    // Request flash loan
    const tx = await flashLoan.requestFlashLoan(WETH, amount, { from: deployer });
    console.log("Flash loan tx:", tx.tx);

  } catch (err) {
    console.error(err);
  }
  callback();
};
