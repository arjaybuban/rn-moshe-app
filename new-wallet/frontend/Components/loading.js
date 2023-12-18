import React from "react";
import { View, StyleSheet } from "react-native";
import Animation from "../splashLottie1.json";
import LottieView from "lottie-react-native";
import { useTheme } from "react-native-paper";

export default function Loading() {

  const { colors } = useTheme();

  return (
    <View style={[styles.animationContainer, { color: colors.primary}]}>
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
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});