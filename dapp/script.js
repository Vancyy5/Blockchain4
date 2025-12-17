// Configuration
let CONTRACT_ADDRESS = checkUrlContract() || '0xE12d50b06Ea692d69d61163947565A29a471d0e2';

const CONTRACT_ABI = [
    {
        "inputs": [],
        "name": "getContractInfo",
        "outputs": [
            {"internalType": "address", "name": "_landlord", "type": "address"},
            {"internalType": "address", "name": "_tenant", "type": "address"},
            {"internalType": "address", "name": "_arbiter", "type": "address"},
            {"internalType": "uint256", "name": "_monthlyRent", "type": "uint256"},
            {"internalType": "uint256", "name": "_deposit", "type": "uint256"},
            {"internalType": "uint256", "name": "_durationMonths", "type": "uint256"},
            {"internalType": "enum SecureRentalContract.ContractStatus", "name": "_status", "type": "uint8"},
            {"internalType": "bool", "name": "_isActive", "type": "bool"},
            {"internalType": "bool", "name": "_isDisputeActive", "type": "bool"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPaymentInfo",
        "outputs": [
            {"internalType": "uint256", "name": "_paidMonths", "type": "uint256"},
            {"internalType": "uint256", "name": "_remainingMonths", "type": "uint256"},
            {"internalType": "uint256", "name": "_contractBalance", "type": "uint256"},
            {"internalType": "uint256", "name": "_availableBalance", "type": "uint256"},
            {"internalType": "uint256", "name": "_nextPaymentDue", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "landlord",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tenant",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "arbiter",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paidMonths",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "uint256", "name": "_durationMonths", "type": "uint256"},
            {"internalType": "string", "name": "_description", "type": "string"}
        ],
        "name": "placeOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "uint256", "name": "_monthlyRent", "type": "uint256"},
            {"internalType": "uint256", "name": "_deposit", "type": "uint256"}
        ],
        "name": "setPrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "payDeposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "startContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "processMonthlyPayment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "raiseDispute",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "uint256", "name": "_landlordSharePercent", "type": "uint256"}
        ],
        "name": "resolveDispute",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "topUpBalance",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "completeContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "tenant", "type": "address"},
            {"indexed": false, "internalType": "uint256", "name": "durationMonths", "type": "uint256"},
            {"indexed": false, "internalType": "string", "name": "description", "type": "string"}
        ],
        "name": "OrderSent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": false, "internalType": "uint256", "name": "monthlyRent", "type": "uint256"},
            {"indexed": false, "internalType": "uint256", "name": "deposit", "type": "uint256"}
        ],
        "name": "PriceSent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "tenant", "type": "address"},
            {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "DepositPaid",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": false, "internalType": "uint256", "name": "startTime", "type": "uint256"}
        ],
        "name": "ContractStarted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": false, "internalType": "uint256", "name": "month", "type": "uint256"},
            {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "MonthlyPaymentProcessed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "raisedBy", "type": "address"},
            {"indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256"}
        ],
        "name": "DisputeRaised",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": false, "internalType": "uint256", "name": "landlordShare", "type": "uint256"},
            {"indexed": false, "internalType": "uint256", "name": "tenantShare", "type": "uint256"}
        ],
        "name": "DisputeResolved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "recipient", "type": "address"},
            {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "FundsWithdrawn",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": false, "internalType": "uint256", "name": "depositReturned", "type": "uint256"}
        ],
        "name": "ContractCompleted",
        "type": "event"
    }
];

// State
let account = '';
let contract = null;
let role = '';
let contractInfo = null;
let activeTab = 'dashboard';
let transactionHistory = [];


function loadHistoryFromStorage() {
    const storageKey = `rentchain_history_${CONTRACT_ADDRESS}`;
    const stored = {};
    try {
        const item = localStorage.getItem(storageKey);
        if (item) Object.assign(stored, JSON.parse(item));
    } catch (e) {
        console.warn('Could not load history:', e);
    }
    transactionHistory = stored.history || [];
}

