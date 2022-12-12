import React from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import styles from '../styles/Welcome';
import {useNavigation} from '@react-navigation/native';

import welcome1 from '../assets/welcome1.png';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.view}>
      <Text style={styles.text1}>Coffee for Everyone</Text>
      <Image style={styles.image1} source={welcome1} />
      <View style={styles.view2}>
        <Pressable
          onPressIn={() => {
            navigation.push('Welcome2');
          }}
          style={styles.btn1}>
          <Text style={styles.text2}>Get started</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default Welcome;
