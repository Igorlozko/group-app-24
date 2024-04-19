import { View, Text, Image } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-react';

export default function ProfileScreen() {
  const { user } = useUser();

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 50 }}>
      {user?.imageUrl && (
        <Image
          source={{ uri: user.imageUrl }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      )}
      <Text style={{ marginTop: 15, fontWeight: 'bold', fontSize: 20 }}>{user?.fullName}</Text>
    </View>
  );
}