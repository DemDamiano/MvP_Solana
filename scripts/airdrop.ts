const { Connection, Keypair, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const fs = require('fs');

const privateKey = JSON.parse(fs.readFileSync('./machine.json', 'utf8'));

(async function () {
    const keypair = Keypair.fromSecretKey(new Uint8Array(privateKey));
    console.log("Airdrop to", keypair.publicKey.toBase58());

    const connection = new Connection("https://api.devnet.solana.com", "finalized");

    console.log("Current balance:", await connection.getBalance(keypair.publicKey));
    const airdropSignature = await connection.requestAirdrop(
        keypair.publicKey,
        1 * LAMPORTS_PER_SOL
    );
    console.log("Airdrop completed! TX", airdropSignature);
})();