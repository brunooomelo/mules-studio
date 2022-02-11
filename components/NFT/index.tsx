interface NFTProps {
  url: string;
  name?: string;
  id?: string;
}

export function NFT({ url, name, id }: NFTProps) {
  return (
    <div className="w-full max-w-[300px] flex flex-col items-center">
      <img
        className="rounded-3xl"
        src={url}
        alt={name ? name : "Mule Studio Loading"}
      />
      <div className="w-full flex justify-between text-sm font-bold px-2">
        {name && <p className="text-gray-100">{name}</p>}
        {id && <p className="text-gray-300">#{id}</p>}
      </div>
    </div>
  );
}
