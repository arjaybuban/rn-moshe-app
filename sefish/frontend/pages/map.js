import React from "react";
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, ScrollView, Image, TextInput } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import CustomNavbar from "../Components/CustomNavbar";
import MapView, { Callout, Marker } from 'react-native-maps';
import flagPinkImg from '../../assets/pointer4.png';
import { useMoralisQuery } from "react-moralis";

const { width, height } = Dimensions.get('window');

const MapScreen = ({ route, navigation }) => {

  const { data } = useMoralisQuery("blockhosts");

  return (
    <View style={styles.root}>

      <ScrollView style={{ paddingHorizontal: 12, }}>

        <CustomHeader navigation={navigation} title={''} />

        <Text style={styles.t1}>Choose a Venue</Text>

        <View style={styles.container}>
          <MapView
            initialRegion={{
              latitude: 53.78358,
              longitude: -1.581866,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.map}
          >
            {data.map((marker, key) => (
              <Marker
                key={key}
                coordinate={{
                  latitude: marker.attributes.latitude,
                  longitude: marker.attributes.longitude,
                }}
                image={flagPinkImg}
              >
                <Callout style={styles.plainView}>
                  <View>
                    <Text style={{color: '#000', fontWeight: '700', fontSize: 15}}>{marker.attributes.name}</Text>
                    <Text style={{color: '#000'}}>{marker.attributes.address}</Text>
                    <Text style={{color: '#000'}}>{marker.attributes.city}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>

        </View>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Cash')}>
          <Text style={{ color: '#fff' }}>Continue</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />

      </ScrollView>

      <CustomNavbar />

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    backgroundColor: '#2ddbbb'
  },
  t1: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 4,
    marginTop: -16,
    textAlign: 'center',
    color: '#111'
  },
  map: {
    width: width - 60,
    height: height - 310,
  },
  container: {
    flex: 1,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    height: height - 310,
    marginHorizontal: 20
  },
  btn: {
    marginTop: 30,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20
  },
  plainView: {
    padding: 12,
    // width: 180,
    borderRadius: 12
  },
});

export default MapScreen;
