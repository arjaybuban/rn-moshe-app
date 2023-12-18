import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { StyleSheet, Text, Image, View, TouchableOpacity, CheckBox, } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";

const LazyMintScreen = ({ navigation }) => {
  
  const { Moralis, authenticate, user, account, isAuthenticated,  } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();

  console.log('walletAddress: ', walletAddress) 

  const onLazyMint = async () => {
    const request = {
      chain: 'eth',
      userAddress: walletAddress,
      tokenType: 'ERC1155',
      tokenUri: '/ipfs/QmWLsBu6nS4ovaHbGAXprD1qEssJu4r5taQfB74sCG51tp',
      supply: 3,
      royaltiesAmount: 3, 
    }
    
    console.log('request:::::::::', request)
    const data = await Moralis.Plugins.rarible.lazyMint(request)

    console.log('data:::::::::', data)
  }
  const [isSelected, setSelection] = useState(false);

  return (
    <ScrollView style={styles.root}>

      <View style={styles.viewContainer}>
        <Text style={{ color: '#000', fontSize: 25, fontWeight: '700' }}>{'Lazy Mint Your NFT'}</Text>

        <Image source={require('../../assets/profile.png')} style={styles.logo} />
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
        </View>
      </View>

      <Text style={{ textAlign: 'center', marginTop: 12, color: '#3C404B' }}>0xCC00...b8E50</Text>

      <View style={{ marginHorizontal: 30, marginVertical: 20 }}>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={styles.button} >
            <Text style={{ color: '#92959d', fontSize: 16 }}>Name</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} >
            <Text style={{ color: '#92959d', fontSize: 16 }}>Number</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} >
            <Text style={{ color: '#92959d', fontSize: 16 }}>Country</Text>
          </TouchableOpacity>

          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20, }}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
            <Text style={{ textAlign: 'center', color: '#92959d', fontSize: 12 }}>I agree to the terms and conditions of use</Text>

          </View>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#0f7fff' }]} 
            onPress={()=> onLazyMint()}  
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>Mint</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 20 }} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff'
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    marginTop: 40
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  t1: {
    fontSize: 40,
    lineHeight: 70,
    fontWeight: '700'
  },
  viewContainer: {
    alignItems: "center",
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginTop: 40
  },
  logo: {
    height: 130,
    width: 130,
    borderRadius: 65,
    marginTop: 12
  },
  right: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    minWidth: 250,
    backgroundColor: '#eff2f6',
    borderRadius: 12,
    marginTop: 20
  }
});

export default LazyMintScreen;