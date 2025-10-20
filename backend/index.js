require('dotenv').config();  
const express = require('express'); 
const cors = require('cors');
const app = express();

const db = require('./config/db'); 

app.use(cors());
app.use(express.json());

const jobRoutes = require('./routes/jobRoutes');

app.use('/api/jobs', jobRoutes);

app.get('/', (req, res) => {
    res.send('Job Search API is up and running');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});