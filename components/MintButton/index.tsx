interface MintButtonProps {
  handleMint: () => void;
  loading: boolean;
  hasBalance: boolean;
}
export function MintButton({
  handleMint,
  loading,
  hasBalance,
}: MintButtonProps) {
  const onMint = () => {
    handleMint();
  };
  return (
    <button
      className="w-48 px-14 py-2 rounded-xl bg-orange-400 text-white font-bold"
      onClick={onMint}
      disabled={loading || !hasBalance}
    >
      {!hasBalance ? "Insufficient funds " : loading ? "MINTING..." : "MINT"}
    </button>
  );
}
