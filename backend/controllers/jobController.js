const Job = require('../models/jobModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getJobs = catchAsync(async (req, res, next) => {
  const jobs = await Job.getAllJobs();
  res.json(jobs);
});

exports.getJob = catchAsync(async (req, res, next) => {
  const job = await Job.getJobById(req.params.id);
  if (!job) return next(new AppError('Job not found', 404));
  res.json(job);
});

exports.createJob = catchAsync(async (req, res, next) => {
  const newJob = await Job.createJob(req.body);
  res.status(201).json(newJob);
});

exports.updateJob = catchAsync(async (req, res, next) => {
  const existingJob = await Job.getJobById(req.params.id);
  if (!existingJob) return next(new AppError('Job not found', 404));

  const updatedJob = await Job.updateJob(req.params.id, req.body);
  res.json(updatedJob);
});

exports.deleteJob = catchAsync(async (req, res, next) => {
  const existingJob = await Job.getJobById(req.params.id);
  if (!existingJob) return next(new AppError('Job not found', 404));

  await Job.deleteJob(req.params.id);
  res.json({ message: 'Job deleted successfully' });
});