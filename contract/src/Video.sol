// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


struct VideoMetadata {
    string name;
    string category;
    string description;
    string cid;
}

contract Video is ERC721URIStorage {
    
    uint256 public nextTokenId;

    address manager;

    mapping (uint256 => VideoMetadata) public videoMetadata;

    modifier onlyManager() {
        require(msg.sender == manager, "NOT_MANAGER");
        _;
    }

    constructor(address _manager) ERC721("Video", "VDO") {
        manager = _manager;
    }

    function addNewVideo(
        address owner, 
        string memory name,
        string memory category,
        string memory description,
        string memory videoURI
    ) 
        onlyManager
        public 
        returns (uint256) 
    {
        uint256 tokenId = nextTokenId++;
        _mint(owner, tokenId);
        _setTokenURI(tokenId, videoURI);

        videoMetadata[tokenId] = VideoMetadata({
            name: name, 
            category: category, 
            description: description,
            cid: videoURI
        });

        return tokenId;
    }

    function getMetadata(uint tokenId) public view returns (VideoMetadata memory){
        return videoMetadata[tokenId];
    }
}