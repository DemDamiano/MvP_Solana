export interface IoTSensorData {
    id:string,
    type: string,
    data: Array<number>
}

export interface IoTData {
    id: string,
    machine_id: string,
    timestamp: Date,
    sensors: Array<IoTSensorData>
}