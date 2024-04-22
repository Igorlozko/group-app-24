import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { useUser } from '@clerk/clerk-react';

function Review({route}) {
  const { imageUrl } = route.params;
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    fetch(`https://b8e0-193-1-57-3.ngrok-free.app/reviews?placeId=${route.params.placeId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Received data:', data);
        setReviews(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);
  const submitReview = async () => {
    // If the review is empty, return early to prevent the fetch request
    if (!review.trim()) {
      console.log('Review is empty');
      return;
    }
  
    const response = await fetch('https://b8e0-193-1-57-3.ngrok-free.app/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: user.firstName, description: review, placeId: route.params.placeId }),
    });
    
    const data = await response.json();
    console.log(data);
  
    if (!response.ok) {
      // Handle error
      console.error('Failed to submit review');
    } else {
      // If the review was successfully submitted, add it to the list of reviews
      setReviews(prevReviews => [...prevReviews, { name: user.firstName, description: review }]);
    }
  };

  return (
    <View>
      {imageUrl && <Image source={{ uri: imageUrl }} style={{ width: '100%', height: 200 }} />}
      <TextInput
  style={{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10, // Add some padding to the left of the text
    borderRadius: 5, // Round the corners
    margin: 10, // Add some margin around the input
  }}
  placeholder="Write a Note"
  onChangeText={text => setReview(text)}
  value={review}
/>
<TouchableOpacity style={{
  backgroundColor: 'white',
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
  margin: 10,
  borderColor: 'black', // Add a black border
  borderWidth: 1, // Set the border width
}} onPress={submitReview}>
  <Text>Add a Note</Text>
</TouchableOpacity>
      <FlatList
       data={reviews.slice().reverse()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card>
            <Card.Title>{item.name}</Card.Title>
            <Card.Divider/>
            <Text>{item.description}</Text>
          </Card>
        )}
      />
    </View>
  );
}


export default Review;