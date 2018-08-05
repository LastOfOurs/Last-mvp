var Loo = artifacts.require('./Loo.sol')
var assert = require('assert')
var expectThrow = require('./helper.js');

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

    //"should store correct tokenUri"
    it("should store correct tokenUri", async () => {
        let user1 = web3.eth.accounts[0];

        let inst = await Loo.deployed();
        let contract = inst;
        let tokenUri = "http://data.lastofours.io/2"

        await contract.mint(user1, 2, tokenUri)
        callUri = await contract.tokenURI.call(2)
        assert.equal(tokenUri, callUri)
    })

    //"should not allow minting without tokenURi"

    //"should only allow contract owner to call mint function"
    it("should only allow contract owner to call mint function", async () => {
        let user2 = web3.eth.accounts[1];
        let tx = {from: web3.eth.accounts[1]};

        let inst = await Loo.deployed();
        let contract = inst;
        let tokenUri = "http://data.lastofours.io/3"

        await expectThrow(contract.mint(user2, 3, tokenUri, tx))
    })

    //"should only let token owner transfer tokens"
    it("should only let token owner transfer tokens", async () => {
        let user1 = web3.eth.accounts[0];
        let user2 = web3.eth.accounts[1];
        let tx = {from: user2};

        let inst = await Loo.deployed();
        let contract = inst;
        let tokenUri = "http://data.lastofours.io/3"

        contract.mint(user2, 3, tokenUri)
        await expectThrow(contract.transferFrom(user1, user2, 3))
    })

    //"should not allow a duplicated token ID to be minted"
    it("should not allow duplicated token ID to be minted", async () => {
        let user1 = web3.eth.accounts[0];
        let inst = await Loo.deployed();
        let contract = inst;
        let tokenUri = "http://data.lastofours.io/3"

        //token id = 2 has been minted
        contract.mint(user1, 4, tokenUri)
        await expectThrow(contract.mint(user1, 4, tokenUri))
    })

    //"it should get all the token balances of an account"
    it("should get all the token balances of an account", async () => {
        let user3 = web3.eth.accounts[2];
        let inst = await Loo.deployed();
        let contract = inst;
        let tokenUri = "http://data.lastofours.io/3"

        await contract.mint(user3, 5, tokenUri)
        await contract.mint(user3, 6, tokenUri)
        balance = await contract.balanceOf(user3)
        assert.equal(balance.toNumber(), 2)
    })
    
    //should ouput token of owner by indexes
    it("should output tokens of owner by indexes", async () => {
        let user3 = web3.eth.accounts[2];
        let inst = await Loo.deployed();
        let contract = inst;
        let tokenUri = "http://data.lastofours.io/3"
        index0 = await contract.tokenOfOwnerByIndex(user3, 0)
        index1 = await contract.tokenOfOwnerByIndex(user3, 1)
        assert.equal(index0.toNumber(), 5)
        assert.equal(index1.toNumber(), 6)
    })

    //test approve and safeTransferFrom

    //test approveForAll and getApproveForAll

    //test approveForAll and safeTransferFrom
})