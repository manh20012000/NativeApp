import {
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
import socketConnect from "../../../context/SocketContext.js";
const Chat = ({ navigation }) => {
  const user = useSelector((state) => state.auth.value);

  // const socketconnect = socketConnect();
  // useEffect(() => {

  //   // Lắng nghe thông báo về trạng thái hoạt động từ server
  //   socketConnect.on('userActive', (data) => {
  //     console.log(`User ${data.userId} is ${data.active ? 'active' : 'inactive'}`);

  //     // Xử lý trạng thái hoạt động của người dùng ở đây
  //   });

  //   return () => {
  //     // Ngắt kết nối khi component unmount
  //     socketConnect.disconnect();
  //   };
  // }, []);

  const [filter, setFillter] = useState([]);
  const SelectUserMessage = async () => {
    try {
      const { data } = await axios.get(`${path}/UserRouter`);
      setFillter(data);
    } catch (error) {
      console.log(error, "lỗi nhânj với ");
    } finally {
      // console.log(dataUserChat)
    }
  };
  const [listbarUser, setListbarUser] = useState([]);
  const selectUsersListBar = async () => {
    try {
      const { data } = await axios.get(`${path}/UserSelelectchat`);
      // console.log(data, "data selector");
      setListbarUser(data);
    } catch (error) {
      console.log(error, "lôi sãy ra khi sleect với dữ liệu user ");
    } finally {
      // console.log(dataUserChat)
    }
  };
  useEffect(() => {
    selectUsersListBar();
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
      <View
        style={{
          justifyContent: "center",

          paddingTop: 5,
        }}
      >
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
              style={{ width: 250 }}
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
            height: 70,
            marginTop: 5,
            marginHorizontal: 10,
            justifyContent: "center",
          }}
        >
          <FlatList
            ListHeaderComponent={str}
            horizontal
            data={listbarUser}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={{
                    height: "100%",
                    width: "auto",

                    marginTop: 5,
                  }}
                >
                  <View style={{ justifyContent: "flex-end" }}>
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
                    <Text
                      style={{
                        color: "#00FF00",
                        fontSize: 60,
                        position: "absolute",
                        left: 35,
                        bottom: 10,
                      }}
                    >
                      {item.trangthai}
                    </Text>
                    <Text
                      style={{
                        color: "white",

                        fontSize: 12,
                        height: 25,
                        marginLeft: 10,
                        textAlign: "center",
                      }}
                    >
                      {item.Hoten}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View
          style={{ width: "100%", height: 2, backgroundColor: "#999999" }}
        ></View>
      </View>
    );
  };
  const DetaiHandress = () => {
    props.navigation.navigate("SeeDeTail", props.item);
  };
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <FlatList
        ListHeaderComponent={seach}
        data={filter}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                marginTop: 5,
                marginHorizontal: 16,
                width: "90%",
                height: 80,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("PesionChat", item.participants);
              }}
            >
              <View style={{ flex: 0.3 }}>
                <View
                  style={{
                    position: "relative",
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: "pink",
                  }}
                >
                  <Image
                    source={{ uri: item.participants.Avatar }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 64,
                    }}
                  ></Image>
                  <Text
                    style={{
                      color: "#00FF00",
                      fontSize: 70,
                      position: "absolute",
                      bottom: -14,
                    }}
                  >
                    {item.trangthai}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 0.7, marginLeft: -20 }}>
                <Text
                  style={{
                    fontSize: 19,
                    color: "white",
                    fontWeight: "800",
                  }}
                >
                  {item.participants.Hoten}
                </Text>
                <Text style={{ color: "white" }}>
                  {item.messages.senderId === user._id ? "You" : item.participants.Hoten}: {item.messages.message}
</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      ></FlatList>
    </View>
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
