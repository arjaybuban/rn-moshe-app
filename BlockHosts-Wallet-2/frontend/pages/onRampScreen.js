import React, { useRef } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Clipboard } from 'react-native';
import { WebView } from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import { useNavigation } from '@react-navigation/core';
import { useMoralisDapp } from '../providers/MoralisDappProvider/MoralisDappProvider';
import { useToast } from "react-native-toast-notifications";

const screenWidth = Dimensions.get('window').width;

const OnRampScreen = () => {

  const {goBack} = useNavigation()
  const webViewRef = useRef(null);
  const { walletAddress } = useMoralisDapp();
  const toast = useToast();

  const onClipboard = () => {
    Clipboard.setString(walletAddress);
    toast.show('Your wallet address coped in clipboard.')
  }

  return (
    <View style={{flex: 1, width: screenWidth, backgroundColor: 'orange'}}>
      <View style={{flexDirection: 'row', width: screenWidth, height: 50, backgroundColor: '#000', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 6}}>
        <TouchableOpacity onPress={()=>goBack()}>
          <MaterialIcons name="arrow-back" size={28} color={'#fff'} />
        </TouchableOpacity>
        <Text style={{color: '#fff', fontSize: 16, fontWeight: '700'}}>On Ramp</Text>
        <TouchableOpacity onPress={onClipboard}>
          <Foundation name="clipboard-pencil" size={28} color={'#fff'} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, backgroundColor: 'brown',  }}>
        <WebView 
          ref={webViewRef} 
          source={{ uri: 'https://widget.wert.io/default/widget/' }} 
          automaticallyAdjustContentInsets={false}
          style={{width: '70%'}}  
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

export default OnRampScreen;
