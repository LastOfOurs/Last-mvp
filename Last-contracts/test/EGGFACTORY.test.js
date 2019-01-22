const EggFactory = artifacts.require('./EggFactory.sol')
const Egg = artifacts.require('./Egg.sol')
const assert = require('assert').strict
const web3 = require('web3')
const helper = require('./helper.js')

contract('EggFactory', async function (accounts) {
  beforeEach(async function () {
    this.contract = await EggFactory.deployed()
  })

  it('should only let owner deploy new egg', async function () {
    await this.contract
      .deployEgg('momo', {from: accounts[0]})
      .then(assert.ok)
    await this.contract
      .deployEgg('ume', {from: accounts[1]})
      .then(assert.fail)
      .catch(assert.ok)
  })

  it('should not deploy egg with duplicated name', async function () {
    const eggName = 'hakuna matata'
    await this.contract.deployEgg(eggName)
    await this.contract
      .deployEgg(eggName)
      .then(assert.fail)
      .catch(assert.ok)
  })

  it('should store list of deployed eggs', async function () {
    const eggNames = ['hakuna', 'matata']
    await Promise.all(eggNames.map(name => this.contract.deployEgg(name)))

    const namesInBytes = await this.contract.getEggs()
    const names = namesInBytes.map(web3.prototype.toUtf8)
    eggNames.forEach(name => assert(names.includes(name)))
  })

  it('should be able to fetch address of egg contract by name', async function () {
    const eggName = 'ponies'
    await this.contract.deployEgg(eggName)
    await this.contract.getEggAddress(eggName)
      .then(at => assert(parseInt(at) && web3.prototype.isAddress(at)))
  })

  it('should own the contract that it deployed', async function () {
    const eggName = 'unicorn'
    await this.contract.deployEgg(eggName)
    await this.contract.getEggAddress(eggName)
      .then(at => Egg.at(at).owner())
      .then(owner => assert.equal(owner, this.contract.address))
  })

  it('should emit event with correct parameter', async function () {
    const eggName = 'friendship is magic'
    const promise = helper.resolveEventToPromise(this.contract.EggDeployed())

    await this.contract.deployEgg(eggName)
    await promise
      .then(res => {
        assert.strictEqual(res.args.eggName, eggName)
        assert(parseInt(res.args.at) && web3.prototype.isAddress(res.args.at))
      })
  })
})
