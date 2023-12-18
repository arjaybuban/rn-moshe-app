import React from "react";
import { StyleSheet, Text, Modal, View, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ModalFilter({ type, data, onSetType, onClose }) {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>

          <View style={styles.row}>
            <Text style={styles.t1}>Choose the option</Text>
            <Pressable onPress={onClose}>
              <Icon name="window-close" size={24} color={'#000'} />
            </Pressable>
          </View>

          <ScrollView>
            <View style={styles.scroll}>
              {data.map((item, key) =>
                <TouchableOpacity
                  key={key}
                  style={[styles.box, type === item && { backgroundColor: '#22dbbb', borderColor: '#fff' }]}
                  onPress={() => onSetType(type === item ? null : item)}
                >
                  <Text style={{textAlign: 'center', fontSize: 11}}>{item}</Text>
                </TouchableOpacity>)}
            </View>
          </ScrollView>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
  box: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#777',
    padding: 4,
    margin: 7,
    width: 120, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  t1: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700',
    color: '#000'
  },
  t2: {
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'center'
  },
  t3: {
    fontSize: 16,
    fontWeight: '700'
  },
  scroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    // maxHeight: 400,
    justifyContent: 'center'
  }
});
