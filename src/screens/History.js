import React, {useEffect, useState} from 'react';
import {Text, View, Image, ScrollView, Pressable} from 'react-native';
import styles from '../styles/History';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt from 'jwt-decode';
import axios from 'axios';

import chevronleft1 from '../assets/chevronleft1.png';
import HistoryCard from '../components/HistoryCard';

const History = () => {
  const navigation = useNavigation();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const info = jwt(token);
        const url = `http://192.168.100.3:8080/api/v1/transactions/${info.user_id}`;
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
        <Text style={styles.text1}>Order History</Text>
        {loading === true ? (
          <Text>Loading...</Text>
        ) : (
          history.map(item => {
            return (
              <HistoryCard
                image={item.image_product}
                name={item.name_product}
                price={item.price}
                status={item.status}
              />
            );
          })
        )}
      </View>
    </ScrollView>
  );
};
export default History;
