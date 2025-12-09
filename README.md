# Blockchain4

# Verslo Atvejis – Nuomos Sutarčių Valdymas

Nuomotojas išnuomoja turtą (būstą, patalpas, įrangą) nuomininkui. Nuomininkas sumoka užstatą ir įsipareigoja mokėti kas mėnesį nuomos mokestį. Nuomotojas įsipareigoja užtikrinti turto prieinamumą ir tinkamą būklę.

Tradiciniame rinkoje šalys pasitiki viena kita per sutartis ir teisinius įsipareigojimus. Nuomininkas rizikuoja, kad negaus užstato atgal, o nuomotojas - kad negaus mokėjimų laiku. Jei nėra pasitikėjimo, šalys gali reikalauti papildomų garantijų ar tarpininkų. Tai neleidžia efektyviai konkuruoti dėl geriausių kainų ir sąlygų.

Kai kyla ginčai dėl turto būklės ar mokėjimų, reikalingas neutralus arbitras, kuris gali išspręsti konfliktą sąžiningai. Tradicinė arbitražo sistema yra brangi ir lėta.

# Supaprastinimas
Smulkiausias nuomos transakcijos elementas susideda iš trijų dalių: nuomotojas, turtas ir nuomininkas. Paprasčiausias procesas yra turto naudojimo teisių perdavimas mainais į mokėjimą, nuo nuomotojo nuomininkui.

Galime vadinti šį modelį: nuoma-turto-iš-nuomotojo arba rentprop


nuoma-turto-iš-nuomotojo verslo modelis
![Verslo modelis](<modeliai/verslomodelis.drawio.png>)

# Pavyzdžiai pagal rentprop modelį:

B2C — būstas: Jokūbas ieško buto nuomai Vilniuje. Jis randa tinkamą per platformą, susisiekia su nuomotoja Lina ir sutaria dėl sąlygų. Šiame pavyzdyje „Jonas“ yra nuomininkas, „butas“ yra turtas, o „Petras“ yra nuomotojas. Kol Jonas nesumoka užstato ir pirmo mėnesio nuomos, Petras išlaiko visas teises į butą. Po apmokėjimo naudojimo teisės perduodamos Jonui.

B2B — patalpos: „TechStart“ - jauna IT įmonė ieško biuro patalpų. „CitySpaces“ siūlo modernų biurą centre. „TechStart“ sumoka užstatą už 2 mėnesius ir įsipareigoja mokėti kas mėnesį nuomos mokestį. Šiame pavyzdyje „TechStart“ yra nuomininkas, „biuro patalpos“ yra turtas, o „CitySpaces“ yra nuomotojas.

C2C — įranga: Greta turi profesionalų foto aparatą, kurį naudoja retai. Ji nusprendžia jį išnuomoti per platformą. Mantas nori fotografuoti vestuves ir jam reikia aparato savaitei. Jis sumoka užstatą ir savaitės nuomos mokestį. „Mantas“ yra nuomininkas, „foto aparatas“ yra turtas, o „Greta“ yra nuomotoja.

B2B — įranga: Statybų įmonė „GrindCo“ reikalinga krautuvo vienai dienai. Įrangos nuomos įmonė „EquipRent“ turi tinkamą kraututvą. „GrindCo“ sumoka užstatą ir dienos nuomos mokestį. Po darbo pabaigos, jei įranga grąžinta nesugedusi, užstatas grąžinamas automatiškai.

# (Išmanusis) Sprendimas
Kaip matėme verslo atvejo skyriuje, pasitikėjimas tarp šalių yra pagrindinis tradicinio verslo rūpestis. Šio koncepcijos įrodymo tikslas - sukurti be pasitikėjimo sandorių sistemą tarp šalių, naudojant išmaniąją sutartį Ethereum blokų grandinės tinkle.


Srautų diagrama su išmaniąja sutartimi
![Srauto diagramos modelis](<modeliai/srautu diagrama.drawio.png>)

Aprašytas įvykių srautas:

