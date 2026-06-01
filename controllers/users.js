const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');

const {
  ERROR_BAD_REQUEST,
  ERROR_UNAUTHORIZED,
  ERROR_NOT_FOUND,
  ERROR_CONFLICT,
} = require('../utils/errors');

const { JWT_SECRET = 'dev-secret' } = process.env;

module.exports.createUser = (req, res, next) => {
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
        return next(new AppError('Invalid user data', ERROR_BAD_REQUEST));
      }

      if (err.code === 11000) {
        return next(new AppError('Email already exists', ERROR_CONFLICT));
      }

      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AppError(
          'Invalid email or password',
          ERROR_UNAUTHORIZED,
        ));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AppError(
              'Invalid email or password',
              ERROR_UNAUTHORIZED,
            ));
          }

          const token = jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: '7d' },
          );

          return res.send({ token });
        });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new AppError('User not found', ERROR_NOT_FOUND));
      }

      return res.send({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};
