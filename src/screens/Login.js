/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import styles from '../styles/Login';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import toast from 'react-native-simple-toast';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import login1 from '../assets/login1.png';
import google1 from '../assets/google1.png';
import eye from '../assets/eye.png';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(true);

  const post = async () => {
    try {
      setLoading(true);
      const data = {email: email, password: password};
      const url = 'https://intermedietebackend.vercel.app/api/v1/auth/';
      const result = await axios.post(url, data);
      await AsyncStorage.setItem('token', result.data.data.token);
      setLoading(false);
      console.log('login success');
      toast.show('Login Success!', toast.TOP);
      navigation.push('Home');
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.show('Login failed! Check your password or email', toast.TOP);
    }
  };

  return (
    <View>
      <ActivityIndicator
        style={
          loading === true
            ? {
                display: 'flex',
                position: 'absolute',
                top: '50%',
                left: '45%',
                zIndex: 1,
              }
            : {display: 'none', position: 'absolute', top: '50%', left: '50%'}
        }
        size="large"
      />
      <ScrollView style={styles.view}>
        <View style={styles.view2}>
          <View>
            <Image style={styles.image1} source={login1} />
            <Text style={styles.text1}>Log in</Text>
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
                style={styles.input2}
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
                style={styles.btn4}>
                <Image style={styles.image2} source={eye} />
              </Pressable>
            </View>
          </View>
          <Pressable
            onPressIn={() => {
              navigation.push('Forgot');
            }}
            style={styles.btn3}>
            <Text style={styles.text2}>Forgot password?</Text>
          </Pressable>
          <Pressable
            onPressIn={() => {
              navigation.push('Signup');
            }}
            style={styles.btn3}>
            <Text style={styles.text2}>Register</Text>
          </Pressable>
          <Pressable
            onPressIn={() => {
              post();
            }}
            style={styles.btn1}>
            <Text style={styles.text3}>Login</Text>
          </Pressable>
          <View style={styles.view3}>
            <View style={styles.view1} />
            <Text style={styles.text5}>or login in with</Text>
            <View style={styles.view1} />
          </View>
          <Pressable
            onPressIn={() => {
              post();
            }}
            style={styles.btn2}>
            <Image source={google1} />
            <Text style={styles.text4}>Login with Google</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};
export default Login;
