const express = require('express');
const router = express.Router();

const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');

// Base route: /api/jobs
router.route('/')
  .get(getJobs)
  .post(createJob);

// Route with ID parameter
router.route('/:id')
  .get(getJob)
  .put(updateJob)
  .delete(deleteJob);

module.exports = router;