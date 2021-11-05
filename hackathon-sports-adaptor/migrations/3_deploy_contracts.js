const Oracle = artifacts.require("Oracle");

module.exports = function (deployer) {
  deployer.deploy(Oracle, "0xa36085F69e2889c224210F603D836748e7dC0088");
};
