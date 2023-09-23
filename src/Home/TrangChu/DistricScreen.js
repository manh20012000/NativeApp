import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";

const DistrictScreen = ({ onValueChange }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredDistricts, setFilteredDistricts] = useState([]);

  const districts = [
    "Ba Đình",
    "Hoàn Kiếm",
    "Hai Bà Trưng",
    "Đống Đa",
    "Tây Hồ",
    "Cầu Giấy",
    "Thanh Xuân",
    "Hoàng Mai",
    "Long Biên",
    "Nam Từ Liêm",
    "Bắc Từ Liêm",
    "Hà Đông",
    "Sóc Sơn",
    "Mê Linh",
    "Xuân Mai",
  ];

  const handleSearch = (text) => {
    const filtered = districts.filter((district) =>
      district.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDistricts(filtered);
  };
  const handleDistrictSelect = (district) => {
      onValueChange(district);
    //   console.log(district)
  };

  return (
      <View style={{
          flex: 0.9,
          backgroundColor: 'white',
          
      }}>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 ,paddingHorizontal:10,}}
        onChangeText={(text) => {
          setSearchText(text);
          handleSearch(text);
        }}
        value={searchText}
        placeholder="Tìm kiếm quận huyện Hà Nội"
      />
      <FlatList
        data={filteredDistricts}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
            <TouchableOpacity
                style={{
                    padding: 10,
                    borderBottomWidth:1,
                }}
                onPress={() => handleDistrictSelect(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default DistrictScreen;
