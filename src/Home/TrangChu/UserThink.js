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
  TouchableWithoutFeedback,
  Modal,
  BackHandler,
  Alert,
  ImageBackground,
  PermissionsAndroid,
} from "react-native";
import { React, useState, useEffect, useRef, memo } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome, EvilIcons, AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { BottomSheet } from "react-native-btr";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import Swiper from "react-native-swiper";
import * as MediaLibrary from "expo-media-library";
import { MaterialIcons } from "@expo/vector-icons";

const UserThink = ({ navigation, route }) => {
  const [Hienthi, setHienthi] = useState(true);
  const HandeHienthi = () => {
    console.log("ddd");
    setHienthi(true);
  };
  // back trang chu
  const backTrangchu = () => {
    navigation.navigate("TrangChu");
  };
  // lấy data cua use
  const [data, setData] = useState(route.params);
  // thuc hien select Share option

  const countries = [
    {
      title: "Private",
      image:
        "https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-viet-nam-373x560.jpg",
    },
    {
      title: "public",
      image:
        "https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-viet-nam-373x560.jpg",
    },
    {
      title: "protected",
      image:
        "https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-viet-nam-373x560.jpg",
    },
    {
      title: "cá nhân",
      image:
        "https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-xinh-viet-nam-373x560.jpg",
    },
  ];
  // botomsheeet cho phần lựa chon keier bà
  const [visible, setVisible] = useState(true);
  const bootomShetShare = () => {
    setVisible(!visible);
  };
  // set trang thai để cho thẻ view text và view ảnh được hiển thị
  const [viewHienthi, setView] = useState(1);
  // cho phép chọn post ânr hoặc hiển thị
  const [isSelectable, setIsSelectable] = useState(false);
  // mục nhấn chon ảnh  câps quyền cho ảnh
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
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
  const [selectedImages, setSelectedImages] = useState([]);
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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
      } else if (selectedImages.length > 0) {
        setView(2);
        setIsSelectable(true);
      }
    };
    postImage();
  }, [selectedImages]);
  // set trang thai cho text thay đoi
  const [isText, setIsText] = useState();
  const onchangerTexT = (value) => {
    setIsText(value);
    if (value == "" &&selectedImages.length==0) {
      setIsSelectable(false);
    } else if(value == ""&&selectedImages.length>0){
      setIsSelectable(true);
    }
    else {
      setIsSelectable(true);
    }
  };
  // set lai khi xoa di 1 cai anh
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
      if (selectedImages.length === 0) {
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

  __startCamera = async () => {
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
  useEffect(() => {}, [selectedOption]);
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
  const [type, setType] = useState(CameraType.front);
  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };
  // khi bạn bấm với nut save
  const SaveImage = () => {
    setView(3);
    setHienthi(true);
    setIsSelectable(true);
  };
 
  // cho phép nhấn xóa khi khoong ưng cái ảnh này 
  const __retakePicture = () => {
    setCapturedImage(null)
    setIsView(true)
    __startCamera()
  }
  // useEffect(() => {
  //   const set = () => {
  //     setIsView(true)
  //     }
  //  }, [capturedImage]);
  // flat mode
  
  const [flashMode, setFlashMode] =useState('off')
  const __handleFlashMode = () => {
       console.log(flashMode)
    if (flashMode === 'on') {
      setFlashMode('off')
    } else if (flashMode === 'off') {
      setFlashMode('on')
    } else {
      setFlashMode('auto')
    }

  }
  return (
    <View style={{ flex: 1 }}>
      {Hienthi && (
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: "#222222",
              width: "100%",
              height: "8%",
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
                backgroundColor: isSelectable ? "blue" : "pink",
                width: "15%",
                height: "60%",
                justifyContent: "center",
                alignItems: "center",
              }}
              // onPress={handlePress}
              disabled={!isSelectable}
            >
              <Text style={{ color: "white" }}>POST</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "pink",
              width: "100%",
              height: "12%",
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
                source={{ uri: data.userphoto }}
              />
            </View>
            <View
              style={{
                marginLeft: 14,
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  color: "white",
                  fontWeight: "600",
                }}
              >
                {data.taikhoan}
              </Text>
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
                    console.log(selectedItem, index);
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
                        color={"pink"}
                        size={18}
                      />
                    );
                  }}
                  dropdownIconPosition={"left"}
                  dropdownStyle={styles.dropdown4DropdownStyle}
                  rowStyle={{
                    backgroundColor: "pink",
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
                  backgroundColor: "#444444",
                  width: "100%",
                  height: "70%",
                  padding: 10,
                }}
              >
                <TextInput
                  placeholder="What on your mind ?"
                  placeholderTextColor={"white"}
                  style={{ color: "white", fontSize: 18 }}
                  multiline
                  onChangeText={onchangerTexT}
                  value={isText}
                ></TextInput>
                <BottomSheet
                  visible={visible}
                  //setting the visibility state of the bottom shee
                  onBackButtonPress={bootomShetShare}
                  //Toggling the visibility state on the click of the back botton
                  onBackdropPress={bootomShetShare}
                  //Toggling the visibility state on the clicking out side of the sheet
                >
                  {/*Bottom Sheet inner View*/}
                  <View style={{ flex: 0.4, backgroundColor: "white" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          padding: 20,
                          fontSize: 20,
                        }}
                      >
                        Share Using
                      </Text>
                      <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text>cbbdbbd</Text>
                      </View>
                      <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text>hihi</Text>
                      </View>
                    </View>
                  </View>
                </BottomSheet>
              </View>
            )}
            {viewHienthi == 2 && (
              <View
                style={{
                  backgroundColor: "#444444",
                  width: "100%",
                  height: "70%",
                  paddingVertical: 10,
                }}
              >
                <TextInput
                  placeholder="What you think ?"
                  placeholderTextColor={"white"}
                  style={{
                    color: "white",
                    fontSize: 18,
                    marginBottom: 20,
                  }}
                  multiline
                  value={isText}
                  onChangeText={onchangerTexT}
                ></TextInput>
                <Swiper
                  style={{
                    height: "95%",
                  }}
                  loop={true}
                >
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
                            fontSize: 30,
                            fontWeight: "300",
                            color: "#00FF00",
                          }}
                        >
                          x
                        </Text>
                        <Text>
                          {index}/{selectedImages.length}
                        </Text>
                      </TouchableOpacity>
                      <Image
                        key={index}
                        source={{ uri: image }}
                        style={{ width: "100%", height: 500 }}
                      />
                    </View>
                  ))}
                </Swiper>
              </View>
            )}
            {viewHienthi == 3 && (
              <View
                style={{
                  backgroundColor: "#444444",
                  width: "100%",
                  height: "70%",
                  paddingVertical: 10,
                }}
              >
                <TextInput
                  placeholder="What you think ?"
                  placeholderTextColor={"white"}
                  style={{
                    color: "white",
                    fontSize: 18,
                    marginBottom: 20,
                  }}
                  multiline
                  value={isText}
                  onChangeText={onchangerTexT}
                ></TextInput>
                <Image
                  source={{ uri: capturedImage.uri }}
                  style={{ width: "100%", height: 500 }}
                />
              </View>
            )}

            <View
              style={{
                width: "100%",
                height: "10%",
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
                }}
                style={{}}
              >
                <Entypo name="video-camera" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={{}}>
                <Entypo name="add-user" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity style={{}}>
                <Entypo name="emoji-happy" size={25} color="orange" />
              </TouchableOpacity>
              <TouchableOpacity style={{}}>
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
        <View style={{ flex: 1 }}>
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
            {isView&&<TouchableOpacity
              onPress={HandeHienthi}
              style={{ flexDirection: "row" }}
            >
              <Ionicons name="arrow-back" size={26} color="white" />
              <Text style={{ color: "white" }}> Back</Text>
            </TouchableOpacity>}
            {!isView&&<TouchableOpacity
              onPress={__retakePicture}
              style={{ flexDirection: "row" }}
            >
              <Text style={{ color: "white" }}> Back</Text>
            </TouchableOpacity>}
            {!isView && (
              <TouchableOpacity
                onPress={SaveImage
                      }
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
                position: "relative",
                backgroundColor: "pink",
                zIndex: 1,
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "8%",
                  backgroundColor: "rgba(52, 52, 52, 0.1)",
                  justifyContent: "space-around",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity onPress={toggleCameraType}>
                  <MaterialIcons
                    name="flip-camera-android"
                    size={24}
                    color="red"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                   onPress={__handleFlashMode}
                >
                  <Entypo name="flash" size={25} color={flashMode === 'off' ? '#000' : '#fff'} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons
                    name="color-filter-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Entypo name="eye" size={26} color="black" />
                </TouchableOpacity>
              </View>
              {startCamera && (
                <Camera
                  flashMode={flashMode}
                  style={{
                    flex: 0.9,
                    width: "100%",
                  }}
                  ref={cameraRef}
                  type={type}
                ></Camera>
              )}

              <View
                style={{
                  width: "100%",
                  height: "30%",
                  backgroundColor: "rgba(52, 52, 52, 0.2)",
                  position: "absolute",
                  bottom: 0,
                  zIndex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "60%",
                    height: "20%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 15,
                  }}
                >
                  <TouchableOpacity onPress={() => handlePress("16:9")}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "white",
                        opacity: selectedOption === "16:9" ? 1 : 0.5,
                        fontWeight:
                          selectedOption === "16:9" ? "bold" : "normal",
                      }}
                    >
                      16:9
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handlePress("64mp")}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "white",
                        opacity: selectedOption === "64mp" ? 1 : 0.5,
                        fontWeight:
                          selectedOption === "64mp" ? "bold" : "normal",
                      }}
                    >
                      64mp
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handlePress("3:4")}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "white",
                        opacity: selectedOption === "3:4" ? 1 : 0.5,
                        fontWeight:
                          selectedOption === "3:4" ? "bold" : "normal",
                      }}
                    >
                      3:4
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handlePress("full")}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "white",
                        opacity: selectedOption === "full" ? 1 : 0.5,
                        fontWeight:
                          selectedOption === "full" ? "bold" : "normal",
                      }}
                    >
                      full
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={__takePicture}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 50,
                    backgroundColor: "#fff",
                  }}
                />
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
              height: "8%",
              backgroundColor: "black",
              bottom: 0,
            }}
          ></View>
        </View>
      )}
    </View>
  );
};
export default UserThink;
const styles = StyleSheet.create({});
