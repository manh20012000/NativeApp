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
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../Redex/Reducer/auth.slice.js";
import { checkAndRefreshToken } from "../../confige/ComponencheckingToken.js";
import { useIsFocused } from "@react-navigation/native";
const VideoLocation = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const bottomTabHight = useBottomTabBarHeight();
  const [data, setData] = useState([]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [action, setAction] = useState(false);
  let trangthai = true;
    const count = useSelector((state) => state.auth.value);
  const [leng, setLeng] = useState(0);
   const dispath = useDispatch();
  const handlerSelectVideo = async () => {
    try {
       const isChecked = await checkAndRefreshToken(dispath, count);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        const lim = 5; // Định nghĩa giá trị lim
        const { data } = await axios.post(`${path}/selectVideo`, {
          limiteds: lim, // Gửi dữ liệu với key là 'limiteds'
          skip: leng,
        });
        setLeng(leng + 5);
        setData((prevData) => prevData.concat(data.data));
      } 
    } catch (err) {
      console.log(err, "màn hinh videolocatin1");
    }
  };
  useEffect(() => {
    trangthai = true;
    if (isFocused) {
      if (trangthai == true) {
        handlerSelectVideo();
      }
      setAction(currentTabIndex);
    } else {
      setAction(false);
    }
    trangthai = false;
    return () => {
      // Hàm cleanup (nếu cần)
    };
  }, [isFocused]);

  // useEffect(() => {
  //   handlerSelectVideo();
  // }, [trangthai]);
  const onRefresh = async () => {
    setRefreshing(true);
    setLeng(0);
    try {
      // Gọi handlerSelectVideo và đợi nó hoàn thành

      try {
        const lim = 5; // Định nghĩa giá trị lim

        const { data } = await axios.post(`${path}/selectVideo`, {
          limiteds: lim, // Gửi dữ liệu với key là 'limiteds'
          skip: 0,
        });
        setData([]);
        setData(data.data);
      } catch (err) {
        console.log(err, "màn hình videolocation2");
      }
    } catch (err) {
      console.log(err, "man hình videolocation3");
    } finally {
      // Kết thúc setRefreshing sau một khoảng thời gian
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }
  };
  return (
    <View style={{ backgroundColor: "black" }}>
      <FlatList
        style={{ backgroundColor: "black" }}
        data={data}
        pagingEnabled
        initialNumToRender={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <VideoItem
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        removeClippedSubviews
        onEndReached={handlerSelectVideo}
        onEndReachedThreshold={(0, 5)}
      />
    </View>
  );
};
export default VideoLocation;
const styles = StyleSheet.create({});
