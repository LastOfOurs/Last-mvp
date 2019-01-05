pragma solidity ^0.4.18;
import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract Egg is MintableToken {
    string public constant name = "Basic Last Egg";
    string public constant symbol = "EGG";
    uint8 public constant decimals = 0;

    event Hatching(address recipient, uint256 timestamp);

    /**
   * @dev Function to hatch eggs (sends eggs to zero address)
   * @return A boolean that indicates if the operation was successful.
   */
    function hatch() public returns (bool){
        require(1 <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender].sub(1);
        emit Hatching(msg.sender, block.timestamp);
        return true;
    }
}