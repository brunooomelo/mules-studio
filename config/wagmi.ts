import { configureChains, createConfig } from "wagmi";
import { fantomTestnet, fantom } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const isProduction = process.env.NODE_ENV === "production";

const { publicClient, webSocketPublicClient } = configureChains(
  [isProduction ? fantom : fantomTestnet],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});
