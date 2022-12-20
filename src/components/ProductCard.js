import React from 'react';
import {Text, View, Image} from 'react-native';
import styles from '../styles/ProductCard';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const ProductCard = props => {
  const navigation = useNavigation();
  const storeDataProduct = async () => {
    try {
      await AsyncStorage.setItem('image', props.img);
      await AsyncStorage.setItem('product_name', props.name);
      await AsyncStorage.setItem('product_price', props.price.toString());
      await AsyncStorage.setItem('product_desc', props.desc);
      await AsyncStorage.setItem('product_id', props.id.toString());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pressable
      onPressIn={() => {
        storeDataProduct();
        navigation.push('Details');
        console.log('details');
      }}
      style={styles.view2}>
      <View style={styles.view1}>
        <Image
          style={styles.image1}
          source={{
            uri: `https://res.cloudinary.com/dr6hbaq0j/image/upload/v1667258032${props.img}`,
          }}
        />
        <View style={styles.view3}>
          <Text style={styles.text1}>{props.name}</Text>
          <Text style={styles.text2}>IDR {props.price}</Text>
        </View>
      </View>
    </Pressable>
  );
};
export default ProductCard;
