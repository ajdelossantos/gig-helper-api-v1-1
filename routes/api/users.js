const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const keys = require('../../config/secrets');

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

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ email: 'This user does not exist' });
  }

  const isMatch = User.comparePasswords(password, user.password);

  if (isMatch) {
    const payload = { id: user.id, name: user.name };

    jsonwebtoken.sign(
      payload,
      keys.secretOrKey,
      // key expires in one hour
      { expiresIn: 3600 },
      (err, token) => {
        return res.json({ success: true, token: `Bearer ${token}` });
      }
    );
  } else {
    res.status(400).json({ password: 'Incorrect password' });
  }
});

module.exports = router;
