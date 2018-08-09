var Loo = artifacts.require("./Loo.sol");

module.exports = function(deployer) {
  deployer.deploy(Loo,"Last","LTK", { gas: 5000000});
};
