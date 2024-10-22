// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Video is ERC721URIStorage {
    
    uint256 public _nextTokenId;

    address manager;

    modifier onlyManager() {
        require(msg.sender == manager, "NOT_MANAGER");
        _;
    }

    constructor(address _manager) ERC721("Video", "VDO") {
        manager = _manager;
    }

    function addNewVideo(address owner, string memory videoURI) 
        onlyManager
        public 
        returns (uint256) 
    {
        uint256 tokenId = _nextTokenId++;
        _mint(owner, tokenId);
        _setTokenURI(tokenId, videoURI);
        return tokenId;
    }
}