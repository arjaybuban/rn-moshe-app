import React from "react";
import { View, StyleSheet, Image } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
      <TouchableOpacity onPress={() => navigation.navigate('Marketplace')}>
        <Entypo name="shop" size={28} color={route.name === 'Marketplace' ? '#22DBBB' : "#555"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Share')}>
        <MaterialCommunityIcons name="qrcode-scan" size={28} color={(route.name === 'Share' || route.name === 'ReceiveToken') ? '#22DBBB' : "#555"}/>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('MyToken')}>
        <MaterialCommunityIcons name="wallet" size={28} color={route.name === 'MyToken' ? '#22DBBB' : "#555"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
        <FontAwesome name="user" size={28} color={route.name === 'EditProfile' ? '#22DBBB' : "#555"} />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#222',
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