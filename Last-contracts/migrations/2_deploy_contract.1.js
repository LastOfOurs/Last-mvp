const Last = artifacts.require('./Last.sol')
const EggFactory = artifacts.require('./EggFactory.sol')
const Egg = artifacts.require('./Egg.sol')

module.exports = function (deployer) {
  deployer.deploy(Last, 'Last', 'LTK', { gas: 5000000 })
  deployer.deploy(EggFactory)
  deployer.deploy(Egg, 'Simple Egg')
}
