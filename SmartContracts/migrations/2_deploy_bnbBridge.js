const bnbBridge = artifacts.require("bnbBridge");

module.exports = function (deployer) {
  deployer.deploy(bnbBridge);
};
