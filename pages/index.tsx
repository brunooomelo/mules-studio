import type { NextPage } from "next";
import { Header } from "@components/Header";
import { PriceMint } from "@components/PriceMint";
import { StatusMint } from "@components/StatusMint";
import {
  useAccount,
  useBalance,
  useConnect,
  useContractRead,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Image from "next/image";
import Link from "next/link";
import { MintForm } from "@components/MintForm";
import { contractAddress, abi } from "utils/networkUtils";

const Home: NextPage = () => {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { chain } = useNetwork();
  const { isConnected, address } = useAccount();
  const balance = useBalance({
    address,
  });

  const { data: supply } = useContractRead({
    address: contractAddress,
    abi,
    functionName: "totalSupply",
    select: (data) => Number(data),
  });

  const { isLoading, switchNetwork } = useSwitchNetwork({
    chainId: 4002,
  });

  return (
    <div className="w-full xl:container xl:mx-auto">
      <Header />
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
          <div className="lg:flex w-full justify-center">
            <div
              className={`flex flex-col items-center ${
                !!chain && "mt-20"
              } justify-around h-64 lg:w-96 xl:mt-10`}
            >
              {!!chain && isConnected && (
                <>
                  <StatusMint supply={supply} />
                  <MintForm
                    balance={Number(balance.data.formatted)}
                    isSoldOut={supply === 1337}
                  />
                  <PriceMint />
                  <Link
                    href="https://ftmscan.com/token/0xf51639d93963cdd0caac89c1161f00651e1e0f3e"
                    className="text-center text-sm text-gray-100"
                  >
                    Check contract
                  </Link>
                </>
              )}
              {chain?.id !== 4002 && isConnected && (
                <button
                  className="max-w-[270px] px-14 py-2 rounded-xl bg-orange-400 text-white font-bold"
                  onClick={() => switchNetwork()}
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Switching network"
                    : "Change to Fantom Opera Network"}
                </button>
              )}
              {!isConnected && (
                <button
                  className="max-w-[270px] px-14 py-2 rounded-xl bg-orange-400 text-white font-bold"
                  onClick={() => connect()}
                >
                  Connect
                </button>
              )}
            </div>
          </div>
        </div>
        <Image
          className="w-[300px] lg:w-[500px] rounded-lg"
          src="/banner.gif"
          alt="preview mule"
          width={300}
          height={100}
        />
      </main>

      <footer className="flex justify-center text-s font-bold text-gray-800 p-4">
        <p>Mules Studios since 2021</p>
      </footer>
    </div>
  );
};

export default Home;
