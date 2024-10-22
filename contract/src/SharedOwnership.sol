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
    ) ERC20("Gold", "GLD") {
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

//     /**
//      * @dev Distribute revenue to all owners based on their ownership percentages.
//      * @param tokenId The ID of the token whose revenue will be distributed.
//      * @param totalRevenue The total revenue generated by the asset (e.g., video).
//      */
//     function distributeRevenue(uint256 tokenId, uint256 totalRevenue) public onlyOwner {
//         OwnershipShare[] memory shares = ownershipShares[tokenId];
//         require(shares.length > 0, "No ownership data for this token");

//         for (uint256 i = 0; i < shares.length; i++) {
//             uint256 ownerShare = (totalRevenue * shares[i].percentage) / 100;
//             payable(shares[i].owner).transfer(ownerShare);
//         }

//         emit RevenueDistributed(tokenId, totalRevenue, block.timestamp);
//     }

//     /**
//      * @dev Get the ownership shares for a given token ID.
//      * @param tokenId The ID of the token.
//      * @return owners Array of owner addresses.
//      * @return percentages Array of ownership percentages.
//      */
//     function getOwnershipShares(uint256 tokenId)
//         public
//         view
//         returns (address[] memory owners, uint256[] memory percentages)
//     {
//         OwnershipShare[] memory shares = ownershipShares[tokenId];
//         owners = new address[](shares.length);
//         percentages = new uint256[](shares.length);

//         for (uint256 i = 0; i < shares.length; i++) {
//             owners[i] = shares[i].owner;
//             percentages[i] = shares[i].percentage;
//         }

//         return (owners, percentages);
//     }
// }