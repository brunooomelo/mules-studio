import { useWallet } from "provider/WalletProvider";

const WalletSimplify = (account) => {
  return (
    account.substring(0, 6) +
    "..." +
    account.substring(account.length - 4, account.length)
  );
};
export function ConnectButton() {
  const { wallet, requestAccount } = useWallet();
  return (
    <button
      className="text-white font-bold bg-yellow-900 bg-opacity-80 py-2 px-10 rounded-xl"
      onClick={requestAccount}
      disabled={!!wallet}
    >
      {wallet ? WalletSimplify(wallet) : "Connect"}
    </button>
  );
}
