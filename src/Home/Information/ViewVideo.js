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
  Modal,
} from "react-native";
import { React, useState, useEffect, useRef } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Tabs, CollapsibleTabView } from "react-native-collapsible-tab-view";
import { FontAwesome, EvilIcons, AntDesign } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import VideoTikTok from "../Video/Foryou.js";
// import { FlatGrid } from 'react-native-super-grid';
const ViewVideo = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setIsViewerOpen(true);
        }}
        style={{
          width: 125,
          height: 150,
          borderWidth: 1,

          position: "relative",
          margin: 1,
        }}
      >
        <Video
          source={{ uri: props.item.uri }} // link tinht
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
