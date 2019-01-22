pragma solidity^0.4.18;
import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract Egg is MintableToken {
    string public constant symbol = "EGG";
    uint8 public constant decimals = 0;

    string public name;

    constructor (string _name) public {
        name = _name;
    }

    event Hatching(address recipient, uint256 timestamp, uint256 amount);

    /**
   * @dev Function to hatch eggs (sends eggs to zero address)
   * @return A boolean that indicates if the operation was successful.
   */
    function hatch() public returns (bool) {
        return hatch(1);
    }

    function hatch(uint256 amount) public returns (bool) {
        require(amount <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender].sub(amount);
        emit Hatching(msg.sender, block.timestamp, amount);
        return true;
    }
}
