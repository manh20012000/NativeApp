import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Modal,useWindowDimensions
} from "react-native";
import { React, useState, useEffect, useRef } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Tabs, CollapsibleTabView } from "react-native-collapsible-tab-view";
import { FontAwesome, EvilIcons, AntDesign } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import { firestore } from "../../../Confige.js";
import path from "../../confige/config.js";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import {
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";
const ViewVideo = ({ item,navigation,index,dataVideo}) => {

   const {width,height} = useWindowDimensions()
  const [modalVisible, setModalVisible] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  return (
    <View style={{width:width/3,alignSelf:"center"}}>
      <TouchableOpacity
        onPress={() => {
          setIsViewerOpen(true);
          navigation.navigate("SeemVideo",{ selectedVideo: item, dataVideo:dataVideo,index:index });
        }}
        style={{
          width: width/3,
          height: width/2,
          borderWidth: 1,
          position: "relative",

        }}
      >
        <Video
          source={{ uri:item.Video }} // link tinht
          // source={require('D:/laptrinhMobileClass/NativeAppp/src/Image/Download.mp4')}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "black",
          }}
          resizeMode="cover"
          isLooping
        />
      </TouchableOpacity>
    </View>
  );
};
export default ViewVideo;
const styles = StyleSheet.create({});
