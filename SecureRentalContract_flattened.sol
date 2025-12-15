
// File: @openzeppelin/contracts/utils/ReentrancyGuard.sol


// OpenZeppelin Contracts (last updated v5.1.0) (utils/ReentrancyGuard.sol)

pragma solidity ^0.8.20;

/**
 * @dev Contract module that helps prevent reentrant calls to a function.
 *
 * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
 * available, which can be applied to functions to make sure there are no nested
 * (reentrant) calls to them.
 *
 * Note that because there is a single `nonReentrant` guard, functions marked as
 * `nonReentrant` may not call one another. This can be worked around by making
 * those functions `private`, and then adding `external` `nonReentrant` entry
 * points to them.
 *
 * TIP: If EIP-1153 (transient storage) is available on the chain you're deploying at,
 * consider using {ReentrancyGuardTransient} instead.
 *
 * TIP: If you would like to learn more about reentrancy and alternative ways
 * to protect against it, check out our blog post
 * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
 */
abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant NOT_ENTERED = 1;
    uint256 private constant ENTERED = 2;

    uint256 private _status;

    /**
     * @dev Unauthorized reentrant call.
     */
    error ReentrancyGuardReentrantCall();

    constructor() {
        _status = NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and making it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        _nonReentrantBefore();
        _;
        _nonReentrantAfter();
    }

    function _nonReentrantBefore() private {
        // On the first call to nonReentrant, _status will be NOT_ENTERED
        if (_status == ENTERED) {
            revert ReentrancyGuardReentrantCall();
        }

        // Any calls to nonReentrant after this point will fail
        _status = ENTERED;
    }

    function _nonReentrantAfter() private {
        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = NOT_ENTERED;
    }

    /**
     * @dev Returns true if the reentrancy guard is currently set to "entered", which indicates there is a
     * `nonReentrant` function in the call stack.
     */
    function _reentrancyGuardEntered() internal view returns (bool) {
        return _status == ENTERED;
    }
}

// File: @openzeppelin/contracts/utils/Context.sol


// OpenZeppelin Contracts (last updated v5.0.1) (utils/Context.sol)

pragma solidity ^0.8.20;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }

    function _contextSuffixLength() internal view virtual returns (uint256) {
        return 0;
    }
}

// File: @openzeppelin/contracts/utils/Pausable.sol


// OpenZeppelin Contracts (last updated v5.3.0) (utils/Pausable.sol)

pragma solidity ^0.8.20;


/**
 * @dev Contract module which allows children to implement an emergency stop
 * mechanism that can be triggered by an authorized account.
 *
 * This module is used through inheritance. It will make available the
 * modifiers `whenNotPaused` and `whenPaused`, which can be applied to
 * the functions of your contract. Note that they will not be pausable by
 * simply including this module, only once the modifiers are put in place.
 */
