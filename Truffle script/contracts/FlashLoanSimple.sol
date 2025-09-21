// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IPoolAddressesProvider} from "aave-v3-core/contracts/interfaces/IPoolAddressesProvider.sol";
import {IPool} from "aave-v3-core/contracts/interfaces/IPool.sol";
import {IFlashLoanSimpleReceiver} from "aave-v3-core/contracts/flashloan/interfaces/IFlashLoanSimpleReceiver.sol";
import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract FlashLoanSimple is IFlashLoanSimpleReceiver {
    address payable public owner;
    IPoolAddressesProvider public immutable AAVE_POOL_ADDRESSES_PROVIDER;
    IPool public immutable POOL;

    // Events
    event FlashLoanRequested(address asset, uint256 amount);
    event FlashLoanExecuted(address asset, uint256 amount, uint256 premium);
    event FlashLoanRepaid(address asset, uint256 amount, uint256 premium);
    event ContractBalance(uint256 balance);

    constructor(address _addressProvider) {
        AAVE_POOL_ADDRESSES_PROVIDER = IPoolAddressesProvider(_addressProvider);
        POOL = IPool(AAVE_POOL_ADDRESSES_PROVIDER.getPool());
        owner = payable(msg.sender);
    }

    receive() external payable {
        emit ContractBalance(address(this).balance);
    }

    /// @notice Request a simple flash loan
    function requestFlashLoan(address asset, uint256 amount) external {
        emit FlashLoanRequested(asset, amount);

        POOL.flashLoanSimple(
            address(this),
            asset,
            amount,
            bytes(""),
            0
        );
    }

    /// @notice Aave callback after flash loan
    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata
    ) external override returns (bool) {
        require(msg.sender == address(POOL), "Caller must be POOL");
        require(initiator == address(this), "Invalid initiator");

        emit FlashLoanExecuted(asset, amount, premium);

        // >>> your custom logic goes here <<<

        // Repay the loan
        uint256 amountToRepay = amount + premium;
        IERC20(asset).approve(address(POOL), amountToRepay);

        emit FlashLoanRepaid(asset, amount, premium);

        return true;
    }
}
