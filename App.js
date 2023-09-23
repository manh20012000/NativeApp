import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image, KeyboardAvoidingView,
  Keyboard
} from "react-native";
import Navigete from "./src/navigate/Navigate";
import React, { Component, useState, useEffect } from "react";
import { firestore } from "./Confige.js";
const STYLES = ["default", "dark-content", "light-content"];
const TRANSITIONS = ["fade", "slide", "none"];

import axios from "axios";
export default function App() {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0]
  );
  // const fetchDataFromFirestore = async () => {
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

  const [datas, setdata] = useState();

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

  return (
    // <View style={{ flex: 1 }}>
    //   <Text>cin chaj</Text>
    //   <Image
    //     style={{
    //       width: 200,
    //       height: 300,
    //     }}
    //     source={{ uri:'https://nativeapp.onrender.com'+datas}}
    //   />
    // </View>
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView>
        <Image source={{uri:datas}}/>
           <StatusBar
            animated={true}
            backgroundColor="black"
            hidden={hidden}
        />
      </KeyboardAvoidingView>
         <Navigete/>
          </SafeAreaView>
  );
}
