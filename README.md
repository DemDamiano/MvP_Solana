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
