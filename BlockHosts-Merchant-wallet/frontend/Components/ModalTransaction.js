import React, { useEffect, useState } from "react";
import { View, StyleSheet, Modal, Dimensions, Text, Image, TouchableOpacity } from "react-native";
import Animation from "../splashLottie1.json";
import LottieView from "lottie-react-native";
import { useTheme } from "react-native-paper";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { useNavigation } from "@react-navigation/native";
import UtilService from "../utils/utilService";
const screenWidth = Dimensions.get('window').width;

export default function ModalTransaction({ data, onClose }) {

  const { colors } = useTheme();
  const Web3Api = useMoralisWeb3Api();
  const { Moralis, user } = useMoralis();
  const navigation = useNavigation();

  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [owner, setOwner] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    if (data && data !== 'error') {
      onGetSth();
    }
  }, [data])

  const onGetSth = async () => {

    const { token_address, token_id, username } = JSON.parse(data);

    const meta = await Web3Api.token.getTokenIdMetadata({
      chain: '0x5',
      address: token_address,
      token_id: token_id,
    })

    const metadata = JSON.parse(meta.metadata)
    const { image: c, name: n, description: d, } = metadata;

    setImage(c);
    setName(n);
    setDescription(d);
    // setOwner(meta.owner_of)
    setOwner(username || UtilService.truncate(meta.owner_of));

  }

  const onConfirm = async() => {

    const { token_address, token_id, username } = JSON.parse(data) || '';
    const ScannedList = Moralis.Object.extend("ScannedList");
    const scannedList = new ScannedList();

    scannedList.save({
      account: user.id,
      date: new Date(),
      chain: '0x5',
      address: token_address,
      token_id: token_id,
      image, name, description, 
      username: owner
    });

    setTimeout(() => {
      onClose();
      navigation.navigate('Home', {t: token_address + token_id})
    }, 1000)

  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => { }}
    >
      <View style={[styles.centeredView, { backgroundColor: colors.primary }]}>

        <View style={styles.viewContainer}>
          <View style={styles.modalView}>

            {!data && <LottieView
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
              {!data && 'Processing'}
              {data && data !== 'error' && 'Confirmed'}
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
              <View style={{ flexDirection: 'column', marginTop: 12 }}>
                <Text style={styles.t0}>{'Description'}</Text>
                <Text style={styles.t1}>{description}</Text>
              </View>
            </View>}

            {
              data === 'error' &&
              <Text style={{ marginTop: 12, textAlign: 'center'}}>This token has already been redeemed or is not a valid BlockHosts.io token.</Text>
            }

            <TouchableOpacity onPress={() => (data && data !== 'error') ? onConfirm() : onClose()}>
              <Text style={{ marginTop: 50, fontWeight: '700' }}>
                {!data ? 'Quit & Close': 'Finish'}
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
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    // height: 70,
    paddingHorizontal: 12,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)'
    // opacity: 0.2
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
  }
});