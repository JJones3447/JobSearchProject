const pool = require('../config/db');

const getAllJobs = async () => {
    const [rows] = await pool.query('SELECT * FROM Job ORDER BY applicationDate DESC');
    return rows;
};

const getJobById = async (jobID) => {
    const [rows] = await pool.query('SELECT * FROM Job WHERE jobID = ?', [jobID]);
    return rows[0];
};

const createJob = async (jobData) => {
    const {companyName, jobTitle, listedSalary, location, technologies, jobURL, applicationDate, status, notes} = jobData;
    const [result] = await pool.query(
        `Insert INTO Job (companyName, jobTitle, listedSalary, location, technologies, jobURL, applicationDate, status, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [companyName, jobTitle, listedSalary, location, technologies, jobURL, applicationDate, status, notes]
    );
    return {jobID: result.insertId, ...jobData};
};

const updateJob = async (jobID, jobData) => {
  const { companyName, jobTitle, listedSalary, location, technologies, jobURL, applicationDate, status, notes } = jobData;

  await pool.query(
    `UPDATE Job 
     SET companyName = ?, jobTitle = ?, listedSalary = ?, location = ?, technologies = ?, 
         jobURL = ?, applicationDate = ?, status = ?, notes = ?
     WHERE jobID = ?`,
    [companyName, jobTitle, listedSalary, location, technologies, jobURL, applicationDate, status, notes, jobID]
  );

  return { jobID, ...jobData };
};

const deleteJob = async (jobID) => {
  await pool.query('DELETE FROM Job WHERE jobID = ?', [jobID]);
  return { message: `Job with ID ${jobID} deleted successfully.` };
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
