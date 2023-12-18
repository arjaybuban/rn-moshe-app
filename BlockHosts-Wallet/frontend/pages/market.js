import React from "react";
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, } from "react-native";
import CustomHeader from '../Components/CustomHeader';
import CustomNavbar from "../Components/CustomNavbar";

const MarketPage = ({ navigation }) => {

  const nfts = [
    {
      id: 'x',
      img: 'https://i.seadn.io/gcs/files/3f6f87083a081f79deb569f8c65b3a4a.png?auto=format&w=48 48w',
      title: 'Buurp collection',
      description: 'Buurp collection, will be released soon.'
    },
    {
      id: '0xbce3781ae7ca1a5e050bd9c4c77369867ebc307e',
      img: 'https://i.seadn.io/gae/cb_wdEAmvry_noTfeuQzhqKpghhZWQ_sEhuGS9swM03UM8QMEVJrndu0ZRdLFgGVqEPeCUzOHGTUllxug9U3xdvt0bES6VFdkRCKPqg?auto=format&w=48',
      title: 'Goblin Town',
      description: 'AAAAAAAUUUUUGGGHHHHH gobblins goblinns GOBLINNNNNNNNns wekm ta goblintown yoo sniksnakr DEJEN RATS oooooh rats are yummmz dis a NEFTEEE O GOBBLINGS on da BLOKCHIN wat? oh. crustybutt da goblinking say GEE EMMM DEDJEN RUTS an queenie saay HLLO SWEATIES ok dats all byeby'
    },
    {
      id: '0x5802c586f657c787902280ac091d81832d7faf84',
      img: 'https://i.seadn.io/gae/DeRcYfpgdM5pEBdCqZtEBJG_f8pEagTaOEdqj8VzMQ09PszXIBsZlFNFaBjw2x3HB801pigvGhKrUn93HIqgwpJdKxqcMFpzbcPXXA?auto=format&w=48',
      title: 'Bored y00ts AC',
      description: 'Our collection consists of 6,969 y00tapes that combines the best of both chains, the Apes & the y00ts, right here on the Ethereum chain! Lets ride the bear together through immaculate vibes in y00tapeia'
    },
    {
      id: '0x78a5e2b8c280fa5580fbe1e1ed546183f959d305',
      img: 'https://i.seadn.io/gcs/files/a391f9fadaa95305a3d859bcfb21fb92.gif?auto=format&w=48 48w',
      title: 'AlphaSharks NFT',
      description: 'Alpha Sharks is an ecosystem of elite NFT holders that dominates the NFT game with the most advanced NFT sni',
    },

  ]

  return (
    <View style={styles.root}>
      <ScrollView style={{ paddingHorizontal: 12 }}>

        <CustomHeader navigation={navigation} title={'Marketplace'} />

        <View style={{ marginTop: 12 }}>

          {nfts.length > 0 && nfts.map((item, index) => {

            const { title, img, description, id } = item;

            return (<View style={{ flexDirection: 'row', backgroundColor: index !== 0 ? '#ededed' : '#1f7868', padding: 10, borderRadius: 25, marginTop: 12 }}>
              <View style={{ padding: 8, backgroundColor: '#fff', borderRadius: 30, alignItems: 'center' }}>
                <Image source={index === 0 ? require('../../assets/logo.png') : { uri: img }} style={{ width: 130, height: 150, borderRadius: 20 }} />
                <TouchableOpacity onPress={()=>{
                  navigation.navigate("Marketplace", {
                    data: id,})
                }} style={{ backgroundColor: '#000', marginTop: 12, borderRadius: 20, alignItems: 'center', width: 70 }}>
                  <Text style={{ color: '#fff' }}>View</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <TouchableOpacity style={{ backgroundColor: index !== 0 ? '#bebebe' : '#0d453c', padding: 12, borderRadius: 20, alignItems: 'center' }}>
                  <Text style={{ color: '#fff' }}>{title}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center' }}>
                  <TouchableOpacity style={{ backgroundColor: '#0d453c', padding: 12, borderRadius: 12, alignItems: 'center', flex: 1 }}>
                    <Text style={{ color: '#fff', fontSize: 8 }}>Available</Text>
                    <Text style={{ color: '#fff', fontSize: 12 }}>900</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ backgroundColor: '#0d453c', padding: 12, borderRadius: 12, alignItems: 'center', marginLeft: 8, flex: 1 }}>
                    <Text style={{ color: '#fff', fontSize: 8 }}>Available</Text>
                    <Text style={{ color: '#fff', fontSize: 12 }}>900</Text>
                  </TouchableOpacity>
                </View>
                <Text style={{ color: index !== 0 ? '#1f7868' : '#fff', fontSize: 10, marginTop: 8, maxHeight: 80 }}>
                  {description}
                </Text>
              </View>
            </View>)
          })}

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
    width: 50,
    height: 50
  },
  box: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 20,
    maxWidth: 220,
    marginRight: 20,
    // paddingBottom: 0
  }
});

export default MarketPage;
