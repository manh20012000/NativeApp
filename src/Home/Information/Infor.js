import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { React, useState, useEffect, useRef } from "react";
import ViewVideo from "./ViewVideo";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Tabs, CollapsibleTabView } from "react-native-collapsible-tab-view";
import { FontAwesome, EvilIcons, AntDesign } from "@expo/vector-icons";
import VideoData from "../../Data/VideoData";
import FlatItem from "../TrangChu/FlatItem.js";
import { useSelector, useDispatch } from 'react-redux'

const Infor = ({ navigation, route }) => {

  const count = useSelector((state) => state.auth.value)
 
  const [dataVideo, setDataVideo] = useState(VideoData);

  const [dataUser, setData] = useState(count);

  const [databaiviet, setDataBaiviet] = useState([]);

  const [isLiked, setIsLiked] = useState(false);
  const handlePress = () => {
    setIsLiked(!isLiked);
    if (nblike === numberLike) {
      setnblike(nblike + 1);
    } else {
      setnblike(nblike - 1);
    }
  };
  const [SeeIF, setSeeIF] = useState(false);
  const setSeeInfor = () => {
    setSeeIF(!SeeIF);
  };
  useEffect(() => {
    const selectPostUser = async () => {
   
      try {
        const { data } = await axios.post(
          "https://nativeapp-vwvi.onrender.com/selectPost_inUser",{
            userId:dataUser._id}  
        );
        setDataBaiviet(data.data);
      } catch (err) {
        console.log(err);
        return;
  
      }
    };
    selectPostUser();
  },[])

  const InforHeader = () => {
    return (
      <View>
      <View style={styles.avatar}>
        <Image style={styles.imges} source={{ uri: dataUser.Avatar }}></Image>
      </View>
      <View style={styles.usercnhan}>

        <Text style={styles.txt}>{dataUser.Hoten}</Text>
      </View>
      <View style={styles.view4}>
        <TouchableOpacity style={styles.btn1}>
          <Text style={styles.txt1}>+ Add to story</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditProfile", dataUser);
          }}
          style={styles.btn1}
        >
          <Text style={styles.txt1}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn2}>
          <Text style={styles.txt1}>...</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.view5}>
        <Text style={{fontSize:18}}>166 friend</Text>
        <TouchableOpacity onPress={setSeeInfor}>
          <Text style={{ color: "#222222",fontSize:20}}>Giới thiệu chung</Text>
        </TouchableOpacity>
      </View>

      {SeeIF && (
        <View style={styles.thongtin}>
          <Text style={styles.txtx}>Ngày sinh {dataUser.Birth}</Text>
          <Text style={styles.txtx}>Giới tính {dataUser.Gender == "male" ? "Nam" : "Nữ"}</Text>
          <Text style={styles.txtx}>Email {dataUser.Email}</Text>
        </View>
      )}
      <View style={{width:'100%',height:2,backgroundColor:'black',marginTop:2}}></View>
    </View>
    );
  };
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <View style={{ flex: 0.2, position: "absolute", top: 30 }}>
        <Text>dhsbcdshbc</Text>
      </View>
      <Tabs.Container renderHeader={InforHeader}>
        <Tabs.Tab name="BaiViet">
          <Tabs.FlatList
            removeClippedSubviews={true}
            keyExtractor={(item, index) => index.toString()}
            data={databaiviet}
            renderItem={({ item, index }) => {
              return <FlatItem item={item} navigation={navigation} />;
            }}
          />
        </Tabs.Tab>
        <Tabs.Tab name="Video">
          <Tabs.FlatList
            removeClippedSubviews={true}
            keyExtractor={(item, index) => index.toString()}
            data={dataVideo}
            renderItem={({ item, index }) => {
              return <ViewVideo item={item} index={index} />;
            }}
            numColumns={3}
          />
        </Tabs.Tab>
        <Tabs.Tab name="Like">
          <Tabs.FlatList
            data={dataVideo}
            renderItem={({ item, index }) => {
              return <ViewVideo item={item} />;
            }}
          />
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  );
};
export default Infor;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  view1: {
    width: "100%",
    height: 400,
    justifyContent: "center",
  },
  txt: {
    fontWeight: "600",
    fontSize: 30,
  },
  touchcs: {
    width: 150,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#0066FF",
    alignItems: "center",
    justifyContent: "center",
  },
  thongtin: {
    padding: 15,
  },
  avatar: {
    width: "100%",
    height: 249,

    backgroundColor: "#333333",
  },
  usercnhan: {
    justifyContent: "space-around",
    width: "70%",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
   
    
  },
  btn1: {
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    height: 45,
    borderRadius: 10,
  },
  txt1: {
    color: "white",
    fontWeight: "600",
  },
  view4: {
    flexDirection: "row",
    width: "100%",
    padding: 5,
    justifyContent: "space-around",
  },
  btn2: {
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 45,
    backgroundColor: "blue",
  },
  view5: {
    paddingHorizontal: 20,
  },
  txt3: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",
  },
  imges: {
    width: "100%",
    height: 250,
    borderWidth: 2,
    borderColor: "red",
  },
  avata: {
    width: 130,
    height: 130,
    borderRadius: 100,
    backgroundColor: "#333333",
  },
});

//
// const fetchDataByName = async (name) => {
//   const q = query(collection(firestore, "your_collection_name"), where("name", "==", name));
//   const querySnapshot = await getDocs(q);

//   const data = [];
//   querySnapshot.forEach((doc) => {
//     data.push(doc.data());
//   });
//useEffect(() => {
//   const fectData = async () => {
//     try {
//     const querySnapshot = await getDocs(collection(firestore, 'user'));
//       querySnapshot.forEach((doc) => {
//         setData(doc.data());
//       });
//        const baiviet=await getDocs(collection(firestore, 'BaiVietCaNhan'))
//         const array=[]
//         baiviet.forEach((doc) => {
//           array.push(doc.data())
//         });
//         setDataBaiviet(array)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   fectData();
// }, [])
