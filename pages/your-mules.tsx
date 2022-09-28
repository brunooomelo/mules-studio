import type { NextPage } from "next";
import { Header } from "@components/Header";
import { NFT } from "@components/NFT";
import { useMintInput } from "hooks/useMintInput";
import { useNFT } from "hooks/useNFT";
import { useWallet } from "provider/WalletProvider";

const Home: NextPage = () => {
  const { wallet, changeNetwork, eth, requestAccount } = useWallet();
  const { mulesOwned, checkChain } = useNFT(wallet);
  return (
    <div className="w-full xl:container xl:mx-auto">
      <Header />
      {!eth?.isMetaMask && (
        <h1 className="text-xl p-20 md:text-5xl font-bold text-white text-center">
          Metamask not found, please install Metamask wallet
        </h1>
      )}

      {(!checkChain || !wallet) && (
        <div className="lg:flex w-full justify-center">
          <div
            className={`flex flex-col items-center ${
              checkChain && "mt-20"
            } justify-around h-64 lg:w-96 xl:mt-10`}
          >
            {!checkChain && wallet && (
              <button
                className="max-w-[270px] px-14 py-2 rounded-xl bg-orange-400 text-white font-bold"
                onClick={changeNetwork}
              >
                Change to Fantom Opera Network
              </button>
            )}
            {!wallet && (
              <button
                className="max-w-[270px] px-14 py-2 rounded-xl bg-orange-400 text-white font-bold"
                onClick={requestAccount}
              >
                Connect
              </button>
            )}
          </div>
        </div>
      )}
      {checkChain && wallet && (
        <div className="flex flex-col items-center pt-20">
          <h1 className="text-4xl font-bold text-white">Your Mules</h1>
          <div className="flex flex-wrap justify-center w-full gap-3 py-8 ">
            {mulesOwned.loading &&
              Array.from({ length: mulesOwned.quantity }).map((_, index) => (
                <NFT key={index} url="/mule.gif" />
              ))}
            {!mulesOwned.loading &&
              mulesOwned.data.map(({ image, id, name }) => {
                return (
                  <NFT
                    key={id}
                    url={image.replace(
                      "ipfs://",
                      "https://ipfs-cache.nftquery.io/ipfs/"
                    )}
                    name={name}
                    id={id}
                    rounded
                  />
                );
              })}
            {!mulesOwned.loading && !mulesOwned.data.length && (
              <h1 className="text-white font-bold text-2xl border-4 border-white p-4 rounded-xl">
                You don&apos;t have Mules :({" "}
              </h1>
            )}
          </div>
        </div>
      )}
      <footer className="flex justify-center text-s font-bold text-gray-800 p-4">
        <p>Mules Studios since 2021</p>
      </footer>
    </div>
  );
};

export default Home;
