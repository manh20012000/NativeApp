import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    Button,
    PanResponder,
  } from "react-native";
  import { React, useState, useRef, useEffect, memo } from "react";

export default BinhLuan = (props) => {
     // su ly modal cho  binh luan
    const [isVisible, setIsVisible] = useState(props.isVisible);
   console.log(isVisible)
    const toggleModal = () => {
        setIsVisible(!isVisible);
      };
  const handleBackdropPress = () => {
    setIsVisible(false);
  };
  return (
    <Modal
    visible={isVisible}
    animationType="slide"
    transparent={true}
    onRequestClose={toggleModal}
  >
    <TouchableWithoutFeedback onPress={handleBackdropPress}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(0, 0, 0,)",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            padding: 16,
          }}
        >
          <Text>Nội dung của Modal</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
  )
}

const styles = StyleSheet.create({})