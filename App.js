import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Welcome from './src/screens/Welcome';
import Welcome2 from './src/screens/Welcome2';
import Signup from './src/screens/Signup';
import Login from './src/screens/Login';
import Forgot from './src/screens/Forgot';
import Home from './src/screens/Home';
import Details from './src/screens/Details';
import Cart from './src/screens/Cart';
import Delivery from './src/screens/Delivery';
import Payment from './src/screens/Payment';
import Profile from './src/screens/Profile';
import EditProfile from './src/screens/EditProfile';
import History from './src/screens/History';
import NewProduct from './src/screens/NewProduct';
import NewPromo from './src/screens/NewPromo';
import EditProduct from './src/screens/EditProduct';

function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Welcome2"
          component={Welcome2}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Forgot"
          component={Forgot}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Delivery"
          component={Delivery}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NewProduct"
          component={NewProduct}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NewPromo"
          component={NewPromo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProduct"
          component={EditProduct}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
