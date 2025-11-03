const pool = require('../config/db');

const getAllInterviews = async (filters = {}) => {
  let query = 'SELECT * FROM Interview';
  const conditions = [];
  const params = [];

  if (filters.result) {
    conditions.push('result = ?');
    params.push(filters.result);
  }

  if (filters.interviewType) {
    conditions.push('interviewType = ?');
    params.push(filters.interviewType);
  }

  if (conditions.length) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY interviewDate DESC';
  const [rows] = await pool.query(query, params);
  return rows;
};

const getInterviewsByJobId = async (jobID) => {
  const [rows] = await pool.query(
    'SELECT * FROM Interview WHERE jobID = ? ORDER BY interviewDate DESC',
    [jobID]
  );
  return rows;
};

const getInterviewById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Interview WHERE interviewID = ?', [id]);
  return rows[0];
};

const createInterview = async (data) => {
  const { jobID, interviewDate, interviewType, interviewNotes, result } = data;
  const [res] = await pool.query(
    `INSERT INTO Interview (jobID, interviewDate, interviewType, interviewNotes, result)
     VALUES (?, ?, ?, ?, ?)`,
    [jobID, interviewDate, interviewType, interviewNotes, result]
  );
  return { interviewID: res.insertId, ...data };
};

const updateInterview = async (id, data) => {
  const { interviewDate, interviewType, interviewNotes, result } = data;
  await pool.query(
    `UPDATE Interview SET interviewDate = ?, interviewType = ?, interviewNotes = ?, result = ?
     WHERE interviewID = ?`,
    [interviewDate, interviewType, interviewNotes, result, id]
  );
  return { interviewID: id, ...data };
};

const deleteInterview = async (id) => {
  await pool.query('DELETE FROM Interview WHERE interviewID = ?', [id]);
  return { message: `Interview with ID ${id} deleted successfully.` };
};

module.exports = {
  getAllInterviews,
  getInterviewsByJobId,
  getInterviewById,
  createInterview,
  updateInterview,
  deleteInterview,
};