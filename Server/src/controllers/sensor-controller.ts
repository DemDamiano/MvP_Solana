import { Request, Response } from 'express';
import { sendDataToSolana } from '../solana';

export async function postSensorData(req: Request, res: Response): Promise<void> {
    try {
        const { sensorId, value } = req.body;
        console.log('Messaggio ricevuto:', req.body); // Log del messaggio ricevuto nel terminale
        if (!sensorId || !value) {
            res.status(400).json({ error: 'Missing sensorId or value' });
            return;
        }

        const transactionSignature = await sendDataToSolana(sensorId, value);
        res.status(200).json({ transactionSignature });
    } catch (error) {
        console.error('Error handling /sensor-data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
