import React, { useContext } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Image, StyleSheet, View } from 'react-native';
import { UserLocationContext } from '../../Context/UserLocationContext';
import Markers from './Markers';

export default function AppMapView({placeList}) {

    const {location,setLocation} = useContext(UserLocationContext);

  return location?.latitude&&( // only display this veiw of got the user location 
    <View>
      <MapView style={styles.map}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      region={{
        latitude:location?.latitude,
        longitude:location?.longitude,
        latitudeDelta:0.0422,
        longitudeDelta:0.0421
      }}
      >
        <Marker
            coordinate={{
                latitude:location?.latitude,
                longitude:location?.longitude
            }}
        >
            <Image source={require('./../../../assets/images/markermap1.png')}
                style={{width:40,height:40}}
            />
        </Marker>
        {placeList&&placeList.map((item,index)=>(
            <Markers key={index}
            index = {index}
                place={item}
            />
        ))}
    </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });