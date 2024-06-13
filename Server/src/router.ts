import { Router } from "express";
import sensorRouter from "./routes/sensor";

const router = Router();

router.use("/sensors", sensorRouter);

export default router;