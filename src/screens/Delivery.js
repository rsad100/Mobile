import React, {useState, useEffect} from 'react';
import {Text, View, Image, ScrollView, Pressable} from 'react-native';
import styles from '../styles/Delivery';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt from 'jwt-decode';
import axios from 'axios';

import chevronleft1 from '../assets/chevronleft1.png';

const Delivery = () => {
  const [delivery, setDelivery] = useState('Door');
  const navigation = useNavigation();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [price, setPrice] = useState();
  const [amount, setAmount] = useState();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const info = jwt(token);
        const url = `https://intermedietebackend.vercel.app/api/v1/users/${info.user_id}`;
        const profileData = await axios.get(url);
        // console.log(profileData.data);
        console.log(profileData.data.result[0]);
        setPhone(profileData.data.result[0].phone_number);
        setAddress(profileData.data.result[0].address);
        const getData = async () => {
          try {
            setPrice(await AsyncStorage.getItem('product_price'));
            setAmount(await AsyncStorage.getItem('amount'));
          } catch (error) {
            console.log(error);
          }
        };
        getData();
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, []);

  return (
    <ScrollView style={styles.view}>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <Pressable
            onPressIn={() => {
              navigation.push('Cart');
            }}>
            <Image style={styles.image1} source={chevronleft1} />
          </Pressable>
          <Text style={styles.text1}>Checkout</Text>
        </View>
        <Text style={styles.text2}>Delivery</Text>
        <View style={styles.view4}>
          <Text style={styles.text3}>Address details</Text>
          <Text style={styles.text4}>Change</Text>
        </View>
        <View style={styles.view5}>
          <Text style={styles.text5}>{address}</Text>
          {/* <Text style={styles.text6}>
            Km 5 refinery road oppsite re public road, effurun, Jakarta
          </Text> */}
          <Text style={styles.text7}>{phone}</Text>
        </View>
        <View style={styles.view4}>
          <Text style={styles.text3}>Delivery methods</Text>
        </View>
        <View style={styles.view6}>
          <View style={styles.view7}>
            <Pressable
              onPressIn={() => {
                setDelivery('Door');
              }}
              style={delivery === 'Door' ? styles.view8 : styles.view10}>
              <View
                style={delivery === 'Door' ? styles.view9 : styles.view12}
              />
            </Pressable>
            <Text style={styles.text8}>Door delivery</Text>
          </View>
          <View style={styles.view7}>
            <Pressable
              onPressIn={() => {
                setDelivery('Pick');
              }}
              style={delivery === 'Pick' ? styles.view8 : styles.view10}>
              <View
                style={delivery === 'Pick' ? styles.view9 : styles.view12}
              />
            </Pressable>
            <Text style={styles.text8}>Pick up at store</Text>
          </View>
          <View style={styles.view11}>
            <Pressable
              onPressIn={() => {
                setDelivery('Dine');
              }}
              style={delivery === 'Dine' ? styles.view8 : styles.view10}>
              <View
                style={delivery === 'Dine' ? styles.view9 : styles.view12}
              />
            </Pressable>
            <Text style={styles.text9}>Dine in</Text>
          </View>
        </View>
        <View style={styles.view13}>
          <Text style={styles.text10}>Total</Text>
          <Text style={styles.text11}>IDR {price * amount}</Text>
        </View>
        <Pressable
          onPressIn={() => {
            navigation.push('Payment');
          }}
          style={styles.btn1}>
          <Text style={styles.text12}>Proceed to payment</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default Delivery;
