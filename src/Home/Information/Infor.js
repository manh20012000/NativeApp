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
import { React, useState, useEffect, useRef, useCallback } from "react";
import ViewVideo from "./ViewVideo";

import axios from "axios";
import { collection, getDocs } from "firebase/firestore";

import { Tabs, CollapsibleTabView } from "react-native-collapsible-tab-view";
import VideoData from "../../Data/VideoData";
import FlatItem from "../TrangChu/FlatItem.js";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import path from "../../confige/config.js";
import { login, logout } from "../../Redex/Reducer/auth.slice.js";
import { HandlerNotification } from "../../confige/Util_handlerNotification.js";
import { checkAndRefreshToken } from "../../confige/ComponencheckingToken.js";
const Infor = ({ navigation, route }) => {
  const count = useSelector((state) => state.auth.value);
  // console.log(count,'usser counet')
  const dispath = useDispatch();
  const [dataUser, setDatauUser] = useState(count);
  const [databaiviet, setDataBaiviet] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataVideo, setDataVideo] = useState([]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [action, setAction] = useState(false);
  const [inforUser, setUserInfor] = useState();
  useFocusEffect(
    useCallback(() => {
      // Thay đổi action để phát video đầu tiên
      setAction(true); // hoặc setAction(indexCuaVideoDauTien);
      return () => {
        // Reset lại action khi rời khỏi màn hình TikTok
        setAction(false);
      };
    }, [])
  );
  const selectUser = async () => {
    try {
      const isChecked = await checkAndRefreshToken(dispath, count);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        const { data } = await axios.post(
          `${path}/userInfor`,
          {
            _id: isChecked._id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
            },
          }
        );

        setUserInfor(data.data);

        // console.log("user", data.data);
      }
    } catch (err) {
      console.log(err, " lỗi với màn hình inforjs");
    }
  };
  useEffect(() => {
    setAction(currentTabIndex);
  }, [currentTabIndex]);
  const [leng, setLeng] = useState(5);

  const handlerSelectVideo = async () => {
    try {
      const isChecked = await checkAndRefreshToken(dispath, count);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        const { data } = await axios.post(
          `${path}/selectedVideoId`,
          {
            skip: leng,
            id: count._id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
            },
          }
        );
        setLeng(leng + 5);
        setDataVideo((prevData) => prevData.concat(data.data));
      }
    } catch (err) {
      console.log(err, "log loi infor user222");
    }
  };
  useEffect(() => {
    handlerSelectVideo();
    selectUser();
  }, []);
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const isChecked = await checkAndRefreshToken(dispath, count);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        const lim = 9; // Định nghĩa giá trị lim
        const { data } = await axios.post(
          `${path}/selectedVideoId`,
          {
            limiteds: lim, // Gửi dữ liệu với key là 'limiteds'
            skip: leng,
            id: count._id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
            },
          }
        );
        setLeng(leng + 3);
        setDataVideo((prevData) => prevData.concat(data.data));
      }
    } catch (err) {
      console.log(err, "loi vưới selectedVideoId");
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

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
  // const handlerSlectVideo = async () => {};
  useEffect(() => {
    const selectPostUser = async () => {
      try {
        const isChecked = await checkAndRefreshToken(dispath, count);
        if (!isChecked) {
          console.log("Token hết hạn, cần đăng nhập lại");
          // Thực hiện điều hướng về trang đăng nhập nếu cần
          return null;
        } else {
          const { data } = await axios.post(
            `${path}/selectPost_inUser`,
            {
              userId: isChecked._id,
            },
            {
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
              },
            }
          );
          // console.log(data, "trang thái");
          // setIsFriend(data.trangthai);
          setDataBaiviet(data.data);
        }
      } catch (err) {
        console.log(err, "lỗi vơis lấy dữ luêuj ra màn seedetail ");
      }
    };
    selectPostUser();
  }, []);
  const InforHeader = () => {
    return (
      <View>
        <View style={styles.avatar}>
          <Image style={styles.imges} source={{ uri: dataUser.Avatar }}></Image>
        </View>
        <View style={styles.usercnhan}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 40 }}
            source={{ uri: dataUser.Avatar }}
          ></Image>

          <Text style={styles.txt}>{dataUser.Hoten}</Text>
        </View>
        <View style={styles.view4}>
          <TouchableOpacity style={styles.btn1}>
            <Text style={styles.txt1}>+ Add to story</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditProfile", inforUser);
            }}
            style={styles.btn1}
          >
            <Text style={styles.txt1}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SetTingInfor", inforUser)}
            style={styles.btn2}
          >
            <Text style={styles.txt1}>...</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.view5}>
          <Text style={{ fontSize: 18 }}>166 friend</Text>
          <TouchableOpacity onPress={setSeeInfor}>
            <Text style={{ color: "#222222", fontSize: 20 }}>
              Giới thiệu chung
            </Text>
          </TouchableOpacity>
        </View>

        {SeeIF && (
          <View style={styles.thongtin}>
            <Text style={styles.txtx}>Ngày sinh {inforUser.Birth}</Text>
            <Text style={styles.txtx}>
              Giới tính {inforUser.Gender == "male" ? "Nam" : "Nữ"}
            </Text>
            <Text style={styles.txtx}>Email {inforUser.Email}</Text>
          </View>
        )}
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "black",
            marginTop: 2,
          }}
        ></View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, position: "relative" }}>
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
              return (
                <ViewVideo
                  item={item}
                  index={index}
                  dataVideo={dataVideo}
                  navigation={navigation}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
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
    width: "50%",
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
