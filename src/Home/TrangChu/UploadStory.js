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
  useWindowDimensions,
  KeyboardAvoidingView,
} from "react-native";
import { v4 as uuidv4 } from "uuid";
import Feather from "@expo/vector-icons/Feather";

import { AntDesign } from "@expo/vector-icons";

import { Ionicons } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";

import { FFmpegKit, FFmpegKitConfig } from "ffmpeg-kit-react-native";
import { useSelector, useDispatch } from "react-redux";
import path from "../../confige/config";
import { checkAndRefreshToken } from "../../confige/ComponencheckingToken";
const UploadStory = ({ navigation, route }) => {
  const dispath = useDispatch();
  const userCurent = useSelector((state) => state.auth.value);

  const { height, width } = useWindowDimensions();
  const [autoPlays, setAutoplay] = useState(true);
  const { fileselect, widthV, heightV, resizeMode, typefile, fileName } =
    route.params;
  console.log(fileselect, widthV, heightV, resizeMode, typefile, fileName);

  const [showModal, setShowModal] = useState(false);
  const [inputText, setInputText] = useState("");
  // Hàm mở/closed Modal khi nhấn vào nút "Text"
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const textRef = useRef(null);

  const [positionX, setPositionX] = useState(50);
  const [positionY, setPositionY] = useState(100);
  const [loading, setLoading] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, // Kích hoạt khi có hành động kéo
      onPanResponderMove: (event, gestureState) => {
        const { dx, dy } = gestureState;

        // Tính toán vị trí mới của X và Y nhưng giới hạn trong màn hình
        const newX = Math.max(-150, Math.min(positionX + dx, width - 0)); // Giới hạn X
        const newY = Math.max(0, Math.min(positionY + dy, height - 0)); // Giới hạn Y

        // Cập nhật vị trí mới cho text
        textRef.current.setNativeProps({
          style: { left: newX, top: newY },
        });
        console.log(newX, newY);
        setPositionX(newX); // Cập nhật X
        setPositionY(newY); // Cập nhật Y
      },
      onPanResponderRelease: () => {
        // Sau khi người dùng thả text, không cần cập nhật gì thêm ở đây
      },
    })
  ).current;

  const HanderUploadVideo = async () => {
    setLoading(true);
    const formData = new FormData();
    let datetime = new Date();
    let datePostTimstemp = await datetime.toISOString().slice(0, -5);
    console.log(typefile, fileName, "jasjdiasbbfhdsbchbdsh");
    formData.append("Height", heightV);
    formData.append("widthV", widthV);
    formData.append("datePost", datePostTimstemp);
    formData.append("positionX", positionX);
    formData.append("positionY", positionY);
    formData.append("textinLocation", inputText);
    formData.append("Story", {
      uri: fileselect,
      name: fileName,
      type: typefile,
    });
    formData.append("resizeMode", resizeMode);
    formData.append("userId", userCurent._id);

    // formData.append("nameMusic", dataUser.Hoten);
    try {
      console.log("nahe sbjdbisajk");
      const isChecked = await checkAndRefreshToken(dispath, userCurent);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        console.log("nahe sbjdbisaj2345678k");
        const { status, message, msg } = await axios.post(
          `${path}/uploadStory`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${isChecked.accessToken}`,
            },
          }
        );

        if (status == 200) {
          navigation.navigate("Home");
          setLoading(false);
          alert("sussecess");
        }
      }
    } catch (erro) {
      setLoading(false);
      console.log(erro + "-lỗi với upload video  ");
    } finally {
      setAutoplay(false);
      setLoading(false);
    }
  };
  const backOne = () => {
    navigation.goBack();
  };
  return (
    // <KeyboardAvoidingView
    //   style={{
    //     flex: 1,
    //   }}
    //   behavior={Platform.OS === "android" ? "height" : "padding"} // Android sử dụng "height"
    //   keyboardVerticalOffset={Platform.OS === "android" ? 100 : 0} // Điều chỉnh offset cho Android
    // >
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
          position: "relative",
        }}
      >
        <TouchableOpacity
          style={{ position: "absolute", top: 10, left: 20 }}
          onPress={backOne}
        >
          <FontAwesome name="remove" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 20,
            alignContent: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: 15,
              marginRight: 10,
            }}
          >
            Sound
          </Text>
          <FontAwesome name="music" size={20} color="white" />
        </TouchableOpacity>
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            right: 2,
            height: "40%",
            width: 50,
            top: "3%",
            flex: 1,

            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Ionicons name="settings" size={18} color="white" />
            <Text style={{ color: "white", fontSize: 8 }}>settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAutoplay(false);
              navigation.navigate("EditerVideo", {
                inputText,
                positionX,
                positionY,
                typefile,
                fileselect,
                widthV,
                heightV,
              });
            }}
            style={{
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <AntDesign name="edit" size={18} color="white" />
            <Text style={{ color: "white", fontSize: 8 }}>edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleModal}
            style={{
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Feather name="file-text" size={18} color="white" />
            <Text style={{ color: "white", fontSize: 8 }}>Text</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <MaterialCommunityIcons
              name="sticker-emoji"
              size={18}
              color="white"
            />
            <Text style={{ color: "white", fontSize: 8 }}>emoji</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <MaterialCommunityIcons
              name="kickstarter"
              size={18}
              color="white"
            />
            <Text style={{ color: "white", fontSize: 8 }}>starg</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Octicons name="repo-template" size={18} color="white" />
            <Text style={{ color: "white", fontSize: 8 }}>template</Text>
          </TouchableOpacity>
        </View>
        <Animated.Text
          ref={textRef}
          {...panResponder.panHandlers}
          style={{
            fontSize: 20,
            color: "white",
            padding: 10,
            fontWeight: "500",
            zIndex: 1,
            left: positionX,
            top: positionY,
          }}
        >
          {inputText}
        </Animated.Text>
        {typefile === "video/mp4" && (
          <Video
            source={{ uri: fileselect }}
            style={{
              width: "100%",
              height: "85%",
              marginBottom: "20%",
            }}
            useNativeControls
            resizeMode="cover"
            isLooping
            shouldPlay={autoPlays}
          />
        )}
        {typefile === "image/jpeg" && (
          <Image
            source={{ uri: fileselect }}
            style={{ width: "100%", height: "85%", marginBottom: "20%" }}
            resizeMode="cover"
          />
        )}
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            height: "10%",
            position: "absolute",
            bottom: 0,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              HanderUploadVideo();
            }}
            style={{
              width: "30%",
              backgroundColor: "blue",
              height: "50%",
              position: "absolute",
              borderRadius: 10,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>Add Story</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View
          style={{
            borderRadius: 10,
            flex: 1,

            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              position: "relative",
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 20,
                alignContent: "center",
              }}
            >
              <Ionicons name="color-palette-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 20,
                right: 50,
              }}
              onPress={() => toggleModal()}
            >
              <AntDesign name="checksquareo" size={24} color="white" />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "white",
                paddingHorizontal: "2%",
                borderRadius: 10,
                width: "80%",
                height: "5%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextInput
                style={{
                  width: "100%",
                  height: "100%",
                }}
                placeholder="Enter your text"
                value={inputText}
                onChangeText={(text) => setInputText(text)}
                multiline={true}
                // placeholderTextColor={"ma"}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Spinner
        visible={loading}
        textContent={"Đang tải..."}
        textStyle={{ color: "#FFF" }}
      />
    </View>
    // </KeyboardAvoidingView>
  );
};
export default UploadStory;
const styles = StyleSheet.create({});
