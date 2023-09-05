import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './Style';
import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import DropdownComponent from './DropDow.js';
import PhanLoai from './Phanloai.js';
const Add = ({ navigation }) => {
  const [img, setImage] = useState('')
  return (

    <ScrollView style={styles.container}>
      <TouchableOpacity

        style={{ paddingRight: 10, flexDirection: 'row' }}>
        <Ionicons name="arrow-back" size={34} color="black" />
        <Text style={{ fontSize: 22, fontWeight: '600' }}> Them san phẩm </Text>
      </TouchableOpacity>
      <View style={{ width: '100%', backgroundColor: 'white', }}>
        {img != '' ? <Image source={{ uri: img }}
          style={{ width: 160, height: 160 }}></Image> : ''
        }


      </View>
      <TouchableOpacity style={styles.themanh}
       
      >
        <Text style={{ fontSize: 15 }}>Thêm ảnh</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 14, backgroundColor: 'white', width: '100%', padding: 10 }}>
        <Text>Tên sản phẩm                                                                  0/300     </Text>
        <TextInput style={{}}></TextInput>
      </View>
      <View style={{ marginTop: 14, backgroundColor: 'white', width: '100%', padding: 10 }}>
        <Text>nhập mô tả                                                                       0/300     </Text>
        <TextInput style={{}}></TextInput>
      </View>

      <PhanLoai />
      <View style={{ marginTop: 14, backgroundColor: 'white', width: '100%', padding: 10 }}>
        <Text> số lượng hàng                                                            0/300     </Text>
        <TextInput style={{}}></TextInput>
      </View>
      <View style={{ marginTop: 14, backgroundColor: 'white', width: '100%', padding: 10 }}>
        <Text>giá tiền                                                               0/300     </Text>
        <TextInput style={{}}></TextInput>
      </View>

      <View style={{ marginTop: 14, backgroundColor: 'white', width: '100%', padding: 10 }}>
        <Text>Thông tin khác                                                                 0/300     </Text>
        <TextInput style={{}}></TextInput>
      </View>

      <View style={{ marginTop: 34, width: '100%', height: 63, paddingHorizontal: 10, flexDirection: 'row', backgroundColor: 'white' }}>
        <TouchableOpacity style={{ flex: 1, backgroundColor: '#F2561D', height: '100%', justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
          <Text style={{ fontSize: 18 }}> Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, backgroundColor: '#F2561D', height: '100%', justifyContent: 'center', marginLeft: 5, alignItems: 'center', }}>
          <Text style={{ fontSize: 18 }}> Đồng ý</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 8 }}>

      </View>
    </ScrollView >
  )
}
export default Add;


