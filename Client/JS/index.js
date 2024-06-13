const express = require('express');
const axios = require('axios');
const solanaWeb3 = require('@solana/web3.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Configura la connessione a un nodo Solana
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');

// Endpoint per ottenere i dati dalla blockchain Solana
app.get('/data', async (req, res) => {
    try {
        // Esempio: Recupera il saldo di un account Solana
        const publicKey = new solanaWeb3.PublicKey('8CPEoHHzM9fGyi8ivZdR12UxQB3UqFebiigFUfVLd32c'); // Sostituisci con una chiave pubblica reale
        const balance = await connection.getBalance(publicKey);

        // Invia i dati come JSON
        res.json({ balance });
    } catch (error) {
        console.error('Errore nel recupero dei dati dalla blockchain:', error);
        res.status(500).json({ error: 'Errore interno del server' });
    }
});

// Servi l'interfaccia HTML
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
