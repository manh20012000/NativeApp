import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Button,
  PanResponder,
  Share,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { React, useState, useRef, useEffect, memo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome, EvilIcons, AntDesign } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import ImageViewer from "react-native-image-zoom-viewer";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { BottomSheet } from "react-native-btr";
import Binhluan from "./BinhLuan.js";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import Coment from "./comment.js";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import TimeAgo from "react-native-timeago";
import { LinearGradient } from "expo-linear-gradient";
import RenderHtml from "react-native-render-html";
import { Octicons } from "@expo/vector-icons";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const FlatItem = memo((props) => {
  const user = props.item.User; //
  const [databaiviet, setdatabaiviet] = useState(props.item);
  const [isLiked, setIsLiked] = useState("");
  const [arrlike, setArrlike] = useState(databaiviet.Like);
  const [isVisible2, setIsVisible2] = useState(false);
  const toggleModal2 = () => {
    setIsVisible2(!isVisible2);
  };
  const handleBackdropPress2 = () => {
    setIsVisible2(false);
  };
  const [showOptions, setShowOptions] = useState(false);
  const handleBackdropPress2e = () => {
    setIsVisible2(false);
  };
  useEffect(() => {
    const listLike = async () => {
      const { data } = await axios.post(
        "https://nativeapp-vwvi.onrender.com/selectLike",
        { _idBaiviet: databaiviet._id }
      );
      setArrlike(data);
    };
    listLike();
  }, []);

  useEffect(() => {
    const trangthai = () => {
      databaiviet.Like.forEach((item) => {
        if (item.User === props.userDn) {
          setIsLiked(item.Trangthai);
        }
      });
    };
    trangthai();
  }, []);

  const [numberLike, setNumber] = useState(databaiviet.SoluongTym);
  const index = props.index;
  let soluongTim = numberLike;

  const handleLike = async () => {
    let Liked = !isLiked;
    setIsLiked(Liked);
    if (isLiked == false) {
      soluongTim = soluongTim + 1;
      setNumber(soluongTim);
    } else if (isLiked == true) {
      if (soluongTim > 0) {
        soluongTim = soluongTim - 1;
        setNumber(soluongTim);
      }
    }
    try {
      const { data } = await axios.post(
        "https://nativeapp-vwvi.onrender.com/tymPost",
        {
          idUser: props.userDn,
          idBaiPost: databaiviet._id,
          Soluong: soluongTim,
          Trangthai: Liked,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const DetaiHandress = () => {
    props.navigation.navigate("SeeDeTail", databaiviet.User);
  };
  // set phongd to màn hinhg
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const anh = databaiviet.Image;
  const images = anh.map((url) => ({ url }));
  const [showImage, setImage] = useState(false);
  const [quyen, setquyen] = useState("");

  useEffect(() => {
    const renderImgae = () => {
      if (images.length > 0) {
        setImage(true);
      } else {
        setImage(false);
      }
      if (props.item.Pemission === "public") {
        setquyen("public");
      } else if (props.item.Pemission === "Private") {
        setquyen("privacy-tip");
      }
    };
    renderImgae();
  }, []);
  //tao bootom sheet cho n thanh phan share

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  // su ly modal cho  binh luan
  const [isVisible, setIsVisible] = useState(false);
  const toggleModal = () => {
    setIsVisible(!isVisible);
  };
  const handleBackdropPress = () => {
    setIsVisible(false);
  };
  //binh luan
  const [soluongCmt, setSoluongcmt] = useState(databaiviet.SoluongCmt);
  const [Noidung, setNoiDung] = useState("");
  const [binhluan, setBinhLuan] = useState(databaiviet.Comment);
  const [parentId, setParentId] = useState(null);
  const handleTextInputChange = (text) => {
    const parts = text.split("@");
    setNoiDung(text);
  };

  const selectCmt = async () => {
    const { data } = await axios.post(
      "https://nativeapp-vwvi.onrender.com/selectDataCmt",
      { idbaiviet: databaiviet._id }
    );
    setBinhLuan(data.data);
  };
  // cho phép gữi ảnh với bình luận // sendcomment
  const [CommentChildren, setCommentChildren] = useState([]);
  let [imageCmt, setImageCmt] = useState(null);
  const [isimageCmt, setIsImageCmt] = useState(true);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [selectedImages, setSelectedImages] = useState([]);
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      result.assets.map((asset) => {
        setIsImageCmt(false);
        setImageCmt(asset.uri);
      });
    }
  };
  const HandelerDeletePickture = () => {
    setIsImageCmt(true);
    setImageCmt(null);
  };
  const formData = new FormData();
  const SendComment = async () => {
    // const randomInt = Math.floor(Math.random() * 10001); // Tạo số nguyên từ 0 đến 10000
    let soluong = soluongCmt + 1;
    setSoluongcmt(soluong);
    if (Noidung == "") {
      return null;
    }
    let noidung = Noidung;
    let image = imageCmt;
    setNoiDung("");
    setImageCmt(null);
    setIsImageCmt(true);
    try {
      console.log(parentId, typeof parentId);
      formData.append("UserCmt", props.userDn);
      formData.append("idBaiviet", databaiviet._id);
      formData.append("Noidung", noidung);
      formData.append("Soluongcmt", soluong);
      formData.append("parentId", JSON.stringify(parentId));
      if (image) {
        formData.append("imageCmt", {
          uri: image,
          name: `image.jpeg`,
          type: "image/jpeg", // Loại tệp
        });
      }
      const { data } = await axios.post(
        "https://nativeapp-vwvi.onrender.com/SendComment",
        //"http://192.168.188.136:8080/SendComment",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setParentId(null);
      setSoluongcmt(soluong);
      // setBinhLuan(data.data);
      setImageCmt(null);
      selectCmt();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LinearGradient
      start={{ x: 0.4, y: 0.2 }}
      end={{ x: 0.5, y: 1.0 }}
      locations={[0, 0.5, 0.6]}
      colors={["silver", "red", "white"]}
      style={styles.contain}
    >
      <View style={styles.bottomgradien}>
        <TouchableOpacity
          onPress={DetaiHandress}
          style={{ flexDirection: "row" }}
        >
          <Image source={{ uri: user.Avatar }} style={styles.imges}></Image>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.title}>{user.Hoten}</Text>
              <TimeAgo
                style={{ fontSize: 12, color: "blue" }}
                time={databaiviet.createdAt}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 20,
              }}
            >
              <MaterialIcons name={quyen} size={20} color="black" />
              {databaiviet.Loaction != null ? (
                <Text>-Bạn đang ở {databaiviet.Loaction}</Text>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginRight: 10,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            marginTop: -50,
          }}
          onPress={() => {
            setIsVisible2(true);
          }}
        >
          <Text style={{ fontSize: 35 }}>...</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 10, paddingHorizontal: 6 }}>
        <Text>{databaiviet.Trangthai}</Text>
        <Text>{databaiviet.Fell}</Text>
      </View>
      {showImage == true && (
        <Swiper style={{ position: "relative", height: 450 }} loop={true}>
          {anh.map((image, index) => (
            <View key={index}>
              {/* <SkeletonPlaceholder> */}
                <View style={styles.mapImg}>
                  <Text>
                    {index + 1}/{anh.length}
                  </Text>
                </View>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setIsViewerOpen(true);
                    setCurrentImageIndex(index);
                  }}
                >
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: "auto",
                      height: 440,
                      zIndex: 0,
                    }}
                  />
                </TouchableWithoutFeedback>
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
              {/* </SkeletonPlaceholder> */}
            </View>
          ))}
        </Swiper>
      )}
      <View style={styles.viewsa}>
        <Text style={{ fontSize: 20 }}>
          {" "}
          {numberLike >= 1000
            ? (numberLike / 1000).toFixed(1) + "k"
            : numberLike}{" "}
          Like
        </Text>
        <Text style={{ fontSize: 20 }}> {soluongCmt} Bình luận</Text>
      </View>
      <View
        style={{
          height: 50,
          flexDirection: "row",
          backgroundColor: "#444444",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={handleLike}
        >
          <AntDesign
            name="heart"
            size={24}
            color="white"
            color={isLiked ? "red" : "white"}
            // color={databaiviet.Like.filter(x => x._id == props.userDn).length > 0 ? "red" : "white"}
          />
          <Text style={{ color: "white" }}> Like</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            selectCmt();
            setIsVisible(true);
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <EvilIcons name="comment" size={34} color="white" />
          <Text style={{ color: "white" }}> Comemnt</Text>
        </TouchableOpacity>

        <Modal
          visible={isVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleModal}
        >
          <LinearGradient
            colors={["red", "purple", "white"]}
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <TouchableWithoutFeedback onPress={handleBackdropPress}>
              <View
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: 40,
                  paddingHorizontal: 16,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontSize: 18 }}>
                  {numberLike >= 1000
                    ? (numberLike / 1000).toFixed(1) + "k"
                    : numberLike}{" "}
                  <AntDesign name="heart" size={20} color="red" /> Người Thích
                  bài viết này{" "}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={{ flex: 1 }}>
              <FlatList
                style={{ flex: 0.9 }}
                data={binhluan}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <Coment
                      item={item}
                      index={index}
                      userdn={props.userDn}
                      navigation={props.navigation}
                      handleTextInputChange={handleTextInputChange}
                      idbaiviet={databaiviet._id}
                      setParentId={setParentId}
                    />
                  );
                }}
              />
            </View>
            <View style={styles.view7}>
              <Text style={{ justifyContent: "flex-start" }}>Quy tắc</Text>
              <TextInput
                placeholder="Viết bình luận ... "
                style={styles.txt1}
                // placeholderTextColor={"white"}
                multiline
                onChangeText={handleTextInputChange}
                underlineColorAndroid="transparent"
                value={Noidung}
              ></TextInput>
              <View style={styles.view3}>
                <View style={{ width: 80, height: 50 }}>
                  {isimageCmt == true && (
                    <View style={styles.view3_32}>
                      <TouchableOpacity>
                        <Entypo name="camera" size={24} color="black" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={pickImages}
                        style={styles.touchH}
                      >
                        <Entypo name="image" size={24} color="green" />
                      </TouchableOpacity>
                    </View>
                  )}
                  {isimageCmt === false && (
                    <View
                      style={{ width: 50, height: 120, position: "relative" }}
                    >
                      <Image source={{ uri: imageCmt }} style={styles.img3} />
                      <TouchableOpacity
                        onPress={HandelerDeletePickture}
                        style={{ position: "absolute", right: -10, top: -10 }}
                      >
                        <MaterialIcons
                          name="highlight-remove"
                          size={22}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => SendComment(imageCmt)}
                >
                  <Ionicons name="md-send-sharp" size={20} color="blue" />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </Modal>
        <TouchableOpacity
          onPress={() => {
            onShare();
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <FontAwesome name="share" size={24} color="white" />
          <Text style={{ color: "white" }}> Share</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isVisible2}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal2}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress2e}>
          <View
            style={{
              borderRadius: 10,
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                flex: 0.4,
                borderRadius: 12,
              }}
            >
              <View style={{ padding: 20 }}>
                <TouchableOpacity style={styles.touchcmt}>
                  <AntDesign name="pushpino" size={24} color="black" />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Ghim bài viết{" "}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.touchcmt, styles.toucb2]}>
                  <Ionicons name="md-save-outline" size={24} color="black" />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Lưu bài viết{" "}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.touchcmt, styles.toucb2]}>
                  <EvilIcons name="link" size={27} color="black" />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Sao chép liên kết{" "}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.touchcmt, styles.toucb2]}>
                  <AntDesign name="staro" size={24} color="black" />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Thêm vào yêu thích{" "}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.touchcmt, styles.toucb2]}>
                  <Octicons name="report" size={24} color="black" />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Báo cáo bài viết
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.touchcmt, styles.toucb2]}>
                  <Entypo name="unread" size={24} color="black" />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Quản trị feed
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </LinearGradient>
  );
});
export default FlatItem;
const styles = StyleSheet.create({
  contain: {
    backgroundColor: "#333333",
    flex: 1,
    width: "100%",
    height: "100%",
    marginTop: 7,
  },
  view3: {
    justifyContent: "space-between",
    width: "100%",
    height: 25,
    paddingHorizontal: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 25,
    fontWeight: "900",
  },
  bodyView: {
    width: 400,
    height: 450,
  },
  bodyView2: {
    marginHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  titleTxt: {
    fontSize: 17,
    fontWeight: "500",
  },
  detail: {
    right: 15,
    backgroundColor: "white",
    width: 105,
    height: 30,
    alignItems: "center",
    borderRadius: 20,
  },
  bottomgradien: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mapImg: {
    width: 40,
    height: 30,
    backgroundColor: "rgba(192,192,192, 0.5)",
    position: "absolute",
    borderRadius: 15,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    right: 15,
  },
  view3_3: {
    flexDirection: "row",
    width: "50%",
  },
  view3_32: {
    flexDirection: "row",
    width: "50%",
    marginTop: 10,
  },
  imges: {
    width: 39,
    height: 44,
    borderRadius: 100,
    marginHorizontal: 6,
  },
  viewsa: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#999999",
  },
  touchcmt: {
    flexDirection: "row",
  },
  view7: {
    width: "100%",
    height: 100,
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  touch3: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,
  },
  view8: {
    height: 50,
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  img3: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginHorizontal: 6,
  },
  txtx: {
    color: "black",
  },
  title: {
    color: "black",
    fontSize: 20,
    fontWeight: "600",
  },
  touchH: {
    marginLeft: 10,
  },
  toucb2: {
    marginTop: 20,
  },
  txt1: {
    width: "100%",
    height: 45,
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
    padding: 6,
    color: "black",
  },
});
