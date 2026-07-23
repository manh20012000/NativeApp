import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  PanResponder,
  Modal,
  Text,
  TextInput,
  Animated,
} from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CommonActions } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { HandlerNotification } from "../../confige/Util_handlerNotification.js";
import { useSocket } from "../../socket.js";
import { logout } from "../../Redex/Reducer/auth.slice.js";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const SetTingInfor = ({ navigation, route }) => {
  // console.log(route.params, "giá trị");
  const socket = useSocket();
  const dispatch = useDispatch();
  const user = route.params;
  const handlerArrayfcmToken = (fcmtoken) => {
    return user.fcmToken.filter((token) => token !== fcmtoken);
  };
  const backdeleteAcyns = async () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: "Login" }, // hoặc 'BootonGate' tùy thuộc vào màn hình mặc định bạn muốn
        ],
      })
    );
    dispatch(logout());
    const fcmtoken = await AsyncStorage.getItem("fcmtoken");

    HandlerNotification.updateExpoPushToken(
      handlerArrayfcmToken(fcmtoken),
      user,
      ""
    );
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("fcmtoken");
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    socket?.disconnect();
    socket?.removeAllListeners();
    socket?.close();
  };
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View
        style={{
          flex: 0.08,

          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: 15,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Ionicons name="chevron-back" size={34} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={backdeleteAcyns}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
            width: "30%",
            height: 35,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: '#333333', flex: 1 }}>
        <Text style={{ color: "white", fontSize: 18, fontWeight: "800", marginVertical: "2%", marginLeft: '2%' }}>
          Acount
        </Text>
        <View style={{ backgroundColor: '#555555', flex: 0.4, borderRadius: 10, paddingVertical: '2%' }}>
          <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: "row", padding: '3%' }}>
            <View style={{ flexDirection: 'row', width: '60%', }}>
              <Feather name="user" size={24} color="black" />
              <Text style={{ fontSize: 18, fontWeight: '600', color: "white", marginLeft: '3%' }}>
                Account
              </Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="#999999" />
          </TouchableOpacity>
          <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: "row", padding: '3%' }}>
            <View style={{ flexDirection: 'row', width: '60%', }}>
              <FontAwesome6 name="unlock-keyhole" size={24} color="#222222" />
              <Text style={{ fontSize: 18, fontWeight: '600', color: "white", marginLeft: '3%' }}>
                Privacy
              </Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="#999999" />
          </TouchableOpacity>
          <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: "row", padding: '3%' }}>
            <View style={{ flexDirection: 'row', width: '80%', }}>
              <MaterialIcons name="security" size={24} color="black" />
              <Text style={{ fontSize: 18, fontWeight: '600', color: "white", marginLeft: '3%' }}>
                Security & permissions
              </Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="#999999" />
          </TouchableOpacity>
          <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: "row", padding: '3%' }}>
            <View style={{ flexDirection: 'row', width: '60%', }}>
              <AntDesign name="profile" size={24} color="black" />
              <Text style={{ fontSize: 18, fontWeight: '600', color: "white", marginLeft: '3%' }}>
                Share profile
              </Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="#999999" />
          </TouchableOpacity>
          <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: "row", padding: '3%' }}>
            <View style={{ flexDirection: 'row', width: '60%', }}>
              <FontAwesome6 name="cart-shopping" size={24} color="#222222" />
              <Text style={{ fontSize: 18, fontWeight: '600', color: "white", marginLeft: '3%' }}>
                Orders
              </Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="#999999" />
          </TouchableOpacity>
        </View>
        <Text style={{ color: "white", fontSize: 18, fontWeight: "800", marginVertical: "2%", marginLeft: '2%' }}>
          Content & Display
        </Text>
        <View style={{ backgroundColor: '#555555', flex: 0.55, borderRadius: 10, paddingVertical: '2%' }}>
          <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: "row", padding: '4%' }}>
            <View style={{ flexDirection: 'row', width: '60%', }}>
              <MaterialIcons name="notifications-none" size={26} color="black" />
              <Text style={{ fontSize: 18, fontWeight: '600', color: "white", marginLeft: '3%' }}>
                Notifications
              </Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="#999999" />
          </TouchableOpacity>
          <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: "row", padding: '4%' }}>
            <View style={{ flexDirection: 'row', width: '60%', }}>
              <MaterialIcons name="live-tv" size={24} color="black" />
              <Text style={{ fontSize: 18, fontWeight: '600', color: "white", marginLeft: '3%' }}>
                Live
              </Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="#999999" />
          </TouchableOpacity>
          <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: "row", padding: '4%' }}>
            <View style={{ flexDirection: 'row', width: '60%', }}>
              <FontAwesome name="music" size={24} color="black" />
              <Text style={{ fontSize: 18, fontWeight: '600', color: "white", marginLeft: '3%' }}>
                Music
              </Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="#999999" />
          </TouchableOpacity>
          <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: "row", padding: '4%' }}>
            <View style={{ flexDirection: 'row', width: '60%', }}>
              <Feather name="activity" size={24} color="black" />
              <Text style={{ fontSize: 18, fontWeight: '600', color: "white", marginLeft: '3%' }}>
                Activity center
              </Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="#999999" />
          </TouchableOpacity>
          <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: "row", padding: '4%' }}>
            <View style={{ flexDirection: 'row', width: '60%', }}>
              <MaterialIcons name="content-paste" size={24} color="black" />
              <Text style={{ fontSize: 18, fontWeight: '600', color: "white", marginLeft: '3%' }}>
                Content perfrences
              </Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="#999999" />
          </TouchableOpacity>
          <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: "row", padding: '4%' }}>
            <View style={{ flexDirection: 'row', width: '60%', }}>
              <MaterialIcons name="ads-click" size={24} color="black" />
              <Text style={{ fontSize: 18, fontWeight: '600', color: "white", marginLeft: '3%' }}>
                Ads
              </Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="#999999" />
          </TouchableOpacity>

        </View>
      </View >


    </View >
  );
};
export default SetTingInfor;
const styles = StyleSheet.create({});
