const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const {
  ERROR_BAD_REQUEST,
  ERROR_UNAUTHORIZED,
  ERROR_CONFLICT,
  ERROR_SERVER,
} = require('../utils/errors');

const { JWT_SECRET = 'dev-secret' } = process.env;

module.exports.createUser = (req, res) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_BAD_REQUEST)
          .send({ message: 'Invalid user data' });
      }

      if (err.code === 11000) {
        return res
          .status(ERROR_CONFLICT)
          .send({ message: 'Email already exists' });
      }

      return res
        .status(ERROR_SERVER)
        .send({ message: 'Server error' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('InvalidCredentials'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('InvalidCredentials'));
          }

          const token = jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: '7d' },
          );

          return res.send({ token });
        });
    })
    .catch((err) => {
      if (err.message === 'InvalidCredentials') {
        return res
          .status(ERROR_UNAUTHORIZED)
          .send({ message: 'Invalid email or password' });
      }

      return res
        .status(ERROR_SERVER)
        .send({ message: 'Server error' });
    });
};