1. Nuomotojas diegia išmaniąją sutartį specialiai Nuomininko paskyriai.
2. Nuomininkas užsako turto nuomą su nurodyta trukme (pvz., 6 mėnesiams) išmaniojoje sutartyje. Per įvykį order_sent nuomotojas gauna užsakymo duomenis ir gali juos apdoroti.
3. Nuomotojas nustato nuomos kainą (mėnesinį mokestį) ir užstato dydį. Nuomotojas išsiunčia kainos pasiūlymą, o Nuomininkas jį gauna per įvykį price_sent.
4. Nuomininkas atlieka saugų mokėjimą: užstatas + pirmo mėnesio nuoma. Šie kriptovaliutų vienetai patenka į išmaniosios sutarties paskyrą ir ten laukia.
5. Nuomotojas patvirtina sutarties pradžią ir perduoda turto naudojimo teises. Nuomininkas gauna patvirtinimą per įvykį contract_started.
6. Išmanioji sutartis automatiškai kiekvieną mėnesį išskaičiuoja nuomos mokestį iš nuomininko paskyros ir perveda nuomotojui.
7. Jei kyla ginčas, bet kuri šalis gali aktyvuoti Arbitrą. Arbitras išnagrinėja situaciją ir priima sprendimą.
8. Sutarčiai pasibaigus, jei nėra žalos ar neišspręstų ginčų, Išmanioji sutartis automatiškai grąžina užstatą Nuomininkui. Jei arbitras nusprendžia, kad yra žala, Išmanioji sutartis padalina užstatą tarp Nuomotojo (kompensacijai) ir Nuomininko (likutis).
9. Startis uždaroma

# Pagrindinės Savybės

- Be pasitikėjimo: Sutartis vykdoma automatiškai, nereikia pasitikėti kita šalimi
- Skaidrumas: Visos transakcijos matomos blokų grandinėje
- Automatizacija: Mėnesiniai mokėjimai vyksta automatiškai
- Ginčų sprendimas: Integruotas arbitražo mechanizmas
- Užstato apsauga: Užstatas grąžinamas automatiškai arba paskirstomas pagal arbitro sprendimą

# Techniniai Aspektai
Išmanioji sutartis Ethereum tinkle užtikrina:

- Saugų lėšų laikymą
- Automatinį mokėjimų vykdymą
- Nepriklausomą ginčų sprendimo procesą
- Skaidrų auditą visiems dalyviams

# Technologijos 

## Vystymo Aplinka

- **Solidity:** ^0.8.20
- **OpenZeppelin:** ReentrancyGuard (v5.x)
- **Truffle Suite:** v5.11.5
- **Ganache:** v7.9.1 (lokalus tesavimo tinklas)
- **Node.js:** v18.20.8 LTS
- **IDE:** VS Code / Remix

## Alternatyvios Aplinkos
- **Remix IDE:** Online vystymo aplinka (remix.ethereum.org)

# Diegimas ir Paleidimas

## 1. Aplinkos Paruošimas

### Reikalingos programos:
- Node.js v18.x LTS: https://nodejs.org/
- Git: https://git-scm.com/

### Projekto klonavimas:
```bash
git clone <repository-url>
cd Blockchain4
```

### Priklausomybių instaliavimas:
```bash
npm install
npm install @openzeppelin/contracts
```

### Truffle instaliavimas globaliai:
```bash
npm install -g truffle
```

### Ganache instaliavimas:
```bash
npm install -g ganache
```

## 2. Lokalaus Blockchain Tinklo Paleidimas

### TERMINALAS 1 - Ganache (turi būti paleistas visą laiką kitame ternimanale):
```bash
ganache --port 8545 --chain.networkId 1337 --wallet.accounts 10
```

## 3. Sutarties Kompiliavimas ir Deployment

### TERMINALAS 2 - Darbo terminalas:

```bash
# Eikite į projekto aplanką
cd C:\...\Blockchain4

# Išvalykite ankstesnį build (jei reikia)
rmdir /s /q build    # Windows
# arba
rm -rf build         # Linux/Mac

# Kompiliuokite sutartis
truffle compile

# Deploy į lokalų tinklą
truffle migrate --network development

# Arba reset (jei reikia iš naujo)
truffle migrate --reset --network development
```

## 4. Testavimas

### Automatiniai testai:
```bash
truffle test
```

### Interaktyvi konsolė:
```bash
truffle console --network development
```

