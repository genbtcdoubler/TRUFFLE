module.exports = async function (callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0]; // HDWalletProvider will unlock this using PRIVATE_KEY

    const contractAddress = process.env.CONTRACT || "0x4200000000000000000000000000000000000006";

    console.log(`Calling deposit() on ${contractAddress} with 0.001 ETH`);

    const tx = await web3.eth.sendTransaction({
      from: sender,
      to: contractAddress,
      value: web3.utils.toWei("0.001", "ether"),
      data: web3.eth.abi.encodeFunctionSignature("deposit()")
    });

    console.log("Tx hash:", tx.transactionHash);
    callback();
  } catch (err) {
    console.error("Error:", err);
    callback(err);
  }
};
