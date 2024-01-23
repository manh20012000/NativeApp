import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewRecode from "../AddVideo/NewRecode.js";
import Infor from "../Home/Information/Infor.js";
import Login from "../Login/Login.js";
import SeeDeTail from "../Home/TrangChu/SeeDeTail.js";
import Dangky from "../Login/Dangky.js";
import AddInfor from "../Home/Information/EditInfor.js";
import Timkiem from "../Home/TrangChu/Timkiem.js";
import BootonGate from "./BootonGate.js";
import Message from "../Home/TrangChu/MessApp/Message.js";
import PesionChat from "../Home/TrangChu/MessApp/PesionChat.js";
import UserThink from "../Home/TrangChu/UserThink.js";
import InforUser from "../Login/InforUser.js";
import PostWithCamera from "../Home/TrangChu/PostWithCamera.js";
import Coment from "../Home/TrangChu/comment.js";
import EditProfile from "../Home/Information/EditInfor.js";
import PostVideo from "../AddVideo/PostVideo.js";
import { getUserToken } from "../../Token_Auth.js";
import EditerVideo from "../AddVideo/EditerVideo.js";
import SeemVideo from "../Home/Information/SeemVideo.js";
const Stack = createNativeStackNavigator();
const Navigete = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Thực hiện kiểm tra đăng nhập ở đây, bạn có thể sử dụng AsyncStorage hoặc Redux để kiểm tra
  useEffect(() => {
    // Ví dụ sử dụng hàm kiểm tra đăng nhập từ một module nào đó
    const checkLoginStatus = async () => {
      const userToken = await getUserToken(); // Giả sử getUserToken trả về token hoặc null
    
      if (userToken != null) {
        console.log(userToken,'hahaha')
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);
  return (
    <NavigationContainer
      style={{
        flex: 1,
      }}
    >
      <Stack.Navigator
        initialRouteName={isLoggedIn?'BootonGate':'Login'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="BootonGate" component={BootonGate} />

        <Stack.Screen name="SeeDeTail" component={SeeDeTail} />
        <Stack.Screen name="Dangky" component={Dangky} />
        <Stack.Screen name="ThemInfor" component={AddInfor} />
        <Stack.Screen name="Timkiem" component={Timkiem} />
        <Stack.Screen name="NewReCode" component={NewRecode} />
        <Stack.Screen name="Mess" component={Message} />
        <Stack.Screen name="PesionChat" component={PesionChat} />
        <Stack.Screen name="UserThink" component={UserThink} />
        <Stack.Screen name="InforUser" component={InforUser} />
        <Stack.Screen name="Coment" component={Coment} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="PostVideo" component={PostVideo} />
        <Stack.Screen name="EditerVideo" component={EditerVideo} />
        <Stack.Screen name="SeemVideo" component={SeemVideo} />
        {/* <Stack.Screen
        name='PostWithCamera'
        component={PostWithCamera}
      /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigete;
