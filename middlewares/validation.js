const { celebrate, Joi } = require('celebrate');

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateCreateMedication = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    name: Joi.string().required(),
    synonym: Joi.string().allow('').default(''),
    tty: Joi.string().required(),
    rxcui: Joi.string().required(),
    notes: Joi.string().allow('').default(''),
    frequency: Joi.string().allow('').default(''),
  }),
});

module.exports.validateUpdateMedication = celebrate({
  body: Joi.object().keys({
    notes: Joi.string().allow('').max(500),
    frequency: Joi.string().allow('').max(100),
  }),
});

module.exports.validateMedicationId = celebrate({
  params: Joi.object().keys({
    medicationId: Joi.string().hex().length(24).required(),
  }),
});
