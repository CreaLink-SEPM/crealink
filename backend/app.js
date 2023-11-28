const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');



// Load environment variables from a .env file
dotenv.config();

const port = process.env.PORT || 6969;


const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Connect to MongoDB
const connectDB = require('./components/configs/db.js');
connectDB();

// Serve static files from the 'public' directory (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
