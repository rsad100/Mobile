/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import styles from '../styles/EditProduct';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import toast from 'react-native-simple-toast';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

import chevronleft1 from '../assets/chevronleft1.png';
import cart3 from '../assets/cart3.png';
import pen1 from '../assets/pen1.png';

const EditProduct = () => {
  const navigation = useNavigation();

  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [desc, setDesc] = useState();
  const [id, setId] = useState();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setImage(await AsyncStorage.getItem('image'));
        setName(await AsyncStorage.getItem('product_name'));
        setPrice(await AsyncStorage.getItem('product_price'));
        setDesc(await AsyncStorage.getItem('product_desc'));
        setId(await AsyncStorage.getItem('product_id'));
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  const handleSubmit = async () => {
    try {
      const url = `http://192.168.100.3:8080/api/v1/products/${id}`;
      const tempPhoto = {
        uri: photo?.assets[0]?.uri,
        type: photo?.assets[0]?.type,
        name: photo?.assets[0]?.fileName,
      };
      // console.log(tempPhoto.uri);
      let data = new FormData();
      data.append('name_product', name);
      data.append('price', price);
      data.append('desc_product', desc);
      if (tempPhoto.uri !== undefined) {
        data.append('image_product', tempPhoto);
      }
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data;',
      };
      setLoading(true);
      await axios.patch(url, data, headers);
      setLoading(false);
      toast.show('Data changed successfully!', toast.TOP);
      navigation.push('Home');
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.show('Data change failed!', toast.TOP);
    }
  };

  const handleChoosePhoto = async () => {
    launchImageLibrary({noData: true}, response => {
      if (response && !response.didCancel) {
        setPhoto(response);
        // console.log(response.assets[0].uri);
      }
    });
  };

  return (
    <ScrollView style={styles.view}>
      <ActivityIndicator
        style={
          loading === true
            ? {
                display: 'flex',
                position: 'absolute',
                top: '50%',
                left: '45%',
              }
            : {display: 'none', position: 'absolute', top: '50%', left: '50%'}
        }
        size="large"
      />
      <View style={styles.view2}>
        <View style={styles.view3}>
          <Pressable
            onPressIn={() => {
              navigation.push('Home');
            }}>
            <Image style={styles.image1} source={chevronleft1} />
          </Pressable>
          <Pressable
            onPressIn={() => {
              navigation.push('Cart');
            }}>
            <Image style={styles.image2} source={cart3} />
          </Pressable>
        </View>
        <View>
          <Image
            style={styles.image3}
            source={
              photo?.assets[0]?.uri
                ? {
                    uri: photo?.assets[0]?.uri,
                  }
                : {
                    uri: `https://res.cloudinary.com/dr6hbaq0j/image/upload/v1667258032${image}`,
                  }
            }
          />
          <Pressable
            onPressIn={() => {
              handleChoosePhoto();
            }}
            style={styles.btn2}>
            <Image style={styles.image4} source={pen1} />
          </Pressable>
        </View>
        <Text style={styles.text6}>Name</Text>
        <TextInput
          style={styles.text7}
          placeholder="Input name"
          value={name}
          onChangeText={text => {
            setName(text);
          }}
        />
        <Text style={styles.text6}>Price</Text>
        <TextInput
          style={styles.text7}
          placeholder="Input price"
          value={price}
          onChangeText={text => {
            setPrice(text);
          }}
        />
        <Text style={styles.text8}>Description</Text>
        <TextInput
          style={styles.text9}
          placeholder="Input description"
          value={desc}
          onChangeText={text => {
            setDesc(text);
          }}
        />
        <Pressable
          onPressIn={() => {
            handleSubmit();
          }}
          style={styles.btn1}>
          <Text style={styles.text10}>Save change</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default EditProduct;
