import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text, TextInput, Image, ScrollView, TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const banner = { uri: "https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjEtMTIvNDY0NGE4OWMtZWE0YS00YzY2LTllNDQtODE5OWFmZWY0YTUwLmpwZWc=.jpg" };

const Collection = ({  }) => {

  const [text, onChangeText] = useState();

  return (
    <View style={styles.container}>
      <ScrollView >
        <View style={{ width: '100%' }}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
            />
            <View style={styles.searchIcon}>
              <Icon name="chevron-right" size={15} color="#c242da" />
            </View>
          </View>

          <Text style={[styles.text, { textAlign: 'center' }]}>Explore Collections</Text>
        </View>
        <ImageBackground source={banner} resizeMode="cover" style={styles.banner}>

        </ImageBackground>
        <View style={styles.view}>
          <Text style={styles.text}>Top Performing NFT'S</Text>
          {
            ATOMS_LIST.map((item, index) => <ATOM key={index} item={item} />)
          }
          <Text style={styles.text}>Favorite Collections</Text>
        </View>


        <View style={[styles.view, { paddingHorizontal: 12 }]}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {
              TAGS_LIST.map((item, index) => <Tagging key={index} item={item} />)
            }
          </View>
        </View>

        <View>
          <ScrollView horizontal>
            {COLLECTION_LIST.map((item, index) => <CollectionItem key={index} item={item} />)}
          </ScrollView>
        </View>

      </ScrollView>
    </View>
  );
};

function CollectionItem({item}) {
  const { image, title, description } = item;
  return (
    <View style={{ borderRadius: 16 }}>
      <Image
        source={{ uri: image }}
        resizeMode="cover"
        style={styles.collection}
      />
      <View style={styles.cc}>
        <View >
          <Text style={styles.cText}>{title}</Text>
          <Text style={styles.cDescription}>{description}</Text>
        </View>
        <Icon name="heart" size={24} color="white" />
      </View>

    </View>
  )
}

function Tagging({item}) {
  const { title } = item
  return (
    <TouchableOpacity style={styles.tag}>
      <Text style={{ color: '#fff' }}>{title}</Text>
    </TouchableOpacity>
  )
}


function ATOM({item}) {
  const { title, image, count, id } = item;
  return (
    <View style={styles.atom}>
      <Text style={{ marginRight: 12, fontSize: 15 }}>{id}</Text>
      <Image
        style={styles.nftImage}
        source={{ uri: image }}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontWeight: '700', fontSize: 19 }}>{title}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{ width: 15, height: 18, marginHorizontal: 3 }}
            source={{ uri: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' }}
          />
          <Text>{count}</Text>
        </View>
      </View>
    </View>
  )
}

const TAGS_LIST = [
  {
    title: 'Art'
  },
  {
    title: 'Boasts'
  },
  {
    title: 'Cars'
  },
  {
    title: 'Real Estate'
  },
  {
    title: 'Jewelry'
  },
  {
    title: 'Planes'
  }, {
    title: 'Watches'
  }, {
    title: 'Wine'
  },
  {
    title: 'Fashion'
  },
]


const COLLECTION_LIST = [
  {
    title: 'Cryptonized',
    description: 'Art',
    image: 'https://lh3.googleusercontent.com/VdOIczFeM2oMPS0B51ggtw-I72AJK1DZhrV5VL6tH2H26KjeA5KqubyxXUjQhfUHb6laot061LvDkySFQf1-4e_vfTW3VSI7CiVW=h200'
  },
  {
    title: 'ReviltalizeX',
    description: 'Trending Cards',
    image: 'https://lh3.googleusercontent.com/jUs-u2b5aSQkc24RsogRI-kuz5NNmtdp2qSfPO0GZmIXr5XZCqF7ModYmI7o7LchuoHZ1O83Nia5nmAex-2OvO8pI1AxGsjMqppm=h200'
  }
]


const ATOMS_LIST = [
  {
    id: 1,
    title: 'Mutant Ape Yatch Club',
    image: 'https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s130',
    count: '24,1211'
  },
  {
    id: 2,
    title: 'Baby Elon World',
    image: 'https://lh3.googleusercontent.com/h7ZcxwMMv8R6YT9x-85rhl3_-2ShnTofTg14m4aalXW5M7-TCTuNfTxr09erF0yKUrGtv6Igci1CelokmF_Dtk5zieC83wnAHJRHlw=s100',
    count: '4,444'
  },
  {
    id: 3,
    title: 'Swampverse',
    image: 'https://lh3.googleusercontent.com/QQpvfbD1FjrMsEgzKdq0WjY0PvAfNvmaPtgK9tFc4pdYqlUzQEzUqMVRMN6j-QY2ULU3V5qWD1bwpHqY-Q4zz02Ow_pz_6Qc4ne1mLA=s100',
    count: '9,000'
  },
  {
    id: 4,
    title: 'Nuclear Nerds of the Gun',
    image: 'https://lh3.googleusercontent.com/2Gnyi4SN2VmQ33byM1N9jMqEQtcMnmiaToZw3FI9jW1mlfNnl21mms5J07VBxVO4tjYvii0Zx9z0qEW_FmnQ-llE2X-uv_uogG_DEpk=s100',
    count: '6,125'
  },
  {
    id: 5,
    title: 'Galaktic Gang',
    image: 'https://lh3.googleusercontent.com/91kA9l7PUz_peyk2jo9rb6o7L4J07L-ZQ5siXaj9xfq4svHEWD6in4rxIEGU9plwj2Vm8TPSkkkC_jXyoH3aZPOt7Y7sUvRl3ASGNA=s100',
    count: '2,725'
  }
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "white",
  },
  banner: {
    width: '100%',
    height: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    lineHeight: 45,
    fontWeight: "bold",
    color: '#333',
    marginTop: 12,
    textAlign: 'left'
  },
  input: {
    position: 'relative',
    borderWidth: 2,
    borderColor: '#2f2a44',
    height: 36,
    paddingHorizontal: 20,
    borderRadius: 18,
  },
  inputView: {
    marginHorizontal: 20,
    position: 'relative',
    marginTop: 40,
  },
  searchIcon: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    width: 60,
    height: 34,
    borderRadius: 30,
    backgroundColor: '#2f2a44'
  },
  atom: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingBottom: 12,
    marginTop: 12
  },
  nftImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  view: {
    width: '100%',
    paddingHorizontal: 30,
  },
  tag: {
    backgroundColor: '#7b2f9b',
    color: '#fff',
    marginHorizontal: 4,
    marginVertical: 2,
    padding: 4,
    paddingHorizontal: 16,
    borderRadius: 18
  },
  collection: {
    width: 190,
    height: 200,
    alignItems: 'center',
    borderRadius: 16,
    margin: 8,
    marginRight: 0
  },
  cText: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 18,
    color: '#fff'
  },
  cDescription: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 18,
    color: '#db64d6'
  },
  cc: {
    marginTop: -90,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default Collection;
