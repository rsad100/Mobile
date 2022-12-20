/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import styles from '../styles/Signup';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import toast from 'react-native-simple-toast';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import signup1 from '../assets/signup1.png';
import eye from '../assets/eye.png';

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(true);

  const submitHandler = async () => {
    try {
      const url =
        'https://intermedietebackend.vercel.app/api/v1/users/register';
      setLoading(true);
      const body = {
        email: email,
        password: password,
        phone_number: phone,
      };
      await axios.post(url, body);
      setLoading(false);
      toast.show('Register Success!', toast.TOP);
      navigation.push('Login');
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.show('Email or phone number already exist!', toast.TOP);
    }
  };

  return (
    <ScrollView style={styles.view}>
      <ActivityIndicator
        style={
          loading === true
            ? {display: 'flex', position: 'absolute', top: '50%', left: '50%'}
            : {display: 'none', position: 'absolute', top: '50%', left: '50%'}
        }
        size="large"
      />
      <View style={styles.view2}>
        <View>
          <Image style={styles.image1} source={signup1} />
          <Text style={styles.text1}>Sign Up</Text>
        </View>
        <View>
          <TextInput
            style={styles.input1}
            placeholder="Enter your email adress"
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
          />
          <View>
            <TextInput
              style={styles.input1}
              placeholder="Enter your password"
              value={password}
              secureTextEntry={hidden}
              onChangeText={text => {
                setPassword(text);
              }}
            />
            <Pressable
              onPressIn={() => {
                hidden === false ? setHidden(true) : setHidden(false);
              }}
              style={styles.btn2}>
              <Image source={eye} />
            </Pressable>
          </View>
          <TextInput
            style={styles.input2}
            placeholder="Enter your phone number"
            value={phone}
            onChangeText={text => {
              setPhone(text);
            }}
          />
        </View>
        <Pressable
          onPressIn={() => {
            submitHandler();
          }}
          style={styles.btn1}>
          <Text style={styles.text3}>Create Account</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default Signup;
