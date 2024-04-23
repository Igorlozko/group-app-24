import{Camera, CameraType} from 'expo-camera'
import * as MediaLibrary from 'expo-media-library';

export default function CameraScreen(){
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
const [image, setImage] = useState(null);
const [type , setType] = useState(Camera.Constants.Type.back);
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