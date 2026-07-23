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
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
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
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import Swiper from "react-native-swiper";
import { MaterialIcons } from "@expo/vector-icons";
import path from "../../confige/config.js";
import axios from "axios";
import { checkAndRefreshToken } from "../../confige/ComponencheckingToken.js";
import * as Location from "expo-location";
import DistrictScreen from "./DistricScreen.js";
import Spinner from "react-native-loading-spinner-overlay";
import Countries from "../../public/selectTed.js";
import { useSelector, useDispatch } from "react-redux";
import Editor, { EU } from "react-native-mentions-editor";
const UserThink = ({ navigation, route }) => {
  const count = useSelector((state) => state.auth.value);
  const dispath = useDispatch();
  const [Hienthi, setHienthi] = useState(true);
  const HandeHienthi = () => {
    setHienthi(true);
  };
  // back trang chu
  const backTrangchu = () => {
    navigation.navigate("Home");
  };
  // lấy data cua use
  const [data, setData] = useState(count);
  //  console.log(data._id)
  // thuc hien select Share option
  const [permission, setPermission] = useState("public");
  const countries = Countries;
  // botomsheeet cho phần lựa chon keier bà
  const [visible, setVisible] = useState(false);
  const bootomShetShare = () => {
    setVisible(!visible);
  };
  const [facing, setFacing] = useState('back');
  const [visible2, setVisible2] = useState(false);
  // set trang thai để cho thẻ view text và view ảnh được hiển thị
  const [viewHienthi, setView] = useState(1);
  // cho phép chọn post ânr hoặc hiển thị
  const [isSelectable, setIsSelectable] = useState(false);
  // mục nhấn chon ảnh  câps quyền cho ảnh
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const [selectedImages, setSelectedImages] = useState([]);
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ['images', 'videos'],
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImages(result.assets.map((asset) => asset.uri));
    }
  };
  useEffect(() => {
    const postImage = () => {
      if (selectedImages.length == 0) {
        setView(1);
        setIsSelectable(false);
      } else {
        setView(2);
        setIsSelectable(true);
      }
    };
    postImage();
  }, [selectedImages]);

  // set trang thai cho text thay đoi
  const [isText, setIsText] = useState();
  const onchangerTexT = (value) => {
    setMessage(value);
    if (value == "" && selectedImages.length == 0) {
      setIsSelectable(false);
    } else if (value == "" && selectedImages.length > 0) {
      setIsSelectable(true);
    } else {
      setIsSelectable(true);
    }
  };

  const XoaAnh = (image, index) => {
    // console.log(image,index)
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
    if (newImages.length === 0) {
      setView(1);
    }
  };

  // nêu mà loai bor chọn ảnh thì quay vè trang status
  useEffect(() => {
    const setTrangThai = () => {
      if (selectedImages.length == 0) {
        setView(1);
      }
    };
    setTrangThai();
  }, [selectedImages]);

  // thưc hien su ly với camera=========================================================
  const cameraRef = useRef();
  const [pickedImagePath, setPickedImagePath] = useState("");

  // const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState(null);
  const [flast, setFlast] = useState("off");
  const [startCamera, setStartCamera] = useState(true);
  const [isView, setIsView] = useState(true);

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      // start the camera
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };

  // cho phép bạn chọn vaof thựo tính nào
  const [selectedOption, setSelectedOption] = useState("16:9");
  const handlePress = (option) => {
    setSelectedOption(option);
  };

  // tương tác với ảnh sau khi đưuocj chupk
  const [capturedImage, setCapturedImage] = useState(null);

  const __takePicture = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync();
    setCapturedImage(photo);
    setIsView(false);
    setStartCamera(false);
  };
  // cho phép đổi canm
  const [type, setType] = useState('front');
  const toggleCameraType = () => {
    setType(current => (current === 'back' ? 'front' : 'back'));
  };
  // khi bạn bấm với nut save
  const SaveImage = () => {
    setView(3);
    setHienthi(true);
    setIsSelectable(true);
  };

  // cho phép nhấn xóa khi khoong ưng cái ảnh này
  const __retakePicture = () => {
    setCapturedImage(null);
    setIsView(true);
    __startCamera();
  };

  const [flashMode, setFlashMode] = useState("off");
  const __handleFlashMode = () => {
    console.log(flashMode);
    if (flashMode === "on") {
      setFlashMode("off");
    } else if (flashMode === "off") {
      setFlashMode("on");
    } else {
      setFlashMode("auto");
    }
  };
  const [searchText, setSearchText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  // thuc hien lấyyvi tri
  const [location, setLocation] = useState(null);
  const choPhepTRuyCapViTri = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // Xử lý khi người dùng không cấp quyền
      return;
    }
    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  };
  const [vitri, setVitri] = useState(null);
  const handleValueChange = (newVitri) => {
    setVitri(newVitri);
    if (newVitri != "") {
      setVisible2(!visible2);
    }
  };
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    console.log("vi tri");
  };
  const bootomShetShare2 = () => {
    choPhepTRuyCapViTri();
    setVisible2(!visible2);
    console.log("bootomshet2");
  };
  // thuc hien set load khi nhấn vào
  const [loading, setLoading] = useState(false);
  // thưc hien lay du lieu gui len axios
  const [feel, setFell] = useState(null);
  // tạo  1 đôis tượng form đa ta

  const [initialValue] = useState(""); // Giá trị khởi tạo cho input
  const [showEditor, setShowEditor] = useState(true); // Kiểm soát hiển thị Editor
  const [message, setMessage] = useState(null); // Lưu nội dung tin nhắn
  const [clearInput, setClearInput] = useState(false); // Xóa input sau khi gửi
  const [showMentions, setShowMentions] = useState(false); // Hiển thị danh sách mentions
  const [arrUserSer, setArrayUser] = useState([]); // State lưu danh sách người dùng từ API
  const handleSearch = async (text) => {
    console.log(`Searching for: ${text}`); // In ra log để kiểm tra tìm kiếm
    try {
      const isChecked = await checkAndRefreshToken(dispath, count);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        const { data } = await axios.post(`${path}/SearchMention`, {
          Textseach: text, // Gửi text tìm kiếm lên server
        });
        console.log("Users found:", data.data); // Log dữ liệu người dùng
        setArrayUser(data.data); // Cập nhật danh sách người dùng dựa trên kết quả API
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const onChangeHandler = (messageObj) => {
    const value = messageObj.text; // Lấy text từ object message

    // Tìm vị trí ký tự '@'
    const atSymbolIndex = value.lastIndexOf("@");

    // Nếu có ký tự '@' và không có khoảng trắng ngay sau đó
    if (atSymbolIndex !== -1 && value[atSymbolIndex + 1] !== " ") {
      const searchQuery = value.substring(atSymbolIndex + 1).trim(); // Lấy phần text sau '@'

      // Nếu có văn bản sau '@', thì tìm kiếm người dùng
      if (searchQuery.length > 0) {
        handleSearch(searchQuery); // Gọi hàm tìm kiếm với tagname
      }
    }

    setMessage(value); // Cập nhật lại nội dung message
  };

  // Hàm render từng tin nhắn trong danh sách

  const HanderUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    let datetime = new Date();
    let datePostTimstemp = await datetime.toISOString().slice(0, -5);
    console.log(' sdgshdbsjd ', message)
    formData.append("trangThai", message);
    formData.append("datePost", datePostTimstemp);
    formData.append("feel", feel);
    formData.append("permission", permission);
    formData.append("vitri", vitri);
    formData.append("idLogin", data._id);

    for (let i = 0; i < selectedImages.length; i++) {
      console.log(selectedImages[i]);
      formData.append("ArayImages", {
        uri: selectedImages[i],
        name: `image_${i}.jpeg`,
        type: "image/jpeg",
      });
    }
    try {
      const isChecked = await checkAndRefreshToken(dispath, count);
      if (!isChecked) {
        console.log("Token hết hạn, cần đăng nhập lại");
        // Thực hiện điều hướng về trang đăng nhập nếu cần
        return null;
      } else {
        const { status, msg } = await axios.post(
          `${path}/uploadAnh`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${isChecked.accessToken}`,
            },
          }
        );
        setFell(null);
        setPermission("public");
        setLocation(null);
        setIsText(null);
        if (status == 200) {
          navigation.navigate("Home");
          setLoading(false);
          alert("upload thành công");
        }
      }
    } catch (erro) {
      setLoading(false);
      console.log(erro + "->>catch lỗi userThink HanderUpload ");
    }
  };
  // console.log(selectedImages)
  return (
    <View style={{ flex: 1, }}>
      {Hienthi && (
        <View style={{ flex: 1, }}>
          <View
            style={{
              backgroundColor: "#333333",
              width: "100%",
              height: 50,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => backTrangchu()}
              style={{ flexDirection: "row" }}
            >
              <Ionicons name="arrow-back" size={26} color="white" />
              <Text style={{ color: "white" }}> Create Post</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                backgroundColor: isSelectable ? "blue" : "green",
                width: "15%",
                height: "60%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={HanderUpload}
              disabled={!isSelectable}
            >
              <Text style={{ color: "white" }}>POST</Text>
              <Spinner
                visible={loading}
                textContent={"Đang tải..."}
                textStyle={{ color: "#FFF" }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#999999",
              width: "100%",
              height: 90,
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 80,
                backgroundColor: "#999999",
              }}
            >
              <Image
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 80,
                }}
                source={{ uri: data.Avatar }}
              />
            </View>
            <View
              style={{
                marginLeft: 14,
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color: "black",
                    fontWeight: "600",
                  }}
                >
                  {data.Hoten}
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontSize: 17,
                  }}
                >
                  {vitri}
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  marginHorizontal: 10,
                  justifyContent: "space-around",
                }}
              >
                <SelectDropdown
                  data={countries}
                  onSelect={(selectedItem, index) => {
                    setPermission(selectedItem.title);
                  }}
                  buttonStyle={{
                    width: 120,
                    height: 40,
                    borderBottomColor: "#339900",
                    borderRadius: 12,
                    backgroundColor: "#3366CC",
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.title;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.title;
                  }}
                  buttonTextStyle={{
                    color: "white",
                  }}
                  renderDropdownIcon={(isOpened) => {
                    return (
                      <FontAwesome
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        color={"white"}
                        size={18}
                      />
                    );
                  }}
                  dropdownIconPosition={"left"}
                  dropdownStyle={styles.dropdown4DropdownStyle}
                  rowStyle={{
                    backgroundColor: "#999999",
                  }}
                  rowTextStyle={{
                    color: "white",
                    fontWeight: "800",
                  }}
                />
                <TouchableOpacity
                  style={{
                    width: 120,
                    height: 40,
                    borderBottomColor: "#FF3300",
                    borderRadius: 12,
                    backgroundColor: "#3366CC",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Entypo name="add-to-list" size={24} color="black" />
                  <Text style={{ color: "white" }}> Album</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            {viewHienthi == 1 && (
              <View
                style={{
                  backgroundColor: "#888888",
                  width: "100%",
                  height: 600,
                  padding: 10,
                }}
              >
                {/* <Editor
                  style={{

                    width: "100%",
                    height: "100%",
                  }}
                  list={arrUserSer} // Truyền danh sách người dùng từ API vào Editor
                  initialValue={initialValue}
                  clearInput={clearInput}
                  onChange={onChangeHandler}
                  showEditor={showEditor}
                  toggleEditor={() => setShowEditor(false)}
                  showMentions={showMentions}
                  onHideMentions={() => setShowMentions(false)}
                  placeholder="You can write here..."
                  onSearch={handleSearch} // Gọi API khi người dùng nhập @
                /> */}
                <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
                  <TextInput
                    placeholder="What on your mind ?"
                    placeholderTextColor={"white"}
                    style={{ color: "white", fontSize: 18 }}
                    multiline
                    onChangeText={onchangerTexT}
                    underlineColorAndroid="transparent"
                    value={message}
                  ></TextInput>
                  <Text style={{ color: "white", fontSize: 16 }}> {feel}</Text>
                </ScrollView>

              </View>
            )}
            {viewHienthi == 2 && (
              <View
                style={{
                  backgroundColor: "#888888",
                  width: "100%",
                  height: "74%",
                  paddingTop: 10,
                }}
              >
                {/* <Editor
                  list={arrUserSer} // Truyền danh sách người dùng từ API vào Editor
                  initialValue={initialValue}
                  clearInput={clearInput}
                  onChange={onChangeHandler}
                  showEditor={showEditor}
                  toggleEditor={() => setShowEditor(false)}
                  showMentions={showMentions}
                  onHideMentions={() => setShowMentions(false)}
                  placeholder="You can write here..."
                  onSearch={handleSearch} // Gọi API khi người dùng nhập @
                /> */}
                <ScrollView>
                  <TextInput
                    placeholder="What you think ?"
                    placeholderTextColor={"white"}
                    style={{
                      color: "white",
                      fontSize: 18,
                      marginBottom: 10,
                    }}
                    multiline
                    value={isText}
                    onChangeText={onchangerTexT}
                  ></TextInput>
                  <Text style={{ color: "white", fontSize: 16 }}>{feel}</Text>
                  <Swiper style={{ backgroundColor: "#555555" }} loop={true}>
                    {selectedImages.map((image, index) => (
                      <View key={index} style={{ position: "relative" }}>
                        <TouchableOpacity
                          onPress={() => {
                            XoaAnh(image, index);
                          }}
                          style={{
                            position: "absolute",
                            zIndex: 1,
                            right: 10,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 24,
                              fontWeight: "bold",
                              color: "white",
                            }}
                          >
                            x
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: "bold",
                              color: "white",
                            }}
                          >
                            {index}/{selectedImages.length}
                          </Text>
                        </TouchableOpacity>

                        <Image
                          key={index}
                          source={{ uri: image }}
                          style={{ width: "100%", height: "80%" }}
                          resizeMode="contain"
                        />
                      </View>
                    ))}
                  </Swiper>
                </ScrollView>
              </View>
            )}
            {viewHienthi == 3 && (
              <View
                style={{
                  backgroundColor: "#888888",
                  width: "100%",
                  height: 600,
                  paddingTop: 10,
                }}
              >
                <TextInput
                  placeholder="What you think ?"
                  placeholderTextColor={"white"}
                  style={{
                    color: "white",
                    fontSize: 18,
                    marginBottom: 10,
                  }}
                  multiline
                  value={message}
                  onChangeText={onchangerTexT}
                ></TextInput>
                <Text style={{ color: "white", fontSize: 16 }}>{feel}</Text>
                <View
                  style={{
                    width: "100%",
                    height: 600,

                  }}
                >
                  <Image
                    source={{ uri: capturedImage.uri }}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </View>
              </View>
            )}

            <View
              style={{
                width: "100%",
                height: 75,
                paddingHorizontal: 10,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "#808080",
              }}
            >
              <TouchableOpacity onPress={pickImages} style={{}}>
                <Ionicons name="images" size={24} color="#00FF00" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setHienthi(false);
                  __startCamera();
                }}
                style={{}}
              >
                <Entypo name="video-camera" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={{}}>
                <Entypo name="add-user" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={bootomShetShare} style={{}}>
                <Entypo name="emoji-happy" size={25} color="orange" />
              </TouchableOpacity>
              <TouchableOpacity onPress={bootomShetShare2} style={{}}>
                <FontAwesome5 name="map-marker-alt" size={24} color="red" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  backgroundColor: "#C0C0C0",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="ellipsis1" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* ============================Camera=============================================== */}
      {!Hienthi && (
        <View style={{ flex: 1, }}>
          <View
            style={{
              backgroundColor: "#222222",
              width: "100%",
              height: "5%",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 10,
            }}
          >
            {isView && (
              <TouchableOpacity
                onPress={HandeHienthi}
                style={{ flexDirection: "row" }}
              >
                <Ionicons name="arrow-back" size={26} color="white" />
                <Text style={{ color: "white" }}> Back</Text>
              </TouchableOpacity>
            )}
            {!isView && (
              <TouchableOpacity
                onPress={__retakePicture}
                style={{ flexDirection: "row" }}
              >
                <Text style={{ color: "white" }}> Back</Text>
              </TouchableOpacity>
            )}
            {!isView && (
              <TouchableOpacity
                onPress={SaveImage}
                style={{ flexDirection: "row" }}
              >
                <Text style={{ color: "white" }}> Save</Text>
              </TouchableOpacity>
            )}
          </View>
          {isView && (
            <View
              style={{
                flex: 1,
                height: '100%',
                position: "relative",
                backgroundColor: "black",
                zIndex: 1,
              }}
            >
              {startCamera === true && (

                <CameraView
                  style={{
                    flex: 0.9,
                  }}
                  facing={facing}
                  ref={cameraRef}
                  type={type}
                />
              )}

              <View
                style={{
                  width: "100%",
                  height: "auto",
                  alignItems: "center",
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "space-around",
                  alignSelf: 'center',
                  flex: 0.15,
                  backgroundColor: 'transparent'
                }}
              >


                <TouchableOpacity style={{

                  width: '10%',
                  height: 'auto',
                  borderRadius: 50,
                  marginBottom: 20,
                  borderRadius: 10

                }} onPress={toggleCameraFacing}>
                  <MaterialIcons name="flip-camera-android" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={__takePicture}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 50,
                    backgroundColor: "#fff",
                    marginTop: 20,
                  }}
                />
                <TouchableOpacity style={{

                  width: '10%',
                  height: 'auto',
                  borderRadius: 50,
                  marginBottom: 20,
                  borderRadius: 10

                }} >
                  <FontAwesome5 name="image" size={24} color="white" />
                </TouchableOpacity>

              </View>
            </View>
          )}
          {!isView && (
            <View
              style={{
                backgroundColor: "transparent",
                flex: 1,
                width: "100%",
                height: "100%",
              }}
            >
              <ImageBackground
                source={{ uri: capturedImage && capturedImage.uri }}
                style={{
                  flex: 1,
                }}
              />
            </View>
          )}
          <View
            style={{
              width: "100%",


              bottom: 0,
            }}
          ></View>
        </View>
      )}
      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={bootomShetShare}
      //Toggling the visibility state on the clicking out side of the sheet
      >
        {/*Bottom Sheet inner View*/}
        <View style={{ flex: 0.6, backgroundColor: "white" }}>
          <Text
            style={{
              textAlign: "center",
              padding: 20,
              fontSize: 20,
            }}
          >
            Cảm xúc
          </Text>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={{}}
          >
            <TouchableOpacity
              onPress={() => {
                setFell(" -Đang cảm thấy vui vẻ 😁😁😁");
                setVisible(!visible);
              }}
              style={{
                width: "100%",
                height: 50,

                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
              }}
            >
              <Text>Đang cảm thấy vui vẻ 😁😁😁</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setFell(" -Đang cảm thấy buồn😒😒");
                setVisible(!visible);
              }}
              style={{
                width: "100%",
                height: 50,

                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
              }}
            >
              <Text>Đang cảm thấy buồn 😒😒</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFell(" -Đang cảm thấy may mắn😂😂");
                setVisible(!visible);
              }}
              style={{
                width: "100%",
                height: 50,

                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
              }}
            >
              <Text>Đang cảm thấy may mắn 😊😊</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFell(" -Đang cảm thấy hạnh phúc😍😍");
                setVisible(!visible);
              }}
              style={{
                width: "100%",
                height: 50,

                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
              }}
            >
              <Text>Đang cảm thấy hạnh phúc 😍😍😍</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFell(" -Đang cảm thấy bực mình😒😒");
                setVisible(!visible);
              }}
              style={{
                width: "100%",
                height: 50,

                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
              }}
            >
              <Text>Đang cảm thấy bực mình😘😘🙁</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFell(" -Đang cảm thấy đáng yêu 😊😊");
                setVisible(!visible);
              }}
              style={{
                width: "100%",
                height: 50,

                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
              }}
            >
              <Text>Đang cảm thấy bực mình😊😊</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFell(" -Đang cảm thấy nhớ nhà 🚗🚗🚗");
                setVisible(!visible);
              }}
              style={{
                width: "100%",
                height: 50,

                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
              }}
            >
              <Text>Đang cảm thấy nhớ nhà😒😒</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFell(" -Đang cảm thấy đáng ❤️😍");
                setVisible(!visible);
              }}
              style={{
                width: "100%",
                height: 50,

                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
              }}
            >
              <Text>Đang cảm thấy đáng yêu❤️💕</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFell(" -Đang cảm thấy đáng cute ❤️😍");
                setVisible(!visible);
              }}
              style={{
                width: "100%",
                height: 50,

                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
              }}
            >
              <Text>Đang cảm thấy đáng cute❤️💕</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </BottomSheet>
      <BottomSheet
        visible={visible2}
        //setting the visibility state of the bottom shee
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={bootomShetShare2}
      //Toggling the visibility state on the clicking out side of the sheet
      >
        <DistrictScreen onValueChange={handleValueChange} />
      </BottomSheet>
    </View>
  );
};
export default UserThink;
const styles = StyleSheet.create({});
// useEffect(() => {
//   const Granted = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
//         {
//           title: "Acess LiBrary",
//           message:
//             "Cool Photo App needs access to your library" +
//             "so you can take awesome pictures.",
//           buttonNeutral: "Ask Me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "OK",
//         }
//       );

//     } catch (err) {
//       console.warn(err);
//     }
//   }
//   Granted();
//  },[])
// const HanderUpload = async () => {
//     setLoading(true);
//     if (viewHienthi == 1) {
//       try {
//         let datetime = new Date();
//         let datePostTimstemp = datetime.toISOString().slice(0, -5);
//         console.log(
//           isText,
//           datePostTimstemp,
//           data.idLogin,
//           permission,
//           feel,
//           vitri
//         );
//         const { status } = await axios.post(
//           "https://nativeapp.onrender.com/uploads/tao_bai_viet",
//           {
//             trangThai: isText,
//             datePost: datePostTimstemp,
//             idLogin: data.idLogin,
//             feel: feel,
//             permission: permission,
//             vitri,
//           }
//         );
//         setFell(null);
//         setPermission("public");
//         setLocation(null);
//         setIsText(null);
//         if (status == 200) {
//           navigation.navigate("TrangChu");
//           setLoading(false);
//           alert("thành công");
//         }
//       } catch (erro) {
//         setLoading(false);
//         console.log(erro.status + "loi da xinh ra ");
//       }
//     } else if(viewHienthi == 1) {
//       setLoading(false);
//       console.log("thatbai");
//       // let datePost=new Date()
//       // const senStatus=await axios.post('https://nativeapp.onrender.com/uploads/tao_bai_viet', {idLogin:data.idLogin,isText: isText,datePost:datePost})
//       // const semImage =await axios.post('https://nativeapp.onrender.com/uploads/  ', {idLogin:data.idLogin,image: selectedImages,datePost:datePost})
//     }
//   };
//   // console.log(selectedImages)
