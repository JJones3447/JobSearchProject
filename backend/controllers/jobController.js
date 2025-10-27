const Job = require('../models/jobModel');

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.getAllJobs();
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving jobs' });
  }
};

const getJob = async (req, res) => {
  try {
    const job = await Job.getJobById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving job' });
  }
};

const createJob = async (req, res) => {
  try {
    const newJob = await Job.createJob(req.body);
    res.status(201).json(newJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating job' });
  }
};

const updateJob = async (req, res) => {
  try {
    const existingJob = await Job.getJobById(req.params.id);
    if (!existingJob) return res.status(404).json({ message: 'Job not found' });

    const updatedJob = await Job.updateJob(req.params.id, req.body);
    res.json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating job' });
  }
};

const deleteJob = async (req, res) => {
  try {
    const existingJob = await Job.getJobById(req.params.id);
    if (!existingJob) return res.status(404).json({ message: 'Job not found' });

    await Job.deleteJob(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting job' });
  }
};

module.exports = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};