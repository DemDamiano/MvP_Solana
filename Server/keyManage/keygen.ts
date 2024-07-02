// keygen.ts
import { Keypair } from '@solana/web3.js';
import { writeFileSync } from 'fs';
import { WALLET_PATH } from '../global';

const keypair = Keypair.generate();
const secretKey = keypair.secretKey;
const publicKey = keypair.publicKey.toBase58();

writeFileSync(WALLET_PATH, JSON.stringify(Array.from(secretKey)));
console.log(`Public Key: ${publicKey}`);