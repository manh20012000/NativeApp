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
import path from "../../config.js";
import axios from "axios";
import {
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";
const bootonTba = createBottomTabNavigator();
const VideoTikTok = ({ navigation}) => {
  const [selectedTab, setSelectedTab] = useState("For Your");
  // console.log(dataUser)
  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
  };

  const renderTabs = (tabName) => {
    const isSelected = selectedTab === tabName;
    return (
      <TouchableOpacity
        key={tabName}
        onPress={() => handleTabPress(tabName)}
        style={{
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontSize: 13,
            fontWeight: "700",
            color: isSelected ? "white" : "rgba(255, 255, 255, 0.5)",
            borderBottomWidth: isSelected ? 4 : 0,

            borderBottomColor: isSelected ? "white" : "transparent",
          }}
        >
          {tabName}
        </Text>
      </TouchableOpacity>
    );
  };
  const [isLoading, setIsLoading] = useState(true);
  const bottomTabHight = useBottomTabBarHeight();
  const [data, setData] = useState([]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [action, setAction] = useState(false);

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
  useEffect(() => {
    setAction(currentTabIndex);
  }, [currentTabIndex]);
  const handlerSelectVideo = async () => {
    try {
      const lim = 10; // Định nghĩa giá trị lim

      const { data } = await axios.post(
        `${path}/selectVideo`,
        {
          limiteds: lim, // Gửi dữ liệu với key là 'limiteds'
        }
      );

      setData(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handlerSelectVideo();
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    handlerSelectVideo();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  const handleLoadMore = async () => {
    // setRefreshing(true);
    try {
      const { data } = await axios.post(
        // "http://192.168.57.244:8080/selectVideo"
        `${path}/selectVideo`,
        {
          limiteds: 8,
        }
      );

      setData((prevData) => prevData.concat(data.data));
      // setRefreshing(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={{ height: 760, backgroundColor: "black" }}>
      <FlatList
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
          setAction(index);
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        removeClippedSubviews
        onEndReached={handleLoadMore}
        onEndReachedThreshold={(0, 5)}
      />
    </View>
  );
};
export default VideoTikTok;
const styles = StyleSheet.create({});
