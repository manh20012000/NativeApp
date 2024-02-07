import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Item,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Modal,
    BackHandler,
    Alert,
    PermissionsAndroid,
    ImageBackground,
    ActivityIndicator,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Button,
    Keyboard,
  } from "react-native";
  import { React, useState, useEffect, useRef, memo } from "react";
  import SelectDropdown from "react-native-select-dropdown";
  import { FontAwesome, EvilIcons, AntDesign } from "@expo/vector-icons";
  import { Ionicons } from "@expo/vector-icons";
  import { Entypo } from "@expo/vector-icons";
  import { BottomSheet } from "react-native-btr";
  import { FontAwesome5 } from "@expo/vector-icons";
  import * as ImagePicker from "expo-image-picker";
  import {UpdateAuth} from "../../Redex/auth.slice";
import { useSelector, useDispatch } from 'react-redux'
  import path from "../../config";
  import axios from "axios";
const EditProfile = ({ navigation, route }) => {
    

    let [user, setUser] = useState(useSelector((state) => state.auth.value))
    const [selectedImages, setSelectedImages] = useState(user.avatar);
    const [displayName, setDisplayName] = useState(user.DisplayName);
    const [address, setAddress] = useState(user.address);
    const [school, setSchool] = useState(user.school);
    const [occupation, setOccupation] = useState(user.occupation);
    const [relationship, setRelationship] = useState(user.relationship);
   
    const pickImages = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: false,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });
        delete result.cancelled;
      if (!result.canceled) {
        setSelectedImages(result.assets[0].uri)
          
      }
    };

    const updateProfile = async (iduser, avatar) => {
      const formData = new FormData();
      const randomInt = Math.floor(Math.random() * 10001);
        formData.append("iduser",iduser);
        formData.append('Avatar', {
          uri: avatar,
          type: 'image/jpeg',
          name:`${randomInt}image_.jpeg`, // Tên tệp
        });
        try {
          const { data } = await axios.post(
          `https://nativeapp-vwvi.onrender.com/UpadateAvatar`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          if (data.status == 200) {
            useDispatch(UpdateAuth(data.data))
            navigation.navigate("Infor");
            alert(data.mess);
          }
        } catch (err) {
          console.log(err)
        }
        
      };
    return (
      <ScrollView style={styles.container}>
        <View style={styles.backbr}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Infor")}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons name="arrow-back" size={26} color="white" />
            <Text style={{ color: "white" }}> Edit Profile</Text>
          </TouchableOpacity>
                <TouchableOpacity
            onPress={() => {
              updateProfile(user._id,selectedImages)
                     }}
                    style={styles.save}>
            <Text  >Save</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.thanhngang}></View>
        <View style={styles.imguser}>
          <Image style={styles.imges} source={{ uri: selectedImages }}></Image>
          <TouchableOpacity onPress={pickImages} style={styles.btnEdit}>
            <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.thanhngang}></View>
  
        <View style={styles.thongtin}>
        <Text style={styles.txt}>Ngày sinh: {user.BirthOfDate}</Text>
        <Text style={styles.txt}>
          Giới tính: {user.Gender == 1 ? "Nam" : "Nữ"}
        </Text>
        <Text style={styles.txt}>Email: {user.UserName}</Text>
      </View>
      <View style={styles.thanhngang}></View>
     
        <TextInput
          placeholder="Tên hiển thị"
          style={styles.txt1}
          placeholderTextColor="black"
          multiline
          underlineColorAndroid="transparent"
          value={displayName}
          onChangeText={(text) => setDisplayName(text)}
        />
        <TextInput
          placeholder="Địa chỉ"
          style={styles.txt1}
          placeholderTextColor="black"
          multiline
          underlineColorAndroid="transparent"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <TextInput
          placeholder="Trường học"
          style={styles.txt1}
          placeholderTextColor="black"
          multiline
          underlineColorAndroid="transparent"
          value={school}
          onChangeText={(text) => setSchool(text)}
        />
        <TextInput
          placeholder="Công việc"
          style={styles.txt1}
          placeholderTextColor="black"
          multiline
          underlineColorAndroid="transparent"
          value={occupation}
          onChangeText={(text) => setOccupation(text)}
        />
        <TextInput
          placeholder="Hôn nhân"
          style={styles.txt1}
          placeholderTextColor="black"
          multiline
          underlineColorAndroid="transparent"
          value={relationship}
          onChangeText={(text) => setRelationship(text)}
        />
      </ScrollView>
    );
  };
  export default EditProfile;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#808080",
    },
    backbr: {
      width: "100%",
      height: 50,
      justifyContent: "space-between",
      paddingHorizontal: 15,
      flexDirection: "row",
      alignItems: "center",
    },
    save: {
      width: 60,
      height: 35,
      backgroundColor: "green",
      justifyContent: "center",
      alignItems: "center",
    },
    imguser: {
      width: "100%",
      height: 220,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    imges: {
      width: "50%",
      height: "85%",
      borderRadius: 100,
    },
    btnEdit: {
      width: 60,
      height: 40,
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      right: 0,
      top: 3,
    },
    thongtin: {
      padding: 10,
  
      position: "relative",
    },
    txt: {
      fontSize: 20,
      color: "black",
      fontWeight: "300",
    },
    thanhngang: {
      width: "100%",
      height: 4,
      backgroundColor: "black",
      marginVertical: 10,
    },
    txtx: {
      width: "100%",
    },
    txt1: {
      width: "95%",
      height: 45,
      borderRadius: 10,
      backgroundColor: "#D3D3D3",
      padding: 4,
      color: "black",
      marginHorizontal: 10,
      marginTop: 10,
    },
  });