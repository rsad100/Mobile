import React from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../styles/Welcome2';

import welcome2 from '../assets/welcome2.png';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Welcome2 = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.view}>
      <View style={styles.view2}>
        <Text style={styles.text1}>Welcome!</Text>
        <Text style={styles.text2}>
          Get a cup of coffee for free only for new user
        </Text>
        <Image style={styles.image1} source={welcome2} />
        <Pressable
          onPressIn={() => {
            navigation.push('Signup');
          }}
          style={styles.btn1}>
          <Text style={styles.text3}>Create New Account</Text>
        </Pressable>
        <Pressable
          onPressIn={() => {
            navigation.push('Login');
          }}
          style={styles.btn2}>
          <Text style={styles.text4}>Login</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default Welcome2;
