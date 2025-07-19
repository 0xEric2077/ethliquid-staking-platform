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
        console.log("LstETH deployed at:", address(lstETH));
        
        // 部署 Staking
        Staking staking = new Staking(address(lstETH));
        console.log("Staking deployed at:", address(staking));
        
        // 设置 Staking 为 LstETH 的 minter
        lstETH.setMinter(address(staking));
        console.log("Minter set to:", address(staking));

        vm.stopBroadcast();
        
        // 输出环境变量格式
        console.log("\n=== Environment Variables ===");
        console.log("NEXT_PUBLIC_LSTETH_ADDRESS_LOCALHOST=", address(lstETH));
        console.log("NEXT_PUBLIC_STAKING_ADDRESS_LOCALHOST=", address(staking));
    }
}
