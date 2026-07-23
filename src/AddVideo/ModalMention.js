import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import axios from "axios";
import path from "../confige/config";
import { useSelector, useDispatch } from "react-redux";
import { checkAndRefreshToken } from "../confige/ComponencheckingToken";
const ModalMention = ({ onValuechangeseach }) => {
  const [Textseach, setTextSeach] = useState(null);
  const userCurent = useSelector((state) => state.auth.value);
  const [dataMention, setdataMention] = useState(null);
  const dispath = useDispatch();
  const setSearchText = (text) => {
    setTextSeach(text);
  };

  const handeleSearch = async (text) => {
    try {
      const isChecked = await checkAndRefreshToken(dispath, userCurent);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        const { data, mess } = await axios.post(`${path}/SearchMention`, {
          Textseach: text,
        });

        setdataMention(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMendtion = (valueItem) => {
    onValuechangeseach(valueItem);
    //   console.log(district)
  };
  return (
    <View
      style={{
        flex: 0.9,
        backgroundColor: "white",
      }}
    >
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          paddingHorizontal: 10,
        }}
        onChangeText={(text) => {
          setSearchText(text);
          handeleSearch(text);
        }}
        value={Textseach}
        placeholder="Tìm kiếm Mention"
      />
      <FlatList
        data={dataMention}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 10,
              borderBottomWidth: 1,
            }}
            onPress={() => handleMendtion(item)}
          >
            <Text>{item.Hoten}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default ModalMention;
