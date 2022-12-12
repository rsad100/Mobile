import React from 'react';
import {Text, View, Image, ScrollView, TextInput} from 'react-native';
import styles from '../styles/Forgot';
import {useNavigation} from '@react-navigation/native';

import forgot1 from '../assets/forgot1.png';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Forgot = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.view}>
      <View style={styles.view2}>
        <Text style={styles.text1}>Don’t Worry!</Text>
        <Text style={styles.text4}>
          Enter your email adress to get reset password link
        </Text>
        <Image style={styles.image1} source={forgot1} />
        <View>
          <TextInput
            style={styles.input1}
            placeholder="Enter your email adress"
          />
        </View>
        <Text style={styles.text2}>Haven’t received any link?</Text>
        <Pressable
          onPressIn={() => {
            navigation.push('Login');
          }}
          style={styles.btn1}>
          <Text style={styles.text3}>Resend Link</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default Forgot;
