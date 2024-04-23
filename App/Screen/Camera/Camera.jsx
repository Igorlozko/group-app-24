import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import  Button  from '../../CameraComponent/Button';
import * as MediaLibrary from 'expo-media-library';


export default function CameraScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      await MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
  
        // Convert the image data to a blob
        const response = await fetch(data.uri);
        const blob = await response.blob();
  
        // Create a FormData object
        const formData = new FormData();
        formData.append('image', blob);
  
        // Send the image data to the backend
        fetch('https://b8e0-193-1-57-3.ngrok-free.app/camera', {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then(response => {
          console.log('Upload success:', response);
        })
        .catch(error => {
          console.error('Upload failed:', error);
        });
  
      } catch(e) {
        console.log(e);
      }
    }
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text> 
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} flashMode={flash} ref={cameraRef}>
        <Text> hello</Text>
      </Camera>
      <View>
        <Button
          title={"Take a picture"}
          icon="camera" 
          onPress={takePicture}/> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
 
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
});