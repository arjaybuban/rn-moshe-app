import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

export default function BorderButton({unit, disabled, onClick, title}) {
  return (
    <Pressable onPress={onClick} style={{ opacity: disabled ? 0.4 : 1}}>
      <LinearGradient
        colors={['#0038F5', '#9F03FF']}
        start={{ x: 0.0, y: 1.0 }} 
        end={{ x: 1.0, y: 1.0 }}
        style={{ height: 56, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
      >
        <View style={styles.buttonContainer}>
          <Text style={[styles.buttonText, { width: screenWidth - (unit ? unit : 28)}]}>
            {title}
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 3
  },
  buttonText: {
    borderRadius: 8,
    textAlign: 'center',
    color: '#222',
    marginLeft: 1,
    marginRight: 1,
    height: 52,
    backgroundColor: '#fff',
    fontWeight: '700',
    fontSize: 20,
    paddingTop: 11,
  }
});
