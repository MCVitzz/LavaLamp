const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const members = require('./routes/api/members');
app.use('/api/members', members);

// Production Environment
app.use(serveStatic(__dirname + '/public'));


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));