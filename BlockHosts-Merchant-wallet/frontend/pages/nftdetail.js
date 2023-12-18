import React from "react";
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, ScrollView, Image } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import CustomNavbar from "../Components/CustomNavbar";
import Entypo from 'react-native-vector-icons/Entypo';

const screenWidth = Dimensions.get('window').width;

const NFTDetailScreen = ({ navigation, route }) => {

  const { data } = route.params;
  const { name, image, description } = JSON.parse(data.metadata);

  return (
    <View style={styles.root}>

      <ScrollView style={{ paddingHorizontal: 12 }}>

        <CustomHeader title={'My Tokens'} />

        <Image source={{uri: 'https://ipfs.moralis.io:2053/ipfs' + image.substring(6) }} style={styles.banner} />

        <View>
          <Text style={styles.t1}>{name}</Text>
          <Text style={styles.t2}>
            Description</Text>
            <Text style={styles.t3}>
            {description}
          </Text>
        </View>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#727375', height: 60, flexDirection: 'row' }]} onPress={()=>navigation.navigate('ReceiveToken')}>
          <Text style={{ color: '#fff', fontSize: 16, marginRight: 12 }}>Share</Text>
          <Entypo name="share" size={24} color="#22DBBB" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#363738' }]}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>Redeeem Token</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 12}}>
          <Text style={{ fontSize: 16, color: '#6E6E6E', textAlign: 'center' }}>Transfer Token</Text>
        </TouchableOpacity>

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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  banner: {
    width: screenWidth - 24,
    marginTop: 20,
    borderRadius: 15,
    height: screenWidth + 74,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  t1: {
    fontSize: 18,
    marginTop: 12,
    fontWeight: '700',
    marginHorizontal: 4,
    marginTop: 25,
    textAlign: 'center',
    color: '#111'
  },
  t2: {
    marginTop: 22,
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
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

export default NFTDetailScreen;
