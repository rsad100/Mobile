import React from 'react';
import {Text, View, Image} from 'react-native';
import styles from '../styles/OrderCard';
import axios from 'axios';
import toast from 'react-native-simple-toast';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useNavigation} from '@react-navigation/native';

const OrderCard = props => {
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      console.log(props.key);
      const url = `https://intermedietebackend.vercel.app/api/v1/transactions/${props.id}`;
      const body = {status: 'Done'};
      await axios.patch(url, body);
      toast.show('Transaction marked as done', toast.TOP);
      navigation.push('Order');
    } catch (error) {
      console.log(error);
      toast.show('Process failed!', toast.TOP);
    }
  };

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
        <Text style={styles.text2}>IDR {props.price}</Text>
        <Text style={styles.text3}>{props.status}</Text>
      </View>
      <View style={styles.view4}>
        {props.status === 'Done' ? (
          <View />
        ) : (
          <Pressable
            onPressIn={() => {
              handleSubmit();
            }}
            style={styles.btn1}>
            <Text style={styles.text4}>Mark as done</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};
export default OrderCard;
