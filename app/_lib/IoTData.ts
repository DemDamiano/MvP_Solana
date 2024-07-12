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

export function isIoTData(obj: unknown): obj is IoTData {
    return (
        obj !== null &&
        typeof obj === 'object' &&
        'id' in obj &&
        typeof obj['id'] === 'string' &&
        'machine_id' in obj &&
        typeof obj['machine_id'] === 'string'
    );
}

export interface IoTMachine {
    id: string,
    publicKey: string
}