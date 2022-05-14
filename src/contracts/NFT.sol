// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract NFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  address contractAddress;

  constructor(address marketplaceAddress) ERC721('Metaverse', 'METT') {
    contractAddress = marketplaceAddress;
  }

  function createToken(string memory tokenURI) public returns (uint256) {
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current(); // 产生一个新的ID

    _mint(msg.sender, newItemId); // 把 ID 赋值给调用者【铸造】
    _setTokenURI(newItemId, tokenURI); // 设置tokenURI
    setApprovalForAll(contractAddress, true); // 公开
    return newItemId;
  }
}
