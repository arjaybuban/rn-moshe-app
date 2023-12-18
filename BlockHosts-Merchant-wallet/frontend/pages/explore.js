import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Dimensions } from "react-native";
import CustomHeader from '../Components/CustomHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomNavbar from "../Components/CustomNavbar";
import Carousel from 'react-native-snap-carousel';
import useNativeBalance from '../hooks/useNativeBalance';
import { useMoralis, useMoralisQuery, useMoralisWeb3Api } from "react-moralis";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import moment from "moment";
import { useWalletConnect } from "../WalletConnect";
import UtilService from "../utils/utilService";
const screenWidth = Dimensions.get('window').width;

const ExploreScreen = ({ navigation, route }) => {

  const ref = useRef();
  const { user, isInitialized, authenticate } = useMoralis();
  const screenWidth = Dimensions.get('window').width;
  const balance = useNativeBalance();
  const { walletAddress, chainId } = useMoralisDapp();
  // const ethAddress = Moralis.User.current().get('ethAddress');
  const { data: ScannedData, fetch } = useMoralisQuery("ScannedList", query => query.equalTo("account", user.id).descending("createdAt"), [trigger]);

  const Web3Api = useMoralisWeb3Api();
  const [nfts, setNFTs] = useState([]);
  const [trigger, setTrigger] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const connector = useWalletConnect();

  const noToken = balance?.nativeBalance === "NaN ETH" || balance?.nativeBalance === "0 ETH";


  useEffect(() => {
    setTrigger(route?.params?.t)
    fetch();
  }, [route?.params?.t])

  useEffect(() => {
    if (isInitialized) {
      onGetAllCollections()
      onGetActivity();
    }
  }, [isInitialized])

  const onGetActivity = async () => {
    setTransactions([])
    const data = await Web3Api.account.getNFTTransfers({
      chain: '0x5',
      limit: "10",
      address: walletAddress || '- '
    });

    const list = await Promise.all(data?.result.map(async (item, index) => {
      const meta = await Web3Api.token.getTokenIdMetadata({
        chain: '0x5',
        address: item.token_address,
        token_id: item.token_id,
      })
      const metadata = JSON.parse(meta.metadata)
      return { ...item, image: metadata?.image }
    }))
    setTransactions(list);
  }

  const onGetAllCollections = async () => {
    const c1 = {
      address: '0xbce3781ae7ca1a5e050bd9c4c77369867ebc307e',
      chain: 'eth',
      limit: 3
    };

    const data = await Web3Api.token.getNFTOwners(c1);
    setNFTs(data?.result)
  }

  return (
    <View style={styles.root}>
      <ScrollView style={{ paddingHorizontal: 12 }}>

        <CustomHeader navigation={navigation} hello />

        <View style={{ marginTop: 12 }}>
          <View style={{ flexDirection: 'row', backgroundColor: '#902a4d', padding: 20, borderRadius: 25 }}>
            <View>
              <Text style={{ color: '#fff', minWidth: 130 }}>My Balance</Text>
              <View style={{ flexDirection: 'row' }}>
                {!noToken && <Text style={{ color: '#fff', fontSize: 30, fontWeight: '700', marginRight: 6 }}>{balance?.nativeBalance?.replace('ETH', '')}</Text>}
                <Text style={{ color: '#fff', fontSize: 11, marginTop: 20 }}>{noToken ? 'No Tokens yet' : 'ETH'}</Text>
              </View>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Share')}
                style={{ backgroundColor: '#F9699A', padding: 12, borderRadius: 20, alignItems: 'center', marginVertical: 12 }}>
                <Text>Scan Tokens</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => navigation.navigate('MyToken')}
                style={{ backgroundColor: '#0d453c', padding: 12, borderRadius: 20, alignItems: 'center', marginTop: 20 }}
              >
                <Text style={{ color: '#fff' }}>My Tokens</Text>
              </TouchableOpacity> */}
            </View>
          </View>

          <View style={styles.redeem}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#cacaca' }}>Redeemed Last</Text>

            {ScannedData.map((item, index) => <View key={index} style={{ padding: 3, marginTop: 4 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <MaterialCommunityIcons name="wallet" size={24} color={"#F9699A"} />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text style={{ color: '#22DBBB', fontWeight: '400', fontSize: 13 }}>
                    {/* {walletAddress === item.from_address ? 'Redeemed' : 'Collected'} */}
                    {/* {item.attributes.createdAt?.replace('T', ' ')?.replace('.000Z', '')} */}
                    { moment(item.attributes.createdAt).format('L, LT')}
                  </Text>
                  <Text style={{ color: '#AEAEAE', fontSize: 11 }}>
                    {/* {item.attributes.name} */}
                    {UtilService.truncate2(item.attributes.token_id)}
                  </Text>
                </View>
                <Image source={{ uri: item.attributes.image }} style={{ width: 30, height: 40 }} />
              </View>
            </View>)}
          </View>

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
    backgroundColor: '#000'
  },
  logo: {
    width: 50,
    height: 50
  },
  box: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    width: screenWidth / 2 - 15,
    marginRight: 6,
    // paddingBottom: 0
  },
  redeem: {
    backgroundColor: '#222',
    marginTop: 20,
    borderRadius: 44,
    padding: 18
  }
});

export default ExploreScreen;
