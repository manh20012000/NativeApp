import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './Style.js';
import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { Feather } from '@expo/vector-icons';
const Notifices = ({ navigation }) => {
  return (

    <View style={{backgroundColor:'white',flex:1}}>
      <View style={{height:'5%',alignItems:'center',justifyContent:'space-between',flexDirection:'row',paddingHorizontal:20}}>
        <Text style={{ fontWeight: 'bold',fontSize:20 }}> Notification</Text>
        <TouchableOpacity>
        <Feather name="search" size={24} color="black" />
        </TouchableOpacity>
       </View>
    </View>
  )
}
export default Notifices;


