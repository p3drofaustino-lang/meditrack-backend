const router = require('express').Router();

const userRoutes = require('./users');
const medicationRoutes = require('./medications');
const auth = require('../middlewares/auth');

router.get('/', (req, res) => {
  res.send({ message: 'MediTrack API is running' });
});

router.use(userRoutes);

router.use(auth);
router.use(medicationRoutes);

module.exports = router;
