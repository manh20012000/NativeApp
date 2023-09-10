import { StyleSheet, Text, View, FlatList, Item, Image, TextInput, ScrollView, TouchableOpacity, 
  TouchableWithoutFeedback, 
  Modal } from 'react-native'
import { React, useState, useEffect, useRef,memo } from 'react'
import { Ionicons } from '@expo/vector-icons';
import DataOjs from '../../Data/DataObj.js'
import FlatItem from './FlatItem.js'
import styles from './StyleTrangchu.js'
import SeeDeTail from './SeeDeTail.js'
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../Confige.js'
import { useNavigation } from '@react-navigation/native';
import { Video, ResizeMode } from 'expo-av';
import screenfull from 'screenfull';
import VideoPlayer from 'expo-video-player';
const TrangChu = ({ navigation }) => {
  const urlVideo = useRef('https://v.pinimg.com/videos/mc/720p/c9/22/d8/c922d8391146cc2fdbeb367e8da0d61f.mp4').current
  const [data, setData] = useState(DataOjs);
  const [userStory, setUserStory] = useState({})// danh cho story
  //su dung ref cho video
  const videoe = useRef(true);
       
  // console.log(userStory)
  const [user, setUser] = useState({})// dnah cho lấy dữ liệu từ dâtbase
  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'user'));
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, '=>', doc.data()); 
          setUser(doc.data())
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchDataFromFirestore();
  }, []);
  // thục hien  su lý video 
  const [isLoading, setIsLoading] = useState(true);
  const [fullscreen, setfullscreen] = useState(true);
  const handleFullscreen = () => {
    setIsLoading(true);
    setfullscreen(true)
  };
  const str = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('bhdshbh')
        }}
        style={{
          width: 100,
          height: 150,
          padding: 4,
          borderWidth: 1,
          borderRadius: 13,
          position: 'relative',
          marginHorizontal: 6,
        }}>
        <Image style={{
          width: '100%',
          flex: 0.7,
          height: '70%'
        }}
          source={{ uri: user.userphoto }}
        >
        </Image>
        <View style={{
          width: 30, 
          height: 30,
          borderRadius: 30,
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 30,
          right: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ alignItems: 'center' }}>+</Text>
        </View>
        <View style={{
          flex: 0.3,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ alignItems: 'center', marginTop: 10 }}>Tạo Tin </Text>
        </View>
      </TouchableOpacity>
    )
  }
  //  lam hien thi vooi story
  const [modalVisible, setModalVisible] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const video = useRef(null);
  const FlatStory = memo(() => {
    return (
      <View>
        <View style={{
          flexDirection: 'row',
          width: '100%',
          height: 55,
          backgroundColor: '#111111',
          alignItems: 'center',
          paddingHorizontal: 15,
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
          <Image style={{
            width: 45,
            height: 45,
            borderRadius: 30,
          }}
            source={{ uri: user.userphoto }}
          ></Image>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UserThink')
            }}
            style={{
              width: 230,
              height: 40,
              backgroundColor: '#999999',
              borderRadius: 15,
              borderWidth: 1,
              borderColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white' }}>Bạn đang nghĩ gì </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="images-outline" size={24} color="#00FF00" />
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={data}
          ListHeaderComponent={str}
          renderItem={({ item }) => {
            return (
              <View  >
              <TouchableOpacity
                onPress={() => {
                  setIsViewerOpen(true);
                  setUserStory({
                    name: item.name,
                    video: urlVideo,
                    avata: item.avata
                  });
                }}
                style={{
                  width: 100,
                  height: 150,
                  borderWidth: 1,
                  borderRadius: 13,
                  position: 'relative',
                  marginHorizontal: 5,
                }}
              >
                <Video
                  
                  source={{ uri: user.videoStory }}// link tinht
                  // source={require('D:/laptrinhMobileClass/NativeAppp/src/Image/Download.mp4')}
                  style={{
                    width: "100%",
                    height: '100%',
                    borderRadius: 13,
                    position:'absolute',
                    backgroundColor:'black'
                  }}
                  resizeMode="cover"
                  isLooping
                />
                <Image source={{ uri: item.avata}}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 34, marginHorizontal: 6,
                    marginLeft: 10,
                    position: 'absolute',
                    top: 5,
                  }} >
                </Image >
                <Text style={{
                  bottom: 4,
                  marginHorizontal: 5,
                  color: 'white',
                  position: 'absolute',
                }}>{item.name}</Text>

              </TouchableOpacity>
              </View>
            )
          }
          }
        />
      </View>)
  })
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={{
          width: 300, backgroundColor: 'white', marginRight: 15, marginVertical: 10, borderRadius: 40,
          padding: 8, flexDirection: 'row',
          justifyContent: 'space-between'
        }}
          onPress={() => {
            navigation.navigate('Timkiem')
          }}
        >
          <Text> nhập tìm kiếm </Text>
          <Feather name="search" size={24} color="black" />
        </TouchableOpacity  >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Mess')
          }}
        >
          <FontAwesome5 name="facebook-messenger" size={33} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}  
         ListHeaderComponent={FlatStory}
        keyExtractor={item => item.id.toString()}
        removeClippedSubviews={true}
        renderItem={({ item, index }) => {
          return (
            <FlatItem item={item} index={index} navigation={navigation}
              setData={setData} data={data}
            />
          )
        }}
      >
      </FlatList>
      {isViewerOpen && (
        <Modal
          visible={true}
          transparent={true}>
          <View style={{ flex: 1, backgroundColor: 'white',}}>
           <View style={{
              borderRadius: 34,
              flexDirection: 'row',
              justifyContent:'space-between',
              alignItems:'center',
              marginHorizontal:15
                
            }}>
              <View style={{flexDirection:"row"}}>
                 <Image source={{ uri: userStory.avata }}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 34,
                  borderWidth: 2,
                  borderColor: 'red'
                }} >
              </Image >
              <Text style={{
                fontSize: 20,
                margin: 15,

              }}>{userStory.name}</Text> 
              </View>
             
              <TouchableOpacity
              onPress={() => {
                setIsViewerOpen(false)
              }}
              style={{
                width: 30,
                height: 33,
                borderRadius:40,  
                marginLeft:4              
              }} >
              <Text style={{ fontSize: 25, color: 'black', textAlign: 'center', }}>x</Text>
            </TouchableOpacity>
            </View> 
            <View style={{ marginTop:10}}>
             <Video
              ref={videoe}
              source={{ uri: userStory.video}}// link tinht
              style={{
                width: "100%",
                height: '95%',
              }}
              shouldPlay
               isLooping
               resizeMode={ResizeMode.COVER}
            />
            </View>
           
           
          </View>
        </Modal>
      )}
    </View>
  )
}
export default TrangChu;
// // source={require('D:/laptrinhMobileClass/NativeAppp/src/Image/Download.mp4')}
//{isViewerOpen && (
//                   <Modal
//                     visible={true}
//                      transparent={true}>
//                            <View style={{flex:1,backgroundColor:'white',position:'relative',paddingVertical:30}}>
//                                   <TouchableOpacity
//                                     onPress={()=>{
//                                       setIsViewerOpen(false)
//                                     }}
//                                   style={{top:0,
//                                   right:0,
//                                   position:'absolute',
//                                   marginRight:40,
//                                   width:40,
//                                   height:40,
//                                   alignItems:'center',
//                                   justifyContent:'center',
//                                   backgroundColor:'red'
//                                   }} >
//                                   <Text style={{fontSize:40,color:'white',textAlign:'center'}}>x</Text>
//                                   </TouchableOpacity>
//                                   <Text style={{
//                                             bottom: 4,
//                                             marginHorizontal: 5,
//                                             color: 'black',
//                                             position: 'absolute',
//                                           }}>{item.titleNameName}</Text>
//                                    <Video
//                                         source={{ uri: urlVideo }}// link tinht
//                                         style={{
//                                           width: "90%",
//                                           height: '90%',
//                                           borderRadius: 13,
//                                            position:'absolute',

//                                         }}
//                                         resizeMode="cover"
//                                         isLooping
//                                       />
//                                 </View>
//                   </Modal>
//                 )}