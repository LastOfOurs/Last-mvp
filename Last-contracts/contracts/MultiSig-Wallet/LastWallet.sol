pragma solidity ^0.4.15;
import './MultiSigWallet.sol';

contract LastWallet is MultiSigWallet {

	event ConfirmBuyEggs(address indexed sender, uint value);

	/*
     * Public functions
     */
    /// @dev Contract constructor sets initial owners, required number of confirmations.
    /// @param _owners List of initial owners.
    /// @param _required Number of required confirmations.
    function LastWallet(address[] _owners, uint _required)
        public
        MultiSigWallet(_owners, _required)
    {
        
    }


    function buyEggs() public payable {
    	require( 0 < msg.value);

    	emit ConfirmBuyEggs(msg.sender,msg.value);
    }
}