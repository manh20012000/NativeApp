import {
    StyleSheet,
    Text,
    View,
    FlatList,
    KeyboardAvoidingView,
    Keyboard,
    Button,
    TouchableOpacity,
    Image,
    TextInput,
    StatusBar,
    useWindowDimensions,
    Modal,
  } from "react-native";
  import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    useContext,
  } from "react";
  import { Feather } from "@expo/vector-icons";
  import { Ionicons } from "@expo/vector-icons";
  import { Zocial } from "@expo/vector-icons";
  import { FontAwesome } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import { MaterialIcons } from "@expo/vector-icons";
  import { SimpleLineIcons } from "@expo/vector-icons";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import { FontAwesome5 } from "@expo/vector-icons";
  import {
    Bubble,
    GiftedChat,
    Send,
    InputToolbar,
  } from "react-native-gifted-chat";
  import path from "../../../confige/config";
  import axios from "axios";
  import { useSelector, useDispatch } from "react-redux";
  import { useSocket } from "../../../socket";
  import * as ImagePicker from "expo-image-picker";
  import { Camera, CameraType } from "expo-camera";
  import * as MediaLibrary from "expo-media-library";
  import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
  import Swiper from "react-native-swiper";
  import { Video, ResizeMode } from "expo-av";
  import VideoPlayer from "expo-video-player";
  import uuid from "uuid/v4";
  import ImageViewer from "react-native-image-zoom-viewer";
  import { FlatGrid } from "react-native-super-grid";
  import { LinearGradient } from "expo-linear-gradient";

const ViewCall = ({ navigation, route }) => {
    const {participants} = route.params;
    console.log(participants,'console.llo')
  return (
      <View style={{ flex: 1 }}>
          <View style={{  flexDirection: "row",backgroundColor:'black'}}>
              <TouchableOpacity
                onPress={() => {
                    navigation.navigate("PesionChat",{participants:participants}); 
                    }}
              >
                  <Ionicons name="arrow-back-sharp" size={28} color="#6600FF" /> 
              </TouchableOpacity>
              <View
                  style={{
                    width: 45,
                    height:45,
                    borderRadius: 45,
                    marginHorizontal: 6,
                    backgroundColor: "white",
                  }}
                >
                  <Image
                    source={{ uri: participants.Avatar }}
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 45,
                    }}
                  ></Image>
                  
                
                </View>
          </View>
     
    </View>
  )
}
export default ViewCall
const styles = StyleSheet.create({})