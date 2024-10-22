// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import {SharedOwnership} from "./SharedOwnership.sol";
import {Video} from "./Video.sol";

contract Manager {

    Video video;

    constructor() {
        video = new Video(address(this));
    }

    function addNewVideo(
        address[] memory owners,
        uint256[] memory allocation,
        string memory videoURI
    ) public 
    {

        SharedOwnership sharedOwner = new SharedOwnership(owners, allocation);
        
        video.addNewVideo(address(sharedOwner), videoURI);
    }

}