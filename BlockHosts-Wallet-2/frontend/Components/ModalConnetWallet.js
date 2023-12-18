import React from "react";
import { StyleSheet, Text, Modal, Image, View } from 'react-native';
import LinearButton from "./LinearButton";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ModalConnetWallet({onClick}) {

  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <View style={styles.row}>
              <Text style={styles.t1}>Connect wallet</Text>
              <Icon name="window-close" size={24} color="black" />
            </View>

            <View style={styles.center}>
              <Image source={require('../../assets/image/wallet.png')} />
            </View>

            <Text style={styles.t2}>By connecting your wallet, you agree to our <Text style={styles.t3}>Terms of Service</Text> and our <Text style={styles.t3}>Privacy Policy</Text></Text>

            <View style={{ height: 12}}/>

            <LinearButton title='Connect Wallet' onClick={onClick}/>

            <Text style={[styles.t2, { marginTop: 12}]}>Learn more about wallets</Text>
          </View>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  t1: {
    fontSize: 25,
    fontWeight: '700'
  },
  t2: {
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'center'
  },
  t3: {
    fontSize: 16,
    fontWeight: '700'
  }
});
