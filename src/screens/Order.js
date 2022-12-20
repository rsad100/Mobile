import React, {useEffect, useState} from 'react';
import {Text, View, Image, ScrollView, Pressable} from 'react-native';
import styles from '../styles/Order';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

import chevronleft1 from '../assets/chevronleft1.png';
import hand from '../assets/hand.png';

import OrderCard from '../components/OrderCard';

const Order = () => {
  const navigation = useNavigation();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(history);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const url =
          'https://intermedietebackend.vercel.app/api/v1/transactions/';
        setLoading(true);
        const result = await axios.get(url);
        setLoading(false);
        setHistory(result.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    getHistory();
  }, []);

  console.log(history);
  return (
    <ScrollView style={styles.view}>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <Pressable
            onPressIn={() => {
              navigation.push('Profile');
            }}>
            <Image style={styles.image1} source={chevronleft1} />
          </Pressable>
        </View>
        <Text style={styles.text1}>
          <Text>Customer </Text>
          <Text style={styles.text2}>Order</Text>
        </Text>
        <View style={styles.view4}>
          <Image style={styles.image2} source={hand} />
          <Text style={styles.text3}>Select an item to mark it as done</Text>
        </View>
        <View style={styles.view5}>
          <Text style={styles.text4}>Pending</Text>
          <Text style={styles.text5}>Select</Text>
        </View>
        <View style={styles.view6}>
          {loading === true ? (
            <Text>Loading...</Text>
          ) : (
            history
              .filter(item => {
                return item.status === 'pending';
              })
              .map(item => {
                return (
                  <OrderCard
                    image={item.image_product}
                    name={item.name_product}
                    price={item.price}
                    status={item.status}
                    key={item.id_transaction}
                    id={item.id_transaction}
                  />
                );
              })
          )}
        </View>
        <View style={styles.view5}>
          <Text style={styles.text4}>Done</Text>
        </View>
        <View>
          {loading === true ? (
            <Text>Loading...</Text>
          ) : (
            history
              .filter(item => {
                return item.status === 'Done';
              })
              .map(item => {
                return (
                  <OrderCard
                    image={item.image_product}
                    name={item.name_product}
                    price={item.price}
                    status={item.status}
                    key={item.id_transaction}
                    id={item.id_transaction}
                  />
                );
              })
          )}
        </View>
      </View>
    </ScrollView>
  );
};
export default Order;
