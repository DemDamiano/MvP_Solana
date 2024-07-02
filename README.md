# MvP_Solana
Regole:
1. commitare sempre i cambiamenti
2. committare su main solo dopo aver fatto degli integration test e mergiato gli eventuali branch
3. commenti nel codice necessari quindi le sezioni salienti DEVONO essere commentate a dovere

Info:
1. ts-node Server/keyManage/keygen.ts 
2. ts-node Server/keyManage/airdrop.ts 
3. incolla il token creato dentro nel file Server/src/solana.ts -> "toPubKey" 
4. npx ts-node Server/src/index.ts

## Idee da discutere
- Fare che ogni pacchetto di dati è un Semi-Fungible Token (SFT) (token fungibile con 0 decimali, quindi non divisibile)
- Fare che ogni macchina abbia una mint authority, così ogni macchina produce dei token "diversi"
- Mi sta venendo il dubbio che dovremmo usare invece degli NFT, perché nel caso di SFT i metadata (che è dove noi dovremmo mettere i dai dei sensori) sono legati alla mint autority e non al token in sè se non ho capito male