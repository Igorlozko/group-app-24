import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import{Camera, CameraType} from 'expo-camera'
import * as MediaLibrary from 'expo-media-library';

export default function CameraScreen(){
const [hasCameraPermission, setHasCameraPermission] = useState(null);
const [image, setImage] = useState(null);
const [type , setType] = useState(Camera.Constants.Type.back);
const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
const cameraRef = useRef(null);

useEffect(()=>{
(async ()=>{
  MediaLibrary.requestPermissionsAsync();
  const cameraStatus = await Camera.requestPermissionsAsync();
  setHasCameraPermission(cameraStatus.status === 'granted');
})();
}, []);

  return(
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  }
});