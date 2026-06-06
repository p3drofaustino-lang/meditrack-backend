const express = require('express');
const mongoose = require('mongoose');
const expressWinston = require('express-winston');
const winston = require('winston');
const { errors } = require('celebrate');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const {
  PORT = 3000,
  MONGODB_URI = 'mongodb://localhost:27017/meditrackdb',
} = process.env;

app.use(express.json());

app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'logs/request.log' }),
  ],
  format: winston.format.json(),
}));

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use(routes);

app.use(errors());

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' }),
  ],
  format: winston.format.json(),
}));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
