import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import TimeAgo from "react-native-timeago";
import { checkingToken } from "../../../confige/CheckingToken";
import { useDispatch, useSelector } from "react-redux";
import path from "../../../confige/config";
import { TouchableOpacity } from "react-native";
import { login } from "../../../Redex/Reducer/auth.slice";
import axios from "axios";
const NotificationComponent = (props) => {
  const { width, height } = useWindowDimensions();
  const [isred, setIsred] = useState(props.item.isRead);
  const userCurent = useSelector((state) => state.auth.value);
  const dispath = useDispatch();
  // console.log(props.item._id);
  const handlerAccepOrDispose = async (onclickchange) => {
    try {
      setIsred(true);
      const isChecked = await checkingToken.checking(userCurent);
      // console.log(userCurent.accessToken);
      // console.log(isChecked, "gias tri sau checked");
      if (typeof isChecked === "object" && isChecked !== null) {
        dispath(login(isChecked));
        const { data } = await axios.put(
          `${path}/updateFriendReq/${props.item._id}`,
          {
            sendId: props.item.sendId,
            reciveId: props.item.reciveId,
            isRead: true,
            onclickchange: onclickchange,
            messagenotifi: `@[${userCurent.Hoten}](id:${userCurent._id}) đã ${onclickchange} lời mời kết bạn`,
            avatarSend: isChecked.Avatar,
          },
          {
            headers: {
              // Accept: "application/json",
              "Content-Type": "application/json",
              authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
            },
          }
        );
      }
    } catch (executionError) {
      console.log(executionError, "jaassjdjsnj");
    } finally {
      props.handlerremonotifi(props.item._id);
    }
  };

  const parseText = (text) => {
    const regex = /\@\[(.*?)\]\(id:(.*?)\)/g; // Regex để tìm @ và URL
    const parts = [];
    let lastIndex = 0;
    let match;

    // Dùng regex để tìm các đoạn text và link
    while ((match = regex.exec(text)) !== null) {
      const beforeText = text.slice(lastIndex, match.index); // Phần trước regex
      if (beforeText) parts.push({ text: beforeText, user: null, link: null });

      if (match[0].startsWith("http")) {
        // Trường hợp là URL
        parts.push({ text: match[0], user: null, link: match[0] });
      } else {
        // Trường hợp là @mention
        const userName = match[1];
        const userId = match[2];
        parts.push({ text: userName, user: userId, link: null });
      }

      lastIndex = match.index + match[0].length;
    }

    // Thêm phần cuối nếu có
    if (lastIndex < text.length) {
      parts.push({ text: text.slice(lastIndex), user: null, link: null });
    }

    return parts;
  };

  const renderParsedText = (text) => {
    const parsedParts = parseText(text); // Phân tích đoạn text
    return (
      <Text style={{ fontSize: 15, fontWeight: "500", color: "white" }}>
        {parsedParts.map((part, index) => {
          if (part.user) {
            return (
              <Text
                style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
                key={index}
                // onPress={async () => {
                //   try {
                //     // console.log("nahfy van", userCurent.accessToken, userCurent.refreshToken);
                //     const isChecked = await checkingToken.checking(userCurent);
                //     if (typeof isChecked === "object" && isChecked !== null) {
                //       dispath(login(isChecked));
                //       const { data } = await axios.post(
                //         `${path}/userfind`,
                //         {
                //           _id: part.user,
                //         },

                //         {
                //           headers: {
                //             "Content-Type": "application/json",
                //             authorization: `Bearer ${isChecked.accessToken}`, // Đảm bảo accessToken được truyền chính xác
                //           },
                //         }
                //       );
                //       // console.log(data);
                //       props.navigation.navigate("SeeDeTail", data.data);
                //     }
                //   } catch (err) {
                //     if (err.response) {
                //       console.log(
                //         "loi voiws xoa bai viet",
                //         err.response.status
                //       );
                //     } else {
                //       console.log("loi voiws xoa bai viet", err);
                //     }
                //   }
                // }}
              >
                {part.text}
              </Text>
            );
          } else {
            // Nếu là text bình thường
            return <Text key={index}>{part.text}</Text>;
          }
        })}
      </Text>
    );
  };
  return (
    <View
      style={{
        width: "100%",
        height: "auto",
        paddingHorizontal: "2%",
        padding: "2%",
        backgroundColor: isred ? "#555555" : "#888888",
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => {
          setIsred(true);
          props.navigation.navigate(props.item.title, props.item);
        }}
      >
        <Image
          source={{ uri: props.item.avatarSend }}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
        <View
          style={{
            width: "65%",
            marginHorizontal: "3%",
          }}
        >
          {renderParsedText(props.item.messageNotifi)}
          {props.item.title === "SeeUserAfriend" && (
            <View
              style={{
                justifyContent: "space-around",
                flexDirection: "row",
                paddingVertical: "2%",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "blue",
                  width: width / 4,
                  height: width / 11,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                }}
                onPress={() => {
                  handlerAccepOrDispose("Accept");
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Accept
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handlerAccepOrDispose("Decline");
                }}
                style={{
                  backgroundColor: "#777777",
                  width: width / 4,
                  height: width / 11,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                }}
              >
                <Text>Decline</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {props.item.thumbnailObject && (
          <Image
            source={{ uri: props.item.avatarSend }}
            style={{ width: 40, height: 40, borderRadius: 10 }}
          />
        )}
      </TouchableOpacity>
      <View style={{ marginLeft: "20%" }}>
        <TimeAgo
          style={{ fontSize: 11, color: "blue", fontWeight: "bold" }}
          time={props.item.createdAt}
        />
      </View>
    </View>
  );
};
export default NotificationComponent;
const styles = StyleSheet.create({});
