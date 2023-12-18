import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Dimensions, Linking } from "react-native";
import CustomHeader from '../Components/CustomHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomNavbar from "../Components/CustomNavbar";
import Carousel from 'react-native-snap-carousel';
import useNativeBalance from '../hooks/useNativeBalance';
import { useMoralis, useMoralisCloudFunction, useMoralisQuery, useMoralisWeb3Api } from "react-moralis";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import UtilService from "../utils/utilService";
import { useWalletConnect } from "../WalletConnect";
const screenWidth = Dimensions.get('window').width;

const ExploreScreen = ({ navigation }) => {

  const ref = useRef();
  const { Moralis, isInitialized, authenticate } = useMoralis();
  const screenWidth = Dimensions.get('window').width;
  const balance = useNativeBalance();
  const { walletAddress, chainId } = useMoralisDapp();

  const Web3Api = useMoralisWeb3Api();
  const [nfts, setNFTs] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const connector = useWalletConnect();
  const { data: users } = useMoralisCloudFunction('loadUsers');
  const { data: featuredDrops } = useMoralisQuery('featuredDrops');

  const mySortedUsers = users?.map(item => {
    const userAccount = (item?.attributes?.accounts && item?.attributes?.accounts[0]) || '---';
    return {
      name: item?.attributes?.name?.substr(0, 16) || 'Unnamed',
      avatar: item?.attributes?.avatar,
      address: userAccount
    }
  })

  const noToken = balance?.nativeBalance === "NaN ETH" || balance?.nativeBalance === "0 ETH"

  // console.log('userData: ', mySortedUsers)

  useEffect(() => {
    if (isInitialized) {
      onGetAllCollections()
      onGetActivity();
    }
  }, [isInitialized, featuredDrops])

  const onGetActivity = async () => {
    setTransactions([])
    const data = await Web3Api.account.getNFTTransfers({
      chain: '0x1',
      limit: "10",
      address: walletAddress || '- '
    });

    const list = await Promise.all(data?.result.map(async (item, index) => {
      const meta = await Web3Api.token.getTokenIdMetadata({
        chain: '0x1',
        address: item.token_address,
        token_id: item.token_id,
      })
      const metadata = JSON.parse(meta.metadata)
      return { ...item, image: metadata?.image }
    }))
    setTransactions(list);
  }

  const onGetAllCollections = async () => {

    const listing = await Promise.all(featuredDrops?.map(async (x, index) => {
      const req = {
        chain: x.attributes.network,
        address: x.attributes.token_address,
        token_id: x.attributes.token_id,
      }
      const meta = await Web3Api.token.getTokenIdMetadata(req)

      const metadata = JSON.parse(meta?.metadata)

      return { 
        image: UtilService.ConvetImg(metadata?.image),
        name: metadata?.name,
        description: metadata?.description,
        url: x.attributes.url,
      }
    }))
    setNFTs(listing)
    console.log('listing: ', listing)
  }

  function getUserNameFromAddress(tAdd) {
    if (mySortedUsers?.length === 0) {
      return '-'
    } else {
      const tt = mySortedUsers?.find(z => (z.address) === tAdd?.toLowerCase());
      return tt?.name || UtilService.truncate(tAdd);
    }
  }

  return (
    <View style={styles.root}>
      <ScrollView style={{ paddingHorizontal: 12 }}>

        <CustomHeader navigation={navigation} hello/>

        <View style={{ marginTop: 12 }}>
          <View style={{ flexDirection: 'row', backgroundColor: '#20d3b4', padding: 20, borderRadius: 25 }}>
            <View>
              <Text style={{ color: '#fff', minWidth: 130 }}>My Balance</Text>
              <View style={{ flexDirection: 'row' }}>
                {!noToken && <Text style={{ color: '#fff', fontSize: 30, fontWeight: '700', marginRight: 6 }}>{balance?.nativeBalance?.replace('ETH', '')}</Text>}
                <Text style={{ color: '#fff', fontSize: 11, marginTop: 20 }}>{noToken ? 'No Tokens yet' : 'ETH'}</Text>
              </View>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <TouchableOpacity
                onPress={() => authenticate({
                  connector,
                  signingMessage: "Blockhosts",
                })}
                style={{ backgroundColor: '#fff', padding: 12, borderRadius: 20, alignItems: 'center' }}>
                <Text>Top Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('MyToken')}
                style={{ backgroundColor: '#0d453c', padding: 12, borderRadius: 20, alignItems: 'center', marginTop: 20 }}
              >
                <Text style={{ color: '#fff' }}>My Tokens</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 20, flexDirection: 'row' }}>
            <View style={styles.box}>
              <Image source={require('../../assets/logo.png')} style={styles.logo} />
              <Text style={{ fontSize: 14, fontWeight: '700', marginTop: 8 }}>Burping Apes Club</Text>
              <Text style={{ color: '#9E9E9E', fontSize: 11 }}>Exlusive BlockHosts NFT Collection for more Perks</Text>
              <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity
                  style={{ paddingVertical: 8, paddingHorizontal: 14, backgroundColor: '#22DBBB', borderRadius: 12, marginTop: 2 }}
                  onPress={() => navigation.navigate('MyToken')}
                >
                  <Text style={{ color: '#fff' }}>Select</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.box}>
              <Image source={require('../../assets/logo2.png')} style={styles.logo} />
              <Text style={{ fontSize: 14, fontWeight: '700', marginTop: 8 }}>Marketplace</Text>
              <Text style={{ color: '#9E9E9E', fontSize: 11 }}>Find the best Discounts, Deals & Loyalty </Text>
              <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Marketplace')}
                  style={{ paddingVertical: 8, paddingHorizontal: 14, backgroundColor: '#22DBBB', borderRadius: 12, marginTop: 1 }}
                >
                  <Text style={{ color: '#fff' }}>Select</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* <View style={[styles.box, { marginRight: 0 }]}>
              <Image source={require('../../assets/airdrop.png')} style={styles.logo} />
              <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 8 }}>Transfer Tokens</Text>
              <Text style={{ color: '#9E9E9E' }}>Airdrop tokens to friend accounts</Text>
              <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('MyToken')}
                  style={{ paddingVertical: 12, paddingHorizontal: 18, backgroundColor: '#22DBBB', borderRadius: 12, marginTop: 12, width: 80 }}
                >
                  <Text style={{ color: '#fff' }}>Select</Text>
                </TouchableOpacity>
              </View>
            </View> */}

          </View>

          <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 20 }}>Featured Drops</Text>

          <Carousel
            ref={ref}
            data={nfts}
            renderItem={({ item, index }) => {

              const { name, image, description, url } = item;

              return (
                <View key={index} style={{ flexDirection: 'row', backgroundColor: '#1f7868', padding: 10, borderRadius: 25, marginTop: 12 }}>
                  <View style={{ padding: 8, backgroundColor: '#fff', borderRadius: 30, alignItems: 'center' }}>
                    <Image source={{ uri: image }} style={{ width: 130, height: 150, borderRadius: 20 }} />
                    <TouchableOpacity onPress={()=>url && Linking.openURL(url)} style={{ backgroundColor: '#000', marginTop: 12, borderRadius: 20, alignItems: 'center', width: 70 }}>
                      <Text style={{ color: '#fff' }}>Buy</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <TouchableOpacity style={{ backgroundColor: '#0d453c', padding: 12, borderRadius: 20, alignItems: 'center', maxHeight: 54, overflow: 'hidden' }}>
                      <Text style={{ color: '#fff' }}>{name}</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center' }}>
                      <TouchableOpacity style={{ backgroundColor: '#0d453c', padding: 12, borderRadius: 12, alignItems: 'center', flex: 1 }}>
                        <Text style={{ color: '#fff', fontSize: 8 }}>Total</Text>
                        <Text style={{ color: '#fff', fontSize: 12 }}>1</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ backgroundColor: '#22DBBB', padding: 12, borderRadius: 12, alignItems: 'center', marginLeft: 8, flex: 1 }}>
                        <Text style={{ color: '#fff', fontSize: 8 }}>Price</Text>
                        <Text style={{ color: '#fff', fontSize: 12 }}>0</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={{ color: '#fff', fontSize: 10, marginTop: 8, maxHeight: 65 }}>
                      {description}
                    </Text>
                  </View>
                </View>
              );
            }}
            sliderWidth={screenWidth - 20}
            itemWidth={screenWidth - 30}
          />

          <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 20 }}>Activity</Text>

          {transactions.map((item, index) => <View key={index} style={{ backgroundColor: '#fff', padding: 12, borderRadius: 12, marginTop: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <MaterialCommunityIcons name="wallet" size={44} color={walletAddress === item.from_address ? "#F9699A" : '#22DBBB'} />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ color: '#AEAEAE', fontWeight: '700' }}>{walletAddress === item.from_address ? 'Redeemed' : 'Collected'}</Text>
                <Text style={{ color: '#AEAEAE', fontSize: 11 }}>
                  {walletAddress === item.from_address ? 'Me' : getUserNameFromAddress(item.from_address)}
                  &nbsp; to &nbsp;
                  {/* {walletAddress === item.to_address ? 'Me' : UtilService.truncate(item.to_address)}       */}
                  {walletAddress === item.to_address ? 'Me' : getUserNameFromAddress(item.to_address)}

                </Text>
              </View>
              <Image source={{ uri: item.image }} style={{ width: 47, height: 62 }} />
            </View>
          </View>)}

        </View>

      </ScrollView>

      <CustomNavbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
  logo: {
    width: 46,
    height: 46
  },
  box: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    width: screenWidth / 2 - 15,
    marginRight: 6,
    // paddingBottom: 0
  }
});

export default ExploreScreen;
