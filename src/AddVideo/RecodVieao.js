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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import NewRecode from "./NewRecode";
import { Camera, CameraType } from "expo-camera";
import Swiper from "react-native-swiper";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
const RecodViedeo = ({ navigation}) => {
  const [autoPlays, setAutoplay] = useState(false);
  const [trangThai, setTrangThai] = useState(1);
  const [thanhBar, setThanhBar] = useState(1);
  const [image, setImage] = useState(null);
  const [resizeMode, setResizeMode] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [fileselect, setFileselect] = useState(null);
  const [widthV, setWidthV] = useState(0)
  const [heightV,setHeight]=useState(0)
  const [typefile, setTypefile] = useState('');
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
        setFileselect(result.assets[0].uri)
        setTrangThai(2);
        setTypefile("image")
      } else if (result.assets[0].type === "video") {
        if (result.assets[0].height<600) {
          setResizeMode(true)
        }
        setFileselect(result.assets[0].uri)
        setHeight(result.assets[0].height)
        setWidthV(result.assets[0].width)
        console.log(result.assets[0].uri)
        setSelectedVideo(result.assets[0].uri);
        setAutoplay(true)
        setTrangThai(3);
        setTypefile("video")
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
  
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const { dx, dy } = gestureState;
      
        textRef.current.setNativeProps({
          style: { transform: [{ translateX: dx }, { translateY: dy }] },
        });
      },onPanResponderMove: (event, gestureState) => {
        const { dx, dy } = gestureState;
        textRef.current.setNativeProps({
          style: { transform: [{ translateX: dx }, { translateY: dy }] },
        });
        console.log(dy)
        setPositionX(dx);
        setPositionY(dy);
      },
    })
  ).current;

  const ContinuteDegin = async () => {

    setAutoplay(false)
    navigation.navigate("PostVideo", {inputText,positionX,positionY,typefile,fileselect,widthV,heightV,resizeMode});
    }
  return (
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
              style={{ flex: 0.7, width: "100%" }}
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
            style={{ position: "absolute", top: 20, alignContent: "center",flexDirection:'row' }}
          >
            <Text style={{ color: "white", fontWeight: "700", fontSize: 15,marginRight:10 }}>
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
                 setAutoplay(false)
            navigation.navigate("EditerVideo", {inputText,positionX,positionY,typefile,fileselect,widthV,heightV})
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
              <Ionicons name="ios-text" size={18} color="white" />
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
              <Ionicons name="ios-color-filter" size={18} color="white" />
              <Text style={{ color: "white", fontSize: 8 }}>filter</Text>
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
          <Text
            ref={textRef}
            {...panResponder.panHandlers}
            style={{ fontSize: 20,color:'white', padding: 10,fontWeight:'500' }}
          >
            {inputText}
          </Text>
          <Video
            source={{ uri: selectedVideo }}
            style={{ width: "100%", height: "60%" }}
            useNativeControls
            resizeMode="cover"
            isLooping
            shouldPlay={autoPlays}
          />
          <View style={{ flexDirection:'row',width:'90%',height:'10%',alignItems:'center',justifyContent:'space-around',position:'absolute',bottom:10}}>
            <TouchableOpacity
             onPress={() => {
              setAutoplay(false)
                navigation.navigate("EditerVideo", {inputText, positionX, positionY, typefile, fileselect, widthV, heightV})
             
       }}
              style={{ width:'40%',backgroundColor:'white',height:'60%',alignItems:'center',justifyContent:'center',borderRadius:10}}
            >
              <Text style={{ color: 'black',fontWeight:'700'}}>
              Chỉnh sửa
               </Text>
            </TouchableOpacity>
            <TouchableOpacity
               onPress={ContinuteDegin}
              style={{ width:'40%',backgroundColor:'red',height:'60%',alignItems:'center',justifyContent:'center',borderRadius:10}}
            >
              <Text style={{ color: 'white',fontWeight:'700'}}>
               Next
               </Text>
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
                padding: 20,
                borderRadius: 10,
                width: "80%",
              }}
            >
              <TextInput
                placeholder="Enter your text"
                value={inputText}
                onChangeText={(text) => setInputText(text)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default RecodViedeo;
const styles = StyleSheet.create({});
