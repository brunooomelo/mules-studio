import Cors from "cors";
import { ethers } from "ethers";
import fetch from "node-fetch";
import { contractAddress, networkRPC } from "utils/networkUtils";

const gateways = [
  "https://cloudflare-ipfs.com/ipfs",
  "https://ipfs.io/ipfs",
  "https://gateway.ipfs.io/ipfs",
  "https://ipfs-cache.nftquery.io/ipfs",
  "https://gateway.pinata.cloud/ipfs",
];

const CID =
  process.env.NEXT_PUBLIC_CID ||
  "Qmf6aFd4mdAwrWTtcwJm77ZNYwsNzVvqrH1dFk8n5ye9rV";
export default async function handler(req, res) {
  try {
    const id = req.query.id.replace(/\D+/g, "");
    await Cors(req, res);
    const web3 = new ethers.providers.JsonRpcProvider(networkRPC);
    const contract = new ethers.Contract(
      contractAddress,
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
        await Promise.race(
          gateways.map((gateway) =>
            fetch(`${gateway}/${CID}/${id}.json`).then((response) =>
              response.json()
            )
          )
        )
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
