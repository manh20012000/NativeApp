import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import FlatItem from "./FlatItem.js";
import { Entypo } from "@expo/vector-icons";
import { Tabs, CollapsibleTabView } from "react-native-collapsible-tab-view";
import { login } from "../../Redex/Reducer/auth.slice.js";
import { checkingToken } from "../../confige/CheckingToken.js";
import axios from "axios";
import { io } from "socket.io-client";
import path from "../../confige/config.js";
import { useSelector, useDispatch } from "react-redux";
const SeeDeTail = ({ route, navigation }) => {
  const count = useSelector((state) => state.auth.value);
  const { width, height } = useWindowDimensions();
  const BackTrangHome = () => {
    navigation.goBack();
  };
  // console.log(route.params, "dsahgfchsdbhcbsdj");
  const dispath = useDispatch();
  const [dataRoute, setDataRote] = useState(route.params);
  const [baiviet, setBaiviet] = useState([]);
  // console.log(dataRoute);
  const NavigateMess = async () => {
    try {
      const isChecked = await checkingToken.checking(count);
      if (typeof isChecked === "object" && isChecked !== null) {
        dispath(login(isChecked));
        const { data } = await axios.get(
          `${path}/getMessage/${dataRoute._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
            },
          }
        );
        console.log(data, "dataatin nhan ");
        if (data.length === 0) {
          navigation.navigate("PesionChat", {
            participants: dataRoute,
            Messages: [],
          });
        } else {
          navigation.navigate("PesionChat", {
            participants: dataRoute,
            Messages: data,
          });
        }
      }
    } catch (error) {
      console.log(error, "lỗi khi chuyen sang chat sseedetail NavigateMess");
    } finally {
      // console.log(dataUserChat)
    }
  };

  const [isFriend, setIsFriend] = useState(false);
  const [status, setStatus] = useState(null);
  let handlePress = async () => {
    try {
      const isChecked = await checkingToken.checking(count);
      let notifimessgae = "";
      let checkstatus = status;
      if (status == null) {
        notifimessgae = `@[${count.Hoten}](id:${count._id}) gữi cho bạn lời mời kết bạn`;
        setStatus("Can't request");
        setIsFriend(true);
      } else if (status === "Can't request") {
        checkstatus = null;
        setStatus(null);
        setIsFriend(false);
      } else if (status === "Respons") {
        notifimessgae = `@[${count.Hoten}](id:${count._id}) chấp nhận lời mời kết bạn`;

        console.log(status);
        checkstatus = "Friend";
        setStatus("Friend");
        setIsFriend(true);
      }
      console.log(status, "status", isFriend);
      if (typeof isChecked === "object" && isChecked !== null) {
        // console.log(count.accessToken);
        // console.log(isChecked, "gias tri sau checked");
        dispath(login(isChecked));
        // setIsFriend((prevState) => !prevState);
        console.log("hihi", status);
        const { data } = await axios.post(
          `${path}/Addfriend`,
          {
            _idsend: count._id,
            toreciver: dataRoute._id,
            status: status,
            nameSend: count.Hoten,
            avatarSend: count.Avatar,
            messagenotifi: notifimessgae,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
            },
          }
        );
        console.log(data.message, "message");
      }
    } catch (err) {
      console.log(err, "lỗi với addfriend message handlePress");
    }
  };
  useEffect(() => {
    const handlercheckcount = async () => {
      try {
        const isChecked = await checkingToken.checking(count);
        if (typeof isChecked === "object" && isChecked !== null) {
          dispath(login(isChecked));
          console.log(dataRoute._id);
          const { data } = await axios.get(
            `${path}/userfriendReq/${isChecked._id}`,
            {
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
              },
            }
          );

          const arrayFriendReq = dataRoute.friendRequests;
          // Kiểm tra nếucount gửi lời mời kết bạn cho người khác
          const friendRequestByMe = arrayFriendReq.find(
            (request) =>
              request.from.toString() === count._id.toString() &&
              request.to.toString() === dataRoute._id.toString() // ID của người dùng mà bạn đang kiểm tra
          );

          const friendRequestToMe = data.data.find(
            (request) =>
              request.from.toString() === dataRoute._id.toString() &&
              request.to.toString() === count._id.toString() // Kiểm tra nếucount nhận được lời mời từ user đó
          );
          if (friendRequestByMe) {
            // dối với mình là người đăng nhập
            setIsFriend(true);
            setStatus(friendRequestByMe.status);
          } else if (friendRequestToMe) {
            // đây là người khác gưix cho mình

            setIsFriend(true);
            // nếu người khác gữi cho mình là
            if (friendRequestToMe.status === "Can't request") {
              setStatus("Respons");
            } else {
              setIsFriend(true);
              setStatus(friendRequestToMe.status);
            }
          } else {
            console.log("không tim tháy");
            setIsFriend(false);
            setStatus(null); // Không có lời mời nào đã được gửi
          }
        }
      } catch (err) {
        console.log(err, "friend addd req");
      }
    };
    handlercheckcount();

    // const selectPostUser = async () => {
    //   try {
    //     if (count && dataRoute) {
    //       const friendRequests = dataRoute.friendRequests || []; // Danh sách lời mời kết bạn

    //       // Kiểm tra xem người dùng đã gửi lời mời kết bạn chưa
    //       const friendRequest = friendRequests.find(
    //         (request) => count._id === request.from.toString()
    //       );

    //       if (friendRequest) {
    //         // Nếu có lời mời kết bạn, cập nhật trạng thái
    //         setIsFriend(true); // Cập nhật isFriend nếu trạng thái là "Friend"
    //         setStatus(friendRequest.status); // Cập nhật trạng thái (Can't reques, Friend, rejected)
    //       } else {
    //         // Nếu không tìm thấy lời mời kết bạn
    //         setIsFriend(false); // Người dùng chưa gửi lời mời kết bạn
    //         setStatus(null); // Không có trạng thái
    //       }
    //     }
    //     const isChecked = await checkingToken.checking(count);
    //     if (typeof isChecked === "object" && isChecked !== null) {
    //       dispath(login(isChecked));
    //       console.log(dataRoute._id);
    //       const { data } = await axios.post(
    //         `${path}/selectPost_inUser`,
    //         {
    //           userId: dataRoute._id,
    //         },
    //         {
    //           headers: {
    //             "Content-Type": "application/json",
    //             authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
    //           },
    //         }
    //       );
    //       // console.log(data, "trang thái");

    //       setBaiviet(data.data);
    //     }
    //   } catch (err) {
    //     console.log(err, "lỗi vơis lấy dữ luêuj ra màn seedetail ");
    //   }
    // };
    // selectPostUser();
  }, []);
  const InforHeader = () => {
    return (
      <View
        style={{
          flex: 0.3,
          backgroundColor: "#444444",
          paddingBottom: 6,
        }}
      >
        <StatusBar backgroundColor="black" animated={true} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={BackTrangHome}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 300,
              backgroundColor: "white",
              marginRight: 15,
              marginVertical: 10,
              borderRadius: 40,
              padding: 8,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text> nhập tìm kiếm </Text>
            <Feather name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <View style={{}}>
            <Image
              source={{ uri: dataRoute.Avatar }}
              style={{
                width: "100%",
                height: 250,

                borderWidth: 2,
                borderColor: "red",
              }}
            ></Image>
            <Text
              style={{
                fontSize: 40,
                marginLeft: 20,
                fontWeight: "800",
                color: "white",
              }}
            >
              {dataRoute.Hoten}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "500",
            }}
          >
            {dataRoute.numberFollowing} Bạn bè
          </Text>
          <Text
            style={{
              color: "white",
              fontWeight: "500",
            }}
          >
            {dataRoute.userlikeAtical.length} Likes Article
          </Text>
          <Text
            style={{
              color: "white",
              fontWeight: "500",
            }}
          >
            {dataRoute.userlikeVideo.length} Likes Video
          </Text>
        </View>
        <View
          style={{
            width: 400,
            height: 30,
            backgroundColor: "#333333",
            marginTop: 3,
          }}
        >
          <Text style={{ color: "white", marginLeft: "3%" }}>
            Gới thiệu chung
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: "2%",
            flexDirection: "row",
            marginTop: "2%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              NavigateMess();
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 140,
              height: 40,
              backgroundColor: "#333333",
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white" }}>Message</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlePress}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 140,
              height: 40,
              backgroundColor: isFriend ? "blue" : "green",
              borderRadius: 10,
              flexDirection: "row",
            }}
          >
            <Entypo
              name={isFriend ? "users" : "add-user"}
              size={24}
              color={isFriend ? "green" : "white"}
            />

            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              {console.log(isFriend, status, "veiw lohdjshj")}
              {isFriend ? "  " + status : "Thêm b bè"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 60,
              height: 40,
              backgroundColor: "#333333",
              borderRadius: 10,
            }}
          >
            <Entypo name="menu" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ fontSize: 24 }}>Detail</Text>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "pink",
      }}
    >
      <Tabs.Container renderHeader={InforHeader}>
        <Tabs.Tab name="BaiViet">
          <Tabs.FlatList
            removeClippedSubviews={true}
            keyExtractor={(item, index) => index.toString()}
            data={baiviet}
            renderItem={({ item, index }) => {
              return (
                <FlatItem
                  item={item}
                  index={index}
                  userDn={count._id}
                  navigation={navigation}
                />
              );
            }}
          />
        </Tabs.Tab>
        {/* //===========================Tbavidb================================================= */}
        <Tabs.Tab name="Video"></Tabs.Tab>
        <Tabs.Tab name="Like"></Tabs.Tab>
      </Tabs.Container>
    </View>
  );
};
export default SeeDeTail;
// useEffect(() => {
//   let mangArr = [];
//     const fetchDataFromFirestore = async (name) => {
//       try {
//         const q = query(collection(firestore, 'BaiVietCaNhan'), where('name', '==', name));
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//           // console.log(doc.id, '=>', doc.data());
//           mangArr.push(doc.data());
//         });
//         setBaiviet(mangArr)
//       } catch (error) {
//         console.log(error);
//       }
//     };
//   // Sử dụng hàm để lấy danh sách tên trùng nhau
//   fetchDataFromFirestore('manh')
// }, [])
