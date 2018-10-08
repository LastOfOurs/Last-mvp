var Migrations = artifacts.require('./Migrations.sol')

module.exports = function (deployer) {
  //TODO: remove hardcoded gas value
  deployer.deploy(Migrations, { gas: 5000000 })
}
