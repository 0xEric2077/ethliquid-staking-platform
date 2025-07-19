// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ILstETH.sol";

contract LstETH is ERC20, Ownable, ILstETH {
    address public minter;

    constructor() ERC20("Liquid Staked ETH", "lstETH") Ownable(msg.sender) {}

    function setMinter(address _minter) external onlyOwner {
        minter = _minter;
    }

    function mint(address to, uint256 amount) external override {
        require(msg.sender == minter, "Only minter");
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external override {
        require(msg.sender == minter, "Only minter");
        _burn(from, amount);
    }
}
