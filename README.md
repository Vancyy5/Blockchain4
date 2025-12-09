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

# Technologijos Remix

- Solidity: ^0.8.20
- OpenZeppelin: ReentrancyGuard, Pausable
- Network: Ethereum (Sepolia Testnet)
- IDE: Remix

# Diegimas

Remix IDE

1. Eiti į [remix.ethereum.org](remix.ethereum.org)
2. Sukurti naują failą: contracts/RentalContract.sol
3. Nukopijuoti sutarties kodą iš contract/RentalContract.sol
4. Compiler: Solidity 0.8.20+
5. Deploy su parametrais:

_tenant: 0xTenantAddress

_arbiter: 0xArbiterAddress

# Naudojimo Pavyzdys 

```
// 1. Nuomininkas užsako nuomą
await contract.placeOrder(6, "Modern apartment in Vilnius");

// 2. Nuomotojas nustato kainą
await contract.setPrice(
  ethers.utils.parseEther("1.0"),  // 1 ETH per mėnesį
  ethers.utils.parseEther("2.0")   // 2 ETH užstatas
);

// 3. Nuomininkas moka užstatą + pirmą mėnesį
await contract.payDeposit({ 
  value: ethers.utils.parseEther("3.0") 
});

// 4. Nuomotojas pradeda sutartį
await contract.startContract();

// 5. Automatiniai mėnesiniai mokėjimai
await contract.processMonthlyPayment();

// 6. Išsiimti lėšas (withdrawal pattern)
await contract.withdraw();

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

# Testavimas
Sėkmingai testavau Remix VM (Shanghai) aplinkoje su:

- Normalaus proceso scenarijumi
- Ginčo sprendimo scenarijumi
- Timeout mechanizmo testavimu
- Reentrancy apsaugos testavimu