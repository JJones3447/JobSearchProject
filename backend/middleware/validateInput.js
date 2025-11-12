const { validateJobInput, validateInterviewInput } = require('../utils/validateInput');
const AppError = require('../utils/appError');

function createValidationMiddleware(validator) {
  return (req, res, next) => {
    const { valid, errors } = validator(req.body);
    if (!valid) {
      const error = new AppError('Validation failed.', 400);
      error.details = errors;
      return next(error);
    }
    next();
  };
}

const validateJob = createValidationMiddleware(validateJobInput);
const validateInterview = createValidationMiddleware(validateInterviewInput);

module.exports = { validateJob, validateInterview };