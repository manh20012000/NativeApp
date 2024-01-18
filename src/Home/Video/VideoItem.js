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
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import Constants from "expo-constants";
import { MaterialIcons } from "@expo/vector-icons";
import Comment from "./Comment.js";
import path from "../../config.js";
// import Video from "react-native-video";
import { BottomSheet } from "react-native-btr";
const VideoItem = ({ item, action, navigation }) => {
  // console.log(action);
  const { width } = useWindowDimensions();
  const count = useSelector((state) => state.auth.value);
  const [dataUser, setDataUser] = useState(count);
  const [selectedTab, setSelectedTab] = useState("For Your");
  // console.log(dataUser)

  const [inFullscreen, setInFullsreen] = useState(false);
  const [inFullscreen2, setInFullsreen2] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const refVideo = useRef(null);
  const refVideo2 = useRef(null);
  const refScrollView = useRef(null);

  const [datavideo, setDataVideo] = useState(item);
  const user = datavideo.User;
  const videoRef = useRef(null);

  const [play, setPlay] = useState(action);
  const [status, setStatus] = useState({});
  const [showControls, setShowControls] = useState(false);
  useEffect(() => {
    setPlay(action);
    if (action == true) {
      videoRef.current.playAsync();
    }
    setShowControls(false);
  }, [action]);

  const handleScreenTouch = () => {
    setPlay(!play);
    setShowControls(!showControls);
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
  useEffect(
    () => {
      if (action) {
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
    }
    //  [discAnimatedValue,AnimatedMusicNodeValue1,AnimatedMusicNodeValue2]
  );
  // setlile cho tym
  const [nblike, setnblike] = useState(item.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [arrlike, setArrlike] = useState(datavideo.Like);
  const [soluongCmt, setSoluongcmt] = useState(datavideo.SoluongCmt);
  const [controlsVisible, setControlsVisible] = useState(false);
  useEffect(() => {
    const listLike = async () => {
      const { data } = await axios.post(`${path}/selectLikeVideo`, {
        IdVideo: datavideo._id,
      });
      setArrlike(data);
    };
    listLike();
  }, []);
  useEffect(() => {
    const trangthai = () => {
      datavideo.Like.forEach((item) => {
        if (item.User === dataUser._id) {
          setIsLiked(item.Trangthai);
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
      const { data } = await axios.post(`${path}/LikeVideo`, {
        idUser: dataUser._id,
        IdVideo: datavideo._id,
        Soluong: soluongTim,
        Trangthai: Liked,
      });
    } catch (err) {
      console.log(err);
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
      return <p style={textStyle}>{content}</p>;
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
  const handleBackdropPress2 = () => {
    setIsVisible2(false);
  };
  const [showOptions, setShowOptions] = useState(false);
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
  const handleBackdropPress3 = () => {
    setIsVisible3(false);
  };
  const [showOptions3, setShowOptions3] = useState(false);
  const handleBackdropPress3e = () => {
    setIsVisible3(false);
  };
  const [conten, setConten] = useState("");
  const [comment, setComment] = useState(datavideo.Comment);
  const [soluongcomemtChidrent, setSoluongcomemtChidrent] = useState(0);
  const [parentId, setParentId] = useState(null);
  const handleSetParentId = (newParentId) => {
    setParentId(newParentId);
    console.log(parentId, newParentId,'bhbbshs1111')
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
  const selectCmt = async () => {
    setLoading(true);
    startRotation();

    try {
      const { data } = await axios.post(`${path}/api_CommentVideoGet`, {
        idVideo: datavideo._id,
      });
      setComment(data.data);
      // console.log(data.data)
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };
  const [statusLoad, setStatusLoad] = useState(false);
  useEffect(() => {
    selectCmt();
  }, [statusLoad]);
  Keyboard.addListener("keyboardDidHide", () => {
    // Xử lý khi bàn phím biến mất
  });
  const [Popsend, setPopsend] = useState(false);
  const [textInputHeight, setTextInputHeight] = useState(40);

  // sendcommentVideo
  const [commentsUpdated, setCommentsUpdated] = useState(0);
  const [sendComemtChildren, setSendCommentChidren] = useState(null);
  const [sendCommentQuik,setQuikCommentCdr]=useState()
  const SendComment = async () => {
    let soluong = soluongCmt + 1;
    if (conten === "") {
      return null;
    }
    setCommentsUpdated((prev) => prev + 1);
    let contens = conten;
    setConten("");
    try {
      if (parentId == null) {
      
        const newComment = {
          UserCmt: dataUser._id,
          idVideo: datavideo._id,
          Content: contens,
          Soluongcmt: soluong,
          SoluongCommentChildrent:0,
          User: dataUser,
          createdAt: new Date(),
        };
        // console.log(newComment)
        setComment((prevComments) => [newComment, ...prevComments]);
      } else if (parentId != null) {
  
        const newComment = {
          UserCmt: dataUser._id,
          idVideo: datavideo._id,
          Content: contens,
          Soluongcmt: soluong,
          parentId: parentId,
          User: dataUser,
          createdAt: new Date(),
        };
        setSendCommentChidren(newComment);
      }
      const { data } = await axios.post(`${path}/api_CommentVideoPost`, {
        UserCmt: dataUser._id,
        idVideo: datavideo._id,
        Conten: contens,
        Soluongcmt: soluong,
        parentId: parentId,
      });
      setParentId(null);
      setSoluongcmt(soluong);
      setConten("");
    } catch (err) {
      console.log(err);
    } finally {
  
      //  console.log(comment)
    }
  };
  const deleteComment = async (SoluongCommentChildrent, idComment) => {
    try {
      setLoading(true);
      const updatedComments = comment.filter((item) => item._id !== idComment);
      setComment(updatedComments);
      console.log(SoluongCommentChildrent, idComment, "log1");
      const { data } = await axios.delete(
        `${path}/deleteCommentVideo/${idComment}/${datavideo._id}/${SoluongCommentChildrent}`
      );
      setComment(data.comments);
      setSoluongcmt(data.soluongcmt);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const deleteCommentChildern = async (SoluongCommentChildrent, idComment) => {
    try {
      setLoading(true);

      const { data } = await axios.delete(
        `${path}/deleteCommentVideo/${idComment}/${datavideo._id}/${SoluongCommentChildrent}`
      );
      // alert(data.message)
      setComment(data.comments);
      setSoluongcmt(data.soluongcmt);
    
    } catch (err) {
      console.log(err)
    } finally {
        setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1, backgroundColor: "white" }}
      onPress={handleScreenTouch}
    >
      <View style={styles.contain}>
        <Video
          source={{ uri: datavideo.Video }}
          style={{
            width: "100%",
            flex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
          ref={videoRef}
          resizeMode={ResizeMode.CONTAIN}
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
            <Text style={styles.chanelName}> {user.Hoten}</Text>

            <View style={styles.BootomLeftSelection1}>
              {/* <HTML
            source={{ html: datavideo.VideoConten }}
            contentWidth={width}
            renderers={renderers}
          /> */}
              <Text style={styles.caption}>{datavideo.VideoConten}</Text>
            </View>
          </View>

          <View style={styles.musicContainer}>
            <Image
              style={styles.musicIcon}
              source={require("D:/lapTrinhMobile/NativeApp/src/Image/music-note.png")}
            />
            <Text style={styles.musicName}>nền nhạc-{datavideo.MusicName}</Text>
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
            <Image style={styles.avatar} source={{ uri: user.Avatar }}></Image>
            <View style={styles.buttonFlow}>
              <Ionicons name="add-circle" size={20} color="red" />
            </View>
          </View>
          <TouchableOpacity onPress={handleLike} style={styles.verticalItem}>
            <AntDesign
              name="heart"
              size={28}
              color={isLiked ? "red" : "white"}
            />
            <Text style={{ fontSize: 13, color: "white",fontWeight:'bold' }}>
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

            <Text style={{ fontSize: 13, color: "white",fontWeight:'bold' }}>
              {soluongCmt >= 1000
                ? (soluongCmt / 1000).toFixed(1) + "k"
                : soluongCmt}
            </Text>
          </TouchableOpacity>
          <View style={styles.verticalItem}>
            <FontAwesome name="share" size={24} color="white" />
            <Text style={styles.verticalBarText}>Share</Text>
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
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <TouchableWithoutFeedback onPress={handleBackdropPress2e}>
              <View style={{ flex: 0.4 }}></View>
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
                  {soluongCmt >= 1000
                    ? (soluongCmt / 1000).toFixed(1) + "k"
                    : soluongCmt}{" "}
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
                    key={commentsUpdated}
                    initialNumToRender={8}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
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
                        />
                      );
                    }}
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
              <View style={{ width: "100%", height: 12 }}></View>
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  marginHorizontal: 10,
                  marginTop: -10,
                  marginBottom: 5,
                }}
              >
                <TouchableOpacity>
                  <Text style={{ fontSize: 22 }}>😍</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ fontSize: 22 }}>🤣</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ fontSize: 22 }}>😊</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ fontSize: 22 }}>👍</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ fontSize: 22 }}>👌</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ fontSize: 22 }}>😒</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ fontSize: 22 }}>❤️</Text>
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
                      <Text style={{ color: "#999999" }}> Add comment ...</Text>
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
                      autoFocus={true}
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
      </View>
    </TouchableWithoutFeedback>
  );
};
export default memo(VideoItem);
const styles = StyleSheet.create({
  contain: {
    width: "100%",
    position: "relative",
    height: 760,
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
  },
  verticalBar: {
    position: "absolute",
    right: 7,
    bottom: 40,
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
    fontWeight:'bold'
  },
  avatarContainer: {
    marginBottom: 48,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  buttonFlow: {
    position: "absolute",
    bottom: -8,
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
  },
});
// const {id,channelName, uri, caption, musicName, likes, comments, avatarUri} =item
//   const discAnimatedValue = useRef(new Animated.Value(0)).current;
//   const AnimatedMusicNodeValue1= useRef(new Animated.Value(0)).current;
//   const AnimatedMusicNodeValue2= useRef(new Animated.Value(0)).current;

//   const discAnimation = {
//     transform: [
//       {
//         rotate: discAnimatedValue.interpolate({
//           inputRange: [0, 1],
//           outputRange: ['0deg', '360deg'],
//         }),
//       },
//     ],
//   };

//   const MusicNodeAnimation1 = {
//     transform: [
//       {
//         translateX: AnimatedMusicNodeValue1.interpolate({
//           inputRange: [0, 1],
//           outputRange: [8,-16],
//         }),
//       },
//       {
//         translateY: AnimatedMusicNodeValue1.interpolate({
//           inputRange: [0, 1],
//           outputRange: [0,-32],
//         }),
//       },{
//         rotate: AnimatedMusicNodeValue1.interpolate({
//           inputRange: [0, 1],
//           outputRange: ['0deg', '45deg'],
//         }),
//       },
//     ],
//     opacity:AnimatedMusicNodeValue1.interpolate({
//       inputRange: [0,0.8,1],
//       outputRange: [0,1,0],
//     })
//   };
//   const MusicNodeAnimation2= {
//     transform: [
//       {
//         translateX: AnimatedMusicNodeValue2.interpolate({
//           inputRange: [0, 1],
//           outputRange: [8,-16],
//         }),
//       },
//       {
//         translateY: AnimatedMusicNodeValue2.interpolate({
//           inputRange: [0, 1],
//           outputRange: [0,-32],
//         }),
//       },{
//         rotate: AnimatedMusicNodeValue2.interpolate({
//           inputRange: [0, 1],
//           outputRange: ['0deg', '-45deg'],
//         }),
//       },
//     ],
//     opacity:AnimatedMusicNodeValue2.interpolate({
//       inputRange: [0,0.8,1],
//       outputRange: [0,1,0],
//     })
//   };

//   // tranhs lang phi tai nguyen

//   // const disPaulVideo=useRef();
//   // const disPaulMusic=useRef();

//   const trigerAnimated=useCallback(()=>{
//     // disPaulVideo.current=  Animated.loop(
//     //   Animated.timing(discAnimatedValue, {
//     //     toValue: 1,
//     //     duration: 2000,
//     //     easing: Easing.linear,
//     //     useNativeDriver: true,

//     //   }),
//     // )
//     // disPaulVideo.current.start();

//     // disPaulMusic.current= Animated.loop(

//     //   Animated.sequence([
//     //    Animated.timing(AnimatedMusicNodeValue1, {
//     //     toValue: 1,
//     //     duration: 2000,
//     //     easing: Easing.linear,
//     //     useNativeDriver: true,
//     //   }),
//     //   Animated.timing(AnimatedMusicNodeValue2, {
//     //     toValue: 1,
//     //     duration: 2000,
//     //     easing: Easing.linear,
//     //     useNativeDriver: true,
//     //   })
//     //   ,])
//     // )
//     // disPaulMusic.current.start();

//   },[discAnimatedValue,AnimatedMusicNodeValue1,AnimatedMusicNodeValue2])
//   useEffect(() => {
//     if(action){
//       trigerAnimated()
//     }else{
//       // disPaulVideo.current?.stop()
//       //  disPaulMusic.current?.stop()
//         discAnimatedValue.setValue(0)
//         AnimatedMusicNodeValue1.setValue(0)
//         AnimatedMusicNodeValue2.setValue(0)
//     }
//   }, [discAnimatedValue,AnimatedMusicNodeValue1,AnimatedMusicNodeValue2,
//     action,trigerAnimated
//   ])
// // setlile cho tym
// const [nblike, setnblike] = useState(item.likes)
// const [isLiked, setIsLiked] = useState(false);
// const handlePress = () => {
// setIsLiked(!isLiked);
// if (nblike === item.likes) {
//   setnblike(nblike + 1);
// } else {
//   setnblike(nblike - 1);
// }
// };
// // trang thai của của vide
{
  /* <VideoPlayer
        videoProps={{
          shouldPlay: action,
          // resizeMode: "cover",
          resizeMode: ResizeMode.CONTAIN,
          isLooping: true,
          source: {
            uri: datavideo.Video,
          },
        }}

        hideControlsOnStart={true}
        slider={{
          visible: false,
        }}
        fullscreen={{
          visible: false,
        }}
        timeVisible={true}
        style={{
          height: 758
        }}
      ></VideoPlayer> */
}
{
  /* <Video
  source={{ uri: datavideo.Video }}
  style={{ width: "100%",height:datavideo.height }} // Chỉnh aspectRatio cho phù hợp với video của bạn
  useNativeControls={true}
  resizeMode={ResizeMode.CONTAIN}// Hoặc "cover" tùy thuộc vào yêu cầu của bạn
  isLooping={true}
/> */
}
/*

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
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import Constants from "expo-constants";
// import Video from "react-native-video";
import { BottomSheet } from "react-native-btr";
const VideoItem = ({ item, action }) => {
  // console.log(action);
  const { width } = useWindowDimensions();
  const count = useSelector((state) => state.auth.value);
  const [dataUser, setDataUser] = useState(count);
  const [selectedTab, setSelectedTab] = useState("For Your");
  // console.log(dataUser)

  const [inFullscreen, setInFullsreen] = useState(false);
  const [inFullscreen2, setInFullsreen2] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const refVideo = useRef(null);
  const refVideo2 = useRef(null);
  const refScrollView = useRef(null);

  const [datavideo, setDataVideo] = useState(item);
  const user = datavideo.User;
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
  useEffect(
    () => {
      if (action) {
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
    }
    //  [discAnimatedValue,AnimatedMusicNodeValue1,AnimatedMusicNodeValue2]
  );
  // setlile cho tym
  const [nblike, setnblike] = useState(item.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [arrlike, setArrlike] = useState(datavideo.Like);
  const [soluongCmt, setSoluongcmt] = useState(datavideo.SoluongCmt);
  const [controlsVisible, setControlsVisible] = useState(false);
  useEffect(() => {
    const listLike = async () => {
      const { data } = await axios.post(
        "http://192.168.188.136:8080/selectLikeVideo",
        { IdVideo: datavideo._id }
      );
      setArrlike(data);
    };
    listLike();
  }, []);
  useEffect(() => {
    const trangthai = () => {
      datavideo.Like.forEach((item) => {
        if (item.User === dataUser._id) {
          setIsLiked(item.Trangthai);
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
        "http://192.168.188.136:8080/LikeVideo",
        {
          idUser: dataUser._id,
          IdVideo: datavideo._id,
          Soluong: soluongTim,
          Trangthai: Liked,
        }
      );
    } catch (err) {
      console.log(err);
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

      return <p style={textStyle}>{content}</p>;
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
  const handleBackdropPress2 = () => {
    setIsVisible2(false);
  };
  const [showOptions, setShowOptions] = useState(false);
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
  const handleBackdropPress3 = () => {
    setIsVisible3(false);
  };
  const [showOptions3, setShowOptions3] = useState(false);
  const handleBackdropPress3e = () => {
    setIsVisible3(false);
  };

  const [conten, setConten] = useState("");
  const [comment, setComment] = useState(datavideo.Comment);
  const [parentId, setParentId] = useState(null);
  const handleTextInputChange = (text) => {
    const parts = text.split("@");
    setConten(text);
    if (text != "") {
      setPopsend(true);
    } else {
      setPopsend(false);
    }
  };
  const selectCmt = async () => {
    const { data } = await axios.post(
      "http://192.168.188.136:8080/api_CommentVideoPostGet",
      { idVideo: datavideo._id }
    );
    setBinhLuan(data.data);
  };

  Keyboard.addListener("keyboardDidHide", () => {
    // Xử lý khi bàn phím biến mất
  });
  const [Popsend, setPopsend] = useState(false);
  const [textInputHeight, setTextInputHeight] = useState(40);
  // sendcommentVideo

  const SendComment = async () => {
    const formData = new FormData();
    let soluong = soluongCmt + 1;

    if (conten == "") {
      return null;
    }
    let contens = conten;

    try {
      const { data } = await axios.post(
        //"https://nativeapp-vwvi.onrender.com/api_CommentVideoPost",
        "http://192.168.188.136:8080/api_CommentVideoPost",

        {
          UserCmt: dataUser._id,
          idVideo: datavideo._id,
          Conten: contens,
          Soluongcmt: soluong,
          parentId: parentId,
        }
      );
      setParentId(null);
      setSoluongcmt(soluong);
      setConten("");

      selectCmt();
    } catch (err) {
      console.log(err);
    }
  };

  // thực hiên flatlist cứ mỗi lần thì nó sẻ tải  thêm 1 video mới được về

  return (
    <View style={styles.contain}>
      {/* <VideoPlayer
        videoProps={{
          shouldPlay: action,
          resizeMode: ResizeMode.CONTAIN,
          isLooping: true,
          source: {
            uri: datavideo.Video,
          },
          isMuted: isMute,
          ref: refVideo,
        }}
        mute={{
          enterMute: () => setIsMute(!isMute),
          exitMute: () => setIsMute(!isMute),
          isMute,
        }}
        hideControlsOnStart={false}
        slider={{
          visible: true,
        }}
        fullscreen={{
          visible: false,
        }}
        timeVisible={true}
        style={{
          height: 758,
        }}
     ></VideoPlayer>} */
//       <Video
//       source={{ uri: datavideo.Video }}
//       style={{ width: "100%", height: "100%" }}
//       useNativeControls
//       resizeMode={ResizeMode.CONTAIN}
//       isLooping
//       shouldPlay={action}
//     />
// {/* <Video
//   source={datavideo.Video} // the video file
//   paused={action} // make it start
//   style={styles.backgroundVideo} // any style you want
//   repeat={true} // make it a loop
// /> */}
// <View style={styles.BottomSelect}>
//   <View style={styles.BootomLeftSelection}>
//     <Text style={styles.chanelName}> {user.Hoten}</Text>

//     <View style={styles.BootomLeftSelection1}>
//       {/* <HTML
//       source={{ html: datavideo.VideoConten }}
//       contentWidth={width}
//       renderers={renderers}
//     /> */}
//       <Text style={styles.caption}>{datavideo.VideoConten}</Text>
//     </View>
//   </View>

//   <View style={styles.musicContainer}>
//     <Image
//       style={styles.musicIcon}
//       source={require("D:/lapTrinhMobile/NativeApp/src/Image/music-note.png")}
//     />
//     <Text style={styles.musicName}>nền nhạc-{datavideo.MusicName}</Text>
//   </View>
//   <View style={styles.bottomRightSelection}>
//     <Animated.View style={[styles.MusicDisc, discAnimation]}>
//       <MaterialCommunityIcons
//         name="music-circle"
//         size={40}
//         color="white"
//       />
//     </Animated.View>
//   </View>
// </View>
// <View style={styles.verticalBar}>
//   <View style={[styles.verticalItem, styles.avatarContainer]}>
//     <Image style={styles.avatar} source={{ uri: user.Avatar }}></Image>
//     <View style={styles.buttonFlow}>
//       <Ionicons name="add-circle" size={20} color="red" />
//     </View>
//   </View>
//   <View style={styles.verticalItem}>
//     <TouchableOpacity onPress={handleLike}>
//       <AntDesign
//         name="heart"
//         size={28}
//         color={isLiked ? "red" : "white"}
//       />
//     </TouchableOpacity>

//     <Text style={{ fontSize: 15, color: "white" }}>
//       {numberLike >= 1000
//         ? (numberLike / 1000).toFixed(1) + "k"
//         : numberLike}
//     </Text>
//   </View>
//   <View style={styles.verticalItem}>
//     <TouchableOpacity onPress={toggleModal2}>
//       <FontAwesome name="comment" size={24} color="white" />
//     </TouchableOpacity>
//     <Text style={{ fontSize: 15, color: "white" }}>
//       {soluongCmt >= 1000
//         ? (soluongCmt / 1000).toFixed(1) + "k"
//         : soluongCmt}
//     </Text>
//   </View>
//   <View style={styles.verticalItem}>
//     <FontAwesome name="share" size={24} color="white" />
//     <Text style={styles.verticalBarText}>Share</Text>
//   </View>
// </View>
// <Modal
//   visible={isVisible2}
//   animationType="slide"
//   transparent={true}
//   onRequestClose={toggleModal2}
// >
//   <View
//     style={{
//       borderRadius: 10,
//       flex: 1,
//       justifyContent: "flex-end",
//     }}
//   >
//     <TouchableWithoutFeedback onPress={handleBackdropPress2e}>
//       <View style={{ flex: 0.4 }}></View>
//     </TouchableWithoutFeedback>

//     <View
//       style={{
//         flex: 0.6,
//         backgroundColor: "white",
//         justifyContent: "flex-end",
//         borderRadius: 10,
//       }}
//     >
//       <View
//         style={{
//           height: 40,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Text style={{ fontSize: 15, color: "black", fontWeight: "400" }}>
//           {soluongCmt >= 1000
//             ? (soluongCmt / 1000).toFixed(1) + "k"
//             : soluongCmt}{" "}
//           Comments
//         </Text>
//       </View>
//       <View style={{ flex: 1 }}>
//         <FlatList
//           data={comment}
//           renderItem={({ item, index }) => {
//             // return (
//             //   <Coment
//             //     item={item}
//             //     index={index}
//             //
//             //   />
//             //);
//           }}
//         />
//       </View>

//       {PopupTextinput == true && (
//         <Animated.View style={{ width: "100%", flex: 0.26 }}>
//           <View
//             style={{
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexDirection: "row",
//               marginHorizontal: 10,
//             }}
//           >
//             <TouchableOpacity>
//               <Text style={{ fontSize: 24 }}>😍</Text>
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <Text style={{ fontSize: 24 }}>🤣</Text>
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <Text style={{ fontSize: 24 }}>😊</Text>
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <Text style={{ fontSize: 24 }}>👍</Text>
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <Text style={{ fontSize: 24 }}>👌</Text>
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <Text style={{ fontSize: 24 }}>😒</Text>
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <Text style={{ fontSize: 24 }}>❤️</Text>
//             </TouchableOpacity>
//           </View>
//           <View
//             style={{
//               flex: 1,
//               justifyContent: "space-between",

//               margin: 10,
//               flexDirection: "row",
//             }}
//           >
//             <Image
//               style={{ width: 35, height: 35, borderRadius: 100 }}
//               source={{ uri: dataUser.Avatar }}
//             ></Image>

//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-around",
//                 alignItems: "center",
//                 width: "90%",
//                 backgroundColor: "#DDDDDD",
//                 borderRadius: 10,
//               }}
//             >
//               <TouchableOpacity
//                 onPress={toggleModal3}
//                 style={{ width: "70%" }}
//               >
//                 <Text style={{ color: "#999999" }}> Add comment ...</Text>
//               </TouchableOpacity>
//               <TouchableOpacity>
//                 <Text style={{ fontSize: 24, fontWeight: "500" }}>@</Text>
//               </TouchableOpacity>
//               <TouchableOpacity>
//                 <Entypo name="emoji-happy" size={24} color="black" />
//               </TouchableOpacity>
//               <TouchableOpacity>
//                 <AntDesign name="gift" size={24} color="black" />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Animated.View>
//       )}
//     </View>
//   </View>
// </Modal>
// <Modal
//   visible={isVisible3}
//   animationType="slide"
//   transparent={true}
//   onRequestClose={toggleModal3}
// >
//   <View
//     style={{
//       borderRadius: 10,
//       flex: 1,
//       justifyContent: "flex-end",
//     }}
//   >
//     <TouchableWithoutFeedback onPress={handleBackdropPress2e}>
//       <View style={{ flex: 1 }}></View>
//     </TouchableWithoutFeedback>
//     {PopupTextinput == false && (
//       <Animated.View
//         style={{
//           width: "100%",

//           height: textInputHeight + 70,
//         }}
//       >
//         <View
//           style={{
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexDirection: "row",
//             marginHorizontal: 10,
//           }}
//         >
//           <TouchableOpacity>
//             <Text style={{ fontSize: 24 }}>😍</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Text style={{ fontSize: 24 }}>🤣</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Text style={{ fontSize: 24 }}>😊</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Text style={{ fontSize: 24 }}>👍</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Text style={{ fontSize: 24 }}>👌</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Text style={{ fontSize: 24 }}>😒</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Text style={{ fontSize: 24 }}>❤️</Text>
//           </TouchableOpacity>
//         </View>
//         <View
//           style={{
//             justifyContent: "space-between",
//             marginVertical: 10,
//             flexDirection: "row",
//             flex: 0.9,
//           }}
//         >
//           <Image
//             style={{
//               width: 35,
//               height: 35,
//               borderRadius: 100,
//               marginLeft: 3,
//             }}
//             source={{ uri: dataUser.Avatar }}
//           ></Image>

//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-around",
//               alignItems: "center",
//               width: "85%",
//               backgroundColor: "#DDDDDD",
//               borderRadius: 10,
//               marginRight: 10,
//               height: textInputHeight + 15,
//             }}
//           >
//             <TextInput
//               style={{ width: "70%", padding: 5, height: "auto" }}
//               multiline
//               ref={inputRef}
//               autoFocus={true}
//               value={conten}
//               placeholder="  Add comment..."
//               autoFocus={true}
//               onContentSizeChange={(e) => {
//                 const { height } = e.nativeEvent.contentSize;
//                 setTextInputHeight(height);
//               }}
//               onChangeText={handleTextInputChange}
//             ></TextInput>
//             <TouchableOpacity>
//               <Text style={{ fontSize: 24, fontWeight: "500" }}>@</Text>
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <Entypo name="emoji-happy" size={24} color="black" />
//             </TouchableOpacity>
//             {Popsend === false && (
//               <TouchableOpacity>
//                 <AntDesign name="gift" size={24} color="black" />
//               </TouchableOpacity>
//             )}

//             {Popsend === true && (
//               <TouchableOpacity onPress={SendComment}>
//                 <AntDesign name="arrowup" size={24} color="red" />
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>
//       </Animated.View>
//     )}
//   </View>
// </Modal>
// </View>
// );
// };
// export default VideoItem;
// const styles = StyleSheet.create({
// contain: {
// width: "100%",
// backgroundColor: "red",
// position: "relative",
// },
// BottomSelect: {
// position: "absolute",
// paddingHorizontal: 8,
// paddingBottom: 16,
// },
// BottomSelect: {
// position: "absolute",
// bottom: 0,
// flexDirection: "row",
// width: "100%",
// height: "100%",
// },
// BootomLeftSelection1: {
// height: "auto",
// width: 422,
// },
// BootomLeftSelection: {
// flex: 4,
// bottom: 25,
// position: "absolute",
// left: 5,
// },
// bottomRightSelection: {
// flex: 1,
// justifyContent: "flex-end",
// alignItems: "flex-end",
// },
// chanelName: {
// color: "white",
// fontWeight: "bold",
// },
// caption: {
// color: "white",
// marginVertical: 8,
// width: "50%",
// },
// musicContainer: {
// flexDirection: "row",
// alignItems: "center",
// position: "absolute",
// bottom: 3,
// left: 3,
// width: 120,
// backgroundColor: "pink",
// },
// musicIcon: {
// width: 12,
// height: 12,
// marginRight: -16,
// position: "absolute",
// bottom: 6,
// },
// musicName: {
// color: "white",
// position: "absolute",
// marginLeft: 40,
// bottom: 3,
// },
// verticalBar: {
// position: "absolute",
// right: 7,
// bottom: 40,
// },
// verticalItem: {
// marginBottom: 24,
// alignItems: "center",
// marginRight: -3,
// },
// verticalBarText: {
// color: "white",
// marginTop: 4,
// fontSize: 10,
// },
// avatarContainer: {
// marginBottom: 48,
// },
// avatar: {
// width: 48,
// height: 48,
// borderRadius: 24,
// },
// buttonFlow: {
// position: "absolute",
// bottom: -8,
// },
// floatMusicNote: {
// position: "absolute",
// bottom: 15,
// right: 40,
// width: 16,
// height: 16,
// },
// MusicDisc: {
// bottom: 6,
// },
// });
// // const {id,channelName, uri, caption, musicName, likes, comments, avatarUri} =item
// //   const discAnimatedValue = useRef(new Animated.Value(0)).current;
// //   const AnimatedMusicNodeValue1= useRef(new Animated.Value(0)).current;
// //   const AnimatedMusicNodeValue2= useRef(new Animated.Value(0)).current;

// //   const discAnimation = {
// //     transform: [
// //       {
// //         rotate: discAnimatedValue.interpolate({
// //           inputRange: [0, 1],
// //           outputRange: ['0deg', '360deg'],
// //         }),
// //       },
// //     ],
// //   };

// //   const MusicNodeAnimation1 = {
// //     transform: [
// //       {
// //         translateX: AnimatedMusicNodeValue1.interpolate({
// //           inputRange: [0, 1],
// //           outputRange: [8,-16],
// //         }),
// //       },
// //       {
// //         translateY: AnimatedMusicNodeValue1.interpolate({
// //           inputRange: [0, 1],
// //           outputRange: [0,-32],
// //         }),
//       },{
//         rotate: AnimatedMusicNodeValue1.interpolate({
//           inputRange: [0, 1],
//           outputRange: ['0deg', '45deg'],
//         }),
//       },
//     ],
//     opacity:AnimatedMusicNodeValue1.interpolate({
//       inputRange: [0,0.8,1],
//       outputRange: [0,1,0],
//     })
//   };
//   const MusicNodeAnimation2= {
//     transform: [
//       {
//         translateX: AnimatedMusicNodeValue2.interpolate({
//           inputRange: [0, 1],
//           outputRange: [8,-16],
//         }),
//       },
//       {
//         translateY: AnimatedMusicNodeValue2.interpolate({
//           inputRange: [0, 1],
//           outputRange: [0,-32],
//         }),
//       },{
//         rotate: AnimatedMusicNodeValue2.interpolate({
//           inputRange: [0, 1],
//           outputRange: ['0deg', '-45deg'],
//         }),
//       },
//     ],
//     opacity:AnimatedMusicNodeValue2.interpolate({
//       inputRange: [0,0.8,1],
//       outputRange: [0,1,0],
//     })
//   };

//   // tranhs lang phi tai nguyen

//   // const disPaulVideo=useRef();
//   // const disPaulMusic=useRef();

//   const trigerAnimated=useCallback(()=>{
//     // disPaulVideo.current=  Animated.loop(
//     //   Animated.timing(discAnimatedValue, {
//     //     toValue: 1,
//     //     duration: 2000,
//     //     easing: Easing.linear,
//     //     useNativeDriver: true,

//     //   }),
//     // )
//     // disPaulVideo.current.start();

//     // disPaulMusic.current= Animated.loop(

//     //   Animated.sequence([
//     //    Animated.timing(AnimatedMusicNodeValue1, {
//     //     toValue: 1,
//     //     duration: 2000,
//     //     easing: Easing.linear,
//     //     useNativeDriver: true,
//     //   }),
//     //   Animated.timing(AnimatedMusicNodeValue2, {
//     //     toValue: 1,
//     //     duration: 2000,
//     //     easing: Easing.linear,
//     //     useNativeDriver: true,
//     //   })
//     //   ,])
//     // )
//     // disPaulMusic.current.start();

//   },[discAnimatedValue,AnimatedMusicNodeValue1,AnimatedMusicNodeValue2])
//   useEffect(() => {
//     if(action){
//       trigerAnimated()
//     }else{
//       // disPaulVideo.current?.stop()
//       //  disPaulMusic.current?.stop()
//         discAnimatedValue.setValue(0)
//         AnimatedMusicNodeValue1.setValue(0)
//         AnimatedMusicNodeValue2.setValue(0)
//     }
//   }, [discAnimatedValue,AnimatedMusicNodeValue1,AnimatedMusicNodeValue2,
//     action,trigerAnimated
//   ])
// // setlile cho tym
// const [nblike, setnblike] = useState(item.likes)
// const [isLiked, setIsLiked] = useState(false);
// const handlePress = () => {
// setIsLiked(!isLiked);
// if (nblike === item.likes) {
//   setnblike(nblike + 1);
// } else {
//   setnblike(nblike - 1);
// }
// };
// // trang thai của của vide
//{
// /* <VideoPlayer
//   videoProps={{
//     shouldPlay: action,
//     // resizeMode: "cover",
//     resizeMode: ResizeMode.CONTAIN,
//     isLooping: true,
//     source: {
//       uri: datavideo.Video,
//     },
//   }}

//   hideControlsOnStart={true}
//   slider={{
//     visible: false,
//   }}
//   fullscreen={{
//     visible: false,
//   }}
//   timeVisible={true}
//   style={{
//     height: 758
//   }}
// ></VideoPlayer> */
// }
// {
// /* <Video
// source={{ uri: datavideo.Video }}
// style={{ width: "100%",height:datavideo.height }} // Chỉnh aspectRatio cho phù hợp với video của bạn
// useNativeControls={true}
// resizeMode={ResizeMode.CONTAIN}// Hoặc "cover" tùy thuộc vào yêu cầu của bạn
// isLooping={true}
// /> */
// }

// */
