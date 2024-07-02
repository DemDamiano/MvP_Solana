import { Connection, PublicKey, clusterApiUrl, Keypair, Transaction, SystemProgram } from '@solana/web3.js';
import fs from 'fs';
import { WALLET_PATH, CLUSTER_URL } from '../global';

const connection = new Connection(CLUSTER_URL, 'confirmed');

// Load the secret key from a JSON file (adjust the path as needed)
const secretKeyString = fs.readFileSync(WALLET_PATH, 'utf8');
const publicKeyString = '8CPEoHHzM9fGyi8ivZdR12UxQB3UqFebiigFUfVLd32c';
const recipientPublicKey = new PublicKey(publicKeyString);

// Parse the JSON string to a Uint8Array
const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
const payer = Keypair.fromSecretKey(secretKey);

export async function sendDataToSolana(sensorId: string, value: number): Promise<string> {
  const data = Buffer.from(JSON.stringify({ sensorId, value }));

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: recipientPublicKey, // Inserisci l'indirizzo pubblico del destinatario
      lamports: 1000, // Ammontare da trasferire in lamports (1 lamport = 10^-9 SOL)
    })
  );

  const signature = await connection.sendTransaction(transaction, [payer]);
  await connection.confirmTransaction(signature, 'confirmed');
  await checkTransactionStatus(signature);
  await getAccountData(recipientPublicKey); // Passare l'oggetto PublicKey
  console.log('Transaction successful with signature:', signature);
  return signature;
}

async function checkTransactionStatus(signature: string) {
  const transactionDetails = await connection.getTransaction(signature);
  if (transactionDetails) {
    console.log('Transaction details:', transactionDetails);
  } else {
    console.log('Transaction not found');
  }
}

async function getAccountData(accountPublicKey: PublicKey) {
  const accountInfo = await connection.getAccountInfo(accountPublicKey);
  if (accountInfo) {
    const data = accountInfo.data;
    // Deserializza i dati in base al formato specificato nel programma
    console.log('Account data:', data);
  } else {
    console.log('Account not found');
  }
}

// Chiamata alla funzione con l'account pubblico del programma
getAccountData(recipientPublicKey).catch(console.error);
