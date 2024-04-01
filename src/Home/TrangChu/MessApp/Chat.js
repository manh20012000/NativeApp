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
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import path from "../../../config.js";
import { useSelector, useDispatch } from "react-redux";
import { GiftedChat } from "react-native-gifted-chat";
import { useSocket } from "../../../socket";
const Chat = ({ navigation }) => {
  const user = useSelector((state) => state.auth.value);
  const StatusUser = useSelector((state) => state.Status.value);
  //  console.log(StatusUser)
  const [filter, setFillter] = useState([]);
  const socket = useSocket();
  useEffect(() => {
    socket?.on("newMessage", (data) => {
      console.log(data, "new messsage");
      setFillter((previMessage) => {
        return previMessage.map((mess) => {
          if (data.user._id === mess.participants._id) {
            // Nếu user id của tin nhắn mới bằng với user id của tin nhắn trong mảng
            // Thực hiện push tin nhắn mới vào mảng tin nhắn của đối tượng này
            return {
              ...mess,
              messages: [data, ...mess.messages] // Thêm tin nhắn mới lên đầu mảng
            };
          }
          // Nếu không, giữ nguyên đối tượng không thay đổi
          return mess;
        }).reverse(); // Đảo ngược thứ tự của mảng tin nhắn
      });
    });
  
    return () => {
      socket?.off("newMessage");
    };
  }, []);
  const SelectUserMessage = async () => {
    try {
      const { data } = await axios.get(`${path}/UserRouter`);

      setFillter(data);
    } catch (error) {
      console.log(error, "lỗi cho mỗi cuộc chat ");
    } finally {
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
  const chatPersion = (item) => {
    navigation.navigate("PesionChat", {
      participants: item.participants,
      Messages: item.messages,
    });
  };
  const NavigateMess = async (user) => {
    try {
      const { data } = await axios.get(`${path}/getMessage/${user._id}`);
      // console.log(data, "dataatin nhan ");
      if (data.length === 0) {
        navigation.navigate("PesionChat", {
          participants: user,
          Messages: [],
        });
      } else {
        navigation.navigate("PesionChat", {
          participants: user,
          Messages: data.messages,
        });
      }
    } catch (error) {
      console.log(error, "lỗi khi chuyen sang chat detail ");
    } finally {
      // console.log(dataUserChat)
    }
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
              const statusUser = StatusUser.includes(item._id);
              // console.log(statusUser,item._id)
              return (
                <TouchableOpacity
                  style={{
                    height: "100%",
                    width: "auto",

                    marginTop: 5,
                  }}
                  onPress={() => NavigateMess(item)}
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
                      {statusUser && (
                        <View
                          style={{
                            position: "absolute",
                            left: 40,
                            bottom: 1,
                            width: 12,
                            height: 12,
                            borderRadius: 10,
                            backgroundColor: "#00FF00",
                          }}
                        ></View>
                      )}
                    </View>

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
          const statusUser = StatusUser.includes(item.participants._id);
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
              onPress={() => chatPersion(item)}
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
                  {statusUser && (
                    <View
                      style={{
                        position: "absolute",
                        left: 40,
                        bottom: 1,
                        width: 12,
                        height: 12,
                        borderRadius: 10,
                        backgroundColor: "#00FF00",
                      }}
                    ></View>
                  )}

                  <Text
                    style={{
                      color: "blue",
                      fontSize: 170,
                      position: "absolute",
                    }}
                  ></Text>
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
                {item.messages[0] && (
                  <Text style={{ color: "white" }}>
                    {item.messages[0].user._id === user._id
                      ? "You"
                      : item.participants.Hoten}
                    : {item.messages[0].text}
                  </Text>
                )}
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
// useEffect(() => {
//   socket?.on("incomingMessage", () => {
//     SelectUserMessage();
//   });
//   return () => {
//     socket?.off("incomingMessage");
//   };
// }, []);
