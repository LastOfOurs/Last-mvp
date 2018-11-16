var Last = artifacts.require('./Last.sol')
var Egg = artifacts.require('./Egg.sol')

module.exports = function (deployer) {
  deployer.deploy(Last, 'Last', 'LTK', { gas: 5000000 })
  deployer.deploy(Egg)
}
