import React, {useEffect, useState} from 'react';
import {Text, View, Image, ScrollView, Pressable} from 'react-native';
import styles from '../styles/Cart';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import chevronleft1 from '../assets/chevronleft1.png';
import delivery1 from '../assets/delivery1.png';
import arrow2 from '../assets/arrow2.png';

import CartCard from '../components/CartCard';

const Cart = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [size, setSize] = useState();
  const [amount, setAmount] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        setImage(await AsyncStorage.getItem('image'));
        setName(await AsyncStorage.getItem('product_name'));
        setPrice(await AsyncStorage.getItem('product_price'));
        setSize(await AsyncStorage.getItem('size'));
        setAmount(await AsyncStorage.getItem('amount'));
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  return (
    <ScrollView style={styles.view}>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <Pressable
            onPressIn={() => {
              navigation.push('Details');
            }}>
            <Image style={styles.image1} source={chevronleft1} />
          </Pressable>
          <View style={styles.view6}>
            <View style={styles.view8}>
              <View style={styles.view4} />
              <Text style={styles.text1}>Order</Text>
            </View>
            <View style={styles.view5} />
            <View style={styles.view8}>
              <View style={styles.view7} />
              <Text style={styles.text2}>Checkout</Text>
            </View>
            <View style={styles.view5} />
            <View style={styles.view8}>
              <View style={styles.view7} />
              <Text style={styles.text2}>Payment</Text>
            </View>
          </View>
        </View>
        <Text style={styles.text5}>
          <Text style={styles.text3}>My </Text>
          <Text style={styles.text4}>Cart</Text>
        </Text>
        <View style={styles.view9}>
          <CartCard
            amount={amount}
            size={size}
            image={image}
            name={name}
            price={price}
          />
        </View>
        <View style={styles.view11}>
          <View style={styles.view10}>
            <Image style={styles.image2} source={delivery1} />
            <Text style={styles.text6}>Free</Text>
          </View>
          <View style={styles.view12}>
            <Text style={styles.text7}>Total Price:</Text>
            <Text style={styles.text8}>IDR {price * amount}</Text>
          </View>
        </View>
        <Pressable
          onPressIn={() => {
            navigation.push('Delivery');
          }}
          style={styles.view13}>
          <Text style={styles.text9}>Complete Order</Text>
          <View style={styles.view14}>
            <Image style={styles.image3} source={arrow2} />
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default Cart;
