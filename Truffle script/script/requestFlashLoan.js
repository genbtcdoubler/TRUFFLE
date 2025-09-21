const FlashLoanSimple = artifacts.require("FlashLoanSimple");

module.exports = async function (callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0]; // unlocked by HDWalletProvider

    // Use your deployed contract address
    const contractAddress = process.env.CONTRACT || "YOUR_CONTRACT_ADDRESS";
    const flashLoan = await FlashLoanSimple.at(contractAddress);

    // Args
    const asset = process.env.ASSET || "0x4200000000000000000000000000000000000006";
    const amount = process.env.AMOUNT || "1000000000000000000";

    console.log(`Calling requestFlashLoan(${asset}, ${amount}) on ${contractAddress}`);

    const tx = await flashLoan.requestFlashLoan(asset, amount, { from: sender });
    console.log("Tx hash:", tx.tx);

    callback();
  } catch (err) {
    console.error("Error:", err);
    callback(err);
  }
};
