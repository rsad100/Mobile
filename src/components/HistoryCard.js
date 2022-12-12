import React from 'react';
import {Text, View, Image} from 'react-native';
import styles from '../styles/HistoryCard';

const HistoryCard = props => {
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
    </View>
  );
};
export default HistoryCard;
