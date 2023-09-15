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
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const InforUser = ({ navigation }) => {
  const back = () => {
    navigation.navigate("Login");
  };
  // set chọn giơi tinhs

  const [gender, setGender] = useState("");

  const handleGenderChange = (value) => {
    setGender(value);
  };
  // thực hiện chọn với ngày tháng nam sinh
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date.toDateString());
    hideDatePicker();
  };
  const handpressNext = () => {
         navigation.navigate('Dangky')
}
  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/originals/90/c7/1b/90c71b954a7e0a34bf0c0e2b558d5171.jpg",
      }}
      style={{
        flex: 1, resizeMode: "cover",
       }}
    >
      <View
        style={{
          width: "100%",
          marginLeft: 20,
        }}
      >
        <TouchableOpacity style={{ flexDirection: "row" }} onPress={back}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={{}}>Back</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            color: "white",
            fontWeight: "800",
            opacity: 0.7,
          }}
        >
          Thông Tin Cá Nhân
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginTop: 20,
          flexDirection: "column",
          height: '70%',
          justifyContent:'space-around',
          
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
          placeholder="Nhập Họ"
        ></TextInput>
        <TextInput
          style={{
            width: "80%",
            height: "10%",
            backgroundColor: "white",
            paddingHorizontal: 14,
            borderRadius: 20,
          }}
          placeholder="Nhập tên"
        ></TextInput>
        <View style={{
          width: "80%",
          height: "13%",
          backgroundColor: "white",
          paddingHorizontal: 14,
          borderRadius: 20,
          alignItems: 'center',
          flexDirection:'row',
        }}>
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
            <Text style={{fontSize:18,color:'red'}}>Male</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value="female" />
            <Text style={{fontSize:18,color:'red'}}>Female</Text>
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
            justifyContent:'space-around',
          }}
        >
          <Text style={{alignItems:'center',fontSize:20}}>{selectedDate}</Text>
          <Button title="lịch" onPress={showDatePicker} />
      
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <TouchableOpacity
          onPress={ handpressNext}
          style={{
            width: "20%",
            height: "10%",
            backgroundColor: "blue",
            borderRadius: 10,
          justifyContent: 'center',
            alignItems:'center',
          }}>
            <Text style={{ fontSize:20,color:'white'}} >Tiếp</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
export default InforUser;
const styles = StyleSheet.create({});
