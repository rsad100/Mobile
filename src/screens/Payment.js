import React, {useState, useEffect} from 'react';
import {Text, View, Image, ScrollView, Pressable} from 'react-native';
import styles from '../styles/Payment';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import toast from 'react-native-simple-toast';
import jwt from 'jwt-decode';
import PushNotification from 'react-native-push-notification';

import chevronleft1 from '../assets/chevronleft1.png';
import card from '../assets/card.png';
import bank from '../assets/bank.png';
import delivery2 from '../assets/delivery2.png';

import PaymentCard from '../components/PaymentCard';

const Delivery = () => {
  const [payment, setPayment] = useState('1');
  const navigation = useNavigation();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [amount, setAmount] = useState();
  const [size, setSize] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        setImage(await AsyncStorage.getItem('image'));
        setName(await AsyncStorage.getItem('product_name'));
        setPrice(await AsyncStorage.getItem('product_price'));
        setAmount(await AsyncStorage.getItem('amount'));
        setSize(await AsyncStorage.getItem('size'));
        setId(await AsyncStorage.getItem('product_id'));
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const info = jwt(token);
      const data = {
        id_product: id,
        amount: amount,
        id_user: info.user_id,
        id_payment: payment,
        status: 'pending',
        size: size,
      };
      const url = 'https://intermedietebackend.vercel.app/api/v1/transactions/';
      await axios.post(url, data);
      toast.show('Transaction Success!', toast.TOP);
      navigation.push('History');
      PushNotification.localNotification({
        channelId: 'local-notification',
        title: 'Transaction Success!',
        message:
          'Your transaction is being processed. Please wait for your order!',
      });
    } catch (error) {
      toast.show('Transaction failed!', toast.TOP);
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.view}>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <Pressable
            onPressIn={() => {
              navigation.push('Delivery');
            }}>
            <Image style={styles.image1} source={chevronleft1} />
          </Pressable>
          <Text style={styles.text1}>Payment</Text>
        </View>
        <View style={styles.view4}>
          <Text style={styles.text3}>Products</Text>
        </View>
        <View style={styles.view5}>
          <PaymentCard
            size={size}
            amount={amount}
            image={image}
            name={name}
            price={price}
          />
        </View>
        <View style={styles.view4}>
          <Text style={styles.text3}>Payment methods</Text>
        </View>
        <View style={styles.view6}>
          <View style={styles.view7}>
            <Pressable
              onPressIn={() => {
                setPayment('1');
              }}
              style={payment === '1' ? styles.view8 : styles.view10}>
              <View style={payment === '1' ? styles.view9 : styles.view12} />
            </Pressable>
            <View style={styles.view15}>
              <View style={styles.view14}>
                <Image style={styles.image2} source={card} />
              </View>
              <Text style={styles.text8}>Card</Text>
            </View>
          </View>
          <View style={styles.view7}>
            <Pressable
              onPressIn={() => {
                setPayment('2');
              }}
              style={payment === '2' ? styles.view8 : styles.view10}>
              <View style={payment === '2' ? styles.view9 : styles.view12} />
            </Pressable>
            <View style={styles.view15}>
              <View style={styles.view16}>
                <Image style={styles.image3} source={bank} />
              </View>
              <Text style={styles.text8}>Bank account</Text>
            </View>
          </View>
          <View style={styles.view11}>
            <Pressable
              onPressIn={() => {
                setPayment('3');
              }}
              style={payment === '3' ? styles.view8 : styles.view10}>
              <View style={payment === '3' ? styles.view9 : styles.view12} />
            </Pressable>
            <View style={styles.view18}>
              <View style={styles.view17}>
                <Image style={styles.image4} source={delivery2} />
              </View>
              <Text style={styles.text8}>Cash on delivery</Text>
            </View>
          </View>
        </View>
        <View style={styles.view13}>
          <Text style={styles.text10}>Total</Text>
          <Text style={styles.text11}>IDR {price * amount}</Text>
        </View>
        <Pressable
          onPressIn={() => {
            handleSubmit();
          }}
          style={styles.btn1}>
          <Text style={styles.text12}>Complete payment</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default Delivery;
