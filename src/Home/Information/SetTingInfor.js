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
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { HandlerNotification } from "../../confige/Util_handlerNotification.js";
import { useSocket } from "../../socket.js";
import { logout } from "../../Redex/Reducer/auth.slice.js";
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
        <TouchableOpacity>
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
    </View>
  );
};
export default SetTingInfor;
const styles = StyleSheet.create({});
