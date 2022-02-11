import { ethers } from "ethers";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type WalletContextType = {
  wallet: string | null;
  eth: any | null;
  requestAccount: () => void;
  balance: number;
  changeNetwork: () => Promise<void>;
};

export const WalletContext = createContext({} as WalletContextType);
export const useWallet = () => useContext(WalletContext);

type WalletProviderProps = {
  children: React.ReactNode;
};

export function WalletProvider({ children }: WalletProviderProps) {
  const [wallet, setWallet] = useState<string | null>(null);
  const [eth, setEth] = useState(null);
  const [balance, setBalance] = useState(0);

  const checkIsConnected = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setAccount(accounts);
      window.ethereum.addListener("accountsChanged", handleAccountChanged);
      setEth(window.ethereum);
    }
  };
  const requestAccount = useCallback(async () => {
    const accounts = await eth?.request({ method: "eth_requestAccounts" });
    setAccount(accounts);
  }, [eth]);

  async function changeNetwork() {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${Number(4002).toString(16)}` }],
      });
    } catch (error) {
      if (error.message.includes("already pending")) {
        toast.error("Request pending");
      }
    }
  }

  const setAccount = (accounts) => {
    if (!accounts.length) {
      setWallet(null);
      return;
    }
    setWallet(accounts[0]);
  };
  const handleAccountChanged = (accounts) => {
    setAccount(accounts);
  };

  const getBalance = () => {
    window.ethereum
      ?.request({ method: "eth_getBalance", params: [wallet, "latest"] })
      .then((balance) => {
        setBalance(Number(ethers.utils.formatUnits(balance, "ether")));
      });
  };

  useEffect(() => {
    checkIsConnected();
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChanged);
    };
  }, []);

  useEffect(() => {
    getBalance();
  }, [wallet]);

  return (
    <WalletContext.Provider
      value={{ wallet, eth, requestAccount, balance, changeNetwork }}
    >
      {children}
    </WalletContext.Provider>
  );
}
