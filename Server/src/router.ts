import { Router } from 'express';
import sensorRouter from './routes/sensor';

const router = Router();

router.use('/sensor', sensorRouter);

export default router;
