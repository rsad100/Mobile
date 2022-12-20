import React, {useEffect, useState} from 'react';
import {Text, View, Image, ScrollView, Pressable} from 'react-native';
import styles from '../styles/Profile';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt from 'jwt-decode';
import axios from 'axios';

import chevronleft1 from '../assets/chevronleft1.png';
import chevronleft2 from '../assets/chevronleft2.png';
import def from '../assets/default.jpg';

const Delivery = () => {
  const navigation = useNavigation();
  const [display, setDisplay] = useState();
  const [email, setEmail] = useState();
  const [image, setImage] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const info = jwt(token);
        const url = `https://intermedietebackend.vercel.app/api/v1/users/${info.user_id}`;
        const profileData = await axios.get(url);
        // console.log(profileData.data);
        console.log(profileData.data.result[0]);
        setDisplay(profileData.data.result[0].display_name);
        setEmail(profileData.data.result[0].email);
        setImage(profileData.data.result[0].image_user);
        setAddress(profileData.data.result[0].address);
        setPhone(profileData.data.result[0].phone_number);
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
              navigation.push('Home');
            }}>
            <Image style={styles.image1} source={chevronleft1} />
          </Pressable>
        </View>
        <Text style={styles.text1}>My profile</Text>
        <View style={styles.view4}>
          <Text style={styles.text3}>Your information</Text>
          <Pressable
            onPressIn={() => {
              navigation.push('EditProfile');
            }}>
            <Text style={styles.text4}>Edit</Text>
          </Pressable>
        </View>
        <View style={styles.view5}>
          <View>
            <Image
              style={styles.image2}
              source={
                image === null
                  ? def
                  : {
                      uri: `https://res.cloudinary.com/dr6hbaq0j/image/upload/v1667258032${image}`,
                    }
              }
            />
          </View>
          <View style={styles.view6}>
            <Text style={styles.text5}>
              {display === null ? 'User' : display}
            </Text>
            <Text style={styles.text6}>{email}</Text>
            <Text style={styles.text6}>{phone}</Text>
            <Text style={styles.text7}>{address}</Text>
          </View>
        </View>
        <Pressable
          onPressIn={() => {
            navigation.push('History');
          }}
          style={styles.btn2}>
          <Text style={styles.text8}>Order History</Text>
          <Image style={styles.image3} source={chevronleft2} />
        </Pressable>
        <Pressable
          onPressIn={() => {
            navigation.push('EditPassword');
          }}
          style={styles.btn2}>
          <Text style={styles.text8}>Edit Password</Text>
          <Image style={styles.image3} source={chevronleft2} />
        </Pressable>
        <Pressable
          onPressIn={() => {
            navigation.push('FAQ');
          }}
          style={styles.btn2}>
          <Text style={styles.text8}>FAQ</Text>
          <Image style={styles.image3} source={chevronleft2} />
        </Pressable>
        <Pressable
          onPressIn={() => {
            navigation.push('Help');
          }}
          style={styles.btn3}>
          <Text style={styles.text8}>Help</Text>
          <Image style={styles.image3} source={chevronleft2} />
        </Pressable>
        <Pressable
          onPressIn={() => {
            navigation.push('Home');
          }}
          style={styles.btn1}>
          <Text style={styles.text12}>Save Change</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default Delivery;
