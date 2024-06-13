// airdrop.ts
import { Connection, Keypair,LAMPORTS_PER_SOL } from '@solana/web3.js';
import { readFileSync } from 'fs';
import { WALLET_PATH, CLUSTER_URL } from '../global';

const connection = new Connection(CLUSTER_URL, "finalized");

const secretKey = Uint8Array.from(JSON.parse(readFileSync(WALLET_PATH, 'utf8')));
const keypair = Keypair.fromSecretKey(secretKey);

const airdrop = async () => {
    const signature = await connection.requestAirdrop(keypair.publicKey, 1 * LAMPORTS_PER_SOL); // 1 SOL
    console.log(`Airdrop completed: ${signature}`);
};

airdrop();