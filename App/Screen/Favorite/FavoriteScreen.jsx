import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList } from 'react-native';
import { Card } from 'react-native-elements';

const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFavorites = () => {
    fetch('https://b8e0-193-1-57-3.ngrok-free.app/favorites')
      .then(response => response.json())
      .then(data => setFavorites(data))
      .catch(error => console.error('Error while fetching favorite places:', error))
      .finally(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFavorites();
  };

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 35, fontWeight: 'bold', marginTop:26,marginBottom: 15, paddingLeft: 15 }}>Your Favourites...</Text>
      <FlatList
        data={favorites.slice().reverse()}  // Reverse the list
        keyExtractor={item => item.placeId}
        renderItem={({ item }) => (
          <Card containerStyle={{borderRadius: 30}}>
            <Card.Title>{item.name}</Card.Title>
            <Card.Divider/>
            {item.imageUrl && <Card.Image source={{ uri: item.imageUrl }} />}  
            <Text>{item.description}</Text>
          </Card>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};

export default FavoriteScreen;