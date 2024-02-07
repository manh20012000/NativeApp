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
import { AntDesign } from "@expo/vector-icons";
import CommentChildren from "./CommentChirlden.js";
import {
  updateDataCommentChildrent,
  getDataCommentChildrent,
} from "../../Redex/updateComentChildren.js";
import path from "../../config.js";
import { useSelector, useDispatch } from "react-redux";
const Comment = memo(
  ({
    index,
    onDeleteComment,
    item,
    handleTextInputChange,
    setParentId,
    setLoading,
    statusLoad,
    setSoluongcomemtChidrent,
    navigation,
    sendComemtChildren,
    setqualityComment,
    QualityComment,
    updateQualityComemnt,
    Skipcomemnt,
  }) => {
    const dispatch = useDispatch();
    const datacomment = useSelector(
      (state) => state.CommentChildrent.datacomment
    );
    const count = useSelector((state) => state.auth.value);
    //  console.log(datacomment,'datacmt')
    const [user, setUser] = useState(item.User);
    const [Data, setData] = useState(item);
    const [Content, setContent] = useState(Data.Content);

    const [soluongCmt, setSoluongcmt] = useState(Data.SoluongCommentChildrent);
    const [qualityCommetShow, setQualitycomemtShow] = useState(
      Data.SoluongCommentChildrent
    );
    const [ChidrenCpnent, setComponent] = useState(true);
    const [XemThem, setXemThem] = useState(false);
    const [cmtChidren, setCmchildren] = useState(datacomment);
    useEffect(() => {
      setCmchildren(datacomment);
    }, [datacomment]);

    useEffect(() => {
      if (soluongCmt < 1) {
        setComponent(true);
        setXemThem(false);
      } else {
        setComponent(true);
        setXemThem(true);
      }
    }, []);
    const itemsPerPage = 3;
    const [startIndex, setStartIndex] = useState(0);
    // const visibleItems = cmtChidren.slice(startIndex, startIndex + itemsPerPage);
    const [isLiked, setIsLiked] = useState(false);
    const [leng, setLeng] = useState(0);
    const hanlderXemThem = async () => {
      setLoading(true);
      try {
        console.log(leng);
        const { data } = await axios.get(
          `${path}/api_CommentVideoGetChildrent/${Data._id}/${Skipcomemnt}`
        );
        setCmchildren((prevCmtChidren) => [
          ...(prevCmtChidren || []),
          ...data.data,
        ]);
        dispatch(updateDataCommentChildrent(data.data));
        // console.log(data.data)
        statusLoad(true);
        setLeng(leng + 3);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
        setComponent(true);
        const maxleng = leng + 3;
        if (qualityCommetShow < 3) {
          setQualitycomemtShow(qualityCommetShow);
          updateQualityComemnt(0, index, maxleng);
        } else {
          setQualitycomemtShow(qualityCommetShow - 3);
          updateQualityComemnt(qualityCommetShow - 3, index, maxleng);
        }
        if (Data.SoluongCommentChildrent <= maxleng) {
          setXemThem(false);
        }
      }
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
      console.log(Data.SoluongCommentChildrent);
      const QualityComment = Data.SoluongCommentChildrent + 1;
      onDeleteComment(QualityComment, Item._id);
    };

    const deleteCommentChildern = async (idComment) => {
      try {
        setLoading(true);
        setqualityComment(QualityComment - 1);
        console.log(idComment, Data.idVideo, item._id);
        const updateComemntChildren = cmtChidren.filter(
          (items) => items._id !== idComment
        );
        setCmchildren(updateComemntChildren);
        const { data } = await axios.delete(
          `${path}/deleteCommentChildrenVideo/${idComment}/${Data.idVideo}/${item._id}`
        );
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    //likecomment
    const [isLikedcmt, setisLikedcmt] = useState(false);
    const [qualitylike, setqualitylike] = useState(Data.soluonglike);
    let soluongTim = qualitylike;
    useEffect(() => {
      const trangthai = () => {
        Data.idLike.forEach((item) => {
          console.log(item);
          if (item === count._id) {
            setisLikedcmt(true);
          }
        });
      };
      trangthai();
    }, []);
    const handlderLike = async () => {
      let like = !isLikedcmt;
      setisLikedcmt(like);
      if (isLikedcmt == false) {
        soluongTim = soluongTim + 1;

        setqualitylike(soluongTim);
      } else if (isLikedcmt == true) {
        if (soluongTim > 0) {
          soluongTim = soluongTim - 1;
          setqualitylike(soluongTim);
        }
      }
      try {
        const { data } = await axios.post(`${path}/likeComemntVideoParent`, {
          idcomment: Data._id,
          idlike: count._id,
          Soluong: soluongTim,
          Trangthai: like,
        });
      } catch (err) {
        console.log(err, "log error");
      }
      console.log(soluongTim);
    };
    return (
      <View style={{}}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            android_ripple={{ color: "gray" }} // Ripple effect for Android
            style={styles.pressAble}
            onLongPress={() => {
              handleLongPress(Data);
            }}
            // onPress={() => {
            //   console.log("récd", Data._id);
            //   setParentId(Data._id);
            //   handleTextInputChange(user.Hoten + " 👉 ");
            // }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("SeeDeTail", user)}
            >
              <Image
                style={{ width: 30, height: 30, borderRadius: 40 }}
                source={{ uri: user.Avatar }}
              ></Image>
            </TouchableOpacity>

            <View style={styles.viewdau}>
              <View
                style={{ width: "auto" }}
                onPress={() => navigation.navigate("SeeDeTail", user)}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    color: "black",
                    opacity: 0.5,
                  }}
                >
                  {user.Hoten}
                </Text>
              </View>
              <View style={{ width: "95%" }}>
                <Text style={{ color: "black" }}>{Content}</Text>
              </View>

              <View style={styles.viewTab}>
                <View style={styles.ViewitemCmt}>
                  <TimeAgo
                    style={{ color: "black", opacity: 0.7, fontSize: 12 }}
                    time={Data.Timing}
                    hideAgo={true}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      console.log("récd", Data._id);
                      setParentId(Data._id);
                      handleTextInputChange(user.Hoten + " 👉 ");

                      // setSoluongcomemtChidrent(Data.SoluongCommentChildrent+1);
                    }}
                  >
                    <Text style={{ opacity: 0.5, fontSize: 13 }}>Reply</Text>
                  </TouchableOpacity>
                </View>
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
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              width: 50,
            }}
            onPress={handlderLike}
          >
            <View>
              <AntDesign
                name="heart"
                size={15}
                color={isLikedcmt ? "red" : "#808080"}
              />
            </View>
            <Text style={{ opacity: 0.6, fontSize: 10 }}>{qualitylike}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginLeft: 60 }}>
          <FlatList
            data={cmtChidren}
            style={{ flex: 0.9 }}
            renderItem={({ item, index }) => {
              return (
                <CommentChildren
                  item={item}
                  index={index}
                  navigation={navigation}
                  deleteCommentChildern={deleteCommentChildern}
                  setParentId={setParentId}
                  handleTextInputChange={handleTextInputChange}
                  idCommentCha={Data._id}
                />
              );
            }}
          />

          {XemThem == true && (
            <TouchableOpacity onPress={hanlderXemThem}>
              <Text style={{ color: "blue" }}>
                {qualityCommetShow} xem thêm...
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
                justifyContent: "center",
                backgroundColor: "",
              }}
            >
              <View style={styles.viewmodal}>
                <TouchableOpacity style={styles.touchcmt}>
                  <MaterialIcons
                    name="report-problem"
                    size={24}
                    color="black"
                  />
                  <Text>Report Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchcmt}>
                  <MaterialIcons
                    name="report-problem"
                    size={24}
                    color="black"
                  />
                  <Text>Reply</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchcmt}>
                  <MaterialIcons
                    name="report-problem"
                    size={24}
                    color="black"
                  />
                  <Text>Cập nhật </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchcmt}>
                  <MaterialIcons
                    name="report-problem"
                    size={24}
                    color="black"
                  />
                  <Text>Hide comment</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={deleteComment}
                  style={styles.touchcmt}
                >
                  <MaterialIcons
                    name="report-problem"
                    size={24}
                    color="black"
                  />
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
);
export default Comment;
const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
  },
  pressAble: {
    borderRadius: 10,
    flexDirection: "row",
    marginTop: 10,
    width: "80%",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  ViewitemCmt: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 120,
  },
  viewTab: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
    marginTop: 5,
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
    marginLeft: 10,
    width: "90%",
  },
  touchcmt: {
    marginTop: 10,
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
});
// const HandlerComemntchildren = (sendComemtChildren) => {
//   console.log('nhanj gais tri',sendComemtChildren)
//      setCmchildren((prevComments) => [sendComemtChildren, ...prevComments]);
// }
// HandlerComemntchildren = setHandlerComemntchildren;
//const [cmtChidren, setCmchildren] = useState(useSelector((state) => state.auth))
// useEffect(() => {
//   console.log('hoolnay ')
//   if (sendComemtChildren == null) {
//     return;
//   }
//   if (Data._id === sendComemtChildren.parentId) {
//     // console.log(cmtChidren,'cmtch')
//     setCmchildren((prevComments) => [sendComemtChildren, ...prevComments]);
//     setComponent(true);
//   }
// }, [sendComemtChildren]);
