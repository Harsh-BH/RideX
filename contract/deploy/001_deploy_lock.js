const { ethers } = require("hardhat");

const func = async function (hre) {
  // code here
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();

  await deploy("Duber", { from: deployer });
};

module.exports = func;
