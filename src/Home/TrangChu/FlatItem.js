import { StyleSheet, Text, View, Image, TouchableOpacity,TouchableWithoutFeedback,Modal} from 'react-native'
import { React, useState,useRef, useEffect } from 'react'
import styles from './StyleFlatItem.js'
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome, EvilIcons, AntDesign } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import SeeDeTail from './SeeDeTail.js';
import ImageViewer from 'react-native-image-zoom-viewer';
const FlatItem = (props) => {
 
  const numberLike = props.item.like;
  const binhluan = props.item.comment;
  
  const [number, setNumber] = useState(0);
   const [nblike, setnblike] = useState(numberLike)
    const [isLiked, setIsLiked] = useState(false);
  const handlePress = () => {
    setIsLiked(!isLiked);
    if (nblike === numberLike) {
      setnblike(nblike + 1);
    } else {
      setnblike(nblike - 1);
    }
  };
  // chuyển sang trang detail
  const DetaiHandress = () => {
    props.navigation.navigate('SeeDeTail', props.item);
  }
  // set phongd to màn hinhg 
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

   const anh=props.item.image;
   const images = anh.map((url) => ({ url }));

// set thuoc tính cho modal
  //  const [isComment, setIsViewerOpen] = useState(false);
  //  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  return (
    <View style={styles.contain}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: props.item.avatar }}
            style={{
              width: 39,
              height: 44,
              borderRadius: 100, marginHorizontal: 6
            }} ></Image>
          <View >
            <Text style={styles.title}>{props.item.titleNameName}</Text>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{props.item.Time}</Text>
          </View>

        </View>
        <TouchableOpacity style={styles.detail}
          onPress={DetaiHandress}
        ><Text style={{ fontSize: 18, fontWeight: '500', textAlign: 'center' }}>See Detail</Text></TouchableOpacity>
      </View>
      <View style={{ marginBottom: 10, paddingHorizontal: 6 }}><Text>{props.item.status}</Text></View>
      <Swiper style={{ position: 'relative', height: 450 }} loop={true}>
      {anh.map((image, index) => (
        <View key={index}>
          <View
            style={{
              width: 40,
              height: 30,
              backgroundColor: 'rgba(192,192,192, 0.5)',
              position: 'absolute',
              borderRadius: 15,
              zIndex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              right: 15,
            }}
          >
            <Text>
              {index + 1}/{anh.length}
            </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              setIsViewerOpen(true);
              setCurrentImageIndex(index);
            }}
          >
            <Image
              source={{ uri: image }}
              style={{
                width: 'auto',
                height: 440,
                zIndex: 0,
              }}
            />
          </TouchableWithoutFeedback>
          {isViewerOpen && (
            <Modal visible={true} transparent={true}>
              <ImageViewer
                imageUrls={images}
                index={currentImageIndex}
                onSwipeDown={() => setIsViewerOpen(false)}
                enableSwipeDown={true}
              />
            </Modal>
          )}
        </View>
      ))}
    </Swiper>

      {/*       
      <View style={styles.bodyView}>
        <Image
          source={{ uri: props.item.image }}
          style={{
            width: 390,
            height: 440,
          }}
        ></Image>
      </View> */}
      

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Text style={{ fontSize: 20 }} >{nblike} Like</Text>
        <Text style={{ fontSize: 20 }}>{binhluan.length} Bình luận</Text>
      </View>
      <View style={{
        height: 50,
        marginHorizontal: 10,
        flexDirection: 'row',
      }}>
        <TouchableOpacity style={{
          backgroundColor: 'black',
          flex: 1,
          alignItems: 'center', justifyContent: 'center', borderColor: 'white',
          borderWidth: 2
        }}
          onPress={handlePress}>
          <Text style={{ color: 'white' }} >
            <AntDesign name="heart" size={24} color={isLiked ? 'red' : 'white'} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
              // setIsViewerOpen(true);
              // setCurrentImageIndex(index);
              console.log(hienthi)
            }}
            style={{
          backgroundColor: 'black',
          flex: 1,
          alignItems: 'center', justifyContent: 'center', borderColor: 'white',
          borderWidth: 2
        }}
        >
         
            <EvilIcons name="comment" size={34} color="white" />
        </TouchableOpacity >
          {isViewerOpen && (
            <Modal visible={true} 
            transparent={true}>
              
            </Modal>
          )}





        <TouchableOpacity style={{
          backgroundColor: 'black',
          flex: 1,
          alignItems: 'center', justifyContent: 'center', borderColor: 'white',
          borderWidth: 2
        }}
        >
          <Text style={{ color: 'white' }} ><FontAwesome name="share" size={24} color="white" /></Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}
export default FlatItem;