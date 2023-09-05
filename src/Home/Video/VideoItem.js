import { StyleSheet,AppState, Text, Image, View, TouchableOpacity, FlatList, StatusBar, Animated, Easing } from 'react-native'
import { React, useState, useEffect, useRef, useCallback } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
const VideoItem = ({item,action}) => {
 
  const {id,channelName, uri, caption, musicName, likes, comments, avatarUri} =item 
  const discAnimatedValue = useRef(new Animated.Value(0)).current;
  const AnimatedMusicNodeValue1= useRef(new Animated.Value(0)).current;
  const AnimatedMusicNodeValue2= useRef(new Animated.Value(0)).current;
  
  const discAnimation = {
    transform: [
      {
        rotate: discAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  const MusicNodeAnimation1 = {
    transform: [
      {
        translateX: AnimatedMusicNodeValue1.interpolate({
          inputRange: [0, 1],
          outputRange: [8,-16],
        }),
      },
      {
        translateY: AnimatedMusicNodeValue1.interpolate({
          inputRange: [0, 1],
          outputRange: [0,-32],
        }),
      },{
        rotate: AnimatedMusicNodeValue1.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
    opacity:AnimatedMusicNodeValue1.interpolate({
      inputRange: [0,0.8,1],
      outputRange: [0,1,0],
    })
  };
  const MusicNodeAnimation2= {
    transform: [
      {
        translateX: AnimatedMusicNodeValue2.interpolate({
          inputRange: [0, 1],
          outputRange: [8,-16],
        }),
      },
      {
        translateY: AnimatedMusicNodeValue2.interpolate({
          inputRange: [0, 1],
          outputRange: [0,-32],
        }),
      },{
        rotate: AnimatedMusicNodeValue2.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-45deg'],
        }),
      },
    ],
    opacity:AnimatedMusicNodeValue2.interpolate({
      inputRange: [0,0.8,1],
      outputRange: [0,1,0],
    })
  };
   useEffect(()=>{
      if(action){ 
        Animated.loop(
          Animated.timing(discAnimatedValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
       ).start();
       Animated.loop(  
          Animated.sequence([
       Animated.timing(AnimatedMusicNodeValue1, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(AnimatedMusicNodeValue2, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
      ,])
      ).start()
      }else{
        Animated.loop(
          Animated.timing(discAnimatedValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
       ).stop();
       Animated.loop(  
          Animated.sequence([
       Animated.timing(AnimatedMusicNodeValue1, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(AnimatedMusicNodeValue2, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
      ,])
      ).stop()
      }
      
   },
  //  [discAnimatedValue,AnimatedMusicNodeValue1,AnimatedMusicNodeValue2]
   )
// setlile cho tym 
const [nblike, setnblike] = useState(item.likes)
const [isLiked, setIsLiked] = useState(false);
const handlePress = () => {
setIsLiked(!isLiked);
if (nblike === item.likes) {
  setnblike(nblike + 1);
} else {
  setnblike(nblike - 1);
}
};
// trang thai của của vide
 

  return (

    <View style={styles.contain}>
      <VideoPlayer
        videoProps={{
          shouldPlay:action,
          resizeMode:'cover',
          isLooping: true, 
          // resizeMode: ResizeMode.CONTAIN,
          source: { uri:uri }

        }}
        slider={{
          visible: true,
        }}
        fullscreen={{
          visible: false,
        }}
        timeVisible={true}
           style={{height:760}}
      >
      </VideoPlayer>

      <View style={styles.BottomSelect}>
        <View style={styles.BootomLeftSelection}>
          <Text style={styles.chanelName}> {channelName}</Text>
          <Text style={styles.caption}>{caption}</Text>
        </View>
        <View style={styles.musicContainer}>
          <Image
            style={styles.musicIcon}
            source={require('D:/laptrinhMobileClass/NativeAppp/src/Image/music-note.png')}
          />
          <Text style={styles.musicName}>{musicName}</Text>
        </View>
        <View style={styles.bottomRightSelection}>
          <Animated.Image
            style={[styles.floatMusicNote,MusicNodeAnimation1]}
            source={require('D:/laptrinhMobileClass/NativeAppp/src/Image/music-note.png')}
          />
          <Animated.Image
            style={styles.floatMusicNote}
            source={require('D:/laptrinhMobileClass/NativeAppp/src/Image/music-note.png')}
          />
          <Animated.View style={[styles.MusicDisc,discAnimation]}>
            <MaterialCommunityIcons name="music-circle" size={40} color="white" />
          </Animated.View>
        </View>
      </View>
      <View style={styles.verticalBar}>
        <View style={[styles.verticalItem, styles.avatarContainer]}>
          <Image
            style={styles.avatar}
            source={{ uri: avatarUri }}
          ></Image>
          <View style={styles.buttonFlow}>
            <Ionicons name="add-circle" size={24} color="red" />

          </View>

        </View>
        <View style={styles.verticalItem}>
          <TouchableOpacity
           onPress={handlePress}>
          
          <AntDesign name="heart" size={30} color={isLiked ? 'red' : 'white'} />
          </TouchableOpacity>
      
          <Text style={styles.verticalBarText}>{nblike}</Text>
        </View>
        <View style={styles.verticalItem}>
          <FontAwesome5 name="comment" size={30} color="white" />
          <Text style={styles.verticalBarText}>{comments}</Text>
        </View>
        <View style={styles.verticalItem}>
          <FontAwesome name="share" size={30} color="white" />
          <Text style={styles.verticalBarText}>Share</Text>
        </View>
      </View>
    </View>
  )
}
export default VideoItem;
const styles = StyleSheet.create({
  contain: {
    width:'100%',
    backgroundColor: 'red',
    position: 'relative',
  }, 
  BottomSelect: {
    position: 'absolute',
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  BottomSelect: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    height:"100%",


  },
  BootomLeftSelection: {
    
    flex: 4,
    bottom:35,
    position:'absolute',
     left:5

  },
  bottomRightSelection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  chanelName: {
    color: 'white',
    fontWeight: 'bold',
  },
  caption: {
    color: 'white',
    marginVertical: 8,
  },
  musicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position:'absolute',
    bottom:20,

  },
  musicIcon: {
    width: 12,
    height: 12,
    marginRight: -16,
  },
  musicName: {
    color: 'white',
    position:'absolute',
    marginLeft:40,
  

  },
  verticalBar: {
    position: 'absolute',
    right: 8,
    bottom: 72,


  },
  verticalItem: {
    marginBottom: 24,
    alignItems: 'center',
  },
  verticalBarText: {
    color: 'white',
    marginTop: 4,
  },
  avatarContainer: {
    marginBottom: 48,

  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  buttonFlow: {
    position: 'absolute',
    bottom: -8,
  },
  floatMusicNote:{
       position:'absolute',
       bottom:25,
       right:40,
      width:16,
      height:16,
  },MusicDisc:{
    bottom:15,
  }
}
)
// const {id,channelName, uri, caption, musicName, likes, comments, avatarUri} =item 
//   const discAnimatedValue = useRef(new Animated.Value(0)).current;
//   const AnimatedMusicNodeValue1= useRef(new Animated.Value(0)).current;
//   const AnimatedMusicNodeValue2= useRef(new Animated.Value(0)).current;
  
//   const discAnimation = {
//     transform: [
//       {
//         rotate: discAnimatedValue.interpolate({
//           inputRange: [0, 1],
//           outputRange: ['0deg', '360deg'],
//         }),
//       },
//     ],
//   };

//   const MusicNodeAnimation1 = {
//     transform: [
//       {
//         translateX: AnimatedMusicNodeValue1.interpolate({
//           inputRange: [0, 1],
//           outputRange: [8,-16],
//         }),
//       },
//       {
//         translateY: AnimatedMusicNodeValue1.interpolate({
//           inputRange: [0, 1],
//           outputRange: [0,-32],
//         }),
//       },{
//         rotate: AnimatedMusicNodeValue1.interpolate({
//           inputRange: [0, 1],
//           outputRange: ['0deg', '45deg'],
//         }),
//       },
//     ],
//     opacity:AnimatedMusicNodeValue1.interpolate({
//       inputRange: [0,0.8,1],
//       outputRange: [0,1,0],
//     })
//   };
//   const MusicNodeAnimation2= {
//     transform: [
//       {
//         translateX: AnimatedMusicNodeValue2.interpolate({
//           inputRange: [0, 1],
//           outputRange: [8,-16],
//         }),
//       },
//       {
//         translateY: AnimatedMusicNodeValue2.interpolate({
//           inputRange: [0, 1],
//           outputRange: [0,-32],
//         }),
//       },{
//         rotate: AnimatedMusicNodeValue2.interpolate({
//           inputRange: [0, 1],
//           outputRange: ['0deg', '-45deg'],
//         }),
//       },
//     ],
//     opacity:AnimatedMusicNodeValue2.interpolate({
//       inputRange: [0,0.8,1],
//       outputRange: [0,1,0],
//     })
//   };

//   // tranhs lang phi tai nguyen 

//   // const disPaulVideo=useRef();
//   // const disPaulMusic=useRef();


//   const trigerAnimated=useCallback(()=>{
//     // disPaulVideo.current=  Animated.loop(
//     //   Animated.timing(discAnimatedValue, {
//     //     toValue: 1,
//     //     duration: 2000,
//     //     easing: Easing.linear,
//     //     useNativeDriver: true,

//     //   }),
//     // )
//     // disPaulVideo.current.start();

//     // disPaulMusic.current= Animated.loop(
      
//     //   Animated.sequence([
//     //    Animated.timing(AnimatedMusicNodeValue1, {
//     //     toValue: 1,
//     //     duration: 2000,
//     //     easing: Easing.linear,
//     //     useNativeDriver: true,
//     //   }),
//     //   Animated.timing(AnimatedMusicNodeValue2, {
//     //     toValue: 1,
//     //     duration: 2000,
//     //     easing: Easing.linear,
//     //     useNativeDriver: true,
//     //   })
//     //   ,])
//     // )
//     // disPaulMusic.current.start();
    
//   },[discAnimatedValue,AnimatedMusicNodeValue1,AnimatedMusicNodeValue2])
//   useEffect(() => {
//     if(action){
//       trigerAnimated()
//     }else{
//       // disPaulVideo.current?.stop()
//       //  disPaulMusic.current?.stop()
//         discAnimatedValue.setValue(0)
//         AnimatedMusicNodeValue1.setValue(0)
//         AnimatedMusicNodeValue2.setValue(0)
//     }
//   }, [discAnimatedValue,AnimatedMusicNodeValue1,AnimatedMusicNodeValue2,
//     action,trigerAnimated
//   ])
// // setlile cho tym 
// const [nblike, setnblike] = useState(item.likes)
// const [isLiked, setIsLiked] = useState(false);
// const handlePress = () => {
// setIsLiked(!isLiked);
// if (nblike === item.likes) {
//   setnblike(nblike + 1);
// } else {
//   setnblike(nblike - 1);
// }
// };
// // trang thai của của vide
 