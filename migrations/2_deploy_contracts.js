var bnbBridge = artifacts.require("./bnbBridge.sol");

module.exports = function(deployer) {
  deployer.deploy(bnbBridge);
};
