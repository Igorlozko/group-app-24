// Markers.js
import React, { useContext } from 'react';
import { Image } from 'react-native';
import { Marker } from 'react-native-maps';
import { SelectedMarkerContext } from '../../Context/SelectedMarkerContext';

export default function Markers({index, place }) {

  const { selectedMarker, setSelectedMarker} = useContext(SelectedMarkerContext);
  return (
    <Marker
      coordinate={{
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng
      }}
      onPress={()=>setSelectedMarker(index)}
    />
  );
}
