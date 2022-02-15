import { ethers } from "ethers";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { network } from "utils/networkUtils";
import abi from "../contract/abi/Mules.json";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const MAX_SUPPLY = 1337;
export const useNFT = (wallet) => {
  const [c, setC] = useState(null);
  const [co, setContract] = useState(null);
  const [supply, setSupply] = useState(null);
  const [mulesOwned, setMulesOwned] = useState([]);
  const [chain, setChain] = useState(null);
  const [mulesQuantity, setQuantity] = useState(0);
  const [loadingMint, setLoadingMint] = useState(false);
  const [loadingMulesOwned, setLoadingMulesOwned] = useState(false);

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      setC(provider);
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        provider.getSigner(wallet)
      );

      setContract(contract);
    }
  }, [wallet]);

  const getSupply = useCallback(async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      await co
        .totalSupply()
        .then((supply) => setSupply(ethers.utils.formatUnits(supply, 0)));
    }
  }, [co]);

  const getMetadata = useCallback(async (munkId) => {
    const response = await fetch(`/api/mules/${munkId}`);
    if (response.status === 200) {
      let data = await response.json();
      data = {
        ...data,
        id: munkId,
      };
      return data;
    } else if (munkId > 0 && response.status === 500) {
      return await getMetadata(munkId);
    }
    return null;
  }, []);

  const getMulesOwned = useCallback(async () => {
    try {
      if (wallet) {
        setQuantity(0);
        setLoadingMulesOwned(true);
        const mules = await co
          .MulesOwned(wallet)
          .then((mules) =>
            mules.map((mule) => ethers.utils.formatUnits(mule, 0))
          );
        setQuantity(mules.length);
        const data = await Promise.all(mules.map(getMetadata));
        setMulesOwned(data);
      }
    } catch (error) {
    } finally {
      setLoadingMulesOwned(false);
    }
  }, [co, getMetadata, wallet]);

  const mint = useCallback(
    async (quantity: number) => {
      try {
        setLoadingMint(true);
        const price = ethers.utils.parseUnits(String(1.5 * quantity), 18);
        const tx = await co.mint(quantity, {
          value: price,
        });
        await tx.wait();
        await getSupply();
        await getMulesOwned();
        toast.success("Claimed!");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoadingMint(false);
      }
    },
    [co, getMulesOwned, getSupply]
  );

  const getChain = useCallback(async () => {
    const { chainId } = await c.getNetwork();
    setChain(chainId);
  }, [c]);

  const listeringChangeChain = (chainId) => {
    setChain(chainId);
  };

  const checkChain = network == chain;
  useEffect(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum.on("chainChanged", listeringChangeChain);
      if (co) {
        getChain();
        if (checkChain) {
          getSupply();
          getMulesOwned();
        }
      }
    }

    return () => {
      window.ethereum?.removeListener("chainChanged", listeringChangeChain);
    };
  }, [checkChain, co, getChain, getMulesOwned, getSupply, wallet]);

  return {
    supply,
    isSoldOut: Number(supply) === MAX_SUPPLY,
    mulesOwned: {
      data: mulesOwned,
      quantity: mulesQuantity,
      loading: loadingMulesOwned,
    },
    mint: {
      call: mint,
      loading: loadingMint,
    },
    checkChain,
  };
};
