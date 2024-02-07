import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useRef, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
const Skeleton = ({ width, height, style,borderRadius }) => {
  const translateX = useRef(new Animated.Value(-width)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        useNativeDriver: true,
        duration: 1000,
      })
    ).start();
  }, [width]);

  return (
 
    <View style={{ width, height, overflow: 'hidden',style ,backgroundColor:'#CCCCCC',borderRadius:borderRadius}}>
      <Animated.View
        style={{ width: "100%", height: "100%", transform: [{ translateX }] }}
      >
        <LinearGradient
          style={{ width:'100%',height:'100%'}}
          colors={["transparent", "rgba(0,0,0,0.2)", "transparent"]}
          //   start={{ x: 0, y: 0 }}
          start={{ x: 1, y: 0 }}
        />
      </Animated.View>
    </View>
  );
};
export default Skeleton;
const styles = StyleSheet.create({});
