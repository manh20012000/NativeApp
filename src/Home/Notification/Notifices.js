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

import * as Notifications from "expo-notifications";

const Notifices = ({ navigation }) => {
  const { width, height } = useWindowDimensions();

  // const getToken = async () => {
  //   const firebaseToken = await firebase.messaging().getToken();
  //   console.log(firebaseToken)
  // }
  // useEffect(() => {
  //   getToken();
  // },[])
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
