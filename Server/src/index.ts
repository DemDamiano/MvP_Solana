import express from 'express';
import { sendDataToSolana } from './solana';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/sensor-data', async (req, res) => {
  try {
    const { sensorId, value } = req.body;
    if (!sensorId || !value) {
      return res.status(400).json({ error: 'Missing sensorId or value' });
    }

    const transactionSignature = await sendDataToSolana(sensorId, value);
    res.status(200).json({ transactionSignature });
  } catch (error) {
    console.error('Error handling /sensor-data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
