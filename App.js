import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  Platform,
} from "react-native";
import Navigete from "./src/navigate/Navigate";
import React, { Component, useState, useEffect, useRef } from "react";
import { getUserToken } from "./Token_Auth";
import { store } from "./src/Redex/Store";
import { Provider } from "react-redux";
const STYLES = ["default", "dark-content", "light-content"];
const TRANSITIONS = ["fade", "slide", "none"];
import path from "./src/confige/config";
import axios from "axios";
import * as Device from "expo-device";
import { SocketProvider } from "./src/socket";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
// import messaging from '@react-native-firebase/messaging';

// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";

import { HandlerNotification } from "./src/Home/Notification/HandlerNotification.js";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0]
  );
  const notificationListener = useRef();
  const responseListener = useRef();
  const [channels, setChannels] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [datas, setdata] = useState();
  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here", test: { test1: "more data" } },
      },
      trigger: { seconds: 2 },
    });
  }

  async function registerForPushNotificationsAsync() {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
    }
  }
  useEffect(() => {
    registerForPushNotificationsAsync();
    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }
    // Listener khi nhận thông báo
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // Listener khi người dùng tương tác với thông báo
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  // const { onlineUser } = useSocket();
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar animated={true} backgroundColor="black" hidden={hidden} />
        <SocketProvider>
          <Navigete />
        </SocketProvider>
      </SafeAreaView>
    </Provider>
  );
}
// <View style={{ flex: 1 }}>
//   <Text>cin chaj</Text>
//   <Image
//     style={{
//       width: 200,
//       height: 300,
//     }}
//     source={{ uri:'https://nativeapp.onrender.com'+datas}}
//   />
// </View>// const fetchDataFromFirestore = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(firestore, 'user'));
//     querySnapshot.forEach((doc) => {
//       // console.log(doc.id, '=>', doc.data());
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
// fetchDataFromFirestore();
// const login = async () => {
//   try {
//     const { data } = await axios.get(
//       "https://nativeapp.onrender.com/upload/getfile"
//     );
//     console.log(data[0][0]);
//     setdata(data[0][0]["linkFile"]);
//   } catch (err) {
//     console.log(err);
//   }
// };
// login();
// console.log(datas);
