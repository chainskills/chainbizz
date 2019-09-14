const chainBizzContract = artifacts.require('./ChainBizz.sol');

module.exports = function(deployer) {
  deployer.deploy(chainBizzContract);
};
