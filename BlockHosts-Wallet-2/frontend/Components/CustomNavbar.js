import React from "react";
import { View, StyleSheet, Image } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';

export default function CustomNavbar() {

  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.viewContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Market')}>
        {/* <Entypo name="shop" size={28} color={route.name === 'Market' ? '#f9699a' : "#CACACA"} /> */}
        <Image source={require('../../assets/wall1.png')} style={{ width: 40, height: 40 }} />

      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ReceiveToken')}>
        <Image source={require('../../assets/qr8.png')} style={{ width: 32, height: 32 }} />

        {/* <MaterialCommunityIcons name="qrcode-scan" size={28} color={(route.name === 'ReceiveToken' || route.name === 'ReceiveToken') ? '#f9699a' : "#CACACA"}/> */}
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={require('../../assets/logo2.png')} style={styles.logo} />
      </TouchableOpacity> */}

      <TouchableOpacity onPress={() => navigation.navigate('MyToken')}>
      <Image source={require('../../assets/map1.png')} style={{ width: 40, height: 40 }} />

        {/* <MaterialCommunityIcons name="wallet" size={28} color={route.name === 'MyToken' ? '#f9699a' : "#CACACA"} /> */}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
      <Image source={require('../../assets/pro1.png')} style={{ width: 40, height: 40 }} />

        {/* <FontAwesome name="user" size={28} color={route.name === 'EditProfile' ? '#f9699a' : "#CACACA"} /> */}
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#4b4b4b',
    borderRadius: 40,
    marginHorizontal: 10,
    marginVertical: 8,
    paddingHorizontal: 12,
    height: 60,
    marginLeft: 12,
  },
  logo: {
    width: 48,
    height: 48
  }
});