import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Scanning({ navigation, route }) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [type, setType] = useState('back');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    navigation.goBack();
    route.params.onScanCode(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.root}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject, { borderRadius: 12, zIndex: 10 }]}
          type={type}
        />
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity onPress={() => setType(type === 'front' ? 'back' : 'front')} style={styles.btn}>
          <MaterialIcons name="flip-camera-ios" size={50} color={"#444"} />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9699a'
  },
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 36,
    marginVertical: 80,
    borderRadius: 20,
    backgroundColor: '#f9699a',
    overflow: 'hidden'
  },
  btnView: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'brown'
  },
  btn: {
    // position: 'absolute',
    // bottom: 12,
    // right: 32,
    // zIndex: 10000
    marginTop: -30,
    marginBottom: 15
  }
});