/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import styles from '../styles/EditProfile';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt from 'jwt-decode';
import axios from 'axios';
import toast from 'react-native-simple-toast';

import chevronleft1 from '../assets/chevronleft1.png';
import pen1 from '../assets/pen1.png';
import calendar from '../assets/calendar.png';
import def from '../assets/default.jpg';
import {launchImageLibrary} from 'react-native-image-picker';

const Delivery = () => {
  const navigation = useNavigation();
  const [gender, setGender] = useState('Female');
  const [display, setDisplay] = useState();
  const [email, setEmail] = useState();
  const [image, setImage] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [birth, setBirth] = useState();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const info = jwt(token);
        const url = `http://192.168.100.3:8080/api/v1/users/${info.user_id}`;
        const profileData = await axios.get(url);
        // console.log(profileData.data);
        // console.log(profileData.data.result[0]);
        setDisplay(profileData.data.result[0].display_name);
        setEmail(profileData.data.result[0].email);
        setImage(profileData.data.result[0].image_user);
        setAddress(profileData.data.result[0].address);
        setPhone(profileData.data.result[0].phone_number);
        setBirth(profileData.data.result[0].birthday);
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, []);

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const info = jwt(token);
      const url = `http://192.168.100.3:8080/api/v1/users/${info.user_id}`;
      const tempPhoto = {
        uri: photo?.assets[0]?.uri,
        type: photo?.assets[0]?.type,
        name: photo?.assets[0]?.fileName,
      };
      console.log(tempPhoto.uri);
      let data = new FormData();
      data.append('display_name', display);
      data.append('gender', gender);
      data.append('email', email);
      data.append('phone_number', phone);
      data.append('birthday', birth);
      data.append('address', address);
      if (tempPhoto.uri !== undefined) {
        data.append('image_user', tempPhoto);
      }
      // console.log(data);
      // const body = formdata;
      // const body = {
      //   display_name: display,
      //   gender: gender,
      //   email: email,
      //   phone_number: phone,
      //   birthday: birth,
      //   address: address,
      // };
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data;',
      };
      setLoading(true);
      await axios.patch(url, data, headers);
      setLoading(false);
      // await axios({
      //   method: 'PATCH',
      //   url: url,
      //   data: data,
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'multipart/form-data;',
      //   },
      // });
      // console.log('success');
      toast.show('Data changed successfully!', toast.TOP);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.show('Data change failed!', toast.TOP);
    }
  };

  // const handlePhotoUpload = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     const info = jwt(token);
  //     const url = `http://192.168.100.3:8080/api/v1/users/${info.user_id}`;
  //     let formdata = new FormData();
  //     formdata.append('image_user', photo);
  //     const body = formdata;
  //     await axios.patch(url, body);
  //     console.log('success');
  //     toast.show('Data changed successfully!', toast.TOP);
  //   } catch (error) {}
  // };

  const handleChoosePhoto = async () => {
    launchImageLibrary({noData: true}, response => {
      if (response && !response.didCancel) {
        setPhoto(response);
        // console.log(response.assets[0].uri);
      }
    });
  };

  // console.log(photo?.assets[0].uri);

  return (
    <ScrollView style={styles.view}>
      <ActivityIndicator
        style={
          loading === true
            ? {
                display: 'flex',
                position: 'absolute',
                top: '50%',
                left: '45%',
              }
            : {display: 'none', position: 'absolute', top: '50%', left: '50%'}
        }
        size="large"
      />
      <View style={styles.view2}>
        <View style={styles.view3}>
          <Pressable
            onPressIn={() => {
              navigation.push('Profile');
            }}>
            <Image style={styles.image1} source={chevronleft1} />
          </Pressable>
          <Text style={styles.text1}>Edit Profile</Text>
        </View>
        <View style={styles.view5}>
          <Image
            style={styles.image2}
            source={
              image === null
                ? def
                : photo
                ? {uri: photo?.assets[0].uri}
                : {
                    uri: `https://res.cloudinary.com/dr6hbaq0j/image/upload/v1667258032${image}`,
                  }
            }
          />
          <Pressable
            onPressIn={() => {
              handleChoosePhoto();
            }}
            style={styles.view4}>
            <Image style={styles.image3} source={pen1} />
          </Pressable>
        </View>
        <Text style={styles.text2}>Name :</Text>
        <TextInput
          style={styles.input1}
          placeholder="Enter your name"
          value={display}
          onChangeText={text => {
            setDisplay(text);
          }}
        />
        <View style={styles.view6}>
          <Pressable
            onPressIn={() => {
              setGender('Female');
            }}
            style={gender === 'Female' ? styles.view8 : styles.view10}>
            <View style={gender === 'Female' ? styles.view9 : styles.view12} />
          </Pressable>
          <Text style={styles.text3}>Female</Text>
          <Pressable
            onPressIn={() => {
              setGender('Male');
            }}
            style={gender === 'Male' ? styles.view8 : styles.view10}>
            <View style={gender === 'Male' ? styles.view9 : styles.view12} />
          </Pressable>
          <Text style={styles.text3}>Male</Text>
        </View>
        <Text style={styles.text2}>Email Adress :</Text>
        <TextInput
          style={styles.input2}
          placeholder="Enter your email address"
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
        />
        <Text style={styles.text2}>Phone Number :</Text>
        <TextInput
          style={styles.input2}
          placeholder="Enter your phone number"
          value={phone}
        />
        <Text style={styles.text2}>Date of Birth</Text>
        <View style={styles.view7}>
          <TextInput
            style={styles.input2}
            placeholder="Enter your date of birth"
            value={birth}
            onChangeText={text => {
              setBirth(text);
            }}
          />
          <Image style={styles.image4} source={calendar} />
        </View>
        <Text style={styles.text2}>Delivery Adress :</Text>
        <TextInput
          style={styles.input3}
          placeholder="Enter your delivery address"
          value={address}
          onChangeText={text => {
            setAddress(text);
          }}
        />
        <Pressable
          onPressIn={() => {
            handleSubmit();
          }}
          style={styles.btn1}>
          <Text style={styles.text4}>Save and Update</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default Delivery;
