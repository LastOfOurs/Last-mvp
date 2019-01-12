const Last = artifacts.require('./Last.sol')
const Egg = artifacts.require('./Egg.sol')
const IdentityProxy = artifacts.require('./IdentityProxy.sol')

module.exports = function (deployer) {
  deployer.deploy(Last, 'Last', 'LTK', { gas: 5000000 })
  deployer.deploy(Egg)
  deployer.deploy(IdentityProxy)
}
