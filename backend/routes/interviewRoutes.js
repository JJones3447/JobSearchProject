const express = require('express');
const router = express.Router();
const {
  getAllInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
} = require('../controllers/interviewController');

router.route('/')
  .get(getAllInterviews);

router.route('/:id')
  .get(getInterviewById)
  .put(updateInterview)
  .delete(deleteInterview);

module.exports = router;