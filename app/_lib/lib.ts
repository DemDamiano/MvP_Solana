import "../../config";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { publicKey } from '@metaplex-foundation/umi-public-keys';
import { fetchAllDigitalAssetByCreator, fetchDigitalAssetWithAssociatedToken } from '@metaplex-foundation/mpl-token-metadata';
import { IoTData } from './IoTData';

/**
 * Loads the tokens produced by the Machine and owned by the Owner
 * @param machineId The public key of the Machine
 * @param ownerId The public key of the Owner
 * @returns A promise of an array of IoTData
 */
export async function loadTokensByMachineIdAndOwner(machineId: string, ownerId: string): Promise<IoTData[]> {
    const umi = createUmi(process.env.CLUSTER_URL, "finalized");
    const creator = publicKey(machineId);
    const owner = publicKey(ownerId);

    const assets = await fetchAllDigitalAssetByCreator(umi, creator);

    const data = await Promise.all(assets.map(async asset => {
        const assetWithToken = await fetchDigitalAssetWithAssociatedToken(umi, asset.mint.publicKey, owner);
        const uri = assetWithToken.metadata.uri;
        const resp = await fetch(uri);
        const data = await resp.json();
        return data as IoTData;
    }));
    return data;
}