import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewRecode from '../AddVideo/NewRecode.js';
import Infor from '../Home/Information/Infor.js';
import Login from '../Login/Login.js';
import SeeDeTail from '../Home/TrangChu/SeeDeTail.js';
import Dangky from '../Login/Dangky.js';
import AddInfor from '../Home/Information/AddInfor.js';
import Timkiem from '../Home/TrangChu/Timkiem.js';
import BootonGate from './BootonGate.js';
import Message from '../Home/TrangChu/MessApp/Message.js';
import PesionChat from '../Home/TrangChu/MessApp/PesionChat.js';
import UserThink from '../Home/TrangChu/UserThink.js';
export const NameScreen = {
  SCREEN_Home: 'Home',
  SCREEN_Login: 'Login',

};
const Stack = createNativeStackNavigator();
const Navigete = () => {
  return (
    <NavigationContainer style={{
      flex: 1
    }}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name='Login'
          component={Login}

        />
         <Stack.Screen
          name='BootonGate'
          component={BootonGate}
        />

        <Stack.Screen

          name='SeeDeTail'
          component={SeeDeTail}
        />
        <Stack.Screen
          name='dangky'
          component={Dangky}
        />
        <Stack.Screen
          name='ThemInfor'
          component={AddInfor}
        />
        <Stack.Screen
          name='Timkiem'
          component={Timkiem}
        />
        <Stack.Screen
          name='NewReCode'
          component={NewRecode}
        />
        <Stack.Screen
          name='Mess'
          component={Message}
        />
           <Stack.Screen
          name='PesionChat'
          component={PesionChat}
        />
        <Stack.Screen
          name='UserThink'
          component={UserThink}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default Navigete;