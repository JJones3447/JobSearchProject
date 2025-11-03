const Interview = require('../models/interviewModel');
const Job = require('../models/jobModel');

const getAllInterviews = async (req, res) => {
  try {
    const filters = {
      result: req.query.result,
      interviewType: req.query.interviewType,
    };
    const interviews = await Interview.getAllInterviews(filters);
    res.json(interviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving interviews' });
  }
};

const getInterviewsByJob = async (req, res) => {
  try {
    const { jobID } = req.params;
    const job = await Job.getJobById(jobID);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const interviews = await Interview.getInterviewsByJobId(jobID);
    res.json(interviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving job interviews' });
  }
};

const createInterviewForJob = async (req, res) => {
  try {
    const { jobID } = req.params;
    const job = await Job.getJobById(jobID);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const data = { ...req.body, jobID };
    const newInterview = await Interview.createInterview(data);
    res.status(201).json(newInterview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating interview' });
  }
};

const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.getInterviewById(req.params.id);
    if (!interview) return res.status(404).json({ message: 'Interview not found' });
    res.json(interview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving interview' });
  }
};

const updateInterview = async (req, res) => {
  try {
    const existing = await Interview.getInterviewById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Interview not found' });

    const updated = await Interview.updateInterview(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating interview' });
  }
};

const deleteInterview = async (req, res) => {
  try {
    const existing = await Interview.getInterviewById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Interview not found' });

    await Interview.deleteInterview(req.params.id);
    res.json({ message: 'Interview deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting interview' });
  }
};

module.exports = {
  getAllInterviews,
  getInterviewsByJob,
  createInterviewForJob,
  getInterviewById,
  updateInterview,
  deleteInterview,
};