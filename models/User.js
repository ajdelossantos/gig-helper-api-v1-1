const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const catchErrors = require('../errorHandlers');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.statics.generatePasswordHash = function generatePasswordHash(
  newUser
) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      newUser.password = hash;
      const user = await newUser.save().catch(err => {
        throw err;
      });

      return user;
    });
  });
};

UserSchema.statics.comparePasswords = async function comparePassword(
  inputPassword,
  userPassword
) {
  return await bcrypt
    .compare(inputPassword, userPassword)
    .catch(err => console.log(err));
};

module.exports = User = mongoose.model('users', UserSchema);
