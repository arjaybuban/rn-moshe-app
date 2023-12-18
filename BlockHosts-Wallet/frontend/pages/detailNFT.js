import React, { useState } from "react";
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, ScrollView, Image, Modal } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import CustomNavbar from "../Components/CustomNavbar";
import { useWeb3Transfer } from "react-moralis";
import { TextInput } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";

const screenWidth = Dimensions.get('window').width;

const DetailNFTScreen = ({ navigation, route }) => {

  const { colors } = useTheme();
  const { data } = route.params;
  const { name, image, description } = JSON.parse(data.metadata);
  const [receiver, setReceiver] = useState();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { contract_type, token_address, token_id } = data;
  const [isModal, setIsModal] = useState(false);

  const { fetch, error, } = useWeb3Transfer();

  return (
    <View style={styles.root}>

      <ScrollView style={{ paddingHorizontal: 12 }}>

        <CustomHeader title={'My Tokens'} />

        <Image source={{ uri: image }} style={styles.banner} />

        <View >
          <Text style={styles.t1}>{name}</Text>
          <Text style={styles.t2}>
            The standard Lorem Ipsum passage, used since the 1500s</Text>
          <Text style={styles.t3}>
            {description}
          </Text>
        </View>

        {isConfirmed && <View style={styles.button}>
          <TextInput style={{ color: '#000', fontSize: 12, backgroundColor: '#eef4f6' }}
            placeholder={'Enter Wallet Address'}
            placeholderTextColor={'#92959d'}
            value={receiver}
            onChangeText={(e) => setReceiver(e)}
          />
        </View>}

        {!isConfirmed && <TouchableOpacity style={[styles.button, { backgroundColor: '#363738' }]}
          onPress={() => navigation.navigate('Redeem', {
            data, onScanCode: (e) => {
              setIsConfirmed(true);
              setReceiver(e)
            }
          })}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>Redeem Token </Text>
        </TouchableOpacity>}

        <TouchableOpacity style={[styles.button, { backgroundColor: '#22DBBB', marginTop: 12 }]}
          onPress={() => setIsModal(true)}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>Claim Cash Voucher </Text>
        </TouchableOpacity>

        {!isConfirmed && <TouchableOpacity style={{ marginTop: 12 }} onPress={() => setIsConfirmed(true)}>
          <Text style={{ fontSize: 16, color: '#6E6E6E', textAlign: 'center' }}>Transfer Token</Text>
        </TouchableOpacity>}

        {isConfirmed && receiver && <TouchableOpacity style={[styles.button, { backgroundColor: '#363738', marginTop: 22 }]} onPress={() => fetch({
          params: {
            type: 'erc721',
            receiver,
            contractAddress: token_address,
            tokenId: token_id,
          }
        })}>
          <Text style={{ fontSize: 16, color: '#ddd', textAlign: 'center' }}>Confirm Token</Text>
        </TouchableOpacity>}

        <View style={{ height: 20 }} />

      </ScrollView>

      <CustomNavbar />

      {
        isModal &&
        <Modal
          transparent={true}
          visible={isModal}
          onRequestClose={() => { }}
        >
          <View style={styles.centeredView}>

            <View style={styles.viewContainer}>
              <View style={styles.modalView}>
                <Image source={require('../../assets/hold.png')} style={styles.logo} />
                <Text style={{ fontSize: 27, fontWeight: '700', textAlign: 'center', marginTop: 12 }}>Just a Sec...</Text>
                <Text style={{ fontSize: 17, fontWeight: '700', textAlign: 'center', marginTop: 12 }}>You are about to activate your cash voucher valid for up to 48 hours.</Text>
                <Text style={{ fontSize: 16, fontWeight: '700', textAlign: 'center', marginTop: 12 }}>Please make sure you are ready to continue at this time.</Text>
                <Text style={{ fontSize: 16, fontWeight: '700', textAlign: 'center' }}>You can always return later if you are not yet ready to redeem.</Text>
                <Text style={{ fontSize: 19, fontWeight: '700', textAlign: 'center', color: '#DA920A', marginTop: 15 }}>U.K. VENUES ONLY</Text>
                <Text></Text>
                <TouchableOpacity 
                  style={styles.btn} 
                  onPress={() => {
                    setIsModal(false)
                    navigation.navigate('Map')  
                  }}>
                  <Text style={{ color: '#fff' }}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  banner: {
    width: screenWidth - 24,
    marginTop: 20,
    borderRadius: 15,
    height: screenWidth + 74,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  t1: {
    fontSize: 18,
    marginTop: 12,
    fontWeight: '700',
    marginHorizontal: 4,
    marginTop: 25,
    textAlign: 'center',
    color: '#111'
  },
  t2: {
    marginTop: 22,
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
    marginHorizontal: 12,
  },
  t3: {
    marginTop: 12,
    fontSize: 11,
    fontWeight: '500',
    color: '#111',
    marginHorizontal: 12,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: 'center',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 17,
    padding: 12,
    borderRadius: 8,
    elevation: 3,
    height: 50,
    marginHorizontal: 2,
    backgroundColor: '#333'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    minWidth: 250,
    backgroundColor: '#eef4f6',
    borderRadius: 12,
    marginTop: 50,
    marginHorizontal: 30
  },
  btn: {
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 8,
    margin: 3
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    paddingHorizontal: 12,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  modalView: {
    padding: 20,
    width: 300,
    alignItems: 'center',
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 20,
  },
  btn: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    alignItems: 'center'
  },
  logo: {
    width: 80,
    height: 90,
    marginTop: 18
  }
});

export default DetailNFTScreen;
