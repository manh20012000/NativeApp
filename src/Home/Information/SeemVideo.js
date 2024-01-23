import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  AppState,
  RefreshControl,
  TextInput,
} from "react-native";
import { React, useState, useEffect, useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import { firestore } from "../../../Confige.js";
import { collection, getDocs } from "firebase/firestore";
import path from "../../config.js";
import axios from "axios";
// import {
//   createBottomTabNavigator,
//   useBottomTabBarHeight,
// } from "@react-navigation/bottom-tabs";
import VideoItem from "../Video/VideoItem";
const SeemVideo = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  //   const bottomTabHight = useBottomTabBarHeight();

  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [action, setAction] = useState(false);
  const { selectedVideo, dataVideo,index } = route.params;
  const [data, setData] = useState([]);
  useEffect(() => {
    const addVideo = () => {
      console.log('hjajaja')
      setData((prevData) => [...prevData, selectedVideo]);
    };
    addVideo();
  }, []);
  useFocusEffect(
    useCallback(() => {
      // Thay đổi action để phát video đầu tiên
      setAction(true); // hoặc setAction(indexCuaVideoDauTien);
      return () => {
        // Reset lại action khi rời khỏi màn hình TikTok
        setAction(false);
      };
      console.log('haha2')
      console.log(data,'data',selectedVideo)
    }, [])
  );
  useEffect(() => {
    setAction(currentTabIndex);
  }, [currentTabIndex]);
  const [leng, setLeng] = useState(0);

  const handlerSelectVideo = async () => {
    try {
      const lim = 5; // Định nghĩa giá trị lim
      console.log('hahaha',index)
      const { data } = await axios.post(`${path}/selectVideo`, {
        limiteds: index, // Gửi dữ liệu với key là 'limiteds'
        skip: leng,
      });
      const updatedComments =data.data.filter((item) => item._id !== selectedVideo._id);
      setLeng(leng + 5);
      setData((prevData) => prevData.concat(updatedComments));
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
  const [currentViewableItemIndex, setCurrentViewableItemIndex] = useState(0);
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentViewableItemIndex(viewableItems[0].index ?? 0);
    }
  };
  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);
  return (
    <View
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <View
        style={{
          position: "absolute",
          backgroundColor: "transparent",
          width: "95%",
          height: 50,
          top: 20,
          left: 10,
          right: 10,
          bottom: 30,
          zIndex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Infor");
          }}
        >
          <Ionicons name="arrow-back-sharp" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "80%",
            height: 20,
            borderWidth: 1,
            borderColor: "#999999",
            height: 40,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "300", color: "white" }}>đề xuất</Text>
            <Ionicons name="search" size={20} color="white" />
          </View>
          <View>
            <Text style={{ color: "white", fontWeight: "300" }}>Search</Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
       
        data={data}
        pagingEnabled
        initialNumToRender={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
         
          return (
            <VideoItem
              item={item}
              action={index === currentViewableItemIndex}
              index={index}
              navigation={navigation}
              //   isCurrentVideo={item === selectedVideo}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        // onScroll={(e) => {
        //   const index = Math.round(
        //     e.nativeEvent.contentOffset.y / (810 - bottomTabHight)
        //   );
        //   setAction(index);
        // }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        removeClippedSubviews
        onEndReached={handlerSelectVideo}
        onEndReachedThreshold={(0, 5)}
      />
      <View
        style={{
          width: "100%",
          height: 47,
          flexDirection: "row",
          backgroundColor: "black",
          paddingHorizontal: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholderTextColor="#888888"
          placeholder="Add comment..."
          style={{ fontSize: 17, color: "white", width: "60" }}
        ></TextInput>
        <View
          style={{
            width: "30%",
            height: 50,
            flexDirection: "row",
            backgroundColor: "black",
            paddingHorizontal: 20,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Text style={{ fontWeight: "bold", fontSize: 22, color: "white" }}>
              @
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ fontWeight: "bold", fontSize: 22, color: "white" }}>
              😒
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default SeemVideo;
const styles = StyleSheet.create({});