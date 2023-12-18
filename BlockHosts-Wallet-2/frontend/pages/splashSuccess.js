import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

const SplashSuccessScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo3.png')}
        style={styles.logo}
      />

      <Text style={styles.text}>
        Success!
      </Text>

      <Text style={styles.text}>
        You are in!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MoreAboutYou')}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>Continue to Wallet</Text>
      </TouchableOpacity>


    </View>
  );
};

export default SplashSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9699a",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    minWidth: 240,
    backgroundColor: '#0c4d41',
    borderRadius: 12,
    marginTop: 150,
  },
  text: {
    fontSize: 42,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'left',
    lineHeight: 50,
  }
});
