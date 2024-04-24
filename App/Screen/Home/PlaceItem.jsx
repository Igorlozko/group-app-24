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
import React, { useEffect, useState } from "react";
import GlobalApi from "../../Utils/GlobalApi";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {Ionicons} from '@expo/vector-icons'
import SQLite from 'react-native-sqlite-storage';
import { addons } from "react-native";
import * as Notifications from "expo-notifications";

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
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();
  const PLACE_PHOTO_BASE_URL =
    "https://maps.googleapis.com/maps/api/place/photo";

    useEffect(() => {
      // Check and request notification permissions when the component mounts
      checkNotificationPermissions();
    }, []);
  
    const checkNotificationPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        console.log("Notification permissions not granted");
        await Notifications.requestPermissionsAsync();
      } else {
        console.log("Notification permissions granted");
      }
    };
    const handleAddToFavourites = () => {
      console.log("Toggling favorites");
      setIsFavorite(!isFavorite);
    
      if (!isFavorite) {
   
        console.log("Added to favorites");
        sendNotification("Added to Favorites");
        sendFavoriteToBackend(place); // Send place data to backend
      } else {
       
        console.log("Removed from favorites");
        sendNotification("Removed from Favorites");
      }
    };
    
    const sendFavoriteToBackend = async (place) => {
      try {
        await fetch('https://b8e0-193-1-57-3.ngrok-free.app/favorite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(place),
        });
        console.log('Place data sent to backend successfully');
      } catch (error) {
        console.error('Error sending place data to backend:', error);
      }
    };
    
    const sendNotification = async (notificationText) => {
      console.log("Sending notification");
      
      const notificationContent = {
        title: notificationText,
        body: 'This place has been ' + notificationText.toLowerCase() + '!',
      };
    
      try {
        // Schedule the notification
        await Notifications.scheduleNotificationAsync({
          content: notificationContent,
          trigger: null,
        });
    
        // Present the notification immediately
        await Notifications.presentNotificationAsync(notificationContent);
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    };

  return (
    <View
    style={styles.container}
    >
      <Pressable style={styles.addToFavourites} onPress={handleAddToFavourites}>
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"} // Change icon based on isFavorite state
          size={24}
          color={isFavorite ? "red" : "black"} // Change color based on isFavorite state
        />
        <Text style={styles.addToFavouritesText}>
          {isFavorite ? "Added to favorites" : "Add to favorites"}
        </Text>
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
  container: {
    backgroundColor: "#ffffff",
    margin: 5,
    borderRadius: 10,
    width: Dimensions.get("screen").width * 0.9,
  },
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

