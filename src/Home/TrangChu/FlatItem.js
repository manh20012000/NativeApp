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
import BinhLuan from "./BinhLuan.js";
const FlatItem = memo((props) => {
  const numberLike = props.item.like;
  const binhluan = props.item.commen;
  const [number, setNumber] = useState(0);
  const [nblike, setnblike] = useState(numberLike);
  const [isLiked, setIsLiked] = useState(false);
  const handlePress = () => {
    setIsLiked(!isLiked);
    if (nblike === numberLike) {
      setnblike(nblike + 1);
    } else {
      setnblike(nblike - 1);
    }
  };
  // chuyển sang trang detail
  const DetaiHandress = () => {
    props.navigation.navigate("SeeDeTail", props.item);
  };
  // set phongd to màn hinhg
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const anh = props.item.anh;
  const images = anh.map((url) => ({ url }));
  //tao bootom sheet cho n thanh phan share
  const [visible, setVisible] = useState(false);
  const bootomShetShare = () => {
    setVisible(!visible);
  };
  // su ly modal cho  binh luan
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleBackdropPress = () => {
    setIsVisible(false);
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
            source={{ uri: props.item.avata }}
            style={{
              width: 39,
              height: 44,
              borderRadius: 100,
              marginHorizontal: 6,
            }}
          ></Image>
          <View>
            <Text style={styles.title}>{props.item.name}</Text>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {props.item.Time}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 10, paddingHorizontal: 6 }}>
        <Text>{props.item.status}</Text>
      </View>
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
      {/*       
      <View style={styles.bodyView}>
        <Image
          source={{ uri: props.item.image }}
          style={{
            width: 390,
            height: 440,
          }}
        ></Image>
      </View> */}
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Text style={{ fontSize: 20 }}>{nblike} Like</Text>
        <Text style={{ fontSize: 20 }}>{binhluan.length} Bình luận</Text>
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
          onPress={handlePress}
        >
          <Text style={{ color: "white" }}>
            <AntDesign
              name="heart"
              size={24}
              color={isLiked ? "red" : "white"}
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
        {/* <BinhLuan isVisible={ isVisible} /> */}
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
                backgroundColor: "#222222",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "5%",
                  paddingHorizontal:16,
                  justifyContent: 'flex-start',
                  alignItems: "flex-start",
                  flexDirection:'row'
                }}
              >
                <Text style={{ fontSize: 16 }}>{nblike}</Text>
                <Text style={{fontSize:16}}> Người Thích bài viết này </Text>
              </View>
              
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <TouchableOpacity
          onPress={() => {
            bootomShetShare();
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
         
            <BottomSheet
              visible={visible}
              //setting the visibility state of the bottom shee
              onBackButtonPress={bootomShetShare}
              //Toggling the visibility state on the click of the back botton
              onBackdropPress={bootomShetShare}
              //Toggling the visibility state on the clicking out side of the sheet
            >
              {/*Bottom Sheet inner View*/}
              <View style={{ flex: 0.4, backgroundColor: "white" }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      padding: 20,
                      fontSize: 20,
                    }}
                  >
                    Share Using
                  </Text>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text>cbbdbbd</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text>hihi</Text>
                  </View>
                </View>
              </View>
            </BottomSheet>
          <Text style={{ color: "white" }}>
            <FontAwesome name="share" size={24} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
export default FlatItem;
