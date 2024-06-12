import { Connection, PublicKey, clusterApiUrl, Keypair, Transaction, SystemProgram } from '@solana/web3.js';

const SOLANA_NETWORK = clusterApiUrl('devnet'); // Usa 'mainnet-beta' per la mainnet
const connection = new Connection(SOLANA_NETWORK, 'confirmed');

import fs from 'fs';

// Load the secret key from a JSON file (adjust the path as needed)
const secretKeyPath = 'wallet.json';
const secretKeyString = fs.readFileSync(secretKeyPath, 'utf8');

// Parse the JSON string to a Uint8Array
const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
const payer = Keypair.fromSecretKey(secretKey);
export async function sendDataToSolana(sensorId: string, value: number): Promise<string> {
  const data = Buffer.from(JSON.stringify({ sensorId, value }));

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: new PublicKey('8CPEoHHzM9fGyi8ivZdR12UxQB3UqFebiigFUfVLd32c'), // Inserisci l'indirizzo pubblico del destinatario
      lamports: 1000, // Ammontare da trasferire in lamports (1 lamport = 10^-9 SOL)
    })
  );

  const signature = await connection.sendTransaction(transaction, [payer]);
  await connection.confirmTransaction(signature, 'confirmed');

  console.log('Transaction successful with signature:', signature);
  return signature;
}
