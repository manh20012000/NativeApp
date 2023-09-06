import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView , StatusBar} from 'react-native'
import { React, useState, useEffect, useRef } from 'react'
import styles from './StyleInfor'
import ViewBaiViet from './ViewBaiViet';
import ViewVideo from './ViewVideo';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AddInfor from './AddInfor.js';
import { firestore } from '../../../Confige.js'
import { collection, getDocs } from 'firebase/firestore';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import DataOjs from '../../Data/DataObj';
import { Tabs, CollapsibleTabView } from 'react-native-collapsible-tab-view'
import { FontAwesome, EvilIcons, AntDesign } from '@expo/vector-icons';
const Infor = ({ navigation }) => {
  const [dataObj, setDataObj] = useState(DataOjs);
  // lấy dữ liệu databse  từ chương firebase 
  const [dataUser, setData] = useState({});
  useEffect(() => {
    const fectData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'user'));
        querySnapshot.forEach((doc) => {
          setData(doc.data());
        });
      } catch (error) {
        console.log(error)
      }
    }
    fectData();
  }, [])
  
  const [isLiked, setIsLiked] = useState(false);
  const handlePress = () => {
     setIsLiked(!isLiked);
     if (nblike === numberLike) {
       setnblike(nblike + 1);
     } else {
       setnblike(nblike - 1);
     }
  };

  const InforHeader = () => {
    return (
      <View style={styles.header}>
         <StatusBar translucent={true} backgroundColor='transparent' barStyle='dark-content' />
        <Image
          source={{ uri: dataUser.userphoto }}
          style={{
            width: '100%',
            height: 200,
          }}
        >
        </Image>
        <TouchableOpacity style={{
          position: 'absolute',
          top: 50,
          right: 10,
        }}>
          <AntDesign name="setting" size={24} color="white" />
        </TouchableOpacity>
        <View style={{bottom:0,
          flexDirection:'row',
          justifyContent:'space-around',
          alignItems:'center',
          }}>
          <Image
            source={{ uri: dataUser.userphoto }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 80,
            }}
          >
          </Image>
          <Text style={{ fontSize: 20, color: 'white', fontWeight: '900' }}>{dataUser.taikhoan}</Text>
       

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ThemInfor');
          }}
          style={{
            width: 150,
            height: 30,
            borderRadius: 15,
            backgroundColor: '#0066FF',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Chỉnh sửa cá nhân </Text>
        </TouchableOpacity>
       </View>
      </View>

    )
  }
  return (
    
    <Tabs.Container
      renderHeader={InforHeader}
    >
      
      <Tabs.Tab name="BaiViet">
        <Tabs.FlatList
          data={dataObj}
          renderItem={({ item, index }) => {
            return (
             <ViewBaiViet item={item}/>
            )}}
        />  
         </Tabs.Tab>
    {/* //===========================Tbavidb================================================= */}
   
      <Tabs.Tab name="Video">
        <Tabs.FlatList
        data={dataObj}
        renderItem={({ item, index }) => {
          return (
           <ViewVideo item={item}/>
          )}}
      />  
      </Tabs.Tab>
      <Tabs.Tab name="Like">
        <Tabs.FlatList
        data={dataObj}
        renderItem={({ item, index }) => {
          return (
           <ViewVideo item={item}/>
          )}}
      />  
      </Tabs.Tab>
    </Tabs.Container>
  )
}
export default Infor;
