import React from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function SearchBar({searchedLocation}) {

    

  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails={true}
        enablePoweredByContainer={false}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          searchedLocation(details?.geometry?.location)
        }}
        query={{
          key: "AIzaSyDBkM90GfqI9hidF7AgsDOjqLgrhXTKboU",
          language: 'en',
        }}
      />
    </View>
  );
}
