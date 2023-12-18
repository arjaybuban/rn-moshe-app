import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useNativeBalance from "../../hooks/useNativeBalance";

function NativeBalance(props) {

  const { nativeBalance } = useNativeBalance(props?.chain || chainId);
  
  return (
    <View style={styles.itemView}>
      <Text style={styles.name}>💰 {nativeBalance} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemView: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 2,
    marginVertical: 5,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 15,
    color: "black",
    fontWeight: "500",
  },
});

export default NativeBalance;
