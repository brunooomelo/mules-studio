import type { NextPage } from "next";
import { Header } from "@components/Header";
import { NFT } from "@components/NFT";
import { useAccount, useContractRead } from "wagmi";
import { abi, contractAddress } from "utils/networkUtils";

const getMetadata = async (muleId) => {
  const response = await fetch(`/api/mules/${muleId}`);
  if (response.status === 200) {
    let data = await response.json();
    data = {
      ...data,
      id: muleId,
    };
    return data;
  } else if (muleId > 0 && response.status === 500) {
    return getMetadata(muleId);
  }
  return null;
};

const Home: NextPage = () => {
  const { address } = useAccount();
  const mules = useContractRead({
    address: contractAddress,
    abi,
    functionName: "MulesOwned",
    args: [address],
    select: (mules: string[]): number[] => {
      return mules.map(Number);
    },
  });

  return (
    <div className="w-full xl:container xl:mx-auto">
      <Header />
      {address && (
        <div className="flex flex-col items-center pt-20">
          <h1 className="text-4xl font-bold text-white">Your Mules</h1>
          <div className="flex flex-wrap justify-center w-full gap-3 py-8">
            {mules.isSuccess &&
              mules.data.map((muleId) => {
                return <NFT key={muleId} id={muleId} />;
              })}
            {!mules.isSuccess && !mules.data?.length && (
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
