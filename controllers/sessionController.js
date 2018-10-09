const jsonwebtoken = require('jsonwebtoken');
const keys = require('../config/secrets');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

exports.registerUser = async (req, res) => {
  // const { errors, isValid } = validateRegisterInput(req.body);

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json({ email: 'User already exists' });
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    bcrypt.hash(newUser.password, 10, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(user => {
          const payload = { id: user.id, name: user.name };

          jsonwebtoken.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                success: true,
                token: `Bearer ${token}`
              });
            }
          );
        })
        .catch(err => console.log(err));
    });
  }
};

exports.loginUser = async (req, res) => {
  // const { errors, isValid } = validateLoginInput(req.body);

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ email: 'This user does not exist' });
  }

  bcrypt
    .compare(password, user.password)
    .then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name };

        jsonwebtoken.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        return res.status(400).json({ password: 'Incorrect password' });
      }
    })
    .catch(err => console.log(err));
};
