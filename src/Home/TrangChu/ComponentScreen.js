import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { VideoPlayer} from 'react-native-video-controls';
import DataOjs from '../../Data/DataObj';
const FullScreenVideo = () => {
       const data=DataOjs
       console.log(data);
  return (
    <View style={styles.container}>
      <VideoPlayer
        source={{ uri: data.story }}
        style={styles.video}
        controlTimeout={1000}
        disableBack
        disableVolume
        disableFullscreen
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
});

export default FullScreenVideo;