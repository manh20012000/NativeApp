import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, Video, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
const NewRecode = () => {
    const [image, setImage] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const pickImages = async () => {
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
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick Images" onPress={pickImages} />
            {selectedImages.map((image, index) => (
                <Image key={index} source={{ uri: image }} style={{ width: 200, height: 200 }} />
            ))}
            <View style={{
                justifyContent: 'center', width: '100%', height: '15%', backgroundColor: 'black'
                , position: 'absolute', bottom: 0
            }}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View style={{ flex: 0.33, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ justifyContent: 'space-between' }}>
                            <AntDesign name="frown" size={26} color="white" />
                            <Text style={{ fontSize: 13, color: 'white', marginTop: 3 }}>Fitter</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 0.33, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: 80, height: 80, backgroundColor: 'white', borderRadius: 80, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: 70, height: 70, backgroundColor: 'black', borderRadius: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ width: 60, height: 60, backgroundColor: 'white', borderRadius: 60 }}></View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.33, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <AntDesign name="frown" size={26} color="white" />
                            <Text style={{ fontSize: 13, color: 'white', marginTop: 3 }}>Thư viện</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default NewRecode;
const styles = StyleSheet.create({

}); 