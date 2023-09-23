import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Form,
  Button,
  ScrollView,
  ImageBackground,
  DatePickerAndroid,
  Modal,
  Keyboard,
  TouchableWithoutFeedback, KeyboardAvoidingView,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { set } from "lodash";
const InforUser = ({ navigation }) => {
  const back = () => {
    navigation.navigate("Login");
  };
  //cac thanh phan state của textinpur
  const [phone, setPhone] = useState();
  const [Name, setName] = useState();
  const [Birth, setBirth] = useState();
  const [gender, setGender] = useState();
  const [avatar, setAvatar] = useState();
  const handleGenderChange = (value) => {
    setGender(value);
    if (value === "male") {
      setAvatar(
        "https://i.pinimg.com/originals/8b/f5/68/8bf5689456b68cd8af836c943c3754f2.png"
      );
    } else if (value === "female") {
      setAvatar(
        "https://www.ldg.com.vn/media/uploads/uploads/21204723-hinh-anh-gai-xinh-2.jpg"
      );
    }
  };
  // thực hiện chọn với ngày tháng nam sinh
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const [selectedDate, setSelectedDate] = useState("");
  const handleConfirm = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần +1
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    setSelectedDate(formattedDate);
    setBirth(formattedDate)
    hideDatePicker();
  };
  // chon nam hay nữ với ảnh đại đien
  const chonGender = () => {};
  // bắt đầu thực hiện gữi các thông tin lần 1 tới trang tiếp theo
  const data = [phone, Name, Birth, gender, avatar];
  const handpressNext = () => {
    if (
      phone == null ||
      Name == null ||
      Birth == null ||
      gender == null ||
      avatar == null
    ) {
      alert("vui lòng nhập đủ thông tin");
    } else {

      console.log(data)
      navigation.navigate("Dangky", data);
      setAvatar("");
      setBirth("");
      setGender("");
      setPhone("");
      setName("");
      setSelectedDate('')
    }
  };

  return (
    
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/originals/90/c7/1b/90c71b954a7e0a34bf0c0e2b558d5171.jpg",
      }}
      style={{
        flex: 1,
        resizeMode: "cover",
      }}
    >
      <View
        style={{
          width: "100%",
          marginLeft: 20,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={back}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={{ fontSize: 20 }}>Back</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            color: "white",
            fontWeight: "800",
            opacity: 0.7,
            marginTop: 30,
          }}
        >
          Thông Tin Cá Nhân
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          flexDirection: "column",
          height: "60%",
          justifyContent: "space-around",
        }}
      >
        <TextInput
          style={{
            width: "80%",
            height: "10%",
            backgroundColor: "white",
            paddingHorizontal: 14,
            borderRadius: 20,
          }}
          value={Name}
          onChangeText={setName}
          placeholder="Họ và tên"
        ></TextInput>
        <TextInput
          style={{
            width: "80%",
            height: "10%",
            backgroundColor: "white",
            paddingHorizontal: 14,
            borderRadius: 20,
          }}
          placeholder="nhập số phone"
          value={phone}
          onChangeText={setPhone}
        ></TextInput>
        <View
          style={{
            width: "80%",
            height: "13%",
            backgroundColor: "white",
            paddingHorizontal: 14,
            borderRadius: 20,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "black",
            }}
          >
            {" "}
            Chọn giới tính: {gender}
          </Text>
          <RadioButton.Group onValueChange={handleGenderChange} value={gender}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton value="male" />
              <Text style={{ fontSize: 18, color: "red" }}>Male</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton value="female" />
              <Text style={{ fontSize: 18, color: "red" }}>Female</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View
          style={{
            width: "80%",
            height: "10%",
            backgroundColor: "white",
            paddingHorizontal: 14,
            borderRadius: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ alignItems: "center", fontSize: 20 }}>
            {selectedDate}
          </Text>
          <TouchableOpacity
            onPress={showDatePicker}
            style={{
              justifyContent: "center",
              backgroundColor: "pink",
              width: "20%",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Text>Lich</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        <TouchableOpacity
          onPress={handpressNext}
          style={{
            width: "20%",
            height: "10%",
            backgroundColor: "blue",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Tiếp</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: 54,
            height: 54,
            borderRadius: 40,
            backgroundColor: "pink",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 5,
          }}
        >
          <FontAwesome5 name="facebook-f" size={34} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 54,
            height: 54,
            borderRadius: 40,
            backgroundColor: "pink",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 5,
          }}
        >
          <AntDesign name="google" size={34} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 54,
            height: 54,
            borderRadius: 40,
            backgroundColor: "pink",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 5,
          }}
        >
          <AntDesign name="twitter" size={34} color="black" />
        </TouchableOpacity>
        </View>
        </KeyboardAwareScrollView>
    </ImageBackground>
  );
};
export default InforUser;
const styles = StyleSheet.create({});
