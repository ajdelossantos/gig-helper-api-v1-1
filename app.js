// Instantiates an Express instance and allows app methods
const express = require('express');
const app = express();

// MongoDB and Mongoose
const mongoose = require('mongoose');
const db = require('./config/secrets').mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true } // Node console yells at you otherwise
  )
  .then(() => console.log('connected to MongoDB successfully!'))
  .catch(err => console.log(err));

// body-parser middlewares allows parsing of JSON sent to frontend
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// passport-jwt for Auth
const passport = require('passport');
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
const users = require('./routes/api/users');
const events = require('./routes/api/events');

app.use('/api/users', users);
app.use('/api/events', events);

const path = require('path');
// Temporary index page
app.get('/', (req, res) => {
  res.sendfile(path.join(__dirname + '/index.html'));
});

// Web Server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
