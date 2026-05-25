const router = require('express').Router();

router.get('/', (req, res) => {
  res.send({ message: 'MediTrack API is running' });
});

module.exports = router;
