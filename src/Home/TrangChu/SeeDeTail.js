import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,StatusBar,
} from "react-native";
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import DataOjs from "../../Data/DataObj.js";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { BottomSheet } from "react-native-btr";
import { Fontisto } from "@expo/vector-icons";
import FlatItem from "./FlatItem.js";
import { Entypo } from "@expo/vector-icons";
import { Tabs, CollapsibleTabView } from 'react-native-collapsible-tab-view'
import { firestore } from "../../../Confige.js";
const SeeDeTail = ({ route,navigation }) => {
  const trove = () => {
      navigation.navigate('TrangChu')
  }
  const [dataRoute, setDataRote] = useState(route.params);

    // ket noi firebase
    const [baiviet, setBaiviet] = useState([]);
  
  // onpressmes
  const NavigateMess = () => {
           navigation.navigate('PesionChat',dataRoute)
  }
  //  nhấn vào them hoặc bor ban be
  const [isFriend, setIsFriend] = useState(false);
  let handlePress = () => {
      setIsFriend((prevState) => !prevState);
   }
 const InforHeader = () => {
    return (
      <View
        style={{
          flex: 0.3,
          backgroundColor: '#444444',
          paddingBottom:6
        }}
      >
         <StatusBar
                backgroundColor="black"
                animated={true}
             />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={()=>trove()}
          >
            <Ionicons name="md-arrow-back-sharp" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 300,
              backgroundColor: "white",
              marginRight: 15,
              marginVertical: 10,
              borderRadius: 40,
              padding: 8,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text> nhập tìm kiếm </Text>
            <Feather name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <View style={{}}>
            <Image
              source={{ uri: dataRoute.Avatar }}
              style={{
                width: "100%",
                height: 250,

                borderWidth: 2,
                borderColor: "red",
              }}
            ></Image>
            <Text
              style={{
                fontSize: 40,
                marginLeft: 20,
                fontWeight: "800",
                color: "white",
              }}
            >
              {dataRoute.Hoten}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            flexDirection: "row",
            width: 200,
            // backgroundColor: '#333333',
            justifyContent: 'space-between',
            alignItems:'center',
          }}
        >
          <Text style={{
            color: 'white',
            fontWeight: '500'
          }}>{dataRoute.Flow}  flow</Text>
          <Text style={{
            color: 'white',
            fontWeight: '500'
          }}>{dataRoute.like} Likes</Text>
        </View>
        <View style={{
          width: 400, height: 30,
          backgroundColor: "#333333",
          marginTop:3,
        }}>
          <Text style={{ color: "white" }}>Gioi thieu chung</Text>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            flexDirection: "row",
            marginTop: 3,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              NavigateMess();
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 140,
              height: 40,
              backgroundColor: "#333333",
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white" }}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
             onPress={handlePress}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 140,
              height: 40,
              backgroundColor: isFriend ? 'pink' : 'green',
              borderRadius: 10,
              flexDirection:'row',
            }}
          > 
          <Entypo name={isFriend ? 'users' : 'add-user'} size={24} color={isFriend ? 'green' : 'blue'}  />
            <Text style={{ color: isFriend ? 'green' : 'blue' }}>
           
            {isFriend ? 'Bạn bè' : 'Thêm b bè'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 60,
              height: 40,
              backgroundColor: "#333333",
              borderRadius: 10,
            }}
          >
            <Entypo name="menu" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{fontSize:24}}>Detail</Text>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "pink",
      }}
    >
      <Tabs.Container
      renderHeader={InforHeader}
    >
      <Tabs.Tab name="BaiViet">
      <Tabs.FlatList
          removeClippedSubviews={true}
          keyExtractor={(item, index) => index.toString()}
          data={baiviet}
          renderItem={({ item, index }) => {
            return (
             <FlatItem item={item} navigation={navigation}/> 
            )}}
        />  
         </Tabs.Tab>
    {/* //===========================Tbavidb================================================= */}
      <Tabs.Tab name="Video">
      </Tabs.Tab>
      <Tabs.Tab name="Like">
      </Tabs.Tab>
    </Tabs.Container>
    </View>
  );
};
export default SeeDeTail;
  // useEffect(() => {
    //   let mangArr = [];
    //     const fetchDataFromFirestore = async (name) => {
    //       try {
    //         const q = query(collection(firestore, 'BaiVietCaNhan'), where('name', '==', name));
    //         const querySnapshot = await getDocs(q);
    //         querySnapshot.forEach((doc) => {
    //           // console.log(doc.id, '=>', doc.data());
    //           mangArr.push(doc.data());   
    //         });
    //         setBaiviet(mangArr)
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     };
    //   // Sử dụng hàm để lấy danh sách tên trùng nhau
    //   fetchDataFromFirestore('manh')
    // }, [])