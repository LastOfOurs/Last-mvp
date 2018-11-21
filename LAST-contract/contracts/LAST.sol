pragma solidity^0.4.17;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';

contract LAST is Ownable, ERC721Token {

  function LAST(string _name, string _symbol) ERC721Token(_name, _symbol) public {
  
  }

  function mint(address toAddress, uint256 tokenId, string uri) public onlyOwner {
      _mint(toAddress, tokenId);
       _setTokenURI(tokenId, uri);
  }

}