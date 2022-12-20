import React from 'react';
import {Text, View, Image, ScrollView, Pressable} from 'react-native';
import styles from '../styles/Dashboard';
import {useNavigation} from '@react-navigation/native';

import chevronleft1 from '../assets/chevronleft1.png';
import chart1 from '../assets/chart1.png';
import chart2 from '../assets/chart2.png';

const Dashboard = () => {
  const navigation = useNavigation();

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
          <Text style={styles.text1}>Sales Chart</Text>
        </View>
        <View style={styles.view4}>
          <Text style={styles.text2}>Monthly Report</Text>
          <Text style={styles.text3}>Last 6 months</Text>
          <Image style={styles.image2} source={chart1} />
          <View style={styles.view5} />
          <View style={styles.view8}>
            <View style={styles.view7}>
              <View style={styles.view6} />
              <Text style={styles.text4}>Income</Text>
            </View>
            <View style={styles.view10}>
              <View style={styles.view9} />
              <Text style={styles.text4}>Outcome</Text>
            </View>
          </View>
        </View>
        <View style={styles.view12}>
          <Text style={styles.text5}>IDR 2.5M</Text>
          <Text style={styles.text6}>Daily average</Text>
          <Image style={styles.image2} source={chart2} />
        </View>
        <View style={styles.view11}>
          <Text style={styles.text7}>Goals</Text>
          <Text style={styles.text8}>
            Your goals is still on 76%. Keep up the good work!
          </Text>
          <View style={styles.view13}>
            <Text style={styles.text9}>100%</Text>
          </View>
          <View style={styles.view15}>
            <View style={styles.view14} />
            <View style={styles.view16} />
            <View style={styles.view17} />
          </View>
        </View>
        <Pressable style={styles.btn1}>
          <Text style={styles.text10}>Print Report</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default Dashboard;
