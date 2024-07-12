import "../../config";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { publicKey } from '@metaplex-foundation/umi-public-keys';
import { fetchAllDigitalAssetByCreator, fetchDigitalAssetWithAssociatedToken, fetchAllDigitalAssetWithTokenByOwner, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { IoTData, IoTMachine, isIoTData } from './IoTData';

/**
 * Loads the tokens produced by the Machine and owned by the Owner
 * @param machinePublicKey The public key of the Machine
 * @param ownerPublicKey The public key of the Owner
 * @returns A promise of an array of IoTData
 */
export async function loadTokensByMachineIdAndOwner(machinePublicKey: string, ownerPublicKey: string): Promise<IoTData[]> {
    const umi = createUmi(process.env.CLUSTER_URL, "finalized");
    umi.use(mplTokenMetadata());
    const creator = publicKey(machinePublicKey);
    const owner = publicKey(ownerPublicKey);
    console.log("Fetching assets");
    const assets = await fetchAllDigitalAssetByCreator(umi, creator);
    console.log("Fetching data");
    const data = await Promise.all(assets.map(async asset => {
        const assetWithToken = await fetchDigitalAssetWithAssociatedToken(umi, asset.mint.publicKey, owner);
        const uri = assetWithToken.metadata.uri;
        const resp = await fetch(uri, { next: { revalidate: 10 }});
        const data = await resp.json();
        return data as IoTData;
    }));
    return data;
}

export async function loadMachinesByOwner(ownerId: string): Promise<IoTMachine[]> {
    const umi = createUmi(process.env.CLUSTER_URL, "finalized");
    umi.use(mplTokenMetadata());
    const owner = publicKey(ownerId);

    const assetsWithToken = await fetchAllDigitalAssetWithTokenByOwner(umi, owner);

    const machines: IoTMachine[] = [];
    for (const assetWithToken of assetsWithToken) {
        const machinePublicKey = assetWithToken.mint.publicKey.toString();
        if (!machines.every(m => m.publicKey != machinePublicKey)) {
            const resp = await fetch(assetWithToken.metadata.uri, { next: { revalidate: 10 }});
            const data = await resp.json();
            if (isIoTData(data)) {
                machines.push({
                    id: data.machine_id,
                    publicKey: assetWithToken.mint.publicKey.toString()
                });
            }
        }
    }
    return machines;
}