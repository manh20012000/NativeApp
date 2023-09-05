import React, { useState, useRef, useEffect } from "react";
import { Button, Image, View, Platform, StyleSheet, Video, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import NewRecode from './NewRecode';
import { Camera, CameraType } from 'expo-camera'
import Swiper from 'react-native-swiper';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const RecodViedeo = () => {
  // set trạng thaí của nó khi truy cập

  const [trangThai, setTrangThai] = useState(1)
  const [thanhBar, setThanhBar] = useState(1)
  const [image, setImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const pickImages = async () => {
    setTrangThai(2)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsMultipleSelection: true,

    });
    if (!result.canceled) {
      setSelectedImages(result.assets.map(asset => asset.uri));
    }
  };
  // setCamera 
  const cameraRef = useRef();
  const [startCamera, setStartCamera] = useState(true)
  const StartCamera = async () => {
    setTrangThai(1)
    const { status } = await Camera.requestCameraPermissionsAsync()
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }
  const [type, setType] = useState(CameraType.front);
  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));

    
  }
  // take phôto 
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        backgroundColor: 'pink',
        position: 'relative',
      }}>
      {trangThai == 1 &&
        <View style={{
          width: '100%', position: 'absolute', top: 0,
          marginTop: 10,
          flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'
        }}>
          <TouchableOpacity
            onPress={toggleCameraType}
            style={{

            }}>
            <AntDesign name="filter" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleCameraType}
          >
            <AntDesign name="sync" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleCameraType}
            style={{

            }}>
            <Entypo name="flashlight" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleCameraType}
            style={{
            }}>
            <Entypo name="flashlight" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleCameraType}
            style={{
            }}>
            <Ionicons name="people" size={24} color="black" />
          </TouchableOpacity>
        </View>

      }
      {trangThai ==1 && startCamera &&
        <Camera
          type={type}
          style={{ flex: 0.95, width: "100%", marginTop: 50 }}
          ref={(cameraRef) => {
            camera = cameraRef
          }}
        >
        </Camera>
      }
      {trangThai == 1 &&
        <View style={{
          justifyContent: 'center', width: '100%', height: '20%', backgroundColor: 'black'
          , bottom: 0,
          position: 'absolute'

        }}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style={{ flex: 0.33, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity style={{ justifyContent: 'space-between' }}>
                <AntDesign name="frown" size={26} color="white" />
                <Text style={{ fontSize: 13, color: 'white', marginTop: 3 }}>Fitter</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.33, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={StartCamera}
                style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 80, height: 80, backgroundColor: 'white', borderRadius: 80, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ width: 70, height: 70, backgroundColor: 'black', borderRadius: 70, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 60, height: 60, backgroundColor: 'white', borderRadius: 60 }}></View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.33, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={pickImages}
                style={{ justifyContent: 'center', alignItems: 'center' }}>
                <AntDesign name="frown" size={26} color="white" />
                <Text style={{ fontSize: 13, color: 'white', marginTop: 3 }}>Thư viện</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
      {trangThai == 2 &&
        <Swiper style={{

          position: 'relative',
          height: 450,
        }}
          loop={true}
        >
          {selectedImages.map((image, index) => (
            <View key={index}
              style={{}}
            >
              <Image key={index} source={{ uri: image }}
                style={{ width: 400, height: 400 }} />

            </View>
          ))}
        </Swiper>
      }
      {trangThai == 2 && <View style={{
        justifyContent: 'center', width: '100%', height: '15%', backgroundColor: 'black'
        , bottom: 0,
        justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center',
      }}>
        <TouchableOpacity
          onPress={() => {
            setThanhBar(1)
            setTrangThai(1)
          }}
          style={{
          }}>
          <AntDesign name="sync" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleCameraType}
        >
          <AntDesign name="sync" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleCameraType}
          style={{



          }}>
          <AntDesign name="sync" size={24} color="white" />
        </TouchableOpacity>

      </View>
      }
    </View>
  )
}
export default RecodViedeo
const styles = StyleSheet.create({

}); 