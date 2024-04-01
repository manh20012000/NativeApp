import { StyleSheet, Text, View ,useWindowDimensions,} from "react-native";
import React from "react";
import Skeleton from "./Skeleton.js";
const SkeletonApp = ({ trangthai }) => {
  const { width } = useWindowDimensions();
  
  // console.log('trangthaia',trangthai)
  return (
    <View
      style={{
        width: "100%",
        height: 500,
        backgroundColor: "white",
        marginTop: 10,
        padding: 20,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <Skeleton width={60} height={60} borderRadius={100} />
        <View style={{ justifyContent: "space-around", marginHorizontal: 20 }}>
          <Skeleton width={200} height={18} borderRadius={6} trangthai={trangthai} />
          <Skeleton width={100} height={15} borderRadius={6} trangthai={trangthai}/>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Skeleton width={width-40} height={300} borderRadius={10} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Skeleton width={100} height={18} borderRadius={6} trangthai={trangthai}/>
        <Skeleton width={100} height={18} borderRadius={6} trangthai={trangthai}/>
        <Skeleton width={100} height={18} borderRadius={6} trangthai={trangthai}/>
      </View>
    </View>
  );
};
export default SkeletonApp;
const styles = StyleSheet.create({});
