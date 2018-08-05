var Loo = artifacts.require('./Loo.sol')
var assert = require('assert')
var expectThrow = require('./helper.js');

contract('Loo', async ()=> {
    //should not accept ETH
    it("should not accept ETH", async () => {
        let inst = await Loo.deployed();
        let contract = inst;

        await assert.throws(
            () => {
                web3.eth.sendTransaction(
                    {to: contract.address, 
                    from: web3.eth.accounts[0], 
                    value: web3.toWei("0.5", "ether")}
                )
            },
            Error,
            "Error: VM Exception while processing transaction: revert"    
        )
    })

    //should not accept ERC 721 Token
})



