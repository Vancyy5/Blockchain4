const SecureRentalContract = artifacts.require("SecureRentalContract");

module.exports = async function (deployer, network, accounts) {
  console.log("\n========================================");
  console.log("DEPLOYMENT INFO");
  console.log("========================================");
  console.log("Network:", network);
  console.log("Available accounts:", accounts.length);
  
  // Parodyti pirmus 3 accounts
  if (accounts.length >= 3) {
    console.log("Landlord (accounts[0]):", accounts[0]);
    console.log("Tenant (accounts[1]):", accounts[1]);
    console.log("Arbiter (accounts[2]):", accounts[2]);
  } else {
    throw new Error("ERROR: Need at least 3 accounts! Start Ganache CLI first.");
  }
  
  const tenant = accounts[1];
  const arbiter = accounts[2];
  
  console.log("\nDeploying SecureRentalContract...");
  console.log("Constructor args:");
  console.log("  _tenant:", tenant);
  console.log("  _arbiter:", arbiter);
  
  try {
    await deployer.deploy(SecureRentalContract, tenant, arbiter);
    
    const instance = await SecureRentalContract.deployed();
    console.log("\n SUCCESS!");
    console.log("Contract address:", instance.address);
    console.log("========================================\n");
  } catch (error) {
    console.log("\n DEPLOYMENT FAILED!");
    console.log("Error:", error.message);
    throw error;
  }
};