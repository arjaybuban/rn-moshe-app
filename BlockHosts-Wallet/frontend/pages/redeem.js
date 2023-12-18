import React from "react";
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, ScrollView, Image } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import CustomNavbar from "../Components/CustomNavbar";
import QRCode from 'react-native-qrcode-svg';
import { useMoralis } from "react-moralis";

const screenWidth = Dimensions.get('window').width;

const RedeemScreen = ({ navigation, route }) => {

  const { user } = useMoralis();
  const { data } = route.params;
  const { name, image, description } = JSON.parse(data.metadata);
  const { contract_type, token_address, token_id } = data;
  const qrcode = JSON.stringify({
    contract_type, token_address, token_id, username: user.attributes.name
  })

  return (
    <View style={styles.root}>

      <ScrollView style={{ paddingHorizontal: 12 }}>

        <CustomHeader navigation={navigation} title={'Redeem Token'} />
        <View style={{alignItems: 'center'}}>
          <View style={{ alignItems: 'center', marginTop: 25, backgroundColor: '#fff', width: screenWidth - 100, paddingVertical: 28, borderRadius: 44 }}>
            <QRCode
              value={qrcode}
              size={200}
            />
          </View>
        </View>


        <View>
          <Text style={styles.t1}>Staff Scan to Redeeem</Text>
          <Text style={styles.t2}>
            {name}</Text>
          <Text style={styles.t3}>
            {description}
          </Text>
        </View>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#727375' }]}
          onPress={() => navigation.navigate('Scanning', { onScanCode: (e) => {
            navigation.goBack();
            route.params.onScanCode(e);
          }})}>
          <Text style={{ color: '#fff', fontSize: 16 }}>Next</Text>
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
  iconBack: {
    position: 'absolute',
    left: 1,
    top: 22,
    zIndex: 100
  },
  tinyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#000'
  },
  tinyAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#000'
  },
  banner: {
    width: screenWidth - 74,
    marginTop: 20,
    borderRadius: 15,
    height: screenWidth - 74,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: screenWidth - 24,
    marginTop: 60,
    borderRadius: 15,
    height: 280,
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
    fontSize: 30,
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

  t4: {
    fontSize: 18,
    marginLeft: 12,
    fontWeight: '700'
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
  box2: {
    marginHorizontal: 2,
    marginTop: 37,
    padding: 14,
    paddingVertical: 18,
    borderRadius: 18,
    elevation: 3
  },
  box3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 17,
    padding: 12,
    borderRadius: 18,
    elevation: 3,
    marginHorizontal: 2,
  },
  t5: {
    fontSize: 22,
    fontWeight: '400'
  },
  t7: {
    color: '#888',
    fontSize: 16,
    fontWeight: '700'
  },
  t8: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 12
  },
  t9: {
    color: '#555',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 12,
    marginBottom: 5
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
  },
  webview: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: 'red'
  },
  box: {
    width: 300,
    height: 300,
  }
});

export default RedeemScreen;
