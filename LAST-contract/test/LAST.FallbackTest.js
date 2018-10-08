var LAST = artifacts.require('./LAST.sol')
var assert = require('assert')
var expectThrow = require('./helper.js')

beforeEach(async function () {
  // generate new LAST Contract for every test
  this.contract = await LAST.new('Last', 'LTK')
})

describe('fallback function', async () => {
  // should not accept ETH
  it('should not accept ETH', async () => {
    let inst = await LAST.deployed()
    let contract = inst

    await assert.throws(
      () => {
        web3.eth.sendTransaction(
          { to: contract.address,
            from: web3.eth.accounts[0],
            value: web3.toWei('0.5', 'ether') }
        )
      },
      Error,
      'Error: VM Exception while processing transaction: revert'
    )
  })
})
