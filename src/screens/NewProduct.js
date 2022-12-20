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
import styles from '../styles/NewProduct';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';
import toast from 'react-native-simple-toast';

import chevronleft1 from '../assets/chevronleft1.png';
import camera from '../assets/camera.png';

const NewProduct = () => {
  const navigation = useNavigation();

  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [desc, setDesc] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [stock, setStock] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const url = 'https://intermedietebackend.vercel.app/api/v1/products/';
      const tempPhoto = {
        uri: photo?.assets[0]?.uri,
        type: photo?.assets[0]?.type,
        name: photo?.assets[0]?.fileName,
      };

      let data = new FormData();
      data.append('image_product', tempPhoto);
      data.append('name_product', name);
      data.append('price', price);
      data.append('desc_product', desc);
      data.append('size', 'R, L, XL');
      data.append('delivery', 'Home Delivery, Dine in, Take away');
      data.append('starthours', start);
      data.append('endhours', end);
      data.append('stock', stock);
      data.append('category', category);
      data.append('sold', 0);

      const headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data;',
      };

      setLoading(true);
      await axios.post(url, data, headers);
      setLoading(false);

      toast.show('Product added successfully!', toast.TOP);

      navigation.push('Home');
    } catch (error) {
      setLoading(false);
      toast.show('New Product failed!', toast.TOP);
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
          <Text style={styles.text1}>New Product</Text>
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
          placeholder="Input the product name"
          value={name}
          onChangeText={text => {
            setName(text);
          }}
        />
        <Text style={styles.text2}>Price</Text>
        <TextInput
          style={styles.input1}
          placeholder="Input the product price"
          value={price}
          onChangeText={text => {
            setPrice(text);
          }}
        />
        <Text style={styles.text2}>Description</Text>
        <TextInput
          style={styles.input1}
          placeholder="Describe your product"
          value={desc}
          onChangeText={text => {
            setDesc(text);
          }}
        />
        <Text style={styles.text2}>Start Hour</Text>
        <TextInput
          style={styles.input1}
          placeholder="Input start hour"
          value={start}
          onChangeText={text => {
            setStart(text);
          }}
        />
        <Text style={styles.text2}>End Hour</Text>
        <TextInput
          style={styles.input1}
          placeholder="Input start hour"
          value={end}
          onChangeText={text => {
            setEnd(text);
          }}
        />
        <Text style={styles.text2}>Stock</Text>
        <TextInput
          style={styles.input1}
          placeholder="Input start hour"
          value={stock}
          onChangeText={text => {
            setStock(text);
          }}
        />
        <Text style={styles.text2}>Category</Text>
        <View style={styles.view6}>
          <Pressable
            onPressIn={() => {
              setCategory('Coffee');
            }}
            style={category === 'Coffee' ? styles.btn2 : styles.btn3}>
            <Text style={category === 'Coffee' ? styles.text5 : styles.text6}>
              Coffee
            </Text>
          </Pressable>
          <Pressable
            onPressIn={() => {
              setCategory('Non');
            }}
            style={category === 'Non' ? styles.btn2 : styles.btn3}>
            <Text style={category === 'Non' ? styles.text5 : styles.text6}>
              Non Coffee
            </Text>
          </Pressable>
          <Pressable
            onPressIn={() => {
              setCategory('Food');
            }}
            style={category === 'Food' ? styles.btn2 : styles.btn3}>
            <Text style={category === 'Food' ? styles.text5 : styles.text6}>
              Foods
            </Text>
          </Pressable>
          <Pressable
            onPressIn={() => {
              setCategory('Add');
            }}
            style={category === 'Add' ? styles.btn2 : styles.btn3}>
            <Text style={category === 'Add' ? styles.text5 : styles.text6}>
              Add-on
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPressIn={() => {
            handleSubmit();
          }}
          style={styles.btn1}>
          <Text style={styles.text3}>Save product</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default NewProduct;
