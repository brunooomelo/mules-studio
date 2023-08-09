import { Input } from "@components/Input";
import { MintButton } from "@components/MintButton";
import { useMintInput } from "hooks/useMintInput";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import toast from "react-hot-toast";
import { parseEther } from "viem";
import { abi, contractAddress } from "utils/networkUtils";

export const MintForm = ({
  balance,
  isSoldOut,
}: {
  balance: number;
  isSoldOut: boolean;
}) => {
  const { decrease, setField, value, increment } = useMintInput(1);

  const onMint = () => {
    write?.();
  };

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName: "mint",
    args: [String(value)],
    value: parseEther(String(1.5 * value)),
  });

  const { data, write, ...contractStatus } = useContractWrite({
    ...config,
    onError: (e) => {
      toast.error(e.message.split("\n")[0]);
    },
  });

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      toast.success("Claimed 🎉!");
    },
    onError: (error) => {
      toast.error(error.message.split("\n")[0]);
    },
  });

  return (
    <>
      <Input
        decrease={decrease}
        onChange={setField}
        increment={increment}
        value={value}
      />
      <MintButton
        handleMint={onMint}
        loading={isLoading || contractStatus.isLoading}
        hasBalance={balance > value * 1.5}
        disabled={false}
        soldOut={isSoldOut}
      />
    </>
  );
};
