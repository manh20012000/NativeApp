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
} from "react-native";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import { React, useState, useRef, useEffect, memo } from "react";
import TimeAgo from "react-native-timeago";
const Coment = (props) => {
  const datamini = [
    { index: 1, data: "1"},
  
  ]
  const [user, setUser] = useState(props.item.User);
  const [Data, setData] = useState(props.item);
    
  // useEffect(() => {
  //   const SelectdataUser = async () => {
  //     try {
  //       const { data } = await axios.post(
  //         "https://nativeapp-vwvi.onrender.com/selectUser",
  //         { idUser: Data.User }
  //       );
  //       setUser(data.data);
  //       // console.log(JSON.stringify(data)+'nho')
  //     } catch (er) {
  //       console.log(er);
  //     }
  //   };
  //   SelectdataUser();
  // }, []);
  const [Noidung, setNoiDung] = useState(Data.Content);
  const [soluongCmt, setSoluongcmt] = useState(Data.soluongcmt);
    
  // console.log(Noidung);
  const handleReplyClick = () => {
    props.handleTextInputChange("@" + user.Hoten);
  };
  const [ChidrenCpnent, setComponent] = useState(false);
  useEffect(() => {
    const CommentChildren = () => {
              
          }
       },[])
  // console.log(Data.CommentChildren.length )
  // console.log(Data)

  // useEffect(() => {
  //   if (Data.Comment.length>0) {
  //     setComponent(true);
  //   } else {
  //     setComponent(false);
  //   }
  // }, [Data.CommentChildren]);
  const FlaitcommentChildren = () => {
    return (
    
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          width: "90%",
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate("SeeDeTail", user)}
        >
          <Image
            style={{ width: 45, height: 45, borderRadius: 40 }}
            source={{ uri: user.Avatar }}
          ></Image>
        </TouchableOpacity>

        <View
          style={{
            height: "auto",
            marginLeft: 5,
          }}
        >
          <View
            style={{
              backgroundColor: "#333333",
              paddingHorizontal: 17,
              borderRadius: 10,
              marginHorizontal: 10,
            }}
          >
            <TouchableOpacity>
              <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }}>
                {user.Hoten}
              </Text>
            </TouchableOpacity>
            <Text style={{ color: "white" }}>{Noidung}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 15,
                width: 160,
              }}
            >
              <TimeAgo
                style={{ color: "blue" }}
                time={Data.createdAt}
                hideAgo={true}
              />
              <TouchableOpacity>
                <Text>Like</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleReplyClick }>
                <Text>Reply</Text>
              </TouchableOpacity>
            </View>
            <Text>Thích</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
    <View
      style={{
        flexDirection: "row",
        marginTop: 10,
        width: "90%",
      }}
    >
      <TouchableOpacity
        onPress={() => props.navigation.navigate("SeeDeTail", user)}
      >
        <Image
          style={{ width: 45, height: 45, borderRadius: 40 }}
          source={{ uri: user.Avatar }}
        ></Image>
      </TouchableOpacity>

      <View
        style={{
          height: "auto",
          marginLeft: 5,
        }}
      >
        <View
          style={{
            backgroundColor: "#333333",
            paddingHorizontal: 17,
            borderRadius: 10,
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }}>
              {user.Hoten}
            </Text>
          </TouchableOpacity>
          <Text style={{ color: "white" }}>{Noidung}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 15,
              width: 160,
            }}
          >
            <TimeAgo
              style={{ color: "blue" }}
              time={Data.createdAt}
              hideAgo={true}
            />
            <TouchableOpacity>
              <Text>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleReplyClick }>
              <Text>Reply</Text>
            </TouchableOpacity>
          </View>
          <Text>Thích</Text>
        </View>
      </View>
      </View>
      <View style={{marginLeft:60,backgroundColor:'white'}}>
        <FlatList
          data={datamini}
          style={{ flex: 0.9, backgroundColor: "pink" }}
          renderItem={({ item, index }) => {
            return <FlaitcommentChildren />;
          }}
        />
        <TouchableOpacity >
          <Text style={{ color: 'blue' }}>xem thêm...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Coment;
const styles = StyleSheet.create({});
