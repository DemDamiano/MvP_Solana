import { Router } from 'express';
import { postSensorData } from '../controllers/sensor-controller';

const sensorRouter = Router();

sensorRouter.post("/", postSensorData);

export default sensorRouter;
