const FlashLoanSimple = artifacts.require("FlashLoanSimple");

module.exports = async function (deployer, network, accounts) {
  const addressesProvider = process.env.ADDRESSES_PROVIDER;
  if (!addressesProvider) {
    throw new Error("Please set ADDRESSES_PROVIDER env var");
  }

  await deployer.deploy(FlashLoanSimple, addressesProvider);
  const flashLoan = await FlashLoanSimple.deployed();

  console.log("FlashLoanSimple deployed at:", flashLoan.address);
};
