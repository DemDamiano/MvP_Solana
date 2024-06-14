// src/WalletBalance.js
import React, { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

const WalletBalance = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');

  const getBalance = async () => {
    try {
      setError('');
      const connection = new Connection('https://api.mainnet-beta.solana.com', 'finalized');
      const publicKey = new PublicKey(address);
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / 1000000000); // Converti da lamport a SOL
    } catch (e) {
      setError('Invalid address or network error');
      setBalance(null);
    }
  };

  return (
    <div>
      <h2>Check Wallet Balance</h2>
      <input 
        type="text" 
        placeholder="Enter wallet address" 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
      />
      <button onClick={getBalance}>Get Balance</button>
      {balance !== null && <p>Balance: {balance} SOL</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default WalletBalance;
