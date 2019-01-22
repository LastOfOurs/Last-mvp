var Last = artifacts.require('./Last.sol')
var assert = require('assert')

beforeEach(async function () {
  // generate new Last Contract for every test
  this.contract = await Last.new('Last', 'LTK')
})

describe('fallback function', async () => {
  // should not accept ETH
  it('should not accept ETH', async () => {
    let inst = await Last.deployed()
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
