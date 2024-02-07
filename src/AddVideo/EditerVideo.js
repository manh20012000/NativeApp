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
import { Feather } from "@expo/vector-icons";
const EditerVideo = ({ navigation, route }) => {
  const data = route.params;
  const [action, setAction] = useState(false);
  const [contain, setContain] = useState(true);
  const [desiredSize, setDesiredSize] = useState({ height: 620, width: 250 });
  const scaleValue = useRef(new Animated.Value(1)).current;
  const startZoomIn = () => {
    setContain(false);
    setDesiredSize({ height: 720, width: 350 });
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };
  const resetZoom = () => {
    setContain(true);
    setDesiredSize({ height: 620, width: 250 });
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {contain == true && (
        <View
          style={{
            flex: 0.08,

            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 15,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(" ");
            }}
          >
            <Ionicons name="chevron-back" size={34} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
              width: 70,
              height: 35,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
          )}
       {contain == false && (
        <View
          style={{
            flex: 0.08,

            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 15,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={resetZoom}
          >
            <Ionicons name="chevron-back" size={34} color="white" />
          </TouchableOpacity>
          
        </View>
          )}
      <View
        style={{
          flex: 0.6,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data.typefile === "video" && (
          <Animated.View
            style={{
              height: 620,
              width: 250,
              transform: [{ scale: scaleValue }],
              overflow: "hidden",
            }}
          >
            <Video
              source={{ uri: data.fileselect }}
              style={{ flex: 1 }}
            
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              shouldPlay={false}
              useNativeControls={true}
            />
          </Animated.View>
        )}
      </View>
     
    </View>
  );
};

export default EditerVideo;
const styles = StyleSheet.create({});
