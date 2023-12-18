import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import FullLoading from '../Components/Loadings/fullLoading';
import { ScrollView } from "react-native-gesture-handler";
import SelectDropdown from 'react-native-select-dropdown'
import { useMoralis, useMoralisQuery } from "react-moralis";

const GENDERS = ["Male", "Female", "Other", "Prefer not to say"]
const OCCUPATIONS = ['Employee', 'Self-Employed', 'Business Owner', 'Student', 'Unemployed', 'Other']
const sq = x => x + 14;
const AGES = Array.from(Array(86), (_, x) => sq(x));

const MoreAboutYouScreen = ({ navigation }) => {

  const { setUserData, user } = useMoralis();
  const [gender, setGender] = useState();
  const [age, setAge] = useState();
  const [occupation, setOccupation] = useState();
  const [beverage, setBeverage] = useState();
  const [bite, setBite] = useState();
  const [hospitality, setHospitality] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState();
  const [email, setEmail] = useState();
  const [country, setCountry] = useState('United Kingdom');
  const [number, setNumber] = useState('');
  const [phoneCode, setPhoneCode] = useState('GB');
  const [fileAvatar, setFileAvatar] = useState();

  const { data: Beverage } = useMoralisQuery('beverage');
  const { data: Bite } = useMoralisQuery('bites');
  const { data: Hospitality } = useMoralisQuery('hospitality');
  const BEVERAGES = Beverage.map(x => x.attributes.title);
  const BITES = Bite.map(x => x.attributes.title);
  const HOSPITALITIES = Hospitality.map(x => x.attributes.title);
  const isAvailable = gender && age && occupation && beverage && bite && hospitality;

  useEffect(() => {
    if (user) {
      setGender(user?.attributes?.gender)
      setAge(user?.attributes?.age)
      setOccupation(user?.attributes?.occupation)
      setBeverage(user?.attributes?.beverage)
      setBite(user?.attributes?.bite)
      setHospitality(user?.attributes?.hospitality);

      setTitle(user?.attributes?.name)
      setEmail(user?.attributes?.email)
      setFileAvatar(user?.attributes?.profileImage)
      setCountry(user?.attributes?.country || 'United Kingdom')
      setNumber(user?.attributes?.number)
      setPhoneCode(user?.attributes?.phoneCode || 'GB');
    }
  }, [user])

  const onMoreProfile = async () => {

    let request = {
      gender: gender || '',
      age: age || '',
      occupation: occupation || '',
      beverage: beverage || '',
      bite: bite || '',
      hospitality: hospitality || '',
      name: title || '',
      email: email || '',
      country: country || '',
      number: number || '',
      phoneCode: phoneCode || 'GB',
      fileAvatar: fileAvatar
    }

    await setUserData(request).then((res) => {
      // setIsLoading(false);
    }, (error) => {
      // setIsLoading(false);
      console.log('error!', error)
    });

    navigation.navigate('Home')
  }

  return (
    <ScrollView style={styles.root}>

      {isLoading &&
        <TouchableOpacity onPress={() => setIsLoading(false)}>
          <FullLoading />
        </TouchableOpacity>}

      <View style={styles.viewContainer}>
        <Text style={{ color: '#000', fontSize: 25, fontWeight: '700' }}>{'More about you...'}</Text>
        <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>{'(optional)'}</Text>
      </View>

      <Text style={{ textAlign: 'center', marginTop: 30, color: '#3C404B' }}>
        Grab <Text style={{ color: '#22dbbb', fontWeight: '700' }}>totally free NFT tokens airdropped direct to your wallet </Text> from brand <Text style={{ color: '#22dbbb', fontWeight: '700' }}>product launches & freebies</Text>.
      </Text>

      <Text style={{ textAlign: 'center', marginTop: 10, color: '#3C404B' }}>
        Tell us a bit more about yourself and we will share it with our brand partners most suited to your tastes.
      </Text>

      <View style={{ marginHorizontal: 16 }}>

        <View style={{ justifyContent: 'center', }}>
          <View style={styles.button}>
            <SelectDropdown
              defaultValue={gender}
              buttonStyle={{width: 300}}
              data={GENDERS}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setGender(selectedItem)
              }}
              defaultButtonText={'Gender'}
            />
          </View>

          <View style={styles.button}>
            <SelectDropdown
              defaultValue={age}
              buttonStyle={{width: 300}}
              data={AGES}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setAge(selectedItem)
              }}
              defaultButtonText={'Age'}
            />
          </View>

          <View style={styles.button}>
            <SelectDropdown
              defaultValue={occupation}
              buttonStyle={{width: 300}}
              data={OCCUPATIONS}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setOccupation(selectedItem)
              }}
              defaultButtonText={'Occupation'}
            />
          </View>

          <Text style={{ textAlign: 'center', marginTop: 25, marginBottom: -10, color: '#3C404B', textAlign: 'left', fontSize: 13 }}>
            What is your Fav Beverage of Choice?
          </Text>

          {BEVERAGES.length > 0 && <View style={styles.button}>
            <SelectDropdown
              defaultValue={beverage}
              buttonStyle={{width: 300}}
              data={BEVERAGES}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setBeverage(selectedItem)
              }}
              defaultButtonText={'Beverage'}
            />
          </View>}

          <Text style={{ textAlign: 'center', marginTop: 20, marginBottom: -10, color: '#3C404B', textAlign: 'left', fontSize: 13 }}>
            What is your Fav Food of Choice?
          </Text>

          {BITES.length > 0 && <View style={styles.button}>
            <SelectDropdown              
              defaultValue={bite}
              buttonStyle={{width: 300}}
              data={BITES}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setBite(selectedItem)
              }}
              defaultButtonText={'Bites'}
            />
          </View>}

          <Text style={{ textAlign: 'center', marginTop: 20, marginBottom: -10, color: '#3C404B', textAlign: 'left', fontSize: 13 }}>
            What is your Preferred Dining out experience?
          </Text>

          {HOSPITALITIES.length > 0 && <View style={styles.button}>
            <SelectDropdown
              defaultValue={hospitality}
              buttonStyle={{width: 300}}
              data={HOSPITALITIES}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setHospitality(selectedItem)
              }}
              defaultButtonText={'Hospitality'}
            />
          </View>}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: !isAvailable ? 'rgba(175, 236, 214, 0.8)' : '#22DBBB', marginTop: 40 }]}
            onPress={() => onMoreProfile()}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginVertical: 30 }}>
            <Text style={{ color: '#3C404B', textDecorationLine: 'underline', fontWeight: '700', textAlign: 'center' }}>Skip this & continue to Wallet</Text>
          </TouchableOpacity>

        </View>
      </View>

      <View style={{ height: 20 }} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12
  },
  viewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginTop: 40
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    minWidth: 290,
    backgroundColor: '#eff2f6',
    borderRadius: 12,
    marginTop: 20,
  },
});

export default MoreAboutYouScreen;