var Loo = artifacts.require("./Loo.sol");

module.exports = function(deployer) {
  deployer.deploy(Loo,"Loo","LTK", { gas: 5000000});
};
