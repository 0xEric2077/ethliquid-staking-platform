// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./LstETH.sol";
import "./interfaces/ILstETH.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Staking is ReentrancyGuard {
    ILstETH public lstETH;
    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);

    constructor(address _lstETH) {
        lstETH = ILstETH(_lstETH);
    }

    // User deposits ETH and mints equivalent lstETH
    function deposit() external payable nonReentrant {
        require(msg.value > 0, "Zero amount");
        lstETH.mint(msg.sender, msg.value);
        emit Deposit(msg.sender, msg.value);
    }

    // User burns lstETH and redeems equivalent ETH
    function withdraw(uint256 amount) external nonReentrant {
        require(amount > 0, "Zero amount");
        lstETH.burn(msg.sender, amount);
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "ETH transfer failed");
        emit Withdraw(msg.sender, amount);
    }

    // Query total staked ETH in the contract
    function totalStaked() external view returns (uint256) {
        return address(this).balance;
    }
}
