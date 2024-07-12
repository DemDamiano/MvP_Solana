import "../config";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { loadTokensByMachineIdAndOwner } from "../app/_lib/lib";


import owner from "./owner.json";
import machine from "./machine.json";

(async function () {
    const umi = createUmi(process.env.CLUSTER_URL, "finalized");

    const ownerKeypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(owner));
    const machineKeypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(machine));

    const data = await loadTokensByMachineIdAndOwner(machineKeypair.publicKey.toString(), ownerKeypair.publicKey.toString());
    console.log("Loaded data");
    console.log(JSON.stringify(data, undefined, 2));
})();