var LAST = artifacts.require('./LAST.sol')
var Egg = artifacts.require('./Egg.sol')

module.exports = function (deployer) {
  deployer.deploy(LAST, 'LAST', 'LTK', { gas: 5000000 })
  deployer.deploy(Egg)
}