Konsolėje galite vykdyti komandas:
```javascript
// Gauti deployed sutartį
let contract = await SecureRentalContract.deployed()

// Gauti accounts
let accounts = await web3.eth.getAccounts()

// Patikrinti landlord
let landlord = await contract.landlord()
console.log("Landlord:", landlord)

// Nuomininkas užsako nuomą
await contract.placeOrder(12, "Modernus butas Vilniuje", {from: accounts[1]})

// Nuomotojas nustato kainą
await contract.setPrice(
  web3.utils.toWei("1", "ether"),  // 1 ETH/mėn
  web3.utils.toWei("2", "ether"),  // 2 ETH užstatas
  {from: accounts[0]}
)

// Nuomininkas moka
let totalPayment = web3.utils.toWei("3", "ether")
await contract.payDeposit({from: accounts[1], value: totalPayment})

// Pradėti sutartį
await contract.startContract({from: accounts[0]})

// Patikrinti sutarties būklę
let info = await contract.getContractInfo()
console.log("Status:", info._status.toString())
console.log("Is Active:", info._isActive)

// Išeiti
.exit
```

## Remix IDE (Alternatyva)

1. Eiti į [remix.ethereum.org](remix.ethereum.org)
2. Sukurti naują failą: contracts/RentalContract.sol
3. Nukopijuoti sutarties kodą iš contract/RentalContract.sol
4. Compiler: Solidity 0.8.20+
5. Deploy su parametrais:

_tenant: 0xTenantAddress

_arbiter: 0xArbiterAddress

# Naudojimo Pavyzdys

## JavaScript (Truffle Console):

```javascript
// 1. Nuomininkas užsako nuomą
await contract.placeOrder(6, "Modern apartment in Vilnius", {from: tenant});

// 2. Nuomotojas nustato kainą
await contract.setPrice(
  web3.utils.toWei("1.0", "ether"),  // 1 ETH per mėnesį
  web3.utils.toWei("2.0", "ether"),  // 2 ETH užstatas
  {from: landlord}
);

// 3. Nuomininkas moka užstatą + pirmą mėnesį
await contract.payDeposit({ 
  from: tenant,
  value: web3.utils.toWei("3.0", "ether")
});

// 4. Nuomotojas pradeda sutartį
await contract.startContract({from: landlord});

// 5. Automatiniai mėnesiniai mokėjimai (po 30 dienų)
await contract.processMonthlyPayment();

// 6. Išsiimti lėšas (withdrawal pattern)
await contract.withdraw({from: landlord});

// 7. Jei kyla ginčas
await contract.raiseDispute({from: tenant});

// 8. Arbitras išsprendžia (50/50)
await contract.resolveDispute(50, {from: arbiter});

// 9. Šalys išsiima lėšas
await contract.withdraw({from: landlord});
await contract.withdraw({from: tenant});
```

## Solidity (Remix):

```solidity
// 1. Deploy su parametrais
constructor(
    0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,  // tenant
    0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2   // arbiter
)

// 2. Iškvieskite funkcijas per Remix UI
placeOrder(6, "Modern apartment")
setPrice(1000000000000000000, 2000000000000000000)  // 1 ETH, 2 ETH
payDeposit() // Su value: 3000000000000000000 (3 ETH)
startContract()
```

# Saugumo Funkcijos

- ReentrancyGuard - Apsauga nuo reentrancy atakų
- Withdrawal Pattern - Saugus lėšų išėmimas
- Checks-Effects-Interactions - Saugus state valdymas
- Access Control - Griežta prieigos kontrolė
- Pausable - Emergency pause funkcionalumas
- Dispute Timeout - 30 dienų limitas ginčams


# Sutarties Būsenos
```
OrderPlaced → PriceSet → DepositPaid → Active → Completed
                                         ↓
                                    DisputeActive
```          
```
       ┌─────────────┐
       │ OrderPlaced │ ← Deployment (Constructor)
       └──────┬──────┘
              │ placeOrder()
              ▼
       ┌─────────────┐
       │  PriceSet   │
       └──────┬──────┘
              │ payDeposit()
              ▼
       ┌─────────────┐
       │ DepositPaid │
       └──────┬──────┘
              │ startContract()
              ▼
       ┌─────────────┐    raiseDispute()    ┌───────────────┐
       │   Active    │ ───────────────────> │ DisputeActive │
       └──────┬──────┘                      └───────┬───────┘
              │                                     │
              │ processMonthlyPayment()             │ resolveDispute()
              │ (all months paid)                   │
              │                                     │
              ▼                                     ▼
       ┌─────────────────────────────────────────────┐
       │              Completed                      │
       └─────────────────────────────────────────────┘
```
## Būsenų aprašymas:

