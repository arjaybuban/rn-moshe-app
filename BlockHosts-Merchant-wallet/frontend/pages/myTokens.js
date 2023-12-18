import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CustomHeader from '../Components/CustomHeader';
import CustomNavbar from '../Components/CustomNavbar';

const MyTokensScreen = ({ navigation }) => {

  const { isInitialized, Moralis } = useMoralis();
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    isInitialized && onGetAllCollections()
  }, [isInitialized])

  const onGetAllCollections = async () => {
    setNFTs([]);
    const options = {
      chain: "0x5",
    };
    const data = await Moralis.Web3API.account.getNFTs(options);
    setNFTs(data?.result)
  }

  return (
    <View style={styles.root}>
      <ScrollView style={{ paddingHorizontal: 12 }}>

        <CustomHeader navigation={navigation} title={'My Tokens'} />

        <View style={{ marginTop: 12 }}>
          <FlatList
            numColumns={2}
            data={nfts}
            renderItem={({ item }) => {

              const { name, image } = JSON.parse(item.metadata);

              return (<TouchableOpacity
                style={{ flex: 1 / 2, backgroundColor: '#202020', padding: 4, borderRadius: 6, margin: 5 }}
                onPress={() => navigation.navigate('Detail', {data: item})}
              >
                <View style={{ padding: 5, }}>
                  <Image source={{ uri: image }} style={{ width: 140, height: 150, borderRadius: 8 }} />
                  <Text style={{ color: '#fff', fontSize: 10, marginTop: 4, height: 27 }}>{name}</Text>
                  <View style={{ flexDirection: 'row', marginTop: 6 }}>
                    <Text style={{ color: '#ccc', fontSize: 8 }}>Host</Text>
                    <Text style={{ color: '#fff', fontSize: 8, marginLeft: 12 }}>{item.name}</Text>
                  </View>

                </View>
                {/* <View style={{ flex: 1, marginLeft: 4 }}>

                  <Text style={{ color: '#bbb', fontSize: 7 }}>
                    Cash value at the bar
                  </Text>
                </View> */}
              </TouchableOpacity>)
            }}
          />

        </View>
      </ScrollView>
      <CustomNavbar />

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
  },
  box: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 20,
    maxWidth: 220,
    marginRight: 20,
  },
});

export default MyTokensScreen;