abstract contract Pausable is Context {
    bool private _paused;

    /**
     * @dev Emitted when the pause is triggered by `account`.
     */
    event Paused(address account);

    /**
     * @dev Emitted when the pause is lifted by `account`.
     */
    event Unpaused(address account);

    /**
     * @dev The operation failed because the contract is paused.
     */
    error EnforcedPause();

    /**
     * @dev The operation failed because the contract is not paused.
     */
    error ExpectedPause();

    /**
     * @dev Modifier to make a function callable only when the contract is not paused.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    modifier whenNotPaused() {
        _requireNotPaused();
        _;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is paused.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    modifier whenPaused() {
        _requirePaused();
        _;
    }

    /**
     * @dev Returns true if the contract is paused, and false otherwise.
     */
    function paused() public view virtual returns (bool) {
        return _paused;
    }

    /**
     * @dev Throws if the contract is paused.
     */
    function _requireNotPaused() internal view virtual {
        if (paused()) {
            revert EnforcedPause();
        }
    }

    /**
     * @dev Throws if the contract is not paused.
     */
    function _requirePaused() internal view virtual {
        if (!paused()) {
            revert ExpectedPause();
        }
    }

    /**
     * @dev Triggers stopped state.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    function _pause() internal virtual whenNotPaused {
        _paused = true;
        emit Paused(_msgSender());
    }

    /**
     * @dev Returns to normal state.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    function _unpause() internal virtual whenPaused {
        _paused = false;
        emit Unpaused(_msgSender());
    }
}

// File: SecureRentalContract.sol


pragma solidity ^0.8.20;

/**
 * @title SecureRentalContract
 * @dev Saugi išmanioji sutartis turto nuomos valdymui su arbitražu
 * @notice Naudoja OpenZeppelin ReentrancyGuard ir Withdrawal Pattern
 */

// OpenZeppelin importai (bus prieinami Remix per GitHub)



contract SecureRentalContract is ReentrancyGuard, Pausable {
    
    // ============ STATE VARIABLES ============
    
    address public immutable landlord;      // Nuomotojas (immutable = gas savings)
    address public immutable tenant;        // Nuomininkas
    address public immutable arbiter;       // Arbitras
    
    uint256 public monthlyRent;             // Mėnesio nuoma (wei)
    uint256 public deposit;                 // Užstatas (wei)
    uint256 public durationMonths;          // Nuomos trukmė mėnesiais
    uint256 public startTime;               // Sutarties pradžios laikas
    uint256 public lastPaymentTime;         // Paskutinio mokėjimo laikas
    
    string public propertyDescription;      // Turto aprašymas
    
    bool public isActive;                   // Ar sutartis aktyvi
    bool public isPriceSet;                 // Ar kaina nustatyta
    bool public isDisputeActive;            // Ar vyksta ginčas
    bool public isCompleted;                // Ar sutartis užbaigta
    
    uint256 public paidMonths;              // Sumokėtų mėnesių skaičius
    uint256 public disputeRaisedAt;         // Kada ginčas pradėtas
    
    // Withdrawal Pattern - pending withdrawals
    mapping(address => uint256) public pendingWithdrawals;
    
    // Constants
    uint256 public constant PAYMENT_INTERVAL = 30 days;
    uint256 public constant DISPUTE_TIMEOUT = 30 days;  // Arbitras turi 30 dienų
    uint256 public constant MAX_DURATION_MONTHS = 120;
    
    // ============ ENUMS ============
    
    enum ContractStatus {
        OrderPlaced,      // 0: Užsakymas pateiktas
        PriceSet,         // 1: Kaina nustatyta
        DepositPaid,      // 2: Užstatas sumokėtas
        Active,           // 3: Sutartis aktyvi
        DisputeActive,    // 4: Vyksta ginčas
        Completed         // 5: Sutartis užbaigta
    }
    
    ContractStatus public status;
    
    // ============ EVENTS ============
    
    event OrderSent(address indexed tenant, uint256 durationMonths, string description);
    event PriceSent(uint256 monthlyRent, uint256 deposit);
    event DepositPaid(address indexed tenant, uint256 amount);
    event ContractStarted(uint256 startTime);
    event MonthlyPaymentProcessed(uint256 month, uint256 amount);
    event DisputeRaised(address indexed raisedBy, uint256 timestamp);
    event DisputeResolved(uint256 landlordShare, uint256 tenantShare);
    event ContractCompleted(uint256 depositReturned);
    event ArbitrationDecision(address indexed arbiter, uint256 landlordAmount, uint256 tenantAmount);
    event FundsWithdrawn(address indexed recipient, uint256 amount);
    event ContractPaused(address indexed by);
    event ContractUnpaused(address indexed by);
    
    // ============ MODIFIERS ============
    
    modifier onlyLandlord() {
        require(msg.sender == landlord, "Only landlord");
        _;
    }
    
    modifier onlyTenant() {
        require(msg.sender == tenant, "Only tenant");
        _;
    }
    
    modifier onlyArbiter() {
        require(msg.sender == arbiter, "Only arbiter");
        _;
    }
    
    modifier onlyParties() {
        require(msg.sender == landlord || msg.sender == tenant, "Only contract parties");
        _;
    }
    
    modifier contractNotActive() {
        require(!isActive, "Contract already active");
        _;
    }
    
    modifier contractIsActive() {
        require(isActive, "Contract not active");
        _;
    }
    
    modifier noActiveDispute() {
        require(!isDisputeActive, "Dispute in progress");
        _;
    }
    
    modifier inStatus(ContractStatus _status) {
        require(status == _status, "Invalid contract status");
        _;
    }
    
    // ============ CONSTRUCTOR ============
    
    /**
     * @dev Konstruktorius - nuomotojas diegia sutartį nuomininkui
     * @param _tenant Nuomininko adresas
     * @param _arbiter Arbitro adresas
     */
    constructor(address _tenant, address _arbiter) {
        require(_tenant != address(0), "Invalid tenant address");
        require(_arbiter != address(0), "Invalid arbiter address");
        require(_tenant != _arbiter, "Tenant cannot be arbiter");
        require(_tenant != msg.sender, "Tenant cannot be landlord");
        require(_arbiter != msg.sender, "Arbiter cannot be landlord");
        
        landlord = msg.sender;
        tenant = _tenant;
        arbiter = _arbiter;
        status = ContractStatus.OrderPlaced;
    }
    
    // ============ MAIN FUNCTIONS ============
    
    /**
     * @dev 1. Nuomininkas užsako nuomą
     * @param _durationMonths Nuomos trukmė mėnesiais
     * @param _description Turto aprašymas
     */
    function placeOrder(uint256 _durationMonths, string calldata _description) 
        external 
        onlyTenant 
        whenNotPaused
        contractNotActive 
        inStatus(ContractStatus.OrderPlaced)
    {
        require(_durationMonths > 0 && _durationMonths <= MAX_DURATION_MONTHS, "Duration must be 1-120 months");
        require(bytes(_description).length > 0 && bytes(_description).length <= 500, "Invalid description length");
        
        durationMonths = _durationMonths;
        propertyDescription = _description;
        
        emit OrderSent(msg.sender, _durationMonths, _description);
    }
    
    /**
     * @dev 2. Nuomotojas nustato kainą
     * @param _monthlyRent Mėnesio nuomos kaina (wei)
     * @param _deposit Užstato dydis (wei)
     */
    function setPrice(uint256 _monthlyRent, uint256 _deposit) 
        external 
        onlyLandlord 
        whenNotPaused
        contractNotActive 
        inStatus(ContractStatus.OrderPlaced)
    {
        require(_monthlyRent > 0, "Rent must be > 0");
        require(_deposit > 0, "Deposit must be > 0");
        require(durationMonths > 0, "Order not placed yet");
        
        // Patikrinti overflow riziką
        require(_monthlyRent < type(uint256).max / durationMonths, "Rent too high");
        
        monthlyRent = _monthlyRent;
        deposit = _deposit;
        isPriceSet = true;
        status = ContractStatus.PriceSet;
        
        emit PriceSent(_monthlyRent, _deposit);
    }
    
    /**
     * @dev 3. Nuomininkas sumoka užstatą ir pirmo mėnesio nuomą
     * @notice CHECKS-EFFECTS-INTERACTIONS pattern
     */
    function payDeposit() 
        external 
        payable 
        onlyTenant 
        whenNotPaused
        contractNotActive 
        nonReentrant  // Apsauga nuo reentrancy
        inStatus(ContractStatus.PriceSet)
    {
        require(isPriceSet, "Price not set");
        
        uint256 totalRequired = deposit + monthlyRent;
        require(msg.value == totalRequired, "Incorrect amount");
        
        // CHECKS-EFFECTS-INTERACTIONS: pakeisti state PRIEŠ bet kokį external call
        status = ContractStatus.DepositPaid;
        paidMonths = 1;
        
        emit DepositPaid(msg.sender, msg.value);
        
        // Dabar saugiai saugome lėšas (jau pakeistas state)
    }
    
    /**
     * @dev 4. Nuomotojas patvirtina sutarties pradžią
     * @notice Naudoja withdrawal pattern vietoj tiesioginės transfer
     */
    function startContract() 
        external 
        onlyLandlord 
        whenNotPaused
        contractNotActive 
        nonReentrant
        inStatus(ContractStatus.DepositPaid)
    {
        // CHECKS-EFFECTS-INTERACTIONS
        isActive = true;
        startTime = block.timestamp;
        lastPaymentTime = block.timestamp;
        status = ContractStatus.Active;
        
        // Pridėti pirmo mėnesio nuomą į pending withdrawals (WITHDRAWAL PATTERN)
        pendingWithdrawals[landlord] += monthlyRent;
        
        emit ContractStarted(startTime);
    }
    
    /**
     * @dev 5. Automatinis mėnesio mokėjimas (WITHDRAWAL PATTERN)
     * @notice Bet kas gali iškviesti, bet lėšos eina į pending withdrawals
     */
    function processMonthlyPayment() 
        external 
        whenNotPaused
        contractIsActive 
        noActiveDispute 
        nonReentrant
    {
        require(block.timestamp >= lastPaymentTime + PAYMENT_INTERVAL, "Too early for payment");
        require(paidMonths < durationMonths, "All months paid");
        
        uint256 contractBalance = address(this).balance - _getTotalPendingWithdrawals();
        require(contractBalance >= monthlyRent, "Insufficient funds in contract");
        
        // CHECKS-EFFECTS-INTERACTIONS pattern
        paidMonths++;
        lastPaymentTime = block.timestamp;
        
        // Pridėti į pending withdrawals vietoj tiesioginio transfer
        pendingWithdrawals[landlord] += monthlyRent;
        
        emit MonthlyPaymentProcessed(paidMonths, monthlyRent);
        
        // Patikrinti, ar sutartis baigėsi
        if (paidMonths >= durationMonths) {
            _completeContractInternal();
        }
    }
    
    /**
     * @dev 6. Kelti ginčą (gali bet kuri šalis)
     */
    function raiseDispute() 
        external 
        onlyParties
        whenNotPaused
        contractIsActive 
        noActiveDispute
        nonReentrant
    {
        // CHECKS-EFFECTS-INTERACTIONS
        isDisputeActive = true;
        disputeRaisedAt = block.timestamp;
        status = ContractStatus.DisputeActive;
        
        emit DisputeRaised(msg.sender, block.timestamp);
    }
    
    /**
     * @dev 7. Arbitras išsprendžia ginčą (WITHDRAWAL PATTERN)
     * @param _landlordSharePercent Nuomotojo dalis procentais (0-100)
     */
    function resolveDispute(uint256 _landlordSharePercent) 
        external 
        onlyArbiter
        whenNotPaused
        nonReentrant
    {
        require(isDisputeActive, "No active dispute");
        require(_landlordSharePercent <= 100, "Invalid percentage");
        
        uint256 depositBalance = deposit;
        require(depositBalance > 0, "No deposit");
        
        // Saugus skaičiavimas (Solidity 0.8+ automatiškai tikrina overflow)
        uint256 landlordAmount = (depositBalance * _landlordSharePercent) / 100;
        uint256 tenantAmount = depositBalance - landlordAmount;
        
        // CHECKS-EFFECTS-INTERACTIONS
        isDisputeActive = false;
        isCompleted = true;
        status = ContractStatus.Completed;
        deposit = 0;  // Užstatas išdalintas
        
        // Pridėti į pending withdrawals (WITHDRAWAL PATTERN)
        if (landlordAmount > 0) {
            pendingWithdrawals[landlord] += landlordAmount;
        }
        if (tenantAmount > 0) {
            pendingWithdrawals[tenant] += tenantAmount;
        }
        
        emit ArbitrationDecision(msg.sender, landlordAmount, tenantAmount);
        emit DisputeResolved(landlordAmount, tenantAmount);
    }
    
    /**
     * @dev 8. Bet kuri šalis gali užbaigti sutartį po dispute timeout
     * @notice Jei arbitras neišsprendė per 30 dienų, šalys gali patys užbaigti
     */
    function forceCompleteAfterDisputeTimeout()
        external
        onlyParties
        nonReentrant
    {
        require(isDisputeActive, "No active dispute");
        require(block.timestamp >= disputeRaisedAt + DISPUTE_TIMEOUT, "Dispute timeout not reached");
        
        // Grąžinti visą užstatą nuomininkui (default sprendimas)
        isDisputeActive = false;
        isCompleted = true;
        status = ContractStatus.Completed;
        
        if (deposit > 0) {
            pendingWithdrawals[tenant] += deposit;
            deposit = 0;
        }
        
        emit ContractCompleted(deposit);
    }
    
    /**
     * @dev Užbaigti sutartį normaliai (internal)
     */
    function _completeContractInternal() 
        internal 
    {
        require(paidMonths >= durationMonths, "Contract duration not completed");
        
        isActive = false;
        isCompleted = true;
        status = ContractStatus.Completed;
        
        // Grąžinti užstatą nuomininkui (WITHDRAWAL PATTERN)
        if (deposit > 0) {
            pendingWithdrawals[tenant] += deposit;
            uint256 refundAmount = deposit;
            deposit = 0;
            emit ContractCompleted(refundAmount);
        }
    }
    
    /**
     * @dev Rankiniu būdu užbaigti sutartį (tik jei visi mėnesiai sumokėti)
     */
    function completeContract() 
        external 
        onlyParties
        whenNotPaused
        contractIsActive 
        noActiveDispute 
        nonReentrant
    {
        require(paidMonths >= durationMonths, "Contract not finished yet");
        _completeContractInternal();
    }
    
    // ============ WITHDRAWAL PATTERN ============
    
    /**
     * @dev WITHDRAWAL PATTERN - Išimti lėšas (PULL vietoj PUSH)
     * @notice Tai apsaugo nuo failed transfers ir reentrancy
     */
    function withdraw() 
        external 
        nonReentrant 
    {
        uint256 amount = pendingWithdrawals[msg.sender];
        require(amount > 0, "No funds to withdraw");
        
        // CHECKS-EFFECTS-INTERACTIONS
        pendingWithdrawals[msg.sender] = 0;
        
        emit FundsWithdrawn(msg.sender, amount);
        
        // Naudoti call vietoj transfer (saugiau su smart contract wallets)
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
    }
    
    /**
     * @dev Patikrinti, kiek galima išsiimti
     */
    function getWithdrawableAmount(address _address) 
        external 
        view 
        returns (uint256) 
    {
        return pendingWithdrawals[_address];
    }
    
    /**
     * @dev Gauti bendrą pending withdrawals sumą (internal helper)
     */
    function _getTotalPendingWithdrawals() 
        internal 
        view 
        returns (uint256) 
    {
        return pendingWithdrawals[landlord] + 
               pendingWithdrawals[tenant] + 
               pendingWithdrawals[arbiter];
    }
    
    // ============ EMERGENCY FUNCTIONS ============
    
    /**
     * @dev Pause sutartį (tik nuomotojas arba arbitras)
     */
    function pause() 
        external 
    {
        require(msg.sender == landlord || msg.sender == arbiter, "Only landlord or arbiter");
        _pause();
        emit ContractPaused(msg.sender);
    }
    
    /**
     * @dev Unpause sutartį
     */
    function unpause() 
        external 
    {
        require(msg.sender == landlord || msg.sender == arbiter, "Only landlord or arbiter");
        _unpause();
        emit ContractUnpaused(msg.sender);
    }
    
    /**
     * @dev Nuomininkas gali papildyti balansą
     */
    function topUpBalance() 
        external 
        payable 
        onlyTenant 
        whenNotPaused
    {
        require(msg.value > 0, "Amount must be > 0");
        require(isActive, "Contract not active");
    }
    
    // ============ VIEW FUNCTIONS ============
    
    /**
     * @dev Gauti sutarties informaciją
     */
    function getContractInfo() 
        external 
        view 
        returns (
            address _landlord,
            address _tenant,
            address _arbiter,
            uint256 _monthlyRent,
            uint256 _deposit,
            uint256 _durationMonths,
            ContractStatus _status,
            bool _isActive,
            bool _isDisputeActive
        ) 
    {
        return (
            landlord,
            tenant,
            arbiter,
            monthlyRent,
            deposit,
            durationMonths,
            status,
            isActive,
            isDisputeActive
        );
    }
    
    /**
     * @dev Gauti mokėjimo informaciją
     */
    function getPaymentInfo() 
        external 
        view 
        returns (
            uint256 _paidMonths,
            uint256 _remainingMonths,
            uint256 _contractBalance,
            uint256 _availableBalance,
            uint256 _nextPaymentDue
        ) 
    {
        uint256 remaining = durationMonths > paidMonths ? durationMonths - paidMonths : 0;
        uint256 nextDue = lastPaymentTime > 0 ? lastPaymentTime + PAYMENT_INTERVAL : 0;
        uint256 totalBalance = address(this).balance;
        uint256 available = totalBalance - _getTotalPendingWithdrawals();
        
        return (
            paidMonths,
            remaining,
            totalBalance,
            available,
            nextDue
        );
    }
    
    /**
     * @dev Patikrinti, ar reikia mokėti
     */
    function isPaymentDue() 
        external 
        view 
        returns (bool) 
    {
        if (!isActive || isDisputeActive || paidMonths >= durationMonths) {
            return false;
        }
        return block.timestamp >= lastPaymentTime + PAYMENT_INTERVAL;
    }
    
    /**
     * @dev Gauti ginčo informaciją
     */
    function getDisputeInfo()
        external
        view
        returns (
            bool _isDisputeActive,
            uint256 _disputeRaisedAt,
            uint256 _disputeTimeoutAt,
            bool _canForceComplete
        )
    {
        uint256 timeoutAt = disputeRaisedAt > 0 ? disputeRaisedAt + DISPUTE_TIMEOUT : 0;
        bool canForce = isDisputeActive && block.timestamp >= timeoutAt;
        
        return (
            isDisputeActive,
            disputeRaisedAt,
            timeoutAt,
            canForce
        );
    }
    
    /**
     * @dev Gauti sutarties balansą
     */
    function getBalance() 
        external 
        view 
        returns (uint256 total, uint256 available, uint256 locked) 
    {
        uint256 totalBalance = address(this).balance;
        uint256 lockedBalance = _getTotalPendingWithdrawals();
        uint256 availableBalance = totalBalance > lockedBalance ? totalBalance - lockedBalance : 0;
        
        return (totalBalance, availableBalance, lockedBalance);
    }
    
    // ============ RECEIVE & FALLBACK ============
    
    /**
     * @dev Priimti ETH tiesiogiai (nukreipia į topUpBalance logiką)
     */
    receive() external payable {
        require(msg.sender == tenant, "Only tenant can send ETH directly");
        require(isActive, "Contract not active");
    }
    
    /**
     * @dev Fallback funkcija
     */
    fallback() external payable {
        revert("Invalid function call");
    }
}