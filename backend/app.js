const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000;

const app = express();

app.use(bodyParser.json());
app.listen(port, () => {
    console.log('Server listening on port: ' + port);
})