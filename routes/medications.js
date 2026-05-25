const router = require('express').Router();

const {
  getMedications,
  createMedication,
  deleteMedication,
} = require('../controllers/medications');

router.get('/medications', getMedications);
router.post('/medications', createMedication);
router.delete('/medications/:medicationId', deleteMedication);

module.exports = router;
