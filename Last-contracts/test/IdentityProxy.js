const lightwallet = require('eth-signer')
const IdentityProxy = artifacts.require('./IdentityProxy.sol')
const Last = artifacts.require('./Last.sol')
const Egg = artifacts.require('./Egg.sol')
const assert = require('assert')

//send a transaction through identity proxy 
contract('IdentityProxy', async () => {
  async function sendProxyTx(
    destAddr, 
    proxy, 
    fromAccount, 
    funcName,
    typeArr,
    dataArr) {
    let data = lightwallet.txutils._encodeFunctionTxData(funcName,typeArr,dataArr)
    // call forward request to a smart contract
    await proxy.forward(destAddr, 0, '0x' + data, {from: fromAccount})
  }

  beforeEach(async function () {
    // generate new Contract for every test
    this.proxy = await IdentityProxy.new()
    this.last = await Last.new('Last', 'LTK')
    this.egg = await Egg.new()
    this.alice = web3.eth.accounts[0]
    this.bob = web3.eth.accounts[1]
  })

  describe('send transactions of tokens', async function () {
    it('should send erc721 token to destination address', async function () {
      await this.last.mint(this.proxy.address, 1, "someTokenURI") 
      await sendProxyTx(
        this.last.address, 
        this.proxy,
        this.alice, 
        "transferFrom",
        ["address","address","uint256"],
        [this.proxy.address, this.bob, 1]
      )
      let bobBalance = await this.last.balanceOf(this.bob)
      assert.equal(bobBalance.toNumber(), 1)
    })
    
    it('should send erc20 token to destination address', async function () {
      await this.egg.mint(this.proxy.address, 100) 
      await sendProxyTx(
        this.egg.address, 
        this.proxy,
        this.alice, 
        "transfer",
        ["address", "uint256"],
        [this.bob, 100]
      )
      let bobBalance = await this.egg.balanceOf(this.bob)
      assert.equal(bobBalance.toNumber(), 100)
    })
    
  })
})