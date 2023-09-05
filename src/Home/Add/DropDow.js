import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
  { label: 'thiết bị điện tử', value: '1' },
  { label: 'quần áo ', value: '2' },
  { label: 'giày dép', value: '3' },
  { label: 'quần áo thu đông', value: '4' },
  { label: 'đồ chơi trẻ em ', value: '5' },
  { label: 'thực phẩm chức năng', value: '6' },
  { label: 'đồ dùng cá nhân ', value: '7' },
  { label: 'hải sản ', value: '8' },
  { label: 'phục vụ học tập ', value: '9' },
  { label: ' đồ ăn nhanh', value: '10' },
  { label: 'bánh kẹo ', value: '11' },
  { label: 'dinh dưỡng cho trẻ ', value: '12' },
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="loại mặt hàng"
      searchPlaceholder="Search..."
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} color="black" name="Safety" size={30} />
      )}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    marginTop:10,
    height: 80,
    width:'100%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});