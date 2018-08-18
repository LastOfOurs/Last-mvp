var LAST = artifacts.require("./LAST.sol");

module.exports = function(deployer) {
  deployer.deploy(LAST,"LAST","LTK", { gas: 5000000});
};
