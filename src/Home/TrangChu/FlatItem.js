import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Share,
  FlatList,
  TextInput,
  Linking,
  KeyboardAvoidingView,
  Animated,
  useWindowDimensions,
} from "react-native";
import { React, useState, useRef, useEffect, memo } from "react";
import { FontAwesome, EvilIcons, AntDesign } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import ImageViewer from "react-native-image-zoom-viewer";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import CommentPanrent from "./comment.js";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import TimeAgo from "react-native-timeago";
import { LinearGradient } from "expo-linear-gradient";
// import RenderHtml from "react-native-render-html";
import { Octicons } from "@expo/vector-icons";
import path from "../../confige/config.js";
import uuid from "uuid/v4";
import { login } from "../../Redex/Reducer/auth.slice.js";
import { checkingToken } from "../../confige/CheckingToken.js";
import { useSelector, useDispatch } from "react-redux";
import { checkAndRefreshToken } from "../../confige/ComponencheckingToken.js";
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const FlatItem = (props) => {
  const userCurent = useSelector((state) => state.auth.value);
  const dispath = useDispatch();
  const { width, height } = useWindowDimensions();
  // console.log(userCurent);
  const user = props.item.User; //
  // console.log(props.item);
  const dataContenpost = props.item;
  // console.log(dataContenpost);
  const [isLiked, setIsLiked] = useState(
    dataContenpost.Like.some((like) => {
      // console.log(like);
      return like.User === props.userDn; // Kiểm tra dựa trên ID của người dùng
    })
  );

  // Đoạn code tiếp theo liên quan đến render hoặc xử lý

  const [arrlike, setArrlike] = useState(dataContenpost.Like);
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

  const [numberLike, setNumber] = useState(dataContenpost.SoluongTym);
  const index = props.index;
  let soluongTim = numberLike;

  const handleLike = async () => {
    // hàm này thực hiện cho việc kiểm tra xem kile hay bỏ like bài viết đó đi
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
      const isChecked = await checkAndRefreshToken(dispath, userCurent);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        console.log("Body sent for like/dislike:", {
          idUser: userCurent._id,
          idBaiPost: dataContenpost._id,
          Soluong: soluongTim,
          Trangthai: Liked, // trạng thái đã like hay chưa
          nameLike: dataContenpost.User.Hoten,
          avatarSend: userCurent.Avatar,
          title: "Thích bài viết ",
          messagenotifi: `@[${userCurent.Hoten}](id:${userCurent._id}) thích bài viết của bạn`,
        });
        const { data } = await axios.post(
          `${path}/tymPost`,
          {
            idUser: userCurent._id,
            idBaiPost: dataContenpost._id,
            Soluong: soluongTim,
            Trangthai: Liked, // trạng thái đã like hay chưa
            nameLike: dataContenpost.User.Hoten,
            avatarSend: userCurent.Avatar,
            title: "Thích bài viết ",
            messagenotifi: `@[${userCurent.Hoten}](id:${userCurent._id}) thích bài viết của bạn`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
              Authorization: `Bearer ${isChecked.accessToken}`,
            },
          }
        );
        console.log(data);
      }
      return 0;
    } catch (err) {
      console.log(err, "lõi với tymoist flatitem");
    }
  };
  const DetaiHandress = () => {
    if (userCurent._id === dataContenpost.User._id) {
      props.navigation.navigate("Infor", userCurent);
    } else {
      props.navigation.navigate("SeeDeTail", dataContenpost.User);
    }
  };
  // set phongd to màn hinhg
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const anh = dataContenpost.Image;
  // console.log(anh)
  const images = dataContenpost.Image.map((url) => ({ url }));
  const [showImage, setImage] = useState(false);
  const [quyen, setquyen] = useState("");

  useEffect(() => {
    const renderImgae = () => {
      if (anh.length > 0) {
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
  const [soluongCmt, setSoluongcmt] = useState(dataContenpost.SoluongCmt);
  const [Noidung, setNoiDung] = useState("");
  const [binhluan, setBinhLuan] = useState(dataContenpost.Comment);
  const [parentId, setParentId] = useState(null);
  const handleTextInputChange = (text) => {
    const parts = text.split("@");
    setNoiDung(text);
  };
  const selectCmt = async () => {
    console.log(dataContenpost._id);
    try {
      // console.log("nahfy van", userCurent.accessToken, userCurent.refreshToken);
      const isChecked = await checkAndRefreshToken(dispath, userCurent);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        const { data } = await axios.post(
          `${path}/selectDataCmt`,
          {
            //const { data } = await axios.post(`https://nativeapp-vwvi.onrender.com/selectDataCmt`, {
            idbaiviet: dataContenpost._id,
            skip: 10,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
            },
          }
        );
        setBinhLuan(data.data);
      }
    } catch (error) {
      console.log(error, "logerroflatitem selectCmt");
    }

    // console.log(JSON.stringify(data.data), 'consso;edataacmt')
  };
  // cho phép gữi ảnh với bình luận // sendcomment
  const [CommentChildren, setCommentChildren] = useState([]);
  let [imageCmt, setImageCmt] = useState(null);
  const [isimageCmt, setIsImageCmt] = useState(true);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [selectedImages, setSelectedImages] = useState([]);
  const [refresh, setRefresh] = useState(false);
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
  const [commentArr, setCommentArr] = useState([]);
  const handleSetCommentArr = (comments) => {
    setCommentArr(comments);
    // console.log(comments, 'commentAeee')
  };
  const [comments, setComments] = useState([]);
  const handleComemntData = (comments) => {
    setComments(comments);
    // console.log(comments, 'commentAeee')
  };

  const SendComment = async () => {
    const myId = uuid();
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
    if (parentId == null) {
      const newComment = {
        _id: myId,
        idBaiviet: dataContenpost._id,
        Content: noidung,
        Soluongcmt: soluong,
        SoluongCommentChildrent: 0,
        createdAt: new Date().toISOString(),
        Image: null,
        User: userCurent,
        CommentChildren: commentArr,
        comments: comments,
      };
   
      setBinhLuan([newComment, ...binhluan]);
      // setBinhLuan((prevComments) => [newComment, ...prevComments]);
    } else {
     
      const newComment = {
        _id: myId,
        idBaiviet: dataContenpost._id,
        Content: noidung,
        Soluongcmt: soluong,
        createdAt: new Date().toISOString(),
        parentId: parentId,
        Image: null,
        User: userCurent,
        comments: comments,
      };
      console.log("thêm comment con vào comment cha ");
      setCommentArr((prevComments) => [...prevComments, newComment]);
      setBinhLuan((prevBinhLuan) =>
        prevBinhLuan.map((comment) =>
          comment._id === parentId
            ? { ...comment, comments: [...comment.comments, newComment] }
            : comment
        )
      );

      // let newBinhLuan = [...binhluan];

      // const handlerNewcomment = newBinhLuan.map((comment) =>
      //   comment._id === parentId
      //     ? { ...comment, comments: [...comment.comments, newComment] }
      //     : comment
      // );
      // console.log(
      //   handlerNewcomment,
      //   "khi được log ra màn hình giá trị comment"
      // );
      // setBinhLuan(handlerNewcomment);
    }
    try {
      formData.append("_id", myId);
      formData.append("UserCmt", props.userDn);
      formData.append("idBaiviet", dataContenpost._id);
      formData.append("Noidung", noidung);
      formData.append("Soluongcmt", soluong);
      formData.append("parentId", JSON.stringify(parentId));
      formData.append("nameComemnt", userCurent.Hoten);
      formData.append("avatarSend", userCurent.Avatar);
      formData.append("title", "Bình luận bài viết");
      formData.append(
        "messagenotifi",
        `@[${userCurent.Hoten}](id:${userCurent._id}) bình luận bài viết của bạn`
      );
      if (image) {
        formData.append("imageCmt", {
          uri: image,
          name: `image.jpeg`,
          type: "image/jpeg", // Loại tệp
        });
      }
      const isChecked = await checkAndRefreshToken(dispath, userCurent);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        const { data } = await axios.post(
          `${path}/SendCommentArticles`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
            },
          }
        );
        setParentId(null);
        setSoluongcmt(soluong);
        setImageCmt(null);
        // selectCmt();
      }
    } catch (err) {
      console.log(err, "lỗi với bình luận");
    }
    // etRefresh((prevRefresh) => !prevRefresh); // Đổi giá trị của refresh để buộc re-render
  };

  const handleDeleteAticarl = async () => {
    console.log("haha");
    try {
      // console.log("nahfy van", userCurent.accessToken, userCurent.refreshToken);
      const isChecked = await checkAndRefreshToken(dispath, userCurent);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        const { data } = await axios.delete(
          `${path}/deleteAticarl/${dataContenpost._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
            },
          }
        );
        alert("thoong baso ");
      }
    } catch (err) {
      if (err.response) {
        console.log("loi voiws xoa bai viet", err.response.status);
      } else {
        console.log("loi voiws xoa bai viet", err);
      }
    }
  };
  // Hàm phân tích cú pháp của đoạn text từ server
  const parseText = (text) => {
    const regex = /\@\[(.*?)\]\(id:(.*?)\)|https?:\/\/[^\s]+/g; // Regex để tìm @ và URL
    const parts = [];
    let lastIndex = 0;
    let match;

    // Dùng regex để tìm các đoạn text và link
    while ((match = regex.exec(text)) !== null) {
      const beforeText = text.slice(lastIndex, match.index); // Phần trước regex
      if (beforeText) parts.push({ text: beforeText, user: null, link: null });

      if (match[0].startsWith("http")) {
        // Trường hợp là URL
        parts.push({ text: match[0], user: null, link: match[0] });
      } else {
        // Trường hợp là @mention
        const userName = match[1];
        const userId = match[2];
        parts.push({ text: userName, user: userId, link: null });
      }

      lastIndex = match.index + match[0].length;
    }

    // Thêm phần cuối nếu có
    if (lastIndex < text.length) {
      parts.push({ text: text.slice(lastIndex), user: null, link: null });
    }

    return parts;
  };

  const renderParsedText = (text) => {
    const parsedParts = parseText(text); // Phân tích đoạn text
    return (
      <Text style={{ fontSize: 13, fontWeight: "500" }}>
        {parsedParts.map((part, index) => {
          if (part.user) {
            return (
              <Text
                style={{ color: "blue", fontWeight: "bold" }}
                key={index}
                onPress={async () => {
                  try {
                    // console.log("nahfy van", userCurent.accessToken, userCurent.refreshToken);
                    const isChecked = await checkAndRefreshToken(
                      dispath,
                      userCurent
                    );
                    if (!isChecked) {
                      console.log("Token hết hạn, cần đăng nhập lại");
                      // Thực hiện điều hướng về trang đăng nhập nếu cần
                      return null;
                    } else {
                      const { data } = await axios.post(
                        `${path}/userfind`,
                        {
                          _id: part.user,
                        },

                        {
                          headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
                          },
                        }
                      );
                      // console.log(data);
                      props.navigation.navigate("SeeDeTail", data.data);
                    }
                  } catch (err) {
                    if (err.response) {
                      console.log(
                        "loi voiws xoa bai viet",
                        err.response.status
                      );
                    } else {
                      console.log("loi voiws xoa bai viet", err);
                    }
                  }
                }}
              >
                {part.text}
              </Text>
            );
          } else if (part.link) {
            // Nếu là URL, hiển thị như link
            return (
              <Text
                style={{ color: "blue" }}
                key={index}
                onPress={() => Linking.openURL(part.link)} // Mở URL khi nhấn vào
              >
                {part.text}
              </Text>
            );
          } else {
            // Nếu là text bình thường
            return <Text key={index}>{part.text}</Text>;
          }
        })}
      </Text>
    );
  };
  return (
    <View style={styles.contain}>
      <View style={styles.bottomgradien}>
        <TouchableOpacity
          onPress={DetaiHandress}
          style={{ flexDirection: "row" }}
        >
          <View
            style={{
              width: width / 7,
              height: width / 7,
              borderRadius: width / 7,
              marginHorizontal: 6,
              backgroundColor: "#888888",
              marginTop: "2%",
            }}
          >
            <Image source={{ uri: user.Avatar }} style={styles.imges}></Image>
          </View>

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
              <Text
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  alignSelf: "center",
                  flexDirection: "row",
                }}
              >
                <TimeAgo
                  style={{ fontSize: 12, color: "blue", fontWeight: "bold" }}
                  time={dataContenpost.createdAt}
                />
                <Text style={{ marginTop: 10 }}>
                  {"   "} <MaterialIcons name={quyen} size={20} color="black" />{" "}
                </Text>
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 20,
              }}
            >
              {dataContenpost.Loaction !== "null" ? ( // Kiểm tra nếu Loaction không phải là null hoặc undefined
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "blue",
                    fontStyle: "italic",
                  }}
                >
                  {dataContenpost.Loaction}
                </Text>
              ) : (
                <></>
              )}
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
      <View
        style={{ marginBottom: 10, paddingHorizontal: 6, marginVertical: "2%" }}
      >
        {renderParsedText(dataContenpost.Trangthai)}

        {dataContenpost.Fell !== "null" && (
          // Kiểm tra nếu Fell không phải là null hoặc undefined
          <Text
            style={{
              fontSize: 13,
              fontWeight: "600",
              color: "#444444",
            }}
          >
            {dataContenpost.Fell}
          </Text>
        )}
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
                {/* <Text> {console.log(image)}</Text> */}

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
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {numberLike >= 1000
            ? (numberLike / 1000).toFixed(1) + "k"
            : numberLike}{" "}
          <Text style={{ fontSize: 13 }}>Like</Text>
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {soluongCmt} <Text style={{ fontSize: 13 }}>Bình luận</Text>
        </Text>
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
            color={isLiked ? "red" : "white"}
            // color={dataContenpost.Like.filter(x => x._id == props.userDn).length > 0 ? "red" : "white"}
          />
          <Text style={{ color: "white", fontSize: 13 }}> Like</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            selectCmt();
            setIsVisible(true);
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <EvilIcons name="comment" size={34} color="white" />
          <Text style={{ color: "white", fontSize: 13 }}> Comemnt</Text>
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
                <Text style={{ fontSize: 15 }}>
                  {numberLike >= 1000
                    ? (numberLike / 1000).toFixed(1) + "k"
                    : numberLike}{" "}
                  <AntDesign name="heart" size={18} color="red" /> Người Thích
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
                  // if (item.comments.length > 0) {
                  //   console.log(item.comments, "sau khi log ", index);
                  // }
                  return (
                    <CommentPanrent
                      item={item}
                      index={index}
                      userdn={props.userDn}
                      navigation={props.navigation}
                      handleTextInputChange={handleTextInputChange}
                      idbaiviet={dataContenpost._id}
                      setParentId={setParentId}
                      setCommentArr={handleSetCommentArr}
                      handleComemntData={handleComemntData}
                      toggleModal={toggleModal}
                    />
                  );
                }}
                extraData={binhluan}
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
                  <MaterialIcons name="send" size={24} color="black" />
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
          <Text style={{ color: "white", fontSize: 13 }}> Share</Text>
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
                {user._id === userCurent._id && (
                  <TouchableOpacity
                    onPress={handleDeleteAticarl}
                    style={[styles.touchcmt, styles.toucb2]}
                  >
                    <AntDesign name="delete" size={20} color="black" />
                    <Text
                      style={{
                        marginLeft: 20,
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      Delete
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
export default FlatItem;
const styles = StyleSheet.create({
  contain: {
    backgroundColor: "white",
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
    width: "100%",
    height: "100%",
    borderRadius: 100,
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
// useEffect(() => {
//   const listLike = async () => {
//     try {
//       const { data } = await axios.post(`${path}/selectLike`, {
//         _idBaiviet: dataContenpost._id,
//       });
//       setArrlike(data);
//     } catch (err) {
//       if (err.response) {
//         // Phản hồi trả về mã lỗi không thành công (status code không 2xx)
//         console.log(
//           `Request failed with status màn hình flatitem${err.response.status}`
//         );
//       } else if (err.request) {
//         // Yêu cầu không được gửi đi hoặc không có phản hồi từ server
//         console.error("Request was made but no response was received");
//       } else {
//         // Các loại lỗi khác
//         console.error("Error màn flatitem:", err.message);
//       }
//     }
//   };
//   listLike();
// }, []);
