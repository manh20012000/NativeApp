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
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import NewRecode from "./NewRecode";
import { Camera, CameraType } from "expo-camera/legacy";
import Swiper from "react-native-swiper";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import axios from "axios";
import path from "../confige/config";
import Spinner from "react-native-loading-spinner-overlay";
import * as FileSystem from "expo-file-system";
import { useSelector, useDispatch } from "react-redux";
import { FFmpegKit, FFmpegKitConfig } from "ffmpeg-kit-react-native";
import { checkAndRefreshToken } from "../confige/ComponencheckingToken";
const RecodViedeo = ({ navigation }) => {
  const dispath = useDispatch();
  const { height, width } = useWindowDimensions();
  const [autoPlays, setAutoplay] = useState(false);
  const [trangThai, setTrangThai] = useState(1);
  const [thanhBar, setThanhBar] = useState(1);
  const [image, setImage] = useState(null);
  const [resizeMode, setResizeMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [fileselect, setFileselect] = useState(null);
  const [widthV, setWidthV] = useState(0);
  const [heightV, setHeight] = useState(0);
  const [typefile, setTypefile] = useState("");
  const count = useSelector((state) => state.auth.value);
  const [dataUser, setData] = useState(count);
  const pickImages = async () => {
    setTrangThai(2);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      if (result.assets[0].type === "image") {
        setSelectedImage(result.assets[0].uri);
        setFileselect(result.assets[0].uri);
        setTrangThai(2);
        setTypefile("image");
      } else if (result.assets[0].type === "video") {
        if (result.assets[0].height < 700) {
          setResizeMode(true);
        }
        // console.log(result.assets, "hahah");
        setFileselect(result.assets[0].uri);
        setHeight(result.assets[0].height);
        setWidthV(result.assets[0].width);
        console.log(result.assets[0].uri);
        setSelectedVideo(result.assets[0].uri);
        setAutoplay(true);
        setTrangThai(3);
        setTypefile("video");
      }
    }
  };
  // setCamera
  const cameraRef = useRef();
  const [startCamera, setStartCamera] = useState(true);
  const StartCamera = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission for media access needed");
    }
  };
  const [type, setType] = useState(CameraType.front);
  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };
  const backOne = () => {
    setTrangThai(1);
    StartCamera;
  };
  // take phôto
  // modal option
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
  const uploadToCloudinary = async (videoUri) => {
    try {
      const randomUUID = uuidv4();

      const data = new FormData();
      data.append("file", {
        uri: videoUri,
        type: "video/mp4",
        name: `${randomUUID}.mp4`,
      });
      data.append("upload_preset", "uploadvideotiktok");
      data.append(
        "transformation",
        JSON.stringify([
          {
            overlay: {
              font_family: "Arial",
              font_size: 24,
              text: "Hello World",
            },
            gravity: "south",
            x: 40,
            y: 70,
          },
        ])
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dzdf3rcbr/video/upload`,
        {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Cloudinary error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Upload successful:", result.secure_url);
      return result.secure_url;
    } catch (error) {
      console.error("Error uploading video to Cloudinary: ", error);
      throw error;
    }
  };
  const ContinuteDegin = async () => {
    setAutoplay(false);
    const randomUUID = uuidv4();
    try {
      // Đường dẫn file video hiện có
      const videoUri = `${FileSystem.documentDirectory}${randomUUID}.mp4`;

      // Gọi hàm tải video lên Cloudinary và chỉnh sửa video
      // const processedVideoUrl = await uploadToCloudinary(fileselect);

      // Chuyển hướng đến màn hình khác với đường dẫn video đã xử lý
      // console.log(fileselect, "chuyẻn sang màn kia ");
      navigation.navigate("PostVideo", {
        fileselect: fileselect,
        widthV: widthV, // Kích thước tùy chỉnh
        heightV: heightV, // Kích thước tùy chỉnh
        resizeMode: resizeMode,
        typefile: typefile,
      });
    } catch (error) {
      console.error("Error processing video: ", error);
    }
  };
  const HanderUploadVideo = async () => {
    const formData = new FormData();
    let datetime = new Date();
    let datePostTimstemp = await datetime.toISOString().slice(0, -5);
    setLoading(true);

    formData.append("Height", heightV);
    formData.append("widthV", widthV);
    formData.append("datePost", datePostTimstemp);
    formData.append("Story", {
      uri: fileselect,
      name: `Story${datePostTimstemp}.mp4`,
      type: "video/mp4",
    });
    formData.append("resizeMode", resizeMode);
    formData.append("userId", dataUser._id);
    formData.append("textinLocation", inputText);

    // formData.append("nameMusic", dataUser.Hoten);
    try {
      const isChecked = await checkAndRefreshToken(dispath, dataUser);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        const { status, message, msg } = await axios.post(
          `${path}/uploadStory`,
          //`${path}/uploadVideo`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setVconten(null);
        setPrivacy("public");
        // setLocated(null);

        console.log(fileselect);
        if (status == 200) {
          navigation.navigate("Home");
          setLoading(false);
          alert("sussecess");
        }
      }
    } catch (erro) {
      setLoading(false);
      console.log(erro + "->>catch lỗi ");
    } finally {
      setAutoplay(false);
      setFileselect(null);
      setLoading(false);
    }
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
      {trangThai == 1 && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#333333",

            position: "relative",
          }}
        >
          <View
            style={{
              width: "100%",
              position: "absolute",
              top: 0,
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={toggleCameraType} style={{}}>
              <AntDesign name="filter" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCameraType}>
              <AntDesign name="sync" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCameraType} style={{}}>
              <Entypo name="flashlight" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCameraType} style={{}}>
              <Entypo name="flashlight" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCameraType} style={{}}>
              <Ionicons name="people" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {trangThai == 1 && startCamera && (
            <Camera
              type={type}
              style={{ flex: 0.85, width: "100%" }}
              ref={(cameraRef) => {
                camera = cameraRef;
              }}
            ></Camera>
          )}
          {trangThai == 1 && (
            <View
              style={{
                justifyContent: "center",
                width: "100%",
                height: "20%",
                backgroundColor: "black",
                bottom: 0,
                position: "absolute",
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 0.33,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity style={{ justifyContent: "space-between" }}>
                    <AntDesign name="frown" size={26} color="white" />
                    <Text
                      style={{ fontSize: 13, color: "white", marginTop: 3 }}
                    >
                      Fitter
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 0.33,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={StartCamera}
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        backgroundColor: "white",
                        borderRadius: 80,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          width: 70,
                          height: 70,
                          backgroundColor: "black",
                          borderRadius: 70,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            width: 60,
                            height: 60,
                            backgroundColor: "white",
                            borderRadius: 60,
                          }}
                        ></View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 0.33,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={pickImages}
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <AntDesign name="frown" size={26} color="white" />
                    <Text
                      style={{ fontSize: 13, color: "white", marginTop: 3 }}
                    >
                      Thư viện
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      )}
      {trangThai == 2 && (
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

          <Image
            source={{ uri: selectedImage }}
            style={{ width: 200, height: 200 }}
          />
        </View>
      )}
      {trangThai == 3 && (
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
            {/* <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Ionicons name="ios-color-filter" size={18} color="white" />
              <Text style={{ color: "white", fontSize: 8 }}>filter</Text>
            </TouchableOpacity> */}
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
          <Video
            source={{ uri: selectedVideo }}
            style={{ width: "100%", height: "85%", marginBottom: "20%" }}
            useNativeControls
            resizeMode="cover"
            isLooping
            shouldPlay={autoPlays}
          />
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              height: "10%",
              alignItems: "center",
              justifyContent: "space-around",
              position: "absolute",
              bottom: 0,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                HanderUploadVideo();
              }}
              style={{
                width: "40%",
                backgroundColor: "white",
                height: "60%",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "black", fontWeight: "700" }}>
                Add Story
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={ContinuteDegin}
              style={{
                width: "40%",
                backgroundColor: "red",
                height: "60%",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
export default RecodViedeo;
const styles = StyleSheet.create({});
