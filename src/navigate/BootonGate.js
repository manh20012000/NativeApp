import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  BackHandler,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Trangchu from "../Home/TrangChu/Trangchu.js";
import { FontAwesome5 } from "@expo/vector-icons";

import Infor from "../Home/Information/Infor.js";
import { Feather } from "@expo/vector-icons";
import Notifices from "../Home/Notifice/Notifices.js";
import { MaterialIcons } from "@expo/vector-icons";
import RecodViedeo from "../AddVideo/RecodVieao.js";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import VideoHomePage from "../Home/Video/VideoHomePage.js";
const Tab = createBottomTabNavigator();
const BootonGate = ({ navigation, route }) => {
  // console.log(route.params)
  const bootonTba = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "black" },
        tabBarIcon: ({ focused, color, size }) => {
          let iconComponent;

          if (route.name === "Home") {
            iconComponent = (
              <Image
                source={require("../Image/home.png")}
                style={{
                  width: focused ? 30 : 25,
                  height: focused ? 30 : 25,
                  tintColor: focused ? "white" : "#888888",
                }}
              />
            );
          } else if (route.name === "Video") {
            iconComponent = (
              <Entypo
                name="folder-video"
                size={focused ? 28 : 24}
                color={focused ? "white" : "#888888"}
              />
            );
          } else if (route.name === "Inbox") {
            iconComponent = (
              <FontAwesome
                name="bell"
                size={focused ? 28 : 24}
                color={focused ? "white" : "#888888"}
              />
            );
          } else if (route.name === "Infor") {
            iconComponent = (
              <Feather
                name="user"
                size={focused ? 28 : 24}
                color={focused ? "white" : "#888888"}
              />
            );
          }

          return iconComponent;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Trangchu}
        // initialParams={{ data: route.params }}
      />
      <Tab.Screen name="Video" component={VideoHomePage} />
      <Tab.Screen
        name=" "
        component={RecodViedeo}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../Image/new-video.png")}
              style={{
                marginTop: 10,
                width: 45,
                height: 35,
              }}
            />
          ),
        }}
      />
      <Tab.Screen name="Inbox" component={Notifices} />
      <Tab.Screen
        name="Infor"
        initialParams={{ data: route.params }}
        component={Infor}
      />
    </Tab.Navigator>
  );
};
export default BootonGate;
