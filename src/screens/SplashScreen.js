import React, {useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import styles from '../styles/SplashScreen';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';

import coffee1 from '../assets/coffee1.png';

const Splashscreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const check = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.dispatch(StackActions.replace('Home'));
      } else {
        navigation.dispatch(StackActions.replace('Welcome'));
      }
    };
    check();
  }, [navigation]);

  return (
    <View style={styles.view}>
      <Image style={styles.image1} source={coffee1} />
      <Text style={styles.text1}>Coffee Shop</Text>
    </View>
  );
};
export default Splashscreen;
