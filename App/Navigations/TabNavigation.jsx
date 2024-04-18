import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/Home/HomeScreen';
import FavoriteScreen from '../Screen/Favorite/FavoriteScreen';
import ProfileScreen from '../Screen/Profile/ProfileScreen';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Review from '../Screen/Reviews/Review';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const ReviewNavigator =createNativeStackNavigator();

export function ReviewStack() {
  return (
    <ReviewNavigator.Navigator>
      <ReviewNavigator.Screen name='HomeScreen' component={HomeScreen}options={{ headerShown: false }}/>
      <ReviewNavigator.Screen name='Review' component={Review} />
    </ReviewNavigator.Navigator>
  )
}
const Tab = createBottomTabNavigator();
 function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown:false,
    }}>
        <Tab.Screen name='ReviewStack' 
          component={ReviewStack}
          options={{
            tabBarLabel:'Search',
            tabBarIcon:({color,size})=>(
              <AntDesign name="search1" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen name='favorite' 
          component={FavoriteScreen}
          options={{
            tabBarLabel:'Favorite',
            tabBarIcon:({color,size})=>(
              <MaterialIcons name="favorite-border" size={size} color={color} />
            )
          }}
        />
        <Tab.Screen name='profile' 
          component={ProfileScreen}
          options={{
            tabBarLabel:'Account',
            tabBarIcon:({color,size})=>(
              <FontAwesome name="user-o" size={size} color={color} />
            )
          }}
        />
    </Tab.Navigator>
  )
}

export default function Navigation() {
  return (

      <TabNavigation/>

  )
}