import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { React, useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Call from "./Call";
import People from "./PeoPle";
import Story from "./Story";
import Chat from "./Chat";
import axios from "axios";
import path from "../../../confige/config";
const bottonTad = createBottomTabNavigator();
const Message = ({ navigation }) => {
  const [dataUserChat, setDataUser] = useState([]);
  const SelectUserMessage = async () => {
      try {
        const { data } = await axios.get(`${path}/UserRouter`);
        // console.log(data, "data selector");
        setDataUser(data);
      } catch (error) {
        console.log(error, "lỗi nhânj với ");
      } finally {
        // console.log(dataUserChat)
      }
    };
  useEffect(() => {
    SelectUserMessage();
  }, []);

  // 
  // console.log(dataUserChat, 'log ra dâtracgat');
  return (
   
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View style={styles.header}>
        <View
          style={{
            flex: 0.25,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("BootonGate");
            }}
          >
            <Ionicons name="ios-arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, color: "white", fontWeight: "800" }}>
            Chats
          </Text>
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}></Text>
        </View>
        <View
          style={{
            flex: 0.25,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Ionicons name="pencil" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="camera-outline"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      <bottonTad.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "black" },
          headerShown: false,
          tabBarActiveTintColor: "red",
        }}
      >
        <bottonTad.Screen
          name="Message"
          component={Chat}
          // initialParams={{ dataUserChat }}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign name="message1" size={24} color="white" />
            ),
          }}
          navigation
        />
        <bottonTad.Screen
          name="Call"
          component={Call}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather name="video" size={24} color="white" />
            ),
          }}
        />
        <bottonTad.Screen
          name="People"
          component={People}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons name="people-outline" size={24} color="white" />
            ),
          }}
        />
        <bottonTad.Screen
          name="Story"
          component={Story}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign name="calculator" size={24} color="white" />
            ),
          }}
        />
      </bottonTad.Navigator>
    </View>
  );
};
export default Message;
const styles = StyleSheet.create({
  header: {
    width: "100%",
    justifyContent: "center",
    height: "8%",
    backgroundColor: "black",
    flex: 0.05,
    flexDirection: "row",
  },
});
