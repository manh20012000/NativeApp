import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar, AppState } from 'react-native'
import { React, useState, useEffect, useRef, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import VideoData from '../../Data/VideoData.js';
import VideoItem from './VideoItem.js';
import { firestore } from '../../../Confige.js';
import { collection, getDocs } from 'firebase/firestore';
import { createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
const bootonTba = createBottomTabNavigator()
const VideoTikTok = () => {
  
  const bottomTabHight = useBottomTabBarHeight()
  const [data, setData] = useState(VideoData);
 
  const [action, setAction] = useState(true);

  useFocusEffect(
    useCallback(() => {
      // Hành động khi màn hình được focus
      setAction(true);
      return () => {
        // Hành động khi màn hình mất focus
        setAction(false);
      };
    }, [])
  );

  return (
    <View style={styles.contain}>
      <FlatList
        data={data}
        pagingEnabled
        keyExtractor={(item, index) =>index.toString()}
        renderItem={({ item, index }) => {
          return (
            <VideoItem item={item}
              action={action === index}
              setData={setData}
              data={data}
            />
          )
        }}
        onScroll={e => {
          const index = Math.round(e.nativeEvent.contentOffset.y / (810 - bottomTabHight))
          setAction(index)
        }}
      />
    </View>
  )
}
export default VideoTikTok;
const styles = StyleSheet.create({
  contain: {
    flex: 1,
  },
})
