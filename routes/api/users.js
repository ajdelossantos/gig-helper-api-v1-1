const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.get('/test', (req, res) => {
  res.json({
    message: 'Users route'
  });
});

router.post('/register', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email
  });

  if (user) {
    return res
      .status(400)
      .json({ email: 'A user has already registered with this address' });
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    User.generatePasswordHash(newUser);
    return res.json(newUser);
  }
});

module.exports = router;
