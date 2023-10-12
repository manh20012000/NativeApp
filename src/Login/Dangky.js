import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Form,
  Button,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import styles from "./StyleSigin.js";
import { TextInput } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { RadioButton } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
const Dangky = ({ navigation, route }) => {
  // console.log(route.params[0])
  // lấy gtri cua cac o text;

  const [email, setMail] = useState();
  const [taikhoan, setName] = useState();
  const [matkhau, setPass] = useState();
  const [passC, setPassC] = useState();
  const Sigin = async () => {
    if (
      (email == null || taikhoan == null || matkhau == null || passC == null) &&
      matkhau != passC
    ) {
      alert("vui lòng kiểm tra nhập thông tin");
    } else if (matkhau === passC) {
      try {
        const data = await axios.post("https://nativeapp-vwvi.onrender.com/sigin", {
          email: email,
          phone: route.params[0],
          hoten: route.params[1],
          birth: route.params[2],
          gender: route.params[3],
          taikhoan: taikhoan,
          avatar: route.params[4],
          matkhau: matkhau,
        });
        console.log(data);
        if (data.status === 200) {
          setTimeout(() => {
            setLoading(false);
            navigation.navigate("Login");
            setMail(""), setName("");
            setPass(""), setPassC("");
            //       // Sau đó, điều hướng đến trang Home
          }, 2000);
        } else {
          alert("dang ky that bai");
        }
      } catch (error) {
        console.log(error + "   that bai");
      }
    } else {
      alert("mật khẩu xác nhận ko chính xác");
    }
  };

  // tao check hien thi với radio button
  const [text, setxt] = useState("ẩn");
  const [hienthi, setHienthi] = useState(true);
  const anhien = () => {
    setHienthi(!hienthi);
    // text ?'hiện':'ẩn';
    if (text === "ẩn") {
      setxt("hiện");
    } else {
      setxt("ẩn");
    }
  };
  // (value) => setChecked(value)
  //back
  const back = () => {
    navigation.navigate("InforUser");
  };
  const [isEnabled, setIsEnabled] = React.useState(true);
  // taoj   const [loading, setLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    >
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/originals/90/c7/1b/90c71b954a7e0a34bf0c0e2b558d5171.jpg",
      }}
      style={{
        resizeMode: "cover",
        height:'100%'
      }}
    >
      <TouchableOpacity
        style={{
          width: 60,
          height: 40,
          borderRadius: 10,
          margin: 10,
          justifyContent: "center",
        }}
        onPress={back}
      >
        <Text style={{ fontSize: 40, textAlign: "center" }}> {"<"} </Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.textSig}>Sigin</Text>
      </View>

      <View style={styles.body}>
        <TextInput
          style={[styles.textinput, styles.txt1]}
          label="Your@gmail.com"
          disabled={!isEnabled}
          mode="outlined"
          value={email}
          keyboardType="email-address"
          onChangeText={setMail}
        ></TextInput>

        <TextInput
          style={[styles.textinput, styles.txt1]}
          label="Nhập tài khoản"
          disabled={!isEnabled}
          mode="outlined"
          value={taikhoan}
          onChangeText={setName}
        ></TextInput>
        <TextInput
          style={[styles.textinput, styles.txt1]}
          label="Nhập mật khẩu"
          disabled={!isEnabled}
          mode="outlined"
          value={matkhau}
          onChangeText={setPass}
          secureTextEntry={hienthi}
        ></TextInput>
        <TextInput
          style={[styles.textinput, styles.txt1]}
          label="conform mật khẩu"
          disabled={!isEnabled}
          mode="outlined"
          value={passC}
          secureTextEntry={hienthi}
          onChangeText={setPassC}
        ></TextInput>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            marginTop: 20,
            width: "30%",
            opacity: 0.8,
          }}
        >
          <RadioButton
            value=" option1"
            // status={checked === 'option1' ? 'checked' : 'unchecked'}
            testID="option1RadioButton"
            // onValueChange={radiotxt()}
            onPress={anhien}
            uncheckedColor="gray"
            disabled={false}
            color="blue"
          />
          <Text style={{ fontSize: 20, color: "black" }}>{text}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={Sigin}>
          <LinearGradient
            colors={["#faf", "#3b5998", "#192f6a"]}
            style={styles.linagradine}
          >
            <Text style={styles.btnTxt}>Sign</Text>
          </LinearGradient>
          <Spinner
            visible={loading}
            textContent={"Đangs tải..."}
            textStyle={{ color: "#FFF" }}
          />
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </ScrollView>
  );
};
export default Dangky;
