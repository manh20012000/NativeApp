import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./StyleLogin";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch } from "react-redux";
import { login } from "../Redex/Reducer/auth.slice";
import path from "../confige/config";
import axios from "axios";
import { HandlerNotification } from "../confige/Util_handlerNotification";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Settings, LoginButton } from "react-native-fbsdk-next";
// } from "@react-native-google-signin/google-signin";
// Settings.setAppID("7646286505430226");

const Login = ({ navigation }) => {
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       "Y798897406401-rdt2dj6q51p79evi6urebjgeettrgv8l.apps.googleusercontent.com", // Thay bằng client ID của bạn
  //   });
  // }, []);
  const [emailphone, setName] = useState("");
  const [matkhau, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [hienthi, setHienthi] = useState(true);
  const dispath = useDispatch();
  const hanlderlogin = async () => {
    try {
      if (emailphone == "" || matkhau == "") {
        alert("vui lòng nhập tài khoản hoặc mật khẩu ");
        return;
      }
      setLoading(true);
      const { data } = await axios.post(
        `${path}/login`,
        //  "https://nativeapp-vwvi.onrender.com/login",
        { taikhoan: emailphone, matkhau: matkhau }
      );
      if (data.status == 200) {
        const userData = data.data;

        const userDataString = JSON.stringify(userData);
        await AsyncStorage.setItem("userToken", userDataString);
        await HandlerNotification.checkNotificationPermission(userData);
        dispath(login(userData));
        await AsyncStorage.setItem(
          "accessToken",
          JSON.stringify(userData.accessToken)
        );
        await AsyncStorage.setItem(
          "refreshToken",
          JSON.stringify(userData.refreshToken)
        );
        setLoading(false);
        navigation.navigate("BootonGate", userData);
        setPass("");
        setName("");
      } else {
        alert("tài khoản hoặc mật khẩu không chính xác");
      }
    } catch (eror) {
      setLoading(false);
      if (eror == 403) {
        alert("tai khoan mât khẩu không chình xác");
      } else {
        console.log(eror + "tai khoan mât khẩu không chình xác");
      }
    }
  };
  const [eye, setEys] = useState(false);
  const anhien = () => {
    setHienthi(!hienthi);
  };

  const sigin = () => {
    navigation.navigate("InforUser");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.font}>Đăng Nhập</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.bodycon}>
          <Text tyle={styles.Txt}>UserName</Text>
          <View style={styles.IuserName}>
            <FontAwesome name="user" size={24} color="black" />
            <TextInput
              placeholder="Enter email or phone"
              style={styles.textinput}
              value={emailphone}
              onChangeText={(emailphone) => setName(emailphone)}
              keyboardType="email-address"
            />
          </View>
          <Text tyle={styles.Txt}>PassWord</Text>
          <View style={[styles.IPass, styles.IuserName]}>
            <Ionicons name="key-sharp" size={24} color="black" />
            <TextInput
              placeholder="Enter password"
              style={styles.textinput}
              secureTextEntry={hienthi}
              titleAler="vui long nhap thong tin chnh sac"
              value={matkhau}
              onChangeText={(matkhau) => {
                setPass(matkhau);
                if (matkhau != "") {
                  setEys(true);
                } else {
                  setEys(false);
                }
              }}
            />
            {eye == true && (
              <TouchableOpacity onPress={anhien}>
                <Ionicons
                  name={hienthi ? "eye-off" : "eye"}
                  size={30}
                  color="black"
                  style={styles.eye}
                />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              padding: 5,
            }}
          >
            <TouchableOpacity style={styles.foget}>
              <Text style={{ fontSize: 15 }}>Fot paswwod?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={sigin}>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>Register</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={hanlderlogin}>
            <LinearGradient
              colors={["#faf", "#3b5998", "#192f6a"]}
              style={styles.linagradine}
            >
              <Text style={styles.btnTxt}>Login</Text>
            </LinearGradient>
            <Spinner
              visible={loading}
              textContent={"Đangs tải..."}
              textStyle={{ color: "#FFF" }}
            />
          </TouchableOpacity>
          <View style={styles.ViewIcon}>
            <Text style={styles.labelwith}>Login With</Text>
            <TouchableOpacity style={styles.icon}>
              <FontAwesome5 name="facebook-f" size={34} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <AntDesign name="google" size={34} color="red" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <AntDesign name="twitter" size={34} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.flooter}></View>
    </View>
  );
};
export default Login;
