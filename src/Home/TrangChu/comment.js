import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  BackHandler,
  Alert,
  RefreshControl,
  Pressable,
} from "react-native";
import axios from "axios";
import { React, useState, useRef, useEffect, memo } from "react";
import TimeAgo from "react-native-timeago";
import { MaterialIcons } from "@expo/vector-icons";
import path from "../../confige/config";
import CommentChildrens from "./CommentChrildrens";
import { login } from "../../Redex/Reducer/auth.slice.js";
import { checkingToken } from "../../confige/CheckingToken.js";
import { useSelector, useDispatch } from "react-redux";
const CommentPanrent = (props) => {
  const [user, setUser] = useState(props.item.User);
  const userCurent = useSelector((state) => state.auth.value);
  const dispath = useDispatch();
  const Data = props.item;

  // const [Noidung, setNoiDung] = useState(Data.Content);
  // console.log(Noidung, "log ra nội dung");
  const [soluongCmt, setSoluongcmt] = useState(Data.soluongcmt);
  const [DataCommentChildren, setCmchildren] = useState([]);

  const [XemThem, setXemThem] = useState(false);
  // console.log(Data, "log ra comment con");
  useEffect(() => {
    props.handleComemntData(Data.comments);
    if (Data.comments.length >= 1) {
      setXemThem(false);
    } else if (Data.comments.length >= 2) {
      setXemThem(true);
    }
  }, []);

  useEffect(() => {
    // console.log(Data.comments, "log lại giá tri comment con");
    setCmchildren(Data.comments);
  }, [Data.comments]);
  const itemsPerPage = 3;
  const [startIndex, setStartIndex] = useState(0);
  const hanlderXemThem = () => {
    setXemThem(false);
    setCmchildren(Data.comments);
    setStartIndex((prevIndex) => prevIndex - itemsPerPage);
  };
  const [showOptions, setShowOptions] = useState(false);
  const [Item, setItem] = useState("");
  const handleLongPress = (selectedItem) => {
    setShowOptions(true);
    setItem(selectedItem);
  };
  const handleBackdropPress = () => {
    setShowOptions(false);
  };
  const deleteComment = async () => {
    setShowOptions(false);
    try {
      const isChecked = await checkAndRefreshToken(dispath, userCurent);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        const { data } = await axios.post(`${path}/deleteComment`, {
          idComemnt: Item._id,
          DinhDanh: Item.Dinhdanh,
          idPerent: Item.idParentComment,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View style={styles.topView}>
        <TouchableOpacity
          onPress={() => {
            if (userCurent._id === user._id) {
              console.log("đây là bản thân mình ");
              props.navigation.navigate("Infor");
              props.toggleModal();
            } else {
              props.toggleModal();
              console.log("đây ko phải là bản thân mình ");
              props.navigation.navigate("SeeDeTail", user);
            }
          }}
        >
          <Image
            style={{ width: 45, height: 45, borderRadius: 40 }}
            source={{ uri: user.Avatar }}
          ></Image>
        </TouchableOpacity>

        <View style={styles.viewdau}>
          <Pressable
            onLongPress={() => {
              handleLongPress(Data);
            }}
            android_ripple={{ color: "gray" }} // Ripple effect for Android
            style={styles.pressAble}
          >
            <TouchableOpacity
              style={{ width: "auto" }}
              onPress={() => props.navigation.navigate("SeeDeTail", user)}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
              >
                {user.Hoten}
              </Text>
            </TouchableOpacity>
            <Text style={{ color: "white" }}>{Data.Content}</Text>
          </Pressable>
          <View style={styles.viewTab}>
            <View style={styles.ViewitemCmt}>
              <TimeAgo
                style={{ color: "blue", fontSize: 12 }}
                time={Data.createdAt}
                hideAgo={true}
              />
              <TouchableOpacity>
                <Text style={{ fontSize: 12 }}>Like</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.handleTextInputChange(
                    `@${user.Hoten} `
                    // `@[${user.Hoten}](id:${user._id})`
                  );
                  props.setParentId(Data._id);
                  props.setCommentArr(Data.comments);
                }}
              >
                <Text style={{ fontSize: 12 }}>Reply</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 12 }}>Thích</Text>
          </View>
          <View style={{ marginLeft: 30 }}>
            {Data.Image ? (
              <Image
                style={{ width: 100, height: 150, borderRadius: 15 }}
                source={{ uri: Data.Image }}
              />
            ) : null}
          </View>
        </View>
      </View>
      <View style={{ marginLeft: 60 }}>
        <FlatList
          data={DataCommentChildren}
          style={{ flex: 0.9 }}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => {
            return (
              <CommentChildrens
                item={item}
                navigation={props.navigation}
                index={index}
                toggleModal={props.toggleModal}
              />
            );
          }}
          extraData={DataCommentChildren}
        />
        {XemThem && (
          <TouchableOpacity onPress={hanlderXemThem}>
            <Text style={{ color: "blue" }}>
              {Data.comments.length} xem thêm...
            </Text>
          </TouchableOpacity>
        )}
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
              <TouchableOpacity style={styles.touchcmt}>
                <MaterialIcons name="report-problem" size={24} color="black" />
                <Text>Report Comment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchcmt}>
                <MaterialIcons name="report-problem" size={24} color="black" />
                <Text style={{ fontSize: 14 }}>Reply</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchcmt}>
                <MaterialIcons name="report-problem" size={24} color="black" />
                <Text>Cập nhật </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchcmt}>
                <MaterialIcons name="report-problem" size={24} color="black" />
                <Text>Hide comment</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteComment} style={styles.touchcmt}>
                <MaterialIcons name="report-problem" size={24} color="black" />
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
export default CommentPanrent;
const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
    marginTop: 10,
    width: "90%",
  },
  pressAble: {
    backgroundColor: "#333333",
    paddingHorizontal: 17,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  ViewitemCmt: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    width: 160,
  },
  viewTab: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  viewmodal: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    flex: 0.32,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingTop: 10,
  },
  viewdau: {
    height: "auto",
    marginLeft: 5,
  },
  touchcmt: {
    marginTop: 10,
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
});
