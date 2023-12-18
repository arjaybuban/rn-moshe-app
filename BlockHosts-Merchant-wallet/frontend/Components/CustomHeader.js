import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import UtilService from "../utils/utilService";

export default function CustomHeader({ title, hello }) {

  const navigation = useNavigation();
  const { user } = useMoralis();
  const { walletAddress } = useMoralisDapp();

  const profilImage = user?.attributes?.profileImage;
  const userName = user?.attributes?.name || user?.attributes?.username

  return (
    <View style={styles.viewContainer}>
      <View style={{ maxWidth: 260, justifyContent: 'center'}}>
        {hello && <Text style={{ fontSize: 14, fontWeight: '300', color: '#666' }}>Hello again</Text>}
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}>{title || userName || '-'}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={profilImage ? { uri: profilImage } :
          require('../../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={{ fontSize: 8, fontWeight: '700', color: '#999', textAlign: 'center' }}>{UtilService.truncate(walletAddress) || '-'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginTop: 8,
    // backgroundColor: 'brown'
    // height: 70,
  },
  logo: {
    height: 60,
    width: 60,
    borderRadius: 8
  },
  right: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  }
});