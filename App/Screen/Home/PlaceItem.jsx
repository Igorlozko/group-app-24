import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Linking,
} from "react-native";
import React from "react";
import GlobalApi from "../../Utils/GlobalApi";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {Ionicons} from '@expo/vector-icons'
import SQLite from 'react-native-sqlite-storage';
import { addons } from "react-native";

// Create the favorites table if it doesn't exist

const onDirectionClick = (place) => {
  const { lat, lng, name } = place.geometry.location;
  const url = Platform.select({
    ios: `http://maps.apple.com/?q=${name}&ll=${lat},${lng}`,
    android: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
  });

  Linking.openURL(url).catch((err) => console.error("Error opening URL: ", err));
};

export default function PlaceItem({ place }) {
  const navigation = useNavigation();
  const PLACE_PHOTO_BASE_URL =
    "https://maps.googleapis.com/maps/api/place/photo";

  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        margin: 5,
        borderRadius: 10,
        width: Dimensions.get("screen").width * 0.9,
      }}
    >
      <Pressable style={styles.addToFavourites}
      
      >
        <Ionicons name="heart-outline" size={24} color="black"/>
        <Text style={styles.addToFavouritesText}>Add to favourites</Text>
      </Pressable>
      <Image
        source={
          place.photos && place.photos.length > 0
            ? {
                uri: `${PLACE_PHOTO_BASE_URL}?maxheight=800&maxwidth=1200&photoreference=${place.photos[0].photo_reference}&key=${GlobalApi.API_KEY}`,
              }
            : require("./../../../assets/images/logo-11.png")
        }
        style={{
          width: "100%",
          height: 160,
          borderRadius: 10,
        }}
      />
      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 23 }}>{place.name}</Text>
        <Text style={{ marginTop: 5, color: "#5A5A5A" }}>
          {place.plus_code.compound_code}
        </Text>
        <View>
          <Text style={{ marginTop: 5, color: "#808080" }}>
            Rating: {place.rating}
          </Text>
        </View>
        <Pressable
          onPress={() => onDirectionClick(place)}
          style={styles.directionsContainer}
        >
          <Text style={[styles.directionsText, { color: "white" }]}>
            Get directions to your restaurant:
          </Text>
          <FontAwesome name="location-arrow" size={25} color="white" />
        </Pressable>
        <View>
        <Button
  title="Reviews"
  onPress={() =>
    navigation.navigate('ReviewStack', { 
      screen: 'Review',
      params: { imageUrl: place.photos && place.photos.length > 0 ? `${PLACE_PHOTO_BASE_URL}?maxheight=800&maxwidth=1200&photoreference=${place.photos[0].photo_reference}&key=${GlobalApi.API_KEY}` : null,
      placeId: place.place_id
    }
    })
  }
/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  directionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 6,
    paddingHorizontal: 14,
    backgroundColor: "green",
    marginTop: 10,
  },
  directionsText: {
    marginRight: 10,
  },
  addToFavourites: {
    position: 'relative',
    right: 10,
    left:100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  addToFavouritesText: {
    marginLeft: 5,
  },
});
