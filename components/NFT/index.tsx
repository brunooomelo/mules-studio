import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface NFTProps {
  id: number;
}

function replaceIPFS(image: string) {
  return image.replace("ipfs://", "https://ipfs.io/ipfs/");
}
export function NFT({ id }: NFTProps) {
  const [metadata, setMetadata] = useState(null);
  const getMetadata = useCallback(async (id) => {
    try {
      const response = await fetch(
        `https://mulesstudio.vercel.app/api/mules/${id}.json`
      ).then((res) => res.json());
      setMetadata(response);
    } catch (error) {
      toast.error(error.message);
    } 
  }, []);

  useEffect(() => {
    getMetadata(id);
  }, [getMetadata, id]);

  return (
    <div className="w-full max-w-[300px] flex flex-col items-center">
      <Image
        width={300}
        height={100}
        className={!!metadata?.image && "rounded-3xl"}
        src={metadata?.image ? replaceIPFS(metadata.image) : "/mule.gif"}
        alt={metadata?.name || "Mule Studio Loading"}
      />
      <div className="w-full flex justify-between text-sm font-bold px-2">
        {metadata?.name && <p className="text-gray-100">{metadata?.name}</p>}
        {id && <p className="text-gray-300">#{id}</p>}
      </div>
    </div>
  );
}
