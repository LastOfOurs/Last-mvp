pragma solidity^0.4.18;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import './Egg.sol';

contract EggFactory is Ownable {
    // variables
    string[] private contractNames;
    mapping (string => address) private contractAddresses;

    // event
    event EggDeployed(string eggName, address at, uint256 timestamp);

    // getter
    function getEggs() external view returns (bytes32[] memory namesInByte) {
        namesInByte = new bytes32[](contractNames.length);
        for (uint256 i = 0; i < contractNames.length; i++) {
            namesInByte[i] = stringToBytes32(contractNames[i]);
        }
        return namesInByte;
    }

    function getEggAddress(string eggName) public view returns (address) {
        return contractAddresses[eggName];
    }

    // functions
    function stringToBytes32(string memory source) pure internal returns (bytes32 result) {
        if (bytes(source).length == 0) return 0x0;

        assembly {
            result := mload(add(source, 32))
        }
    }

    function deployEgg(string name) public onlyOwner {
        require(contractAddresses[name] == 0);

        address contractAddress = address(new Egg(name));

        contractAddresses[name] = contractAddress;
        contractNames.push(name);

        emit EggDeployed(name, contractAddress, block.timestamp);
    }
}
