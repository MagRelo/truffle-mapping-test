var MappingTest = artifacts.require('MappingTest');

module.exports = async function(deployer) {
  await deployer.deploy(MappingTest);
};
