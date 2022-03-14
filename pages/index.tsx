import type { NextPage } from "next";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { MintButton } from "@components/MintButton";
import { NFT } from "@components/NFT";
import { PriceMint } from "@components/PriceMint";
import { StatusMint } from "@components/StatusMint";
import { useMintInput } from "hooks/useMintInput";
import { useNFT } from "hooks/useNFT";
import { useWallet } from "provider/WalletProvider";
import { useCountDown } from "hooks/useCountDown";

const Home: NextPage = () => {
  const { wallet, balance, changeNetwork, eth } = useWallet();
  const { decrease, setField, value, increment } = useMintInput(1);
  const { mulesOwned, supply, mint, checkChain, isSoldOut } = useNFT(wallet);
  const { remainingTime, isEnabled: isEnableSale } = useCountDown();
  const onMint = () => mint.call(value);
  return (
    <div className="w-full xl:container xl:mx-auto">
      <Header />
      {!eth?.isMetaMask && (
        <h1 className="text-xl p-20 md:text-5xl font-bold text-white text-center">
          Metamask not found, please install Metamask wallet
        </h1>
      )}
      <main className="flex flex-col items-center bg-secondary py-20 xl:flex-row xl:rounded-2xl">
        <div className="">
          <div className="px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Welcome to Mules Collection
            </h1>
            <p className="w-3/4 mx-auto text-white my-5 text-center text-base sm:text-xl">
              Mules is a collection of 1337 uniquely and randomly NFTs stored on
              Fantom Network
            </p>
          </div>
          {!isEnableSale && (
            <div className="rounded-3xl border-4 border-white p-8 text-white font-bold md:text-5xl w-3/4 mx-auto text-center my-4">
              <h1 className="">OPEN SALES IN</h1>
              <span>
                {remainingTime.days} D : {remainingTime.hours} H :{" "}
                {remainingTime.minutes} M : {remainingTime.seconds} S
              </span>
            </div>
          )}
          {isEnableSale && (
            <div className="lg:flex w-full justify-center">
              <div
                className={`flex flex-col items-center ${
                  checkChain && "mt-20"
                } justify-around h-64 lg:w-96 xl:mt-10`}
              >
                {checkChain ? (
                  <>
                    <StatusMint supply={supply} />
                    <Input
                      decrease={decrease}
                      onChange={setField}
                      increment={increment}
                      value={value}
                    />
                    <MintButton
                      handleMint={onMint}
                      loading={mint.loading}
                      hasBalance={Boolean(balance > 1.5)}
                      disabled={!isEnableSale}
                      soldOut={isSoldOut}
                    />
                    <PriceMint />
                    <a href="https://ftmscan.com/token/0xf51639d93963cdd0caac89c1161f00651e1e0f3e" className="text-center text-sm text-gray-100">Check contract</a>
                  </>
                ) : (
                  <button
                    className="max-w-[270px] px-14 py-2 rounded-xl bg-orange-400 text-white font-bold"
                    onClick={changeNetwork}
                  >
                    Change to Fantom Opera Network
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <img
          className="w-[300px] lg:w-[500px] rounded-lg"
          src="banner.gif"
          alt="preview mule"
        />
      </main>
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
      <footer className="flex justify-center text-s font-bold text-gray-800 p-4">
        <p>Mules Studios since 2021</p>
      </footer>
    </div>
  );
};

export default Home;
