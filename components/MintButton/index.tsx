interface MintButtonProps {
  handleMint: () => void;
  loading: boolean;
  hasBalance: boolean;
  disabled: boolean;
  soldOut: boolean;
}
export function MintButton({
  handleMint,
  loading,
  hasBalance,
  disabled,
  soldOut,
}: MintButtonProps) {
  const onMint = () => {
    handleMint();
  };
  return (
    <button
      className="w-48 px-14 py-2 rounded-xl bg-orange-400 text-white font-bold disabled:cursor-not-allowed"
      onClick={onMint}
      disabled={loading || !hasBalance || disabled || soldOut}
    >
      {soldOut
        ? "SOLD OUT"
        : !hasBalance
        ? "Insufficient funds "
        : loading
        ? "MINTING..."
        : "MINT"}
    </button>
  );
}
