const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

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
  bcrypt.hash(newUser.password, 10, async (err, hash) => {
    if (err) {
      throw err;
    } else {
      newUser.password = hash;
      const user = await newUser.save();
      return user;
    }
  });
};

UserSchema.statics.comparePasswords = async function comparePasswords(
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

module.exports = User = mongoose.model('users', UserSchema);