0. **OrderPlaced:** Pradinis statusas po deployment, nuomininkas gali pateikti užsakymą
1. **PriceSet:** Nuomotojas nustatė kainas, nuomininkas gali mokėti
2. **DepositPaid:** Užstatas ir pirmas mėnuo sumokėti, laukiama patvirtinimo
3. **Active:** Sutartis aktyvi, vyksta automatiniai mėnesiniai mokėjimai
4. **DisputeActive:** Vyksta ginčas, laukiama arbitro sprendimo
5. **Completed:** Sutartis užbaigta, užstatas paskirstytas

# Testavimas

## 1. Unit Testai

Sukurti automatiniai testai `test/SecureRentalContract.test.js`:

```javascript
const SecureRentalContract = artifacts.require("SecureRentalContract");

contract("SecureRentalContract", (accounts) => {
  // Test scenarios
});
```

### Paleisti testus:
```bash
truffle test
```

### Test Coverage:
- ✅ Deployment testas
- ✅ placeOrder() funkcionalumas
- ✅ setPrice() validacijos
- ✅ payDeposit() mokėjimo tikrinimas
- ✅ startContract() patvirtinimas
- ✅ processMonthlyPayment() automatika
- ✅ raiseDispute() ginčo kėlimas
- ✅ resolveDispute() arbitražas
- ✅ withdraw() pattern testavimas
- ✅ Access control modifieriai
- ✅ Edge cases ir error handling

![Testų atlikimas](<nuotraukos/image.png>)
![Testų atlikimas](<nuotraukos/Screenshot 2025-12-10 004325.png>)

## 2. Integraciniai Testai

Testuoti lokaliu Ganache tinklu su Truffle Console:

### Normalaus scenarijaus testavimas:
```bash
truffle console --network development
```

```javascript
// Pilnas workflow testas
let contract = await SecureRentalContract.deployed()
let accounts = await web3.eth.getAccounts()

// 1-9 žingsniai kaip nurodyta "Naudojimo Pavyzdys" skyriuje
```

## Remix Testavimas

Sėkmingai testavau Remix VM (Shanghai) aplinkoje:

1. **Happy Path:**
   - Deployment → Order → Price → Payment → Start → Monthly Payments → Complete
   - Rezultatas: Užstatas grąžintas tenant, visi mokėjimai landlord

2. **Ginčo Scenarijus:**
   - Active → Raise Dispute → Arbiter Resolves (50/50) → Funds Withdrawn
   - Rezultatas: Užstatas padalintas 50/50

3. **Dispute Timeout:**
   - Active → Raise Dispute → Wait 30+ days → Force Complete
   - Rezultatas: Užstatas grąžintas tenant automatiškai

4. **Reentrancy Apsauga:**
   - Bandymas atakuoti payDeposit() ir withdraw()
   - Rezultatas: Transakcija atmesta su "ReentrancyGuard" klaida

5. **Access Control:**
   - Bandymas kviesti funkcijas iš neteisingo account
   - Rezultatas: "Only landlord/tenant/arbiter" klaida

6. **Edge Cases:**
   - Neteisingi input parametrai
   - Nepakankamas balansas
   - Neteisingas contract status
   - Rezultatas: Visi atmetami su aiškiais error messages

# Problemos ir Sprendimai

1. Sena `ganache-cli` versija (v6.x) nesuderinama su Solidity 0.8.20

**Sprendimas:**
```bash
npm uninstall -g ganache-cli
npm install -g ganache
ganache --port 8545
```

2. Truffle v5.11.5 nevisiškai suderinama su Node.js v24.x

**Sprendimas:** Naudoti Node.js v18.x LTS
```bash
# Parsisiųsti ir įdiegti Node.js v18.20.8 LTS
node --version  # Patikrinti: v18.20.8
```

3. OpenZeppelin v5.x pakeitė failų struktūrą

**Sprendimas:**
```solidity
// TEISINGAI (v5.x)
import "@openzeppelin/contracts/**utils**/ReentrancyGuard.sol";

// BLOGAI 
import "@openzeppelin/contracts/**security**/ReentrancyGuard.sol";
```
4. Ganache nepaleistas arba naudoja kitą portą

**Sprendimas:**
1. Patikrinti ar Ganache veikia: `netstat -ano | findstr :8545`
2. Paleisti Ganache: `ganache --port 8545`