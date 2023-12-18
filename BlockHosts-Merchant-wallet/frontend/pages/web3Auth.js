import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import Web3Auth, { LOGIN_PROVIDER, OPENLOGIN_NETWORK } from "@web3auth/react-native-sdk";
import Constants, { AppOwnership } from "expo-constants";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Buffer } from "buffer";
import { useMoralis } from "react-moralis";
import { useNavigation } from "@react-navigation/native";

global.Buffer = global.Buffer || Buffer;

const scheme = "com.buurp";


const resolvedRedirectUrl =
  Constants.appOwnership == AppOwnership.Expo || Constants.appOwnership == AppOwnership.Guest
    ? Linking.createURL("auth", {})
    : Linking.createURL("auth", { scheme: scheme });

    console.log('resolvedRedirectUrl', resolvedRedirectUrl)

const REQUEST = {
  clientId: "BJMlrj_lhjOUUcRjpntWMbD_HTaHxrlaA4Ck5oG1Rru00sn5yrA3Y0Osq0ybr-9tKLHANIAWEzz1V9MeS11bCQI",
  network: OPENLOGIN_NETWORK.TESTNET,
  whiteLabel: {
    name: "Buurp",
    logoLight: "https://web3auth.io/images/logo-light.png",
    logoDark: "https://web3auth.io/images/logo-dark.png",
    defaultLanguage: "en",
    dark: true,
    theme: {
      primary: "#cddc39",
    },
  },
}

export const Web3AuthScreen = ({ }) => {

  const [errorMsg, setErrorMsg] = useState("");
  const [email, onChangeEmail] = useState();
  const navigation = useNavigation();
  const { login, Moralis, signup } = useMoralis();

  const loginGoogle = async () => {

    try {
      const web3auth = new Web3Auth(WebBrowser, REQUEST);
      const state = await web3auth.login({
        loginProvider: LOGIN_PROVIDER.GOOGLE,
        redirectUrl: resolvedRedirectUrl,
        clientId: "57002573218-6v86g1cq8256g74o05l36amubabpgrpt.apps.googleusercontent.com", // google's client id
      });
      onCustomSignUp(state?.userInfo);
    } catch (e) {
      console.error(e);
      setErrorMsg(String(e));
    }
  }

  const loginEmail = async () => {
    try {
      const web3auth = new Web3Auth(WebBrowser, REQUEST);
      const state = await web3auth.login({
        loginProvider: LOGIN_PROVIDER.EMAIL_PASSWORDLESS,
        redirectUrl: resolvedRedirectUrl,
        extraLoginOptions: {
          login_hint: email,
        },
      });
      onCustomSignUp(state?.userInfo);
    } catch (e) {
      console.error(e);
      setErrorMsg(String(e));
    }
  };

  const onCustomSignUp = async (userData) => {
    const password = '!Lov3MyPiano';

    const me = new Moralis.User();
    me.set("username", userData?.email);
    me.set("password", password);
    me.set("name", userData?.name);
    me.set("email", userData?.email);
    me.set("profileImage", userData?.profileImage);
    me.set("typeOfLogin", userData?.typeOfLogin);
    me.set("verifierId", userData?.verifierId);
    me.set("verifier", userData?.verifier);

    try {
      await me.signUp();
      console.log('Congratulations! SignUp Successful!');
      onCustomLogin(userData?.email, password)
    } catch (error) {
      console.log("Error: " + error.code + " " + error.message, 'error')
      if (error.code === 202) {
        onCustomLogin(userData?.email, password)
      }
    }
  }

  const onCustomLogin = async (email, pwd) => {
    try {
      await login(email, pwd)
        .then(res => {
          if (!res) {
            console.log('Invalid username/password')
          } else {
            console.log('Congratulations! Login Successful!')
          }
        })
    } catch (error) {
      console.log("Error: " + error.code + " " + error.message, 'error')
    }
  }

  const testLogin = async () => {

    // const me = new Moralis.User();
    // me.set("username", 'ccc');
    // me.set("password", '!Lov3MyPiano');
    // me.set("email", 'ccc@gmail.com');
    // const testEmail = 'test222@gmail.com';
    // try {
    //   await signup('test222', '!Lov3MyPiano', 'test222@gmail.com')
    //   console.log('Congratulations! SignUp Successful!');
    //   onCustomLogin('test222@gmail.com', '!Lov3MyPiano')
    // } catch (error) {
    //   console.log("Error: " + error?.code + " " + error?.message, 'error')
    //   if (error.code === 202) {
    //     onCustomLogin('test222@gmail.com', '!Lov3MyPiano')
    //   }
    // }

    // console.log('Congratulations! SignUp Successful!');
    onCustomLogin('chunjomarieu@outlook.com', '!Lov3MyPiano')
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>

        <View style={{ flexDirection: 'row', padding: 12 }}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: 20, color: '#666', fontWeight: '700' }}>Sign In</Text>
            <Text style={{ fontSize: 12, color: '#999' }}>Select one of the following to continue</Text>
          </View>
        </View>

        <View style={{ backgroundColor: '#f9f9fb', padding: 12 }}>

          <Text style={{ color: '#999', fontWeight: '700', paddingHorizontal: 12 }}>CONTINUE WITH</Text>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={loginGoogle} style={styles.socialBox}>
              <Image source={require('../../assets/google.png')} style={styles.social} />
            </TouchableOpacity>
          </View>

        </View>

        <View style={{ backgroundColor: '#f9f9fb', padding: 12 }}>

          <Text style={{ color: '#999', fontWeight: '700', paddingHorizontal: 12 }}>EMAIL</Text>

          <TextInput
            style={styles.input}
            placeholder={'email'}
            value={email}
            onChangeText={onChangeEmail}
          />

          <TouchableOpacity style={styles.input} onPress={loginEmail}>
            <Text style={{ textAlign: 'center', color: '#bbb' }}>Continue with Email</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.input} onPress={testLogin}>
            <Text style={{ textAlign: 'center', color: '#bbb' }}>Test Login</Text>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ textAlign: 'center', color: '#333', marginTop: 12 }}>Back</Text>
          </TouchableOpacity>

        </View>

        <View style={{ padding: 12 }} />

        <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between' }}>

          <Text style={{ fontSize: 9, color: '#aaa' }}>Terms of use Privacy policy</Text>
          <Text style={{ fontSize: 9, color: '#aaa' }}>Secured by web3auth</Text>

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  main: {
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 12,
  },
  logo: {
    width: 50,
    height: 50
  },
  socialBox: {
    width: 38,
    height: 38,
    backgroundColor: '#fff',
    margin: 6,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center'
  },
  social: {
    width: 25,
    height: 25,
    padding: 5,
    borderRadius: 13,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 7,
    marginTop: 12,
    marginHorizontal: 12,
    backgroundColor: '#fff'
  }
});
