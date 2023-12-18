import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, ScrollView, Image } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import CustomNavbar from "../Components/CustomNavbar";
import Entypo from 'react-native-vector-icons/Entypo';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import UtilService from "../utils/utilService";

const screenWidth = Dimensions.get('window').width;

const ConfirmRedeemScreen = ({ navigation, route }) => {

  const { data } = route.params;
  const Web3Api = useMoralisWeb3Api();
  const { Moralis, account, user } = useMoralis();

  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [owner, setOwner] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    onGetSth();
  }, [data])

  const onGetSth = async () => {
    const { token_address, token_id, username } = JSON.parse(data);

    const meta = await Web3Api.token.getTokenIdMetadata({
      chain: '0x5',
      address: token_address,
      token_id: token_id,
    })

    const metadata = JSON.parse(meta.metadata)
    const { image, name, description,  } = metadata;

    setImage(image);
    setName(name);
    setDescription(description);
    // setOwner(meta.owner_of)
    setOwner(username || UtilService.truncate(meta.owner_of))
  }

  const onConfirm = async() => {

    const { token_address, token_id, username } = JSON.parse(data);

    const ScannedList = Moralis.Object.extend("ScannedList");
    const scannedList = new ScannedList();

    scannedList.save({
      account: user.id,
      date: new Date(),
      chain: '0x5',
      address: token_address,
      token_id: token_id,
      image, name, description, 
      username: owner
    });

    setTimeout(() => {
      navigation.navigate('Home', {t: token_address + token_id})
    }, 3000)

  }

  return (
    <View style={styles.root}>

      <ScrollView style={{ paddingHorizontal: 12 }}>

        <View style={{backgroundColor: '#282926', borderRadius: 20, padding: 12, alignItems: 'center', marginTop: 20}}>

          <Image source={{ uri: image }} style={styles.banner} />

          <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', width: screenWidth - 80, marginTop: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.t0}>{'Owner'}</Text>
              <Text style={styles.t1}>{owner}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.t0}>{'Name'}</Text>
              <Text style={styles.t1}>{name}</Text>
            </View>
            <View style={{flexDirection: 'column', marginTop: 12}}>
              <Text style={styles.t0}>{'Description'}</Text>
              <Text style={styles.t1}>{description}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#363738' }]}
            onPress={()=>onConfirm()}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>Confirm & Redeem</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{ marginTop: 12 }}
            onPress={()=>navigation.navigate('Home')}
          >
            <Text style={{ fontSize: 16, color: '#6E6E6E', textAlign: 'center' }}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />

      </ScrollView>

      <CustomNavbar />

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  banner: {
    width: screenWidth - 70,
    marginTop: 20,
    borderRadius: 15,
    height: screenWidth - 30,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  t0: {
    fontSize: 18,
    color: '#f96a9b'
  },
  t1: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 4,
    textAlign: 'center',
    color: '#bbb',
    marginLeft: 12
  },
  t2: {
    marginTop: 22,
    fontSize: 14,
    fontWeight: '700',
    color: '#bbb',
    marginHorizontal: 12,
  },
  t3: {
    marginTop: 12,
    fontSize: 11,
    fontWeight: '500',
    color: '#111',
    marginHorizontal: 12,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: 'center',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 17,
    padding: 12,
    borderRadius: 8,
    elevation: 3,
    height: 50,
    marginHorizontal: 2,
    backgroundColor: '#333'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    minWidth: 250,
    backgroundColor: '#22DBBB',
    borderRadius: 12,
    marginTop: 50,
    marginHorizontal: 30
  }
});

export default ConfirmRedeemScreen;
