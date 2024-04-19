const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/mapreview';
const app = express();
const port = 3050;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connected!");
});

const reviewSchema = new mongoose.Schema({
  name: String,
  description: String,
  placeId: String, 
});

const Review = mongoose.model('Review', reviewSchema);

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
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});