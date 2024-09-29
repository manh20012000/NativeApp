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
  useWindowDimensions,
  Modal,
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
import path from "../../../confige/config";
import axios from "axios";
import { useSocket } from "../../../socket";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Swiper from "react-native-swiper";
import { Video, ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";
import uuid from "uuid/v4";
import ImageViewer from "react-native-image-zoom-viewer";
import { FlatGrid } from "react-native-super-grid";
import { LinearGradient } from "expo-linear-gradient";
import { checkingToken } from "../../../confige/CheckingToken";
import { login } from "../../../Redex/Reducer/auth.slice";
import { useSelector, useDispatch } from "react-redux";
import { checkAndRefreshToken } from "../../../confige/ComponencheckingToken";
const PesionChat = ({ route, navigation }) => {
  const myId = uuid();
  const dispath = useDispatch();

  const [StatusPemission, requestPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const user = useSelector((state) => state.auth.value);
  const { width, height } = useWindowDimensions();

  const StatusUser = useSelector((state) => state.Status.value);
  const [socketOnline, setSocketOnline] = useState([]);
  const [groupName, setGroupName] = useState("");
  const socket = useSocket();
  const { participants, Messages } = route.params;
  console.log(Messages);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [chooseLibrary, setchooseLibrary] = useState(true);
  const [textIcon, setText] = useState("");
  const [messages, setMessages] = useState(Messages);
  const status = StatusUser.includes(participants._id);
  const videoRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // console.log(status,participants._id)
  // useEffect(() => {
  //   setchooseLibrary(true);
  //   socket?.on("newMessage", (data) => {
  //     console.log(data, "new messsage");
  //     setMessages((previousMessages) =>
  //       GiftedChat.append(previousMessages, {
  //         ...data,
  //         createdAt: new Date(data.createdAt),
  //       })
  //     );
  //   });
  //   return () => {
  //     socket?.off("newMessage");
  //   };
  // }, []);
  const XoaAnh = (image, index) => {
    // console.log(image,index)
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
    if (newImages.length === 0) {
      setchooseLibrary(true);
    }
  };
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
      const isChecked = await checkAndRefreshToken(dispath, user);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        const response = await axios.post(
          `${path}/send/${participants._id}`,
          {
            message: messages[0],
            // Các thông tin khác nếu cần
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${isChecked.accessToken}`,
            },
          }
        );
        if (response.data) {
          console.log(response.data);
          // socket.emit("sendMessage", {
          //   ...messages[0],
          //   receiverId: participants._id,
          // });
        }
        // Cập nhật state để hiển thị tin nhắn trong GiftedChat

        // Hiển thị hoặc ẩn component nếu cần
        setVisible(true);
      }
    } catch (error) {
      console.error("Error sending message to server:", error);
    }
  }, []);
  //change buutobsen
  const troveCanhan = () => {
    navigation.navigate("SeeDeTail", participants);
  };
  // thực hiện với camra và các tác vụ khác cho ảnh và video
  const [autoPlays, setAutoplay] = useState(false);
  const [trangThai, setTrangThai] = useState(1);
  const [thanhBar, setThanhBar] = useState(1);
  const [image, setImage] = useState(null);
  const [resizeMode, setResizeMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [fileselect, setFileselect] = useState(null);
  const [widthV, setWidthV] = useState(0);
  const [heightV, setHeight] = useState(0);
  const [typefile, setTypefile] = useState("");
  const count = useSelector((state) => state.auth.value);
  const [dataUser, setData] = useState(count);
  const [autoVideo, setAutoVideo] = useState(true);
  const pickImages = async () => {
    setTrangThai(2);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    if (!result.canceled) {
      if (result.assets[0].type === "image") {
        setchooseLibrary(false);
        setSelectedImages(result.assets.map((asset) => asset.uri));
        setFileselect(result.assets[0].uri);
        setTrangThai(2);
        setTypefile("image");
      } else if (result.assets[0].type === "video") {
        setchooseLibrary(false);
        if (result.assets[0].height < 600) {
          setResizeMode(true);
        }
        setFileselect(result.assets[0].uri);
        setHeight(result.assets[0].height);
        setWidthV(result.assets[0].width);
        console.log(result.assets[0].uri);
        setSelectedVideo(result.assets[0].uri);
        setAutoplay(true);
        setTrangThai(3);
        setTypefile("video");
      }
    }
  };
  // bottomsheet imge thư viện

  const [isVisible, setVisible] = useState(true);
  const [renderAc, setRenderaction] = useState(true);
  const handersenderVideOrImage = async () => {
    let messageData = {};

    if (selectedImages.length > 0) {
      messageData = {
        _id: myId, // Tạo một _id ngẫu nhiên
        image: selectedImages,
      };
    } else if (selectedVideo) {
      messageData = {
        _id: myId, // Tạo một _id ngẫu nhiên
        video: selectedVideo, // Chỉ gửi video nếu có
      };
    }
    const messages = {
      ...messageData,
      createdAt: new Date(),
      user: {
        _id: user._id,
        name: user.Hoten,
        avatar: user.Avatar,
      },
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    try {
      const isChecked = await checkAndRefreshToken(dispath, user);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        const message = new FormData();
        setchooseLibrary(true);
        if (typefile == "image") {
          let datetime = new Date();
          let datePostTimstemp = await datetime.toISOString().slice(0, -5);
          for (let i = 0; i < selectedImages.length; i++) {
            message.append("ArayImages", {
              uri: selectedImages[i],
              name: `image_${i}.jpeg`,
              type: "image/jpeg",
            });
          }
          message.append("createdAt", datePostTimstemp);
          message.append("text", null);
          message.append("video", null);
          message.append("userId", user._id);
          message.append("username", user.Hoten);
          message.append("avatar", user.Avatar);
          const response = await axios.post(
            `${path}/ChatImage/${participants._id}`,
            message,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Bearer ${isChecked.accessToken}`,
              },
            }
          );
        } else if (typefile == "video") {
          let datetime = new Date();
          let datePostTimstemp = await datetime.toISOString().slice(0, -5);
          message.append("Video", {
            uri: selectedVideo,
            name: `Video${datePostTimstemp}.mp4`,
            type: "video/mp4",
          });
          message.append("createdAt", datePostTimstemp);
          message.append("text", null);
          message.append("image", null);
          message.append("userId", user._id);
          message.append("username", user.Hoten);
          message.append("avatar", user.Avatar);
          const response = await axios.post(
            `${path}/ChatVideo/${participants._id}`,

            message,

            {
              headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Bearer ${isChecked.accessToken}`,
              },
            }
          );
        }
        setVisible(true);
      }
    } catch (error) {
      console.error("Error sending message to server:", error.message);
    }
  };
  const renderMessageVideo = (props) => {
    const { currentMessage } = props;
    console.log(currentMessage.video, "videp");
    return (
      currentMessage.video != null && (
        <View
          style={{ borderRadius: 10, width: width - 150, height: height - 650 }}
        >
          <Video
            source={{ uri: currentMessage.video }}
            rate={1.0}
            volume={0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={true}
            useNativeControls={false} // Bật hiển thị nút điều khiển
            style={{
              width: width - 150,
              height: height - 650,
              borderRadius: 10,
            }}
          />
        </View>
      )
    );
  };
  // const sử lý với việc gữi ảnh đi

  const renderMessageImage = (props) => {
    const { currentMessage } = props;
    const images = currentMessage.image.map((url) => ({ url }));
    return (
      currentMessage.image.length > 0 && (
        <View style={{ backgroundColor: "black" }}>
          {currentMessage.image.length > 1 && (
            <FlatGrid
              spacing={1}
              maxItemsPerRow={3}
              itemDimension={width - 300}
              data={currentMessage.image}
              style={{
                width: width - 70,
                // height: height-700,
                justifyContent: "center",
                alignItems: "center",
              }}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setIsViewerOpen(true);
                    setCurrentImageIndex(index);
                  }}
                >
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          )}
          {currentMessage.image.length === 1 && (
            <TouchableOpacity
              onPress={() => {
                console.log("snah", 1);
                setIsViewerOpen(true);
                setCurrentImageIndex(1);
              }}
            >
              <Image
                source={{ uri: currentMessage.image[0] }}
                style={{
                  width: width - 200,
                  height: height - 500,
                  zIndex: 0,
                  resizeMode: "cover",
                  borderRadius: 20,
                }}
              />
            </TouchableOpacity>
          )}

          {isViewerOpen && (
            <Modal visible={true} transparent={true}>
              <ImageViewer
                imageUrls={images}
                index={currentImageIndex}
                onSwipeDown={() => setIsViewerOpen(false)}
                enableSwipeDown={true}
              />
            </Modal>
          )}
        </View>
      )
    );
  };

  const renderSend = (props) => {
    return (
      <View style={{ justifyContent: "center" }}>
        {renderAc ? (
          <TouchableOpacity
            style={{
              height: height - 770,
              alignItems: "center",
              justifyContent: "center",
              width: width - 340,
              marginBottom: 5,
            }}
          >
            <Ionicons name="happy" size={25} color="blue" />
          </TouchableOpacity>
        ) : (
          <Send {...props}>
            <View
              style={{
                height: height - 770,
                alignItems: "center",
                justifyContent: "center",
                width: 30,
                marginBottom: 5,
                marginRight: 10,
              }}
            >
              <Ionicons name="send" size={24} color="blue" />
            </View>
          </Send>
        )}
      </View>
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

  //
  // thuch hien de xem bạn da nhap text hay chưa

  const [inputText, setInputText] = useState("");
  const handleInputTextChanged = (text) => {
    setInputText(text);
    socket?.on("EnterText", () => {});
    if (text === "") {
      setRenderaction(true);
    } else {
      setRenderaction(false);
    }
  };

  const handlerSendMess = () => {
    return renderAc ? (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: width - 250,
          height: height - 770,
        }}
      >
        <TouchableOpacity>
          <Feather name="camera" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="microphone" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImages}>
          <Ionicons name="image-sharp" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    ) : (
      <TouchableOpacity
        onPress={() => {
          setRenderaction(true);
          setInputText(null);
        }}
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: height - 795,
        }}
      >
        <AntDesign name="right" size={24} color="blue" />
      </TouchableOpacity>
    );
  };
  // <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar backgroundColor="black" animated={true} />
      {chooseLibrary ? (
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <View
            style={{
              width: width,
              height: height - 750,
              flexDirection: "row",
              zIndex: 1,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 0.8,
                width: "auto",
                height: height - 750,
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
                    width: 45,
                    height: 45,
                    borderRadius: 45,
                    marginHorizontal: 6,
                    backgroundColor: "white",
                  }}
                >
                  <Image
                    source={{ uri: participants.Avatar }}
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 45,
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
                    <Text style={{ color: "white", fontSize: 10 }}>
                      Active now
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                width: width - 250,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ViewCall", {
                    participants: participants,
                  });
                }}
              >
                <Ionicons name="call" size={24} color="#6600FF" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ViewCall", participants);
                }}
              >
                <FontAwesome name="video-camera" size={24} color="#6600FF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={pickImages}>
                <AntDesign name="exclamationcircle" size={24} color="#6600FF" />
              </TouchableOpacity>
            </View>
          </View>
          {/* <LinearGradient
            colors={["red", "purple", "white"]}
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          > */}
          <GiftedChat
            messages={messages}
            onSend={(newMessages) =>
              onSend(newMessages, setVisible(!isVisible))
            }
            user={{
              _id: user._id,
              name: user.Hoten,
              avatar: user.Avatar,
            }}
            // onInputTextChanged={(text) => this.setCustomText("hihi")}
            renderInputToolbar={(props) =>
              !isVisible ? <InputToolbar {...props} /> : null
            }
            renderMessageImage={renderMessageImage}
            renderMessageVideo={renderMessageVideo}
            renderBubble={renderBubble}
            alwaysShowSend={false}
            renderSend={renderSend}
            scrollToBottom
            renderTime={() => null}
            isLoadingEarlier
            bottomOffset={30}
            parsePatterns={(linkStyle) => [
              {
                pattern: /#(\w+)/,
                style: linkStyle,
                onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
              },
            ]}
            // parsePatterns={(linkStyle) => [
            //   { type: 'phone', style: linkStyle, onPress: this.onPressPhoneNumber },
            //   { pattern: /#(\w+)/, style: { ...linkStyle, styles.hashtag }, onPress: this.onPressHashtag },
            // ]}

            textInputStyle={{
              borderRadius: 22,
              marginHorizontal: 18,
              paddingHorizontal: 16,
              backgroundColor: "#fff",
            }}
            isCustomViewBottom={true}
            onInputTextChanged={handleInputTextChanged}
            isKeyboardInternallyHandled={false}
            renderActions={handlerSendMess}
          />
          {/* </LinearGradient> */}
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
              <TouchableOpacity onPress={pickImages}>
                <Ionicons name="image-sharp" size={24} color="#0066FF" />
              </TouchableOpacity>
              <View
                style={{
                  borderBlockColor: "#666666",
                  height: 35,
                  width: 200,
                  borderRadius: 13,
                  backgroundColor: "#888888",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 2,
                  alignItems: "center",
                  paddingHorizontal: 4,
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
      ) : (
        <View style={{ flex: 1, backgroundColor: "black" }}>
          {typefile == "image" && (
            <View
              style={{
                flex: 1,
                backgroundColor: "black",
                position: "relative",
              }}
            >
              <Swiper
                style={{
                  height: "95%",
                }}
                loop={true}
              >
                {selectedImages.map((image, index) => (
                  <View key={index} style={{}}>
                    <TouchableOpacity
                      onPress={() => {
                        XoaAnh(image, index);
                      }}
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        right: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 30,
                          fontWeight: "600",
                          color: "white",
                        }}
                      >
                        x
                      </Text>
                      <Text>
                        {index}/{selectedImages.length}
                      </Text>
                    </TouchableOpacity>
                    <Image
                      key={index}
                      source={{ uri: image }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                ))}
              </Swiper>
              <View
                style={{
                  position: "absolute",
                  zIndex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  bottom: 20,
                  width: width - 40,
                  height: height - 700,
                  alignItems: "center",
                  alignContent: "center",
                  marginHorizontal: width - 365,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "40%",
                    height: "40%",
                    borderRadius: 30,
                    backgroundColor: "#777777",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontWeight: "400", fontSize: 18 }}>ADD</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "40%",
                    height: "40%",
                    borderRadius: 30,
                    backgroundColor: "#777777",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                  onPress={handersenderVideOrImage}
                >
                  <Text style={{ fontWeight: "400", fontSize: 18 }}>SEND</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {typefile == "video" && (
            <View
              style={{
                flex: 1,
                backgroundColor: "black",
                position: "relative",
              }}
            >
              <Video
                source={{ uri: selectedVideo }}
                style={{
                  flex: 1,
                  height: height - 49,
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "black",
                }}
                ref={videoRef}
                resizeMode={resizeMode ? ResizeMode.CONTAIN : "cover"}
                // resizeMode={ResizeMode.CONTAIN}
                isLooping
                shouldPlay={autoVideo}
                useNativeControls={false}
              />
              <View
                style={{
                  position: "absolute",
                  zIndex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  bottom: 20,
                  width: width - 40,
                  height: height - 700,
                  alignItems: "center",
                  alignContent: "center",
                  marginHorizontal: width - 365,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "40%",
                    height: "40%",
                    borderRadius: 30,
                    backgroundColor: "#777777",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontWeight: "400", fontSize: 18 }}>ADD</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "40%",
                    height: "40%",
                    borderRadius: 30,
                    backgroundColor: "#777777",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                  onPress={handersenderVideOrImage}
                >
                  <Text style={{ fontWeight: "400", fontSize: 18 }}>SEN</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );

  // </KeyboardAvoidingView>
};
export default PesionChat;

const styles = StyleSheet.create({
  inputExpanded: {
    flex: 1,
  },
});
