import React from "react";
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, ScrollView, Image, TextInput } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import CustomNavbar from "../Components/CustomNavbar";

const { width, height } = Dimensions.get('window');

const CashVoucherScreen = ({ route, navigation }) => {

  return (
    <View style={styles.root}>

      <ScrollView style={{ paddingHorizontal: 12, }}>

        <CustomHeader navigation={navigation} title={''} />

        <Text style={styles.t1}>Cash Voucher</Text>

        <View style={styles.container}>

          <Text style={{ fontSize: 14, fontWeight: '700', textAlign: 'center' }}>Present the below voucher to venue staff</Text>

          <Image source={require('../../assets/pub.png')} style={styles.pub} />

          <Text style={{ fontSize: 36, fontWeight: '700', textAlign: 'center', marginTop: 12, color: '#22DBBB' }}>$10.00</Text>
          <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center', marginTop: 3 }}>Voucher Code:</Text>
          <Text style={{ fontSize: 23, fontWeight: '700', textAlign: 'center', marginTop: 3 }}>15245892138725</Text>
          <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center', marginTop: 4 }}>Valid: 01.05.2023</Text>

        </View>

        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Home')}>
          <Text style={{ color: '#777' }}>Back</Text>
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
    backgroundColor: '#f7faff'
  },
  t1: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 4,
    marginTop: -16,
    textAlign: 'center',
    color: '#111'
  },
  map: {
    width: width - 60,
    height: height - 310,
  },
  container: {
    flex: 1,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: '#e9ebef',
    // height: height - 310,
    marginHorizontal: 12,
    padding: 12
  },
  btn: {
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20
  },
  pub: {
    width: width - 70,
    height: width - 160,
    borderRadius: 12
  }
});

export default CashVoucherScreen;
