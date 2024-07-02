import "../config";
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as fs from 'fs';

const privateKey = JSON.parse(fs.readFileSync('./scripts/machine.json', 'utf8'));

(async function () {
    const keypair = Keypair.fromSecretKey(new Uint8Array(privateKey));
    console.log("Airdrop to", keypair.publicKey.toBase58());

    // Ensure CLUSTER_URL is defined or provide a default
    //const clusterUrl = process.env.CLUSTER_URL || 'https://api.mainnet-beta.solana.com';
    const connection = new Connection("https://api.devnet.solana.com", "finalized");

    console.log("Current balance:", await connection.getBalance(keypair.publicKey));
    const airdropSignature = await connection.requestAirdrop(
        keypair.publicKey,
        1 * LAMPORTS_PER_SOL
    );
    console.log("Airdrop completed! TX", airdropSignature);
})();
