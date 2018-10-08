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
      try {
        newUser.password = hash;
        const user = await newUser.save();
        return user;
      } catch (err) {
        throw err;
      }
    });
  });
};

UserSchema.statics.comparePasswords = async function comparePassword(
  inputPassword,
  userPassword
) {
  try {
    return await bcrypt.compare(inputPassword, userPassword);
  } catch (error) {
    console.log(error);
  }
};

module.exports = User = mongoose.model('users', UserSchema);
