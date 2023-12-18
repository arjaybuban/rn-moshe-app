import React, { useState } from "react";
import { View, StyleSheet, Modal, Dimensions, Text, Image, TouchableOpacity } from "react-native";
import Animation from "../splashLottie1.json";
import LottieView from "lottie-react-native";
import { useMoralis } from "react-moralis";
import { useNavigation } from "@react-navigation/native";
const screenWidth = Dimensions.get('window').width;

export default function ModalTransaction({ data, onClose }) {

  const { Moralis, user } = useMoralis();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { token_address, token_id, name, image, description, owner, scan } = data;

  const onConfirm = async () => {

    const ScannedList = Moralis.Object.extend("ScannedList");
    const scannedList = new ScannedList();

    scannedList.save({
      account: user.id,
      date: new Date(),
      chain: '0x1',
      address: token_address,
      token_id: token_id,
      image, name, description,
      username: owner
    });

    setTimeout(() => {
      onClose();
      navigation.navigate('Home', { t: token_address + token_id })
    }, 1000)

  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => { }}
    >
      <View style={[styles.centeredView]}>

        <View style={styles.viewContainer}>
          <View style={styles.modalView}>

            {isLoading && <LottieView
              style={{
                width: 150,
                height: 100,
              }}
              source={Animation}
              loop
              autoPlay
            />}

            {
              data && data !== 'error' && <Image
                source={require('../../assets/ic_check.png')}
                style={{ width: 80, height: 80 }}
              />
            }

            {
              data === 'error' && <Image
                source={require('../../assets/ic_failed.png')}
                style={{ width: 80, height: 80 }}
              />
            }

            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '700', marginTop: 12 }}>
              {isLoading && 'Processing'}
              {data && data !== 'error' && !isLoading && 'Confirmed'}
              {data === 'error' && 'Error! Invalid Token'}
            </Text>

            {data && data !== 'error' && <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: screenWidth - 80, marginTop: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.t0}>{'Owner'}</Text>
                <Text style={styles.t1}>{owner || 'Unnamed'}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.t0}>{'Name'}</Text>
                <Text style={styles.t1}>{name}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.t0}>{'Scan Count'}</Text>
                <Text style={styles.t1}>{scan + 1}</Text>
              </View>
              <View style={{ flexDirection: 'column', marginTop: 12 }}>
                <Text style={styles.t0}>{'Description'}</Text>
                <Text style={styles.t1}>{description}</Text>
              </View>
            </View>}

            {
              data === 'error' &&
              <Text style={{ marginTop: 12, textAlign: 'center' }}>This token has already been redeemed or is not a valid BlockHosts.io token.</Text>
            }

            <TouchableOpacity style={[styles.button, { backgroundColor: '#f9699a', marginTop: 40 }]}
              onPress={() => onClose()}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>Scan New </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => (data && data !== 'error') ? onConfirm() : onClose()}>
              <Text style={{ marginTop: 20, fontWeight: '700' }}>
                {!data ? 'Quit & Close' : 'Finish'}
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    paddingHorizontal: 12,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  modalView: {
    width: screenWidth / 1.2,
    alignItems: 'center',
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 20,
    padding: 20
  },
  t1: {
    color: '#000',
    fontWeight: '600',
    marginLeft: 8
  },
  t0: {
    color: '#f9699a',
    fontWeight: '700',
    marginLeft: 8
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    minWidth: 250,
    backgroundColor: '#eef4f6',
    borderRadius: 12,
    marginHorizontal: 30
  },
});