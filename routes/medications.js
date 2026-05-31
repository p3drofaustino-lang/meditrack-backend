const router = require('express').Router();

const {
  getMedications,
  createMedication,
  deleteMedication,
} = require('../controllers/medications');

const {
  validateCreateMedication,
  validateMedicationId,
} = require('../middlewares/validation');

router.get('/medications', getMedications);
router.post('/medications', validateCreateMedication, createMedication);
router.delete('/medications/:medicationId', validateMedicationId, deleteMedication);

module.exports = router;
