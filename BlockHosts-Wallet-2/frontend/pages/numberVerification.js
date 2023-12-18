import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import FullLoading from '../Components/Loadings/fullLoading';

const NumberVerificationScreen = ({ navigation }) => {

  const [code, setCode] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.root}>

      {isLoading &&
        <TouchableOpacity onPress={() => setIsLoading(false)}>
          <FullLoading />
        </TouchableOpacity>}

      <View style={styles.viewContainer}>
        <Text style={{ color: '#000', fontSize: 25, fontWeight: '700' }}>{'Number Verification'}</Text>

      </View>

      <Text style={{ textAlign: 'center', marginTop: 100, color: '#3C404B' }}>
        We have sent you an SMS with a one time verification code.
      </Text>

      <Text style={{ textAlign: 'center', marginTop: 12, color: '#3C404B' }}>
        Please enter it below.
      </Text>

      <View style={{ marginHorizontal: 30, marginVertical: 50 }}>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.button}>
            <TextInput style={{ color: '#000', fontSize: 16 }}
              placeholder={'Verification Code'}
              placeholderTextColor={'#92959d'}
              value={code}
              onChangeText={(e) => setCode(e)}
            />
          </View>

          {error && <Text style={{ textAlign: 'center', marginTop: 12, color: '#f7797b' }}>
            Invalid Code
          </Text>}

          <Text style={{ textAlign: 'center', marginTop: 22, marginBottom: 40, color: '#000', fontWeight: '700', fontSize: 16, textDecorationLine: 'underline' }}>
            Resend Verification Code
          </Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: !code ? 'rgba(175, 236, 214, 0.8)' : '#f9699a' }]}
            onPress={() => navigation.navigate('SplashSuccess')}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>Verify</Text>
          </TouchableOpacity>

          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginTop: 30 }}>
              <Text style={{ color: '#3C404B', textDecorationLine: 'underline' }}>Go Back</Text>
            </TouchableOpacity>

          </View>

        </View>
      </View>

      <View style={{ height: 20 }} />

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff'
  },
  viewContainer: {
    alignItems: "center",
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginTop: 40
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    minWidth: 290,
    backgroundColor: '#eff2f6',
    borderRadius: 12,
    marginTop: 20,
  },
});

export default NumberVerificationScreen;