import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import styles from '../styles/Home';
import axios from 'axios';
import jwt from 'jwt-decode';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import menu1 from '../assets/menu1.png';
import cart from '../assets/cart.png';
import search from '../assets/search.png';
import home from '../assets/home.png';
import user from '../assets/user.png';
import chat from '../assets/chat.png';

import ProductCard from '../components/ProductCard';
import PromosCard from '../components/PromosCard';
import Menu from '../components/Menu';

const Home = () => {
  const navigation = useNavigation();

  const [hidden, setHidden] = useState('none');
  const [filter, setFilter] = useState('Coffee');
  const [sort, setSort] = useState('cheap');
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState([]);
  const [display, setDisplay] = useState();
  const [email, setEmail] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [promos, setPromos] = useState([]);
  const [role, setRole] = useState();
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const isLoggedIn = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          if (token === null) {
            navigation.push('Login');
          }
        } catch (error) {
          console.log(error);
        }
      };
      isLoggedIn();
    });
    const getProduct = async () => {
      try {
        const url = `https://intermedietebackend.vercel.app/api/v1/products/?filter=${filter}&keyword=${keyword}&sort=${sort}`;
        setLoading(true);
        const result = await axios.get(url);
        setLoading(false);
        setProducts(result.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    const getProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const info = jwt(token);
        setRole(info.role);
        const url = `https://intermedietebackend.vercel.app/api/v1/users/${info.user_id}`;
        setLoading2(true);
        const profileData = await axios.get(url);
        setLoading2(false);
        setDisplay(profileData.data.result[0].display_name);
        setEmail(profileData.data.result[0].email);
        setImage(profileData.data.result[0].image_user);
      } catch (error) {
        setLoading2(false);
        console.log(error);
      }
    };
    const getPromo = async () => {
      try {
        const url = 'https://intermedietebackend.vercel.app/api/v1/promos/';
        const result = await axios.get(url);
        setPromos(result.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
    getPromo();
    getProfile();
    return unsubscribe;
  }, [filter, keyword, sort, navigation]);

  return (
    <ScrollView style={styles.view}>
      <Menu
        role={role}
        image={image}
        email={email}
        display={display}
        hidden={hidden}
      />
      <View style={styles.view2}>
        <View style={styles.view3}>
          <Pressable
            onPressIn={() => {
              hidden === 'none' ? setHidden('flex') : setHidden('none');
            }}>
            <Image style={styles.image1} source={menu1} />
          </Pressable>
          <Pressable
            onPressIn={() => {
              navigation.push('Cart');
            }}>
            <Image style={styles.image2} source={cart} />
          </Pressable>
        </View>
        <Text style={styles.text1}>A good coffee is a good day</Text>
        <View style={styles.view4}>
          <Image style={styles.image3} source={search} />
          <TextInput
            style={styles.input1}
            placeholder="Search"
            value={keyword}
            onChangeText={text => {
              setKeyword(text);
            }}
          />
        </View>
        <ScrollView
          style={styles.view5}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <Pressable
            onPressIn={() => {
              setFilter('Fav');
            }}>
            <Text style={filter === 'Fav' ? styles.text2 : styles.text3}>
              Favorite
            </Text>
          </Pressable>
          <Pressable
            onPressIn={() => {
              setFilter('Coffee');
            }}>
            <Text style={filter === 'Coffee' ? styles.text2 : styles.text3}>
              Coffee
            </Text>
          </Pressable>
          <Pressable
            onPressIn={() => {
              setFilter('Non');
            }}>
            <Text style={filter === 'Non' ? styles.text2 : styles.text3}>
              Non Coffee
            </Text>
          </Pressable>
          <Pressable
            onPressIn={() => {
              setFilter('Food');
            }}>
            <Text style={filter === 'Food' ? styles.text2 : styles.text3}>
              Foods
            </Text>
          </Pressable>
          <Pressable
            onPressIn={() => {
              setFilter('Add');
            }}>
            <Text style={filter === 'Add' ? styles.text2 : styles.text3}>
              Add-on
            </Text>
          </Pressable>
        </ScrollView>
        <View style={styles.view10}>
          <Pressable
            onPressIn={() => {
              setSort('pricey');
            }}
            style={sort === 'pricey' ? styles.btn3 : styles.btn2}
          />
          <Text style={styles.text4}>Most Expensive</Text>
          <Pressable
            onPressIn={() => {
              setSort('cheap');
            }}
            style={sort === 'cheap' ? styles.btn3 : styles.btn2}
          />
          <Text style={styles.text9}>Cheapest</Text>
        </View>
        <ScrollView
          style={styles.view8}
          horizontal={true}
          persistentScrollbar={true}
          showsHorizontalScrollIndicator={true}>
          {loading === true ? (
            <Text style={styles.text8}>Loading...</Text>
          ) : (
            products.map(product => {
              return (
                <ProductCard
                  img={product.image_product}
                  name={product.name_product}
                  price={product.price}
                  id={product.id_product}
                  desc={product.desc_product}
                  key={product.id_product}
                />
              );
            })
          )}
        </ScrollView>
        <Text style={styles.text6}>Promos</Text>
        <ScrollView
          style={styles.view9}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          persistentScrollbar={true}>
          {loading2 === true ? (
            <Text style={styles.text8}>Loading...</Text>
          ) : (
            promos.map(x => {
              return (
                <PromosCard
                  img={x.image_promo}
                  name={x.name_promo}
                  price={x.normal_price}
                  id={x.id_promo}
                  desc={x.desc_promo}
                  key={x.id_promo}
                />
              );
            })
          )}
        </ScrollView>
        {role === 'admin' ? (
          <Pressable
            onPressIn={() => {
              navigation.push('NewProduct');
            }}
            style={styles.btn1}>
            <Text style={styles.text7}>Add product</Text>
          </Pressable>
        ) : (
          <View />
        )}
        {role === 'admin' ? (
          <Pressable
            onPressIn={() => {
              navigation.push('NewPromo');
            }}
            style={styles.btn1}>
            <Text style={styles.text7}>Add promo</Text>
          </Pressable>
        ) : (
          <View />
        )}
        <View style={styles.view6}>
          <Image style={styles.image4} source={home} />
          <View style={styles.view7}>
            <Image style={styles.image5} source={user} />
            <Image style={styles.image6} source={chat} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default Home;
