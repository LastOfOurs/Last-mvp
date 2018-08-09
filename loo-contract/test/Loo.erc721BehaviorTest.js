var Loo = artifacts.require('./Loo.sol')
var assert = require('assert')
var expectThrow = require('./helper.js');

contract('Loo', async ()=> {
    //"should have the correct Contract name and symbol"
    it("should have the correct Contract name and symbol", async () => {
        let correctSymbol = "LTK";
        let correctName = "Last";
        let inst = await Loo.deployed();
        let contract = inst; 
        callSymbol = await contract.symbol.call()
        callName = await contract.name.call()
        assert.equal(callSymbol, correctSymbol)
        assert.equal(callName, correctName)

    })

    //"Should check to make sure that the owner of the contract is the msg.sender"
    it("should check to make sure that the owner of the contract is the msg.sender", async () => {
        let owner = web3.eth.accounts[0];
        let inst = await Loo.deployed();
        let contract = inst; 
        
        callOwner = await contract.owner.call()
        assert.equal(callOwner, owner)
    })

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

    //"should check of token exists"
    it("should check of token exists", async () => {
        let inst = await Loo.deployed();
        let contract = inst; 

        existedToken = await contract.exists.call(1)
        nonExistedToken = await contract.exists.call(2)

        assert.equal(true, existedToken)
        assert.equal(false, nonExistedToken)
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
    it("should not allow minting without tokenURi", async () => {
        let user2 = web3.eth.accounts[1];
        let inst = await Loo.deployed();
        let contract = inst;

        await expectThrow(contract.mint(user2, 3 ))
    })

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

    //should approve a user to spend fund 
    it("should approve a user to spend fund", async () => {
        let user1 = web3.eth.accounts[0]
        let user2 = web3.eth.accounts[1]
        let inst = await Loo.deployed();
        let contract = inst;
        let tokenUri = "http://data.lastofours.io/3"

        await contract.mint(user1, 7, tokenUri)
        await contract.approve(user2, 7)
        approvedUser = await contract.getApproved.call(7)
        assert.equal(user2, approvedUser)
    })

    //should let approved user spend funds
    it("should allow approved user to transfer funds", async () => {
        let user1 = web3.eth.accounts[0]
        let user2 = web3.eth.accounts[1]
        let inst = await Loo.deployed();
        let contract = inst;

        await contract.transferFrom(user1, user2, 7, {from: user2})
        tokenOwner = await contract.ownerOf.call(7)
        assert.equal(user2, tokenOwner)
    })

    //"should revoke user from spending funds"
    it("should revoke user from spending funds", async () => {
        let user1 = web3.eth.accounts[0]
        let user2 = web3.eth.accounts[1]
        let inst = await Loo.deployed();
        let contract = inst;
        let tokenUri = "http://data.lastofours.io/3"

        await contract.setApprovalForAll(user2, false)
        isApprovedForAll = await contract.isApprovedForAll(user1, user2)
        assert.equal(isApprovedForAll, false)
    })

    //"should approve an address to spend all your funds"
    it("should approve address to spend all your tokens", async () => {
        let user1 = web3.eth.accounts[0]
        let user3 = web3.eth.accounts[2]

        let inst = await Loo.deployed();
        let contract = inst;
        await contract.setApprovalForAll(user3, true)
        isApprovedForAll = await contract.isApprovedForAll(user1, user3)
        assert.equal(isApprovedForAll, true)
    })

    //should not let safeTransferFrom transfer to a non-nft accepting address
    it("should not let safeTransferFrom transfer to a non-nft accepting address", async () => {
        let user1 = web3.eth.accounts[0]
        let user2 = web3.eth.accounts[1]
        let inst = await Loo.deployed();
        let contract = inst;
        let tokenUri = "http://data.lastofours.io/3"
        let tx = {from: user2};

        await contract.mint(user1, 8, tokenUri)
        await contract.approve(user2, 8)
        await expectThrow(contract.safeTransferFrom(user1, "0x0", 8, tx))
    })

    //"should revoke user from spending all your funds"
    it("should revoke user from spending all your funds", async () => {
        let user1 = web3.eth.accounts[0]
        let user3 = web3.eth.accounts[2]

        let inst = await Loo.deployed();
        let contract = inst;
        await contract.setApprovalForAll(user3, false)
        isApprovedForAll = await contract.isApprovedForAll(user1, user3)
        assert.equal(isApprovedForAll, false)
    })


    //"should be able to transfer ownership to a different address"
    it("should be able to transfer ownership to a different address", async () => {
        let oldOwner = web3.eth.accounts[0] 
        let newOwner = web3.eth.accounts[1] 

        let inst = await Loo.deployed();
        let contract = inst;

        await contract.transferOwnership(newOwner);
        callNewOwner = await contract.owner.call()
        assert.equal(newOwner, callNewOwner);
    })

})