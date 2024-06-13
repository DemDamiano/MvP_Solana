import { sendDataToSolana } from "../solana";

export async function postSensorData(req, res) {
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
};