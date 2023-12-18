import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { WalletService } from "../types";

// eslint-disable-next-line functional/no-mixed-type
export type WalletServiceIconProps = {
  readonly width: number;
  readonly height: number;
  readonly walletService: WalletService;
  readonly connectToWalletService: (walletService: WalletService) => unknown;
  readonly size?: "sm" | "md" | "lg";
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  fullWidth: { width: "100%" },
  icon: { borderRadius: 15 },
  noOverflow: { overflow: "hidden" },
  title: {
    color: "#bbb",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  padding: { padding: 5 },
});

export default function WalletServiceIcon({
  width,
  height,
  walletService,
  connectToWalletService,
  size = "md",
}: WalletServiceIconProps): JSX.Element {
  const uri = React.useMemo(
    () =>
      `https://registry.walletconnect.org/logo/${size}/${walletService.id}.jpeg`,
    [walletService, size]
  );
  const onPress = React.useCallback(
    () => connectToWalletService(walletService),
    [connectToWalletService, walletService]
  );
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[{ width, height }, styles.container, styles.padding]}
        >
        <Image
          style={[
            styles.icon,
            {
              width: 120,
              height: 120,
              marginTop: 40
            },
          ]}
          source={{ uri }}
        />
        <Text
          style={[styles.title, styles.fullWidth, { fontSize: 12, marginTop: 5}]}
          // numberOfLines={1}
          ellipsizeMode="tail">
          {/* {walletService.name} */}
          Press or select button to make clear that metamask should be pressed
        </Text>
      </TouchableOpacity>
    </View>
  );
}
