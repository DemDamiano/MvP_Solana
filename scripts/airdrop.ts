import "../config";
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";

import privateKey from "./machine.json";

(async function () {
    const keypair = Keypair.fromSecretKey(new Uint8Array(privateKey));
    console.log("Airdrop to", keypair.publicKey.toBase58());
    const connection = new Connection(process.env.CLUSTER_URL, "finalized");
    console.log("Current balance:", await connection.getBalance(keypair.publicKey));
    const airdropSignature = await connection.requestAirdrop(
        keypair.publicKey,
        1 * LAMPORTS_PER_SOL
    );
    console.log("Airdrop completed! TX", airdropSignature);
})();