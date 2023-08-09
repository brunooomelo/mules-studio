import { isAfter } from "date-fns";
import abiMules from "../contract/abi/Mules.json";

const formatChain = (number: number = 250) =>
  `0x${Number(number).toString(16)}`;

const isProduction = process.env.NODE_ENV === "production";

export const network = isProduction ? formatChain() : formatChain(4002);
export const abi = abiMules;

export const networkRPC = isProduction
  ? process.env.NEXT_PUBLIC_NETWORK_RPC
  : "https://rpc.testnet.fantom.network/";

export const contractAddress: `0x${string}` = isProduction
  ? (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`)
  : "0xA8393B564Cb818c73A9eDE6441f3c189F721E3E8";

export const chainNetwork = {
  chainId: network,
  chainName: `Fantom ${!isProduction && "TestNet"} Opera`,
  rpcUrls: [networkRPC],
  nativeCurrency: {
    name: "FANTOM",
    symbol: "FTM",
    decimals: 18,
  },
};

export const publicSale = process.env.NEXT_PUBLIC_PUBLIC_SALES || new Date();
export const itsTimeForPublicSales = isAfter(new Date(), new Date(publicSale));
