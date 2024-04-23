import { View, Text, Image,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = async ()=>{
    try {
        const { createdSessionId, signIn, signUp, setActive } =
          await startOAuthFlow();
   
        if (createdSessionId) {
          setActive({ session: createdSessionId });
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
  }

  return (
    <View style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:200
    }}>
      <Image source={require('./../../../assets/images/logo-11.png')}
            style={styles.logoImage}
      />
      <View style={{padding:20}}>
        <Text style={styles.desc}>Find places to eat near you</Text>
        <TouchableOpacity style={styles.button}
            onPress={onPress}
        >
            <Text style={{
                color:'#FFFFFF',
                textAlign:'center',
                fontSize:17
            }}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    logoImage:{
        width:200,
        height:80,
        objectFit:'contain'
    },
    desc:{
        fontSize:17,
        marginTop:15,
        textAlign:'center',
    },
    button:{
        padding:16,
        display:'felx',
        backgroundColor:'#808080',
        borderRadius:99,
        marginTop:40,

    }

})