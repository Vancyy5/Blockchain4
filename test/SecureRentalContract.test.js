const SecureRentalContract = artifacts.require("SecureRentalContract");

contract("SecureRentalContract", (accounts) => {
  const landlord = accounts[0];
  const tenant = accounts[1];
  const arbiter = accounts[2];
  
  let rentalContract;
  
  const monthlyRent = web3.utils.toWei("1", "ether");
  const deposit = web3.utils.toWei("2", "ether");
  const durationMonths = 12;
  const propertyDescription = "Beautiful 2BR apartment in Vilnius";
  
  beforeEach(async () => {
    rentalContract = await SecureRentalContract.new(tenant, arbiter, { from: landlord });
  });
  
  describe("Deployment", () => {
    it("should set correct landlord", async () => {
      const contractLandlord = await rentalContract.landlord();
      assert.equal(contractLandlord, landlord, "Landlord not set correctly");
    });
    
    it("should set correct tenant", async () => {
      const contractTenant = await rentalContract.tenant();
      assert.equal(contractTenant, tenant, "Tenant not set correctly");
    });
    
    it("should set correct arbiter", async () => {
      const contractArbiter = await rentalContract.arbiter();
      assert.equal(contractArbiter, arbiter, "Arbiter not set correctly");
    });
    
    it("should start with OrderPlaced status", async () => {
      const status = await rentalContract.status();
      assert.equal(status.toNumber(), 0, "Status should be OrderPlaced");
    });
  });
  
  describe("Place Order", () => {
    it("should allow tenant to place order", async () => {
      await rentalContract.placeOrder(durationMonths, propertyDescription, { from: tenant });
      
      const duration = await rentalContract.durationMonths();
      const description = await rentalContract.propertyDescription();
      
      assert.equal(duration.toNumber(), durationMonths, "Duration not set");
      assert.equal(description, propertyDescription, "Description not set");
    });
    
    it("should emit OrderSent event", async () => {
      const receipt = await rentalContract.placeOrder(durationMonths, propertyDescription, { from: tenant });
      
      assert.equal(receipt.logs.length, 1, "Should emit one event");
      assert.equal(receipt.logs[0].event, "OrderSent", "Should emit OrderSent event");
    });
    
    it("should revert if non-tenant tries to place order", async () => {
      try {
        await rentalContract.placeOrder(durationMonths, propertyDescription, { from: landlord });
        assert.fail("Should have reverted");
      } catch (error) {
        assert(error.message.includes("Only tenant"), "Wrong error message");
      }
    });
  });
  
  describe("Set Price", () => {
    beforeEach(async () => {
      await rentalContract.placeOrder(durationMonths, propertyDescription, { from: tenant });
    });
    
    it("should allow landlord to set price", async () => {
      await rentalContract.setPrice(monthlyRent, deposit, { from: landlord });
      
      const contractRent = await rentalContract.monthlyRent();
      const contractDeposit = await rentalContract.deposit();
      
      assert.equal(contractRent.toString(), monthlyRent, "Rent not set");
      assert.equal(contractDeposit.toString(), deposit, "Deposit not set");
    });
    
    it("should change status to PriceSet", async () => {
      await rentalContract.setPrice(monthlyRent, deposit, { from: landlord });
      
      const status = await rentalContract.status();
      assert.equal(status.toNumber(), 1, "Status should be PriceSet");
    });
  });
  
  describe("Pay Deposit", () => {
    beforeEach(async () => {
      await rentalContract.placeOrder(durationMonths, propertyDescription, { from: tenant });
      await rentalContract.setPrice(monthlyRent, deposit, { from: landlord });
    });
    
    it("should accept correct deposit + first month payment", async () => {
      const totalRequired = web3.utils.toBN(monthlyRent).add(web3.utils.toBN(deposit));
      
      await rentalContract.payDeposit({ from: tenant, value: totalRequired });
      
      const status = await rentalContract.status();
      assert.equal(status.toNumber(), 2, "Status should be DepositPaid");
    });
    
    it("should revert if incorrect amount sent", async () => {
      const incorrectAmount = web3.utils.toWei("1", "ether");
      
      try {
        await rentalContract.payDeposit({ from: tenant, value: incorrectAmount });
        assert.fail("Should have reverted");
      } catch (error) {
        assert(error.message.includes("Incorrect amount"), "Wrong error message");
      }
    });
  });
  
  describe("Start Contract", () => {
    beforeEach(async () => {
      await rentalContract.placeOrder(durationMonths, propertyDescription, { from: tenant });
      await rentalContract.setPrice(monthlyRent, deposit, { from: landlord });
      
      const totalRequired = web3.utils.toBN(monthlyRent).add(web3.utils.toBN(deposit));
      await rentalContract.payDeposit({ from: tenant, value: totalRequired });
    });
    
    it("should activate contract", async () => {
      await rentalContract.startContract({ from: landlord });
      
      const isActive = await rentalContract.isActive();
      assert.equal(isActive, true, "Contract should be active");
    });
    
    it("should set start time", async () => {
      await rentalContract.startContract({ from: landlord });
      
      const startTime = await rentalContract.startTime();
      assert(startTime.toNumber() > 0, "Start time should be set");
    });
  });
  
  describe("Withdrawal Pattern", () => {
    beforeEach(async () => {
      await rentalContract.placeOrder(durationMonths, propertyDescription, { from: tenant });
      await rentalContract.setPrice(monthlyRent, deposit, { from: landlord });
      
      const totalRequired = web3.utils.toBN(monthlyRent).add(web3.utils.toBN(deposit));
      await rentalContract.payDeposit({ from: tenant, value: totalRequired });
      await rentalContract.startContract({ from: landlord });
    });
    
    it("should allow landlord to withdraw first month rent", async () => {
      const withdrawable = await rentalContract.getWithdrawableAmount(landlord);
      assert.equal(withdrawable.toString(), monthlyRent, "Should have first month rent");
      
      const balanceBefore = await web3.eth.getBalance(landlord);
      const receipt = await rentalContract.withdraw({ from: landlord });
      const balanceAfter = await web3.eth.getBalance(landlord);
      
      // Apskaičiuoti gas kainą
      const tx = await web3.eth.getTransaction(receipt.tx);
      const gasUsed = receipt.receipt.gasUsed;
      const gasPrice = tx.gasPrice;
      const gasCost = web3.utils.toBN(gasUsed).mul(web3.utils.toBN(gasPrice));
      
      const expectedBalance = web3.utils.toBN(balanceBefore)
        .add(web3.utils.toBN(monthlyRent))
        .sub(gasCost);
      
      assert.equal(balanceAfter.toString(), expectedBalance.toString(), "Balance incorrect");
    });
  });
  
  describe("Raise Dispute", () => {
    beforeEach(async () => {
      await rentalContract.placeOrder(durationMonths, propertyDescription, { from: tenant });
      await rentalContract.setPrice(monthlyRent, deposit, { from: landlord });
      
      const totalRequired = web3.utils.toBN(monthlyRent).add(web3.utils.toBN(deposit));
      await rentalContract.payDeposit({ from: tenant, value: totalRequired });
      await rentalContract.startContract({ from: landlord });
    });
    
    it("should allow tenant to raise dispute", async () => {
      await rentalContract.raiseDispute({ from: tenant });
      
      const isDisputeActive = await rentalContract.isDisputeActive();
      assert.equal(isDisputeActive, true, "Dispute should be active");
    });
    
    it("should emit DisputeRaised event", async () => {
      const receipt = await rentalContract.raiseDispute({ from: tenant });
      
      assert.equal(receipt.logs[0].event, "DisputeRaised", "Should emit DisputeRaised");
    });
  });
  
  describe("Resolve Dispute", () => {
    beforeEach(async () => {
      await rentalContract.placeOrder(durationMonths, propertyDescription, { from: tenant });
      await rentalContract.setPrice(monthlyRent, deposit, { from: landlord });
      
      const totalRequired = web3.utils.toBN(monthlyRent).add(web3.utils.toBN(deposit));
      await rentalContract.payDeposit({ from: tenant, value: totalRequired });
      await rentalContract.startContract({ from: landlord });
      await rentalContract.raiseDispute({ from: tenant });
    });
    
    it("should allow arbiter to resolve dispute 50/50", async () => {
      await rentalContract.resolveDispute(50, { from: arbiter });
      
      const landlordPending = await rentalContract.getWithdrawableAmount(landlord);
      const tenantPending = await rentalContract.getWithdrawableAmount(tenant);
      
      const expectedShare = web3.utils.toBN(deposit).div(web3.utils.toBN(2));
      
      // Landlord turi first month rent + 50% deposit
      const expectedLandlord = web3.utils.toBN(monthlyRent).add(expectedShare);
      
      assert.equal(landlordPending.toString(), expectedLandlord.toString(), "Landlord share incorrect");
      assert.equal(tenantPending.toString(), expectedShare.toString(), "Tenant share incorrect");
    });
  });
});