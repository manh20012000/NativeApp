import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  AppState,
  RefreshControl,
} from "react-native";
import { React, useState, useEffect, useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import VideoItem from "./VideoItem.js";
import { firestore } from "../../../Confige.js";
import { collection, getDocs } from "firebase/firestore";
import path from "../../confige/config.js";
import axios from "axios";
import {
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";
import { checkAndRefreshToken } from "../../confige/ComponencheckingToken.js";
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
const bootonTba = createBottomTabNavigator();
const VideoTikTok = ({ navigation }) => {
  const isFocused = useIsFocused();
  const count = useSelector((state) => state.auth.value);
  const dispath = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const bottomTabHight = useBottomTabBarHeight();
  const [data, setData] = useState([]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [action, setAction] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (isFocused) {
      setAction(currentTabIndex);
    } else {
      setAction(false);
    }
    return () => {
      // Hàm cleanup (nếu cần)
    };
  }, [isFocused]);

  useEffect(() => {
    setAction(currentTabIndex);
  }, [currentTabIndex]);
  const [leng, setLeng] = useState(0);

  const handlerSelectVideo = async () => {
    try {
      // Định nghĩa giá trị lim
      const isChecked = await checkAndRefreshToken(dispath, count);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        console.log(leng);
        const { data } = await axios.post(
          `${path}/selectVideo`,
          {
            skip: leng,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
            },
          }
        );

        if (data.data != null && data.data.length > 0) {
          setLeng(leng + 5);
          setData((prevData) => prevData.concat(data.data));
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handlerSelectVideo();
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
        const { data } = await axios.post(
          `${path}/selectVideo`,
          {
            skip: leng,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
            },
          }
        );
        setData([]);
        setData(data.data);
        setLeng(leng + 5);
      }
    } catch (err) {
      console.log(err);
    } finally {
      // Kết thúc setRefreshing sau một khoảng thời gian
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }
  };
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      {!loading && (
        <FlatList
          style={{ flex: 1, backgroundColor: "black" }}
          // contentContainerStyle={{
          //   flexGrow: 1,
          //   justifyContent: "center",
          //   backgroundColor: "green",
          //   alignContent: "center",
          // }}
          data={data}
          pagingEnabled
          maxToRenderPerBatch={5}
          initialNumToRender={4}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <VideoItem
                style={{ flex: 1 }}
                item={item}
                action={action === index}
                navigation={navigation}
              />
            );
          }}
          onScroll={(e) => {
            const index = Math.round(
              e.nativeEvent.contentOffset.y / (810 - bottomTabHight)
            );
            setCurrentTabIndex(index);
            setAction(index);
          }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            loading ? <Text style={{ color: "white" }}>Loading...</Text> : null
          } // Hiển
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={handlerSelectVideo} // Sự kiện cuộn đến cuối
          onEndReachedThreshold={0.5} // Cuộn đến 50% cuối danh sách
        />
      )}
      {loading && <View style={{ flex: 1, backgroundColor: "black" }}></View>}
    </View>
  );
};
export default VideoTikTok;
const styles = StyleSheet.create({});
// const [selectedTab, setSelectedTab] = useState("For Your");
// // console.log(dataUser)
// const handleTabPress = (tabName) => {
//   setSelectedTab(tabName);
// };

// const renderTabs = (tabName) => {
//   const isSelected = selectedTab === tabName;
//   return (
//     <TouchableOpacity
//       key={tabName}
//       onPress={() => handleTabPress(tabName)}
//       style={{
//         paddingHorizontal: 10,
//       }}
//     >
//       <Text
//         style={{
//           fontSize: 13,
//           fontWeight: "700",
//           color: isSelected ? "white" : "rgba(255, 255, 255, 0.5)",
//           borderBottomWidth: isSelected ? 4 : 0,

//           borderBottomColor: isSelected ? "white" : "transparent",
//         }}
//       >
//         {tabName}
//       </Text>
//     </TouchableOpacity>
//   );
// };
// useFocusEffect(
//   useCallback(() => {
//     // Thay đổi action để phát video đầu tiên
//     setAction(true); // hoặc setAction(indexCuaVideoDauTien);
//     return () => {
//       // Reset lại action khi rời khỏi màn hình TikTok
//       setAction(false);
//     };
//   }, [])
// );
