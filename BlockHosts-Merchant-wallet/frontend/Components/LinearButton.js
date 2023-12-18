import * as React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LinearButton({ disabled, title, onClick }) {

  return (
    <Pressable
      onPress={() => !disabled && onClick()}
      style={{ opacity: disabled ? 0.2 : 1 }}
    >
      <LinearGradient
        colors={['#0038F5', '#9F03FF']}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 2,
    marginTop: 12
  },
  text: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
  },
});
