import React, {useEffect, useState} from 'react';
import {Text, View, Image, ScrollView, Pressable} from 'react-native';
import styles from '../styles/Details';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt from 'jwt-decode';

import chevronleft1 from '../assets/chevronleft1.png';
import cart3 from '../assets/cart3.png';
import pen2 from '../assets/pen2.png';

const Details = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [desc, setDesc] = useState();
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState('Regular');
  const [role, setRole] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        setImage(await AsyncStorage.getItem('image'));
        setName(await AsyncStorage.getItem('product_name'));
        setPrice(await AsyncStorage.getItem('product_price'));
        setDesc(await AsyncStorage.getItem('product_desc'));
        const info = jwt(await AsyncStorage.getItem('token'));
        setRole(info.role);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem('amount', amount.toString());
      await AsyncStorage.setItem('size', size);
      navigation.push('Cart');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.view}>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <Pressable
            onPressIn={() => {
              navigation.push('Home');
            }}>
            <Image style={styles.image1} source={chevronleft1} />
          </Pressable>
          <Pressable
            style={role === 'admin' ? {display: 'none'} : {display: 'flex'}}
            onPressIn={() => {
              navigation.push('Cart');
            }}>
            <Image style={styles.image2} source={cart3} />
          </Pressable>
          <Pressable
            style={role === 'admin' ? {display: 'flex'} : {display: 'none'}}
            onPressIn={() => {
              navigation.push('EditProduct');
            }}>
            <Image style={styles.image4} source={pen2} />
          </Pressable>
        </View>
        <Image
          style={styles.image3}
          source={{
            uri: `https://res.cloudinary.com/dr6hbaq0j/image/upload/v1667258032${image}`,
          }}
        />
        <View style={styles.view6}>
          <View style={styles.view4} />
          <View style={styles.view5} />
          <View style={styles.view5} />
          <View style={styles.view7} />
        </View>
        <Text style={styles.text4}>{name}</Text>
        <Text style={styles.text5}>IDR {price}</Text>
        <Text style={styles.text6}>Delivery info</Text>
        <Text style={styles.text7}>
          Delivered only on monday until friday from 1 pm to 7 pm
        </Text>
        <Text style={styles.text8}>Description</Text>
        <Text style={styles.text9}>{desc}</Text>
        <Text style={styles.text13}>Choose amount</Text>
        <View style={styles.view8}>
          <Pressable
            onPressIn={() => {
              setAmount(amount - 1);
            }}
            style={styles.btn2}>
            <Text style={styles.text11}>-</Text>
          </Pressable>
          <Text style={styles.text12}>{amount}</Text>
          <Pressable
            onPressIn={() => {
              setAmount(amount + 1);
            }}
            style={styles.btn2}>
            <Text style={styles.text11}>+</Text>
          </Pressable>
        </View>
        <Text style={styles.text13}>Choose a size</Text>
        <View style={styles.view9}>
          <Pressable
            onPressIn={() => {
              setSize('Regular');
            }}
            style={size === 'Regular' ? styles.btn3 : styles.btn6}>
            <Text style={size === 'Regular' ? styles.text14 : styles.text15}>
              R
            </Text>
          </Pressable>
          <Pressable
            onPressIn={() => {
              setSize('Large');
            }}
            style={size === 'Large' ? styles.btn4 : styles.btn5}>
            <Text style={size === 'Large' ? styles.text14 : styles.text15}>
              L
            </Text>
          </Pressable>
          <Pressable
            onPressIn={() => {
              setSize('Extra large');
            }}
            style={size === 'Extra large' ? styles.btn3 : styles.btn6}>
            <Text
              style={size === 'Extra large' ? styles.text14 : styles.text15}>
              XL
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPressIn={() => {
            handleSubmit();
          }}
          style={styles.btn1}>
          <Text style={styles.text10}>Add to cart</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default Details;
