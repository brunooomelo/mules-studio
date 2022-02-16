import Cors from "cors";
import { ethers } from "ethers";
import fetch from "node-fetch";

const gateways = [
  "https://cloudflare-ipfs.com/ipfs",
  "https://ipfs.io/ipfs",
  "https://gateway.ipfs.io/ipfs",
  "https://ipfs-cache.nftquery.io/ipfs",
  "https://gateway.pinata.cloud/ipfs",
];
export default async function handler(req, res) {
  try {
    const id = req.query.id.replace(/\D+/g, "");
    await Cors(req, res);
    const web3 = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_NETWORK_RPC
    );
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          name: "ownerOf",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      web3
    );

    return contract
      .ownerOf(id)
      .then(async () => {
        await fetch(
          `https://gateway.pinata.cloud/ipfs/${process.env.NEXT_PUBLIC_CID}/${id}.json`
        )
          .then((response) => response.json())
          .then((metadata) => {
            res.status(200).json(metadata);
          })
          .catch(() => {
            res.status(500).json({ error: "fetch image" });
          });
      })
      .catch(() => {
        res.status(404).json({
          message: "Mule not found yet",
        });
      });
  } catch (error) {
    res.status(500).json({ error });
  }
}
