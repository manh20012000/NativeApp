import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Item,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  BackHandler,
  Alert,
  PermissionsAndroid,
  ImageBackground,
} from "react-native";
import * as Progress from "react-native-progress";
import { React, useState, useEffect, useRef, memo } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome, EvilIcons, AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { BottomSheet } from "react-native-btr";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera/legacy";
import Swiper from "react-native-swiper";
import * as MediaLibrary from "expo-media-library";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Constants } from "expo";
import DistrictScreen from "./DistricScreen.js";
import Spinner from "react-native-loading-spinner-overlay";
import Countries from "../../public/selectTed.js";
import { useSelector, useDispatch } from "react-redux";
import Editor, {
  displayTextWithMentions,
  MentionSuggestions,
} from "react-native-mentions-editor";

const textEditor = () => {
  const [initialValue] = useState(
    "Hey @[mrazadar](id:1) this is good work. Tell @[john.doe](id:5) to use this package."
  ); // Giá trị khởi tạo cho input
  const [showEditor, setShowEditor] = useState(true); // Kiểm soát hiển thị Editor
  const [message, setMessage] = useState(null); // Lưu nội dung tin nhắn
  const [messages, setMessages] = useState([]); // Lưu danh sách các tin nhắn
  const [clearInput, setClearInput] = useState(false); // Xóa input sau khi gửi
  const [showMentions, setShowMentions] = useState(false); // Hiển thị danh sách mentions

  // Hàm xử lý khi có thay đổi trong input
  const onChangeHandler = (message) => {
    setMessage(message);
    setClearInput(false);
  };

  // Hàm gửi tin nhắn
  const sendMessage = () => {
    if (!message) return;
    setMessages([message, ...messages]);
    setMessage(null);
    setClearInput(true);
  };

  // Hàm xử lý khi mất focus editor (có thể mở rộng nếu cần)
  const toggleEditor = () => {
    setShowEditor(false);
  };

  // Hàm ẩn danh sách mentions
  const onHideMentions = () => {
    setShowMentions(false);
  };

  // Hàm render từng tin nhắn trong danh sách
  const renderMessageListItem = ({ item: message }) => {
    return (
      <View style={styles.messageListItem}>
        <Text style={styles.messageText}>
          {EU.displayTextWithMentions(message.text, formatMentionNode)}
        </Text>
      </View>
    );
  };

  // Hàm render danh sách các tin nhắn
  const renderMessageList = () => {
    return (
      <FlatList
        style={styles.messageList}
        keyboardShouldPersistTaps={"always"}
        horizontal={false}
        inverted
        enableEmptySections={true}
        data={messages}
        keyExtractor={(message, index) => `${message.text}-${index}`}
        renderItem={renderMessageListItem}
      />
    );
  };

  return (
    <View style={styles.main}>
      <KeyboardAvoidingView behavior="position">
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.heading}>React-Native Mentions Package</Text>
            <Text style={styles.sub}>Built by @mrazadar</Text>
          </View>
          <ScrollView style={styles.messageList}>
            {renderMessageList()}
          </ScrollView>
          <View style={styles.footer}>
            {/* Editor nhập tin nhắn */}
            <Editor
              list={users}
              initialValue={initialValue}
              clearInput={clearInput}
              onChange={onChangeHandler}
              showEditor={showEditor}
              toggleEditor={toggleEditor}
              showMentions={showMentions}
              onHideMentions={onHideMentions}
              placeholder="You can write here..."
            />
            <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
              <Text style={styles.sendBtnText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default textEditor;
