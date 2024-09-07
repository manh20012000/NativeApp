import * as Device from "expo-device";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useRef } from "react";
import path from "./config";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export class HandlerNotification {
  static userData = "";

  static checkNotificationPermission = async (userData) => {
    this.userData = userData;

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();

      finalStatus = status;
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
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      // EAS projectId is used here.
    } else {
      alert("Must use physical device for Push Notifications");
    }
    if (finalStatus === "granted") {
      this.getExpoPushToken();
    }
  };

  static getExpoPushToken = async () => {
    const storedToken = await AsyncStorage.getItem("fcmtoken");

    let token = "";
    if (!storedToken) {
      try {
        const projectId = "d3b46c22-50d6-46ef-b4b5-05e7ff29d2bb";

        if (!projectId) {
          throw new Error("Project ID not found");
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
      } catch (e) {
        token = `${e}`;
      }
      if (token) {
        await AsyncStorage.setItem("fcmtoken", token);
        await AsyncStorage.removeItem("fcmtoken");
        await this.updateTokenForUser(token);
      }
    }

    await AsyncStorage.removeItem("fcmtoken");
  };

  static updateTokenForUser = async (token) => {
    if (this.userData) {
      // console.log(this.userData._id, this.userData.expoPushToken);
      const expoPushToken = this.userData.expoPushToken;
      console.log(expoPushToken, "giá trị token222");
      if (expoPushToken && !expoPushToken.includes(token)) {
        console.log(token, "giá tr");
        //      expoPushToken.push(token);
        const updatedExpoPushToken = [...expoPushToken, token];

        await this.updateExpoPushToken(updatedExpoPushToken, this.userData._id);
      }
    }
  };

  static updateExpoPushToken = async (expoPushToken, id) => {
    try {
      console.log(id, expoPushToken);
      const { data } = await axios.put(
        `${path}/user/upadateFCMtoken/${id}`,
        { expoPushToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const userDataString = JSON.stringify(data.data);
      await AsyncStorage.setItem("userToken", userDataString);
      await AsyncStorage.removeItem("userToken");

      await AsyncStorage.setItem("userData", JSON.stringify(data.data));
      await AsyncStorage.removeItem("userData");
    } catch (err) {
      console.log("Failed to update token", err);
    }
  };
}
