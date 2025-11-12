const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getInterviewsByJob,
  createInterviewForJob,
} = require('../controllers/interviewController');
const {validateInterview} = require('../middleware/validateInput');

router.route('/')
  .get(getInterviewsByJob)
  .post(validateInterview, createInterviewForJob);
module.exports = router;