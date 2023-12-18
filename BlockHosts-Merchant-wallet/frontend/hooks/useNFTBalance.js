import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import UtilService from "../utils/utilService";
var bigInt = require("big-integer");

export const useNFTBalance = () => {

  const { Moralis, chainId } = useMoralis();
  const [NFTBalance, setNFTBalance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const Web3Api = useMoralisWeb3Api();

  useEffect(() => {
    setTimeout(() => {
      Web3Api && onFetch()
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onFetch = async () => {

    const LazyMints = Moralis.Object.extend("LazyMints");
    const query = new Moralis.Query(LazyMints);
    const allLazyMints = await query.find();
    const mints = allLazyMints.map((item) => {
      return {
        amount: "1",
        is_valid: 0,
        metadata: null,
        name: "",
        owner_of: item.attributes.creator,
        token_address: UtilService.getMint721Address(chainId),
        token_id: item.attributes.tokenId,
        token_uri: item.attributes.tokenURI,
        lazyMint: true,
        synced_at: item.attributes.createdAt
      }
    })
    
    const c1 = { address: UtilService.getMint721Address('0x13881'), chain: UtilService.getChain('0x13881') };
    const nftOwners1 = await Web3Api.token.getNFTOwners(c1);
    const c2 = { address: UtilService.getMint721Address('0x61'), chain: UtilService.getChain('0x61') };
    const nftOwners2 = await Web3Api.token.getNFTOwners(c2);
    const c3 = { address: UtilService.getMint721Address('0x4'), chain: UtilService.getChain('0x4') };
    const nftOwners3 = await Web3Api.token.getNFTOwners(c3);

    const filterData = await Promise.all(
      nftOwners1?.result.concat(nftOwners2?.result).concat(nftOwners3?.result).concat(mints)
      .map(async (item) => {
        if (item.metadata && item.is_valid === 1) {
          return item;
        } else {
          try {
            const response = await fetch(item.token_uri)
            const ddd = await response.json();
            item.metadata = JSON.stringify(ddd)
            return item
          } catch {
            return item
          }
        }
      }))

    setNFTBalance(filterData
      .filter((item) => {
        if (!item.metadata) return null
        const { name, category, price } = JSON.parse(item.metadata);
        if(!name || !category?.value || !price) return null
        return item
      })
      .map(item => {
        // decimal to hexadecimal for token_id
        var hextokenId = UtilService.checkHexa(item.token_id) ? item.token_id : '0x' + bigInt(item.token_id).toString(16);
        return {...item, token_id: hextokenId}
      })
      .sort(function (a, b) {
        return new Date(b.synced_at) - new Date(a.synced_at)
      }))
    setIsLoading(false);
  }

  return { NFTBalance, isLoading }
};