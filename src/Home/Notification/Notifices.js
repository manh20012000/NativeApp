import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  PermissionsAndroid,
  useWindowDimensions,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Style.js";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { firestore } from "../../../Confige.js";
import { login } from "../../Redex/Reducer/auth.slice.js";
import { checkingToken } from "../../confige/CheckingToken.js";
import { useDispatch, useSelector } from "react-redux";
import NotificationComponent from "./componentNotifi/notificationComponent.js";
import axios from "axios";
import path from "../../confige/config.js";
const Notifices = ({ navigation }) => {
  const dispath = useDispatch();
  const userCurent = useSelector((state) => state.auth.value);
  const { width, height } = useWindowDimensions();
  const [dataNotif, setDataNotifi] = useState([]);
  const [page, setPage] = useState(1); // Trang hiện tại
  const [loading, setLoading] = useState(false); // Trạng thái tải thêm dữ liệu
  const [hasMore, setHasMore] = useState(true); // Còn dữ liệu để tải hay không
  const [refreshing, setRefreshing] = useState(false);
  const getNotification = async (newPage) => {
    console.log("thực hiện hành vi hiển thị thông báo ");
    try {
      const getNumber = 10; // Số lượng thông báo mỗi lần tải
      const isChecked = await checkingToken.checking(userCurent);
      // console.log(userCurent.accessToken);
      // console.log(isChecked, "gias tri sau checked");
      if (typeof isChecked === "object" && isChecked !== null) {
        dispath(login(isChecked));
        const { data } = await axios.get(
          `${path}/getnotification/${isChecked._id}?page=${newPage}&limit=${getNumber}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
            },
          }
        );

        setDataNotifi(data.data);
      }
    } catch (error) {
      console.log(error, "select thông báo");
    }
  };
  useEffect(() => {
    getNotification(page);
  }, []);
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      getNotification(page + 1); // Tải trang tiếp theo
      setPage(page + 1);
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    getNotification(1);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <View style={{ backgroundColor: "#555555", flex: 1 }}>
      <View
        style={{
          height: "5%",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "2%",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
          Notification
        </Text>
        <TouchableOpacity>
          <Feather name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View
        style={{ width: width, height: 1, backgroundColor: "white" }}
      ></View>
      <View
        style={{
          height: height,
          justifyContent: "flex-end",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "white",
            paddingHorizontal: 20,
          }}
        >
          New
        </Text>
        <FlatList
          style={{
            flex: 1,
            backgroundColor: "#555555",
          }}
          data={dataNotif}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <NotificationComponent
                item={item}
                index={index}
                navigation={navigation}
              />
            );
          }}
          extraData={dataNotif}
          onEndReached={handleLoadMore} // Sự kiện cuộn đến cuối
          onEndReachedThreshold={0.5} // Cuộn đến 50% cuối danh sách
          ListFooterComponent={
            loading ? <Text style={{ color: "white" }}>Loading...</Text> : null
          } // Hiển thị khi đang tải thêm
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};
export default Notifices;
