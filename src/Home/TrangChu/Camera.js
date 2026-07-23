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
  TouchableWithoutFeedback,
  Modal,
  BackHandler,
  Alert,
  PermissionsAndroid,
  ImageBackground,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { React, useState, useEffect, useRef, memo } from "react";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import Swiper from "react-native-swiper";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const CameraPost = ({ navigation }) => {
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState(null);
  const [flast, setFlast] = useState("off");
  const [startCamera, setStartCamera] = useState(true);
  const [isView,setIsView]=useState(true)
  useEffect(() => {
    const __startCamera = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
        // start the camera
        setStartCamera(true);
      } else {
        Alert.alert("Access denied");
      }
    };
    __startCamera();
  }, [startCamera]);

  // cho phép bạn chọn vaof thựo tính nào
  const cameraRef = useRef();
  const [selectedOption, setSelectedOption] = useState('16:9');

  const handlePress = (option) => {
    setSelectedOption(option);
  };
  useEffect(() => {}, [selectedOption]);
  // tương tác với ảnh sau khi đưuocj chupk
   const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)

   const __takePicture = async () => {
    if (!cameraRef.current) return
    const photo = await cameraRef.current.takePictureAsync()
   
    setPreviewVisible(true)
     setCapturedImage(photo)
     setIsView(false);
     setStartCamera(false);
    
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#222222",
          width: "100%",
          height: "5%",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("UserThink")}
          style={{ flexDirection: "row" }}
        >
          <Ionicons name="arrow-back" size={26} color="white" />
          <Text style={{ color: "white" }}> Back</Text>
        </TouchableOpacity>
       {!isView&&<TouchableOpacity
          onPress={
            () => navigation.navigate("UserThink", [capturedImage,isV=3])
          }
          style={{ flexDirection: "row" }}
        >
          <Text style={{ color: "white" }}> Save</Text>
        </TouchableOpacity>}
      </View>
    {isView&& <View
        style={{
          flex: 1,
          position: "relative",
          backgroundColor: "pink",
          zIndex:1,
        }}
      >
        <View
          style={{
            width: "100%",
            height: "8%",
            backgroundColor: "rgba(52, 52, 52, 0.1)",
            justifyContent: "space-around",
            alignItems: "center",
            paddingHorizontal: 10,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity >
            <MaterialIcons name="flip-camera-android" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="flash" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="color-filter-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="eye" size={26} color="black" />
          </TouchableOpacity>
        </View>
        {startCamera && (
          <Camera
            style={{
              flex: 0.9,
              width: "100%",
            }}
            ref={cameraRef}
          ></Camera>
        )}

        <View
          style={{
            width: "100%",
            height: "30%",
            backgroundColor: "rgba(52, 52, 52, 0.2)",
            position: "absolute",
            bottom: 0,
            zIndex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "60%",
              height: "20%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 15,
            }}
          >
            <TouchableOpacity onPress={() => handlePress("16:9")}>
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  opacity: selectedOption === "16:9" ?  1 :0.5,
                  fontWeight: selectedOption === "16:9" ? "bold" : "normal",
                }}
              >
                16:9
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("64mp")}>
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  opacity: selectedOption === "64mp" ? 1 :0.5,
                  fontWeight: selectedOption === "64mp" ? "bold" : "normal",
                }}
              >
                64mp
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("3:4")}>
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  opacity: selectedOption === "3:4" ?  1 :0.5,
                  fontWeight: selectedOption === "3:4" ? "bold" : "normal",
                }}
              >
                3:4
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("full")}>
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  opacity: selectedOption === "full" ?  1 :0.5,
                  fontWeight: selectedOption === "full" ? "bold" : "normal",
                }}
              >
                full
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
               onPress={__takePicture}
            style={{
              width: 70,
              height: 70,
              borderRadius: 50,
              backgroundColor: "#fff",
            }}
          />
        </View>
      </View>}
      { !isView&&
         <View
         style={{
           backgroundColor: 'transparent',
           flex: 1,
           width: '100%',
           height: '100%'
         }}
       >
         <ImageBackground
           source={{uri: capturedImage && capturedImage.uri}}
           style={{
             flex: 1
           }}
         />
       </View>
     
      }
      <View
        style={{
          width: "100%",
          height: "8%",
          backgroundColor: "black",
          bottom: 0,
        }}
      ></View>
     
    </View>
  );
};
export default CameraPost;
const styles = StyleSheet.create({});
