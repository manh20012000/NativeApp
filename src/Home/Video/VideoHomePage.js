import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  AppState,
  RefreshControl,
} from "react-native";
import { React, useState, useEffect, useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Tabs, CollapsibleTabView } from "react-native-collapsible-tab-view";
import Foryou from "./Foryou";
import Folowing from "./Folowing";
import Friender from "./Friender.js";
import Detail from "./Detail.js";
const Tab = createMaterialTopTabNavigator();
const VideoHomePage=()=>{
  return (
   
    <Tab.Navigator

    // Use the initialRouteName prop to specify the component to show first
    initialRouteName="Foryou"
    // Use the screenOptions prop to customize the tab bar
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      tabBarAndroidRipple: { borderless: false },
      tabBarLabelStyle: {
        fontSize: 12,
        color: "white",
        fontWeight: "400",
      },
      tabBarStyle: {
        backgroundColor: "transparent", // Màu nền trong suốt
        position: "absolute",
        top: -10,
        left: 50,
        right: 0,
       
      },
      tabBarGap: 1,
      tabBarShowLabel: true,
      tabBarItemStyle: {
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        height: 50,
      },
    }}

  >
    <Tab.Screen
      name="Friender"
      component={Friender}
      options={{ tabBarLabel: 'Friender' }}
      />
      
    <Tab.Screen
      name="Folowing"
      component={Folowing}
      options={{ tabBarLabel: 'Folowing' }}
      />
      <Tab.Screen
      name="Foryou"
      component={Foryou}
      options={{ tabBarLabel: 'For you' }}
      />
         <Tab.Screen
      name="Detail"
      component={Detail}
      options={{ tabBarLabel: '' }}
    />
  </Tab.Navigator>
  )
}
export default VideoHomePage
const styles = StyleSheet.create({})
