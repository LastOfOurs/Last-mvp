pragma solidity ^0.4.18;
import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract Egg is MintableToken {
    string public constant name = "Basic LAST Egg";
    string public constant symbol = "EGG";
    uint8 public constant decimals = 0;
}