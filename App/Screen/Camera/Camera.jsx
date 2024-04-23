import{Camera, CameraType, useRef} from 'expo-camera'
import * as MediaLibrary from 'expo-media-library';

export default function CameraScreen(){
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
const [image, setImage] = useState(null);
const [type , setType] = useState(Camera.Constants.Type.back);
const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
const cameraRef = useRef(null);
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