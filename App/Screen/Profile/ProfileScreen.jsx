import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Card } from 'react-native-elements';

const styles = StyleSheet.create({
  card: {
    width: '90%',
    margin: 20, 
    padding: 10, 
    borderRadius: 10, 
  },
});

class ReviewCard extends React.PureComponent {
  render() {
    const { name, description } = this.props.review;
    return (
      <Card containerStyle={styles.card}>
        <Card.Title>{name}</Card.Title>
        <Card.Divider/>
        <Text>{description}</Text>
      </Card>
    );
  }
}

export default function ProfileScreen() {
  const { user } = useUser();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('https://9c2d-79-140-211-73.ngrok-free.app/allreviews')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the received data
        setReviews(data);
      })
      .catch(error => console.error(error));
  }, []);


  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 50 }}>
      <View style={{ alignItems: 'center' }}>
        {user?.imageUrl && (
          <Image
            source={{ uri: user.imageUrl }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        )}
        <Text style={{ marginTop: 15, fontWeight: 'bold', fontSize: 20 }}>{user?.fullName}</Text>
      </View>
      <Text style={{ marginTop: 10, fontSize: 16, alignSelf: 'center' }}>My Reviews</Text>
      <FlatList
        data={reviews}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <ReviewCard review={item} />}
      />
    </View>
  );
}