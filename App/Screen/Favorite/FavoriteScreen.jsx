import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList } from 'react-native';
import { Card } from 'react-native-elements';

const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('https://b8e0-193-1-57-3.ngrok-free.app/favorites')
      .then(response => response.json())
      .then(data => setFavorites(data))
      .catch(error => console.error('Error while fetching favorite places:', error));
  }, []);

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Your Favourites...</Text>
      <FlatList
        data={favorites}
        keyExtractor={item => item.placeId}
        renderItem={({ item }) => (
          <Card>
            <Card.Title>{item.name}</Card.Title>
            <Card.Divider/>
            <Text>{item.description}</Text>
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

export default FavoriteScreen;