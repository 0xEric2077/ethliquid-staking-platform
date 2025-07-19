// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/LstETH.sol";
import "../src/Staking.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        // 部署 LstETH
        LstETH lstETH = new LstETH();
        // 部署 Staking
        Staking staking = new Staking(address(lstETH));
        // 设置 Staking 为 LstETH 的 minter
        lstETH.setMinter(address(staking));

        vm.stopBroadcast();
    }
}
