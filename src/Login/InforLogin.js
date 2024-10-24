import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const InforLogin = ({ navigation }) => {
  //cac thanh phan state của textinpur
  const [phone, setPhone] = useState();
  const [Name, setName] = useState();
  const [Birth, setBirth] = useState();
  const [gender, setGender] = useState();
  const [avatar, setAvatar] = useState();
  const back = () => {
    navigation.navigate("Login");
  };
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
    setBirth(formattedDate);
    hideDatePicker();
  };
  // chon nam hay nữ với ảnh đại đien
  // bắt đầu thực hiện gữi các thông tin lần 1 tới trang tiếp theo
  const data = [phone, Name, Birth, gender, avatar];
  const handpressNext = () => {
    if (
      phone === null ||
      Name === null ||
      Birth === null ||
      gender === null ||
      avatar === null
    ) {
      alert("vui lòng nhập đủ thông tin");
    } else {
      console.log(data + "daadta");
      navigation.navigate("Dangky", data);
      setAvatar("");
      setBirth("");
      setGender("");
      setPhone("");
      setName("");
      setSelectedDate("");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground
        source={{
          uri: "https://i.pinimg.com/originals/90/c7/1b/90c71b954a7e0a34bf0c0e2b558d5171.jpg",
        }}
        style={{
          resizeMode: "cover",
          height: "100%",
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
        <View
          style={{
            alignItems: "center",
            width: "100%",
            marginVertical: 20,
            flexDirection: "column",
            justifyContent: "space-around",
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
            justifyContent: "space-around",

            height: 500,
          }}
        >
          <TextInput
            style={{
              width: "80%",
              height: 60,
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
              height: 60,
              backgroundColor: "white",
              paddingHorizontal: 14,
              borderRadius: 20,
            }}
            placeholder="nhập số phone"
            value={phone}
            keyboardType="number-pad"
            onChangeText={setPhone}
          ></TextInput>
          <View
            style={{
              width: "80%",
              height: 80,
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
              Chọn giới tính
            </Text>
            <RadioButton.Group
              onValueChange={handleGenderChange}
              value={gender}
            >
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
              height: 60,
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
                height: 40,
              }}
            >
              <Text>Lich</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(e) => {
                console.log(e);
                handleConfirm(e);
              }}
              onCancel={hideDatePicker}
            />
          </View>

          <TouchableOpacity
            onPress={handpressNext}
            style={{
              width: "40%",
              height: 50,
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
      </ImageBackground>
    </ScrollView>
  );
};
export default InforLogin;
const styles = StyleSheet.create({});
