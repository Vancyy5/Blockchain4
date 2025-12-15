const SecureRentalContract = artifacts.require("SecureRentalContract");

module.exports = async function(callback) {
  try {
    console.log("\n========================================");
    console.log("SEPOLIA TRANSAKCIJŲ TESTAVIMAS");
    console.log("========================================\n");

    // 1. Gauti deployed sutartį
    const contract = await SecureRentalContract.deployed();
    const accounts = await web3.eth.getAccounts();
    
    console.log(" Contract Info:");
    console.log("   Address:", contract.address);
    console.log("   Etherscan:", `https://sepolia.etherscan.io/address/${contract.address}`);
    
    // 2. Gauti šalis
    const landlord = await contract.landlord();
    const tenant = await contract.tenant();
    const arbiter = await contract.arbiter();
    
    console.log("\n Parties:");
    console.log("   Landlord:", landlord);
    console.log("   Tenant:", tenant);
    console.log("   Arbiter:", arbiter);
    
    // 3. Patikrinti pradinį statusą
    let status = await contract.status();
    console.log("\n Initial Status:", status.toString());
    
    // 4. TRANSAKCIJA #2: Tenant places order
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(" TRANSAKCIJA #2: placeOrder()");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    
    const tx1 = await contract.placeOrder(
      6, 
      "Modern 2-bedroom apartment in Vilnius city center",
      {from: tenant}
    );
    
    console.log(" Order placed!");
    console.log("   Tx Hash:", tx1.tx);
    console.log("   View:", `https://sepolia.etherscan.io/tx/${tx1.tx}`);
    console.log("   Gas Used:", tx1.receipt.gasUsed.toString());
    
    // Log events
    if (tx1.logs.length > 0) {
      console.log("  Events:");
      tx1.logs.forEach(log => {
        console.log(`      - ${log.event}`);
      });
    }
    
    // Wait for confirmation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 5. TRANSAKCIJA #3: Landlord sets price
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(" TRANSAKCIJA #3: setPrice()");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    
    const monthlyRent = web3.utils.toWei("0.01", "ether");
    const deposit = web3.utils.toWei("0.02", "ether");
    
    const tx2 = await contract.setPrice(monthlyRent, deposit, {from: landlord});
    
    console.log(" Price set!");
    console.log("   Monthly Rent:", web3.utils.fromWei(monthlyRent, "ether"), "ETH");
    console.log("   Deposit:", web3.utils.fromWei(deposit, "ether"), "ETH");
    console.log("   Tx Hash:", tx2.tx);
    console.log("   View:", `https://sepolia.etherscan.io/tx/${tx2.tx}`);
    console.log("   Gas Used:", tx2.receipt.gasUsed.toString());
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 6. TRANSAKCIJA #4: Tenant pays deposit
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(" TRANSAKCIJA #4: payDeposit()");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    
    const totalPayment = web3.utils.toWei("0.03", "ether");
    const tx3 = await contract.payDeposit({
      from: tenant,
      value: totalPayment
    });
    
    console.log(" Deposit paid!");
    console.log("   Amount:", web3.utils.fromWei(totalPayment, "ether"), "ETH");
    console.log("   Tx Hash:", tx3.tx);
    console.log("   View:", `https://sepolia.etherscan.io/tx/${tx3.tx}`);
    console.log("   Gas Used:", tx3.receipt.gasUsed.toString());
    
    // Check contract balance
    const balance = await web3.eth.getBalance(contract.address);
    console.log("   Contract Balance:", web3.utils.fromWei(balance, "ether"), "ETH");
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 7. TRANSAKCIJA #5: Landlord starts contract
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(" TRANSAKCIJA #5: startContract()");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    
    const tx4 = await contract.startContract({from: landlord});
    
    console.log(" Contract started!");
    console.log("   Tx Hash:", tx4.tx);
    console.log("   View:", `https://sepolia.etherscan.io/tx/${tx4.tx}`);
    console.log("   Gas Used:", tx4.receipt.gasUsed.toString());
    
    // 8. Galutinis patikrinimas
    console.log("\n========================================");
    console.log(" FINAL CONTRACT STATE");
    console.log("========================================");
    
    const info = await contract.getContractInfo();
    console.log("   Status:", info._status.toString(), "(3 = Active )");
    console.log("   Is Active:", info._isActive);
    console.log("   Monthly Rent:", web3.utils.fromWei(info._monthlyRent, "ether"), "ETH");
    console.log("   Deposit:", web3.utils.fromWei(info._deposit, "ether"), "ETH");
    console.log("   Duration:", info._durationMonths.toString(), "months");
    
    const paymentInfo = await contract.getPaymentInfo();
    console.log("   Paid Months:", paymentInfo._paidMonths.toString());
    console.log("   Remaining Months:", paymentInfo._remainingMonths.toString());
    
    console.log("\n========================================");
    console.log(" TEST COMPLETED SUCCESSFULLY!");
    console.log("========================================");
    console.log("\n View all transactions on Etherscan:");
    console.log(`https://sepolia.etherscan.io/address/${contract.address}\n`);
    console.log(" Total Transactions Created: 5");
    console.log("   1. Contract Creation (Deployment)");
    console.log("   2. placeOrder()");
    console.log("   3. setPrice()");
    console.log("   4. payDeposit()");
    console.log("   5. startContract()");
    console.log("\n");
    
    callback();
  } catch (error) {
    console.error("\n ERROR:", error.message);
    callback(error);
  }
};