import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigete from './src/navigate/Navigate'
import React, { Component, useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import  { firestore } from './Confige.js'

export default function App() {

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
          <Navigete/>
  );
}
