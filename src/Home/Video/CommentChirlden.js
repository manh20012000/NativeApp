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
  const CommentChildren = ({ index,item }) => {
    const [user, setUser] = useState(item.User);
    const [Data, setData] = useState(item);
    
    const [Content, setContent] = useState(Data.Content);
    const [soluongCmt, setSoluongcmt] = useState(Data.SoluongCommentChildrent);
    const [cmtChidren, setCmchildren] = useState(Data.CommentChildren);
  
    const [ChidrenCpnent, setComponent] = useState(false);
    const [XemThem, setXemThem] = useState(false);
  
    useEffect(() => {
      if (soluongCmt == 0) {
        setComponent(true);
        setXemThem(false);
      } else if (soluongCmt > 0) {
        setComponent(false);
        setXemThem(true);
      }
    }, [Data]);
    const itemsPerPage = 3;
    const [startIndex, setStartIndex] = useState(0);
    // const visibleItems = cmtChidren.slice(startIndex, startIndex + itemsPerPage);
    const [isLiked, setIsLiked] = useState(false);
  
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
      const QualityComment = Data.SoluongCommentChildrent + 1;
        onDeleteComment(QualityComment,Item._id,);
    };
    useEffect(() => {
      setCmchildren(Data.CommentChildren);
    }, [Data]);
    return (
      <View >
        <Pressable
          android_ripple={{ color: "gray" }} // Ripple effect for Android
          style={styles.pressAble}
          onLongPress={() => {
            handleLongPress(Data);
          }}
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
          
              <TouchableOpacity
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
            </TouchableOpacity>
            <View style={{width:'95%'}}>
               <Text style={{ color: "black", }}>{Content}</Text>
            </View>
           
          
            <View style={styles.viewTab}>
              <View style={styles.ViewitemCmt}>
                <TimeAgo
                  style={{ color: "black", opacity: 0.7, fontSize: 12 }}
                  time={Data.createdAt}
                  hideAgo={true}
                />
  
                <TouchableOpacity
                  onPress={() => {
                    console.log("hahah");
                    props.handleTextInputChange(user.Hoten + " 👉 ");
                    props.setParentId(Data._id);
                  }}
                 
                >
                  <Text style={{ opacity: 0.5, fontSize: 13 }}>Reply</Text>
                </TouchableOpacity>
              </View>
              <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width:50
            }}
          >
            <TouchableOpacity>
              <AntDesign
                name="hearto"
                size={16}
                color={isLiked ? "red" : "black"}
              />
            </TouchableOpacity>
            <Text style={{ opacity: 0.6,fontSize:10}}>1234</Text>
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
         
        </Pressable>
        <Modal visible={showOptions} animationType="slide" transparent>
          <TouchableWithoutFeedback onPress={handleBackdropPress}>
            <View
              style={{
                borderRadius: 10,
                flex: 1,
                justifyContent: "center",
                backgroundColor:'',
              
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
  };
  export default CommentChildren;
  const styles = StyleSheet.create({
    topView: {
      flexDirection: "row",
      marginTop: 10,
      width: "100%",
    },
    pressAble: {
      borderRadius: 10,
      flexDirection: "row",
      marginTop: 5,
      width: "100%",
      borderRadius: 10,
      paddingHorizontal:5,
    },
    ViewitemCmt: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: 120,
    },
    viewTab: {
      flexDirection: "row",
      justifyContent: 'space-between',
      marginRight: 20,
      marginTop:5
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
      width: '90%',
   
      
    },
    touchcmt: {
      marginTop: 10,
      width: "100%",
      height: 40,
      flexDirection: "row",
      alignItems: "center",
    },
  });
  