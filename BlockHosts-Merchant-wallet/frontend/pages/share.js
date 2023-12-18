import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, ScrollView, Image } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import CustomNavbar from "../Components/CustomNavbar";
import { useToast } from "react-native-toast-notifications";
import ModalTransaction from '../Components/ModalTransaction';

const ShareScreen = ({ navigation }) => {

  const { Moralis, account, user } = useMoralis();
  const toast = useToast();
  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState(false);

  return (
    <View style={styles.root}>

      <ScrollView style={{ paddingHorizontal: 12 }}>

        <CustomHeader navigation={navigation} title={'My Tokens'} />

        <TouchableOpacity style={[styles.button, { backgroundColor: 'transparent' }]}
          onPress={() => navigation.navigate('Scanning', { onScanCode: async(e) => {

            setIsModal(true);
            setModalData(null);

            const { token_address, token_id, username } = JSON.parse(e);

            const ScannedListQuery = new Moralis.Query('ScannedList');
            ScannedListQuery.equalTo('token_id', token_id).equalTo('address', token_address).equalTo('account', user.id);
            const object = await ScannedListQuery.first();

            setModalData(object ? 'error' : e);

            // if(object){
            //   toast.show("Already scanned!");
            //   return false;

            // }else{
            //   navigation.navigate('ConfirmRedeem', {data: e})
              
            // }

            // navigation.goBack();
            // route.params.onScanCode(e);
          }})}>
          <Text style={{ color: '#fff', fontSize: 16 }}>Scan Customer Token</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />

      </ScrollView>

      <CustomNavbar />

      {isModal && <ModalTransaction 
        data={modalData}
        onClose={()=>{
          setIsModal(false);
          navigation.goBack();
        }}
      />}

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    backgroundColor: '#902a4d'
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
