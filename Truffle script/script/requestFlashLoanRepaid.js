const FlashLoanSimple = artifacts.require("FlashLoanSimple");

module.exports = async function (callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0]; // HDWalletProvider uses your PRIVATE_KEY

    // Contract already deployed
    const contractAddress = process.env.CONTRACT || "0xYourContractAddressHere";
    const flashLoan = await FlashLoanSimple.at(contractAddress);

    // Arguments
    const asset = process.env.ASSET || "0x4200000000000000000000000000000000000006";
    const amount = process.env.AMOUNT || "1000000000000000000";
    const receiver = process.env.RECEIVER || "0xReceiverAddressHere";

    console.log(
      `Calling requestFlashLoanRepaid(${asset}, ${amount}, ${receiver}) on ${contractAddress}`
    );

    const tx = await flashLoan.requestFlashLoanRepaid(asset, amount, receiver, { from: sender });

    console.log("Tx hash:", tx.tx);
    callback();
  } catch (err) {
    console.error("Error in script:", err);
    callback(err);
  }
};
