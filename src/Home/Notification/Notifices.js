import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  PermissionsAndroid,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Style.js";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { firestore } from "../../../Confige.js";
import { login } from "../../Redex/Reducer/auth.slice.js";
import { checkingToken } from "../../confige/CheckingToken.js";
import { useDispatch, useSelector } from "react-redux";
import * as Notifications from "expo-notifications";

const Notifices = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const getNotification = async () => {
    console.log("thực hiện hành vi hiển thị thông báo ");
    try {
      const isChecked = await checkingToken.checking(userCurent);
      // console.log(userCurent.accessToken);
      // console.log(isChecked, "gias tri sau checked");
      if (typeof isChecked === "object" && isChecked !== null) {
        dispath(login(isChecked));
        const { data } = await axios.get(`${path}/getnotification`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
          },
        });
      }
    } catch (error) {
      console.log(error, "select thông báo");
    }
  };
  // useEffect(() => {
  //   getNotification();
  // }, []);
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View
        style={{
          height: "5%",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}> Notification</Text>
        <TouchableOpacity>
          <Feather name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{ width: width, height: 1, backgroundColor: "black" }}
      ></View>
    </View>
  );
};
export default Notifices;
