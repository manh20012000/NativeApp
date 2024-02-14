import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Item,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  BackHandler,
  Alert,
  RefreshControl,
  Pressable,
} from "react-native";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import { React, useState, useRef, useEffect, memo } from "react";
import TimeAgo from "react-native-timeago";
import { MaterialIcons } from "@expo/vector-icons";
const CommentChildrens = memo((props) => {
  const data = props.item;

  const [user, setUser] = useState(data.User);
  const [Data, setData] = useState(data);

  const [Noidung, setNoiDung] = useState(Data.Content);
  const [soluongCmt, setSoluongcmt] = useState(Data.soluongcmt);
  const [cmtChidren, setCmchildren] = useState(Data.CommentChildren);

  const [ChidrenCpnent, setComponent] = useState(false);
  const [XemThem, setXemThem] = useState(false);

  const itemsPerPage = 3;
  const [startIndex, setStartIndex] = useState(0);
  const hanlderXemThem = () => {
    setComponent(true);
    setXemThem(false);
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

    console.log(Item._id);
    console.log(Item.Dinhdanh, Item.idParentComment);
    const { data } = await axios.delete(
      "http://192.168.0.100:8080/deleteComment",
      {
        idComemnt: Item._id,
        DinhDanh: Item.Dinhdanh,
        idPerent: Item.idParentComment,
      }
    );
  };

  useEffect(() => {
    setCmchildren(Data.CommentChildren);
  }, [Data]);

  return (
    <View>
      <View style={styles.topView}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("SeeDeTail", data.User)}
        >
          <Image
            style={{ width: 35, height: 35, borderRadius: 30 }}
            source={{ uri: data.User.Avatar }}
          ></Image>
        </TouchableOpacity>
        <View style={styles.viewdau}>
          <Pressable
            onLongPress={() => {
              handleLongPress(data);
            }}
            android_ripple={{ color: "gray" }} // Ripple effect for Android
            style={styles.pressAble}
          >
            <Text style={{ fontSize: 14, fontWeight: "500", color: "white" }}>
              {data.User.Hoten}
            </Text>

            <Text style={{ color: "white" }}>{data.Content}</Text>
          </Pressable>
          <View style={styles.viewTab}>
            <View style={styles.ViewitemCmt}>
              <TimeAgo
                style={{ color: "blue" }}
                time={data.createdAt}
                hideAgo={true}
              />
              <TouchableOpacity>
                <Text>Like</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.handleTextInputChange(data.User.Hoten + " 👉 ");
                  props.setParentId(Data._id);
                }}
              >
                <Text>Reply</Text>
              </TouchableOpacity>
            </View>
            <Text>Thích</Text>
          </View>
        </View>
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
                <Text>Reply</Text>
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
});
export default CommentChildrens;
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
