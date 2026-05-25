const SavedMedication = require('../models/SavedMedication');

module.exports.getMedications = (req, res) => {
  SavedMedication.find({})
    .then((medications) => res.send(medications))
    .catch((err) => res.status(500).send({ message: err.message }));
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
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports.deleteMedication = (req, res) => {
  SavedMedication.findByIdAndDelete(req.params.medicationId)
    .then((medication) => {
      if (!medication) {
        return res.status(404).send({ message: 'Medication not found' });
      }

      return res.send({ message: 'Medication deleted' });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
