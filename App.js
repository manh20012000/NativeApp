
import { StyleSheet, Text, View,SafeAreaView,StatusBar,} from 'react-native';
import Navigete from './src/navigate/Navigate'
import React, { Component, useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import  { firestore } from './Confige.js'
const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];
export default function App() {
  const [hidden, setHidden] = useState(false);
   const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
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
  
  return (
    <SafeAreaView style={{flex:1}}>
           <StatusBar
            animated={true}
            backgroundColor="black"
            hidden={hidden}
           />  
         <Navigete/>
          </SafeAreaView>
  );
}
