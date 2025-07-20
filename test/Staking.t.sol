// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Staking.sol";
import "../src/LstETH.sol";

contract StakingTest is Test {
    Staking staking;
    LstETH lstETH;
    address user = address(0x123);

    function setUp() public {
        lstETH = new LstETH();
        lstETH.transferOwnership(address(this));
        staking = new Staking(address(lstETH));
        lstETH.setMinter(address(staking));
    }

    function testDepositETHMintsLstETH() public {
        vm.deal(user, 10 ether);
        vm.prank(user);
        staking.deposit{value: 2 ether}();
        assertEq(lstETH.balanceOf(user), 2 ether);
        assertEq(address(staking).balance, 2 ether);
    }

    function testWithdrawBurnsLstETHAndSendsETH() public {
        vm.deal(user, 10 ether);
        vm.prank(user);
        staking.deposit{value: 3 ether}();
        uint256 userBalanceBefore = user.balance;
        vm.prank(user);
        staking.withdraw(2 ether);
        assertEq(lstETH.balanceOf(user), 1 ether);
        assertEq(address(staking).balance, 1 ether);
        assertEq(user.balance, userBalanceBefore + 2 ether);
    }

    function testDepositZeroReverts() public {
        vm.expectRevert("Zero amount");
        staking.deposit{value: 0}();
    }

    function testWithdrawZeroReverts() public {
        vm.expectRevert("Zero amount");
        staking.withdraw(0);
    }

    function testTransferLstETHAndWithdraw() public {
        address user2 = address(0x456);
        vm.deal(user, 5 ether);
        vm.prank(user);
        staking.deposit{value: 5 ether}();
        vm.prank(user);
        lstETH.transfer(user2, 2 ether);
        vm.prank(user2);
        staking.withdraw(2 ether);
        assertEq(user2.balance, 2 ether);
        assertEq(lstETH.balanceOf(user2), 0);
    }
} 