// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//import "@openzeppelin/contracts/token/ERC721/ERC721Mintable.sol";
//import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


//contract BLContract is ERC721, ERC721URIStorage {
contract BL721Contract is ERC721 {
    constructor() ERC721("XRCBL", "BL10001") {}

    function _baseURI() internal pure override returns (string memory) {
        string memory retContent = "./tradedocuments-carrier-original/BLdoc10001.json";
        return(retContent);
        //return "./tradedocuments-carrier-original/BLdoc10001.json";
    }

/*
    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    */
}