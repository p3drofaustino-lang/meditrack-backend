const mongoose = require('mongoose');

const savedMedicationSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  synonym: {
    type: String,
    default: '',
  },

  tty: {
    type: String,
    required: true,
  },

  rxcui: {
    type: String,
    required: true,
  },

  notes: {
    type: String,
    default: '',
  },

  frequency: {
    type: String,
    default: '',
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

savedMedicationSchema.index(
  { owner: 1, rxcui: 1 },
  { unique: true }
);

module.exports = mongoose.model('savedMedication', savedMedicationSchema);
