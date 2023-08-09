import { configureChains, createConfig } from "wagmi";
import { fantomTestnet, fantom } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const isProduction = process.env.NODE_ENV === "production";

export const productionChain = isProduction ? fantom : fantomTestnet;
const { publicClient, webSocketPublicClient } = configureChains(
  [productionChain],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});
