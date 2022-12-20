import React from 'react';
import {Text, View, Image} from 'react-native';
import styles from '../styles/PaymentCard';

const CartCard = props => {
  return (
    <View style={styles.view1}>
      <Image
        style={styles.image1}
        source={{
          uri: `https://res.cloudinary.com/dr6hbaq0j/image/upload/v1667258032${props.image}`,
        }}
      />
      <View style={styles.view3}>
        <Text style={styles.text1}>{props.name}</Text>
        <Text style={styles.text2}>x{props.amount}</Text>
        <Text style={styles.text3}>{props.size}</Text>
      </View>
      <View style={styles.view2}>
        <Text style={styles.text4}>IDR {props.price}</Text>
      </View>
    </View>
  );
};
export default CartCard;
