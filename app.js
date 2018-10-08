// Instantiates an Express instance and allows app methods
const express = require('express');
const app = express();

// MongoDB and Mongoose
const mongoose = require('mongoose');
const db = require('./config/secrets').mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('connected to MongoDB successfully!'))
  .catch(err => console.log(err));

// Allows parsing of JSON sent to frontend
const bodyParser = require('body-parser');

// body-parser middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const users = require('./routes/api/users');
const events = require('./routes/api/events');

app.use('/api/users', users);
app.use('/api/events', events);

// Temporary index page
app.get('/', (req, res) => {
  res.send('<h2>Hello world!</h2>');
});

// Web Server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
