import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { checkingToken } from "../../confige/CheckingToken";
import { login } from "../../Redex/Reducer/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import FlatItem from "../../Home/TrangChu/FlatItem";
import path from "../../confige/config";
import SkeletonApp from "../../Skeleton/SkeletonApp";
const SeeUserAfriend = ({ navigation, route }) => {
  // ở đây mình phải thực hiện vố cái việc gữi tin nhắn thông báo với hook để chuyển sang màn hình seeDetail
  return (
    <View>
      <Text>SeeUserAfriend</Text>
    </View>
  );
};
export default SeeUserAfriend;
const styles = StyleSheet.create({});
