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
import { FontAwesome5 } from '@expo/vector-icons';
const ReviewNavigator =createNativeStackNavigator();
import Camera from '../Screen/Camera/Camera';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export function ReviewStack() {
  return (
    <ReviewNavigator.Navigator>
      <ReviewNavigator.Screen name='HomeScreen' component={Home} options={{ headerShown: false }}/>
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
<Tab.Screen
  name='ReviewStack'
  component={ReviewStack}
  options={{
    tabBarLabel:'Search',
    tabBarIcon:({ color, size, focused }) => (
      <FontAwesome5
        name={focused ? "search-location" : "search"} 
        size={size} 
        color={'#275ecc'} 
      />
    )
  }} 
/>
<Tab.Screen name='favorite' 
  component={FavoriteScreen}
  options={{
    tabBarLabel:'Favorite',
    tabBarIcon:({focused, size})=>(
      <MaterialIcons name={focused ? "favorite" : "favorite-border"} size={size} color='red' />
    )
  }}
/>
<Tab.Screen
  name='profile'
  component={ProfileScreen}
  options={{
    tabBarLabel:'Account',
    tabBarIcon:({ size, focused }) => (
      <FontAwesome name={focused ? "user" : "user-o"} size={size} color='#1f5bcc' />
    )
  }}
/>
<Tab.Screen
 name='Camera'
 component={Camera}
 options={{
  tabBarLabel:'Camera',
  tabBarIcon:({ size, focused }) => (
    <FontAwesome name={focused ? "camera" : "camera-retro"} size={size} color='#1f5bcc' />
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