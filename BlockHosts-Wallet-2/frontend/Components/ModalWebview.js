import React, { useRef } from "react";
import { StyleSheet, Text, View, Clipboard, Dimensions, TouchableOpacity } from 'react-native';
import WebView from "react-native-webview";
import { useMoralisDapp } from '../providers/MoralisDappProvider/MoralisDappProvider';
import { useToast } from "react-native-toast-notifications";
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const screenWidth = Dimensions.get('window').width;

export default function ModalWebview({ onClose }) {

  const webViewRef = useRef(null);
  const { walletAddress } = useMoralisDapp();
  const toast = useToast();

  const onClipboard = () => {
    Clipboard.setString(walletAddress);
    toast.show('Your wallet address coped in clipboard.')
  }

  return (
    <Modal
      style={styles.modalRoot}
      onBackdropPress={onClose}
      isVisible={true}
    >
      <View style={styles.modal}>

          <View style={{ flex: 1 }}>
            <WebView
              ref={webViewRef}
              source={{ uri: 'https://widget.wert.io/default/widget/' }}
              automaticallyAdjustContentInsets={false}
              style={{ flex: 1 }}
            />
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 12, width: screenWidth - 26, backgroundColor: '#fff', marginTop: -50}}
              onPress={onClipboard}
            >
              <MaterialCommunityIcons name="wallet" size={24} color={'#bbb'} />
              <Text style={styles.text}>Copy wallet address to Clipboard</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose}>
              <Text style={[styles.text, { marginBottom: 10}]}>Close</Text>
            </TouchableOpacity>
          </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    margin: 12,
    borderRadius: 12,
  },
  modal: {
    // flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 580
    // padding: 12,
  },
  text: {
    textAlign: 'center',
    color: '#bbb'
  }
});
