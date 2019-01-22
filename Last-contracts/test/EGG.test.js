const Egg = artifacts.require('./Egg.sol')
const assert = require('assert').strict

function resolveEventToPromise(event) {
  return new Promise(function (resolve, reject) {
    event.watch((error, res) => {
      if (error) {
        reject(error)
      } else {
        resolve(res)
      }
    })
  })
}


contract('Egg', async function (accounts) {
  const account = accounts[0]

  beforeEach(async function () {
    const contract = Egg.deployed()
    await contract.then(instance => instance.mint(account, 10000))
    this.contract = await contract
  })

  it('should deduct the correct amount of token', async function () {
    const hatchAmount = 50

    const startingBalance = await this.contract.balanceOf(account)
    await this.contract.hatch(hatchAmount, { from: account })
    const endingBalance = await this.contract.balanceOf(account)

    assert.strictEqual(endingBalance.toString(), (startingBalance - hatchAmount).toString())
  })

  it('should not allow hatching when balance is insufficient', async function () {
    await this.contract
      .hatch(Number.MAX_SAFE_INTEGER, { from: account })
      .then(assert.fail)
      .catch(assert.ok)
  })

  it('should emit event with corresponding parameter', async function () {
    const amount = 25
    const promise = resolveEventToPromise(this.contract.Hatching())

    await this.contract.hatch(amount, {from: account})
    await promise
      .then(res => {
        assert.strictEqual(res.args.recipient, account)
        assert.strictEqual(res.args.amount.toString(), amount.toString())
      })
  })
})
