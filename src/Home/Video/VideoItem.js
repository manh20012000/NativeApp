import {
  StyleSheet,
  AppState,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Animated,
  Easing,
  TextInput,
  Modal,
  Keyboard,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { React, useState, useEffect, useRef, useCallback, memo } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import HTML from "react-native-render-html";
import { addComment } from "../../Redex/Reducer/updateComentChildren.js";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import Constants from "expo-constants";
import { MaterialIcons } from "@expo/vector-icons";
import Comment from "./Comment.js";
import path from "../../confige/config.js";
import uuid from "uuid/v4";
import { checkAndRefreshToken } from "../../confige/ComponencheckingToken.js";
import { BottomSheet } from "react-native-btr";
const VideoItem = ({ item, index, action, navigation }) => {
  // console.log(action)
  const { width } = useWindowDimensions();
  const { height } = Dimensions.get("window");
  const count = useSelector((state) => state.auth.value);
  const [dataUser, setDataUser] = useState(count);
  const dispath = useDispatch();
  const [selectedTab, setSelectedTab] = useState("For Your");
  const [inFullscreen, setInFullsreen] = useState(false);
  const [inFullscreen2, setInFullsreen2] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const refVideo = useRef(null);
  const refVideo2 = useRef(null);
  const refScrollView = useRef(null);
  const [datavideo, setDataVideo] = useState(item);
  //  console.log(datavideo.Video)
  const user = datavideo.User;
  const videoRef = useRef(null);
  const [play, setPlay] = useState(action);
  const [showControls, setShowControls] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isSeekBarVisible, setSeekBarVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [stateSelect, setStateSelect] = useState(true);
  const [processingTime, setProgress] = useState(0);
  const [commentsUpdatedExtra, setCommentsUpdatedExtra] = useState(0);
  const calculateHeight = () => {
    // console.log(height)
    // Tính toán chiều cao dựa trên độ phân giải của thiết bị
    const calculatedHeight = Math.round(height - 50); // Thay 1920 bằng độ phân giải chiều cao của thiết bị của bạn
    // console.log(calculatedHeight)
    return calculatedHeight;
  };

  // Sử dụng giá trị chiều cao được tính toán
  const dynamicHeight = calculateHeight();

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setVideoDuration(status.durationMillis || 0);
    }
  };
  useEffect(() => {
    setPlay(action);
    if (action == true) {
      videoRef.current.setPositionAsync(0); // Đặt lại thời gian video về 0
      videoRef.current.playAsync();
      setProgress(0);
    }
    setShowControls(false);
  }, [action]);

  const handleScreenTouch = async () => {
    // if (videoRef.current) {
    //   videoRef.current.getStatusAsync().then((status) => {
    //     // Log thời gian đã chạy của video
    //     console.log('Thời gian đã chạy:', status.positionMillis);
    //   });
    // }
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      const { positionMillis, durationMillis } = status;

      // Log thời gian đã xem và tổng thời gian video
      // console.log('Thời gian đã xem:', positionMillis);
      //   console.log('Tổng thời gian video:', durationMillis);
      const currentProgress = (positionMillis / durationMillis) * 100;
      setProgress(currentProgress);
    }
    setPlay(!play);
    setShowControls(!showControls);
    handeMisstore();
    setSeekBarVisible(!isSeekBarVisible);
  };
  const discAnimatedValue = useRef(new Animated.Value(0)).current;
  const discAnimation = {
    transform: [
      {
        rotate: discAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };
  const handeMisstore = () => {
    if (play) {
      Animated.loop(
        Animated.timing(discAnimatedValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      Animated.loop(
        Animated.timing(discAnimatedValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).stop();
    }
  };
  useEffect(() => {
    handeMisstore();
  });
  // setlile cho tym

  const [isLiked, setIsLiked] = useState(false);

  const [soluongCmt, setSoluongcmt] = useState(datavideo.SoluongCmt);
  // useEffect(() => {
  //   const listLike = async () => {
  //     try {
  //       const isChecked = await checkAndRefreshToken(dispath, count);
  //       if (!isChecked) {
  //         console.log("Token hết hạn, cần đăng nhập lại");
  //         // Thực hiện điều hướng về trang đăng nhập nếu cần
  //         return null;
  //       } else {
  //         const { data } = await axios.post(
  //           `${path}/selectLikeVideo`,
  //           {
  //             IdVideo: datavideo._id,
  //           },
  //           {
  //             headers: {
  //               "Content-Type": "multipart/form-data",
  //               authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
  //             },
  //           }
  //         );
  //         console.log(data.data);
  //         setArrlike(data);
  //       }
  //     } catch (err) {
  //       console.log(err, "jajaja");
  //     }
  //   };
  //   listLike();
  // }, []);
  useEffect(() => {
    const trangthai = () => {
      datavideo.Like.forEach((item) => {
        if (item === count._id) {
          setIsLiked(true);
        }
      });
    };
    trangthai();
  }, []);
  const [numberLike, setNumber] = useState(datavideo.SoluongTym);
  let soluongTim = numberLike;
  const handleLike = async () => {
    let Liked = !isLiked;
    setIsLiked(Liked);
    if (isLiked === false) {
      soluongTim = soluongTim + 1;
      setNumber(soluongTim);
    } else if (isLiked === true) {
      if (soluongTim > 0) {
        soluongTim = soluongTim - 1;
        setNumber(soluongTim);
      }
    }
    try {
      const isChecked = await checkAndRefreshToken(dispath, count);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        const { data } = await axios.post(
          `${path}/LikeVideo`,
          {
            idUser: dataUser._id,
            IdVideo: datavideo._id,
            Soluong: soluongTim,
            nameComemnt: count.Hoten,
            avatarSend: count.Avatar,
            title: "video",
            messagenotifi: `@[${count.Hoten}](id:${count._id}) thích video của bạn`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
            },
          }
        );
      }
    } catch (err) {
      console.log(err, "loiox khi live");
    }
  };

  const renderers = {
    strong: (htmlAttribs, children, convertedCSSStyles, passProps) => {
      const content = passProps.rawChildren[0].data;
      let textStyle = {
        color: "white", // Màu mặc định là trắng
      };
      if (content.includes("@") || content.includes("#")) {
        textStyle.fontWeight = "bold";
      }
      return <p style={textStyle}> {content} </p>;
    },
  };
  // thực hiện vơis phần comment
  const [PopupTextinput, setPopup] = useState(true);
  const [isVisible2, setIsVisible2] = useState(false);
  const toggleModal2 = () => {
    setPopup(true);
    setIsVisible2(!isVisible2);
    Keyboard.dismiss();
  };

  const handleBackdropPress2e = () => {
    setIsVisible2(false);
    setIsVisible3(false);
  };
  const inputRef = useRef(null);
  const [isVisible3, setIsVisible3] = useState(false);
  const toggleModal3 = () => {
    setPopup(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setIsVisible3(!isVisible3);
  };

  const [conten, setConten] = useState("");
  const [comment, setComment] = useState([]);
  const [Skipcomemnt, setSkip] = useState(0);
  const updateQualityComemnt = (qualitycoment, indexcoment, skip) => {
    setSkip(skip);
    console.log(indexcoment, qualitycoment, skip);
    // Sử dụng map để tạo một bản sao mới của mảng với giá trị được cập nhật
    const updatedComments = comment.map((cmt, index) => {
      if (index === indexcoment) {
        // Nếu là chỉ mục cần cập nhật, thì cập nhật giá trị quality
        return {
          ...cmt,
          SoluongCommentChildrent: qualitycoment,
        };
      }
      // Nếu không phải là chỉ mục cần cập nhật, giữ nguyên giá trị
      return cmt;
    });

    // Cập nhật lại mảng comment
    setComment(updatedComments);
  };

  const [soluongcomemtChidrent, setSoluongcomemtChidrent] = useState(0);
  const [parentId, setParentId] = useState(null);
  const handleSetParentId = (newParentId) => {
    setParentId(newParentId);
  };
  const handleTextInputChange = (text) => {
    setPopup(false);
    setConten(text);
    if (text != "") {
      setPopsend(true);
    } else {
      // setParentId(null);
      setPopsend(false);
    }
  };
  // thưucj hiện selelect bình luận

  const [redCircle] = useState(new Animated.Value(0));
  const [blackCircle] = useState(new Animated.Value(180)); // Bắt đầu ở 180 độ, để chúng xoay cạnh nhau
  const [loading, setLoading] = useState(false);
  const startRotation = () => {
    Animated.timing(redCircle, {
      toValue: 180,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(blackCircle, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const [leng, setLeng] = useState(0);
  const selectCmt = async () => {
    if (stateSelect) {
      setLoading(true);
      startRotation();
      try {
        const isChecked = await checkAndRefreshToken(dispath, count);
        if (!isChecked) {
          console.log("Token hết hạn, cần đăng nhập lại");
          // Thực hiện điều hướng về trang đăng nhập nếu cần
          return null;
        } else {
          console.log(datavideo._id, leng);
          const { data } = await axios.post(
            `${path}/api_CommentVideoGet`,
            {
              idVideo: datavideo._id,
              Skips: leng,
              // Giới hạn số comment lấy về là 13
            },
            {
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
              },
            }
          );
          if (data.data !== null) {

            setComment(data.data);
            setLeng(leng + 15);
          }
        }
      } catch (error) {
        console.error("Error fetching comments video item:", error);
      } finally {
        setLoading(false);
        setLeng(leng + 10); // Cập nhật vị trí để bỏ qua 13 comment đã lấy
        setStateSelect(false);
      }
    }
  };
  const selectCmt2 = async () => {
    if (stateSelect) {
      setLoading(true);
      startRotation();
      try {
        const isChecked = await checkAndRefreshToken(dispath, count);
        if (!isChecked) {
          console.log("Token hết hạn, cần đăng nhập lại");
          // Thực hiện điều hướng về trang đăng nhập nếu cần
          return null;
        } else {
          console.log(datavideo._id, leng);
          const { data } = await axios.post(
            `${path}/api_CommentVideoGet`,
            {
              idVideo: datavideo._id,
              Skips: 0,
              // Giới hạn số comment lấy về là 13
            },
            {
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
              },
            }
          );
          if (data.data !== null) {

            setComment(data.data);
            setLeng(0);
          }
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
        setLeng(leng + 10); // Cập nhật vị trí để bỏ qua 13 comment đã lấy
        setStateSelect(false);
      }
    }
  };
  const [statusLoad, setStatusLoad] = useState(false);
  Keyboard.addListener("keyboardDidHide", () => {
    // Xử lý khi bàn phím biến mất
  });
  const [Popsend, setPopsend] = useState(false);
  const [textInputHeight, setTextInputHeight] = useState(40);
  // sendcommentVideo
  const [commentsUpdated, setCommentsUpdated] = useState(0);
  const [sendComemtChildren, setSendCommentChidren] = useState(null);

  const SendComment = async () => {
    let soluong = soluongCmt + 1;
    if (conten === "") {
      return null;
    }
    setCommentsUpdated((prev) => prev + 1);
    let contens = conten;
    setConten("");
    const myId = uuid();

    try {
      const isChecked = await checkAndRefreshToken(dispath, count);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        if (parentId == null) {
          const newComment = {
            _id: myId,
            UserCmt: dataUser._id,
            idVideo: datavideo._id,
            Content: contens,
            Soluongcmt: soluong,
            SoluongCommentChildrent: 0,
            User: dataUser,
            Timing: new Date().toISOString(),
            comments: [],
          };

          setComment([newComment, ...comment]);
        } else if (parentId != null) {
          console.log("taok cmnsn con");
          const newComment = {
            _id: myId,
            UserCmt: dataUser._id,
            idVideo: datavideo._id,
            Content: contens,
            Soluongcmt: soluong,
            idParentComment: parentId,
            User: dataUser,
            Timing: new Date().toISOString(),
          };
          setComment((prevBinhLuan) =>
            prevBinhLuan.map((comment) =>
              comment._id === parentId
                ? {
                  ...comment,
                  comments: [...comment.comments, newComment],
                }
                : comment
            )
          );
          // dispath(addComment(newComment));
          // setComment((prevComments) => [newComment, ...prevComments]);
          // setSendCommentChidren(newComment);
          console.log("jajaja");
        }
        console.log(soluong, "so lương");
        const { data } = await axios.post(
          `${path}/api_CommentVideoPost`,
          {
            _id: myId,
            UserCmt: dataUser._id,
            idVideo: datavideo._id,
            Conten: contens,
            Soluongcmt: soluong,
            idParentComment: parentId,
            nameComemnt: count.Hoten,
            avatarSend: count.Avatar,
            title: "video",
            messagenotifi: `@[${count.Hoten}](id:${count._id}) bình luận video của bạn`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
            },
          }
        );
        setParentId(null);
        setSoluongcmt(soluong);
        setConten("");
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  const deleteComment = async (SoluongCommentChildrent, idComment) => {
    try {
      setLoading(true);
      const updatedComments = comment.filter((item) => item._id !== idComment);
      setComment(updatedComments);
      console.log(SoluongCommentChildrent, idComment, "log1");
      setSoluongcmt(soluongCmt - SoluongCommentChildrent);
      const isChecked = await checkAndRefreshToken(dispath, count);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        const { data } = await axios.delete(
          `${path}/deleteCommentVideo/${idComment}/${datavideo._id}/${SoluongCommentChildrent}`
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={handleScreenTouch}>
      <View
        style={{
          // width: "100%",
          // // position: "relative",
          // height: "100%",
          flex: 1,
          backgroundColor: "black",
        }}
      >
        <Video
          source={{ uri: datavideo.Video }}
          // source={{
          //   uri: "https://www.tiktok.com/@guoguokk/video/7417326117419240712?is_from_webapp=1&sender_device=pc",
          // }}
          style={{
            flex: 1,
            // height: 758,
            height: height - 49,
            // position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
          ref={videoRef}
          resizeMode={
            datavideo.resizeMode ? ResizeMode.CONTAIN : ResizeMode.CONTAIN
          }
          // resizeMode={ResizeMode.CONTAIN}
          isLooping
          shouldPlay={play}
          useNativeControls={false}
        />
        {showControls && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.5,
            }}
          >
            <MaterialIcons name="play-arrow" size={60} color="white" />
          </View>
        )}
        <View style={styles.BottomSelect}>
          <View style={styles.BootomLeftSelection}>
            <Text style={styles.chanelName}> {user.Hoten} </Text>
            <View style={styles.BootomLeftSelection1}>
              {/* <HTML
                            source={{ html: datavideo.VideoConten }}
                            contentWidth={width}
                            renderers={renderers}
                          /> */}
              <Text style={styles.caption}> {datavideo.VideoConten} </Text>
            </View>
          </View>
          <View style={styles.musicContainer}>
            {/* <Image
              style={styles.musicIcon}
              source={require("D:/LaptrinhMobile/NativeApp/src/Image/music-note.png")}
            /> */}
            <Text style={styles.musicName}>
              nền nhạc - {datavideo.MusicName}
            </Text>
          </View>
          <View style={styles.bottomRightSelection}>
            <Animated.View style={[styles.MusicDisc, discAnimation]}>
              <MaterialCommunityIcons
                name="music-circle"
                size={40}
                color="white"
              />
            </Animated.View>
          </View>
        </View>
        <View style={styles.verticalBar}>
          <View style={[styles.verticalItem, styles.avatarContainer]}>
            <View
              style={{
                backgroundColor: "#988888",
                width: 50,
                height: 50,
                borderRadius: 50,
              }}
            >
              <Image
                style={{ width: 50, height: 50, borderRadius: 50 }}
                source={{ uri: user.Avatar }}
              ></Image>
            </View>
            <View style={styles.buttonFlow}>
              <Ionicons name="add-circle" size={24} color="red" />
            </View>
          </View>
          <TouchableOpacity onPress={handleLike} style={styles.verticalItem}>
            <AntDesign
              name="heart"
              size={28}
              color={isLiked ? "red" : "white"}
            />
            <Text style={{ fontSize: 10, color: "white", fontWeight: "bold" }}>
              {numberLike >= 1000
                ? (numberLike / 1000).toFixed(1) + "k"
                : numberLike}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.verticalItem}
            onPress={() => {
              toggleModal2();
              selectCmt();
            }}
          >
            <FontAwesome name="comment" size={24} color="white" />
            <Text style={{ fontSize: 10, color: "white", fontWeight: "bold" }}>
              {soluongCmt >= 1000
                ? (soluongCmt / 1000).toFixed(1) + "k"
                : soluongCmt}
            </Text>
          </TouchableOpacity>
          <View style={styles.verticalItem}>
            <MaterialCommunityIcons name="share" size={28} color="white" />
            <Text style={styles.verticalBarText}> Share </Text>
          </View>
        </View>
        <Modal
          visible={isVisible2}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleModal2}
        >
          <View
            style={{
              borderRadius: 10,
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
          >
            <TouchableWithoutFeedback onPress={handleBackdropPress2e}>
              <View
                onMoveShouldSetResponderCapture={handleBackdropPress2e}
                style={{ flex: 0.4 }}
              ></View>
            </TouchableWithoutFeedback>
            <View
              style={{
                flex: 0.6,
                backgroundColor: "white",
                justifyContent: "flex-end",
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 15, color: "black", fontWeight: "bold" }}
                >
                  {soluongCmt >= 10000
                    ? (soluongCmt / 1000).toFixed(1) + "k"
                    : soluongCmt}
                  Comments
                </Text>
              </View>
              <View style={{ flex: 1, position: "relative" }}>
                {loading == true && (
                  <View
                    style={{
                      position: "absolute",
                      flexDirection: "row",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      alignItems: "center",
                      top: 120,
                      left: 160,
                    }}
                  >
                    <Animated.View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 15,
                        backgroundColor: "red",
                        transform: [
                          {
                            rotate: redCircle.interpolate({
                              inputRange: [0, 180],
                              outputRange: ["0deg", "180deg"],
                            }),
                          },
                        ],
                      }}
                    />
                    <Animated.View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 15,
                        backgroundColor: "black",
                        transform: [
                          {
                            rotate: blackCircle.interpolate({
                              inputRange: [0, 180],
                              outputRange: ["0deg", "180deg"],
                            }),
                          },
                        ],
                      }}
                    />
                  </View>
                )}
                <View style={{ flex: 0.8 }}>
                  <FlatList
                    data={comment}
                    key={commentsUpdatedExtra}
                    initialNumToRender={8}
                    extraData={commentsUpdatedExtra}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item, index }) => {
                      // {
                      //   console.log(item);
                      // }
                      return (
                        <Comment
                          item={item}
                          index={index}
                          onDeleteComment={deleteComment}
                          handleTextInputChange={handleTextInputChange}
                          setParentId={handleSetParentId}
                          setLoading={setLoading}
                          statusLoad={setStatusLoad}
                          setSoluongcomemtChidrent={setSoluongcomemtChidrent}
                          navigation={navigation}
                          sendComemtChildren={sendComemtChildren}
                          setqualityComment={setSoluongcmt}
                          QualityComment={soluongCmt}
                          updateQualityComemnt={updateQualityComemnt}
                          Skipcomemnt={Skipcomemnt}
                        // setCommentArr={handleSetCommentArr}
                        // handleComemntData={handleComemntData}
                        />
                      );
                    }}
                    removeClippedSubviews
                    onEndReached={selectCmt2}
                    onEndReachedThreshold={(0, 5)}
                  />
                </View>
              </View>
            </View>
            <Animated.View
              style={{
                width: "100%",
                height: textInputHeight + 60,
                position: "absolute",
                bottom: 0,
                backgroundColor: "pink",
              }}
            >
              {/* <View style={{ width: "100%", height: 12 }}>
               
                <Text>dhsjhdjshdsnjdjs</Text>
              </View> */}
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  marginHorizontal: 10,
                  marginTop: "2%",
                  marginBottom: 5,
                }}
              >
                <TouchableOpacity>
                  <Text style={{ fontSize: 22 }}> 😍 </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ fontSize: 22 }}> 🤣 </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ fontSize: 22 }}> 😊 </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ fontSize: 22 }}> 👍 </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ fontSize: 22 }}> 👌 </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ fontSize: 22 }}> 😒 </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ fontSize: 22 }}> ❤️ </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  flex: 0.9,
                }}
              >
                <Image
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 100,
                    marginLeft: 2,
                    marginBottom: 1,
                  }}
                  source={{ uri: dataUser.Avatar }}
                ></Image>
                {PopupTextinput == true && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                      width: "85%",
                      backgroundColor: "#DDDDDD",
                      borderRadius: 10,
                      marginRight: 10,
                      height: 45,
                    }}
                  >
                    <TouchableOpacity
                      onPress={toggleModal3}
                      style={{ width: "70%" }}
                    >
                      <Text style={{ color: "#999999" }}> Add comment... </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={{ fontSize: 24, fontWeight: "500" }}>@</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Entypo name="emoji-happy" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <AntDesign name="gift" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                )}
                {PopupTextinput == false && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                      width: "85%",
                      backgroundColor: "#DDDDDD",
                      borderRadius: 10,
                      marginRight: 10,
                      height: textInputHeight + 15,
                    }}
                  >
                    <TextInput
                      style={{ width: "70%", padding: 5, height: "auto" }}
                      multiline
                      ref={inputRef}
                      autoFocus={true}
                      value={conten}
                      placeholder="  Add comment..."
                      onContentSizeChange={(e) => {
                        const { height } = e.nativeEvent.contentSize;
                        setTextInputHeight(height);
                      }}
                      onChangeText={handleTextInputChange}
                    ></TextInput>
                    <TouchableOpacity>
                      <Text style={{ fontSize: 24, fontWeight: "500" }}>@</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Entypo name="emoji-happy" size={24} color="black" />
                    </TouchableOpacity>
                    {Popsend === false && (
                      <TouchableOpacity>
                        <AntDesign name="gift" size={24} color="black" />
                      </TouchableOpacity>
                    )}
                    {Popsend === true && (
                      <TouchableOpacity onPress={SendComment}>
                        <AntDesign name="arrowup" size={24} color="red" />
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            </Animated.View>
          </View>
        </Modal>
        {isSeekBarVisible && (
          <View
            style={{
              position: "absolute",
              width: "95%",
              height: 2,
              backgroundColor: "#888888",
              bottom: 0,
              marginHorizontal: 10,
            }}
          >
            <View
              style={{
                position: "absolute",
                width: `${processingTime}%`,
                height: 3,
                backgroundColor: "white",
                zIndex: 1,
              }}
            ></View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
export default memo(VideoItem);
const styles = StyleSheet.create({
  contain: {
    width: "100%",
    position: "relative",
    height: 758,
    backgroundColor: "black",
  },
  BottomSelect: {
    position: "absolute",
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  BottomSelect: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  BootomLeftSelection1: {
    height: "auto",
    width: 422,
  },
  BootomLeftSelection: {
    flex: 4,
    bottom: 25,
    position: "absolute",
    left: 5,
  },
  bottomRightSelection: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  chanelName: {
    color: "white",
    fontWeight: "bold",
    fontVariant: ["lining-nums"],
  },
  caption: {
    color: "white",
    marginVertical: 8,
    width: "50%",
  },
  musicContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 3,
    left: 3,
    width: 120,
    backgroundColor: "pink",
  },
  musicIcon: {
    width: 12,
    height: 12,
    marginRight: -16,
    position: "absolute",
    bottom: 6,
  },
  musicName: {
    color: "white",
    position: "absolute",
    marginLeft: 40,
    bottom: 3,
    fontSize: 11,
    fontWeight: "500",
    fontStyle: "italic",
  },
  verticalBar: {
    position: "absolute",
    right: 7,
    bottom: 50,
    height: 260,
    justifyContent: "space-around",
    flexDirection: "column",
  },
  verticalItem: {
    marginBottom: 24,
    alignItems: "center",
    marginRight: -3,
  },
  verticalBarText: {
    color: "white",
    marginTop: 4,
    fontSize: 10,
    fontWeight: "bold",
  },
  avatarContainer: {
    marginBottom: 48,
  },
  avatar: {
    width: 50,
    height: 48,
    borderRadius: 24,
  },
  buttonFlow: {
    position: "absolute",
    top: 35,
    right: 10,
  },
  floatMusicNote: {
    position: "absolute",
    bottom: 15,
    right: 40,
    width: 16,
    height: 16,
  },
  MusicDisc: {
    bottom: 6,
    fontStyle: "italic",
  },
});
