import React from "react";
import { StyleSheet, Text, Modal, Image, View, Pressable } from 'react-native';
import LinearButton from "./LinearButton";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BorderButton from "./borderButton";
import { useTheme } from "react-native-paper";

export default function ModalCamera({onClickCamera, onClickPicker, onClose}) {

  const { colors } = useTheme();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={[styles.centeredView, { backgroundColor: colors.modal }]}>
        <View style={[styles.modalView, { backgroundColor: colors.primary }]}>

          <View style={styles.row}>
            <Text style={[styles.t1, { color: colors.text }]}>Choose the option</Text>
            <Pressable onPress={onClose}>
              <Icon name="window-close" size={24} color={colors.text} />
            </Pressable>
          </View>

          <View style={styles.center}>
            <Image source={require('../../assets/image/camera.png')} />
          </View>

          <View style={{ height: 12 }} />

          <LinearButton title='Use The Camera' onClick={onClickCamera} />

          <View style={{ height: 10 }} />

          <BorderButton title='Use The Local Images' unit={74} onClick={onClickPicker} />

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12
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
