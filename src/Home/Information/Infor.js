import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView , StatusBar,SafeAreaView} from 'react-native'
import { React, useState, useEffect, useRef } from 'react'
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
import VideoData from '../../Data/VideoData';
import FlatItem from '../TrangChu/FlatItem';
const Infor = ({ navigation }) => {
  const [dataObj, setDataObj] = useState(DataOjs);
  const [dataVideo,setDataVideo]=useState(VideoData)
  // lấy dữ liệu databse  từ chương firebase 
  const [dataUser, setData] = useState({});
  const [databaiviet, setDataBaiviet]=useState([])
  useEffect(() => {
    const fectData = async () => {
      try {
      const querySnapshot = await getDocs(collection(firestore, 'user'));
        querySnapshot.forEach((doc) => {
          setData(doc.data());
        });
         const baiviet=await getDocs(collection(firestore, 'BaiVietCaNhan'))
          const array=[]
          baiviet.forEach((doc) => {
            array.push(doc.data())
          });
          setDataBaiviet(array)
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
      <View style={{backgroundColor:'orange',paddingVertical:10}}>
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
       <TouchableOpacity style={{
                    width:'100%',
                  height:'30%',
                  backgroundColor:'blue',
                  marginTop:10}}>
             <Text style={{fontSize:20,
              fontWeight:'600',
              color:'white',
              }}
              >Thông tin
               </Text>
       </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={{flex:1,position:'relative'}}>
       <View style={{flex:0.2,
            position:'absolute',
            top:30,
             }}>
      <Text>dhsbcdshbc</Text>
       </View>
    <Tabs.Container
      renderHeader={InforHeader}
    >
      <Tabs.Tab name="BaiViet">
        <Tabs.FlatList
          removeClippedSubviews={true}
          keyExtractor={(item, index) => index.toString()}
          data={databaiviet}
          renderItem={({ item, index }) => {
            return (
             <FlatItem item={item} navigation={navigation}/> 
            )}}
        />  
         </Tabs.Tab>
    {/* //===========================Tbavidb================================================= */}
      <Tabs.Tab name="Video">
        <Tabs.FlatList
        removeClippedSubviews={true}
        keyExtractor={(item, index) => index.toString()}
        data={dataVideo}
        renderItem={({ item, index }) => {
          return (
           <ViewVideo item={item} index={index}/>
          )}}
          numColumns={3}
      />  
      </Tabs.Tab>
      <Tabs.Tab name="Like">
        <Tabs.FlatList
        data={dataVideo}
        renderItem={({ item, index }) => {
          return (
           <ViewVideo item={item}/>
          )}}
      />  
      </Tabs.Tab>
    </Tabs.Container>
    </View>
  )
}
export default Infor;
//
// const fetchDataByName = async (name) => {
//   const q = query(collection(firestore, "your_collection_name"), where("name", "==", name));
//   const querySnapshot = await getDocs(q);
  
//   const data = [];
//   querySnapshot.forEach((doc) => {
//     data.push(doc.data());
//   });
