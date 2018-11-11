pragma solidity ^0.4.18;
import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract Egg is MintableToken {
    string public constant name = "Basic LAST Egg";
    string public constant symbol = "EGG";
    uint8 public constant decimals = 0;

    event Hatching(address recipient, uint256 amount, uint256 timestamp);

    /**
   * @dev Function to hatch eggs (sends eggs to zero address)
   * @param amount amount of eggs to hatch
   * @return A boolean that indicates if the operation was successful.
   */
    function hatch(uint256 amount) public returns (bool){
        require(amount <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender].sub(amount);
        emit Hatching(msg.sender, amount, block.timestamp);
        return true;
    }
}