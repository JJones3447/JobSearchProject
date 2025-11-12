const express = require('express');
const router = express.Router();
const {
  getAllInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
} = require('../controllers/interviewController');
const {validateInterview} = require('../middleware/validateInput');

router.route('/')
  .get(getAllInterviews);

router.route('/:id')
  .get(getInterviewById)
  .put(validateInterview, updateInterview)
  .delete(deleteInterview);

module.exports = router;