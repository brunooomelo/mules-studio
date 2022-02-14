import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { WalletProvider } from "../provider/WalletProvider";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Mules Studio</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
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
