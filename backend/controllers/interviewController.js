const Interview = require('../models/interviewModel');
const Job = require('../models/jobModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllInterviews = catchAsync(async (req, res, next) => {
  const filters = {
    result: req.query.result,
    interviewType: req.query.interviewType,
  };
  const interviews = await Interview.getAllInterviews(filters);
  res.json(interviews);
});

exports.getInterviewsByJob = catchAsync(async (req, res, next) => {
  const { jobID } = req.params;
  const job = await Job.getJobById(jobID);
  if (!job) return next(new AppError('Job not found', 404));

  const interviews = await Interview.getInterviewsByJobId(jobID);
  res.json(interviews);
});

exports.createInterviewForJob = catchAsync(async (req, res, next) => {
  const { jobID } = req.params;
  const job = await Job.getJobById(jobID);
  if (!job) return next(new AppError('Job not found', 404));

  const data = { ...req.body, jobID };
  const newInterview = await Interview.createInterview(data);
  res.status(201).json(newInterview);
});

exports.getInterviewById = catchAsync(async (req, res, next) => {
  const interview = await Interview.getInterviewById(req.params.id);
  if (!interview) return next(new AppError('Interview not found', 404));
  res.json(interview);
});

exports.updateInterview = catchAsync(async (req, res, next) => {
  const existing = await Interview.getInterviewById(req.params.id);
  if (!existing) return next(new AppError('Interview not found', 404));

  const updated = await Interview.updateInterview(req.params.id, req.body);
  res.json(updated);
});

exports.deleteInterview = catchAsync(async (req, res, next) => {
  const existing = await Interview.getInterviewById(req.params.id);
  if (!existing) return next(new AppError('Interview not found', 404));

  await Interview.deleteInterview(req.params.id);
  res.json({ message: 'Interview deleted successfully' });
});