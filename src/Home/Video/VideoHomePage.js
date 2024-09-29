import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  AppState,
  RefreshControl,
  useWindowDimensions,
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
import VideoLocation from "./VideoLocation.js";
import { checkAndRefreshToken } from "../../confige/ComponencheckingToken.js";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const Tab = createMaterialTopTabNavigator();
const VideoHomePage = () => {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{
        flex: 1,
        position: "relative",
        backgroundColor: "black",
        paddingTop: insets.top,
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 7,

          width: "100%",
          flexDirection: "row",
          zIndex: 1,

          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity onPress={() => console.log("Pressed Live")}>
          <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>
            Live
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 3, marginLeft: 2 }}
          onPress={() => console.log("Pressed Search")}
        >
          <FontAwesome name="search" size={22} color="white" />
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        initialRouteName="Foryou"
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#CCCCCC",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
            textTransform: "none",
          },
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            top: -5,
            left: width - 350,
            right: 0,
            margin: 0,
          },
          tabBarGap: 1,
          tabBarShowLabel: true,
          tabBarItemStyle: {
            width: 80,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            height: 50,
          },
          tabBarIndicatorStyle: {
            backgroundColor: "white",
            width: 23,
            borderRadius: 10,
            marginLeft: 30,
            height: 2,
            alignItems: "center",
            top: 40,
          },
        }}
      >
        <Tab.Screen
          name="VideoLocation"
          component={VideoLocation}
          options={{
            tabBarLabel: "Ha noi",
          }}
        />
        <Tab.Screen
          name="Friender"
          component={Friender}
          options={{
            tabBarLabel: "Friend",
          }}
        />
        <Tab.Screen
          name="Folowing"
          component={Folowing}
          options={{
            tabBarLabel: "Follow",
          }}
        />
        <Tab.Screen
          name="Foryou"
          component={Foryou}
          options={{
            tabBarLabel: "Foryou",
          }}
        />
      </Tab.Navigator>
    </View>
  );
};
export default VideoHomePage;
const styles = StyleSheet.create({});
