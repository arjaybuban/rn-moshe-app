import React, { useEffect, useState } from "react";
import { useMoralisQuery } from "react-moralis";
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Linking, } from "react-native";
import CustomHeader from '../Components/CustomHeader';
import CustomNavbar from "../Components/CustomNavbar";
import { getNFTs, getSearch } from '../config/apis';
import ModalFilter from "../Components/ModalFilter";
import COUNTRIES from "../config/country.json";

const MarketPage = ({ navigation }) => {

  const { data: T } = useMoralisQuery('collections');
  const [isFilterNFType, setIsFilterNFType] = useState(false);
  const [isMerchantType, setIsMerchantType] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
  const [isCountry, setIsCountry] = useState(false);
  const [nftType, setNftType] = useState();
  const [merchantType, setMerchantType] = useState();
  const [category, setCategory] = useState();
  const [country, setCountry] = useState();
  const [allData, setAllData] = useState([]);
  const [isSearchable, setIsSearchable] = useState(false);

  const nfts = T.map(c => {
    return {
      img: c.attributes.img,
      title: c.attributes.title,
      description: c.attributes.description,
      chain: c.attributes.network
    }
  })

  useEffect(() => {
    onGetNFTs()
  }, [onGetNFTs, T])

  const onGetNFTs = async () => {
    const p = await getNFTs();
    const cData = p.map(c => {
      return {
        img: 'https:' + c['Item Image (cover)'],
        title: c["Item Name"],
        description: c["Item Description"],
        chain: c["Item assetType"],
        slug: c["Slug"],
        price: c["Item Price/Best Price"],
        editions: c["Item Editions"]
      }
    })

    setAllData(cData.concat(nfts))
    onSearch();
  }

  const onSearch = async () => {
    const request = [
      nftType && { "key": "edrinks_nft_type", "constraint_type": "equals", "value": nftType },
      merchantType && { "key": "edrinks_merchant_type", "constraint_type": "equals", "value": merchantType },
      category && { "key": "edrinks_venue_type", "constraint_type": "equals", "value": category },
      country && { "key": "edrinks_country", "constraint_type": "equals", "value": country },
    ]
    const body = JSON.stringify(request.filter(c => !!c))
    const link = `https://demo.one2all.io/version-edrinks/api/1.1/obj/nft?constraints=${body}`
    const p = await getSearch(link);

    const cData = p.map(c => {
      return {
        img: 'https:' + c['Item Image (cover)'],
        title: c["Item Name"],
        description: c["Item Description"],
        chain: c["Item assetType"],
        slug: c["Slug"],
        price: c["Item Price/Best Price"],
        editions: c["Item Editions"]
      }
    })

    setAllData(cData)
  }

  const onCloseModal = () => {
    setIsFilterNFType(false);
    setIsMerchantType(false);
    setIsCountry(false);
    setIsCategory(false);
    onSearch()
  }

  return (
    <View style={styles.root}>
      <ScrollView style={{ paddingHorizontal: 12 }}>

        <CustomHeader navigation={navigation} title={'Marketplace'} />

        <View style={{ marginTop: 12 }}>

          {isSearchable && <View>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Newest First</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => setIsFilterNFType(true)}>
              <Text style={styles.btnText}>NFT Type (Loyalty, Groupon etc.)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => setIsMerchantType(true)}>
              <Text style={styles.btnText}>Merchant Type</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => setIsCategory(true)}>
              <Text style={styles.btnText}>Category</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => setIsCountry(true)}>
              <Text style={styles.btnText}>Country</Text>
            </TouchableOpacity>
          </View>}

          <TouchableOpacity
            onPress={()=>setIsSearchable(!isSearchable)}
            style={[styles.btn, { backgroundColor: '#22dbbb', borderWidth: 0, flexDirection: 'row' }]}
          >
            <Text style={[styles.btnText, { color: '#fff' }]}>Search</Text>
            <Image source={require('../../assets/filter.png')} style={{ width: 28, height: 20, marginLeft: 5 }} />
          </TouchableOpacity>

          {allData.length > 0 && allData.map((item, index) => {

            const { title, img, description, slug, price, editions } = item || '-';

            return (<View style={{ flexDirection: 'row', backgroundColor: index !== 0 ? '#ededed' : '#1f7868', padding: 10, borderRadius: 25, marginTop: 12 }}>
              <View style={{ padding: 8, backgroundColor: '#fff', borderRadius: 30, alignItems: 'center' }}>
                <Image source={{ uri: img }} style={{ width: 130, height: 150, borderRadius: 20 }} />
                <TouchableOpacity onPress={() => {
                  slug 
                    ? Linking.openURL("https://www.blockhosts.deals/item/" + slug)
                    : navigation.navigate("Marketplace", {
                      data: item,
                    })
                }} style={{ backgroundColor: '#000', marginTop: 12, borderRadius: 20, alignItems: 'center', width: 70 }}>
                  <Text style={{ color: '#fff' }}>{'View'}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <TouchableOpacity style={{ backgroundColor: index !== 0 ? '#bebebe' : '#0d453c', padding: 12, borderRadius: 20, alignItems: 'center' }}>
                  <Text style={{ color: '#fff' }}>{title}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center' }}>
                  <TouchableOpacity style={{ backgroundColor: '#0d453c', padding: 12, borderRadius: 12, alignItems: 'center', flex: 1 }}>
                    <Text style={{ color: '#fff', fontSize: 8 }}>Available</Text>
                    <Text style={{ color: '#fff', fontSize: 12 }}>{editions}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ backgroundColor: '#0d453c', padding: 12, borderRadius: 12, alignItems: 'center', marginLeft: 8, flex: 1 }}>
                    <Text style={{ color: '#fff', fontSize: 8 }}>Price</Text>
                    <Text style={{ color: '#fff', fontSize: 12 }}>{price || '-'}</Text>
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

      {
        isFilterNFType &&
        <ModalFilter
          data={['Loyalty', 'Deals', 'Discounts', 'Exclusives']}
          onClose={onCloseModal}
          onSetType={setNftType}
          type={nftType}
        />
      }

      {
        isMerchantType &&
        <ModalFilter
          data={['Venue', 'Brand']}
          onClose={onCloseModal}
          onSetType={setMerchantType}
          type={merchantType}
        />
      }

      {
        isCategory &&
        <ModalFilter
          data={['Bar', 'Pub', 'Restaurant', 'Hotel', 'AirBnB', 'BnB', 'Motel', 'Nightclub', 'Event Hall', 'Music Venue', 'Stadium']}
          onClose={onCloseModal}
          onSetType={setCategory}
          type={category}
        />
      }

      {
        isCountry &&
        <ModalFilter
          data={COUNTRIES.map(c => c.name)}
          onClose={onCloseModal}
          onSetType={setCountry}
          type={country}
        />
      }

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
  },
  btn: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12
  },
  btnText: {
    color: '#777',
    fontSize: 15
  }
});

export default MarketPage;
