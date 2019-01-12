pragma solidity ^0.4.17;

//barebone implementation of a proxy contract 
//TODO: add openzeppelin's whitelist lib
contract IdentityProxy {
    event Forwarded (address indexed destination, uint value, bytes data);
    event Received (address indexed sender, uint value);

    function () payable { Received(msg.sender, msg.value); }

    function forward(address destination, uint value, bytes data) public {
        require(executeCall(destination, value, data));
        Forwarded(destination, value, data);
    }

    // utilizing GnosisSafe's function
    // https://github.com/gnosis/gnosis-safe-contracts/blob/master/contracts/GnosisSafe.sol
    function executeCall(address to, uint256 value, bytes data) internal returns (bool success) {
        assembly {
            success := call(gas, to, value, add(data, 0x20), mload(data), 0, 0)
        }
    }
}