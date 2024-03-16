import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import Navigete from "./src/navigate/Navigate";
import React, { Component, useState, useEffect } from "react";
import { getUserToken } from "./Token_Auth";
import { store } from "./src/Redex/Store";
import { Provider } from 'react-redux'
const STYLES = ["default", "dark-content", "light-content"];
const TRANSITIONS = ["fade", "slide", "none"];
import path from "./src/config";
import axios from "axios";
import {SocketProvider} from "./src/socket";
export default function App() {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0]
  );
  
  const [datas, setdata] = useState()
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
            animated={true}
            backgroundColor="black"
            hidden={hidden}
        />
        <SocketProvider>
          <Navigete/>
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
