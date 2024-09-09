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
const ModalMention = ({ onValuechangeseach }) => {
  const [Textseach, setTextSeach] = useState(null);
  const [dataMention, setdataMention] = useState(null);
  const setSearchText = (text) => {
    setTextSeach(text);
  };

  const handeleSearch = async (text) => {
    const { data, mess } = await axios.post(`${path}/SearchMention`, {
      Textseach: text,
    });

    setdataMention(data.data);
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
