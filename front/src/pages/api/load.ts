import { NextApiRequest, NextApiResponse } from "next";
import { Address, verifyMessage } from "viem";
import { readContract } from "@wagmi/core";
import { config } from "../../wagmi";

import Manager from "../../abi/Manager.json";
import Video from "../../abi/Video.json";
import { pinata } from "../../utils/config";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        console.log("GET function");
        console.log(req.body);

        const data = JSON.parse(req.body);

        // Verify user signature
        let verified = await verifyMessage({
            address: data["address"],
            message: 'Prove you are the owner of ' + data["address"],
            signature: data["signature"],
        })

        if (!verified) {  // Invalid signature
            res.status(500).json({error: "Internal Server Error"})
            return;
        }

        // Check on chain that the given address has access to the video
        let access = await readContract(config, {
            address: process.env.NEXT_PUBLIC_CONTRACT_MANAGER_ADDRESS as Address,
            abi: Manager.abi,
            functionName: 'access',
            args: [
                Number(data["tokenId"]),
                data["address"]
            ],
        });
        if (!access) {
            res.status(500).json({error: "Internal Server Error"})
            return;
        }

        // Fetch the cid of the data
        const metadata = await readContract(config, {
            address: process.env.NEXT_PUBLIC_CONTRACT_VIDEO_ADDRESS as Address,
            abi: Video.abi,
            functionName: 'videoMetadata',
            args: [
                Number(data["tokenId"])
            ],
        });
        const cid = metadata[4];
        console.log(cid);

        // Create a pinata link for the video
        let url = await pinata.gateways.createSignedURL({
          cid: cid,
          expires: 3600,
        });

        console.log(url);

        res.status(200).json({"url": url}) 
    }
}