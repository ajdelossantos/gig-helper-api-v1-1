const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = require('./config/secrets').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('connected to MongoDB successfully!'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.json({ message: 'Hello world!' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
