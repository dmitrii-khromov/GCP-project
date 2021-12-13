const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/auth-err');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A value should be specified'],
    minlength: [2, 'Min value length - 2'],
    maxlength: [30, 'Max value length - 30'],
  },
  email: {
    type: String,
    required: [true, 'A value should be specified'],
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'A value should be a valid email address',
    },
  },
  password: {
    type: String,
    required: [true, 'A value should be specified'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Invalid email or password');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Invalid email or password');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
