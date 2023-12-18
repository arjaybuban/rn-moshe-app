import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, ScrollView, Image } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import CustomNavbar from "../Components/CustomNavbar";

const screenWidth = Dimensions.get('window').width;

const ShareScreen = ({ navigation }) => {

  return (
    <View style={styles.root}>

      <ScrollView style={{ paddingHorizontal: 12 }}>

        <CustomHeader navigation={navigation} title={'My Tokens'} />

        <TouchableOpacity style={[styles.button, { backgroundColor: '#727375' }]}
          onPress={() => navigation.navigate('Scanning', { onScanCode: (e) => {
            // navigation.goBack();
            // route.params.onScanCode(e);
            navigation.navigate('ConfirmRedeem', {data: e})
          }})}>
          <Text style={{ color: '#fff', fontSize: 16 }}>Scan Customer Token</Text>
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
});

export default ShareScreen;