// Save history to memory storage
function saveHistoryToStorage() {
    const storageKey = `rentchain_history_${CONTRACT_ADDRESS}`;
    try {
        localStorage.setItem(storageKey, JSON.stringify({ history: transactionHistory }));
    } catch (e) {
        console.warn('Could not save history:', e);
    }
}

function safeBigNumberToString(bn) {
    if (!bn) return '0';
    try {
        return bn.toString();
    } catch (e) {
        return '0';
    }
}

function safeToNumber(bn) {
    if (!bn) return 0;
    try {
        const str = safeBigNumberToString(bn);
        return parseInt(str);
    } catch (e) {
        return 0;
    }
}

function addToHistory(type, description, txHash = '') {
    const timestamp = new Date().toLocaleString('lt-LT');
    transactionHistory.unshift({
        type,
        description,
        timestamp,
        txHash
    });
    saveHistoryToStorage();
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyContainer = document.getElementById('history-list');
    if (!historyContainer) return;
    
    if (transactionHistory.length === 0) {
        historyContainer.innerHTML = `
            <div class="text-center py-12 text-gray-500">
                <i data-lucide="inbox" class="w-12 h-12 mx-auto mb-4 opacity-50"></i>
                <p>Nėra įvykdytų veiksmų</p>
            </div>
        `;
    } else {
        historyContainer.innerHTML = transactionHistory.map(item => `
            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div class="flex items-start justify-between gap-4">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <i data-lucide="${getIconForType(item.type)}" class="w-5 h-5 text-[#016B61]"></i>
                            <span class="font-semibold text-[#016B61]">${item.type}</span>
                        </div>
                        <p class="text-gray-700 mb-2">${item.description}</p>
                        <p class="text-sm text-gray-500">${item.timestamp}</p>
                        ${item.txHash ? `
                            <a href="https://sepolia.etherscan.io/tx/${item.txHash}" target="_blank" 
                               class="text-xs text-[#70B2B2] hover:underline flex items-center gap-1 mt-2">
                                <i data-lucide="external-link" class="w-3 h-3"></i>
                                Peržiūrėti Etherscan
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    setTimeout(() => lucide.createIcons(), 100);
}

function getIconForType(type) {
    const icons = {
        'Užsakymas': 'file-text',
        'Kaina': 'dollar-sign',
        'Užstatas': 'shield',
        'Sutartis pradėta': 'play-circle',
        'Mėnesinis mokėjimas': 'credit-card',
        'Ginčas': 'alert-circle',
        'Ginčo sprendimas': 'scale',
        'Išsiėmimas': 'wallet',
        'Papildymas': 'plus-circle',
        'Užbaigimas': 'check-circle'
    };
    return icons[type] || 'activity';
}
function checkUrlContract() {
    const urlParams = new URLSearchParams(window.location.search);
    const contractFromUrl = urlParams.get('contract');
    
    if (contractFromUrl && /^0x[a-fA-F0-9]{40}$/.test(contractFromUrl)) {
        return contractFromUrl;
    }
    return null;
}


window.addEventListener('load', async () => {
    lucide.createIcons();
    loadHistoryFromStorage();
    updateHistoryDisplay();
    await checkWalletConnection();
});

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const messageEl = document.getElementById('notification-message');
    
    messageEl.textContent = message;
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg animate-slide-in text-white ${
        type === 'success' ? 'bg-[#016B61]' : 'bg-red-500'
    }`;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 5000);
    
    setTimeout(() => lucide.createIcons(), 100);
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function setActiveTab(tab) {
    activeTab = tab;
    
    ['dashboard', 'actions', 'info', 'history'].forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        if (btn) {
            if (t === tab) {
                btn.className = 'px-4 py-2 rounded-lg font-medium transition-all bg-[#016B61] text-white shadow-lg';
            } else {
                btn.className = 'px-4 py-2 rounded-lg font-medium transition-all text-gray-700 hover:bg-[#E5E9C5]';
            }
        }
    });
    
    document.getElementById('content-dashboard').classList.toggle('hidden', tab !== 'dashboard');
    document.getElementById('content-actions').classList.toggle('hidden', tab !== 'actions');
    document.getElementById('content-info').classList.toggle('hidden', tab !== 'info');
    document.getElementById('content-history').classList.toggle('hidden', tab !== 'history');


    if (tab === 'history') {
        loadHistoryFromBlockchain();
    }
}


async function checkWalletConnection() {
    if (typeof window.ethereum === 'undefined') return;
    
    try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            account = accounts[0];
            await initContract();
        }
    } catch (error) {
        console.error('Error checking wallet:', error);
    }
}

async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        showNotification('MetaMask nerastas! Prašome įdiegti MetaMask plėtinį.', 'error');
        setTimeout(() => window.open('https://metamask.io/download/', '_blank'), 2000);
        return;
    }

    try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        
        if (chainId !== '0xaa36a7') {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0xaa36a7' }],
                });
            } catch (switchError) {
                showNotification('Nepavyko perjungti tinklo. Perjunkite rankiniu būdu į Sepolia.', 'error');
                return;
            }
        }
        
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        account = accounts[0];
        await initContract();
        showNotification('Piniginė sėkmingai prijungta!');
        
    } catch (error) {
        if (error.code === 4001) {
            showNotification('Jūs atmetėte prisijungimo užklausą', 'error');
        } else {
            showNotification('Klaida: ' + (error.message || 'Nepavyko prijungti piniginės'), 'error');
        }
    }
}

async function initContract() {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        
        if (network.chainId !== 11155111) {
            showNotification('Blogas tinklas! Naudokite Sepolia (chainId: 11155111)', 'error');
            return;
        }
        
        const signer = provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        
        const landlord = await contract.landlord();
        const tenant = await contract.tenant();
        const arbiter = await contract.arbiter();
        
        if (account.toLowerCase() === landlord.toLowerCase()) {
            role = 'landlord';
        } else if (account.toLowerCase() === tenant.toLowerCase()) {
            role = 'tenant';
        } else if (account.toLowerCase() === arbiter.toLowerCase()) {
            role = 'arbiter';
        } else {
            role = 'unknown';
            showNotification('Įspėjimas: Jūsų paskyra nėra susijusi su šia sutartimi', 'error');
        }
        
        await loadContractInfo();
        updateUI();
        
    } catch (error) {
        console.error('Contract init error:', error);
        showNotification('Klaida inicializuojant sutartį: ' + error.message, 'error');
    }
}

async function loadContractInfo() {
    try {
        const info = await contract.getContractInfo();
        
        contractInfo = {
            landlord: info._landlord,
            tenant: info._tenant,
            arbiter: info._arbiter,
            monthlyRent: ethers.utils.formatEther(info._monthlyRent),
            deposit: ethers.utils.formatEther(info._deposit),
            durationMonths: safeToNumber(info._durationMonths),
            status: info._status,
            isActive: info._isActive,
            isDisputeActive: info._isDisputeActive,
            paidMonths: 0
        };
        
        try {
            const paidMonths = await contract.paidMonths();
            contractInfo.paidMonths = safeToNumber(paidMonths);
        } catch (e) {
            console.warn('Could not load paidMonths:', e);
        }
        
        updateDashboard();
        updateActions();
    } catch (error) {
        console.error('Error loading contract info:', error);
        showNotification('Klaida kraunant sutarties informaciją: ' + error.message, 'error');
    }
}

function updateUI() {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    
    document.getElementById('wallet-connect-btn').classList.add('hidden');
    document.getElementById('wallet-connected').classList.remove('hidden');
    document.getElementById('wallet-address').textContent = 
        `${account.slice(0, 6)}...${account.slice(-4)}`;
    
    const roleText = role === 'landlord' ? 'Nuomotojas' : 
                     role === 'tenant' ? 'Nuomininkas' : 
                     role === 'arbiter' ? 'Arbitras' : 'Nežinoma';
    document.getElementById('user-role').textContent = roleText;
    
    document.getElementById('info-contract-address').textContent = CONTRACT_ADDRESS;
    
    setTimeout(() => lucide.createIcons(), 100);
}

function updateDashboard() {
    if (!contractInfo) return;
    
    const statuses = ['Užsakymas', 'Kaina', 'Sumokėta', 'Aktyvi', 'Ginčas', 'Užbaigta'];
    const colors = ['#70B2B2', '#9ECFD4', '#E5E9C5', '#016B61', '#ff6b6b', '#016B61'];
    
    const statusIndex = Math.min(contractInfo.status, statuses.length - 1);
    
    document.getElementById('status-dot').style.backgroundColor = colors[statusIndex];
    document.getElementById('status-text').textContent = statuses[statusIndex];
    document.getElementById('status-text').style.color = colors[statusIndex];
    
    document.getElementById('monthly-rent').textContent = `${contractInfo.monthlyRent} ETH`;
    document.getElementById('deposit-amount').textContent = `${contractInfo.deposit} ETH`;
    document.getElementById('duration-months').textContent = `${contractInfo.durationMonths} mėn.`;
    document.getElementById('paid-months').textContent = 
        `${contractInfo.paidMonths}/${contractInfo.durationMonths}`;
}

function updateActions() {
    if (!contractInfo) return;
    
    // Hide all first
    ['action-place-order', 'action-set-price', 'action-pay-deposit', 
     'action-start-contract', 'action-process-payment', 'action-tenant-payment',
     'action-common', 'action-arbiter'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    
    // Status 0 = OrderPlaced
    if (contractInfo.status === 0) {
        if (role === 'tenant') {
            document.getElementById('action-place-order')?.classList.remove('hidden');
        }
        if (role === 'landlord') {
            document.getElementById('action-set-price')?.classList.remove('hidden');
        }
    }
    
    // Status 1 = PriceSet
    if (contractInfo.status === 1) {
        if (role === 'tenant') {
            const payDeposit = document.getElementById('action-pay-deposit');
            payDeposit?.classList.remove('hidden');
            document.getElementById('pay-monthly-rent').textContent = `${contractInfo.monthlyRent} ETH`;
            document.getElementById('pay-deposit-amount').textContent = `${contractInfo.deposit} ETH`;
            const total = (parseFloat(contractInfo.monthlyRent) + parseFloat(contractInfo.deposit)).toFixed(4);
            document.getElementById('pay-total').textContent = `${total} ETH`;
        }
    }
    
    // Status 2 = DepositPaid
    if (contractInfo.status === 2) {
        if (role === 'landlord') {
            document.getElementById('action-start-contract')?.classList.remove('hidden');
        }
    }
    
    if (contractInfo.status === 3) {
        // NUOMININKUI - monthly payment option
        if (role === 'tenant') {
            document.getElementById('action-tenant-payment')?.classList.remove('hidden');
            document.getElementById('tenant-next-payment').textContent = contractInfo.monthlyRent + ' ETH';
            
            // Patikrinti ar jau laikas mokėti
            checkPaymentDue();
        }
        
        // NUOMOTOJUI - tik withdraw ir dispute
        if (role === 'landlord' || role === 'tenant') {
            document.getElementById('action-common')?.classList.remove('hidden');
        }
    }
    
    // Status 4 = DisputeActive - Show arbiter resolution
    if (contractInfo.status === 4) {
        if (role === 'arbiter') {
            document.getElementById('action-arbiter')?.classList.remove('hidden');
        }
    }
    
 // Status 5 = Completed - withdrawal option for all parties
    if (contractInfo.status === 5) {
        const commonActions = document.getElementById('action-common');
        if (commonActions) {
            commonActions.classList.remove('hidden');
            // Hide dispute option when completed
            const disputeSection = document.getElementById('dispute-section');
            if (disputeSection) disputeSection.style.display = 'none';
        }
    }
}
async function checkPaymentDue() {
    if (!contract) return;
    
    try {
        const isDue = await contract.isPaymentDue();
        const payButton = document.querySelector('#action-tenant-payment button');
        
        if (isDue) {
            payButton.disabled = false;
            payButton.classList.remove('opacity-50', 'cursor-not-allowed');
            document.getElementById('payment-status').textContent = '⚠️ Mokėjimas vėluoja!';
            document.getElementById('payment-status').className = 'text-red-600 font-semibold';
        } else {
            payButton.disabled = true;
            payButton.classList.add('opacity-50', 'cursor-not-allowed');
            document.getElementById('payment-status').textContent = '✓ Mokėjimas atliktas';
            document.getElementById('payment-status').className = 'text-green-600 font-semibold';
        }
    } catch (error) {
        console.error('Error checking payment:', error);
    }
}
async function placeOrder() {
    if (!contract) return;
    
    const months = document.getElementById('order-months').value;
    const description = document.getElementById('order-description').value;
    
    if (!months || months < 1) {
        showNotification('Įveskite teisingą mėnesių skaičių', 'error');
        return;
    }
    
    try {
        const tx = await contract.placeOrder(months, description);
        await tx.wait();
        showNotification('Užsakymas pateiktas sėkmingai!');
        addToHistory('Užsakymas', `Pateiktas užsakymas ${months} mėnesiams`, tx.hash);
        await loadContractInfo();
    } catch (error) {
        showNotification('Klaida pateikiant užsakymą: ' + error.message, 'error');
    }
}

async function setPrice() {
    if (!contract) return;
    
    const rent = document.getElementById('price-rent').value;
    const deposit = document.getElementById('price-deposit').value;
    
    if (!rent || !deposit || rent <= 0 || deposit <= 0) {
        showNotification('Įveskite teisingas kainas', 'error');
        return;
    }
    
    try {
        const rentWei = ethers.utils.parseEther(rent);
        const depositWei = ethers.utils.parseEther(deposit);
        const tx = await contract.setPrice(rentWei, depositWei);
        await tx.wait();
        showNotification('Kaina nustatyta sėkmingai!');
        addToHistory('Kaina', `Nustatyta: ${rent} ETH/mėn, užstatas ${deposit} ETH`, tx.hash);
        await loadContractInfo();
    } catch (error) {
        showNotification('Klaida nustatant kainą: ' + error.message, 'error');
    }
}

async function payDeposit() {
    if (!contract || !contractInfo) return;
    
    try {
        const totalAmount = ethers.utils.parseEther(
            (parseFloat(contractInfo.monthlyRent) + parseFloat(contractInfo.deposit)).toString()
        );
        const tx = await contract.payDeposit({ value: totalAmount });
        await tx.wait();
        showNotification('Mokėjimas atliktas sėkmingai!');
        addToHistory('Užstatas', `Sumokėta: ${(parseFloat(contractInfo.monthlyRent) + parseFloat(contractInfo.deposit)).toFixed(4)} ETH`, tx.hash);
        await loadContractInfo();
    } catch (error) {
        showNotification('Klaida atliekant mokėjimą: ' + error.message, 'error');
    }
}

async function startContract() {
    if (!contract) return;
    
    try {
        const tx = await contract.startContract();
        await tx.wait();
        showNotification('Sutartis pradėta!');
        addToHistory('Sutartis pradėta', 'Nuomos sutartis oficialiai pradėta', tx.hash);
        await loadContractInfo();
    } catch (error) {
        showNotification('Klaida pradedant sutartį: ' + error.message, 'error');
    }
}

async function payMonthlyRent() {
    if (!contract || !contractInfo) return;
    
    try {
        const rentAmount = ethers.utils.parseEther(contractInfo.monthlyRent);
        
        showNotification('Siunčiamas mėnesinis mokėjimas...');
        
        // Nuomininkas siunčia ETH tiesiogiai
        const tx = await contract.topUpBalance({ value: rentAmount });
        await tx.wait();
        
        // Po sėkmingo top-up, process payment
        const tx2 = await contract.processMonthlyPayment();
        await tx2.wait();
        
        showNotification('Mėnesinis mokėjimas atliktas!');
        addToHistory('Mėnesinis mokėjimas', `Sumokėta: ${contractInfo.monthlyRent} ETH`, tx2.hash);
        await loadContractInfo();
        
    } catch (error) {
        showNotification('Klaida mokant: ' + error.message, 'error');
    }
}

async function raiseDispute() {
    if (!contract) return;
    
    const reason = document.getElementById('dispute-reason').value;
    if (!reason) {
        showNotification('Įveskite ginčo priežastį', 'error');
        return;
    }
    
    try {
        const tx = await contract.raiseDispute();
        await tx.wait();
        showNotification('Ginčas pateiktas!');
        addToHistory('Ginčas', `Priežastis: ${reason}`, tx.hash);
        await loadContractInfo();
        document.getElementById('dispute-reason').value = '';
    } catch (error) {
        showNotification('Klaida pateikiant ginčą: ' + error.message, 'error');
    }
}
async function resolveDispute() {
    if (!contract || role !== 'arbiter') return;
    
    const landlordShare = document.getElementById('landlord-share').value;
    if (!landlordShare || landlordShare < 0 || landlordShare > 100) {
        showNotification('Įveskite teisingą procentą (0-100)', 'error');
        return;
    }
    
    try {
        const tx = await contract.resolveDispute(landlordShare);
        await tx.wait();
        showNotification('Ginčas išspręstas!');
        addToHistory('Ginčo sprendimas', `Nuomotojui: ${landlordShare}%, Nuomininkui: ${100 - landlordShare}%`, tx.hash);
        await loadContractInfo();
    } catch (error) {
        showNotification('Klaida sprendžiant ginčą: ' + error.message, 'error');
    }
}

async function withdraw() {
    if (!contract) return;
    
    try {
        const tx = await contract.withdraw();
        await tx.wait();
        showNotification('Lėšos išimtos sėkmingai!');
        addToHistory('Išsiėmimas', 'Lėšos pervestos į piniginę', tx.hash);
    } catch (error) {
        showNotification('Klaida išimant lėšas: ' + error.message, 'error');
    }
}
function openDeployModal() {
    document.getElementById('deploy-modal').classList.remove('hidden');
    setTimeout(() => lucide.createIcons(), 100);
}

function closeDeployModal() {
    document.getElementById('deploy-modal').classList.add('hidden');
}

function openRemix() {
    const tenant = document.getElementById('deploy-tenant').value;
    const arbiter = document.getElementById('deploy-arbiter').value;
    
    if (tenant && arbiter) {
        // Save to memory for later use
        memoryStorage.deployParams = { tenant, arbiter };
        showNotification('Adresai išsaugoti. Grįžkite po deploy!');
    }
    
    window.open('https://remix.ethereum.org/', '_blank');
}

async function switchContract() {
    const newAddress = document.getElementById('new-contract-address').value.trim();
    
    if (!newAddress || !ethers.utils.isAddress(newAddress)) {
        showNotification('Neteisingas contract adresas!', 'error');
        return;
    }
    
    // Update global CONTRACT_ADDRESS (būtų geriau naudoti let vietoj const)
    // Bet kadangi jis const, turime perkrauti su nauju adresu
    const currentUrl = window.location.href.split('?')[0];
    window.location.href = `${currentUrl}?contract=${newAddress}`;
}

async function quickSwitchContract() {
    const newAddress = document.getElementById('switch-contract-input').value.trim();
    
    if (!newAddress || !ethers.utils.isAddress(newAddress)) {
        showNotification('Neteisingas contract adresas!', 'error');
        return;
    }
    
    const currentUrl = window.location.href.split('?')[0];
    window.location.href = `${currentUrl}?contract=${newAddress}`;
}

// Patikrinti ar URL turi contract parametrą
function checkUrlContract() {
    const urlParams = new URLSearchParams(window.location.search);
    const contractFromUrl = urlParams.get('contract');
    
    if (contractFromUrl && ethers.utils.isAddress(contractFromUrl)) {
        // Atnaujinti CONTRACT_ADDRESS jei galima
        showNotification('Naudojamas contract: ' + contractFromUrl.slice(0, 10) + '...');
        return contractFromUrl;
    }
    
    return null;
}
async function loadHistoryFromBlockchain() {
    if (!contract) return;

    const historyContainer = document.getElementById('history-list');
    historyContainer.innerHTML = '<div class="text-center py-8 text-gray-500"><p>Kraunama...</p></div>';

    try {
        // Gauti visus eventus
        const events = [
            { filter: contract.filters.OrderSent(), name: 'Užsakymas', icon: 'file-text' },
            { filter: contract.filters.PriceSent(), name: 'Kaina', icon: 'dollar-sign' },
            { filter: contract.filters.DepositPaid(), name: 'Užstatas', icon: 'shield' },
            { filter: contract.filters.ContractStarted(), name: 'Sutartis pradėta', icon: 'play-circle' },
            { filter: contract.filters.MonthlyPaymentProcessed(), name: 'Mėnesinis mokėjimas', icon: 'credit-card' },
            { filter: contract.filters.DisputeRaised(), name: 'Ginčas', icon: 'alert-circle' },
            { filter: contract.filters.DisputeResolved(), name: 'Ginčo sprendimas', icon: 'scale' },
            { filter: contract.filters.FundsWithdrawn(), name: 'Išsiėmimas', icon: 'wallet' },
            { filter: contract.filters.ContractCompleted(), name: 'Užbaigimas', icon: 'check-circle' }
        ];

        let allLogs = [];

        for (const event of events) {
            try {
                const logs = await contract.queryFilter(event.filter, 0, 'latest');
                logs.forEach(log => {
                    log.eventName = event.name;
                    log.eventIcon = event.icon;
                });
                allLogs = allLogs.concat(logs);
            } catch (e) {
                console.warn(`Could not load ${event.name}:`, e);
            }
        }

        // Rūšiuoti pagal bloką (naujausias viršuje)
        allLogs.sort((a, b) => b.blockNumber - a.blockNumber);

        if (allLogs.length === 0) {
            historyContainer.innerHTML = `
                <div class="text-center py-12 text-gray-500">
                    <i data-lucide="inbox" class="w-12 h-12 mx-auto mb-4 opacity-50"></i>
                    <p>Nėra įvykdytų veiksmų</p>
                </div>
            `;
            setTimeout(() => lucide.createIcons(), 100);
            return;
        }

        // Atvaizduoti visus eventus
        historyContainer.innerHTML = allLogs.map(log => {
            const block = log.blockNumber;
            const txHash = log.transactionHash;
            
            return `
                <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                    <div class="flex items-start justify-between gap-4">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-2">
                                <i data-lucide="${log.eventIcon}" class="w-5 h-5 text-[#016B61]"></i>
                                <span class="font-semibold text-[#016B61]">${log.eventName}</span>
                            </div>
                            <p class="text-sm text-gray-600 mb-2">Blokas: ${block}</p>
                            <a href="https://sepolia.etherscan.io/tx/${txHash}" target="_blank" 
                               class="text-xs text-[#70B2B2] hover:underline flex items-center gap-1">
                                <i data-lucide="external-link" class="w-3 h-3"></i>
                                Peržiūrėti Etherscan
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        setTimeout(() => lucide.createIcons(), 100);

    } catch (error) {
        console.error('Error loading history:', error);
        historyContainer.innerHTML = `
            <div class="text-center py-8 text-red-500">
                <p>Klaida kraunant istoriją: ${error.message}</p>
            </div>
        `;
    }
}