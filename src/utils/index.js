import { Platform } from "react-native";
import { io } from "socket.io-client";
export const BaseUrl =
  Platform.OS === "android"
    ? "http://192.168.188.136:8080"
    : "http://192.168.188.136:8080";

export const socket = io.connect("http://192.168.188.136:8080");
