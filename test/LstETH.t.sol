// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/LstETH.sol";

contract LstETHTest is Test {
    LstETH lstETH;
    address minter = address(0x123);
    address user = address(0x456);

    function setUp() public {
        lstETH = new LstETH();
        lstETH.transferOwnership(address(this));
        lstETH.setMinter(minter);
    }

    function testOnlyMinterCanMint() public {
        vm.prank(minter);
        lstETH.mint(user, 1 ether);
        assertEq(lstETH.balanceOf(user), 1 ether);
        assertEq(lstETH.totalSupply(), 1 ether);
    }

    function testNonMinterCannotMint() public {
        vm.expectRevert("Only minter");
        lstETH.mint(user, 1 ether);
    }

    function testOnlyMinterCanBurn() public {
        vm.prank(minter);
        lstETH.mint(user, 2 ether);
        vm.prank(minter);
        lstETH.burn(user, 1 ether);
        assertEq(lstETH.balanceOf(user), 1 ether);
        assertEq(lstETH.totalSupply(), 1 ether);
    }

    function testNonMinterCannotBurn() public {
        vm.prank(minter);
        lstETH.mint(user, 1 ether);
        vm.expectRevert("Only minter");
        lstETH.burn(user, 1 ether);
    }

    function testTransfer() public {
        vm.prank(minter);
        lstETH.mint(address(this), 1 ether);
        lstETH.transfer(user, 0.5 ether);
        assertEq(lstETH.balanceOf(user), 0.5 ether);
        assertEq(lstETH.balanceOf(address(this)), 0.5 ether);
    }
} 