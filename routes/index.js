const router = require('express').Router();

const userRoutes = require('./users');
const medicationRoutes = require('./medications');
const auth = require('../middlewares/auth');
const { getCurrentUser } = require('../controllers/users');

router.get('/', (req, res) => {
  res.send({ message: 'MediTrack API is running' });
});

router.use(userRoutes);

router.use(auth);

router.get('/users/me', getCurrentUser);
router.use(medicationRoutes);

module.exports = router;
