import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import Animation from "../../splashLottie1.json";
import LottieView from "lottie-react-native";
import { useTheme } from "react-native-paper";

export default function FullLoading({}) {

  const { colors } = useTheme();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={()=>{}}
    >
      <View style={[styles.centeredView, { backgroundColor: colors.primary }]}>

        <View style={styles.viewContainer}>
          <View style={styles.modalView}>

            <LottieView
              style={{
                width: 200,
                height: 200,
              }}
              source={Animation}
              loop
              autoPlay
            />
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
    width: 150,
    height: 150,
    // padding: 15,
    alignItems: 'center',
    // marginTop: 40,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 20,
  },
});