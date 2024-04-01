import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Item,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  BackHandler,
  Alert,
  RefreshControl,useWindowDimensions, Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { React, useState, useEffect, useRef, memo, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import DataOjs from "../../Data/DataObj.js";
import FlatItem from "./FlatItem.js";
import styles from "./StyleTrangchu.js";
import SeeDeTail from "./SeeDeTail.js";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../Confige.js";
import { useNavigation } from "@react-navigation/native";
import { Video, ResizeMode } from "expo-av";
import screenfull from "screenfull";
import VideoPlayer from "expo-video-player";
import { useDispatch, useSelector } from "react-redux";
import { setVideoPlaying } from "../../Redex/Reducer/handlerNaviVideo.js";
import axios from "axios";
import path from "../../config.js";
import SkeletonApp from "../../SkeletonApp.js";
import Skeleton from "../../Skeleton.js";
const TrangChu = ({ navigation }) => {
  const user = useSelector((state) => state.auth.value);
  // console.log(user)
  const { width } = useWindowDimensions();
  const [userStory, setUserStory] = useState({}); // danh cho story
  const [data, setData] = useState([{ index: 1 }]);
  const [isLoading, setIsLoading] = useState(true);
  const [fullscreen, setfullscreen] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [dataStory, setDataStory] = useState([{ index: 1 }]);
  const [leng, setLeng] = useState(0);
  const [SakeIload2, setSakeIload2] = useState(false);
  const handlerSelectVideoStory = async () => {
    try {
      const lim = 5; // Định nghĩa giá trị lim
      const { data } = await axios.post(`${path}/selectStory`, {
        limiteds: lim, // Gửi dữ liệu với key là 'limiteds'
        skip: leng,
      });
      setLeng(leng + 3);
      // console.log(data.data)
      if (data.data != null && data.data.length > 0) {
        // setDataStory((prevData) => prevData.concat(data.data));
      }
      setDataStory(data.data);
      setSakeIload2(true);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  const [SakeIload, setSakeIload] = useState(false);
  const [isSakeIload, setSakecheck] = useState(true);
  const fetchdata = async () => {
    try {
      const { data } = await axios.get(
        `${path}/selectBaiViet`
      );

      setData(data.data);
      setSakeIload(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handlerSelectVideoStory();
    fetchdata();
  }, []);
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Hold on!", "ban co chac muon thoat", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel",
  //       },
  //       { text: "YES", onPress: () => BackHandler.exitApp() },
  //     ]);
  //     return true;
  //   };
  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );
  //   return () => backHandler.remove();
  // }, []);

  const urlVideo = useRef(
    "https://v.pinimg.com/videos/mc/720p/c9/22/d8/c922d8391146cc2fdbeb367e8da0d61f.mp4"
  ).current;
  const videoe = useRef(true);
  const handleFullscreen = () => {
    setIsLoading(true);
    setfullscreen(true);
  };
  const str = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("bhdshbh");
        }}
        style={{
          width: 100,
          height: 150,
          padding: 4,
          borderWidth: 1,
          borderRadius: 13,
          position: "relative",
          marginHorizontal: 6,
        }}
      >
        <Image
          style={{
            width: "100%",
            flex: 0.7,
            height: "70%",
          }}
          source={{ uri: user.Avatar }}
        ></Image>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 30,
            backgroundColor: "white",
            position: "absolute",
            bottom: 30,
            right: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ alignItems: "center" }}>+</Text>
        </View>
        <View
          style={{
            flex: 0.3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ alignItems: "center", marginTop: 10 }}>Tạo Tin </Text>
        </View>
      </TouchableOpacity>
    );
  };
  //  lam hien thi vooi story
  const onRefresh = () => {
    setRefreshing(true);
    fetchdata();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  const video = useRef(null);
  const FlatStory = memo(() => {
    return (
      <View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 30,
                fontWeight: "800",
                marginLeft: 30,
              }}
            >
              MisMix
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: 90,
                backgroundColor: "white",
                marginRight: 15,
                marginVertical: 10,
                borderRadius: 40,
                padding: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              onPress={() => {
                navigation.navigate("Timkiem");
              }}
            >
              <Text>search </Text>
              <Feather name="search" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Mess");
              }}
            >
              <FontAwesome5 name="facebook-messenger" size={33} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: 55,
            backgroundColor: "#111111",
            alignItems: "center",
            paddingHorizontal: 15,
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <View
            style={{
              width: 45,
              height: 45,
              borderRadius: 30,
              backgroundColor: "#999999",
            }}
          >
            <Image
              style={{
                width: 45,
                height: 45,
                borderRadius: 30,
              }}
              source={{ uri: user.Avatar }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("UserThink", user);
            }}
            style={{
              width: 230,
              height: 40,
              backgroundColor: "#999999",
              borderRadius: 15,
              borderWidth: 1,
              borderColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>Bạn đang nghĩ gì </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="images-outline" size={24} color="#00FF00" />
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={dataStory}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={str}
          renderItem={({ item, index }) => {
            return SakeIload2 ? (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setIsViewerOpen(true);
                    setUserStory({
                      name: item.User.Hoten,
                      video: item.VideoOrImage,
                      avata: item.User.Avatar,
                      iduser: item.User._id,
                    });
                  }}
                  style={{
                    width: 100,
                    height: 150,
                    borderWidth: 1,
                    borderRadius: 13,
                    position: "relative",
                    marginHorizontal: 5,
                  }}
                >
                  <Video
                    source={{ uri: item.VideoOrImage }} // link tinht
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 13,
                      position: "absolute",
                      backgroundColor: "black",
                    }}
                    resizeMode="cover"
                    isLooping
                  />
                  <Image
                    source={{ uri: item.User.Avatar }}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 34,
                      marginHorizontal: 6,
                      marginLeft: 10,
                      position: "absolute",
                      top: 5,
                    }}
                  ></Image>
                  <Text
                    style={{
                      bottom: 4,
                      marginHorizontal: 5,
                      color: "white",
                      position: "absolute",
                    }}
                  >
                    {item.User.Hoten}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  width: 250,
                  justifyContent: "space-between",
                  height: 150,
                }}
              >
                <Skeleton width={120} height={150} borderRadius={10} trangthai={ isSakeIload} />
                <Skeleton width={120} height={150} borderRadius={10} trangthai={ isSakeIload}/>
          </View>
            );
          }}
        />
      </View>
    );
  });
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["red", "white", "purple"]}
        style={styles.linagradine}
      >
        <FlatList
          data={data}
          ListHeaderComponent={FlatStory}
          keyExtractor={(item, index) => index.toString()}
          removeClippedSubviews={true}
          renderItem={({ item, index }) => {
            // console.log(SakeIload)
            return SakeIload ? (
              <FlatItem
                item={item}
                index={index}
                userDn={user._id}
                navigation={navigation} //width={120}height={100}style={{borderRadius:10}}
              />
            ) : (
              <SkeletonApp trangthai={ isSakeIload}/>
            );
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        ></FlatList>
      </LinearGradient>
      {isViewerOpen && (
        <Modal visible={true} transparent={true}>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <View
              style={{
                borderRadius: 34,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 15,
              }}
            >
              {/* name: item.User,
                      video: item.VideoOrImage,
                      avata: item.avata,
                      iduser:item.User._id */}
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{ uri: userStory.avata }}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 34,
                    borderWidth: 2,
                    borderColor: "red",
                  }}
                ></Image>
                <Text
                  style={{
                    fontSize: 20,
                    margin: 15,
                    fontWeight: "800",
                  }}
                >
                  {userStory.name}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setIsViewerOpen(false);
                }}
                style={{
                  width: 30,
                  height: 33,
                  borderRadius: 40,
                  marginLeft: 4,
                }}
              >
                <Text
                  style={{ fontSize: 25, color: "black", textAlign: "center" }}
                >
                  x
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10 }}>
              <Video
                ref={videoe}
                source={{ uri: userStory.video }} // link tinht
                style={{
                  width: "100%",
                  height: "95%",
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
  );
};
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
//                 )}//set trang thai thoat cho trang chu
// useEffect(() => {
//   const backAction = () => {
//     Alert.alert('Hold on!', 'ban co chac muon thoat', [
//       {
//         text: 'Cancel',
//         onPress: () => null,
//         style: 'cancel',
//       },
//       {text: 'YES', onPress: () => BackHandler.exitApp()},
//     ]);
//     return true;
//   };
//   const backHandler = BackHandler.addEventListener(
//     'hardwareBackPress',
//     backAction,
//   );
//   return () => backHandler.remove();
// }, []);
// ste trang thai thai cuar no tai vi tri thioat voi dong ben tren
// useEffect(() => {
//   const fetchDataFromFirestore = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(firestore, 'user'));
//       await querySnapshot.forEach((doc) => {
//         // console.log(doc.id, '=>', doc.data());
//         setUser(doc.data())
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   fetchDataFromFirestore();
// }, []);
// thục hien  su lý video
/*import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

import { React, useEffect, useState } from "react";
import DataOjs from "../../../Data/DataObj";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import io from "socket.io-client";
import path from "../../../config.js";
import { useSelector, useDispatch } from "react-redux";
const socket = io(`${path}`);
const Chat = ({ navigation }) => {
  const [filter, setFillter] = useState([]);
  const SelectUserMessage = async () => {
    try {
      const { data } = await axios.get(`${path}/UserRouter`);
      // console.log(data, "data selector");
      setFillter(data);
    } catch (error) {
      console.log(error, "lỗi nhânj với ");
    } finally {
      // console.log(dataUserChat)
    }
  };
  const user = useSelector((state) => state.auth.value);
  useEffect(() => {
    SelectUserMessage();
  }, []);
  useEffect(() => {
    const getPersionChat = async () => {
      try {
        const { data } = await axios.post(`${path}/selectChatPersion`, {
          _id: user._id,
        });
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };
  }, []);
  const [Seach, setSeach] = useState("");

  const handlerSearch = (text) => {
    setSeach(text);
    const filterData = filter.filter((value) =>
      value.name.toLowerCase().includes(text.toLowerCase())
    );

    setFillter(filterData);
  };

  const str = () => {
    return (
      <View>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            marginRight: 4,
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity>
            <Text style={{ fontWeight: "300", fontSize: 30 }}>+</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 12 }}>seemore</Text>
        </View>
      </View>
    );
  };
  const seach = () => {
    return (
      <View style={{  justifyContent: "center",backgroundColor:'pink'}}>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 350,
              backgroundColor: "white",
              marginRight: 15,
              borderRadius: 40,
              padding: 8,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              style={{ width: 300 }}
              placeholder="nhâp tìm kiếm"
              value={Seach}
              onChangeText={handlerSearch}
            ></TextInput>
            <TouchableOpacity>
              <Feather name="search" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: "50%",
            marginTop: 10,
            justifyContent: "center",
            // alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <FlatList
            ListHeaderComponent={str}
            horizontal
            data={filter}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={{
                    height: "100%",
                    width: "auto",
                    // justifyContent: "center",
                  }}
                >
                  <View style={{ justifyContent: "center" }}>
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: "white",
                        marginLeft: 15,
                      }}
                    >
                      <Image
                        source={{ uri: item.Avatar }}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                        }}
                      ></Image>
                    </View>

                    <View style={{ justifyContent: "center" }}>
                      <Text
                        style={{
                          color: "white",
                          width: "auto",
                          fontSize: 12,
                          height: 25,
                          marginLeft: 10,
                          textAlign: "center",
                          fontWeight: "400",
                        }}
                      >
                        {item.Hoten}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  };
  const DetaiHandress = () => {
    props.navigation.navigate("SeeDeTail", props.item);
  };
  return (
   
    <FlatList
      style={{backgroundColor:'black'}}
        ListHeaderComponent={seach}
        data={DataOjs}
      renderItem={({ item, index }) => {
          console.log(index)
          return (
            <View
              style={{
                marginHorizontal:5,
                width: "90%",
                height: "100%",
                flexDirection: "row",
                paddingVertical:1
                            }}
             
            >
              <View
                style={{
                  width: "auto",
                  height: 120,
                }}
               
              >
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 64,
                    marginHorizontal: 6,
                    backgroundColor:'pink'
                  }}
                >
                  <Image
                    source={{ uri: item.avatar }}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 64,
                      marginHorizontal: 6,
                    }}
                  ></Image>
                  <Text
                      style={{
                        color: "#00FF00",
                        fontSize: 70,
                        position: "absolute",
                        right: 30,
                        bottom:14,
                      }}
                    >
                      {item.trangthai}
                    </Text>
                </View>
              </View>
              <TouchableOpacity
              onPress={() => {
                navigation.navigate("PesionChat", item);
                }}
                style={{}}>
                <Text
                  style={{
                    fontSize: 19,
                    color: "white",
                    fontWeight: "800",
                  }}
                >
                  {item.Hoten}
                </Text>
                <Text style={{ color: "white" }}>Cin chào bạn nha </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      ></FlatList>
  );
};
export default Chat;
const styles = StyleSheet.create({
  header: {
    width: "100%",
    justifyContent: "center",
    height: "8%",
    backgroundColor: "black",
    flex: 0.08,
    flexDirection: "row",
  },
});
*/
