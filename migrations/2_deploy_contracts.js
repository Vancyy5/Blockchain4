
require('dotenv').config();
const SecureRentalContract = artifacts.require("SecureRentalContract");

module.exports = async function (deployer, network, accounts) {
  console.log("Deploying to network:", network);
  console.log("Deployer account:", accounts[0]);
  
  let tenantAddress;
  let arbiterAddress;

  // Lokaliam tinklui naudoti test accounts
  if (network === "development" || network === "develop") {
    tenantAddress = accounts[1];
    arbiterAddress = accounts[2];
    console.log("Using local test accounts:");
    console.log("Landlord:", accounts[0]);
    console.log("Tenant:", tenantAddress);
    console.log("Arbiter:", arbiterAddress);
  } 
  // Sepolia tinklui naudoti .env kintamuosius
  else if (network === "sepolia") {
    tenantAddress = process.env.TENANT_ADDRESS;
    arbiterAddress = process.env.ARBITER_ADDRESS;
    
    // Validacija
    if (!tenantAddress || !arbiterAddress) {
      throw new Error("TENANT_ADDRESS ir ARBITER_ADDRESS turi būti nustatyti .env faile");
    }
    
    console.log("Using Sepolia addresses:");
    console.log("Landlord (deployer):", accounts[0]);
    console.log("Tenant:", tenantAddress);
    console.log("Arbiter:", arbiterAddress);
  }

  // Deploy sutarties
  await deployer.deploy(SecureRentalContract, tenantAddress, arbiterAddress);
  const contract = await SecureRentalContract.deployed();
  
  console.log("Contract address:", contract.address);
  console.log("Transaction hash:", contract.transactionHash);
  console.log("========================================\n");

  // Jei Sepolia, pateikti Etherscan nuorodą
  if (network === "sepolia") {
    console.log(`https://sepolia.etherscan.io/address/${contract.address}`);
    console.log(`https://sepolia.etherscan.io/tx/${contract.transactionHash}`);
    
    console.log("\nVerify contract on Etherscan:");
    console.log(`truffle run verify SecureRentalContract --network sepolia`);
  }
};