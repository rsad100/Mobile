/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import styles from '../styles/NewPromo';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import toast from 'react-native-simple-toast';
import {launchImageLibrary} from 'react-native-image-picker';

import chevronleft1 from '../assets/chevronleft1.png';
import camera from '../assets/camera.png';

const NewPromo = () => {
  const navigation = useNavigation();

  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [desc, setDesc] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [code, setCode] = useState();
  const [discount, setDiscount] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const url = 'http://192.168.100.3:8080/api/v1/promos/';
      const tempPhoto = {
        uri: photo?.assets[0]?.uri,
        type: photo?.assets[0]?.type,
        name: photo?.assets[0]?.fileName,
      };

      let data = new FormData();
      data.append('image_promo', tempPhoto);
      data.append('name_promo', name);
      data.append('normal_price', price);
      data.append('desc_promo', desc);
      data.append('product_size', 'R, L, XL');
      data.append('delivery', 'Home Delivery, Dine in, Take away');
      data.append('discount', discount);
      data.append('start_date', start);
      data.append('end_date', end);
      data.append('code', code);
      data.append('id_product', 1);

      const headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data;',
      };

      setLoading(true);
      await axios.post(url, data, headers);
      setLoading(false);

      toast.show('Promo added successfully!', toast.TOP);
    } catch (error) {
      setLoading(false);
      toast.show('New Promo creation failed!', toast.TOP);
      console.log(error);
    }
  };

  const handleChoosePhoto = async () => {
    launchImageLibrary({noData: true}, response => {
      if (response && !response.didCancel) {
        setPhoto(response);
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
          <Text style={styles.text1}>New Promo</Text>
        </View>
        <View style={styles.view4}>
          {photo === null ? (
            <Image style={styles.image2} source={camera} />
          ) : (
            <Image style={styles.image3} source={{uri: photo?.assets[0].uri}} />
          )}
          <Pressable
            onPressIn={() => {
              handleChoosePhoto();
            }}
            style={styles.view5}>
            <Text style={styles.text4}>+</Text>
          </Pressable>
        </View>
        <Text style={styles.text2}>Name</Text>
        <TextInput
          style={styles.input1}
          placeholder="Input the promo name"
          value={name}
          onChangeText={text => {
            setName(text);
          }}
        />
        <Text style={styles.text2}>Price</Text>
        <TextInput
          style={styles.input1}
          placeholder="Input the promo price"
          value={price}
          onChangeText={text => {
            setPrice(text);
          }}
        />
        <Text style={styles.text2}>Discount</Text>
        <TextInput
          style={styles.input1}
          placeholder="Input the promo discount"
          value={discount}
          onChangeText={text => {
            setDiscount(text);
          }}
        />
        <Text style={styles.text2}>Start Date</Text>
        <TextInput
          style={styles.input1}
          placeholder="Input the promo start date"
          value={start}
          onChangeText={text => {
            setStart(text);
          }}
        />
        <Text style={styles.text2}>End Date</Text>
        <TextInput
          style={styles.input1}
          placeholder="Input the promo start date"
          value={end}
          onChangeText={text => {
            setEnd(text);
          }}
        />
        <Text style={styles.text2}>Code</Text>
        <TextInput
          style={styles.input1}
          placeholder="Input the promo start date"
          value={code}
          onChangeText={text => {
            setCode(text);
          }}
        />
        <Text style={styles.text2}>Description</Text>
        <TextInput
          style={styles.input2}
          placeholder="Describe your product"
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
          <Text style={styles.text3}>Save Promo</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default NewPromo;
