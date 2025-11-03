const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getInterviewsByJob,
  createInterviewForJob,
} = require('../controllers/interviewController');

router.route('/')
  .get(getInterviewsByJob)
  .post(createInterviewForJob);
module.exports = router;