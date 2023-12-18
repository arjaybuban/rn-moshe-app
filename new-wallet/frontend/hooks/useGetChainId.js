import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { getWeb3 } from "../Moralis/getWeb3";
import { useWalletConnect } from "../WalletConnect";

export const useGetChainId = () => {

  const [chainId, setChainId] = useState();
  const connector = useWalletConnect();
  const { isAuthenticated } = useMoralis();

  useEffect(() => {
    setTimeout(() => {
      isAuthenticated && onFetch()
    }, 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  const onFetch = async () => {

    const web3js = await getWeb3({connector})
    const chain = Number(await web3js.eth.getChainId());
    setChainId("0x" + chain)
  }

  return { chainId, setChainId }
};