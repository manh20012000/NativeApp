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
import styles from "./StyleFlatItem.js";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome, EvilIcons, AntDesign } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import SeeDeTail from "./SeeDeTail.js";
import ImageViewer from "react-native-image-zoom-viewer";
import { BottomSheet } from "react-native-btr";
import Binhluan from "./BinhLuan.js";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import Coment from "./comment.js";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import TimeAgo from 'react-native-timeago';
import RenderHtml from 'react-native-render-html';
const FlatItem = memo((props) => {

  const user = props.item.User;// 

  const [databaiviet, setdatabaiviet] = useState(props.item);
  const [isLiked, setIsLiked] = useState("");
  const [arrlike, setArrlike] = useState(databaiviet.Like);
  const [binhluan, setBinhLuan] = useState(databaiviet.Comment);
  //  console.log(databaiviet.createdAt)
  //   const timeago=databaiviet.createdAt

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
      const { data } = await axios.post("https://nativeapp-vwvi.onrender.com/tymPost", {
        idUser: props.userDn,
        idBaiPost: databaiviet._id,
        Soluong: soluongTim,
        Trangthai: Liked,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const tym = async () => {};
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
  const handleTextInputChange = (text) => {
    const parts = text.split('@');
    setNoiDung(text)
  };
  const SendComment = async () => {
    console.log(Noidung)
    setTimeout(async () => {
      let soluong = soluongCmt + 1;
      setSoluongcmt(soluong);
      try {
        const { data } = await axios.post(
          "https://nativeapp-vwvi.onrender.com/SendBinhluan",
          {
            UserCmt: props.userDn,
            idBaiviet: databaiviet._id,
            Noidung: Noidung,
            Soluongcmt: soluong,
          }
        );
        setNoiDung("");
        setSoluongcmt(soluong)
        setBinhLuan(data.data);
    
      } catch (err) {
        console.log(err);
      }
    }, 1000);
  };
 
  return (
    <View style={styles.contain}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={DetaiHandress}
          style={{ flexDirection: "row" }}
        >
          <Image
            source={{ uri: user.Avatar }}
            style={{
              width: 39,
              height: 44,
              borderRadius: 100,
              marginHorizontal: 6,
            }}
          ></Image>
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
              <TimeAgo style={{ fontSize:12,color:'blue'}} time={databaiviet.createdAt} />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 20,
              }}
            >
              <MaterialIcons name={quyen} size={20} color="black" />
              <Text>-Bạn đang ở {databaiviet.Loaction}</Text>
            </View>
          </View>
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
              <View
                style={{
                  width: 40,
                  height: 30,
                  backgroundColor: "rgba(192,192,192, 0.5)",
                  position: "absolute",
                  borderRadius: 15,
                  zIndex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  right: 15,
                }}
              >
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
            </View>
          ))}
        </Swiper>
      )}
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Text style={{ fontSize: 20 }}>{numberLike} Like</Text>
        <Text style={{ fontSize: 20 }}> {soluongCmt} Bình luận</Text>
      </View>
      <View
        style={{
          height: 50,
          marginHorizontal: 10,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderColor: "white",
            borderWidth: 2,
          }}
          onPress={handleLike}
        >
          <Text style={{ color: "white" }}>
            <AntDesign
              name="heart"
              size={24}
              color="white"
              color={isLiked ? "red" : "white"}
              // color={databaiviet.Like.filter(x => x._id == props.userDn).length > 0 ? "red" : "white"}
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          style={{
            backgroundColor: "black",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderColor: "white",
            borderWidth: 2,
          }}
        >
          <EvilIcons name="comment" size={34} color="white" />
        </TouchableOpacity>

        <Modal
          visible={isVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleModal}
        >
          <TouchableWithoutFeedback onPress={handleBackdropPress}>
            <View
              style={{
                flex: 1,
                backgroundColor: "#C0C0C0",
                justifyContent: "flex-end",
              }}
            >
                <View
        style={{
          backgroundColor: "orange",
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
          <AntDesign name="heart" size={20} color="red" /> Người Thích bài viết
          này{" "}
        </Text>
      </View>
  
              <View style={{ flex: 1 }}>
                <FlatList
                  style={{ flex: 0.9, backgroundColor: "pink" }}
                  data={binhluan}
                  renderItem={({ item, index }) => {
                    return <Coment item={item} index={index} userdn={props.userDn} navigation={props.navigation} handleTextInputChange={handleTextInputChange}/>;
              
                  }}
                />
              </View>
              <View
        style={{
          backgroundColor: "orange",
          width: "100%",
          height: 100, // Đổi chiều cao của header
          padding: 10,
          justifyContent: "space-between",
        }}
      >
        <TextInput
          placeholder="Comment "
          style={{
            width: "100%",
            height: 45,
            borderRadius: 10,
            backgroundColor: "#BBBBBB",
            padding: 4,
          }}
          placeholderTextColor={"white"}
          multiline
          onChangeText={handleTextInputChange}
          underlineColorAndroid="transparent"
          value={Noidung}
        ></TextInput>

        <View
          style={{
            justifyContent: "space-between",
            width: "100%",
            height: 25,
            paddingHorizontal: 5,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "50%",
              marginTop: 4,
            }}
          >
            <TouchableOpacity>
              <Entypo name="camera" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="camera" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="camera" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="camera" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={SendComment}>
            <Ionicons name="md-send-sharp" size={24} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <TouchableOpacity
          onPress={() => {
            onShare();
          }}
          style={{
            backgroundColor: "black",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderColor: "white",
            borderWidth: 2,
          }}
        >
          <Text style={{ color: "white" }}>
            <FontAwesome name="share" size={24} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
export default FlatItem;
