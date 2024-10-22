import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { checkingToken } from "../../confige/CheckingToken";
import { login } from "../../Redex/Reducer/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import FlatItem from "../../Home/TrangChu/FlatItem";
import VideoItem from "../../Home/Video/VideoItem";
import path from "../../confige/config";
import { checkAndRefreshToken } from "../../confige/ComponencheckingToken";
const Videodetail = ({ navigation, route }) => {
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
            `${path}/videoSingger/${pramsroute.idOjectModel}`, //idOjectmodal là id bài viết được lấy từ thông báo
            {
            
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
              },
            }
          );
            console.log(data.data);
          setdata(data.data); // lấy ra thông tin của bài viết đó
          setIsloading(true)
        }
      } catch (err) {
        setIsloading(true)
        // navigation.navigate("Login");
        console.log(err, "lấy ở màn hình detailAticle");
      }
    };
    handler();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "white"  }}>
        <TouchableOpacity onPress={()=>navigation.goBack()}><Text>Back</Text></TouchableOpacity>
       {isloading&&<VideoItem 
        item={data}
              action={true}
              index={0}
              navigation={navigation}/>}
    </View>
  );
};
export default Videodetail;
const styles = StyleSheet.create({});
