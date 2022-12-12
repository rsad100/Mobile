import React from 'react';
import {Text, View, Image} from 'react-native';
import styles from '../styles/PromosCard';

import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const PromosCard = props => {
  return (
    <Pressable style={styles.view2}>
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
export default PromosCard;
