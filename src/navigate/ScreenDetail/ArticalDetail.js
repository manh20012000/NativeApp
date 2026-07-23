import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { checkingToken } from "../../confige/CheckingToken";
import { login } from "../../Redex/Reducer/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import FlatItem from "../../Home/TrangChu/FlatItem";
import path from "../../confige/config";
import { Ionicons } from "@expo/vector-icons";
import SkeletonApp from "../../Skeleton/SkeletonApp";
import { checkAndRefreshToken } from "../../confige/ComponencheckingToken";
const ArticalDetail = ({ navigation, route }) => {
  const dispath = useDispatch();
  const userCurent = useSelector((state) => state.auth.value);
  //   console.log(route.params);
  const [data, setdata] = useState({});
  const [isloading, setIsloading] = useState(false);
  const pramsroute = route.params;

  useEffect(() => {
    const handler = async () => {
      try {
        const isChecked = await checkAndRefreshToken(dispath, userCurent);
        if (!isChecked) {
          console.log("Token hết hạn, cần đăng nhập lại");
          // Thực hiện điều hướng về trang đăng nhập nếu cần
          return null;
        } else {
          const { data } = await axios.get(
            `${path}/get_Article_Getone/${pramsroute.idOjectModel}`, //idOjectmodal là id bài viết được lấy từ thông báo
            {
              params: {
                id: pramsroute._id, //id của thông báo
                iread: pramsroute.isRead, //trạng thái đã đọc hay chưa
              },
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
              },
            }
          );
          //   console.log(data.data);
          setdata(data.data); // lấy ra thông tin của bài viết đó
          setIsloading(true);
        }
      } catch (err) {
        setIsloading(false);
        // navigation.navigate("Login");
        console.log(err, "lấy ở màn hình detailAticle");
      }
    };
    handler();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#666666" }}>
      <TouchableOpacity
        style={{
          width: "20%",
          height: "4%",
          alignItems: 'center',
          justifyContent: "space-between",
          paddingVertical: "1%",
          paddingHorizontal: "2%",
          flexDirection: 'row'
        }}
        onPress={() => {
          navigation.goBack();
          setIsloading(false);
        }}
      >
        <Ionicons name="arrow-back" size={26} color="white" />
        <Text style={{ fontWeight: 'bold', color: 'white' }}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor: '#777777', width: '100%',
        borderRadius: 10,
        height: '6%', paddingHorizontal: '10%', alignContent: 'center', justifyContent: 'center'
      }}>
        <Text style={{ fontSize: 20, fontWeight: "300", color: "white", }}>
          Search
        </Text>
      </TouchableOpacity>

      {isloading ? ( // Sử dụng dấu ngoặc nhọn để bao bọc
        <FlatItem
          item={data}
          index={1}
          userDn={userCurent._id}
          navigation={navigation}
        />
      ) : (
        <View>
          <Text>Loading...</Text>

          <SkeletonApp trangthai={isloading} />
        </View>
      )}
    </View>
  );
};
export default ArticalDetail;
const styles = StyleSheet.create({});
