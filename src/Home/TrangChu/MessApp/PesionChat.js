import {
  StyleSheet,
  Text,
  View,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  Button,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from "react-native";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Bubble,
  GiftedChat,
  Send,
  InputToolbar,
} from "react-native-gifted-chat";
import path from "../../../config";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useSocket } from "../../../socket";
const PesionChat = ({ route, navigation }) => {
  const user = useSelector((state) => state.auth.value);

  const StatusUser = useSelector((state) => state.Status.value);
  const [socketOnline, setSocketOnline] = useState([]);
  const [groupName, setGroupName] = useState("");
  const socket = useSocket();
  const { participants, Messages } = route.params;
  // console.log(participants, "tin nhăn:", Messages);
  const [textIcon, setText] = useState("");
  const [messages, setMessages] = useState(Messages);
  const status = StatusUser.includes(participants._id);
  // console.log(status,participants._id)
  useEffect(() => {
    socket?.on("newMessage", (data) => {
      console.log(data, "new messsage");
      // setMessages((previousMessages) =>
      //   GiftedChat.append(previousMessages, {
      //     ...data,
      //     createdAt: new Date(data.createdAt),
      //   })
      // );
    });
    return () => {
      socket?.off("newMessage");
    };
  }, []);

  // useEffect(() => {
  //   // // Gọi API để lấy tin nhắn từ server
  //   // const fetchData = async () => {
  //   //   try {
  //   //     const { data } = await axios.get(`${path}/getMessage/${participants._id}`);
  //   //     setMessages(data);
  //   //   } catch (error) {
  //   //     console.error("Error fetching messages:", error);
  //   //   }
  //   // };
  //   // fetchData();
  // }, [route.params.userId]);

  const onSend = useCallback(async (messages = []) => {
    try {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      // console.log(messages, "messagaahdj");
      // sendMessage(messages);
      // Gửi tin nhắn lên server sử dụng Axios
      console.log(participants._id);
      const response = await axios.post(`${path}/send/${participants._id}`, {
        message: messages[0],
        // Các thông tin khác nếu cần
      });
      if (response.data) {
        socket.emit("sendMessage", {
          ...messages[0],
          receiverId: participants._id,
        });
      }
      // Cập nhật state để hiển thị tin nhắn trong GiftedChat

      // Hiển thị hoặc ẩn component nếu cần
      setVisible(true);
    } catch (error) {
      console.error("Error sending message to server:", error);
    }
  }, []);
  //change buutobsen
  const troveCanhan = () => {
    navigation.navigate("SeeDeTail", dataRoute);
  };
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View
          style={{
            height: 37,
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            marginRight: 5,
            marginBottom: 5,
          }}
        >
          <Ionicons name="send" size={24} color="blue" />
        </View>
      </Send>
    );
  };
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "blue",
          },
        }}
        textStyle={{
          right: {
            color: "white",
          },
        }}
      ></Bubble>
    );
  };
  // tạo nút nhấn với cái icon và ảnh hoccj hiện thị vưới textinput
  const [isVisible, setVisible] = useState(true);
  //
  // thuch hien de xem bạn da nhap text hay chưa
  const [inputText, setInputText] = useState("");
  const handleInputTextChanged = (text) => {
    setInputText(text);
    socket?.on("EnterText", () => {});
    if (text === "") {
      setVisible(true);
    }
  };
  const handlerSendMess = async () => {};
  return (
    // <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar backgroundColor="#CCCCCC" animated={true} />
      <View style={styles.head}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 0.6,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Mess");
            }}
          >
            <Ionicons name="arrow-back-sharp" size={28} color="#6600FF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => troveCanhan()}
            style={{
              position: "relative",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 44,
                marginHorizontal: 6,
                backgroundColor: "white",
              }}
            >
              <Image
                source={{ uri: participants.Avatar }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 44,
                }}
              ></Image>
              {status && (
                <View
                  style={{
                    position: "absolute",
                    left: 35,
                    bottom: 1,
                    width: 12,
                    height: 12,
                    borderRadius: 10,
                    backgroundColor: "#00FF00",
                  }}
                ></View>
              )}
            </View>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  fontWeight: "900",
                }}
              >
                {participants.Hoten}
              </Text>
              {status && (
                <Text style={{ color: "white", fontSize: 10 }}>Active now</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            flex: 0.5,
          }}
        >
          <TouchableOpacity>
            <Ionicons name="call" size={26} color="#6600FF" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={25} color="#6600FF" />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="exclamationcircle" size={25} color="#6600FF" />
          </TouchableOpacity>
        </View>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages, setVisible(!isVisible))}
        user={{
          _id: user._id,
          name: user.Hoten,
          avatar: user.Avatar,
        }}
        onInputTextChanged={(text) => this.setCustomText("van nam")}
        renderInputToolbar={(props) =>
          !isVisible ? <InputToolbar {...props} /> : null
        }
        renderBubble={renderBubble}
        alwaysShowSend={false}
        renderSend={renderSend}
        scrollToBottom
        // inverted={false}
        isLoadingEarlier
        bottomOffset={30}
        renderUsernameOnMessage={true}
        parsePatterns={(linkStyle) => [
          {
            pattern: /#(\w+)/,
            style: linkStyle,
            onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
          },
        ]}
        textInputStyle={{
          borderRadius: 22,
          borderWidth: 1,
          marginHorizontal: 18,
          marginTop: 3,
          paddingHorizontal: 16,
        }}
        onInputTextChanged={handleInputTextChanged}
      />
      {isVisible && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",

            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "5%",
          }}
        >
          <TouchableOpacity>
            <Feather name="camera" size={24} color="#0066FF" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="microphone" size={24} color="#0066FF" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="image-sharp" size={24} color="#0066FF" />
          </TouchableOpacity>
          <View
            style={{
              borderBlockColor: "#666666",
              height: 35,
              width: 140,
              // borderRadius: 4,
              borderRadius: 13,
              backgroundColor: "#888888",
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 2,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setVisible(!isVisible);
              }}
            >
              <Text style={{ fontWeight: "200", color: "#FFFFFF" }}>
                Message
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="emoticon-happy-outline"
                size={24}
                color="#0066FF"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <FontAwesome5 name="hand-scissors" size={24} color="#FFCC66" />
          </TouchableOpacity>
        </View>
      )}
    </View>
    // </KeyboardAvoidingView>
  );
};
export default PesionChat;
const styles = StyleSheet.create({
  head: {
    flex: 0.09,
    flexDirection: "row",
  },
  inputExpanded: {
    flex: 1,
  },
});
