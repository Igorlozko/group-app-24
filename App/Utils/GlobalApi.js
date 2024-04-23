import axios from "axios";

const BASE_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const API_KEY = "AIzaSyDBkM90GfqI9hidF7AgsDOjqLgrhXTKboU";

const NewNearByPlace = (latitude, longitude) => {
  const params = {
    key: API_KEY,
    location: `${latitude},${longitude}`,
    radius: 5000,
    type: "restaurant"
  };

  return axios.get(BASE_URL, { params })
    .then(response => {  
      return response.data.results; // Accessing the 'results' array
    })
    .catch(error => {
      console.error('Error fetching nearby places:', error.message);
      throw error;
    });
};

export default { NewNearByPlace, API_KEY };




