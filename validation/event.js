const Validator = require('validator');
const { isEmpty } = require('../helpers');

module.exports = function validateEventInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';
  data.name = !isEmpty(data.name) ? data.name : '';

  if (!Validator.isLength(data.name, { min: 10, max: 300 })) {
    errors.name = 'Event name must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
