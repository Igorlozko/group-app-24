const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/mapreview';
const app = express();
const port = 3050;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { MongoClient } = require('mongodb');
const db = mongoose.connection;
const { Binary } = require('mongodb');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connected!");
});

const reviewSchema = new mongoose.Schema({
  name: String,
  description: String,
  placeId: String,
  image: {
    data: Buffer,
    contentType: String
  }
});
const Review = mongoose.model('Review', reviewSchema);


const FavoritePlaceSchema = new mongoose.Schema({
  placeId: String,
  name: String,
  description: String,
  imageUrl: String
});

const FavoritePlace = mongoose.model('FavoritePlace', FavoritePlaceSchema);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/insert', (req, res) => {
    const doc = new Review({ name: "Test", description: "This is a test document" });
    doc.save()
        .then(result => res.send('Document inserted'))
        .catch(error => console.error(error))
});

app.post('/reviews', (req, res) => {
  console.log(req.body);
  const { name, description,placeId } = req.body;
  const review = new Review({ name, description, placeId });
  review.save()
      .then(result => {
        console.log('Review saved:', result);
        // Fetch the updated list of reviews and send it as the response
        Review.find({})
          .then(reviews => res.send(reviews))
          .catch(error => console.error('Error while fetching reviews:', error));
      })
      .catch(error => {
        console.error('Error while saving review:', error);
        res.status(500).send('Error while saving review');
      });

  console.log('MongoDB connection status:', mongoose.connection.readyState);
});

app.get('/reviews', (req, res) => {
  const { placeId } = req.query; // Extract placeId from the query parameters
  Review.find({ placeId }) // Find reviews for the specified placeId
    .then(reviews => {
      res.send(reviews);
    })
    .catch(error => {
      console.error('Error while fetching reviews:', error);
      res.status(500).send(`Error while fetching reviews: ${error.message}`);
    });
});

app.delete('/reviews/:id', (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID');
  }

  const objectId = new mongoose.Types.ObjectId(id);
  Review.deleteOne({ _id: objectId })
  .then(result => {
    if (result.n > 0) {
      // Fetch the updated list of reviews and send it as the response
      Review.find({})
        .then(reviews => res.send(reviews))
        .catch(error => console.error('Error while fetching reviews:', error));
    } else {
      res.status(404).send(`Review with id ${id} not found`);
    }
  })
  .catch(error => {
    console.error('Error while deleting review:', error);
    res.status(500).send(`Error while deleting review: ${error.message}`);
  });
});
app.get('/allreviews', (req, res) => {
  Review.find({})
    .then(reviews => {
      res.send(reviews);
    })
    .catch(error => {
      console.error('Error while fetching all reviews:', error);
      res.status(500).send(`Error while fetching all reviews: ${error.message}`);
    });
});
/*
app.post('/camera', upload.single('blob'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const collection = client.db("test").collection("images"); // replace with your DB name and collection name
    const image = new Binary(req.file.buffer); // convert buffer to Binary data type
    const result = await collection.insertOne({ image });
    console.log('Image inserted:', result);
    res.json({ status: 'Upload success', _id: result.insertedId });
    client.close();
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});*/

app.post('/favorite', (req, res) => {
  const place = req.body;

  // Create a new document from the FavoritePlace model
  const favoritePlace = new FavoritePlace(place);
  console.log('Received data:', place);
  // Save the document to the database
  favoritePlace.save()
    .then((result) => {
      console.log('Added favorite place:', place);
      console.log('Saved document:', result);
      console.log('The place has been successfully added to the favorites in the database.');
      res.json({ message: 'Place added to favorites successfully' });
    })
    .catch(error => {
      console.error('Error while adding favorite place:', error);
      console.log('Failed to add the place to the favorites in the database.');
      res.status(500).send('Error while adding favorite place');
    });
});

app.get('/favorites', (req, res) => {
  // Find all favorite places in the database
  FavoritePlace.find({})
    .then(favorites => {
      // Send the favorite places to the client
      res.send(favorites);
    })
    .catch(error => {
      console.error('Error while fetching favorite places:', error);
      res.status(500).send('Error while fetching favorite places');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});