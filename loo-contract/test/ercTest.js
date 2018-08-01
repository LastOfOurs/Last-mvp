const Loo = artifacts.require('Loo')
var assert = require('assert')

contract('Loo', async ()=> {
    //"should mint to a specified token address"
    it("should mint to a specified wallet address", async ()=> {
        let user1 = web3.eth.accounts[0];
                
        let inst = await Loo.deployed();
        let contract = inst; 
        let tokenUri = "http://data.lastofours.io/1"

        await contract.mint(user1, 1, tokenUri)
        owner = await contract.ownerOf.call(1)
        assert.equal(owner, user1)
    })
    //"should have a stored IPFS hash"

    //"should only allow contract owner to call mint function"

    //"should let a user to transfer tokens"

    //"should only allow a user of token to transfer certain token"

    //"should not allow a duplicated token ID to be minted"

    //"should allow other user to transfer with allow/approval"

})