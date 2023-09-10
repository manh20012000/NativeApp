
import { StyleSheet, Text, View, FlatList, KeyboardAvoidingView, Keyboard, Button, TouchableOpacity, Image, TextInput,StatusBar} from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react';
import DataOjs from '../../../Data/DataObj'
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Bubble, GiftedChat, Send, InputToolbar } from 'react-native-gifted-chat';

const PesionChat = ({ route, navigation }) => {
    const [data, setData] = useState(DataOjs);
    // console.log(JSON.stringify('bddb'+route.params.id))
    const dataRoute = route.params
    const [textIcon, setText] = useState('');
    // mangr tin nhăn 
    const [messages, setMessages] = useState([])
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'làm người iu mik nha 😋',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: route.params.avata,
                },
            },
        ])
    }, [])
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
            setVisible(true),
        )
    }, [])
    //change buutobsen
    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View style={{
                    height: 37,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    marginRight: 5,
                    marginBottom: 5,
                }}
                >
                    <Ionicons name="send" size={24} color="blue" />
                </View>
            </Send>
        )
    }
    const renderBubble = (props) => {
        return (
            <Bubble {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: 'blue'
                    }
                }}
                textStyle={{
                    right: {
                        color: 'white'
                    }
                }}
            >
            </Bubble>
        )
    }
    // tạo nút nhấn với cái icon và ảnh hoccj hiện thị vưới textinput
    const [isVisible, setVisible] = useState(true);
    // 
    // thuch hien de xem bạn da nhap text hay chưa
    const [inputText, setInputText] = useState('');
    const handleInputTextChanged = (text) => {
        setInputText(text);
        if (text === '') {
            setVisible(true)
        }
    };
    // hien thi bàn phim len hay chuă
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, backgroundColor: 'black', }}>
             <StatusBar
                backgroundColor="#CCCCCC"
                animated={true}
             />
            <View style={styles.head}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.6 }}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Mess')
                    }}>
                        <Ionicons name="arrow-back-sharp" size={28} color="#6600FF" />
                        </TouchableOpacity>
                    <TouchableOpacity style={{ position: 'relative' }}>
                        <Image source={{ uri: route.params.avata}}
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: 44,
                                marginHorizontal: 6,
                            }} >
                        </Image >
                        <Text style={{
                            color: '#00FF00', fontSize: 64,
                            position: 'absolute',
                            right: 0,
                            top:-35,
                        }}>{route.params.trangthai}</Text>
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 18,
                        color: 'white',
                        fontWeight: '900'
                    }}>
                        {route.params.name}
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flex: 0.5,
                  
                }}>
                    <TouchableOpacity>
                        <Ionicons name="call" size={26} color="#6600FF" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={25} color="#6600FF" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="exclamationcircle" size={25} color="#6600FF" />
                    </TouchableOpacity>

                </View>
            </View>
            <GiftedChat
            style={{backgroundColor:'pink'}}

                messages={messages}
                onSend={newMessages => onSend(newMessages, setVisible(!isVisible))}
                user={{
                    _id: 1,
                }}
                onInputTextChanged={text => this.setCustomText('van nam')}
                renderInputToolbar={(props) => !isVisible ? <InputToolbar {...props} /> : null}
                renderBubble={renderBubble}
                alwaysShowSend
                renderSend={renderSend}
                scrollToBottom
                isLoadingEarlier
                // parsePatterns={(linkStyle) => [
                //     { type: 'phone', style: linkStyle, onPress: this.onPressPhoneNumber },
                //     { pattern: /#(\w+)/, style: { ...linkStyle, styles.hashtag }, onPress: this.onPressHashtag },
                //   ]}
                // />
                textInputStyle={{
                    borderRadius: 22,
                    borderWidth: 1,
                    marginHorizontal: 18,
                    marginTop: 3,
                    paddingHorizontal: 16,
                }}

                onInputTextChanged={handleInputTextChanged}
            />
            {isVisible &&
                <View style={{
                    booton: 0,
                    flex: 0.09, flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity>
                        <Image
                            source={require('D:/laptrinhMobileClass/NativeAppp/src/Image/Shot.png')}
                            style={{ width: 33, height: 33 }}
                        >
                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="camera" size={24} color="#0066FF" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="microphone" size={24} color="#0066FF" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="image-sharp" size={24} color="#0066FF" />
                    </TouchableOpacity>
                    <View style={{
                        borderBlockColor: '#0066FF', height: 35, width: 140, borderRadius: 4, borderRadius: 13, backgroundColor: '#888888',
                        flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2, alignItems: "center"
                    }}>
                        <TouchableOpacity onPress={
                            () => {
                                setVisible(!isVisible)
                            }
                        }>
                            <Text style={{ fontWeight: '200', color: '#FFFFFF' }}>Message</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="emoticon-happy-outline" size={24} color="#0066FF" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <FontAwesome5 name="hand-scissors" size={24} color="#FFCC66" />
                    </TouchableOpacity>
                </View>
            }

        </KeyboardAvoidingView>
    )

}
export default PesionChat;
const styles = StyleSheet.create({
    head: {
        flex: 0.09,
        flexDirection: 'row'
    },
    inputExpanded: {
        flex: 1,
    },

})