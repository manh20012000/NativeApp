import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, FlastList, } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './Styles.js'
import { FontAwesome5 } from '@expo/vector-icons';
import DataOjs from '../../Data/DataObj.js';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import BootemSheet from './BootemSheet.js';
import { BottomSheet } from 'react-native-btr';
import { Fontisto } from '@expo/vector-icons';
const SeeDeTail = ({route}) => {
  const data =route.params.avatar

  const [isLiked, setIsLiked] = useState(false);
    let color='red';
  const Itlike=()=>{
   
   setIsLiked(!isLiked)
   
    if( !isLiked){
      color='red';
    }else{
      color='black';
    }
  }

  // chon mua với bottonsêt
  const [Mua, setMua] = useState(false);
   const btSMuangay=()=>{
    alert('nhấn ')
    const toggleBottomNavigationView = () => {
      //Toggling the visibility state of the bottom sheet
          setMua(Mua);
  };
    return (
      <BottomSheet
          visible={true}
          //setting the visibility state of the bottom shee
          onBackButtonPress={toggleBottomNavigationView}
          //Toggling the visibility state on the click of the back botton
          onBackdropPress={toggleBottomNavigationView}
      //Toggling the visibility state on the clicking out side of the sheet
      >
            <View >
              <Text style={{ fontSize: 123 }}>fydwhufbshdbfbsdnb</Text>
              <Text style={{ fontSize: 123 }}>fydwhufbshdbfbsdnb</Text>
              <Text style={{ fontSize: 123 }}>fydwhufbshdbfbsdnb</Text>
              <Text style={{ fontSize: 123 }}>fydwhufbshdbfbsdnb</Text>
              <Text style={{ fontSize: 123 }}>fydwhufbshdbfbsdnb</Text>
          </View>

      </BottomSheet>
  )

   }
  return (

    <View style={{ flex: 1, marginTop: 40 }}>
      <View style={styles.timkiem}>
        <TextInput style={{ fontSize: 23, width: 300 }}
          placeholder='nhap tim kiem '
        >
        </TextInput>
        <TouchableOpacity>
          <FontAwesome5 name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.anhBiaf}>
           <Image 
             style={{width:500,height:300}}
           source={{
                  uri:data
                      }}
           ></Image>
        </View>

        <View style={styles.giaBan}>

          <Text style={{ fontSize: 18, fontWeight: '800', alignItems: 'center' }}>Giá:$</Text>
          <Text style={{ fontSize: 18, fontWeight: '800', alignItems: 'center' }}>Đã bán:   $</Text>
        </View>
        <View style={styles.QuangCao}>
          <Text style={{ fontSize: 18, fontWeight: '500', alignItems: 'center' }}>Tên sản phẩm </Text>

        </View>
        <View style={styles.canhan}>
          <View><Text>ảnh bìa</Text></View>
          <View>
            <Text> tến sop</Text>
            <Text>Địa điểm</Text>
            <Text>Online</Text>
          </View>
          <TouchableOpacity style={{ width: 100, height: 45, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF6600' }}>
            <Text style={{ color: 'white', fontWeight: '600' }}> Sem shop</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cmt}>
          <TextInput style={{ fontSize: 23, width: 300 }}
            placeholder='nhap phan hoi'
            multiline={true}
            numberOfLines={6}
          >
          </TextInput>
          <TouchableOpacity>
            <Ionicons name="send" size={24} color="black" />
          </TouchableOpacity>

        </View>
        <View style={{ flexDirection: "row", justifyContent: 'space-around', backgroundColor: 'white', marginTop: 2, padding: 8 }}>
          <Text style={{ fontSize: 18 }}>giá sao 5*     </Text>
          <Text style={{ fontSize: 18 }}> đã bán        sản phẩm </Text>
          <TouchableOpacity  
           onPress={Itlike}>
          <FontAwesome name="heart" size={24} color={color}/>
          </TouchableOpacity>
          <TouchableOpacity >
            <FontAwesome name="share" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="message1" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ width: '100%', padding: 10, backgroundColor: '#FF6600', marginTop: 3 }}
          onPress={() => {
            return (
              <BootemSheet />
            )
          }}
        >
          <Text style={{ fontWeight: '900' }}>Xem chi tiết </Text>
        </TouchableOpacity>

        {/* <FlastList
          data={data}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.comment}>
                <View style={styles.contenCmt}>
                  <View style={{ width: 40, height: 40, flex: 0.3 }}>
                    <Text>anh bia</Text></View>
                  <Text>noi dung commt </Text>
                </View>
              </View>
            )
          }
          }
        >
        </FlastList> */}

      </ScrollView >


      <View style={styles.luachon}>
        <TouchableOpacity style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
          <AntDesign name="message1" size={27} color="white" />
        </TouchableOpacity  >
        <Text style={{ fontSize: 33, flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>|</Text>
        <TouchableOpacity style={{ flex: 0.2, justifyContent: 'center' }}>
          <Fontisto name="shopping-basket-add" size={27} color="white" />
        </TouchableOpacity>
        <TouchableOpacity 
              onPress={btSMuangay}
        style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 25, color: 'white' }}>Mua ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default SeeDeTail
