import "../config";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount, createGenericFile } from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { base58 } from '@metaplex-foundation/umi/serializers';

import owner from "./owner.json";
import machine from "./machine.json";
import { IoTData } from "../app/_lib/IoTData";
import { Connection, SendTransactionError } from "@solana/web3.js";

(async function () {
    console.log("https://api.devnet.solana.com");
    const umi = createUmi("https://api.devnet.solana.com", "finalized");

    const ownerKeypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(owner));
    const machineKeypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(machine));
    const machineSigner = createSignerFromKeypair(umi, machineKeypair);
    umi.use(signerIdentity(machineSigner));
    umi.use(irysUploader());
    umi.use(mplTokenMetadata());

    console.log("Machine balance", machineKeypair.publicKey.toString(), await umi.rpc.getBalance(machineKeypair.publicKey));
    console.log("Owner balance", ownerKeypair.publicKey.toString(), await umi.rpc.getBalance(ownerKeypair.publicKey));

    const data: IoTData = {
        id: "cbe0b769-ff08-4cf6-a10f-3b9d0c43539c",
        machine_id: "a2fd0a81-2c65-47eb-a184-c4c46329ffa2",
        timestamp: new Date(),
        sensors: [
            {
                id: "bb842f17-9d25-4bed-858e-9c801761c682",
                type: "fuel_pump",
                data: [
                    10.000,
                    10.000,
                    10.000,
                    10.000,
                    10.000,
                    10.000,
                    9.991,
                    9.991,
                    9.991,
                    9.991,
                    9.930,
                    9.930,
                    9.930,
                    9.930,
                    9.930,
                ]
            },
            {
                id: "9e31b5e3-aa48-47d4-bf25-fde05488085f",
                type: "balance",
                data: [
                    90.50,
                    90.55,
                    90.90,
                    100.00
                ]
            },
            {
                id: "c680506b-e73b-48d4-a217-2e4563217d10",
                type: "availableCars",
                data: [
                    27,
                    95,
                    990,
                    1000
                ]
            },
            {
                id: "08581b2e-8cd2-48d2-8b60-c3828e208879",
                type: "rentalCost",
                data: [
                    0.45,
                    1.95,
                    2.90,
                    10.00
                ]
            },
            {
                id: "b0779ac9-4753-4b2a-af50-d94f38c9f9a8",
                type: "fuelDistance",
                data: [
                    34,
                    95,
                    290,
                    100
                ]
            }
        ]
    };

    // Non funziona in localnet
    const dataUri = await umi.uploader.uploadJson(data)
    .catch(async err => {
        if (err instanceof SendTransactionError) {
            console.error("Error uploading file");
            console.error(err);
            console.error(await err.getLogs(new Connection("https://api.devnet.solana.com", "finalized")));
        } else {
            console.error(err);
        }
        return null;
    });

    if (dataUri == null) {
        return;
    }
    console.log("URI", dataUri);
    //const dataUri = "https://arweave.net/WV_IElXfNHwa57GvYHCkYe9a8DxwMMDhJaeWKgVjpHM";

    const mint = generateSigner(umi);

    try {
        console.log("Creating NFT");
        const nftTransaction = await createNft(umi, {
            mint,
            name: "test",
            uri: dataUri,
            creators:[
                {
                    address: machineKeypair.publicKey,
                    share: 100,
                    verified: true
                }
            ],
            tokenOwner: ownerKeypair.publicKey,
            sellerFeeBasisPoints: percentAmount(0, 2)
        })
        .sendAndConfirm(umi);
    
        console.log(`Created NFT: TX ${base58.deserialize(nftTransaction.signature)}`);
    } catch (err: unknown) {
        if (err instanceof SendTransactionError) {
            console.error("Error during transaction");
            console.error(await err.getLogs(new Connection("https://api.devnet.solana.com", "finalized")));
        } else {
            console.error(err);
        }
    }
})();