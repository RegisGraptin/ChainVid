// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import {SharedOwnership} from "./SharedOwnership.sol";
import {Video} from "./Video.sol";

contract Manager {

    Video video;

    // User access to the video
    // FIXME: Maybe use NFT instead allowing future resell of access token
    // FIXME: Could be interesting to add a royalties mechansm
    mapping(uint256 => mapping (address => bool)) public access;

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
        
        uint256 videoId = video.addNewVideo(address(sharedOwner), videoURI);

        // Give access to the video for all owners
        for (uint256 i = 0; i < owners.length; i++) {
            access[videoId][owners[i]] = true;
        }
    }

}