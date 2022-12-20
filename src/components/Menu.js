/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Image, ScrollView, Pressable} from 'react-native';
import styles from '../styles/Menu';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import def from '../assets/default.jpg';
import profile from '../assets/profile.png';
import cart2 from '../assets/cart2.png';
import menu3 from '../assets/menu3.png';
import privacy1 from '../assets/privacy1.png';
import security1 from '../assets/security1.png';
import arrow1 from '../assets/arrow1.png';
import toast from 'react-native-simple-toast';

const Menu = props => {
  const navigation = useNavigation();

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      toast.show('Logout Success!', toast.TOP);
      navigation.push('Login');
    } catch (error) {
      console.log(error);
      toast.show('Logout Failed!', toast.TOP);
    }
  };

  return (
    <ScrollView
      style={{
        display: props.hidden,
        zIndex: 1,
        position: 'absolute',
        flexDirection: 'row',
        flex: 1,
        height: '100%',
        shadowColor: 'rgba(0, 0, 0, 0.37)',
        shadowOffset: {width: 0, height: 6},
        shadowRadius: 20,
      }}>
      <View style={styles.view1}>
        <View style={styles.view2}>
          <Image
            style={styles.image1}
            source={
              props.image === null
                ? def
                : {
                    uri: `https://res.cloudinary.com/dr6hbaq0j/image/upload/v1667258032${props.image}`,
                  }
            }
          />
          <Text style={styles.text1}>{props.display}</Text>
          <Text style={styles.text2}>{props.email}</Text>
        </View>
        <View style={styles.view3}>
          <Pressable
            onPressIn={() => {
              navigation.push('Profile');
            }}
            style={styles.view4}>
            <Image style={styles.image2} source={profile} />
            <Text style={styles.text3}>Edit Profile</Text>
          </Pressable>
          <View style={styles.view5} />
          <Pressable
            onPressIn={() => {
              props.role === 'admin'
                ? navigation.push('Order')
                : navigation.push('History');
            }}
            style={styles.view4}>
            <Image style={styles.image3} source={cart2} />
            <Text style={styles.text3}>Orders</Text>
          </Pressable>
          <View style={styles.view5} />
          <View style={styles.view4}>
            <Image style={styles.image3} source={menu3} />
            <Text style={styles.text3}>All menu</Text>
          </View>
          <View style={styles.view5} />
          <View style={styles.view4}>
            <Image style={styles.image3} source={privacy1} />
            {props.role === 'admin' ? (
              <Pressable
                onPressIn={() => {
                  navigation.push('Dashboard');
                }}>
                <Text style={styles.text3}>Sales Report</Text>
              </Pressable>
            ) : (
              <Text style={styles.text3}>Privacy policy</Text>
            )}
          </View>
          <View style={styles.view5} />
          <View style={styles.view4}>
            <Image style={styles.image3} source={security1} />
            <Text style={styles.text3}>Security</Text>
          </View>
        </View>
        <Pressable
          onPressIn={() => {
            logout();
          }}
          style={styles.view6}>
          <Text style={styles.text3}>Sign-out</Text>
          <Image style={styles.image4} source={arrow1} />
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default Menu;
