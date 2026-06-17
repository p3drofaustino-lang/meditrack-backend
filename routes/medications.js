const router = require('express').Router();

const {
  getMedications,
  createMedication,
  deleteMedication,
  updateMedication,
} = require('../controllers/medications');

const {
  validateCreateMedication,
  validateUpdateMedication,
  validateMedicationId,
} = require('../middlewares/validation');

router.get('/medications', getMedications);
router.post('/medications', validateCreateMedication, createMedication);

router.patch(
  '/medications/:medicationId',
  validateMedicationId,
  validateUpdateMedication,
  updateMedication,
);

router.delete('/medications/:medicationId', validateMedicationId, deleteMedication);

module.exports = router;
