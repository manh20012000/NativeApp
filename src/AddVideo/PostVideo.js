import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  PanResponder,
  Modal,
  Text,
  TextInput,
  Animated,
  FlatList,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackComponent,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { BottomSheet } from "react-native-btr";
import { AntDesign } from "@expo/vector-icons";
import NewRecode from "./NewRecode";
import { Camera, CameraType } from "expo-camera";
import Swiper from "react-native-swiper";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import ModalMention from "./ModalMention.js";
import { useSelector, useDispatch } from "react-redux";
import { checkAndRefreshToken } from "../confige/ComponencheckingToken.js";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import path from "../confige/config.js";
import ParsedText from "react-native-parsed-text";
import { login } from "../Redex/Reducer/auth.slice.js";
import { checkingToken } from "../confige/CheckingToken.js";
import {
  MentionInput,
  MentionSuggestions,
} from "react-native-controlled-mentions";
const PostVideo = ({ navigation, route }) => {
  const dispath = useDispatch();

  const [dataUser, setData] = useState(
    useSelector((state) => state.auth.value)
  );
  const users = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Alice Johnson" },
    { id: "4", name: "Bob Brown" },
  ];
  const data = route.params;
  const dataLocation = [
    { noidung: "cầu giấy" },
    { noidung: "bắc từ liêm" },
    { noidung: "bạn bè" },
    { noidung: "xu hướng mới" },
    { noidung: "Sơn tây" },
  ];

  const [link, setLink] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const handlerModal = () => {
    setShowOptions(true);
  };
  const handleBackdropPress = () => {
    setShowOptions(false);
  };
  const [privacy, setPrivacy] = useState("public");
  const handleGenderChange = (value) => {
    setShowOptions(false);
    setPrivacy(value);
  };
  const [vConten, setVconten] = useState(null);
  const [visible, setVisible] = useState(false);
  const [mention, setMention] = useState(null);
  const [located, setLocated] = useState("nông cống");
  const bootomShetShare = () => {
    setVisible(!visible);
  };

  const handleValueModal = (valueSearch) => {
    // console.log(valueSearch);
    if (vConten === null) {
      setVconten((Vconten) => "" + "@" + valueSearch.Hoten);
      setVisible(!visible);
    } else if (valueSearch !== "") {
      setVconten((Vconten) => Vconten + "@" + valueSearch.Hoten);
      setVisible(!visible);
    }
  };

  const handlerChangerText = (value) => {
    setVconten(value);
  };
  const handeHashtag = () => {
    if (vConten == null) setVconten("#");
    else setVconten(vConten + "#");
  };
  // thưc hiện với texteditor
  const [loading, setLoading] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");
  const [Music, setMusic] = useState("");
  const handleSave = () => {
    // Xử lý lưu nội dung đã nhập (htmlContent) vào cơ sở dữ liệu hoặc thực hiện hành động mong muốn.
    console.log(htmlContent, "-> mã html");
  };

  const HanderUploadVideo = async () => {
    try {
      const formData = new FormData();
      console.log(data.fileselect, "jaaahahah", data.fileName, data.typefile);
      let datetime = new Date();
      let datePostTimstemp = await datetime.toISOString().slice(0, -5);
      setLoading(true);
      formData.append("Height", data.heightV);
      formData.append("widthV", data.widthV);
      formData.append("datePost", datePostTimstemp);
      formData.append("privacy", privacy);
      formData.append("resizeMode", data.resizeMode);
      formData.append("userId", dataUser._id);
      formData.append("located", located);
      formData.append("nameMusic", dataUser.Hoten);
      formData.append("videoConten", vConten);
      formData.append("Video", {
        uri: data.fileselect,
        // name: `Video${datePostTimstemp}.mp4`
        name: data.fileName,
        type: data.typefile,
      });

      const isChecked = await checkAndRefreshToken(dispath, dataUser);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        // const parts = formData.getParts();
        // parts.forEach((part) => {
        //   console.log(part.fieldName, part, "màn hình post video1");
        // });
        console.log("bắt đầu vào form data ");
        const { status, message, msg, config } = await axios.post(
          `${path}/uploadVideo`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${isChecked.accessToken}`,
            },
          }
        );

        setVconten(null);
        setPrivacy("public");
        setLocated(null);
        setLoading(false);

        if (status === 200) {
          console.log(data.fileselect, "ket quả log file select");
          alert("sussecess", data);
          navigation.navigate("Video");
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error + "->>catch lỗi màn hình postVideo");
    } finally {
    }
  };
  const suggestions = [
    { id: "1", name: "David Tabaka" },
    { id: "2", name: "Mary" },
    { id: "3", name: "Tony" },
    { id: "4", name: "Mike" },
    { id: "5", name: "Grey" },
  ];
  const handleChange = (text) => {
    console.log("Input value:", text);
    setVconten(text);
  };
  const renderSuggestions = ({ keyword, onSuggestionPress }) => {
    console.log(keyword, onSuggestionPress);
    if (keyword == null) {
      return null;
    }

    return (
      <View>
        {suggestions
          .filter((one) =>
            one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
          )
          .map((one) => (
            <Pressable
              key={one.id}
              onPress={() => onSuggestionPress(one)}
              style={{ padding: 12 }}
            >
              <Text>{one.name}</Text>
            </Pressable>
          ))}
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: 40,
          paddingHorizontal: 20,
          flexDirection: "row",
          position: "relative",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate(" ")}
          style={{ justifyContent: "center" }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View
          style={{
            alignContent: "center",
            position: "absolute",
            marginLeft: "50%",
            top: 10,
          }}
        >
          <Text
            style={{ fontWeight: "700", alignContent: "center", fontSize: 20 }}
          >
            Post
          </Text>
        </View>
      </View>
      <View
        style={{ width: "100%", height: 1, backgroundColor: "black" }}
      ></View>
      <View
        style={{
          flexDirection: "row",
          height: 210,
          padding: 5,
        }}
      >
        <View
          style={{
            width: "70%",
            height: "100%",
            padding: 10,
            position: "relative",
          }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              flexDirection: "row",
              width: "83%",
              height: 30,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#DDDDDD",
                width: "40%",
                height: 30,
                borderRadius: 8,
              }}
              onPress={handeHashtag}
            >
              <Text style={{ fontWeight: "500" }}>#Hashtag</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#DDDDDD",
                width: "40%",
                height: 30,
                marginHorizontal: 10,
                borderRadius: 8,
              }}
              onPress={bootomShetShare}
            >
              <Text style={{ fontWeight: "500" }}>@Mention</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#DDDDDD",
                width: "40%",
                height: 30,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontWeight: "500" }}>video</Text>
            </TouchableOpacity>
          </View>
          <View style={{ zIndex: 1 }}>
            {/* <RichEditor
              multiline={true}
              placeholder="Nhập thông tin mô tả với hơn 4000 ký tự"
              initialContentHTML={htmlContent}
              initialFocus
              enterKeyHint
           
              onChange={(html) => setHtmlContent(html)}
              editorStyle={{
                // width: 100,
                // height:220,
                color: 'pink',
                placeholderColor: 'grey',
                contentCSSText: 'font-size: 12px;', // Tùy chỉnh kích thước chữ
              }}
            /> */}
            <Spinner
              visible={loading}
              textContent={"Đang tải..."}
              textStyle={{ color: "#FFF" }}
            />
            {/* <MentionInput
              value={vConten}
              multiline={true} // state giá trị nhập
              onChange={handleChange} // hàm xử lý khi nhập
              partTypes={[
                {
                  trigger: "@",
                  renderSuggestions: renderSuggestions,
                  textStyle: { fontWeight: "bold", color: "blue" },
                },
              ]}
              placeholder="Type here to mention someone..." // placeholder text
              style={styles.input}
            /> */}
            <TextInput
              placeholder="Nhập thông tin mô tả với hơn 4000 ký tự "
              maxLength={200}
              multiline={true}
              value={vConten}
              onChangeText={handlerChangerText}
              placeholderTextColor={"red"}
            ></TextInput>
            <Text style={{ fontWeight: "600" }}>{mention}</Text>
          </View>
        </View>
        <TouchableOpacity style={{ height: 200, width: "40%" }}>
          {data.typefile === "video/mp4" && (
            <Video
              source={{ uri: data.fileselect }}
              style={{ width: "75%", height: "80%" }}
              useNativeControls
              resizeMode="cover"
              isLooping
            />
          )}
          {data.typefile === "image/jpeg" && (
            <Image
              source={{ uri: data.fileselect }}
              style={{ width: "80%", height: "80%" }}
            />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{ width: "100%", height: 1, backgroundColor: "#999999" }}
      ></View>
      <View>
        <TouchableOpacity
          style={{
            padding: 6,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Feather name="user" size={24} color="black" />
            <Text style={{ fontWeight: "400" }}> Tag People</Text>
          </View>
          <MaterialIcons name="navigate-next" size={24} color="#777777" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 6,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Entypo name="location-pin" size={24} color="#444444" />
            <Text style={{ fontWeight: "400" }}> Location</Text>
          </View>

          <MaterialIcons name="navigate-next" size={24} color="#777777" />
        </TouchableOpacity>
        <View
          style={{
            height: 35,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FlatList
            data={dataLocation}
            horizontal
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#DDDDDD",
                    width: "auto",
                    height: "100%",
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    marginHorizontal: 5,
                  }}
                >
                  <Text style={{ fontWeight: "300" }}>{item.noidung}</Text>
                </TouchableOpacity>
              );
            }}
          ></FlatList>
        </View>
        <View
          style={{
            width: "100%",
            height: 1,
            marginTop: 4,
            backgroundColor: "#999999",
          }}
        ></View>
        <View
          style={{
            padding: 6,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="add-sharp" size={24} color="#999999" />
            <Text style={{ fontWeight: "300", color: "#888888" }}>
              Tag People
            </Text>
          </View>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <MaterialIcons name="navigate-next" size={24} color="#777777" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            padding: 6,
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 20,
          }}
          onPress={handlerModal}
        >
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons name="public" size={24} color="#333333" />
            <Text style={{ fontWeight: "500" }}>
              Everyone can you this post
            </Text>
          </View>
          <MaterialIcons name="navigate-next" size={24} color="#777777" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 6,
            marginTop: 20,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="ellipsis1" size={24} color="black" />
              <Text style={{ fontWeight: "500" }}> More option</Text>
            </View>
            <MaterialIcons name="navigate-next" size={24} color="#777777" />
          </View>
          <View style={{ marginLeft: 40, width: "75%" }}>
            <Text style={{ color: "#888888" }}>
              Tap manage comment.Duet and sticks presension
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 6,
            marginTop: 20,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons name="share" size={24} color="black" />
              <Text style={{ fontWeight: "500" }}> Share</Text>
            </View>
            <View
              style={{
                flexDirection: "row",

                marginRight: 10,
                justifyContent: "space-around",
                width: "30%",
              }}
            >
              <FontAwesome5
                name="facebook-messenger"
                size={24}
                color="#777777"
              />
              <Entypo name="facebook" size={24} color="#777777" />
              <Feather name="message-circle" size={24} color="#777777" />
            </View>
          </View>
          <View style={{ marginLeft: 40, width: "75%" }}>
            <Text style={{ color: "#888888" }}>Other plaform</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 50,
          alignItems: "center",
          justifyContent: "space-around",
          marginTop: 100,
        }}
      >
        <TouchableOpacity
          style={{
            width: "40%",
            backgroundColor: "white",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons name="drafts" size={24} color="black" />
            <Text style={{ color: "black", fontWeight: "700" }}> Draft</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "40%",
            backgroundColor: "red",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
          onPress={HanderUploadVideo}
        >
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="push-outline" size={24} color="white" />
            <Text style={{ color: "white", fontWeight: "700" }}> Post</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal visible={showOptions} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View
            style={{
              borderRadius: 10,
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <View style={styles.viewmodal}>
              <View
                style={{
                  width: "100%",
                  height: "15%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Privacy Setting
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#EEEEEE",
                  width: "100%",
                  height: "90%",
                  borderRadius: 10,
                }}
              >
                <Text style={{ marginLeft: 20, fontWeight: "600" }}>
                  Who can I this post
                </Text>
                <View
                  style={{
                    paddingHorizontal: 20,
                    marginTop: 20,
                    justifyContent: "flex-end",
                    flexDirection: "column",
                  }}
                >
                  <RadioButton.Group
                    onValueChange={handleGenderChange}
                    value={privacy}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 20,
                      }}
                    >
                      <Text style={{ fontSize: 18, color: "red" }}>
                        Publlic
                      </Text>
                      <RadioButton value="public" />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 20,
                      }}
                    >
                      <Text style={{ fontSize: 18, color: "red" }}>
                        Protected
                      </Text>
                      <RadioButton value="protected" />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 20,
                      }}
                    >
                      <Text style={{ fontSize: 18, color: "red" }}>
                        Private
                      </Text>
                      <RadioButton value="private" />
                    </View>
                  </RadioButton.Group>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={bootomShetShare}
        //Toggling the visibility state on the clicking out side of the sheet
      >
        <ModalMention onValuechangeseach={handleValueModal} />
      </BottomSheet>
    </View>
  );
};
export default PostVideo;
const styles = StyleSheet.create({
  viewmodal: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    flex: 0.32,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  textDisplay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
  },
  textContainer: {
    fontSize: 16,
    lineHeight: 24,
  },
  mention: {
    color: "blue", // Định dạng cho @mention
    fontWeight: "bold",
  },
  hashtag: {
    color: "green", // Định dạng cho #hashtag
    fontWeight: "bold",
  },
  normalText: {
    color: "black", // Văn bản thông thường
  },
  textInput: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    opacity: 0, // Ẩn TextInput nhưng vẫn cho phép nhập liệu
    fontSize: 16,
    lineHeight: 24,
  },

  suggestionItem: {
    padding: 10,
    backgroundColor: "#eee",
    marginVertical: 5,
    borderRadius: 4,
  },
});
