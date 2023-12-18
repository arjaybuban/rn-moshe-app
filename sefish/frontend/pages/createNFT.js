import React, { useEffect, useState, } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, TextInput, Pressable, Alert, } from "react-native";
import { useMoralis, useMoralisQuery, useMoralisWeb3Api, } from "react-moralis";
import LinearButton from '../Components/LinearButton';
import BorderButton from '../Components/borderButton';
import Icon from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';
import ModalCamera from '../Components/ModalCamera';
import ModalList from '../Components/ModalList';
import ModalPreview from '../Components/ModalPreview';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
import Loading from "../Components/loading";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from "react-native-paper";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import UtilService from "../utils/utilService";
import { SignMint721, SignMint1155 } from '../utils/LazymintConfig';
import { getWeb3 } from "../Moralis/getWeb3";
import { useWalletConnect } from "../WalletConnect";
import { useGetChainId } from '../hooks/useGetChainId'

const CreateNFT = ({ navigation }) => {

  const { isAuthenticated, Moralis, account } = useMoralis();
  const { walletAddress } = useMoralisDapp();
  const Web3Api = useMoralisWeb3Api();
  const { chainId } = useGetChainId();
  const connector = useWalletConnect();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState(0.01);
  const [file, setFile] = useState();
  const [isMultiple, setIsMultiple] = useState(false);
  const [isIgnore, setIsIgnore] = useState(false);
  const [isErc1155, setIsErc1155] = useState(false);
  const [counts, setCounts] = useState(1);
  const [isPreviewModal, setIsPreviewModal] = useState(false);
  const [isPicker, setIsPicker] = useState(0);
  const [isBrandModal, setIsBrandModal] = useState(false);
  const [isCollectionModal, setIsCollectionModal] = useState(false);
  const [category, setCategory] = useState();
  const [royalties, setRoyalties] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState();
  const [brand, setBrand] = useState();
  const [collection, setCollection] = useState();
  const { colors } = useTheme();
  const { data: brands } = useMoralisQuery("RealBrands", query => query.equalTo('creatorId', walletAddress || '-'), []);
  const { data: collections } = useMoralisQuery("Brands", query => query.equalTo('creatorId', walletAddress).equalTo('brand', brand?.value || '-'), [brand]);

  const isAvailable = title && description && price && file;

  const uploadImage = async () => {
    const nowTime = new Date().getTime();
    var nftImageFile = new Moralis.File(nowTime, { base64: file });
    await nftImageFile.saveIPFS();
    return nftImageFile.ipfs();
  };

  var uploadMetadata = async (imageURL) => {
    const tokenMetadata = {
      name: title,
      image: imageURL,
      description: description,
      price,
      category,
      brand,
      chain: chainId,
      date: new Date()
    };
    const file = new Moralis.File("file.json", {
      base64: btoa(JSON.stringify(tokenMetadata, null, 4)),
    });
    await file.saveIPFS();
    return file.ipfs();
  };

  const takePicture = async () => {

    let res = await Permissions.askAsync(Permissions.CAMERA)
    if (res.status === 'granted') {
      let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status === 'granted') {
        let image = await ImagePicker.launchCameraAsync({
          quality: 0.6,
          base64: true,
          quality: 1,
          allowsEditing: true
        })
        if (image.base64) {
          setFile(`data:image/jpg;base64,${image.base64}`);
        }
      }
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (result.base64) {
      setFile(`data:image/jpg;base64,${result.base64}`);
    }
  };

  const onMint = async () => {
    if (!isAvailable) {
      return false;
    }
    if (!isAuthenticated) {
      navigation.navigate('Home');
      return false;
    }
    
    setIsLoading(true);

    const web3js = await getWeb3({connector})

    const LazyMints = Moralis.Object.extend("LazyMints");
    const query = new Moralis.Query(LazyMints);
    const allLazyMints = await query.find();
    const image = await uploadImage();
    const tokenURI = await uploadMetadata(image);

    const c1 = isErc1155 ?
      {
        address: UtilService.getMint1155Address(chainId),
        chain: UtilService.getChain(chainId)
      } :
      {
        address: UtilService.getMint721Address(chainId),
        chain: UtilService.getChain(chainId)
      };
    const ids1 = await Web3Api.token.getAllTokenIds(c1);
    const idNumber = Number(ids1.total) + allLazyMints.length
    const minter = walletAddress;
    const tokenId = minter + "b" + UtilService.FormatNumberLength(idNumber, 18) + UtilService.FormatNumberLength(chainId.substring(2), 5);
    const supply = counts;
    const royaltyFee = Number(royalties);

    try {

      let signature;

      if (isErc1155) {
        signature = await SignMint1155(web3js, tokenId, tokenURI, supply, minter, royaltyFee, minter, UtilService.getMint1155Address(chainId));
      } else {
        signature = await SignMint721(web3js, minter, tokenId, tokenURI, minter, royaltyFee, UtilService.getMint721Address(chainId));
      }

      const metadata = {
        tokenURI,
        tokenId,
        creator: walletAddress,
        signature: signature,
        type: isErc1155 ? 'ERC1155' : 'ERC721',
        supply: isErc1155 ? Number(supply) : 1,
        royaltyFee: royalties,
        privateSale: false
      }

      console.log('======== metadata =======', metadata);
      
      const lazyMints = new LazyMints();
      lazyMints.save(metadata);

      await onSaveRewards();
      alert('Congratulations! You minted the NFT successfully! It will appear in your collections shortly.')

      navigation.navigate('Explore')

    } catch (e) {
      console.log("~ e! ~", e);
      alert(e.message);
    }

    setIsLoading(false);
  }

  const onSaveRewards = async () => {

    const RewardsQuery = new Moralis.Query('Rewards');
    RewardsQuery.equalTo('owner', account);
    const object1 = await RewardsQuery.first();

    if (!object1) {

      const Rewards = Moralis.Object.extend("Rewards");
      const rewards = new Rewards();
      if (chainId === '0x13881') {
        rewards.save({
          owner: account,
          MATIC: "1000000000"
        })
      }
      if (chainId === '0x61') {
        rewards.save({
          owner: account,
          BSC: "1000000000"
        })
      }
      if (chainId === '0x4') {
        rewards.save({
          owner: account,
          ETH: "1000000000"
        })
      }
    } else {
      object1.save().then((object) => {
        object.set('owner', account);
        if (chainId === '0x13881') {
          object.set('MATIC', String((Number(object1.attributes.MATIC) || 0) + 1000000000));
        }
        if (chainId === '0x61') {
          object.set('BSC', String((Number(object1.attributes.BSC) || 0) + 1000000000));
        }
        if (chainId === '0x4') {
          object.set('ETH', String((Number(object1.attributes.ETH) || 0) + 1000000000));
        }
        return object.save();
      });
    }

  }
  return (
    <View style={[styles.root, { backgroundColor: colors.primary }]}>
      <ScrollView style={{ paddingHorizontal: 12 }}>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="left" size={22} color={colors.color7} />
          </TouchableOpacity>
          <Text style={[styles.t2, { color: colors.color7 }]}>Upload File</Text>
        </View>

        <Pressable style={[styles.picBox, { backgroundColor: colors.primary5 }]} onPress={() => setIsPicker(true)}>
          <Icon name="picture" size={32} color={colors.color2} />
          <Text style={[styles.t0, { color: colors.text }]}>Drag and drop or browse a file</Text>
          <Text style={styles.t1}>PNG, GIF, WEBP, MP4, MOV or MP3. (Max 200MB)</Text>
        </Pressable>

        {file && <Image source={{ uri: file }} style={styles.file} />}

        <Text style={[styles.t5, { color: colors.color3 }]}>Information</Text>

        <TextInput
          style={[styles.input, { borderColor: colors.color2 }]}
          onChangeText={e => setTitle(e)}
          value={title}
          placeholder="Item Name"
          placeholderTextColor={'#444'}
        />

        <TextInput
          style={[styles.input, { textAlignVertical: 'top', borderColor: colors.color2 }]}
          onChangeText={e => setDescription(e)}
          value={description}
          placeholder="Description"
          multiline
          numberOfLines={4}
          placeholderTextColor={'#444'}
        />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            style={[styles.input, { borderColor: colors.color2, flex: 1 }]}
            onChangeText={e => setPrice(e)}
            value={price}
            placeholder="Price"
            keyboardType="numeric"
            placeholderTextColor={'#444'}
          />
          <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png' }} style={{ width: 40, height: 40, marginLeft: 12, marginTop: 10 }} />
        </View>

        <TextInput
          style={[styles.input, { borderColor: colors.color2 }]}
          onChangeText={e => setRoyalties(e)}
          value={royalties}
          placeholder="Royalties"
          keyboardType="numeric"
          placeholderTextColor={'#444'}
        />

        <View style={styles.row2}>
          <TextInput
            style={[styles.input, { flex: 1, marginLeft: -5, borderColor: code ? colors.color2 : colors.colora, color: '#000' }]}
            onChangeText={e => setPrice(e)}
            value={code}
            editable={false}
            placeholder="QR code / Barcode"
            placeholderTextColor={'#444'}
          />
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Scanner', { onScanCode: (e) => setCode(e) })}>
            <MaterialCommunityIcons name="qrcode-scan" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.flexStart}>
          <CheckBox
            value={isIgnore}
            onValueChange={(newValue) => setIsIgnore(newValue)}
            tintColors={{ true: '#F15927', false: '#ff0' }}
          />
          <View style={{ marginLeft: 4 }}>
            <Text style={[styles.t6, { color: colors.color6 }]}>Skip Brand and Collection</Text>
          </View>
        </View>

        {!isIgnore && <View>
          <Text style={[styles.t5, { marginTop: 22, color: colors.color3 }]}>Brand</Text>

          <Pressable onPress={() => setIsBrandModal(true)} style={[styles.select, { borderColor: colors.color2 }]}>
            <Text style={{ color: '#bbb', fontSize: 16, paddingTop: 2 }}>{brand?.label}</Text>
            <Icon name="down" size={16} color="#555" />
          </Pressable>

          <Text style={[styles.t5, { marginTop: 22, color: colors.color3 }]}>Collection</Text>

          <Pressable onPress={() => setIsCollectionModal(true)} style={[styles.select, { borderColor: colors.color2 }]}>
            <Text style={{ color: '#bbb', fontSize: 16, paddingTop: 2 }}>{collection?.label}</Text>
            <Icon name="down" size={16} color="#555" />
          </Pressable>
        </View>}

        <View style={styles.flexStart}>
          <CheckBox
            value={isErc1155}
            onValueChange={(newValue) => setIsErc1155(newValue)}
            tintColors={{ true: '#F15927', false: '#ff0' }}
          />
          <View style={{ marginLeft: 4 }}>
            <Text style={[styles.t6, { color: colors.color6 }]}>ERC1155</Text>
          </View>
        </View>

        {isErc1155 && <TextInput
          style={[styles.input, { borderColor: colors.color2 }]}
          onChangeText={setCounts}
          value={counts}
          placeholder="Amounts to mint erc1155"
          keyboardType="numeric"
          placeholderTextColor={'#444'}
        />}

        <View style={{ marginTop: 30 }} />
        <BorderButton title='Preview' onClick={() => isAvailable && setIsPreviewModal(true)} disabled={!isAvailable} />

        <View>
          {isLoading ? <Loading /> : <LinearButton title='Upload' onClick={()=> isAvailable ? onMint() : {}} disabled={!isAvailable} />}
        </View>

        <View style={{ marginTop: 30 }} />

        {isPicker !== 0 && <ModalCamera
          onClickPicker={() => {
            setIsPicker(0);
            pickImage(isPicker);
          }}
          onClickCamera={() => {
            setIsPicker(0);
            takePicture(isPicker);
          }}
          onClose={() => setIsPicker(0)}
        />}

        {
          isBrandModal &&
          <ModalList
            data={brands?.map(item => { return { value: item.id, label: item.attributes.title } })}
            title={'brand'}
            onClose={() => setIsBrandModal(false)}
            onCheckItem={(e) => {
              setBrand(e)
            }
            }
            category={brand?.value}
            onGoBtn={() => navigation.navigate('CreateBrand')}
          />
        }

        {
          isCollectionModal &&
          <ModalList
            data={collections?.map(item => { return { value: item.id, label: item.attributes.title } })}
            title={'collection'}
            onClose={() => setIsCollectionModal(false)}
            onCheckItem={(e) => {
              setCollection(e)
            }
            }
            category={collection?.value}
            onGoBtn={() => navigation.navigate('CreateCollection')}
          />
        }

        {
          isPreviewModal &&
          <ModalPreview
            data={{ image: file, price, title }}
            onClose={() => setIsPreviewModal(false)}
          />
        }

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  flexStart: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16
  },
  picBox: {
    backgroundColor: '#f8f8f8',
    borderRadius: 32,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 156
  },
  t0: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8
  },
  t1: {
    color: '#888',
    fontWeight: '500',
    fontSize: 13,
    textAlign: 'center'
  },
  t2: {
    fontSize: 32,
    fontWeight: '700',
    marginLeft: 12
  },
  t3: {
    color: '#888',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center'
  },
  t5: {
    fontWeight: '700',
    fontSize: 14,
    marginTop: 16
  },
  t6: {
    color: '#222',
    fontWeight: '700',
    fontSize: 16,
    marginTop: 3
  },
  t7: {
    color: '#888',
    fontWeight: '500',
    fontSize: 13,
    maxWidth: 300
  },
  input: {
    fontSize: 16,
    marginTop: 12,
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    paddingLeft: 16,
    color: '#bbb'
  },
  file: {
    width: 100,
    height: 100,
    borderRadius: 8
  },
  select: {
    marginTop: 12,
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    paddingLeft: 16,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btn: {
    borderWidth: 1,
    height: 58,
    marginTop: 12,
    marginLeft: 12,
    width: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#fff'
  },
});

export default CreateNFT;

function convertBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
