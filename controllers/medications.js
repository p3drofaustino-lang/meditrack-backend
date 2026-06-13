const SavedMedication = require('../models/SavedMedication');
const AppError = require('../utils/AppError');

const {
  ERROR_BAD_REQUEST,
  ERROR_FORBIDDEN,
  ERROR_NOT_FOUND,
} = require('../utils/errors');

module.exports.getMedications = (req, res, next) => {
  SavedMedication.find({ owner: req.user._id })
    .then((medications) => res.send(medications))
    .catch(next);
};

module.exports.createMedication = (req, res, next) => {
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
        return next(new AppError('Invalid medication data', ERROR_BAD_REQUEST));
      }

      return next(err);
    });
};

module.exports.deleteMedication = (req, res, next) => {
  SavedMedication.findById(req.params.medicationId).select('+owner')
    .then((medication) => {
      if (!medication) {
        return next(new AppError('Medication not found', ERROR_NOT_FOUND));
      }

      if (medication.owner.toString() !== req.user._id) {
        return next(new AppError(
          'You are not allowed to delete this medication',
          ERROR_FORBIDDEN,
        ));
      }

      return SavedMedication.findByIdAndDelete(req.params.medicationId)
        .then(() => res.send({ message: 'Medication deleted' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new AppError('Invalid medication ID', ERROR_BAD_REQUEST));
      }

      return next(err);
    });
};

module.exports.updateMedication = (req, res, next) => {
  const { notes, frequency } = req.body;

  SavedMedication.findById(req.params.medicationId).select('+owner')
    .then((medication) => {
      if (!medication) {
        return next(new AppError('Medication not found', ERROR_NOT_FOUND));
      }

      if (medication.owner.toString() !== req.user._id) {
        return next(new AppError(
          'You are not allowed to edit this medication',
          ERROR_FORBIDDEN,
        ));
      }

      medication.notes = notes;
      medication.frequency = frequency;

      return medication.save()
        .then((updatedMedication) => res.send(updatedMedication));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new AppError('Invalid medication ID', ERROR_BAD_REQUEST));
      }

      if (err.name === 'ValidationError') {
        return next(new AppError('Invalid medication data', ERROR_BAD_REQUEST));
      }

      return next(err);
    });
};
