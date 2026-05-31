const SavedMedication = require('../models/SavedMedication');

const {
  ERROR_BAD_REQUEST,
  ERROR_FORBIDDEN,
  ERROR_NOT_FOUND,
  ERROR_SERVER,
} = require('../utils/errors');

module.exports.getMedications = (req, res) => {
  SavedMedication.find({})
    .then((medications) => res.send(medications))
    .catch(() => {
      res.status(ERROR_SERVER).send({ message: 'Server error' });
    });
};

module.exports.createMedication = (req, res) => {
  const {
    keyword,
    name,
    synonym,
    tty,
    rxcui,
    notes,
    frequency,
  } = req.body;

  SavedMedication.create({
    keyword,
    name,
    synonym,
    tty,
    rxcui,
    notes,
    frequency,
    owner: req.user._id,
  })
    .then((medication) => res.status(201).send(medication))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_BAD_REQUEST)
          .send({ message: 'Invalid medication data' });
      }

      return res
        .status(ERROR_SERVER)
        .send({ message: 'Server error' });
    });
};

module.exports.deleteMedication = (req, res) => {
  SavedMedication.findById(req.params.medicationId).select('+owner')
    .then((medication) => {
      if (!medication) {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Medication not found' });
      }

      if (medication.owner.toString() !== req.user._id) {
        return res
          .status(ERROR_FORBIDDEN)
          .send({ message: 'You are not allowed to delete this medication' });
      }

      return SavedMedication.findByIdAndDelete(req.params.medicationId)
        .then(() => res.send({ message: 'Medication deleted' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_BAD_REQUEST)
          .send({ message: 'Invalid medication ID' });
      }

      return res
        .status(ERROR_SERVER)
        .send({ message: 'Server error' });
    });
};
