import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';

export default function Header() {
  const {user} = useUser();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={{uri:user?.imageUrl}}
          style={{
            width:35, 
            height:35, 
            borderRadius:99, 
            marginRight: 10, 
            borderColor: '#ffffff', 
            borderWidth: 2 
          }}
        />
        <Image source ={require('./../../../assets/images/logo111.png')}
          style={{width:45,height:45,objectFit:'contain'}}
        />
        <MaterialCommunityIcons name="filter" size={30} color="black" />
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({

    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    }

})