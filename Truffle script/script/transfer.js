const IERC20 = artifacts.require("IERC20"); // you need OpenZeppelin IERC20 in /contracts

module.exports = async function (callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0]; // unlocked by HDWalletProvider

    // Token contract (the one you are calling transfer on)
    const tokenAddress = process.env.TOKEN || "0x4200000000000000000000000000000000000006";
    const token = await IERC20.at(tokenAddress);

    // Recipient and amount
    const recipient = process.env.RECIPIENT || "YOUR_CONTRACT_ADDRESS";
    const amount = process.env.AMOUNT || "1000000000000000";

    console.log(`Transferring ${amount} tokens from ${sender} to ${recipient} using token ${tokenAddress}`);

    const tx = await token.transfer(recipient, amount, { from: sender });

    console.log("Tx hash:", tx.tx);
    callback();
  } catch (err) {
    console.error("Error in transfer:", err);
    callback(err);
  }
};
