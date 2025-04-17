const hre = require("hardhat");

async function main() {
  const Certificate = await hre.ethers.getContractFactory("Certificate");
  const cert = await Certificate.deploy();
  await cert.waitForDeployment();
  console.log("Certificate deployed to:", cert.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
