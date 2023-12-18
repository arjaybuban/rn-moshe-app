import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, ScrollView, Image } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import CustomNavbar from "../Components/CustomNavbar";
import { useMoralis, useMoralisQuery, useMoralisWeb3Api } from "react-moralis";
import ModalTransaction from '../Components/ModalTransaction';

const screenWidth = Dimensions.get('window').width;

const MerchantScanNFTScreen = ({ navigation, route }) => {

  const Web3Api = useMoralisWeb3Api();
  const { user } = useMoralis();
  const { data } = route.params;
  const { token_address, token_id, username } = JSON.parse(data) || '-';
  const [isModal, setIsModal] = useState(false);
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [owner, setOwner] = useState();
  const [description, setDescription] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { data: ScannedList } = useMoralisQuery('ScannedList', query => query.equalTo('token_id', token_id), [token_id]);
  const { data: scanLimits } = useMoralisQuery('scanLimit', query => query.equalTo('token_id', token_id), [token_id]);

  const scanLimit = scanLimits[0]?.attributes.limit

  useEffect(() => {
    if (data && data !== 'error') {
      onGetSth();
    }
  }, [data])

  const onGetSth = async () => {
    setIsLoading(true)

    if (token_address === 1 && token_id === 1) {
      setName('Open Bar NFT @ Microsoft ');
      setDescription(`
Creator Nations Tel Aviv Networking Event.
Scan This NFT at the bar for bottomless drinks all night sponsored by BlockHosts.

Microsoft Reactor Tel Aviv Derech Menachem Begin 144 Level 50 Tel Aviv-Yafo
      `);
      setOwner('Blockhosts');
    } else {
      const meta = await Web3Api.token.getTokenIdMetadata({
        chain: '0x1',
        address: token_address,
        token_id: token_id,
      })

      // console.log('meta', meta)

      const metadata = JSON.parse(meta.metadata)
      const { image: c, name: n, description: d, } = metadata;

      setImage(c);
      setName(n);
      setDescription(d);
      setOwner(username || UtilService.truncate(meta.owner_of));
    }

    setIsLoading(false)
  }

  return (
    <View style={styles.root}>

      <ScrollView style={{ paddingHorizontal: 12 }}>

        <View style={styles.container}>
          {token_address === 1
            ? <Image source={require('../../assets/event.png')} style={styles.banner} />
            : <Image source={{ uri: image }} style={styles.banner} />
          }

          <View style={{ marginLeft: 6 }}>
            <Text style={styles.t1}>{name}</Text>

            <View style={[styles.row, { marginTop: 20 }]}>
              <Text style={styles.title}>Owner</Text>
              <Text style={styles.t3}>
                {owner || '-'}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Price</Text>
              <Text style={styles.t3}>
                {token_address === 1 ? '0.00 MATIC' : 'No sale yet'}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Expiry</Text>
              <Text style={styles.t3}>
                {token_address === 1 ? '2.02.2023' : 'No Expire'}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Collection</Text>
              <Text style={styles.t3}>
                {'Buurp Collection'}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Limit</Text>
              <Text style={styles.t3}>
                {scanLimit || 'No Limit'}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>Scan Count</Text>
              <Text style={styles.t3}>
                {ScannedList.length}
              </Text>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={styles.title}>Description</Text>
              <Text style={[styles.t3, { fontSize: 12 }]}>
                {description}
              </Text>
            </View>

            <Text style={styles.note}>Please validate Customer's Age</Text>

          </View>

        </View>

        {((scanLimit > ScannedList.length) || !scanLimit) && <TouchableOpacity style={[styles.button, { backgroundColor: '#22DBBB', marginTop: 40 }]}
          onPress={() => setIsModal(true)}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>Verify & Redeem </Text>
        </TouchableOpacity>}

        <TouchableOpacity style={{ marginTop: 12 }} onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 16, color: '#6E6E6E', textAlign: 'center' }}>Cancel</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />

      </ScrollView>

      <CustomNavbar />
      {isModal && <ModalTransaction
        data={{ token_address, token_id, name, image, description, owner, scan: ScannedList.length }}
        onClose={() => {
          setIsModal(false);
          navigation.goBack();
        }}
      />}

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1
  },
  container: {
    backgroundColor: '#282828',
    padding: 15,
    borderRadius: 18,
    marginTop: 40
  },
  banner: {
    width: screenWidth - 54,
    marginTop: 20,
    borderRadius: 15,
    height: screenWidth,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 15,
    color: '#f9699a',
    marginLeft: 4
  },
  t1: {
    fontSize: 24,
    fontWeight: '700',
    marginHorizontal: 4,
    marginTop: 25,
    color: '#bbb'
  },
  t3: {
    fontSize: 15,
    fontWeight: '500',
    color: '#bbb',
    marginHorizontal: 12,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    minWidth: 250,
    backgroundColor: '#eef4f6',
    borderRadius: 12,
    marginTop: 50,
    marginHorizontal: 30
  },
  note: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 17,
    color: '#bbb',
    fontWeight: '700'
  }
});

export default MerchantScanNFTScreen;
