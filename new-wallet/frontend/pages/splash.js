import React, { useState, useEffect } from "react";
import { Dimensions, View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
const screenWidth = Dimensions.get('window').width;

const SplashScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.box}>

        <Image
          source={require('../../assets/new.png')}
          style={styles.logo}
        />

        <Text style={{ color: '#fff', marginTop: 20, fontSize: 12 }}>Owning a Burping Ape gives you discounts, cashback, exclusive menu's, parties, loyalty and much more.</Text>

        <View style={styles.gifBox}>
          <Image
            source={require('../../assets/gif.gif')}
            style={styles.gif}
          />
        </View>
        <Text style={{ color: '#fff' }}>Check out the collection inside</Text>
      </View>

      <TouchableOpacity style={{ marginTop: 30 }} onPress={()=>navigation.navigate('auth')}>
        <Text style={{ textAlign: 'center' }}>Skip</Text>
      </TouchableOpacity>

    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#22dbbb",
  },
  box: {
    backgroundColor: '#FFACD8',
    alignItems: 'center',
    width: screenWidth - 40,

    // boxShadow: '0px 26px 55px rgba(0, 0, 0, 0.07)',
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gifBox: {
    borderWidth: 15,
    borderColor: '#fff',
    borderRadius: 18,
    marginVertical: 20
  },
  logo: {
    width: 280,
    height: 120
  },
  gif: {
    width: screenWidth - 160,
    height: screenWidth - 160
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
