const router = require('express').Router();

const userRoutes = require('./users');

router.get('/', (req, res) => {
  res.send({ message: 'MediTrack API is running' });
});

router.use(userRoutes);

module.exports = router;
