// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SharedOwnership is ERC20 {

    address[] public owners;
    mapping (address => bool) isOwner;

    constructor(
        address[] memory _owners, 
        uint256[] memory allocation
    ) ERC20("OWNERSHIP", "OWS") {
        owners = _owners;
        for (uint256 i = 0; i < owners.length; i++) {
            _mint(owners[i], allocation[i]);
        }
    }

    function removeOwner(address previousOwner) internal {
        for (uint256 i = 0; i < owners.length; i++) {
            if (previousOwner == owners[i]) {
                owners[i] = owners[owners.length - 1];
                owners.pop();
                return;
            }
        }
    }

    function _update(address from, address to, uint256 value) internal override {
        super._update(from, to, value);

        // Check if 'from' is still an owner 
        if (balanceOf(from) == 0) {
            removeOwner(from);
        }

        // Check if 'to' is already an owner
        if (!isOwner[to]) {
            isOwner[to] = true;
            owners.push(to);
        }

    }


    // function distributeRevenue() {

    // }
    
}
