import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { WalletProvider } from "../provider/WalletProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
