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
import { checkAndRefreshToken } from "../../confige/ComponencheckingToken.js";
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
    try {
      const getNumber = 10; // Số lượng thông báo mỗi lần tải
      const isChecked = await checkAndRefreshToken(dispath, userCurent);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
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
      console.log(error, "select thông báo tải lại ");
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
  const handlerremonotifi = (_id) => {
    const datanotification = dataNotif.filter((notifi) => {
      return notifi._id !== _id;
    });
    setDataNotifi(datanotification);
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
            flex: 0.9,
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
                handlerremonotifi={handlerremonotifi}
              />
            );
          }}
          // extraData={dataNotif}
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
