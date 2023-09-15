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
  } from "react-native";
  import { React, useState, useEffect, useRef, memo } from "react";
  import SelectDropdown from "react-native-select-dropdown";
  import { FontAwesome, EvilIcons, AntDesign } from "@expo/vector-icons";
  import { Ionicons } from "@expo/vector-icons";
  import { Entypo } from "@expo/vector-icons";
  import { BottomSheet } from "react-native-btr";
  import { FontAwesome5 } from "@expo/vector-icons";
  import * as ImagePicker from "expo-image-picker";
  import { Camera, CameraType } from 'expo-camera'
  import Swiper from "react-native-swiper"; 
  import * as MediaLibrary from 'expo-media-library';
const PostWithCamera=({ navigation, route })=>{
  return (
    <View>
      <Text>PostWithCamera</Text>
    </View>
  )
}
export default PostWithCamera
const styles = StyleSheet.create({})