import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { WagmiConfig } from "wagmi";
import { config } from "../config/wagmi";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Mules Studio</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <WagmiConfig config={config}>
        <Component {...pageProps} />
      </WagmiConfig>
      <Toaster
        position="top-center"
        gutter={8}
        toastOptions={{
          style: {
            background: "#21272e",
            color: "white",
            fontSize: "20px",
          },
        }}
      />
    </>
  );
}

export default MyApp;
