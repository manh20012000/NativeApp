import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar,AppState } from 'react-native'
import { React, useState, useEffect, useRef,useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import VideoData from '../../Data/VideoData.js';
import VideoItem from './VideoItem.js';
import { createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
 const bootonTba=createBottomTabNavigator()
const VideoTikTok = () => {
        const bottomTabHight=useBottomTabBarHeight()
       
       const [data, setData] = useState(VideoData);
       const [dataw,setDtATAA]=useState([])
  //      const [action, setAction] = useState(0);

  // useEffect(() => {
  //   AppState.addEventListener('change', handleAppStateChange);

  //   return () => {
  //     AppState.removeEventListener('change', handleAppStateChange);
  //   };
  // }, []);

  // const handleAppStateChange = (nextAppState) => {
  //   if (nextAppState === 'inactive' || nextAppState === 'background') {
  //     setAction(false); // Dừng video khi ứng dụng không hoạt động hoặc chạy ở chế độ nền
  //   } else {
  //     setAction(true); // Tiếp tục chơi video khi ứng dụng quay trở lại hoạt động
  //   }
  // };
  const [action, setAction] = useState(false);

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
        renderItem={({item,index})=>{
          return(
          <VideoItem item={item} 
                     action={action===index}
                     setData={setData}
                      data={data}
          />
          )
          
        }}
        onScroll={e=>{
           const index=Math.round(e.nativeEvent.contentOffset.y/(800-bottomTabHight))
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
    paddingTop:30,
  },
})
// {item.story && item.story.map((videoId,id) => (
//   <Video
//    key={id}
//     source={{ uri:'https://www.f5.com/content/dam/f5-labs-v2/media-files/video/Happy%20Cow.mp4'}}
//     style={{
//       width:600,
//       height:600,
//       backgroundColor:'white'
//     }}
//     ResizeMode={'cover'}
//     isLooping
//     onPlaybackStatusUpdate={status => setStatus(() => status)}
//   >
//   </Video>
// ))