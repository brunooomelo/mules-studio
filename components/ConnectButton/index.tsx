import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const WalletSimplify = (account) => {
  return (
    account.substring(0, 6) +
    "..." +
    account.substring(account.length - 4, account.length)
  );
};
export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return (
    <button
      className="text-white font-bold bg-yellow-900 bg-opacity-80 py-2 px-10 rounded-xl"
      onClick={() => connect()}
      disabled={!!isConnected}
    >
      {isConnected ? ensName ?? WalletSimplify(address) : "Connect"}
    </button>
  );
}
